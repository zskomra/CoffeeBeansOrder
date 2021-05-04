import classes from "./OrderList.module.css";

import Card from "../UI/Card";

import OrderSummary from "./OrderSummary";
import { useEffect, useState } from "react";

const DATA = [
  {
    id: "a1",
    items: [
      {
        id: "b2",
        name: "Bean1",
        amount: "2",
        totalPrice: "22",
      },
      {
        id: "b3",
        name: "Bean2",
        amount: "3",
        totalPrice: "122",
      },
    ],
    address: {
      firstName: "Jan",
      lastName: "Kowalski",
      city: "Warsaw",
      street: "Street",
      postcode: "12345",
    },
    totalPrice: "122",
  },
  {
    id: "a2",
    items: [
      {
        id: "c2",
        name: "Bean1",
        amount: "2",
        totalPrice: "22",
      },
      {
        id: "c3",
        name: "Bean2",
        amount: "3",
        totalPrice: "122",
      },
      {
        id: "c4",
        name: "Bean2",
        amount: "3",
        totalPrice: "122",
      },
      {
        id: "c5",
        name: "Bean2",
        amount: "3",
        totalPrice: "122",
      },
    ],
    address: {
      firstName: "Jan",
      lastName: "Kowalski",
      city: "Warsaw",
      street: "Street",
      postcode: "12345",
    },
    totalPrice: "122",
  },
  {
    id: "a3",
    items: [
      {
        id: "d2",
        name: "Bean1",
        amount: "2",
        totalPrice: "22",
      },
    ],
    address: {
      firstName: "Jan",
      lastName: "Kowalski",
      city: "Warsaw",
      street: "Street",
      postcode: "12345",
    },
    totalPrice: "122",
  },
];

const OrderList = () => {
  // const [orders, setOrders] = useState([]);

  // useEffect(() => {
  //     setOrders(DATA);
  // },[DATA]);

  //todo1 :
  // const response = await fetch(`link`);
  // const data = await response.json();

  // if(!response.ok) {
  //     throw new Error(data.message || 'Could not fetch orders');
  // }

  // const transformedOrders = [];
  //   const transfromedOrderAddress = {
  //     firstName: "Jan",
  //     lastName: "Kowalski",
  //     postcode: "12345",
  //     city: "Gdansk",
  //     street: "Wolna",
  //   };
  //todo2 :
  // for (const key in data) {
  //     transformedOrders.push({
  //         id: "",
  //         itemPrice: "",
  //         itemName: "",
  //         itemAmount: ""
  //     })
  // }

  const ordersList = DATA.map((item) => (
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
