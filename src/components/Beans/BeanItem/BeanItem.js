import classes from "./BeanItem.module.css";

const BeanItem = props => {
    const price = `${props.price.toFixed(2)}`;
    
    return <li className={classes.bean}>
        <div>
            <h3>{props.name}</h3>
            <div className={classes.description}>{props.description}</div>
            <div className={classes.price}>{price}</div>
        </div>
        <div>
            
        </div>
    </li>
};

export default BeanItem;