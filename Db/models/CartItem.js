// Import necessary modules
const mongoose = require('mongoose');

// Define the schema for the CartItem model
const cartItemSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model (assuming you have a User model)
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', // Reference to the Product model (assuming you have a Product model)
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1, // Default quantity is 1, change as needed
  },
});

// Create the CartItem model
const CartItem = mongoose.model('CartItem', cartItemSchema);

// Export the CartItem model
module.exports = CartItem;
