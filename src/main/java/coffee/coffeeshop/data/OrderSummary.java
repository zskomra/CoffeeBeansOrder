package coffee.coffeeshop.data;

import coffee.coffeeshop.model.domain.OrderAddress;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderSummary {

    private Long orderId;
    private OrderAddress orderAddress;
    private BigDecimal totalPrice;
    private List<OrderBeanSummary> orderItems = new ArrayList<>();



}
