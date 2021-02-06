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
                    updateOrderState(order.order.id, con);
                });
            });

            factoryFactura(order);

            connection.createChannel(function (error1, channel) {
                if (error1) {
                    throw error1;
                }
                var queue = 'reserve_queue';
                var msgBilling = JSON.stringify(order);

                console.log(msgBilling);
                channel.assertQueue(queue, {
                    durable: false
                });

                channel.sendToQueue(queue, Buffer.from(msgBilling));
                console.log(" [x] Enviando mensaje al módulo de Facturación");
            });

        }, {
            noAck: true
        });
    });
});


function updateOrderState(orderId, con) {
    const sql = `UPDATE dbpurchase.TPORDEN SET ORDER_STATE = '2' WHERE CORDEN = '${orderId}'`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Result: " + JSON.stringify(result));
    });
}

function factoryFactura(order) {
    order.order.factura = {
        orderId: order.order.id,
        customerId: order.order.user.document,
        customerName: `${order.order.user.name} ${order.order.user.lastname}`,
        ruc: '',
        IGV: calculateIGV(order.order.order_details),
        state: 'E',
        date: getCurrentDate(),
        totalAmount: calcualteAmount(order.order.order_details) + calculateIGV(order.order.order_details)
    };

    console.log(order.order.factura);
}

function calcualteAmount(products) {
    let totalAmount = 0;
    products.forEach(item => {
        totalAmount = totalAmount + item.quantity * item.productPrice
    });
    console.log('totalAmount', totalAmount);
    return totalAmount;
}

function calculateIGV(products) {
    let totalIGV = 0;
    products.forEach(item => {
        totalIGV = totalIGV + 0.18 * item.quantity * item.productPrice
    });
    console.log('totalIGV', totalIGV);
    return totalIGV;
}

function getCurrentDate() {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    const today = date.toISOString().slice(0, 10);
    return today;
}