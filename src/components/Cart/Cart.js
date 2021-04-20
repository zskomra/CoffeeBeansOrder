import { useContext } from "react";
import CartContext from "../../store/cart-context";
import classes from "./Cart.module.css";
import Modal from "./Modal";

const Cart = (props) => {
  const cartItems = <ul className={classes['cart-items']}>{[{id: 'b4',
  name: 'COLOMBIAN BUCARAMANGA'}].map((cartItem) => 
    <li>{cartItem.name}</li>
  )}</ul>;

  const cartCtx = useContext(CartContext);
  return (
    
    <Modal onHideModal={props.onHideCart}>
      {cartItems}
      <div className={classes.total}>
        <span>Total amount</span>
        <span>{cartCtx.totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onHideCart} className={classes['button--negative']}>Cancel</button>
        <button className={classes.button}>Order</button>
      </div>
      </Modal>
  );
};

export default Cart;
