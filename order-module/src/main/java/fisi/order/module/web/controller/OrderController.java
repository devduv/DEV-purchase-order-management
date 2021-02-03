package fisi.order.module.web.controller;

import com.rabbitmq.client.RpcClient.Response;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import fisi.order.module.config.MessagingConfig;
import fisi.order.module.web.models.OrderDTO;
import fisi.order.module.web.models.OrderStatus;

@RestController
@RequestMapping({ "/api/v1/order" })
public class OrderController {
    
    @Autowired
    private RabbitTemplate template;

    @PostMapping
    public ResponseEntity<OrderDTO> processOrder(
        @RequestBody OrderDTO order
    ) {
        System.out.println(order.toString());
        OrderStatus orderStatus = new OrderStatus(order, "PROCESANDO", "Orden de compra procesado correctamente");
        template.convertAndSend(MessagingConfig.EXCHANGE, MessagingConfig.ROUTING_KEY, orderStatus);
        return ResponseEntity.ok().build();
    }
}
