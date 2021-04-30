package coffee.coffeeshop.service;

import coffee.coffeeshop.controllers.BeansController;
import coffee.coffeeshop.converters.OrderAddressConverter;
import coffee.coffeeshop.model.domain.Bean;
import coffee.coffeeshop.model.domain.Beans;
import coffee.coffeeshop.model.domain.Order;
import coffee.coffeeshop.model.domain.OrderAddress;
import coffee.coffeeshop.model.repositories.BeansRepository;
import coffee.coffeeshop.model.repositories.OrderRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderService {

    private final OrderAddressConverter addressConverter;
    private final BeansRepository beansRepository;
    private final OrderRepository orderRepository;

    public Long save(BeansController.AddressAndBeans userData) {
        Order order = new Order();
        HashMap<Optional<Bean>,Integer> orderItems = new HashMap<>();
        OrderAddress orderAddress = addressConverter.from(userData.orderAddress);

        Arrays.stream(userData.orderItems)
                .forEach(beans ->
                       orderItems.put(beansRepository.findById(beans.getId()), beans.getAmount()));

        BigDecimal totalPrice = Arrays.stream(userData.orderItems)
                .map(beans -> BigDecimal.valueOf(beans.getAmount()).multiply(beans.getPrice()))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        order.setOrderAddress(orderAddress);
        order.setTotalAmount(totalPrice);
        order.setOrderItems(orderItems);
        orderRepository.save(order);

        return order.getId();
    }
}
