// pages/favorites.js

import useSWR from 'swr';
import Image from 'next/image';
import Link from 'next/link';
import { HeartIcon } from '@heroicons/react/solid';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Favorites() {
    const { data: likedProducts } = useSWR('/api/favorites', fetcher);

    if (!likedProducts) return <div>Loading...</div>;

    return (
        <div className="bg-white min-h-screen text-gray-800">
            <h1 className="text-center my-4">Your Favorites</h1>
            <main className="p-4 grid grid-cols-3 gap-4">
                {likedProducts.map(product => (
                    <div key={product._id} className="border p-2 rounded">
                        <Link href={`/drugkit/${product._id}`}>
                            <h2 className="text-center mb-2">{product.name}</h2>
                            <Image 
                                src={product.image_url}
                                alt={product.name}
                                width={100}
                                height={100}
                            />
                        </Link>
                        <p>{product.description}</p>
                        <p>Price: {product.price}</p>
                        <button className="like-button mt-2">
                            <HeartIcon className="h-5 w-5 text-red-500" />
                        </button>
                    </div>
                ))}
            </main>
        </div>
    );
}

