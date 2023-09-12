// pages/api/cart/add.js
// import { useSession } from "next-auth/react";
import dbConnect from "../../../../Db/DbConnect";
import User from "../../../../Db/models/User";

export default async function handler(req, res) {
  await dbConnect();
  try {
    if (req.method === "GET") {
      return res.status(200).json({ message: "OK" });
    }

    if (req.method === "PUT") {
      // Extract item deails from the request body
      const { itemId, userId } = req.body;

      try {
        const newCartEntry = await User.findByIdAndUpdate(
          userId,
          {
            $push: { cart: itemId },
          },
          { new: true }
        );
        res.status(200).json(newCartEntry);
      } catch (e) {}

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Check if the cart item already exists for the user
      const existingCartItem = user.cart.find((item) => item.itemId === itemId);

      if (existingCartItem) {
        // If the item already exists, update the quantity
        existingCartItem.quantity += quantity;
        await user.save();
        return res.status(200).json(user);
      } else {
        // If the item does not exist, create a new cart item
        user.cart.push({ itemId, quantity });
        await user.save();
        return res.status(201).json(user);
      }
    }
  } catch (error) {
    // Debugging: Log any errors
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }

  // Handle other HTTP methods if needed
  return res.status(405).json({ message: "Method not allowed" });
}
