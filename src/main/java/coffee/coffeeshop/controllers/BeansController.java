package coffee.coffeeshop.controllers;

import coffee.coffeeshop.model.domain.*;
import coffee.coffeeshop.model.repositories.BeansRepository;

import coffee.coffeeshop.request.AddOrderAddressRequest;
import coffee.coffeeshop.request.AddOrderBeansRequest;
import coffee.coffeeshop.service.OrderService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;


@RestController
@RequestMapping("/api/beans")
@CrossOrigin("*")
@Slf4j
public class BeansController {

    private BeansRepository beansRepository;
    private OrderService orderService;

    public BeansController(BeansRepository beansRepository, OrderService orderService) {
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

