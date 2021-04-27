import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    let updatedItems;
    const existCartItemIndex = state.items.findIndex((item) => item.id ===action.item.id);
    const existCartItem = state.items[existCartItemIndex];
    if(existCartItem) {
        const updatedItem = {
            ...existCartItem,
            amount : existCartItem.amount + action.item.amount
        };
        updatedItems = [...state.items];
        updatedItems[existCartItemIndex] = updatedItem;
    }
    else {
        updatedItems = state.items.concat(action.item);
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type ==="REMOVE") {
    const existCartItemIndex = state.items.findIndex((item) => item.id ===action.id);
    const existCartItem = state.items[existCartItemIndex];
    let updatedItems;
    const updatedTotalAmount = state.totalAmount -existCartItem.price;
    if(existCartItem.amount ===1) {
        updatedItems = state.items.filter(item => item.id !== action.id);
    }
    else {       
        const updatedItem = {
            ...existCartItem,
            amount : existCartItem.amount - 1
        };
        updatedItems = [...state.items];
        updatedItems[existCartItemIndex] = updatedItem;        
    }    
    return{        
        items: updatedItems,
        totalAmount: updatedTotalAmount
    };
  }
  if(action.type === "CLEAR") {
    return defaultCartState;
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const clearCartHandler = () => {
    dispatchCartAction({type: "CLEAR"});
  }
 
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    clearCart: clearCartHandler
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
