import CartContext from "./cart-context";

const CartProvider = (props) => {

    addItemHandler = (item) => {

    };

    removeItemHandler = (id) => {

    };

  const cartContext = {
    items: [],
    totalAmount: 0,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };

  return <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>;
};

export default CartProvider;
