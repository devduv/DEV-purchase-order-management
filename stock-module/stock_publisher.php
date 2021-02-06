<?php

use PhpAmqpLib\Connection\AMQPStreamConnection;
use PhpAmqpLib\Message\AMQPMessage;

class StockPublisher {

    public $connection;
    public $channel;
    public $QUEUE = 'stock_queue';

    function __construct($queue)
    {
        $this->QUEUE = $queue;
        $this->connection = new AMQPStreamConnection('localhost', 5672, 'guest', 'guest');
        $this->channel = $this->connection->channel();

        $this->channel->queue_declare($this->QUEUE, false, false, false, false);
    }

    function publish($req) {
        $msg = new AMQPMessage($req);
        $this->channel->basic_publish($msg, '', $this->QUEUE);

        $this->channel->close();
        $this->connection->close();
    }
}