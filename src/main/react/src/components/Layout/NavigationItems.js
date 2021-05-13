import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem';

const NavigationItems = () => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" exact>Home</NavigationItem>
            <NavigationItem link="/orders">Orders</NavigationItem>
            <NavigationItem link="/profile">Profile</NavigationItem>
            <NavigationItem link="/auth">Account</NavigationItem>
        </ul>
    );
};

export default NavigationItems;