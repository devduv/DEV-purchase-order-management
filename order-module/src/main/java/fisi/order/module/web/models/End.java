package fisi.order.module.web.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class End {
    private String tipo_peticion;
    private String contenido_cadena;
    private String contenido_listM;
}
