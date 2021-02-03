var amqp = require('amqplib/callback_api');
var mysql = require('mysql');


var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: ""
});


con.connect(err => {
    if (err) throw err;
    console.log("Connected!");
});

amqp.connect('amqp://localhost', function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }
        var queue = 'stock_queue';

        channel.assertQueue(queue, {
            durable: false
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
        channel.consume(queue, function (msg) {
            console.log(" [x] Received %s", msg.content.toString());
            const order = JSON.parse(msg.content.toString());
            console.log(order.order.order_details);
            let sql = '';
            order.order.order_details.forEach(product => {
                sql = `UPDATE dbpurchase.TMPRODUCTO T SET STOCK = T.STOCK - ${+(product.quantity)} WHERE CPRODUCT = ${product.productId}`;
                console.log("Connected!");
                con.query(sql, function (err, result) {
                    if (err) throw err;
                    console.log("Result: " + JSON.stringify(result));
                });
            });

            connection.createChannel(function (error1, channel) {
                if (error1) {
                    throw error1;
                }
                var queue = 'billing_queue';
                var msgBilling = msg.content.toString();

                channel.assertQueue(queue, {
                    durable: false
                });

                channel.sendToQueue(queue, Buffer.from(msgBilling));
                console.log(" [x] Sent %s", msgBilling);
            });

        }, {
            noAck: true
        });
    });
});