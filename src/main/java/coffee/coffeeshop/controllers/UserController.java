package coffee.coffeeshop.controllers;


import coffee.coffeeshop.config.security.service.UserDetailsImpl;
import coffee.coffeeshop.config.security.service.UserDetailsServiceImpl;
import coffee.coffeeshop.config.security.service.jwt.JwtUtils;
import coffee.coffeeshop.model.domain.user.User;
import coffee.coffeeshop.model.domain.user.UserDetails;
import coffee.coffeeshop.model.repositories.UserRepository;
import coffee.coffeeshop.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
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
            UserDetails userDetails = userRepository.findByUsername(username).get().getUserDetails();
                if (userDetails == null) {
                        userDetails = new UserDetails();
                        userDetails.setCity("");
                        userDetails.setFirstName("");
                        userDetails.setLastName("");
                        userDetails.setStreet("");
                        userDetails.setPostCode("");
                            }
                return new ResponseEntity<>(userDetails, HttpStatus.OK);

        }
    }

