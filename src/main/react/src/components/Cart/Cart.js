import { Fragment, useContext, useState } from "react";
import AuthContext from "../../store/auth-context";
import CartContext from "../../store/cart-context";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import Modal from "./Modal";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [isCheckout, setIsCheckout] = useState();
  const [didSubmit, setDidSubmit] = useState(false);
  const authCtx = useContext(AuthContext);
  const isLogged = authCtx.isLoggIn;

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

  const onSubmitHandler = (userData) => {
    const userToken = authCtx.token;
    fetch("http://localhost:8080/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
      body: JSON.stringify({
        idToken: authCtx.token,
        orderAddress: userData,
        orderItems: cartCtx.items,
      }),
    });
    setDidSubmit(true);
    cartCtx.clearCart();
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

  const orderItems = (
    <Fragment>
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
        <button onClick={isLogged ? onCheckoutHanlder : props.onAuth} className={classes.button}>
          Order
        </button>
      </div>
    </Fragment>
  );

  const orderSent = (
    <Fragment>
      <p>Order successfully sent!</p>
      <div className={classes.actions}>
        <button
          onClick={props.onHideCart}
          className={classes["button--negative"]}
        >
          Cancel
        </button>
      </div>
    </Fragment>
  );

  return (
    <Modal onHideModal={props.onHideCart}>
      {!isCheckout && orderItems}
      {!didSubmit && isCheckout && (
        <Checkout onConfirm={onSubmitHandler} onCancel={props.onHideCart} />
      )}
      {didSubmit && orderSent}
    </Modal>
  );
};

export default Cart;
