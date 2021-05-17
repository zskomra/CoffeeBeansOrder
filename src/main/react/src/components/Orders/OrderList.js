import classes from "./OrderList.module.css";
import OrderSummary from "./OrderSummary";
import { useContext, useEffect, useState } from "react";
import LoadindSpinner from "../UI/LoadingSpinner";
import AuthContext from "../../store/auth-context";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch(`http://localhost:8080/api/orders`, {
        headers: { Authorization: "Bearer " + authCtx.token },
      });
      if (!response.ok) {
        throw new Error("Could not fetch orders");
      }

      const responseData = await response.json();

      const loadedOrders = [];
      for (const key in responseData) {
        loadedOrders.push({
          key: responseData[key].orderId,
          id: responseData[key].orderId,
          items: responseData[key].orderItems,
          address: responseData[key].orderAddress,
          totalPrice: responseData[key].totalPrice,
        });
      }
      setOrders(loadedOrders);
      setIsLoading(false);
    };

    fetchOrders()
      .then()
      .catch((error) => {
        setIsLoading(false);
        setHttpError(error.message);
      });
  }, [authCtx.token]);

  if (isLoading) {
    return (
      <section>
        <LoadindSpinner />
      </section>
    );
  }
  if (httpError) {
    return (
      <section className={classes["orders-error"]}>
        <p>{httpError}</p>
      </section>
    );
  }

  const ordersList = orders.map((item) => (
    <OrderSummary
      id={item.id}
      key={item.id}
      items={item.items}
      address={item.address}
      totalPrice={item.totalPrice}
    />
  ));

  return (
    <section className={classes.items}>
      <ul>{ordersList}</ul>
    </section>
  );
};

export default OrderList;
