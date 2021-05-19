package coffee.coffeeshop.model.repositories;

import coffee.coffeeshop.model.domain.EProductCategory;
import coffee.coffeeshop.model.domain.Product;
import coffee.coffeeshop.model.domain.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Set;

public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findProductByProductCategories(ProductCategory category);
}
