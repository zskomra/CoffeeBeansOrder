import classes from "./OrderItems.module.css";

const OrderItems = (props) => {
  return (
    <li  className={classes.item}>
      <div>
        <h3>{props.items.name}</h3>
        <div className={classes[`item-details`]}>
          <label>Amount: </label>
          <label>{props.items.amount}</label>
        </div>
        <div className={classes[`item-details`]}>
          <label>Price: </label>
          <label>{props.items.totalPrice}</label>
        </div>
      </div>
    </li>
  );
};

export default OrderItems;
