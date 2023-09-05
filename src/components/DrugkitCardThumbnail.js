import React from 'react';
import Image from 'next/image';
import { HeartIcon } from '@heroicons/react/solid';
import Link from 'next/link';

const DrugkitCardThumbnail = ({ drugkit, onLike, likedProducts }) => {
    const isLiked = likedProducts.some((like) => like._id === drugkit._id);

    return (
        <div className="border p-2 rounded">
            <h2 className="text-center mb-2">{drugkit.name}</h2>
            <Link href={`/product/${drugkit._id}`}>
            <Image 
                src={drugkit.image_url}
                alt={drugkit.name}
                width={100}
                height={100}
            />
            </Link>
            <button className="like-button mt-2" onClick={() => onLike(drugkit)}>
                <HeartIcon className={`h-5 w-5 ${isLiked ? 'text-red-500' : 'text-gray-500'}`} />
            </button>
        </div>
    );
};

export default DrugkitCardThumbnail;
