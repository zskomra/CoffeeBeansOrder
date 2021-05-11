package coffee.coffeeshop.controllers;

import coffee.coffeeshop.model.domain.*;
import coffee.coffeeshop.model.domain.user.User;
import coffee.coffeeshop.model.repositories.BeansRepository;

import coffee.coffeeshop.model.repositories.UserRepository;
import coffee.coffeeshop.request.AddOrderAddressRequest;
import coffee.coffeeshop.request.AddOrderBeansRequest;
import coffee.coffeeshop.service.OrderService;
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
public class BeansController {

    private BeansRepository beansRepository;
    private OrderService orderService;

    public BeansController(BeansRepository beansRepository, OrderService orderService, UserRepository userRepository) {
        this.orderService = orderService;
        this.beansRepository = beansRepository;

    }


    @GetMapping()
    public List<Bean> getBeans() {
        return beansRepository.findAll();
    }


    @PostMapping()
    public ResponseEntity<?> saveOrderData(@Valid @RequestBody AddressAndBeans userData) {
        Long name = orderService.save(userData);
        return ResponseEntity.ok("ok");
    }


    public static class AddressAndBeans {
        public AddOrderAddressRequest orderAddress;
        public AddOrderBeansRequest[] orderItems;

}
}

