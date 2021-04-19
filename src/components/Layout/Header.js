
import { Fragment } from "react";
import classes from './Header.module.css';

import beansImg from '../../assets/beans.jpg';
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
    return <Fragment>
        <header className={classes.header}>
            <h1>CoffeeBeans</h1>
            <HeaderCartButton />
            {/* <button>Cart</button> */}
        </header>
        <div className={classes['main-image']}>
            <img src={beansImg} alt="beans transform"/>
        </div>
    </Fragment>
};

export default Header;
