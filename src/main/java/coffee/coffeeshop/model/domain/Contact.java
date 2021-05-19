package coffee.coffeeshop.model.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Email;

@Entity
@Data
@Table(name = "contact")
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Contact {
    @Id
    @GeneratedValue
    private Long id;

    @Email
    @Column
    private String email;
    @Column
    private String topic;
    @Column
    private String description;
}
