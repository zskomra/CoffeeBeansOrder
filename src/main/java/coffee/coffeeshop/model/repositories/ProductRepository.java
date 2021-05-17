package coffee.coffeeshop.model.repositories;

import coffee.coffeeshop.model.domain.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
