import { useTranslation } from 'next-i18next';
import React from 'react';
import Image from 'next/image';
import { HeartIcon } from '@heroicons/react/solid';
import Link from 'next/link';

const DrugkitCardThumbnail = ({ drugkit, onLike, likedProducts }) => {
    const isLiked = Array.isArray(likedProducts) && likedProducts.some((like) => like._id === drugkit._id);

    return (
        <div className="border p-2 rounded relative bg-white shadow-lg">
            <h2 className="text-center mb-2">{drugkit.name}</h2>
            <Link href={`/product/${drugkit._id}`} passHref>
            <div className="cursor-pointer flex justify-center bg-gray-100">
    <div className="w-52 h-52 relative">
        <Image 
            src={drugkit.image_url}
            alt={drugkit.name}
            layout="fill"
            className="object-cover"
        />
    </div>
</div>
            </Link>
            <button 
                className="absolute bottom-4 left-4" 
                onClick={() => onLike(drugkit)}
            >
                <HeartIcon className={`h-5 w-5 ${isLiked ? 'text-red-500' : 'text-gray-500'}`} />
            </button>
        </div>
    );
};

export default DrugkitCardThumbnail;
