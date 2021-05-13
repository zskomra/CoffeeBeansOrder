import { Fragment, useContext, useState } from "react";
import Header from "./components/Layout/Header";
import Beans from "./components/Beans/Beans";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";
import OrderList from "./components/Orders/OrderList";
import { Redirect, Route, Switch } from "react-router";
import AuthForm from "./components/Auth/AuthForm";
import AuthContext from "./store/auth-context";
import Profile from "./components/User/Profile";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const authCtx = useContext(AuthContext);
  console.log(authCtx.isLoggIn);
  console.log(authCtx.token);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };
  
  return (
    <CartProvider>
      <Fragment>
        {cartIsShown ? <Cart onHideCart={hideCartHandler} /> : ""}
        <Header onShownCart={showCartHandler} />
        <main>
          <Switch>
            <Route path="/" exact>
              <Beans />
            </Route>
            <Route path="/orders">
              {!authCtx.isLoggIn && <Redirect to='/auth' />}
              {authCtx.isLoggIn && <OrderList />}
            </Route>
            <Route path="/auth">
              <AuthForm />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
          </Switch>
        </main>
      </Fragment>
    </CartProvider>
  );
}

export default App;
