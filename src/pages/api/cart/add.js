// pages/api/cart/add.js
// import { useSession } from "next-auth/react";
import dbConnect from "../../../../Db/DbConnect";
import User from "../../../../Db/models/User";

export default async function handler(req, res) {
  await dbConnect();
  try {
    // Get the user's session
    // const session = await getSession({ req });

    // if (!session) {
    //   return res.status(401).json({ message: "Unauthorized" });
    // }

    if (req.method === "GET") {
      return res.status(200).json({ message: "OK" });
    }

    if (req.method === "PUT") {
      // Extract item details from the request body
      const { itemId, userId } = req.body;
      console.log("itemId ", itemId, userId);
      // console.log("req.product==============================", req.product);
      // console.log(
      //   "req.product.id==============================",
      //   req.product.id
      // );
      // console.log("itemId==============================", itemId);
      // const userId = session.user.id;

      // Connect to your MongoDB database
      try {
        const newCartEntry = await User.findByIdAndUpdate(
          userId,
          {
            $push: { cart: itemId },
          },
          { new: true }
        );
        res.status(200).json(newCartEntry);
      } catch (e) {
        console.log("e==============================", e);
      }

      // Find the user by their ID
      // const user = await User.findById(userId);

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
