import classes from "./Cart.module.css";
import Modal from "./Modal";

const Cart = (props) => {
  const cartItems = <ul className={classes['cart-items']}>{[{id: 'b4',
  name: 'COLOMBIAN BUCARAMANGA'}].map((cartItem) => 
    <li>{cartItem.name}</li>
  )}</ul>;

  return (
    <Modal>
      {cartItems}
      <div className={classes.total}>
        <span>Total amount</span>
        <span>12</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--negative']}>Cancel</button>
        <button className={classes.button}>Order</button>
      </div>
      </Modal>
  );
};

export default Cart;
