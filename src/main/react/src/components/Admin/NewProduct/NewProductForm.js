import classes from "./NewProductForm.module.css";
import ProductCard from "../../UI/ProductCard";
import { Fragment, useContext, useEffect, useRef, useState } from "react";
import LoadindSpinner from "../../UI/LoadingSpinner";
import NewProductSummary from "./NewProductSummary";
import AuthContext from "../../../store/auth-context";

const isPriceValidPattern = /[+-]?\d+(?:[.,]\d+)?/;
const isEmpty = (value) => value.trim() === "";
const isFiveChar = (value) => value.trim().length >= 5;

const NewProductForm = (props) => {
  const authCtx = useContext(AuthContext);
  const [isFormValid, setIsFormValid] = useState({
    name: true,
    price: true,
    description: true,
  });
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showSummary, setShowSummary] = useState(false);
  const [productSummary, setProductSummary] = useState({
    name: "",
    price: "",
    description: "",
  });
  const productNameRef = useRef();
  const productPriceRef = useRef();
  const productDescriptionRef = useRef();
  const productCategoryInput = useRef();

  useEffect(() => {
    const fetchCategories = async () => {
      const resposne = await fetch(
        `http://localhost:8080/api/admin/categories`, {
          headers: { Authorization: "Bearer " + authCtx.token },
        }
      );
      if (!resposne.ok) {
        throw new Error("Could not fetch product categories");
      }
      const resposneData = await resposne.json();
      const loadedCategories = [];
      for (const key in resposneData) {
        loadedCategories.push({
          key: resposneData[key].id,
          id: resposneData[key].id,
          name: resposneData[key].name,
        });
      }
      setCategories(loadedCategories);
      setIsLoading(false);
    };

    fetchCategories()
      .then()
      .catch((error) => {
        setIsLoading(false);
      });
  }, [authCtx.token]);

  if (isLoading) {
    return (
      <section>
        <LoadindSpinner />
      </section>
    );
  }

  const productCategoriesList = categories.map((item) => (
    <option key={item.key}>{item.name}</option>
  ));

  const showDetailsHanlder = (event) => {
    event.preventDefault();
    setProductSummary({
      name: productNameRef.current.value,
      description: productDescriptionRef.current.value,
      price: productPriceRef.current.value,
    });
    setShowSummary((previousState) => !previousState);
  };

  const submitHanlder = (event) => {
    event.preventDefault();
    const enteredPrice = productPriceRef.current.value;
    const enteredName = productNameRef.current.value;
    const enteredDescription = productDescriptionRef.current.value;

    const enteredPriceValidity = isPriceValidPattern.test(enteredPrice);
    const enteredNameValidity =
      !isEmpty(enteredName) && isFiveChar(enteredName);
    const enteredDescriptionValidity =
      !isEmpty(enteredDescription) && isFiveChar(enteredDescription);

    setIsFormValid({
      name: enteredNameValidity,
      description: enteredDescriptionValidity,
      price: enteredPriceValidity,
    });

    const formFalidIs =
      enteredPriceValidity && enteredNameValidity && enteredDescriptionValidity;
    if (!formFalidIs) {
      return;
    }

    const product = {
      name: enteredName,
      description: enteredDescription,
      price: enteredPrice,
      category: productCategoryInput.current.value,
    };

    props.onConfirm(product);
  };

  return (
    <Fragment>
      <div className={classes[`add-product-window`]}>
        <ProductCard>
          <h1>Add new product</h1>
          <form onSubmit={submitHanlder} className={classes[`new-product`]}>
            <div className={classes.wrapper}>
              <div className={classes.details}>
                <div className={classes.select}>
                  <label>Product category</label>
                  <select ref={productCategoryInput}>
                    {productCategoriesList}
                  </select>
                </div>
                <div>
                  <label>Product name</label>
                  <input
                    ref={productNameRef}
                    placeholder="Enter Product Name"
                  ></input>
                  {!isFormValid.name && <p>Please enter valid name</p>}
                </div>
                <div>
                  <label>Product price</label>
                  <input
                    ref={productPriceRef}
                    placeholder="Enter product price"
                  ></input>
                  {!isFormValid.price && <p>Please enter valid price</p>}
                </div>
              </div>
              <div className={classes[`details-description`]}>
                <label>Product description</label>
                <textarea
                  ref={productDescriptionRef}
                  placeholder="Enter Product Description"
                ></textarea>
                {!isFormValid.description && (
                  <p>Please enter valid description</p>
                )}
              </div>
            </div>
            <div className={classes.actions}>
              <button type="button" onClick={showDetailsHanlder}>
                Show New Product Summary
              </button>
              <button>Add New Product</button>
            </div>
          </form>
        </ProductCard>
      </div>
      {showSummary && (
        <NewProductSummary
          name={productSummary.name}
          description={productSummary.description}
          price={productSummary.price}
        />
      )}
    </Fragment>
  );
};

export default NewProductForm;
