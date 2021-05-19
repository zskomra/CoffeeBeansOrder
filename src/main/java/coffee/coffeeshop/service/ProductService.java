package coffee.coffeeshop.service;

import coffee.coffeeshop.model.domain.Product;
import coffee.coffeeshop.model.repositories.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class ProductService {

    private final ProductRepository productRepository;

    public Optional<Product> findProductById(Long id) {
        Optional<Product> product = productRepository.findById(id);
        return product;
    }
}
