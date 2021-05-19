package coffee.coffeeshop.controllers;

import coffee.coffeeshop.request.ContactRequest;
import coffee.coffeeshop.service.ContactService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.transaction.Transactional;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
@Slf4j
@Transactional
@RequiredArgsConstructor
public class ContactController {

    private final ContactService contactService;

    @PostMapping("/contact")
    public ResponseEntity<?> sendEmail(@RequestBody ContactRequest contact)  {
        Boolean isSendSuccessful = contactService.sendEmail(contact);
        if(isSendSuccessful) {
            return new ResponseEntity<>("Message sent successfully",HttpStatus.OK);
        }
        else return new ResponseEntity<>("Request Failed",HttpStatus.BAD_REQUEST);
    }

}
