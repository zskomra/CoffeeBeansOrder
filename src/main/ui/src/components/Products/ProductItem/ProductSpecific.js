import classes from "./ProductSpecific.module.css";
import beanImg from "../../../assets/beandetail.jpg";
import applianceImg from "../../../assets/appliancedetail.jpg";
import accessoriesImg from "../../../assets/accessoriesdetail.jpg";
import defaultImg from "../../../assets/defaultdetail.jpg";

const ProductSpecific = (props) => {
  const category = props.category;

  return (
    <div className={classes.specific}>
      <div className={classes.content}>{props.specific}</div>
      <div className={classes["product-image"]}>
        
        <img
          src={
            (category[0].name === "BEANS" && beanImg) ||
            (category[0].name === "APPLIANCES" && applianceImg) ||
            (category[0].name === "ACCESSORIES" && accessoriesImg) ||
            defaultImg
          }
          alt="product transform"
        />
      </div>
    </div>
  );
};

export default ProductSpecific;
