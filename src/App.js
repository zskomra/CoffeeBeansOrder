import { Fragment } from "react";
import Header from "./components/Layout/Header";
import Beans from './components/Beans/Beans';
import AvailableBeans from "./components/Beans/AvailableBeans";

function App() {
  return (
    <Fragment>
      <Header />
      <main>
        <Beans />
      </main>
      </Fragment>
  );
}

export default App;
