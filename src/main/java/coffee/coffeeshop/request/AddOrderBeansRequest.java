package coffee.coffeeshop.request;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AddOrderBeansRequest {

    private Long id;
    private String name;
    private Integer amount;
    private BigDecimal price;

}
