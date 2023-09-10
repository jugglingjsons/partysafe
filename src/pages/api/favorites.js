import { getSession } from 'next-auth/react';
import dbConnect from '../../../Db/DbConnect'; // Import your database connection
import Product from '../product/[id]'; // Import your product model

export default async function handler(request, response) {
  try {
    const session = await getSession({ req: request });

    if (!session) {
      console.log('Unauthorized: No session found');
      return response.status(401).json({ message: 'Unauthorized' });
    }

    if (request.method === 'POST') {
      await dbConnect(); // Connect to your MongoDB database
      console.log('Connected to the database');

      // Get the user's ID from the session
      const userId = session.user.id;
      console.log('User ID:', userId);

      // Get the product ID you want to add to favorites (assuming you have it)
      const productId = request.body.productId;
      console.log('Product ID to add to favorites:', productId);

      // Find the product by ID
      const product = await Product.findById(productId);

      if (!product) {
        console.log('Product not found');
        return response.status(404).json({ message: 'Product not found' });
      }

      // Add the product to the user's favorites
      await User.findByIdAndUpdate(userId, { $push: { favorites: product } });
      console.log('Product added to favorites');

      return response.status(200).json({ message: 'Product added to favorites' });
    } else {
      console.log('Method not allowed');
      return response.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error adding product to favorites:', error);
    return response.status(500).json({ message: 'Server error' });
  }
}

