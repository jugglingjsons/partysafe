import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Cart from "../components/cart.js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51NqavvKp3y1ns7QoPyPGjpQonFypBjJn95bxIReYXZj3RTWLfbQTy9stHaspf725acrkvrIDiqg6neDqzrR23Hwf00G6baBcEO"
);

export default function CartPage() {
  const { data: user } = useSession();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        if (user) {
          const response = await fetch("/api/cart");
          if (response.ok) {
            const data = await response.json();
            setCartItems(data);
          }
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, [user]);

  const handleDeleteItem = async (itemId) => {
    try {
      await fetch(`/api/cart/${itemId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      setCartItems((prevItems) =>
        prevItems.filter((item) => item._id !== itemId)
      );
    } catch (error) {
      console.error("Error deleting item from cart:", error);
    }
  };

  const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);

  const handlePayment = async (paymentMethod) => {
    const stripe = await stripePromise;
    // Use Stripe elements and the Stripe API to handle the payment
    // For example, create a PaymentIntent and confirm the payment
    try {
      // Create a PaymentIntent based on the payment method
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: totalAmount * 100, // Amount in cents
          currency: "usd",
          paymentMethod,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const result = await stripe.confirmCardPayment(data.clientSecret, {
          payment_method: paymentMethod,
        });

        if (result.error) {
          console.error("Payment failed:", result.error.message);
        } else {
          console.log("Payment succeeded:", result.paymentIntent.id);
          // Handle successful payment here
        }
      } else {
        console.error("Error creating PaymentIntent:", response.statusText);
      }
    } catch (error) {
      console.error("Error handling payment:", error);
    }
  };

  return (
    <div>
      <Cart cartItems={cartItems} onDeleteItem={handleDeleteItem} />
      <div className="text-right">
        <p>Total Amount: €{totalAmount}</p>
        <button
          onClick={() => handlePayment("card")}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Pay with Credit Card
        </button>
        <button
          onClick={() => handlePayment("bitcoin")}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded ml-2"
        >
          Pay with Bitcoin
        </button>
      </div>
    </div>
  );
}
