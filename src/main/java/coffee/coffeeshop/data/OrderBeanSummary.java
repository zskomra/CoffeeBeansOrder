package coffee.coffeeshop.data;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderBeanSummary {

    private Long beanId;
    private String name;
    private Integer amount;
    private BigDecimal price;
}
