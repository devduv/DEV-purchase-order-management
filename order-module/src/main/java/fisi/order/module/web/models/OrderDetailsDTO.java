package fisi.order.module.web.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class OrderDetailsDTO {
    private int productId;
    private int quantity;
    private String productName;
    private double productPrice;
}
