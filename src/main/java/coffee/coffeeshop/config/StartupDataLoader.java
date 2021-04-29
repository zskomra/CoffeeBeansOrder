package coffee.coffeeshop.config;

import coffee.coffeeshop.model.domain.Bean;
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
        Bean bean1 = new Bean(null, "COLOMBIAN BUCARAMANGA","This coffee works fantastically well in all brewing equipment, including espresso / cappuccino machines, cafetiere pots, paper / metal filter brewers, and Turkish brewers.", BigDecimal.valueOf(12));
        Bean bean2 = new Bean(null, "GUATEMALA EL FOGON","All our single origin coffees are freshly roasted by us at our traditional family-run coffee roastery in rural Kent.", BigDecimal.valueOf(12.45));
        Bean bean3 = new Bean(null, "MONSOONED MALABAR","Cup profile: Light to medium light Sweet and Fairly soft", BigDecimal.valueOf(12.01));

        beansRepository.save(bean1);
        beansRepository.save(bean2);
        beansRepository.save(bean3);
    }
}
