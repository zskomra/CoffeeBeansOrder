import { useEffect, useState } from "react";
import { useParams } from "react-router";
import LoadingSpinner from "../../UI/LoadingSpinner";
import ProductCard from "../../UI/ProductCard";
import ProductItem from "./ProductItem";


const ProductDetails = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const { productId } = params;
  const [product, setProduct] = useState("");
  
  useEffect(() => {
    const fetchDetails = async () => {
      const response = await fetch("/api/beans/" + productId);

      if (!response.ok) {
        throw new Error("Ooops something get wrong!");
      }

      const responseData = await response.json();
      console.log(responseData);
      const loadedProduct = {
        id: responseData.id,
        name: responseData.name,
        description: responseData.description,
        price: responseData.price,
        specific: responseData.specific,
        category: responseData.productCategories
      };
      setProduct(loadedProduct);
      setIsLoading(false);
    };
    fetchDetails()
      .then()
      .catch((error) => {
        setIsLoading(false);
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
        id={product.id}
        name={product.name}
        key={product.id}
        description={product.description}
        price={product.price}
        specific={product.specific}
        category={product.category}
      />
    </ProductCard>
  );
};

export default ProductDetails;
