package coffee.coffeeshop.converters;

import coffee.coffeeshop.model.domain.Product;
import coffee.coffeeshop.request.AddNewProductRequest;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class ProductConverter {
    public Product fromProductRequestToProduct(AddNewProductRequest productRequest) {

        BigDecimal price = new BigDecimal(productRequest.getPrice());
        return Product.builder()
                .name(productRequest.getName())
                .description(productRequest.getDescription())
                .price(price)
                .build();
    }
}
