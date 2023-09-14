// Import necessary modules
import dbConnect from "../../../../Db/DbConnect"; // Adjust the path as needed
import User from "../../../../Db/models/User"; // Adjust the path as needed

// Establish a connection to the database
dbConnect();

export default async function handler(req, res) {
  const {
    query: { id },
  } = req;

  try {
    // Find the user by ID and populate the 'favorites' field
    const user = await User.findById(id).populate("favorites");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the user data with populated 'favorites'
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
