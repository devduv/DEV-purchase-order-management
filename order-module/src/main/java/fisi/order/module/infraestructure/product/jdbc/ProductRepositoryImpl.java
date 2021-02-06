package fisi.order.module.infraestructure.product.jdbc;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import fisi.order.module.domain.product.model.Product;
import fisi.order.module.domain.product.repository.ProductRepository;

@Component
public class ProductRepositoryImpl implements ProductRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private ProductRowMapper row;

    @Override
    public List<Product> productListAvailable() {
        String query = "select CPRODUCT, PRODUCT_NAME, PRODUCT_PRECIO, PRODUCT_IMAGE, MARCA_NAME from TMPRODUCTO U "
                + "INNER JOIN tmmarca M ON M.CMARCA = U.CMARCA";

        List<Map<String, Object>> rows = this.jdbcTemplate.queryForList(query);
        List<Product> list = row.mapRow(rows);
        return list;
    }
}
