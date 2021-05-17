import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem";

const NavigationItems = () => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/" exact>
        Home
      </NavigationItem>
      <NavigationItem link="/" exact>Beans</NavigationItem>
      <NavigationItem link="/" exact>Appliances</NavigationItem>
      <NavigationItem link="/" exact>Accessories</NavigationItem>
      <NavigationItem link="/" exact>Contact</NavigationItem>
    </ul>
  );
};

export default NavigationItems;
