import { Fragment, useState } from "react";
import Header from "./components/Layout/Header";
import Beans from './components/Beans/Beans';
import Cart from "./components/Cart/Cart";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <Fragment>
      {cartIsShown ? <Cart onHideCart={hideCartHandler}/> : ''}
      <Header onShownCart={showCartHandler} />
      <main>
        <Beans />
      </main>
      </Fragment>
  );
}

export default App;
