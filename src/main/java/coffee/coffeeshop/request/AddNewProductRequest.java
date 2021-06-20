package coffee.coffeeshop.request;

import coffee.coffeeshop.model.domain.EProductCategory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AddNewProductRequest {

    private String name;
    private String description;
    private String specific;
    private String price;
    private EProductCategory productCategory;

}
