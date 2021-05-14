package coffee.coffeeshop.controllers;


import coffee.coffeeshop.config.StartupDataLoader;
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
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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


    @GetMapping()
    public ResponseEntity<?> getUserOrders(@RequestHeader HttpHeaders httpHeaders) {
        String username = userService.getUserUsername(httpHeaders);
        List<OrderSummary> userOrdersSummary;
        userOrdersSummary = orderService.findUserOrders(username);
        return ResponseEntity.ok(userOrdersSummary);
    }

}
