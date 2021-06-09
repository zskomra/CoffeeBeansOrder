import classes from "./AvailableProduct.module.css";
import Card from "../UI/Card";
import ProductItem from "./ProductItem/ProductItem";
import { useEffect, useState } from "react";
import LoadingSpinner from "../UI/LoadingSpinner";
import { sortList } from "../../services/sort-service";
import SortSelect from "../UI/SortSelect";
import { useHistory, useLocation } from "react-router";

const AvailableProduct = (props) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  const [sortType, setSortType] = useState("priceasc");

  const history = useHistory();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const currentParam = queryParams.get("sort");

  const productCategory = props.productName;

  const onChangeHanlder = (event) => {
    event.preventDefault();
    const sortParam = event.target.value;
    setSortType(sortParam);
    history.push({
      pathname: location.pathname,
      search: `?sort=${sortParam}`,
    });
  };

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
        priceasc: { value: "price", asc: true },
        pricedes: { value: "price", asc: false },
        nameasc: { value: "name", asc: true },
        namedes: { value: "name", asc: false },
      };
      const ascending = types[type].asc;
      const sortBy = types[type].value;
      const sorted = sortList([...products], ascending, sortBy);
      setProducts(sorted);
    };

    !isLoading && sortArray(currentParam ? currentParam : sortType);
    !currentParam &&
      history.push({
        pathname: location.pathname,
        search: `?sort=${sortType}`,
      });
  }, [sortType, isLoading, currentParam]);

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
      <SortSelect>
        <select
          defaultValue={currentParam ? currentParam : sortType}
          onChange={onChangeHanlder}
        >
          <option value="priceasc">Sort by price ascending</option>
          <option value="pricedes">Sort by price descending</option>
          <option value="nameasc">Sort by name ascending</option>
          <option value="namedes">Sort by name descending</option>
        </select>
      </SortSelect>
      <Card>
        <ul>{beansList}</ul>
      </Card>
    </section>
  );
};

export default AvailableProduct;
