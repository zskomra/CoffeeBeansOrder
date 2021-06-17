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

        Product appliances1 = new Product(null,"Lelit MaraX","The Lelit MaraX is an E61-type group having automatic brew temperature control that allows all users to easily pull the perfect espresso shot.",BigDecimal.valueOf(1000.90),Set.of(productCategory3));
        Product appliances2 = new Product(null,"Oscar II","The Oscar II much like its predecessor has been built around the idea of bringing professional quality espresso into the home.",BigDecimal.valueOf(699.90),Set.of(productCategory3));
        Product appliances3 = new Product(null,"ECM Synchronica","The ECM Synchronika is a German designed and built dual boiler espresso machine that combines rational, modern design with subtle race car inspired elements.",BigDecimal.valueOf(2000.00),Set.of(productCategory3));

        productRepository.save(appliances1);
        productRepository.save(appliances2);
        productRepository.save(appliances3);

        Product accessories1 = new Product(null,"Milk jug - PLA301M","Medium stainless steel milk jug (50cl) complete of a latte art pen.",BigDecimal.valueOf(49.90),Set.of(productCategory2));
        Product accessories2 = new Product(null,"Filterholders  - PLA582S","LELIT58 2-ways filterholder, with Coffee Slide spout, black handle and 4 filters: 1 dose (9-11 gr), 2 doses (14-18 gr), 2 doses PLUS (18-21 gr) and blind filter.",BigDecimal.valueOf(69.90),Set.of(productCategory2));
        Product accessories3 = new Product(null,"Cup - PL302","190 cc Lelit porcelain cappuccino cup with saucer, 6 pcs.",BigDecimal.valueOf(99.90),Set.of(productCategory2));

        productRepository.save(accessories1);
        productRepository.save(accessories2);
        productRepository.save(accessories3);

        Role role1 = new Role(null, ERole.ROLE_ADMIN);
        Role role2 = new Role(null, ERole.ROLE_USER);

        roleRepository.save(role1);
        roleRepository.save(role2);

        UserInformation userInformation = new UserInformation("Jan","Kowalski","75123","City","Wolna 1/2");
        User user1 = new User(null, "user@user.pl", passwordEncoder.encode("password"),  Set.of(role2),new ArrayList<>(), userInformation);
        userRepository.save(user1);
        User user2 = new User(null,"admin@admin.pl", passwordEncoder.encode("admin"),Set.of(role1),new ArrayList<>(),userInformation );
        userRepository.save(user2);

        Map<Product,Integer> orders = new HashMap<>();
        orders.put(save,3);
        orders.put(save1,3);
        Order order1 = new Order(null,BigDecimal.valueOf(122),new OrderAddress("Jan", "Kowalski","12345","Gdansk","Wolna 1/2"),orders,user1);
        Map<Product,Integer> orders2 = new HashMap<>();
        orders2.put(save2,5);
        Order order2 = new Order(null,BigDecimal.valueOf(124),new OrderAddress("Jan", "Kowalski","11111","Gdynia","Wolna 3/5"),orders2,user1);
        orderRepository.save(order2);
        orderRepository.save(order1);



    }
}
