package fisi.order.module.application.product;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fisi.order.module.domain.product.model.Product;
import fisi.order.module.domain.product.repository.ProductRepository;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository repository;

    @Override
    public List<Product> productListAvailable() {
        return this.repository.productListAvailable();
    }

}
