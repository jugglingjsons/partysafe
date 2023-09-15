import React from "react";

const CartItem = ({ item, onDeleteItem }) => (
  <li className="cart-item">
    <div className="cart-item-details">
      <h3>{item.name}</h3>
      <p>Price: €{item.price}</p>
      <p>Quantity: {item.quantity}</p>
    </div>
    <div className="cart-item-actions">
      <button onClick={() => onDeleteItem(item._id)} className="delete-button">
        Remove
      </button>
    </div>
  </li>
);

const Cart = ({ cartItems, onDeleteItem }) => {
  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <CartItem key={item._id} item={item} onDeleteItem={onDeleteItem} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
