package coffee.coffeeshop.service;

import coffee.coffeeshop.config.security.service.UserDetailsImpl;
import coffee.coffeeshop.config.security.service.jwt.JwtUtils;
import coffee.coffeeshop.controllers.UserController;
import coffee.coffeeshop.converters.UserConverter;
import coffee.coffeeshop.model.domain.user.User;
import coffee.coffeeshop.model.domain.user.UserInformation;
import coffee.coffeeshop.model.repositories.UserRepository;
import coffee.coffeeshop.request.EditUserInformationRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final JwtUtils jwtUtils;
    private final UserConverter userConverter;

    public String getLoggedUsername() {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username = userDetails.getUsername();
        return username;
    }
    public User getLoggedUser() {
        return userRepository.findByUsername(getLoggedUsername()).orElseThrow(() -> new UsernameNotFoundException("No logged user found"));
    }

    public User getUserFromToken(String token) {
        String userNameFromJwtToken = jwtUtils.getUserNameFromJwtToken(token);
        User user = userRepository.findByUsername(userNameFromJwtToken).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        log.info("From userservice i username : {}", user.getUsername());
        return user;

    }

    public boolean editUserInformation(EditUserInformationRequest editUserInformationRequest) {
        try {
            UserInformation userInformation = userConverter.fromEditUserInformationRequest(editUserInformationRequest);
            User user = getUserFromToken(editUserInformationRequest.getIdToken());
            user.setUserInformation(userInformation);
            return true;
        } catch (IllegalArgumentException e) {
            return false;
        }
    }
}

