import classes from "./AvailableBeans.module.css";
import Card from "../UI/Card";
import BeanItem from "./BeanItem/BeanItem";
import { useEffect, useState } from "react";



const AvailableBeans = () => {
  const [beans, setBeans] = useState([]);
  useEffect(() => {
    const fetchMeals = async() => {
      const response = await fetch('https://coffee-beans-e3691-default-rtdb.europe-west1.firebasedatabase.app/beans.json');
      const responseData = await response.json();

      const loadedMeals = [];
      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price : responseData[key].price
        })
      }
      setBeans(loadedMeals);
    };
    fetchMeals();
  }, [])

  const beansList = beans.map((bean) => (
    <BeanItem
      id={bean.id}
      name={bean.name}
      key={bean.id}
      description={bean.description}
      price={bean.price}
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

export default AvailableBeans;
