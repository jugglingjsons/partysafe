import { useState } from 'react';

export default function Cart() {
    const [cartItems, setCartItems] = useState([
        // List of drugkits in the cart
    ]);

    // Calculate total price of items in the cart
    const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);

    // Handle payment submission
    const handlePayment = async () => {
        // Implement payment logic here (credit card or Bitcoin)
        // For simplicity, this example just logs a message
        console.log('Payment successful');
    };

    return (
        <div className="bg-white min-h-screen text-gray-800">
            <h1 className="text-center my-4">Your Cart</h1>
            <div className="p-4">
                {cartItems.map(item => (
                    <div key={item._id} className="border p-2 rounded mb-2">
                        <h2>{item.name}</h2>
                        <p>Price: ${item.price}</p>
                    </div>
                ))}
                <div className="text-right">
                    <p>Total Amount: ${totalAmount}</p>
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                        onClick={handlePayment}
                    >
                        Pay with Credit Card
                    </button>
                    <button
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded ml-2"
                        onClick={handlePayment}
                    >
                        Pay with Bitcoin
                    </button>
                </div>
            </div>
        </div>
    );
}

