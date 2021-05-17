package coffee.coffeeshop.converters;

import coffee.coffeeshop.model.domain.user.UserInformation;
import coffee.coffeeshop.request.EditUserInformationRequest;
import lombok.Builder;
import org.springframework.stereotype.Component;

@Component
public class UserConverter {
    public UserInformation fromEditUserInformationRequest(EditUserInformationRequest editUserInformationRequest) {
        return UserInformation.builder()
                .firstName(editUserInformationRequest.getFirstName())
                .lastName(editUserInformationRequest.getLastName())
                .city(editUserInformationRequest.getCity())
                .postCode(editUserInformationRequest.getPostCode())
                .street(editUserInformationRequest.getStreet())
                .build();

    }
}
