
import { Fragment } from "react";
import classes from './Header.module.css';
import HeaderLogoutButton from './HeaderLogoutButton';
import beansImg from '../../assets/beans.jpg';
import HeaderCartButton from "./HeaderCartButton";
import NavigationItems from './NavigationItems';

const Header = (props) => {
    return <Fragment>
        <header className={classes.header}>
            <h1>CoffeeBeans</h1>
            <NavigationItems />
            <HeaderCartButton onClick={props.onShownCart}/>
            <HeaderLogoutButton onClick={props.onLogout}/>
        </header>
        <div className={classes['main-image']}>
            <img src={beansImg} alt="beans transform"/>
        </div>
    </Fragment>
};

export default Header;
