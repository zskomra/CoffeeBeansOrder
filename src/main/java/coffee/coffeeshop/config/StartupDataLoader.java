package coffee.coffeeshop.config;

import coffee.coffeeshop.model.domain.*;
import coffee.coffeeshop.model.domain.user.ERole;
import coffee.coffeeshop.model.domain.user.Role;
import coffee.coffeeshop.model.domain.user.User;
import coffee.coffeeshop.model.domain.user.UserInformation;
import coffee.coffeeshop.model.repositories.*;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;


import java.math.BigDecimal;
import java.util.*;

@Slf4j
@Component
@AllArgsConstructor
public class StartupDataLoader {

    private ProductRepository productRepository;
    private OrderRepository orderRepository;
    private RoleRepository roleRepository;
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private final ProductCategoryRepository productCategoryRepository;


    @EventListener
    public void loadData(ContextRefreshedEvent event) {

        ProductCategory productCategory1 = new ProductCategory(null,EProductCategory.BEANS);
        ProductCategory productCategory2 = new ProductCategory(null,EProductCategory.ACCESSORIES);
        ProductCategory productCategory3 = new ProductCategory(null,EProductCategory.APPLIANCES);

        productCategoryRepository.save(productCategory1);
        productCategoryRepository.save(productCategory2);
        productCategoryRepository.save(productCategory3);

        Product product1 = new Product(null, "COLOMBIAN BUCARAMANGA","This coffee works fantastically well in all brewing equipment, including espresso / cappuccino machines, cafetiere pots, paper / metal filter brewers, and Turkish brewers.", BigDecimal.valueOf(12),  Set.of(productCategory1));
        Product product2 = new Product(null, "GUATEMALA EL FOGON","All our single origin coffees are freshly roasted by us at our traditional family-run coffee roastery in rural Kent.", BigDecimal.valueOf(12.45),Set.of(productCategory1));
        Product product3 = new Product(null, "MONSOONED MALABAR","Cup profile: Light to medium light Sweet and Fairly soft", BigDecimal.valueOf(12.01),Set.of(productCategory1));

        Product save = productRepository.save(product1);
        Product save1 = productRepository.save(product2);
        Product save2 = productRepository.save(product3);

        Role role1 = new Role(null, ERole.ROLE_ADMIN);
        Role role2 = new Role(null, ERole.ROLE_USER);

        roleRepository.save(role1);
        roleRepository.save(role2);

        UserInformation userInformation = new UserInformation("Jan","Kowalski","75123","City","Wolna 1/2");
        User user1 = new User(null, "jan@test.pl", passwordEncoder.encode("password1"),  Set.of(role2),new ArrayList<>(), userInformation);
        userRepository.save(user1);

        Map<Product,Integer> orders = new HashMap<>();
        orders.put(save,3);
        orders.put(save1,3);
        Order order1 = new Order(null,BigDecimal.valueOf(122),new OrderAddress("Jan", "Kowalski","12345","City","Wolna"),orders,user1);
        Map<Product,Integer> orders2 = new HashMap<>();
        orders2.put(save2,5);
        Order order2 = new Order(null,BigDecimal.valueOf(122),new OrderAddress("Janek", "Kowalski2","12345","Miasto","Wolna"),orders2,user1);

        orderRepository.save(order1);
        orderRepository.save(order2);


    }
}
