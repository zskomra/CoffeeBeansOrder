import { Fragment, useState } from "react";
import Header from "./components/Layout/Header";
import Beans from "./components/Beans/Beans";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";
import OrderList from "./components/Orders/OrderList";

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
          <Beans />
          <OrderList />
        </main>
      </Fragment>
    </CartProvider>
  );
}

export default App;
