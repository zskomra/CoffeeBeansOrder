package coffee.coffeeshop.config;

import coffee.coffeeshop.model.domain.Beans;
import coffee.coffeeshop.model.repositories.BeansRepository;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class StartupDataLoader {

    private BeansRepository beansRepository;

    public StartupDataLoader(BeansRepository beansRepository) {
        this.beansRepository = beansRepository;
    }

    @EventListener
    public void loadData(ContextRefreshedEvent event) {
        Beans beans1 = new Beans(null, "name","description", BigDecimal.valueOf(12));
        Beans beans2 = new Beans(null, "name2","description2", BigDecimal.valueOf(12.45));
        Beans beans3 = new Beans(null, "name3","description3", BigDecimal.valueOf(12.01));

        beansRepository.save(beans1);
        beansRepository.save(beans2);
        beansRepository.save(beans3);
    }
}
