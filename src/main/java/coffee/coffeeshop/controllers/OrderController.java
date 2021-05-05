package coffee.coffeeshop.controllers;


import coffee.coffeeshop.config.StartupDataLoader;
import coffee.coffeeshop.data.OrderBeanSummary;
import coffee.coffeeshop.data.OrderSummary;
import coffee.coffeeshop.model.domain.Bean;
import coffee.coffeeshop.model.domain.Order;
import coffee.coffeeshop.model.repositories.OrderRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin("*")
@Slf4j
@Transactional
public class OrderController {

    private OrderRepository orderRepository;

    public OrderController(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @GetMapping()

    public List<OrderSummary> getOrders() {
        List<OrderBeanSummary> order1BeansSummary = new ArrayList<>();
        orderRepository.getOne(1L)
                .getOrderItems()
                .forEach((bean, value) -> order1BeansSummary.add(new OrderBeanSummary(bean.getId(),bean.getName(),value,bean.getPrice())));

        Order order1 = orderRepository.getOne(1L);
        OrderSummary orderSummary = new OrderSummary(order1.getId(), order1.getOrderAddress(), order1.getTotalAmount(),order1BeansSummary);

        List<OrderBeanSummary> order2BeansSummary = new ArrayList<>();
        orderRepository.getOne(2L)
                .getOrderItems()
                .forEach((bean, value) -> order2BeansSummary.add(new OrderBeanSummary(bean.getId(),bean.getName(),value,bean.getPrice())));

        Order order2 = orderRepository.getOne(2L);
        OrderSummary orderSummary2 = new OrderSummary(order2.getId(), order2.getOrderAddress(), order2.getTotalAmount(),order2BeansSummary);

        List<OrderSummary> orderSummaries = new ArrayList<>();
        orderSummaries.add(orderSummary);
        orderSummaries.add(orderSummary2);

        return orderSummaries;

    }
}
