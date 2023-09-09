import React from 'react';

export default function Cart({ cartItems, onDeleteItem }) {
  return (
    <div>
      {cartItems.map((item) => (
        <div key={item._id} className="border p-2 rounded mb-2">
          <h2>{item.name}</h2>
          <p>Price: ${item.price}</p>
          <img src={item.image_url} alt={item.name} />
          <button onClick={() => onDeleteItem(item._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
