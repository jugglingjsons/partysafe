import dbConnect from "../../../../Db/DbConnect";
import User from "../../../../Db/models/User";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  await dbConnect();
  if (req.method === "PATCH") {
    const userId = req.body.userid;
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
    res.status(200).json(user.favorites);
  }

  try {
    if (req.method === "POST") {
      const session = await getSession({ req });

      if (!session) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const userId = session.user.id;

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
