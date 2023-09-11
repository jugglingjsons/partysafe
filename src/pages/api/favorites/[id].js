import dbConnect from '../../../../Db/DbConnect';
import User from '../../../../Db/models/User';

export default async function handler(request, response) {
  try {
    await dbConnect();

    if (request.method === 'GET') {
      const userId = request.query.id; // Get userId from the query parameters
      const user = await User.findById(userId);

      if (!user) {
        return response.status(404).json({ message: 'User not found' });
      }

      return response.status(200).json({ favorites: user.favorites });
    } else if (request.method === 'POST') {
      const userId = request.query.id; // Get userId from the query parameters
      const { productId } = request.body;

      if (!productId) {
        return response.status(400).json({ message: 'productId is required' });
      }

      const user = await User.findById(userId);

      if (!user) {
        return response.status(404).json({ message: 'User not found' });
      }

      if (user.favorites.includes(productId)) {
        return response.status(200).json({ message: 'Product already in favorites' });
      }

      user.favorites.push(productId);
      await user.save();

      return response.status(200).json({ message: 'Product added to favorites' });
    } else {
      return response.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error:', error);
    return response.status(500).json({ message: 'Server error' });
  }
}
