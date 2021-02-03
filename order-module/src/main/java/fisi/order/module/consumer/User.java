package fisi.order.module.consumer;

import fisi.order.module.config.MessagingConfig;
import fisi.order.module.web.models.OrderStatus;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class User {

  /*   @RabbitListener(queues = MessagingConfig.QUEUE)
    public void consumeMessageFromQueue(OrderStatus orderStatus) {
        System.out.println("Mensaje recibido de la cola: " + orderStatus);
    } */
}
