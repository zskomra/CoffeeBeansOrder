package coffee.coffeeshop.controllers;

import coffee.coffeeshop.config.security.service.UserDetailsImpl;
import coffee.coffeeshop.model.domain.Product;
import coffee.coffeeshop.model.domain.ProductCategory;
import coffee.coffeeshop.model.repositories.ProductCategoryRepository;
import coffee.coffeeshop.model.repositories.ProductRepository;
import coffee.coffeeshop.request.AddNewProductRequest;
import coffee.coffeeshop.response.MessageResponse;
import coffee.coffeeshop.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.Collection;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
@Slf4j
@Transactional
@RequiredArgsConstructor
public class AdminController {

    private final ProductService productService;
    private final ProductCategoryRepository categoryRepository;


    @GetMapping("/categories")
    public ResponseEntity<List<ProductCategory>> getAllCategories() {
        List<ProductCategory> categories = categoryRepository.findAll();
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

    @PostMapping("/product/add-new")
    public ResponseEntity<?> addNewProduct(@RequestBody AddNewProductRequest productRequest) {
        log.info(String.valueOf(productRequest));
        //todo check if user logged  and role is admin , add what if method failed

        Product product = productService.addNewProduct(productRequest);
        return ResponseEntity.ok(new MessageResponse("Product added successfully"));
    }


}
