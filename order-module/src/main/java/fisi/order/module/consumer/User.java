package fisi.order.module.consumer;

import fisi.order.module.config.MessagingConfig;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

// @Component
public class User {

/*     @RabbitListener(queues = MessagingConfig.END_QUEUE)
    public void consumeMessageFromQueue(String endQueue) {
        System.out.println("Mensaje recibido de la cola: " + endQueue);
    }

    @RabbitListener(queues = MessagingConfig.FAILED_QUEUE)
    public void consumeFaieldMessageFromQueue(String endQueue) {
        System.out.println("Mensaje recibido de la cola: " + endQueue);
    } */
}
