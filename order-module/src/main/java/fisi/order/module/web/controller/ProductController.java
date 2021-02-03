package fisi.order.module.web.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fisi.order.module.application.product.ProductService;
import fisi.order.module.domain.product.model.Product;

@RestController
@RequestMapping({ "/api/v1/products" })
public class ProductController {

    @Autowired
    private ProductService service;

    @GetMapping
    public List<Product> productList() {
        return this.service.productListAvailable();
    }
}
