import { useContext } from "react";
import CartContext from "../../../store/cart-context";
import classes from "./BeanItem.module.css";
import BeanItemForm from "./BeanItemForm";

const BeanItem = props => {
    const cartCtx = useContext(CartContext);
    const price = `${props.price.toFixed(2)}`;

    const onAddToCartHanlder = amount => {
    //    console.log(amount);
    //    console.log(props.id);
    //    console.log(props.name);
    //    console.log(props.price);
        cartCtx.addItem({
            id: props.id,
            amount: amount,
            name: props.name,
            price: props.price
        });
    }
    
    return <li className={classes.bean}>
        <div>
            <h3>{props.name}</h3>
            <div className={classes.description}>{props.description}</div>
            <div className={classes.price}>{price}</div>
        </div>
        <div>
            <BeanItemForm onAddToCart={onAddToCartHanlder}/>
        </div>
    </li>
};

export default BeanItem;