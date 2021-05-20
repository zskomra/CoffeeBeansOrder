package coffee.coffeeshop.service;

import coffee.coffeeshop.converters.ProductConverter;
import coffee.coffeeshop.model.domain.Product;
import coffee.coffeeshop.model.domain.ProductCategory;
import coffee.coffeeshop.model.repositories.ProductCategoryRepository;
import coffee.coffeeshop.model.repositories.ProductRepository;
import coffee.coffeeshop.request.AddNewProductRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductConverter productConverter;
    private final ProductCategoryRepository productCategoryRepository;

    public Optional<Product> findProductById(Long id) {
        Optional<Product> product = productRepository.findById(id);
        return product;
    }


    public Product addNewProduct(AddNewProductRequest productRequest) {
        Product product = productConverter.fromProductRequestToProduct(productRequest);
        ProductCategory categoryByName = productCategoryRepository.findByName(productRequest
                .getProductCategory()).orElseThrow();

        Set<ProductCategory> productCategory = Set.of(categoryByName);
        product.setProductCategories(productCategory);
        Product save = productRepository.save(product);

        return save;
    }
}
