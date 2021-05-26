
import ProductCard from "../../UI/ProductCard";
import classes from "../../Products/ProductItem/ProductItem.module.css";

const NewProductSummary = (props) => {
  return (
    <ProductCard>
      <li className={classes.bean}>
        <div>
          <h3>{props.name}</h3>
          <div className={classes.description}>{props.description}</div>
          <div className={classes.price}>{props.price}</div>
        </div>
      </li>
      <div>
        <h3>More details, todo....</h3>
      </div>
    </ProductCard>
  );
};

export default NewProductSummary;
