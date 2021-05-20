import { Fragment, useContext, useState } from "react";
import Header from "./components/Layout/Header";
import Beans from "./components/Products/Beans";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";
import OrderList from "./components/Orders/OrderList";
import { Redirect, Route, Switch, useHistory } from "react-router";
import AuthForm from "./components/Auth/AuthForm";
import AuthContext from "./store/auth-context";
import Profile from "./components/User/Profile";
import ProductDetails from "./components/Products/ProductItem/ProductDetails";
import AvailableAppliance from "./components/Products/Product/Appliances/AvailableAppliances";
import AvailableAccessories from "./components/Products/Product/Accessories/AvailableAccessories";
import AvailableBeans from "./components/Products/Product/Beans/AvailableBeans";
import Contact from "./components/Contact/Contact";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const logoutHandler = () => {
    authCtx.logout();
  };

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  const redirectHandler = () => {
    let auth = "/auth";
    history.replace(auth);
  };

  return (
    <CartProvider>
      <Fragment>
        {cartIsShown ? <Cart onHideCart={hideCartHandler} /> : ""}
        <Header
          onShownCart={showCartHandler}
          onLogout={logoutHandler}
          onAuth={redirectHandler}
        />
        <main>
          <Switch>
            <Route path="/" exact>
              <Beans />
            </Route>
            <Route path="/orders">
              {!authCtx.isLoggIn && <Redirect to="/auth" />}
              {authCtx.isLoggIn && <OrderList />}
            </Route>
            <Route path="/auth">
              <AuthForm />
            </Route>
            <Route path="/profile">
              {!authCtx.isLoggIn && <Redirect to="/auth" />}
              {authCtx.isLoggIn && <Profile />}
            </Route>
            <Route path="/appliances">
              <AvailableAppliance />
            </Route>
            <Route path="/accessories">
              <AvailableAccessories />
            </Route>
            <Route path="/product/:productId">
              <ProductDetails />
            </Route>
            <Route path="/beans">
              <AvailableBeans />
            </Route>
            <Route path="/contact">
              <Contact />
            </Route>
          </Switch>
        </main>
      </Fragment>
    </CartProvider>
  );
}

export default App;
