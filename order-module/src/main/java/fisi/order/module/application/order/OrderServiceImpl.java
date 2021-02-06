package fisi.order.module.application.order;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fisi.order.module.domain.order.model.Order;
import fisi.order.module.domain.order.repository.OrderRepository;
import fisi.order.module.web.models.OrderDTO;

import java.util.List;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import fisi.order.module.web.models.OrderStatus;
import fisi.order.module.config.MessagingConfig;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private RabbitTemplate template;

    @Autowired
    private OrderRepository repository;

    @Override
    public OrderStatus processOrderCustomer(OrderDTO order) {
        int orderId = this.repository.savOrderCustomer(order);
        if (orderId != 0) {
            order.setId(orderId);
            OrderStatus orderStatus = new OrderStatus(order, "PROCESANDO",
                    "Procesando orden de compra, verificando disponibilidad de productos");
            template.convertAndSend(MessagingConfig.EXCHANGE, MessagingConfig.ROUTING_KEY, orderStatus);
            return orderStatus;
        }
        return null;
    }

    @Override
    public List<Order> getOrderListCustomer(String customerId) {
        return this.repository.getOrderListCustomer(customerId);
    }

}
