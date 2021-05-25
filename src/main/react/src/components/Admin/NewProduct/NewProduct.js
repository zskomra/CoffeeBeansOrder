import { Fragment } from "react";
import NewProductForm from "./NewProductForm";

const NewProduct = () => {
  const addProductHanlder = (productData) => {
    fetch("http://localhost:8080/api/admin/product/add-new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: productData.name,
        description: productData.description,
        price: productData.price,
        productCategory: productData.category,
      }),
    });
    console.log("send");
  };

  return (
    <Fragment>
      <NewProductForm onConfirm={addProductHanlder} />
    </Fragment>
  );
};

export default NewProduct;
