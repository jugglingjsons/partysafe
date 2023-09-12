export default async function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json({ message: "OK" });
  }
  if (req.method === "POST") {
    const { itemId, quantity, userId } = req.body;
    console.log("itemId, quantity, userId", itemId, quantity, userId);
    return res.status(200).json({ post: "OK" });
  }
}
