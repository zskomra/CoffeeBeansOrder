package coffee.coffeeshop.converters;

import coffee.coffeeshop.model.domain.OrderAddress;
import coffee.coffeeshop.request.AddOrderAddressRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class OrderAddressConverter {


    public OrderAddress from(AddOrderAddressRequest orderAddress) {
        if(orderAddress == null) throw new IllegalArgumentException("Request cannot be null");
        return OrderAddress.builder()
                .firstName(orderAddress.getFirstName())
                .lastName(orderAddress.getLastName())
                .city(orderAddress.getCity())
                .postCode(orderAddress.getPostCode())
                .street(orderAddress.getStreet())
                .build();
    }
}
