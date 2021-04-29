package coffee.coffeeshop.controllers;

import coffee.coffeeshop.model.domain.*;
import coffee.coffeeshop.model.repositories.BeansRepository;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;


@RestController
@RequestMapping("/api/beans")
@CrossOrigin("*")
@Slf4j
public class BeansController {

    private BeansRepository beansRepository;

    public BeansController(BeansRepository beansRepository) {
        this.beansRepository = beansRepository;
    }


    @GetMapping()
    public List<Bean> getBeans() {
        return beansRepository.findAll();
    }


    @PostMapping()
    public ResponseEntity<?> saveAddress(@RequestBody AddressAndBeans userData) {
        log.info(userData.orderAddress.getCity());
        log.info(Arrays.toString(userData.orderItems));
        return ResponseEntity.ok("ok");
    }


    static class AddressAndBeans {
    public OrderAddress orderAddress;
    public Beans [] orderItems;

}
}

