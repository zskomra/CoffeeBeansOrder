package coffee.coffeeshop.controllers;


import coffee.coffeeshop.config.security.service.jwt.JwtUtils;
import coffee.coffeeshop.data.OrderSummary;
import coffee.coffeeshop.model.repositories.OrderRepository;
import coffee.coffeeshop.request.AddOrderAddressRequest;
import coffee.coffeeshop.request.AddOrderBeansRequest;
import coffee.coffeeshop.service.OrderService;
import coffee.coffeeshop.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
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
        return new ResponseEntity<>(orderSummaries, HttpStatus.OK);

    }

    @PostMapping()
    public ResponseEntity<?> saveOrderData(@Valid @RequestBody OrderController.AddressAndBeans userData) {
        log.info(userData.idToken);
        log.info(jwtUtils.getUserNameFromJwtToken(userData.idToken));
        Long name = orderService.save(userData);
        return ResponseEntity.ok("ok");
    }


    public static class AddressAndBeans {
        public String idToken;
        public AddOrderAddressRequest orderAddress;
        public AddOrderBeansRequest[] orderItems;

    }

}
