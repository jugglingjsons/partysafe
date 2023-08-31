import Image from 'next/image';
import Link from 'next/link';
import useSWR from 'swr';
import { useState, useEffect } from 'react';
import { HeartIcon } from '@heroicons/react/solid';

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
        console.log('Toggling like for product:', product);
        const isAlreadyLiked = likedProducts.some((like) => like._id === product._id);
        console.log('Is already liked?', isAlreadyLiked);
        if (isAlreadyLiked) {
            const updatedLikes = likedProducts.filter((like) => like._id !== product._id);
            console.log('Updated likes after removing:', updatedLikes);
            setLikedProducts(updatedLikes);
            await fetch(`/api/favorites/${product._id}`, { method: 'DELETE' });
        } else {
            const updatedLikes = [...likedProducts, product];
            console.log('Updated likes after adding:', updatedLikes);
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
                    <div key={product._id} className="border p-2 rounded">
                        <Link href={`/drugkit/${product._id}`}>
                            <h2 className="text-center mb-2">{product.name}</h2>
                            <img 
                                src={product.image_url}
                                alt={product.name}
                                width={100}
                                height={100}
                            />
                        </Link>

                        <button className="like-button mt-2" onClick={() => toggleLike(product)}>
                            <HeartIcon className={`h-5 w-5 ${likedProducts.some(p => p._id === product._id) ? 'text-red-500' : 'text-gray-400'}`} />
                        </button>
                    </div>
                ))}
            </main>
        </div>
    );
}

