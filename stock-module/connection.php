<?php
require_once __DIR__ . '/vendor/autoload.php';
require_once 'stock_repository.php';
require_once 'stock_publisher.php';
use PhpAmqpLib\Connection\AMQPStreamConnection;

$connection = new AMQPStreamConnection('localhost', 5672, 'guest', 'guest');
$channel = $connection->channel();

$callback = function ($msg) {
    $obj = json_decode($msg->body);
    $repository = new StockRepository();
    $isAvailable = $repository->verify_stock($obj->order->order_details, $obj->order->id);
    if ($isAvailable) {
        $publisher = new StockPublisher('stock_queue');
        $publisher->publish($msg->body);
    } else {
        $publisher = new StockPublisher('failed_queue');
        $publisher->publish('"SU ORDEN DE COMPRA CANCELADO"');
    }
};

echo("[+] Sistema de Administración de Inventario \n ------- \n");
$channel->basic_consume('order_queue', '', false, true, false, false, $callback);

while ($channel->callbacks) {
    echo("[!] Consumiendo cola Ordenes de Compra \n");
    $channel->wait();
}

$channel->close();
$connection->close();
