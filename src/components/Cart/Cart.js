import { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import Modal from "./Modal";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [isCheckout, setIsCheckout] = useState();

  const totalAmount = cartCtx.totalAmount.toFixed(2);

  const onAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const onRemoveHandler = (id) => {
    console.log(id);
    cartCtx.removeItem(id);
  };

  const onCheckoutHanlder = (props) => {
    setIsCheckout(true);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((cartItem) => (
        <CartItem
          key={cartItem.id}
          name={cartItem.name}
          id={cartItem.id}
          price={cartItem.price}
          amount={cartItem.amount}
          onAdd={onAddHandler.bind(null, cartItem)}
          onRemove={onRemoveHandler.bind(null, cartItem.id)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button
        onClick={props.onHideCart}
        className={classes["button--negative"]}
      >
        Cancel
      </button>
      <button onClick={onCheckoutHanlder} className={classes.button}>
        Order
      </button>
    </div>
  );

  const modalItems = (
    <div>
    {cartItems}
      <div className={classes.total}>
        <span>Total amount</span>
        <span>{totalAmount}</span>
      </div>
    </div>
  );

  return (
    <Modal onHideModal={props.onHideCart}>
      {!isCheckout && modalItems}      
      {isCheckout && <Checkout onCancel={props.onHideCart}/>}
      {!isCheckout && modalActions}
    </Modal>
  );
};

export default Cart;
