const stripe = require("../../utils/stripe"); // Import your Stripe instance
const { NextApiRequest, NextApiResponse } = require("next");

module.exports = async function handler(req, res) {
  if (req.method === "POST") {
    const { amount, currency, paymentMethod } = req.body;

    try {
      // Create a PaymentIntent based on the payment method
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
        payment_method_types: [paymentMethod],
      });

      res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      console.error("Error creating PaymentIntent:", error);
      res.status(500).json({ error: "Could not create PaymentIntent" });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};
