package fisi.order.module.infraestructure.order.jdbc;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Component;

import fisi.order.module.domain.order.model.Order;

@Component
public class OrderRowMapper {

    public List<Order> mapRow(List<Map<String, Object>> rows) {
		List<Order> list = new ArrayList<Order>();
		for (Map<String, Object> row : rows) {
			int id = Integer.parseInt(row.get("CORDEN").toString());
			String customerId = row.get("CCLIENTE").toString();
			String date = row.get("ORDER_DATE").toString();
			String state = row.get("ORDER_STATE").toString();
			double totalAmount = (double) Double.parseDouble(row.get("TOTAL_AMOUNT").toString());
            list.add(Order.builder().id(id).customerId(customerId).date(date).totalAmount(totalAmount).state(state).build());
		}
		return list;
	}
}
