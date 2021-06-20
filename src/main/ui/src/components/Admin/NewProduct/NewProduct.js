import { Fragment, useContext } from "react";
import { useHistory } from "react-router";
import AuthContext from "../../../store/auth-context";
import NewProductForm from "./NewProductForm";

const NewProduct = () => {
  const history = useHistory();
  const authCtx =  useContext(AuthContext);

  const addProductHanlder = (productData) => {
    fetch("/api/admin/product/add-new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + authCtx.token,
      },
      body: JSON.stringify({
        name: productData.name,
        description: productData.description,
        price: productData.price,
        productCategory: productData.category,
        specific: productData.specific
      }),
    }).then((response) =>{
      if(response.ok) {
        return response.json().then((data) => {
          let message = data.message;
          console.log(data);
          alert(message);
          history.replace("/admin/add-product/added-status?=ok")
        });        
      }
      else {
        return response.json().then((data) =>{
          let error = data.message;
          alert(error);
        });
      }
    });
    
  };

  return (
    <Fragment>
      <NewProductForm onConfirm={addProductHanlder} />
    </Fragment>
  );
};

export default NewProduct;
