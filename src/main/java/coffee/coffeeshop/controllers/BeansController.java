package coffee.coffeeshop.controllers;

import coffee.coffeeshop.model.domain.Beans;
import coffee.coffeeshop.model.repositories.BeansRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/beans")
@CrossOrigin("*")
public class BeansController {

    private BeansRepository beansRepository;

    public BeansController(BeansRepository beansRepository) {
        this.beansRepository = beansRepository;
    }


    @GetMapping
    public List<Beans> getBeans() {
        return beansRepository.findAll();
    }
}