import { getSession } from 'next-auth/react';
import dbConnect from '../../../Db/DbConnect'; // Import your database connection
import Product from '../product/[id]'; // Import your product model

export default async function handler(request, response) {
  try {
    const session = await getSession({ req: request });

    if (!session) {
      return response.status(401).json({ message: 'Unauthorized' });
    }

    if (request.method === 'POST') {
      await dbConnect(); // Connect to your MongoDB database

      // Get the user's ID from the session
      const userId = session.user.id;

      // Get the product ID you want to add to favorites (assuming you have it)
      const productId = request.body.productId;

      // Find the product by ID
      const product = await Product.findById(productId);

      if (!product) {
        return response.status(404).json({ message: 'Product not found' });
      }

      // Add the product to the user's favorites
      await User.findByIdAndUpdate(userId, { $push: { favorites: product } });

      return response.status(200).json({ message: 'Product added to favorites' });
    } else {
      return response.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error adding product to favorites:', error);
    return response.status(500).json({ message: 'Server error' });
  }
}
