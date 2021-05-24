import { Fragment, useState } from "react";
import NewProductForm from "./NewProductForm";
import NewProductSummary from "./NewProductSummary";

const NewProduct = () => {
  const [showSummary, setShowSummary] = useState(false);
  const hideSummaryHanlder = () => {
    setShowSummary((previousState) => !previousState);
  };

  const addProductHanlder = (productData) => {
      console.log(productData);
  };

  return (
    <Fragment>
      <NewProductForm
        onClick={hideSummaryHanlder}
        onConfirm={addProductHanlder}
      />
      {showSummary && <NewProductSummary />}
    </Fragment>
  );
};

export default NewProduct;
