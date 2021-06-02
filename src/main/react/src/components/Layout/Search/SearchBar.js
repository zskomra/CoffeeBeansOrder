import React from "react";
import classes from "./SearchBar.module.css";
import { FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useRef, useState } from "react";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { useDebounce } from "../../../hooks/useDebounce";
import { Link } from "react-router-dom";

export function SearchBar(props) {
  //important
  const [isExpanded, setIsExpanded] = useState(false);
  const [error, setError] = useState(null);
  //in use
  const [searchQuery, setSearchQuery] = useState("");
  const [noProducts, setNoProducts] = useState(false);
  //to use
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const inputRef = useRef();
  const isEmpty = !products || products.length===0;

  let searchRef = useClickOutside(() => {
    setIsExpanded(false);
  });

  const collapseHandler = () => {
    setSearchQuery("");
    setIsExpanded(false);
    setProducts([]);
    if (inputRef.current) inputRef.current.value = "";
  };

  const expandHandler = () => {
    setIsExpanded(true);
  };

  const changeQueryHandler = (event) => {
    event.preventDefault();
    if (event.target.value.trim() === "") {
      setNoProducts(false);
    }
    setSearchQuery(event.target.value);
  };

  const searchProducts = async () => {
    if (!searchQuery || searchQuery.trim() === "") return;
    setIsLoading(true);
    setNoProducts(false);
    let url = `http://localhost:8080/api/products/${searchQuery}`;
    const response = await fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw Error("Could not fetch the data for that resource");
        }
        return response.json();
      })
      .then((data) => {
        const loadedProducts = [];
        for (const key in data) {
          loadedProducts.push({
            id: data[key].id,
            name: data[key].name,
            description: data[key].description,
            price: data[key].price,
          });
        }
        setIsLoading(false);
        setProducts(loadedProducts);
        setError(null);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.message);
      });
  };

  useDebounce(searchQuery, 1000, searchProducts);

  const showProducts = products.map((product) => (
    <Link
      className={classes[`search-link`]}
      key={product.id}
      onClick={collapseHandler}
      to={`/product/${product.id}`}
    >
      {product.name}
    </Link>
  ));

  return (
    <div ref={searchRef} className={classes.wrapper}>
      <div className={classes[`input-container`]}>
        <div className={classes[`search-icon`]}>
          <FaSearch />{" "}
        </div>
        <input
          placeholder="Type to search.."
          className={classes[`search-input`]}
          onChange={changeQueryHandler}
          onFocus={expandHandler}
          ref={inputRef}
        />
        {isExpanded && (
          <div onClick={collapseHandler} className={classes[`close-icon`]}>
            <IoClose />
          </div>
        )}
      </div>
      {isExpanded && !isEmpty &&(
        <div className={classes[`search-content`]}>{showProducts}</div>
      )}
    </div>
  );
}
