package fisi.order.module.web.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import fisi.order.module.application.order.OrderService;
import fisi.order.module.domain.order.model.Order;
import fisi.order.module.web.models.OrderDTO;
import fisi.order.module.web.models.OrderStatus;


@RestController
@RequestMapping({ "/api/v1/order" })
public class OrderController {
    
    @Autowired
    private OrderService service;

    @PostMapping
    public ResponseEntity<OrderStatus> processOrder(@RequestBody OrderDTO order) {
        System.out.println(order.toString());
        return ResponseEntity.ok().body(this.service.processOrderCustomer(order));
    }
    

    @GetMapping
    public ResponseEntity<List<Order>> getOrderListCustomer(@RequestParam String customerId) {
        List<Order> list = this.service.getOrderListCustomer(customerId);
        return ResponseEntity.ok().body(list);
    }
}
