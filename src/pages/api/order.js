// pages/api/orders.js
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "GET") {
    // Implement logic to fetch recent orders for the user from your database
    const recentOrders = await fetchRecentOrders(session.user.id);

    return res.status(200).json({ orders: recentOrders });
  } else if (req.method === "POST") {
    // Implement logic to reorder based on order ID
    const orderId = req.body.orderId;
    const success = await reorderOrder(orderId);

    if (success) {
      return res.status(200).json({ message: "Order reordered successfully" });
    } else {
      return res.status(500).json({ error: "Failed to reorder the order" });
    }
  }
}
