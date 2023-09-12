import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Cart from "../components/cart";
import Image from "next/image";

export default function CartPage() {
  const { data: user } = useSession(); // Use the session hook to get the user data
  console.log("User:", user); // Debugging statement
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Fetch cart items for the authenticated user from the database
    const fetchCartItems = async () => {
      try {
        if (user) {
          // Replace this with your database query to get user's cart items
          const response = await fetch("/api/cart");
          console.log("response==============================", response);
          if (response.ok) {
            const data = await response.json();
            console.log("data==============================", data);
            setCartItems(data);
          }
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, [user]);

  // Handle item deletion
  const handleDeleteItem = async (itemId) => {
    try {
      // Replace this with your logic to delete an item from the cart
      await fetch(`/api/cart/${itemId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Update the cart items in the state
      setCartItems((prevItems) =>
        prevItems.filter((item) => item._id !== itemId)
      );
    } catch (error) {
      console.error("Error deleting item from cart:", error);
    }
  };

  // Handle order completion with Credit Card
  const handleCompleteOrderCreditCard = async () => {
    // Implement your order completion logic for Credit Card payment here
    console.log("Order completed with Credit Card");
  };

  // Handle order completion with Bitcoin
  const handleCompleteOrderBitcoin = async () => {
    // Implement your order completion logic for Bitcoin payment here
    console.log("Order completed with Bitcoin");
  };

  return (
    <div>
      <Cart cartItems={cartItems} onDeleteItem={handleDeleteItem} />
      <div className="text-right">
        {cartItems.map((item) => (
          <div
            key={item._id}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Image
              src={item.image_url}
              alt={item.name}
              width={300}
              height={300}
              objectFit="contain"
            />
          </div>
        ))}
        <p>
          Total Amount: $
          {cartItems.reduce((total, item) => total + item.price, 0)}
        </p>
        <button
          onClick={handleCompleteOrderCreditCard}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Pay with Credit Card
        </button>
        <button
          onClick={handleCompleteOrderBitcoin}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded ml-2"
        >
          Pay with Bitcoin
        </button>
      </div>
    </div>
  );
}
