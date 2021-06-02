
import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [products, setProducts] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      fetch(url)
      .then(response => {
        if (!response.ok) { // error coming back from server
          throw Error('Could not fetch the data for that resource');
        } 
        return response.json();
      })
      .then(data => {
        const loadedProducts = [];
        for (const key in data) {
            loadedProducts.push({
                id: data[key].id,
                name: data[key].name,
                description: data[key].description,
                price: data[key].price
            });
        }
        setIsPending(false);
        setProducts(loadedProducts);
        setError(null);
      })
      .catch(err => {
        // auto catches network / connection error
        setIsPending(false);
        setError(err.message);
      })
    }, 1000);
  }, [url])

  return { products, isPending, error };
}
 
export default useFetch;
