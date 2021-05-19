package coffee.coffeeshop.service;

import coffee.coffeeshop.converters.ContactConverter;
import coffee.coffeeshop.model.domain.Contact;
import coffee.coffeeshop.model.repositories.ContactRepository;
import coffee.coffeeshop.request.ContactRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.transaction.Transactional;
import java.util.Date;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class ContactService {

    private final JavaMailSender javaMailSender;
    private final ContactRepository contactRepository;
    private final ContactConverter contactConverter;

    public Boolean sendEmail(ContactRequest contactRequest)  {
        try {
            Contact contact = contactConverter.fromRequestToContact(contactRequest);
            String from = contact.getEmail();
            String topic = contact.getTopic();
            String description = contact.getDescription();
            String body = String.format("Message from : %s,\n description: %s", from, description);
            SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
            simpleMailMessage.setFrom(from);
            simpleMailMessage.setTo("exampletestacc36@gmail.com");
            simpleMailMessage.setSubject(topic);
            simpleMailMessage.setText(body);
            javaMailSender.send(simpleMailMessage);
            contactRepository.save(contact);
            return true;
        }
        catch (Exception e) {
            log.error(e.getMessage());
            return false;
        }

    }


}
