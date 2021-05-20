package coffee.coffeeshop.controllers;


import coffee.coffeeshop.config.security.service.UserDetailsImpl;
import coffee.coffeeshop.config.security.service.jwt.JwtUtils;
import coffee.coffeeshop.model.domain.user.UserInformation;
import coffee.coffeeshop.model.repositories.UserRepository;
import coffee.coffeeshop.request.AddOrderAddressRequest;
import coffee.coffeeshop.request.AddOrderBeansRequest;
import coffee.coffeeshop.request.EditUserInformationRequest;
import coffee.coffeeshop.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin("*")
@Slf4j
@Transactional
@RequiredArgsConstructor
public class UserController {

    private final JwtUtils jwtUtils;

    private final UserRepository userRepository;

    private final UserService userService;
//    private final UserDetailsServiceImpl userDetails;

    @GetMapping()
    public ResponseEntity<?> getUserDetails() {
        UserDetailsImpl userDetailsImpl = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username = userDetailsImpl.getUsername();
        UserInformation userInformation = userRepository.findByUsername(username).get().getUserInformation();
        if (userInformation == null) {
            userInformation = new UserInformation();
            userInformation.setCity("");
            userInformation.setFirstName("");
            userInformation.setLastName("");
            userInformation.setStreet("");
            userInformation.setPostCode("");
        }
        return new ResponseEntity<>(userInformation, HttpStatus.OK);

    }

    @PostMapping
    public ResponseEntity<?> editUserInformation(@RequestBody EditUserInformationRequest editUserInformation) {
        Boolean isUpdateSuccessful = userService.editUserInformation(editUserInformation);
        return new ResponseEntity<>(isUpdateSuccessful, HttpStatus.OK);
    }


}

