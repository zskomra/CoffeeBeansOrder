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

    private final BeansRepository beansRepository;
    private final OrderService orderService;

    public BeansController(BeansRepository beansRepository, OrderService orderService, UserRepository userRepository) {
        this.orderService = orderService;
        this.beansRepository = beansRepository;

    }


    @GetMapping()
    public ResponseEntity<List<Bean>> getBeans(){
       List<Bean> beanList = beansRepository.findAll();
       return ResponseEntity.ok(beanList);
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

