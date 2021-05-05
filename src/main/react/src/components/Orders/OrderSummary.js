import classes from "./OrderSummary.module.css";
import OrderAddress from "./OrderAddress";
import OrderItems from "./OrderItems";
import Card from "../UI/Card";

const OrderSummary = (props) => {
  
  const items = props.items.map((item) => (
    <OrderItems
      key={item.name}
      name={item.name}
      amount={item.amount}
      price={item.price}
    />
  ));

  return (
    <div className={classes.orders}>
      <Card>
        <section className={classes[`order-summary`]}>
          <div>{items}</div>
          <div>
            <OrderAddress              
              address={props.address}
              totalPrice={props.totalPrice}
            />
          </div>
        </section>
      </Card>
    </div>
  );
};

export default OrderSummary;
