package fisi.order.module.domain.order.repository;

import java.util.List;

import fisi.order.module.domain.order.model.Order;
import fisi.order.module.web.models.OrderDTO;

public interface OrderRepository {
    public int savOrderCustomer(OrderDTO order);
    public List<Order> getOrderListCustomer(String customerId);
}
