import { Fragment, useState } from "react";
import Header from "./components/Layout/Header";
import Beans from "./components/Beans/Beans";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";
import OrderList from "./components/Orders/OrderList";
import { Route, Switch } from "react-router";
import AuthForm from "./components/Auth/AuthForm";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

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
              <OrderList />
            </Route>
            <Route path="/auth">
              <AuthForm />
            </Route>
          </Switch>
        </main>
      </Fragment>
    </CartProvider>
  );
}

export default App;
