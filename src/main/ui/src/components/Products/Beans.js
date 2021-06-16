import { Fragment } from "react";
import BeansSummary from "./BeansSummary";
import AvailableAllProducts from "./Product/AvailableAllProducts";

const Beans = () => {
    return (
        <Fragment>
            <BeansSummary />
            <AvailableAllProducts />
        </Fragment>
    );
}

export default Beans;