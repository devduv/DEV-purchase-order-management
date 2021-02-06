package fisi.order.module.web.models;

import lombok.ToString;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserDTO {
    private String document;
    private String email;
    private String lastname;
    private String name;
    private int phone;
    
}
