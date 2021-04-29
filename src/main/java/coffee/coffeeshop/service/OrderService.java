package coffee.coffeeshop.service;

import coffee.coffeeshop.controllers.BeansController;
import coffee.coffeeshop.converters.OrderAddressConverter;
import coffee.coffeeshop.model.domain.OrderAddress;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderService {

    private final OrderAddressConverter addressConverter;

    public String save(BeansController.AddressAndBeans userData) {
        OrderAddress orderAddress;
        orderAddress = addressConverter.from(userData.orderAddress);
        return orderAddress.getFirstName();
    }
}
