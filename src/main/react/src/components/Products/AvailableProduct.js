import classes from "./AvailableProduct.module.css";
import Card from "../UI/Card";
import ProductItem from "./ProductItem/ProductItem";
import { useEffect, useState } from "react";
import LoadingSpinner from "../UI/LoadingSpinner";

const AvailableProduct = (props) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  const productCategory = props.productName;

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        "http://localhost:8080/api/products/" + productCategory
      );

      if (!response.ok) {
        throw new Error("Ooops something get wrong!");
      }

      const responseData = await response.json();

      const loadedProducts = [];
      for (const key in responseData) {
        loadedProducts.push({
          id: responseData[key].id,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setProducts(loadedProducts);
      setIsLoading(false);
    };

    fetchProducts()
      .then()
      .catch((error) => {
        setIsLoading(false);
        setHttpError(error.message);
      });
  }, [productCategory]);

  if (isLoading) {
    return (
      <section className={classes["beans-loading"]}>
        <LoadingSpinner />
      </section>
    );
  }
  if (httpError) {
    return (
      <section className={classes["beans-error"]}>
        <p>{httpError}</p>
      </section>
    );
  }

  const beansList = products.map((product) => (
    <ProductItem
      id={product.id}
      name={product.name}
      key={product.id}
      description={product.description}
      price={product.price}
    />
  ));

  return (
    <section className={classes.beans}>
      <Card>
        <ul>{beansList}</ul>
      </Card>
    </section>
  );
};

export default AvailableProduct;
