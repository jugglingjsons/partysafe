import dbConnect from '../../../../Db/DbConnect'; // Import your database connection
import User from '../../../../Db/models/User'; // Import your user model

export default async function handler(request, response) {
    try {
      await dbConnect(); // Connect to your MongoDB database
  
      if (request.method === 'GET') {
        // Handle GET request here
        const productId = request.query.id;
  
        // Implement logic to retrieve favorites for the given product ID
        const user = await User.findOne({ favorites: productId });
  
        if (!user) {
          return response.status(404).json({ message: 'Favorites not found' });
        }
  
        return response.status(200).json({ favorites: user.favorites });
      } else if (request.method === 'POST') {
        // Handle POST request here
        const productId = request.query.id;
  
        // Implement logic to add the product to the user's favorites
        // You can get the user's ID from the session
        // For simplicity, let's assume the user's ID is "userId"
        const userId = 'userId';
  
        // Add the product to the user's favorites
        await User.findByIdAndUpdate(userId, { $addToSet: { favorites: productId } });
  
        return response.status(200).json({ message: 'Product added to favorites' });
      } else {
        return response.status(405).json({ message: 'Method not allowed' });
      }
    } catch (error) {
      console.error('Error:', error);
      return response.status(500).json({ message: 'Server error' });
    }
  }