import Link from 'next/link';
import useSWR from 'swr';
import { useState, useEffect } from 'react';
import DrugkitCardThumbnail from '../components/DrugkitCardThumbnail'; // Import the simplified card component

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {
    const { data: products, error } = useSWR('/api/drugkit', fetcher);
    const [likedProducts, setLikedProducts] = useState([]);

    useEffect(() => {
        const storedLikes = localStorage.getItem('likedProducts');
        if (storedLikes) {
            setLikedProducts(JSON.parse(storedLikes));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('likedProducts', JSON.stringify(likedProducts));
    }, [likedProducts]);

    const toggleLike = async (product) => {
        // Toggle like logic
        const isAlreadyLiked = likedProducts.some((like) => like._id === product._id);
        if (isAlreadyLiked) {
            const updatedLikes = likedProducts.filter((like) => like._id !== product._id);
            setLikedProducts(updatedLikes);
            await fetch(`/api/favorites/${product._id}`, { method: 'DELETE' });
        } else {
            const updatedLikes = [...likedProducts, product];
            setLikedProducts(updatedLikes);
            await fetch(`/api/favorites/${product._id}`, { method: 'POST' });
        }
    };

    if (error) return <div>Failed to load products</div>;
    if (!products) return <div>Loading...</div>;

    return (
        <div className="bg-white min-h-screen text-gray-800">
            <main className="p-4 grid grid-cols-3 gap-4">
                {products.map(product => (
                    <DrugkitCardThumbnail
                        key={product._id}
                        drugkit={product}
                        onLike={toggleLike}
                    />
                ))}
            </main>
        </div>
    );
}
