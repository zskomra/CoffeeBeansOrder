package coffee.coffeeshop.model.domain;

import coffee.coffeeshop.model.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private BigDecimal totalAmount;

    @Embedded
    private OrderAddress orderAddress;

    @ElementCollection(fetch = FetchType.EAGER)
    @Column
    private Map<Product,Integer> orderItems = new HashMap<>();

    @ManyToOne(fetch = FetchType.EAGER)
    private User user;

}
