import { useContext } from "react";
import CartContext from "../../store/cart-context";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Modal from "./Modal";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const totalAmount = cartCtx.totalAmount.toFixed(2);

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((cartItem) => (
        <CartItem
          key={cartItem.id}
          name={cartItem.name}
          id={cartItem.id}
          price={cartItem.price}
          amount={cartItem.amount}
        />
      ))}
    </ul>
  );

  return (
    <Modal onHideModal={props.onHideCart}>
      {cartItems}
      <div className={classes.total}>
        <span>Total amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button
          onClick={props.onHideCart}
          className={classes["button--negative"]}
        >
          Cancel
        </button>
        <button className={classes.button}>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;
