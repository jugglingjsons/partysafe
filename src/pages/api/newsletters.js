// pages/api/newsletters.js
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "GET") {
    // Implement logic to check if the user is subscribed to newsletters
    const isSubscribed = await checkNewsletterSubscription(session.user.id);

    return res.status(200).json({ subscribed: isSubscribed });
  } else if (req.method === "POST") {
    // Implement logic to subscribe the user to newsletters
    const success = await subscribeToNewsletters(session.user.id);

    if (success) {
      return res
        .status(200)
        .json({ message: "Subscribed to newsletters successfully" });
    } else {
      return res
        .status(500)
        .json({ error: "Failed to subscribe to newsletters" });
    }
  } else if (req.method === "DELETE") {
    // Implement logic to unsubscribe the user from newsletters
    const success = await unsubscribeFromNewsletters(session.user.id);

    if (success) {
      return res
        .status(200)
        .json({ message: "Unsubscribed from newsletters successfully" });
    } else {
      return res
        .status(500)
        .json({ error: "Failed to unsubscribe from newsletters" });
    }
  }
}
