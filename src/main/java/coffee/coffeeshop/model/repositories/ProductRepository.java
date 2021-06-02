package coffee.coffeeshop.model.repositories;

import coffee.coffeeshop.model.domain.EProductCategory;
import coffee.coffeeshop.model.domain.Product;
import coffee.coffeeshop.model.domain.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Set;

public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findProductByProductCategories(ProductCategory category);
    List<Product> findAllByNameContaining(String param);

    @Query(value = "SELECT p from Product p where lower(p.name) like concat('%',:param,'%') ")
    List<Product> findAllProductsContainingParam(String param);

}
