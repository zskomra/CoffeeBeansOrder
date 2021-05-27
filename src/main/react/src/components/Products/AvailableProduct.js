import classes from "./AvailableProduct.module.css";
import Card from "../UI/Card";
import ProductItem from "./ProductItem/ProductItem";
import { useEffect, useState } from "react";
import LoadingSpinner from "../UI/LoadingSpinner";
import { sortList } from "../../services/sort-service";
import SortSelect from "../UI/SortSelect";

const AvailableProduct = (props) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  const [sortType, setSortType] = useState("priceAsc");
  // const [sortedProducts, setSortedProducts] = useState([]);

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

  useEffect(() => {
    const sortArray = (type) => {
      const types = {
        priceAsc: { value: "price", asc: true },
        priceDes: { value: "price", asc: false },
        nameAsc: {value: 'name', asc: true},
        nameDes: {value: 'name', asc: false}
      };
      const ascending = types[type].asc;
      const sortBy = types[type].value;      
      const sorted = sortList([...products], ascending, sortBy);
      setProducts(sorted);
      return sorted;
      // setSortedProducts(sorted);
    };
    sortArray(sortType);
    
    
  }, [sortType]);
 

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

  const onChangeHanlder = (event) => {
    event.preventDefault();
    setSortType(event.target.value);
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
      <SortSelect>
        <select onChange={onChangeHanlder}>
          <option value="priceAsc">Sort by price ascending</option>
          <option value="priceDes">Sort by price descending</option>
          <option value="nameAsc">Sort by name ascending</option>
          <option value="nameDes">Sort by name descending</option>
        </select>
      </SortSelect>
      <Card>
        <ul>{beansList}</ul>
      </Card>
    </section>
  );
};

export default AvailableProduct;
