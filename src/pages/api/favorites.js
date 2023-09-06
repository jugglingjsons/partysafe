// import dbConnect from "../../../../Db/DbConnect";
// import User from "../../../../Db/models/User";

// export default async function handler(request, response) {
//   await dbConnect();

//   const user = request.session.get("user"); // Get the user from the session

//   if (!user) {
//     return response.status(401).json({ message: "Unauthorized" });
//   }

//   if (request.method === "GET") {
//     try {
//       const likedProducts = user.favorites; // Assuming the user's favorites are stored in the "favorites" field

//       console.log("Fetched Liked Products:", likedProducts);
//       return response.status(200).json(likedProducts);
//     } catch (error) {
//       return response.status(500).json({ message: "Server error." });
//     }
//   } else {
//     return response.status(405).json({ message: "Method not allowed" });
//   }
// }
