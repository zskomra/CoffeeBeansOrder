import { Fragment } from "react";
import Header from "./components/Layout/Header";
import Beans from './components/Beans/Beans';
import AvailableBeans from "./components/Beans/AvailableBeans";
import Cart from "./components/Cart/Cart";

function App() {
  return (
    <Fragment>
      <Cart />
      <Header />
      <main>
        <Beans />
      </main>
      </Fragment>
  );
}

export default App;
