package fisi.order.module.application.product;

import java.util.List;

import fisi.order.module.domain.product.model.Product;

public interface ProductService {
    public List<Product> productListAvailable();
}
