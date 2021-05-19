package coffee.coffeeshop.converters;

import coffee.coffeeshop.model.domain.Contact;
import coffee.coffeeshop.request.ContactRequest;
import org.springframework.stereotype.Component;

@Component
public class ContactConverter {

    public Contact fromRequestToContact(ContactRequest contactRequest) {
        if(contactRequest == null) throw new IllegalArgumentException("Request cannot be null");
        return Contact.builder()
                .description(contactRequest.getDescription())
                .email(contactRequest.getEmail())
                .topic(contactRequest.getTopic())
                .build();
    }

}
