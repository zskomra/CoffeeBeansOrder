import { Fragment, useContext } from "react";
import classes from "./Header.module.css";
import beansImg from "../../assets/beans.jpg";
import HeaderCartButton from "./HeaderCartButton";
import NavigationItems from "./NavigationItems";
import { Link, Redirect } from "react-router-dom";
import AuthContext from "../../store/auth-context";

const Header = (props) => {
  const authCtx = useContext(AuthContext);
  const isLogged = authCtx.isLoggIn;
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>CoffeeBeans</h1>
        <NavigationItems />
        <div className={classes[`user-buttons`]}>
          <HeaderCartButton onClick={
            isLogged ? props.onShownCart :  props.onAuth} />
          <div className={classes.account}>
            <button className={classes.accountbtn}>Account</button>
            <div className={classes[`profile-menu`]}>
              {!isLogged && <Link to="/auth">Login/Register</Link>}
              {isLogged && <Link to="/orders">Your Orders</Link>}
              {isLogged && <Link to="/profile">Profile</Link>}
              {isLogged && (
                <Link onClick={authCtx.logout} to="/">
                  Logout
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>
      <div className={classes["main-image"]}>
        <img src={beansImg} alt="beans transform" />
      </div>
    </Fragment>
  );
};

export default Header;
