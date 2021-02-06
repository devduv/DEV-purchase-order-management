package fisi.order.module.application.order;

import java.util.List;

import fisi.order.module.domain.order.model.Order;
import fisi.order.module.web.models.OrderDTO;
import fisi.order.module.web.models.OrderStatus;

public interface OrderService {
    public OrderStatus processOrderCustomer(OrderDTO order);
    public List<Order> getOrderListCustomer(String customerId);
}
