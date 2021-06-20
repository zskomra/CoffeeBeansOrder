
import ProductCard from "../../UI/ProductCard";
import classes from "../../Products/ProductItem/ProductItem.module.css";
import ProductSpecific from "../../Products/ProductItem/ProductSpecific";

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
      <ProductSpecific specific={props.specific} category={props.category} />
    </ProductCard>
  );
};

export default NewProductSummary;
