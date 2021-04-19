import classes from "./AvailableBeans.module.css";
import Card from '../UI/Card';
import BeanItem from "./BeanItem/BeanItem";
const DUMMY_BEANS = [
  {
    id: "b1",
    name: "COLOMBIAN BUCARAMANGA",
    description:
      "This coffee works fantastically well in all brewing equipment, including espresso / cappuccino machines, cafetiere pots, paper / metal filter brewers, and Turkish brewers.",
    price: 19.99,
  },
  {
    id: "b2",
    name: "GUATEMALA EL FOGON",
    description:
      "All our single origin coffees are freshly roasted by us at our traditional family-run coffee roastery in rural Kent.",
    price: 14.99,
  },
  {
    id: "b3",
    name: "MONSOONED MALABAR",
    description: "Cup profile: Light to medium light Sweet and Fairly soft",
    price: 11.99,
  },
  {
    id: "b4",
    name: "COLOMBIAN BUCARAMANGA",
    description:
      " This coffee has a complex and condensed flavour, which is admired by enthusiasts and connoisseurs alike.",
    price: 13.99,
  },
];

const AvailableBeans = () => {
  const beansList = DUMMY_BEANS.map((bean) => 
    <BeanItem name={bean.name} key={bean.id} 
    description ={bean.description} price={bean.price} />
  );

  return (
    <section className={classes.beans}>
        <Card>
      <ul>{beansList}</ul>
      </Card>
    </section>
  );
};

export default AvailableBeans;
