import classes from "./NewProductForm.module.css";
import ProductCard from "../../UI/ProductCard";
import { useEffect, useRef, useState } from "react";
import LoadindSpinner from "../../UI/LoadingSpinner";

const NewProductForm = (props) => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const productNameRef = useRef();
  const productPriceRef = useRef();
  const productDescriptionRef = useRef();
  const productCategoryInput = useRef();

  useEffect(() => {
    const fetchCategories = async () => {
      const resposne = await fetch(
        `http://localhost:8080/api/admin/categories`
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
  }, []);

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

  const submitHanlder = (event) => {
    event.preventDefault();
    //todo validate
    const product = {
      name: productNameRef.current.value,
      description: productDescriptionRef.current.value,
      price: productPriceRef.current.value,
      category: productCategoryInput.current.value
    };
    console.log(product);
    props.onConfirm(product);
  };

  return (
    <div className={classes[`add-product-window`]}>
      <ProductCard>
        <h1>Add new product</h1>
        <form onSubmit={submitHanlder} className={classes[`new-product`]}>
          <div className={classes.wrapper}>
            <div className={classes.details}>
              <div className={classes.select}>
                <label>Product category</label>
                <select ref={productCategoryInput}>{productCategoriesList}</select>
              </div>
              <div>
                <label>Product name</label>
                <input
                  ref={productNameRef}
                  placeholder="Enter Product Name"
                ></input>
              </div>
              <div>
                <label>Product price</label>
                <input
                  ref={productPriceRef}
                  placeholder="Enter product price"
                ></input>
              </div>
            </div>
            <div className={classes[`details-description`]}>
              <label>Product description</label>
              <textarea
                ref={productDescriptionRef}
                placeholder="Enter Product Description"
              ></textarea>
            </div>
          </div>
          <div className={classes.actions}>
            <button onClick={props.onClick}>Show New Product Summary</button>
            <button>Add New Product</button>
          </div>
        </form>
      </ProductCard>
    </div>
  );
};

export default NewProductForm;
