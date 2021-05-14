package coffee.coffeeshop.controllers;


import coffee.coffeeshop.config.security.service.jwt.JwtUtils;
import coffee.coffeeshop.model.domain.user.UserDetails;
import coffee.coffeeshop.model.repositories.UserRepository;
import coffee.coffeeshop.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin("*")
@Slf4j
@Transactional
@RequiredArgsConstructor
public class UserController {
    @Autowired
    JwtUtils jwtUtils;
    @Autowired
    UserRepository userRepository;

    private final UserService userService;

    @GetMapping()
    public UserDetails getUserDetails(@RequestHeader(required = false)HttpHeaders httpHeaders) {
        String username = userService.getUserUsername(httpHeaders);
        UserDetails userDetails = userRepository.findByUsername(username).get().getUserDetails();
        if(userDetails == null) {
            userDetails = new UserDetails();
            userDetails.setCity("");
            userDetails.setFirstName("");
            userDetails.setLastName("");
            userDetails.setStreet("");
            userDetails.setPostCode("");
        }
        return userDetails;
    }
}
