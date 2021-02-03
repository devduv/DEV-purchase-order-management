package fisi.order.module.domain.product.repository;

import java.util.List;

import fisi.order.module.domain.product.model.Product;

public interface ProductRepository {
    public List<Product> productListAvailable();
}
