import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const [btnIsHigligted, setBtnIsHigligted] = useState(false);
  const cartCtx = useContext(CartContext);
  const{items}  = cartCtx;

  const btnClasses = `${classes.button} ${btnIsHigligted && classes.bump}`;

  useEffect(() => {
    if(items.length === 0) {
      return;
    };
    setBtnIsHigligted(true);
    const timer = setTimeout(()=> {
      setBtnIsHigligted(false);
    },300);
    return () => {
      clearTimeout(timer);
    };
  },[items]);

  const numOfCartItems = cartCtx.items.reduce((currentNumber, item) => {
    return currentNumber + item.amount;
  }, 0);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span className={classes.text}>Your Cart</span>
      <span className={classes.badge}>{numOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
