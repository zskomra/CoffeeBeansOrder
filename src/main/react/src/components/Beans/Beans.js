import { Fragment } from "react";
import AvailableBeans from "./AvailableBeans";
import BeansSummary from "./BeansSummary";

const Beans = () => {
    return (
        <Fragment>
            <BeansSummary />
            <AvailableBeans />
        </Fragment>
    );
}

export default Beans;