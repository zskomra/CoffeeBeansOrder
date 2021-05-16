package coffee.coffeeshop.service;

import coffee.coffeeshop.config.security.service.UserDetailsImpl;
import coffee.coffeeshop.config.security.service.jwt.JwtUtils;
import coffee.coffeeshop.model.domain.user.User;
import coffee.coffeeshop.model.repositories.UserRepository;
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
    }

