// import classes from "./AvailableBeans.module.css";
// import Card from "../UI/Card";
// import ProductItem from "./ProductItem/ProductItem";
// import { useEffect, useState } from "react";
// import LoadingSpinner from "../UI/LoadingSpinner";


// const AvailableBeans = () => {
//   const [beans, setBeans] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [httpError, setHttpError] = useState();
  

//   useEffect(() => {
//     const fetchBeans = async () => {
//       const response = await fetch("http://localhost:8080/api/products/beans");

//       if (!response.ok) {
//         throw new Error("Ooops something get wrong!");
//       }

//       const responseData = await response.json();

//       const loadedBeans = [];
//       for (const key in responseData) {
//         loadedBeans.push({
//           id: responseData[key].id,
//           name: responseData[key].name,
//           description: responseData[key].description,
//           price: responseData[key].price,
//         });
//       }
//       setBeans(loadedBeans);
//       setIsLoading(false);
//     };

//     fetchBeans()
//       .then()
//       .catch((error) => {
//         setIsLoading(false);
//         setHttpError(error.message);
//       });
//   }, []);

//   if (isLoading) {
//     return (
//       <section className={classes["beans-loading"]}>
//         <LoadingSpinner />
//       </section>
//     );
//   }
//   if (httpError) {
//     return (
//       <section className={classes["beans-error"]}>
//         <p>{httpError}</p>
//       </section>
//     );
//   }

//   const beansList = beans.map((bean) => (
    
//     <ProductItem
//       id={bean.id}
//       name={bean.name}
//       key={bean.id}
//       description={bean.description}
//       price={bean.price}
//     />
    
    
//   ));

//   return (
//     <section className={classes.beans}>
//       <Card>
//         <ul>{beansList}</ul>
//       </Card>
//     </section>
//   );
// };

// export default AvailableBeans;
