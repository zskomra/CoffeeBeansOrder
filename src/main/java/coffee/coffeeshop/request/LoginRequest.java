package coffee.coffeeshop.request;

import lombok.Builder;
import lombok.Data;

import javax.validation.constraints.Email;

@Builder
@Data
public class LoginRequest {

    @Email
    private String username;

    private String password;
}
