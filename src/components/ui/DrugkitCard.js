import React from 'react';
import Image from 'next/image';
import { HeartIcon, ShoppingCartIcon } from '@heroicons/react/solid';

const DrugkitCard = ({ drugkit, onLike, onAddToCart }) => {
    return (
        <div className="border p-4 rounded shadow-md">
            <div className="mb-2">
                <Image
                    src={drugkit.image_url}
                    alt={drugkit.name}
                    width={150}
                    height={150}
                />
            </div>
            <h2 className="text-center text-xl font-semibold mb-1">{drugkit.name}</h2>
            <p className="text-gray-600 mb-2">{drugkit.description}</p>
            <p className="text-center font-semibold text-lg mb-2">${drugkit.price.toFixed(2)}</p>
            <div className="flex justify-center items-center">
                <button
                    className="like-button mx-2"
                    onClick={() => onLike(drugkit)}
                >
                    <HeartIcon className={`h-6 w-6 ${drugkit.liked ? 'text-red-500' : 'text-gray-400'}`} />
                </button>
                <button
                    className="add-to-cart-button mx-2"
                    onClick={() => onAddToCart(drugkit)}
                >
                    <ShoppingCartIcon className="h-6 w-6 text-gray-600" />
                </button>
            </div>
        </div>
    );
};

export default DrugkitCard;
