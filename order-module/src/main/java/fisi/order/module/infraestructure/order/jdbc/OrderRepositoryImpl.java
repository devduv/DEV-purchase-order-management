package fisi.order.module.infraestructure.order.jdbc;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import fisi.order.module.domain.order.repository.OrderRepository;
import fisi.order.module.web.models.OrderDTO;

@Component
public class OrderRepositoryImpl implements OrderRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public boolean savOrderCustomer(OrderDTO order) {
        /*
         * int orderId = this.createOrder(order); List<OrderDetailsDTO> products =
         * order.getOrder_details();
         * 
         * this.jdbcTemplate.batchUpdate(
         * "insert into TAORDERPRODUCT (corder, cproduct, quantity) values(?, ?, ?)",
         * new BatchPreparedStatementSetter() {
         * 
         * public void setValues(PreparedStatement ps, int i) throws SQLException {
         * ps.setInt(1, orderId); ps.setInt(2, products.get(i).getProductId());
         * ps.setInt(3, products.get(i).getQuantity()); }
         * 
         * public int getBatchSize() { return products.size(); }
         * 
         * });
         * 
         * return true;
         */
        return false;
    }

    /*
     * private int createOrder(OrderDTO order) { String insertQuery =
     * "INSERT INTO TPORDER (CUSUARIO, ORDER_DATE, ORDER_STATE) values (?, ?, ?)";
     * KeyHolder keyHolder = new GeneratedKeyHolder(); jdbcTemplate.update(new
     * PreparedStatementCreator() { public PreparedStatement
     * createPreparedStatement(Connection connection) throws SQLException {
     * PreparedStatement ps = connection.prepareStatement(insertQuery, new String[]
     * { "id_order" }); ps.setInt(1, order.getUserId()); ps.setString(2,
     * order.getOrderDate()); ps.setInt(3, order.getOrderState()); return ps; } },
     * keyHolder); return keyHolder.getKey().intValue(); }
     */
}
