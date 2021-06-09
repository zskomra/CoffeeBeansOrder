import { Fragment, useEffect, useState } from "react";
import Modal from "../../Cart/Modal";
import NavigationItem from "../NavigationItem";
import classes from "./SideDrawer.module.css";
import { FaBars, FaTimes } from "react-icons/fa";
import { useClickOutside } from "../../../hooks/useClickOutside";

const SideDrawer = () => {
  const [click, setClick] = useState(false);

  const clickHandler = () => setClick(!click);

  let searchRef = useClickOutside(() => {
    setClick(false);
  });

  return (
    <Fragment>
      <div
        ref={searchRef}
        className={classes["menu-icon"]}
        onClick={clickHandler}
      >
        {click ? <FaTimes /> : <FaBars />}
        {click && (
          <div className={classes[`side-nav`]}>
            <ul className={classes[`side-items`]}>
              <div className={classes[`side-links`]}>
                <NavigationItem link="/beans" exact>
                  Beans
                </NavigationItem>
              </div>
              <div className={classes[`side-links`]}>
                <NavigationItem link="/appliances" exact>
                  Appliances
                </NavigationItem>
              </div>
              <div className={classes[`side-links`]}>
                <NavigationItem link="/accessories" exact>
                  Accessories
                </NavigationItem>
              </div>
              <div className={classes[`side-links`]}>
                <NavigationItem link="/contact" exact>
                  Contact
                </NavigationItem>
              </div>
            </ul>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default SideDrawer;
