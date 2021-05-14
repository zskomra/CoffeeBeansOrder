package coffee.coffeeshop.model.repositories;

import coffee.coffeeshop.model.domain.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order,Long> {
    Optional<List<Order>> getAllByUserUsername(String username);
}
