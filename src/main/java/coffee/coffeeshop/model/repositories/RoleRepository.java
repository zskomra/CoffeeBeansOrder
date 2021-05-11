package coffee.coffeeshop.model.repositories;

import coffee.coffeeshop.model.domain.user.ERole;
import coffee.coffeeshop.model.domain.user.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findByName(ERole name);
}
