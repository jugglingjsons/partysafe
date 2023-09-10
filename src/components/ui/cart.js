import React from 'react';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';

export default function Cart({ cartItems, onDeleteItem }) {
  const { t } = useTranslation(); // Access the t function for translations

  return (
    <div>
      {cartItems.map((item) => (
        <div key={item._id} className="border p-2 rounded mb-2">
          <h2>{item.name}</h2>
          <p>{t('price', { price: item.price })}</p>
          <Image
            src={item.image_url} // Specify the path to your image
            alt={item.name} // Add alt text for accessibility
            width={100} // Set the width of the image
            height={100} // Set the height of the image
          />
          <button onClick={() => onDeleteItem(item._id)}>{t('delete')}</button>
        </div>
      ))}
    </div>
  );
}


