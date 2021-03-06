package coffee.coffeeshop.controllers;

import coffee.coffeeshop.config.security.service.jwt.JwtUtils;
import coffee.coffeeshop.model.domain.*;
import coffee.coffeeshop.model.repositories.ProductCategoryRepository;
import coffee.coffeeshop.model.repositories.ProductRepository;

import coffee.coffeeshop.request.AddNewProductRequest;
import coffee.coffeeshop.request.AddOrderAddressRequest;
import coffee.coffeeshop.request.AddOrderBeansRequest;
import coffee.coffeeshop.service.OrderService;
import coffee.coffeeshop.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;



@RestController
@RequestMapping("/api")
@Slf4j
@Transactional
@RequiredArgsConstructor
public class ProductController {

    private final ProductRepository productRepository;
    private final OrderService orderService;
    private final JwtUtils jwtUtils;
    private final ProductCategoryRepository categoryRepository;
    private final ProductService productService;


    @GetMapping("/beans/{id}")
    public ResponseEntity<Product> getProduct(@PathVariable Long id) {
        Optional<Product> product = productService.findProductById(id);
        if (product.isPresent()) {
            return ResponseEntity.ok(product.get());
        } else throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found");
    }

    @GetMapping("/products/all")
    public ResponseEntity<List<Product>> getAllProducts() {

        List<Product> productList = productRepository.findAll();
        return ResponseEntity.ok(productList);
    }

    @GetMapping("/products/beans")
    public ResponseEntity<List<Product>> getBeans() {
        ProductCategory beans = categoryRepository.findByName(EProductCategory.BEANS).orElseThrow();
        List<Product> productList = productRepository.findProductByProductCategories(beans);
        return ResponseEntity.ok(productList);
    }

    @GetMapping("/products/appliances")
    public ResponseEntity<List<Product>> getAppliances() {
        ProductCategory appliances = categoryRepository.findByName(EProductCategory.APPLIANCES).orElseThrow();
        List<Product> productList = productRepository.findProductByProductCategories(appliances);
        log.info(String.valueOf(productList));
        return ResponseEntity.ok(productList);
    }

    @GetMapping("/products/accessories")
    public ResponseEntity<List<Product>> getAccessories() {
        ProductCategory accessories = categoryRepository.findByName(EProductCategory.ACCESSORIES).orElseThrow();
        List<Product> productList = productRepository.findProductByProductCategories(accessories);
        return ResponseEntity.ok(productList);
    }

    @GetMapping("products/{query}")
    public ResponseEntity<?> getProductsFromQuery(@PathVariable String query) {
        log.info(query);
        String paramToFind = query.toLowerCase();
        List<Product> allByNameContaining = productRepository.findAllProductsContainingParam(paramToFind);
        log.info(String.valueOf(allByNameContaining.size()));
        log.info(String.valueOf(allByNameContaining));
        return new ResponseEntity<>(allByNameContaining, HttpStatus.OK);
    }
}

