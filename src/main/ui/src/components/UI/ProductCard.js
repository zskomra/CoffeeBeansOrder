import classes from "./ProductCard.module.css"

const ProductCard = (props) =>{
    return <div className={classes.card}>
        {props.children}
    </div>;
}

export default ProductCard;