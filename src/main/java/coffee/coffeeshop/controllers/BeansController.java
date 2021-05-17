package coffee.coffeeshop.controllers;

import coffee.coffeeshop.config.security.service.jwt.JwtUtils;
import coffee.coffeeshop.model.domain.*;
import coffee.coffeeshop.model.repositories.ProductRepository;

import coffee.coffeeshop.request.AddOrderAddressRequest;
import coffee.coffeeshop.request.AddOrderBeansRequest;
import coffee.coffeeshop.service.OrderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.util.List;


@RestController
@RequestMapping("/api/beans")
@CrossOrigin("*")
@Slf4j
@Transactional
@RequiredArgsConstructor
public class BeansController {

    private final ProductRepository productRepository;
    private final OrderService orderService;
    private final JwtUtils jwtUtils;




    @GetMapping()
    public ResponseEntity<List<Product>> getBeans(){
       List<Product> productList = productRepository.findAll();
       return ResponseEntity.ok(productList);
    }


    @PostMapping()
    public ResponseEntity<?> saveOrderData(@Valid @RequestBody AddressAndBeans userData) {
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

