// pages/api/cart/index.js
import { getSession } from "next-auth/react";
import dbConnect from "../../../../Db/DbConnect"; // Import your database connection
import User from "../../../../Db/models/User";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // Get the user's session
      const session = await getSession({ req });

      // Check if the user is authenticated
      if (!session) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      // Connect to your MongoDB database
      await dbConnect();

      // Retrieve the user's cart items from the database
      const user = await User.findById(session.user.id).populate("cart");
      console.log("user==============================", user);
      const cartItems = user.cart;

      console.log("cartItems==============================", cartItems);
      return res.status(200).json(cartItems);
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // Handle other HTTP methods if needed
  return res.status(405).json({ message: "Method not allowed" });
}
