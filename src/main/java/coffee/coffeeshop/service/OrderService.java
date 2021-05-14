package coffee.coffeeshop.service;

import coffee.coffeeshop.controllers.BeansController;
import coffee.coffeeshop.converters.OrderAddressConverter;
import coffee.coffeeshop.data.OrderBeanSummary;
import coffee.coffeeshop.data.OrderSummary;
import coffee.coffeeshop.model.domain.Bean;
import coffee.coffeeshop.model.domain.Order;
import coffee.coffeeshop.model.domain.OrderAddress;
import coffee.coffeeshop.model.repositories.BeansRepository;
import coffee.coffeeshop.model.repositories.OrderRepository;
import coffee.coffeeshop.request.AddOrderBeansRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.AbstractQuery;
import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class OrderService {

    private final OrderAddressConverter addressConverter;
    private final BeansRepository beansRepository;
    private final OrderRepository orderRepository;

    public Long save(BeansController.AddressAndBeans userData) {
        Order order = new Order();
        OrderAddress orderAddress = addressConverter.from(userData.orderAddress);
        HashMap<Bean,Integer> orderItems = convertToOrderItemsWithAmount(userData.orderItems);
        BigDecimal totalPrice = getTotalPrice(userData.orderItems);

        order.setOrderAddress(orderAddress);
        order.setTotalAmount(totalPrice);
        order.setOrderItems(orderItems);
        orderRepository.save(order);
        log.info(String.valueOf(order));
        return order.getId();
    }

    private BigDecimal getTotalPrice(AddOrderBeansRequest[] addOrderBeansRequest) {
        BigDecimal totalPrice = Arrays.stream(addOrderBeansRequest)
                .map(beans -> BigDecimal.valueOf(beans.getAmount()).multiply(beans.getPrice()))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        return totalPrice;
    }

    private HashMap<Bean,Integer> convertToOrderItemsWithAmount(AddOrderBeansRequest[] addOrderBeansRequest) {
        HashMap<Bean,Integer> orderItems = new HashMap<>();
        Arrays.stream(addOrderBeansRequest)
                .forEach(beans ->
                        orderItems.put(beansRepository.findById(beans.getId()).orElseThrow(), beans.getAmount()));
        return orderItems;
    }



    public List<OrderSummary> findUserOrders(String username) {
        List<OrderSummary> userOrdersSummary = new ArrayList<>();
        List<Order> userOrders = orderRepository.getAllByUserUsername(username).orElseThrow();
        userOrders.forEach(order -> userOrdersSummary.add(new OrderSummary(order.getId(),order.getOrderAddress(),order.getTotalAmount(),
                convertOrderItemsToOrderItemsSummary(order.getOrderItems()))));

        return userOrdersSummary;

    }

    public List<OrderBeanSummary> convertOrderItemsToOrderItemsSummary (Map<Bean,Integer> orderItems) {
        List<OrderBeanSummary> items = new ArrayList<>();
        orderItems.forEach((bean,value) -> items.add(
                OrderBeanSummary.builder()
                        .beanId(bean.getId())
                        .name(bean.getName())
                        .amount(value)
                        .price(bean.getPrice())
                        .build()));
        return items;
    }
}
