import classes from "./NotFound.module.css";
import ProductCard from "../components/UI/ProductCard";

const NotFound = () => {
  return (
    <div className={classes.wrapper}>
      <ProductCard>
        <h2 >Page not found !</h2>
      </ProductCard>
    </div>
  );
};

export default NotFound;
