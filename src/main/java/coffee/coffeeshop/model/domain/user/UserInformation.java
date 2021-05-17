package coffee.coffeeshop.model.domain.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Embeddable;

@Embeddable
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class UserInformation {

    private String firstName;
    private String lastName;
    private String postCode;
    private String city;
    private String street;

}
