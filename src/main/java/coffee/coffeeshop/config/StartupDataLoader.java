package coffee.coffeeshop.config;

import coffee.coffeeshop.data.OrderBeanSummary;
import coffee.coffeeshop.data.OrderSummary;
import coffee.coffeeshop.model.domain.Bean;
import coffee.coffeeshop.model.domain.Order;
import coffee.coffeeshop.model.domain.OrderAddress;
import coffee.coffeeshop.model.repositories.BeansRepository;
import coffee.coffeeshop.model.repositories.OrderRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;


import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Component
public class StartupDataLoader {

    private BeansRepository beansRepository;
    private OrderRepository orderRepository;
    public StartupDataLoader(BeansRepository beansRepository, OrderRepository orderRepository) {
        this.beansRepository = beansRepository;
        this.orderRepository = orderRepository;
    }

    @EventListener
    public void loadData(ContextRefreshedEvent event) {
        Bean bean1 = new Bean(null, "COLOMBIAN BUCARAMANGA","This coffee works fantastically well in all brewing equipment, including espresso / cappuccino machines, cafetiere pots, paper / metal filter brewers, and Turkish brewers.", BigDecimal.valueOf(12));
        Bean bean2 = new Bean(null, "GUATEMALA EL FOGON","All our single origin coffees are freshly roasted by us at our traditional family-run coffee roastery in rural Kent.", BigDecimal.valueOf(12.45));
        Bean bean3 = new Bean(null, "MONSOONED MALABAR","Cup profile: Light to medium light Sweet and Fairly soft", BigDecimal.valueOf(12.01));

        Bean save = beansRepository.save(bean1);
        Bean save1 = beansRepository.save(bean2);
        Bean save2 = beansRepository.save(bean3);



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
