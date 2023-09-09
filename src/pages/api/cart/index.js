// Import necessary dependencies and configure your MongoDB connection

// Example MongoDB setup using the Mongoose library
// Replace this with your actual MongoDB setup
import mongoose from 'mongoose';

mongoose.connect('mongodb:mongodb+srv://smailbensaad:j5Qrd86U7ftQFv4C@cluster0.2xlofiz.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const CartItem = mongoose.model('CartItem', {
  // Define your cart item schema here
  // Example fields: userId, itemId, quantity, etc.
});

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Fetch cart items for the user from the database and return them
    const userId = req.query.userId; // Assuming you pass userId as a query parameter
    try {
      const cartItems = await CartItem.find({ userId }); // Replace with your query logic
      return res.status(200).json({ cartItems });
    } catch (error) {
      console.error('Error fetching cart items:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'POST') {
    // Handle adding an item to the cart
    const { userId, itemId, quantity } = req.body; // Assuming you pass userId, itemId, and quantity in the request body
    try {
      // Create a new cart item document
      const cartItem = new CartItem({ userId, itemId, quantity });
      await cartItem.save(); // Save the cart item to the database

      // Fetch updated cart items after adding
      const updatedCartItems = await CartItem.find({ userId });

      return res.status(200).json({ message: 'Item added to cart', cartItems: updatedCartItems });
    } catch (error) {
      console.error('Error adding item to cart:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'DELETE') {
    // Handle deleting an item from the cart
    const itemId = req.query.itemId; // Assuming you pass itemId as a query parameter
    try {
      await CartItem.findByIdAndDelete(itemId); // Find and delete the cart item by its ID

      // Fetch updated cart items after deleting
      const updatedCartItems = await CartItem.find({ userId });

      return res.status(200).json({ message: 'Item deleted from cart', cartItems: updatedCartItems });
    } catch (error) {
      console.error('Error deleting item from cart:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
