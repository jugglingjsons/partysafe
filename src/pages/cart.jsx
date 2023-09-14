import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Cart from "../components/Cart";

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

  const handleCompleteOrderCreditCard = async () => {
    // Implement your order completion logic for Credit Card payment here
  };

  const handleCompleteOrderBitcoin = async () => {
    // Implement your order completion logic for Bitcoin payment here
  };

  const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <div>
      <Cart cartItems={cartItems} onDeleteItem={handleDeleteItem} />
      <div className="text-right">
        <p>Total Amount: €{totalAmount}</p>
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
