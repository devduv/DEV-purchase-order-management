package fisi.order.module.web.models;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class OrderDTO {
    private int id;
    private UserDTO user;
    private List<OrderDetailsDTO> order_details;
}
