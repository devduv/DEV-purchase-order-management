package fisi.order.module.domain.order.repository;

import fisi.order.module.web.models.OrderDTO;

public interface OrderRepository {
    public boolean savOrderCustomer(OrderDTO order);
}
