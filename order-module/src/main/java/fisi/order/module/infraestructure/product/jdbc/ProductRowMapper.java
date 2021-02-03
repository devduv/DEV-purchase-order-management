package fisi.order.module.infraestructure.product.jdbc;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Component;

import fisi.order.module.domain.product.model.Product;

@Component
public class ProductRowMapper {

    public List<Product> mapRow(List<Map<String, Object>> rows) {
		List<Product> list = new ArrayList<Product>();
		for (Map<String, Object> row : rows) {
			int id = Integer.parseInt(row.get("CPRODUCT").toString());
			String name = row.get("PRODUCT_NAME").toString();
			String brand = row.get("MARCA_NAME").toString();
			String image = row.get("PRODUCT_IMAGE").toString();
			double price = (double) Double.parseDouble(row.get("PRODUCT_PRECIO").toString());
            list.add(Product.builder().id(id).name(name).brand(brand).price(price).image(image).build());
		}
		return list;
	}
}
