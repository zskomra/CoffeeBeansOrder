const Cart = (props) => {
  const cartItems = [].map((cartItem) => {
    <li>{cartItem.name}</li>;
  });

  return (
    <div>
      {cartItems}
      <div>
        <span>Total amount</span>
        <span>12</span>
      </div>
      <div>
        <button>Cancel</button>
        <button>Order</button>
      </div>
    </div>
  );
};

export default Cart;
