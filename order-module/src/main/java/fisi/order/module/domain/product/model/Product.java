package fisi.order.module.domain.product.model;

public class Product {

    private int id;
    private String name;
    private String brand;
    private double price;
    private String image;

    public Product(int id, String name, String brand, double price, String image) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.brand = brand;
        this.image = image;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public double getPrice() {
        return price;
    }

    public String getBrand() {
        return brand;
    }

    public String getImage() {
        return image;
    }

    public static ProductBuilder builder() {
        return new ProductBuilder();
    }

    public static class ProductBuilder {
        private int id;
        private String name;
        private String brand;
        private double price;
        private String image;

        public ProductBuilder id(int id) {
            this.id = id;
            return this;
        }

        public ProductBuilder name(String name) {
            this.name = name;
            return this;
        }

        public ProductBuilder brand(String brand) {
            this.brand = brand;
            return this;
        }

        public ProductBuilder price(double price) {
            this.price = price;
            return this;
        }

        public ProductBuilder image(String image) {
            this.image = image;
            return this;
        }

        public Product build() {
            return new Product(id, name, brand, price, image);
        }

    }
}