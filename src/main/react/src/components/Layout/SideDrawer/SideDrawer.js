import { Fragment, useState } from "react";
import Modal from "../../Cart/Modal";
import NavigationItem from "../NavigationItem";
import classes from "./SideDrawer.module.css";
import { FaBars, FaTimes } from 'react-icons/fa';

const SideDrawer = () => {
    const [click, setClick] = useState(false);
    
    const clickHandler = () => setClick(!click);

  return (
    <Fragment>
      <div className={classes['menu-icon']} onClick={clickHandler}>{click ? <FaTimes /> : <FaBars />}</div>

      {click && <div className={classes[`side-nav`]}>
        <ul className={classes[`side-items`]}>
          <li className={classes[`side-links`]}>
            <NavigationItem link="/" exact>
              Menu
            </NavigationItem>
          </li>
          <li className={classes[`side-links`]}>
            <NavigationItem link="/" exact>
              Menu
            </NavigationItem>
          </li>
          <li className={classes[`side-links`]}>
            <NavigationItem link="/" exact>
              Menu
            </NavigationItem>
          </li>
          <li className={classes[`side-links`]}>
            <NavigationItem link="/" exact>
              Menu
            </NavigationItem>
          </li>
        </ul>
      </div>}
    </Fragment>
  );
};

export default SideDrawer;
