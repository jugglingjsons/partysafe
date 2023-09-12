import dbConnect from "../../../../Db/DbConnect";
import User from "../../../../Db/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  const userId = session.user.id;
  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  await dbConnect();
  if (req.method === "PATCH") {
    const drugkitId = req.query.id;

    const user = await User.findByIdAndUpdate(
      userId,
      [
        {
          $set: {
            favorites: {
              $cond: [
                { $in: [drugkitId, "$favorites"] },
                { $setDifference: ["$favorites", [drugkitId]] },
                { $concatArrays: ["$favorites", [drugkitId]] },
              ],
            },
          },
        },
      ],
      { new: true }
    );
    return res.status(200).json(user.favorites);
  }

  try {
    if (req.method === "POST") {
      // Update the user's document by pushing drugkitId to favorites array
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $push: { favorites: drugkitId } },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json({ message: "Drugkit added to favorites" });
    } else {
      return res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
