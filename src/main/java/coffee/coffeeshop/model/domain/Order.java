//package coffee.coffeeshop.model.domain;
//
//import javax.persistence.*;
//import java.math.BigDecimal;
//import java.util.ArrayList;
//import java.util.List;
//
//@Entity
//public class Order {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//    private BigDecimal totalAmount;
//
//    @Embedded
//    private OrderAddress orderAddress;
//
//    @ManyToMany
//    private List<Bean> beans = new ArrayList<>();
//
//}
