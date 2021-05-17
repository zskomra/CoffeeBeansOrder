package coffee.coffeeshop.model.repositories;

import coffee.coffeeshop.model.domain.EProductCategory;
import coffee.coffeeshop.model.domain.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {
    Optional<ProductCategory> findByName(EProductCategory name);
}
