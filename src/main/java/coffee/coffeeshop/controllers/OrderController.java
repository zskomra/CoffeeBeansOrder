package coffee.coffeeshop.controllers;


import coffee.coffeeshop.config.StartupDataLoader;
import coffee.coffeeshop.config.security.service.UserDetailsImpl;
import coffee.coffeeshop.config.security.service.jwt.JwtUtils;
import coffee.coffeeshop.data.OrderBeanSummary;
import coffee.coffeeshop.data.OrderSummary;
import coffee.coffeeshop.model.domain.Bean;
import coffee.coffeeshop.model.domain.Order;
import coffee.coffeeshop.model.repositories.OrderRepository;
import coffee.coffeeshop.service.OrderService;
import coffee.coffeeshop.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin("*")
@Slf4j
@Transactional
@RequiredArgsConstructor
public class OrderController {

    private final OrderRepository orderRepository;
    private final UserService userService;
    private final OrderService orderService;
    private final JwtUtils jwtUtils;
    private final AuthenticationManager authenticationManager;

        @GetMapping()
        public ResponseEntity<?> getUserOrders() {
                 String username = userService.getLoggedUsername();
                List<OrderSummary> orderSummaries = orderService.findUserOrders(username);
            return new ResponseEntity<>(orderSummaries,HttpStatus.OK);

    }

}
