package coffee.coffeeshop.config;

import coffee.coffeeshop.data.OrderBeanSummary;
import coffee.coffeeshop.data.OrderSummary;
import coffee.coffeeshop.model.domain.Bean;
import coffee.coffeeshop.model.domain.Order;
import coffee.coffeeshop.model.domain.OrderAddress;
import coffee.coffeeshop.model.domain.user.ERole;
import coffee.coffeeshop.model.domain.user.Role;
import coffee.coffeeshop.model.domain.user.User;
import coffee.coffeeshop.model.domain.user.UserDetails;
import coffee.coffeeshop.model.repositories.BeansRepository;
import coffee.coffeeshop.model.repositories.OrderRepository;
import coffee.coffeeshop.model.repositories.RoleRepository;
import coffee.coffeeshop.model.repositories.UserRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;


import java.math.BigDecimal;
import java.util.*;

@Slf4j
@Component
@AllArgsConstructor
public class StartupDataLoader {

    private BeansRepository beansRepository;
    private OrderRepository orderRepository;
    private RoleRepository roleRepository;
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;


    @EventListener
    public void loadData(ContextRefreshedEvent event) {
        Bean bean1 = new Bean(null, "COLOMBIAN BUCARAMANGA","This coffee works fantastically well in all brewing equipment, including espresso / cappuccino machines, cafetiere pots, paper / metal filter brewers, and Turkish brewers.", BigDecimal.valueOf(12));
        Bean bean2 = new Bean(null, "GUATEMALA EL FOGON","All our single origin coffees are freshly roasted by us at our traditional family-run coffee roastery in rural Kent.", BigDecimal.valueOf(12.45));
        Bean bean3 = new Bean(null, "MONSOONED MALABAR","Cup profile: Light to medium light Sweet and Fairly soft", BigDecimal.valueOf(12.01));

        Bean save = beansRepository.save(bean1);
        Bean save1 = beansRepository.save(bean2);
        Bean save2 = beansRepository.save(bean3);

        Role role1 = new Role(null, ERole.ROLE_ADMIN);
        Role role2 = new Role(null, ERole.ROLE_USER);

        roleRepository.save(role1);
        roleRepository.save(role2);

        UserDetails userDetails = new UserDetails("Jan","Kowalski","75123","City","Wolna 1/2");
        User user1 = new User(null, "jan@test.pl", passwordEncoder.encode("password1"),  Set.of(role2),userDetails);
        userRepository.save(user1);

        Map<Bean,Integer> orders = new HashMap<>();
        orders.put(save,3);
        orders.put(save1,3);
        Order order1 = new Order(null,BigDecimal.valueOf(122),new OrderAddress("Jan", "Kowalski","12345","City","Wolna"),orders);
        Map<Bean,Integer> orders2 = new HashMap<>();
        orders2.put(save2,5);
        Order order2 = new Order(null,BigDecimal.valueOf(122),new OrderAddress("Janek", "Kowalski2","12345","Miasto","Wolna"),orders2);

        orderRepository.save(order1);
        orderRepository.save(order2);


    }
}
