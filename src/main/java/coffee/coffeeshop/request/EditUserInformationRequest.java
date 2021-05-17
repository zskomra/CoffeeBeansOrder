package coffee.coffeeshop.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EditUserInformationRequest {
    private String firstName;
    private String lastName;
    private String postCode;
    private String city;
    private String street;
    private String idToken;


}
