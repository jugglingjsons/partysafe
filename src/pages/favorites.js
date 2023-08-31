import useSWR from 'swr';
import { useEffect, useState } from 'react';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Favorites() {
    const { data: likedProducts } = useSWR('/api/drugkit/liked', fetcher); // Change the API endpoint to fetch liked products

    if (!likedProducts) return <div>Loading...</div>;

    return (
        <div className="bg-white min-h-screen text-gray-800">
            <h1 className="text-center my-4">Your Favorites</h1>
            <div className="p-4 grid grid-cols-3 gap-4">
                {likedProducts.map(product => (
                    <div key={product._id} className="border p-2 rounded">
                        {/* Display the product details similar to how you did on the home page */}
                    </div>
                ))}
            </div>
        </div>
    );
}