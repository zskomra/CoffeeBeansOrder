import { Fragment, useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CartContext from "../../../store/cart-context";
import classes from "./ProductItem.module.css";
import ProductItemForm from "./ProductItemForm";

const ProductItem = (props) => {
  const cartCtx = useContext(CartContext);
  const price = `${props.price.toFixed(2)}`;
  const [showButton, setShowButton] = useState(true);

  const params = useParams();
  const { beanId } = params;

  useEffect(() => {
    if(beanId) {
      setShowButton(false);
    }
    else setShowButton(true);
  },[beanId]);
  
  const onAddToCartHanlder = (amount) => {
    cartCtx.addItem({
      id: props.id,
      amount: amount,
      name: props.name,
      price: price,
    });
  };

  return (
    <Fragment>
      <li className={classes.bean}>
        <div>
          <h3>{props.name}</h3>
          <div className={classes.description}>{props.description}</div>
          <div className={classes.price}>{price}</div>
        </div>
        <div>
          <ProductItemForm onAddToCart={onAddToCartHanlder} />
        </div>
      </li>
      {showButton && (
      <div className={classes[`details-link`]}>
      <Link className={classes.link} to={`/beans/${props.id}`} >          
        Show Details
      </Link>
      </div> )}
    </Fragment>
  );
};

export default ProductItem;
