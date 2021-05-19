import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem";

const NavigationItems = () => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/" exact>
        Home
      </NavigationItem>
      <NavigationItem link="/beans" exact>Beans</NavigationItem>
      <NavigationItem link="/appliances" exact>Appliances</NavigationItem>
      <NavigationItem link="/accessories" exact>Accessories</NavigationItem>
      <NavigationItem link="/" exact>Contact</NavigationItem>
    </ul>
  );
};

export default NavigationItems;
