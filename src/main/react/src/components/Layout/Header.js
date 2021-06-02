import { Fragment, useContext } from "react";
import classes from "./Header.module.css";
import beansImg from "../../assets/beans.jpg";
import HeaderCartButton from "./HeaderCartButton";
import NavigationItems from "./NavigationItems";
import { Link } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import { SearchBar } from "./Search/SearchBar";


const Header = (props) => {
  const authCtx = useContext(AuthContext);
  const isLogged = authCtx.isLoggIn;
  const isAdmin = authCtx.isAdmin;
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>CoffeeBeans</h1>
        <SearchBar />
        <NavigationItems />
        <div className={classes[`user-buttons`]}>
          <HeaderCartButton
            onClick={props.onShownCart}
            // onClick={isLogged ? props.onShownCart : props.onAuth}
          />
          <div className={classes.account}>
            <button className={classes.accountbtn}>Account</button>
            <div className={classes[`profile-menu`]}>
              {!isLogged && <Link to="/auth">Login/Register</Link>}
              {!isAdmin && isLogged && <Link to="/orders">Your Orders</Link>}
              {!isAdmin && isLogged && <Link to="/profile">Profile</Link>}
              {isLogged && (
                <Link onClick={authCtx.logout} to="/">
                  Logout
                </Link>
              )}
              {isAdmin && <Link to="/admin/add-product">Add product</Link>}
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
