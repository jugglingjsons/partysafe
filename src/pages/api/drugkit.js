import dbConnect from "../../../Db/DbConnect";
import Drugkit from "../../../Db/models/Drugkit";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const drugkit = await Drugkit.find();
    // console.log("Test", drugkit);
    return response.status(200).json(drugkit);
  }
}
