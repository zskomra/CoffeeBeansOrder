package coffee.coffeeshop.model.repositories;

import coffee.coffeeshop.model.domain.Contact;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactRepository extends JpaRepository<Contact,Long> {
}
