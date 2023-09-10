import dbConnect from "../../../../Db/DbConnect";
import Drugkit from "../../../../Db/models/drugkit";

export default async function handler(request, response) {
  await dbConnect();
  
  const { id } = request.query; // Extracting the id from the query parameters

  if (request.method === "GET") {
    try {
      const drugkit = await Drugkit.findById(id);
      if (!drugkit) {
        return response.status(404).json({ message: "Drug kit not found." });
      }

      console.log("Fetched Drugkit:", drugkit);
      return response.status(200).json(drugkit);
    } catch (error) {
      return response.status(500).json({ message: "Server error." });
    }
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}
