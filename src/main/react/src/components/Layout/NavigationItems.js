import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem";

const NavigationItems = () => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/" exact>
        Home
      </NavigationItem>
    </ul>
  );
};

export default NavigationItems;
