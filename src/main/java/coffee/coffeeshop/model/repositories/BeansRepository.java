package coffee.coffeeshop.model.repositories;

import coffee.coffeeshop.model.domain.Beans;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BeansRepository extends JpaRepository<Beans, Long> {
}
