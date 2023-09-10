import React from 'react';
import { useTranslation } from 'next-i18next';

export default function Cart({ cartItems, onDeleteItem }) {
  const { t } = useTranslation(); // Access the t function for translations

  return (
    <div>
      {cartItems.map((item) => (
        <div key={item._id} className="border p-2 rounded mb-2">
          <h2>{item.name}</h2>
          <p>{t('price', { price: item.price })}</p>
          <img src={item.image_url} alt={item.name} />
          <button onClick={() => onDeleteItem(item._id)}>{t('delete')}</button>
        </div>
      ))}
    </div>
  );
}
