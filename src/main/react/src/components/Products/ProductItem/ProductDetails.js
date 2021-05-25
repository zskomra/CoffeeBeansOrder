import { useEffect, useState } from "react";
import { useParams } from "react-router";
import LoadingSpinner from "../../UI/LoadingSpinner";
import ProductCard from "../../UI/ProductCard";
import ProductItem from "./ProductItem";


const ProductDetails = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const { productId } = params;
  const [bean, setBean] = useState("");
  
  useEffect(() => {
    const fetchDetails = async () => {
      const response = await fetch("http://localhost:8080/api/beans/" + productId);

      if (!response.ok) {
        throw new Error("Ooops something get wrong!");
      }

      const responseData = await response.json();
      
      const loadedBean = {
        id: responseData.id,
        name: responseData.name,
        description: responseData.description,
        price: responseData.price,
      };
      setBean(loadedBean);
      setIsLoading(false);
    };
    fetchDetails()
      .then()
      .catch((error) => {
        setIsLoading(false);
        console.log(error.message);
      });
  }, [productId]);

  if (isLoading) {
    return (
      <section >
        <LoadingSpinner />
      </section>
    );
  }
  
  return (
    <ProductCard>
      <ProductItem
        id={bean.id}
        name={bean.name}
        key={bean.id}
        description={bean.description}
        price={bean.price}
      />
      <div>
        <h3>More details, todo....</h3>
      </div>
    </ProductCard>
  );
};

export default ProductDetails;
