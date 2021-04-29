package coffee.coffeeshop.model.repositories;

import coffee.coffeeshop.model.domain.Bean;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BeansRepository extends JpaRepository<Bean, Long> {
}
