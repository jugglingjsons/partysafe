import { getSession } from 'next-auth/react';
import dbConnect from '../../../../Db/DbConnect'; // Import your database connection
import CartItem from '../../../../Db/models/CartItem'; // Import your CartItem model

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Connect to your MongoDB database
      await dbConnect();

      // Get the user's session
      const session = await getSession({ req });

      // Check if the user is authenticated
      if (!session) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      // Retrieve the user's cart items from the database
      const cartItems = await CartItem.find({ userId: session.user.id });

      return res.status(200).json(cartItems);
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  if (req.method === 'POST') {
    try {
      // Connect to your MongoDB database
      await dbConnect();

      // Get the user's session
      const session = await getSession({ req });

      // Check if the user is authenticated
      if (!session) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      // Create a new cart item
      const newCartItem = new CartItem({
        userId: session.user.id,
        // Add other properties of the cart item as needed
      });

      // Save the cart item to the database
      await newCartItem.save();

      return res.status(201).json(newCartItem);
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  // Handle other HTTP methods if needed
  return res.status(405).json({ message: 'Method not allowed' });
}
