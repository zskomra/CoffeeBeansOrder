package coffee.coffeeshop.model.domain;

import lombok.*;
import java.math.BigDecimal;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Beans {

    private Long id;
    private String name;
    private Integer amount;
    private BigDecimal price;
}
