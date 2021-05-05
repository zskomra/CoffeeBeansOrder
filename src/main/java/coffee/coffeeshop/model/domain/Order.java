package coffee.coffeeshop.model.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Fetch;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.repository.cdi.Eager;

import javax.persistence.*;
import javax.swing.text.html.Option;
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



//    ??
//    @MapKeyJoinColumn(name = "bean")
    @ElementCollection(fetch = FetchType.EAGER)
    @Column
    private Map<Bean,Integer> orderItems = new HashMap<>();

}
