package fisi.order.module.infraestructure.order.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Component;

import fisi.order.module.domain.order.model.Order;
import fisi.order.module.domain.order.repository.OrderRepository;
import fisi.order.module.web.models.OrderDTO;
import fisi.order.module.web.models.OrderDetailsDTO;

@Component
public class OrderRepositoryImpl implements OrderRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private OrderRowMapper row;

    @Override
    public int savOrderCustomer(OrderDTO order) {

        int orderId = this.createOrder(order);
        List<OrderDetailsDTO> products = order.getOrder_details();

        if (orderId != 0) {
            this.jdbcTemplate.batchUpdate(
                    "insert into TPDETALLEORDEN (CORDER, CPRODUCT, QUANTITY, PRICE) values(?, ?, ?, ?)",
                    new BatchPreparedStatementSetter() {

                        public void setValues(PreparedStatement ps, int i) throws SQLException {
                            ps.setInt(1, orderId);
                            ps.setInt(2, products.get(i).getProductId());
                            ps.setInt(3, products.get(i).getQuantity());
                            ps.setDouble(4, products.get(i).getProductPrice());
                        }

                        public int getBatchSize() {
                            return products.size();
                        }

                    });
        }
        return orderId;

    }

    private int createOrder(OrderDTO order) {
        String insertQuery = "INSERT INTO TPORDEN (CCLIENTE, ORDER_DATE, TOTAL_AMOUNT, ORDER_STATE) values (?, ?, ?, ?)";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(new PreparedStatementCreator() {
            public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {
                PreparedStatement ps = connection.prepareStatement(insertQuery, new String[] { "CORDER" });

                ps.setString(1, order.getUser().getDocument());
                ps.setString(2, getCurrentDate());
                ps.setDouble(3, getTotalAmoun(order.getOrder_details()));
                ps.setString(4, "0");

                return ps;
            }
        }, keyHolder);
        return keyHolder.getKey().intValue();
    }

    public String getCurrentDate() {
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date = new Date();
        return dateFormat.format(date);
    }

    public double getTotalAmoun(List<OrderDetailsDTO> list) {
        double amount = 0.0;
        for (OrderDetailsDTO item : list) {
            amount = amount + item.getQuantity() * item.getProductPrice();
        }
        System.out.println("Amount Total: " + amount);
        return amount;

    }

    @Override
    public List<Order> getOrderListCustomer(String customerId) {
        String query = "SELECT * FROM TPORDEN WHERE CCLIENTE = ? ORDER BY CORDEN DESC";

        List<Map<String, Object>> rows = this.jdbcTemplate.queryForList(query, customerId);
        List<Order> list = row.mapRow(rows);
        return list;
    }
}
