import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// Replace 'your_publishable_key' with your actual publishable key
const stripePromise = loadStripe(
  "pk_test_51NqavvKp3y1ns7QoPyPGjpQonFypBjJn95bxIReYXZj3RTWLfbQTy9stHaspf725acrkvrIDiqg6neDqzrR23Hwf00G6baBcEO"
);

const handlePayment = async () => {
  const stripe = await stripePromise;

  // Use Stripe Elements and the Stripe API to handle the payment
  // For example, create a PaymentIntent and confirm the payment

  // Example: Create a PaymentIntent
  const response = await fetch("/create-payment-intent", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: 1000, // Adjust the amount as needed
      currency: "usd",
    }),
  });

  const { clientSecret } = await response.json();

  // Example: Confirm the payment
  const result = await stripe.confirmCardPayment(clientSecret, {
    payment_method: {
      card: elements.getElement(CardElement), // Make sure to import CardElement from @stripe/react-stripe-js
    },
  });

  if (result.error) {
    // Handle payment error
    console.error("Payment error:", result.error.message);
  } else if (result.paymentIntent.status === "succeeded") {
    // Payment succeeded, handle success
    console.log("Payment succeeded:", result.paymentIntent);
  }
};
