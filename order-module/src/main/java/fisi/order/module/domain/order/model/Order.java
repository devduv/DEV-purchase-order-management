package fisi.order.module.domain.order.model;

public class Order {
    private int id;
    private String customerId;
    private String date;
    private double totalAmount;
    private String state;

    public Order(int id, String customerId, String date, double totalAmount, String state) {
        this.id = id;
        this.customerId = customerId;
        this.date = date;
        this.totalAmount = totalAmount;
        this.state = state;
    }
    public int getId() {
        return id;
    }

    public String getCustomerId() {
        return customerId;
    }

    public String getDate() {
        return date;
    }

    public double getTotalAmount() {
        return totalAmount;
    }
    public String getState() {
        return state;
    }
    public static OrderBuilder builder() {
        return new OrderBuilder();
    }

    public static class OrderBuilder {
        private int id;
        private String customerId;
        private String date;
        private double totalAmount;
        private String state;

        public OrderBuilder id (int id) {
            this.id = id;
            return this;
        }
        public OrderBuilder customerId (String customerId) {
            this.customerId = customerId;
            return this;
        }
        public OrderBuilder totalAmount (double totalAmount) {
            this.totalAmount = totalAmount;
            return this;
        }
        public OrderBuilder state (String state) {
            this.state = state;
            return this;
        }
        public OrderBuilder date (String date) {
            this.date = date;
            return this;
        }
        public Order build() {
            return new Order(id, customerId, date, totalAmount, state);
        }
    }
    
}
