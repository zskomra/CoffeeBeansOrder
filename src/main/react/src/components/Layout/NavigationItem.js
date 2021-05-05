import { NavLink } from 'react-router-dom';
import classes from './NavigationItem.module.css';

const NavigationItem = (props) => {
    return (
        <li className={classes.NavigationItem}>
            <p>{props.children}</p>
            {/* <NavLink
            to={props.link}
            exact={props.exact}>
                {props.children}
            </NavLink> */}
        </li>
        );
};

export default NavigationItem;