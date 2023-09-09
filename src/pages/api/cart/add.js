// pages/api/cart/add.js
import { getSession } from 'next-auth/react';
import { addToCart } from '../cart';

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method === 'POST') {
    // Extract item details from the request body
    const { itemId, quantity } = req.body;
    const userId = session.user.id;

    // Add the item to the user's cart
    const success = await addToCart(userId, itemId, quantity);

    if (success) {
      return res.status(200).json({ message: 'Item added to cart' });
    } else {
      return res.status(500).json({ message: 'Failed to add item to cart' });
    }
  }
}
