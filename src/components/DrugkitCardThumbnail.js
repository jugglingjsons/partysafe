import React from 'react';
import Image from 'next/image';
import Link from 'next/link'; // Add this line to import the Link component
import { HeartIcon } from '@heroicons/react/solid';

const DrugkitCardThumbnail = ({ drugkit, onLike }) => {
    return (
        <div className="border p-2 rounded">
            <Link href={`/drugkit/${drugkit._id}`}>
                <div>
                    <h2 className="text-center mb-2">{drugkit.name}</h2>
                    <Image 
                        src={drugkit.image_url}
                        alt={drugkit.name}
                        width={100}
                        height={100}
                    />
                </div>
            </Link>

            <button className="like-button mt-2" onClick={() => onLike(drugkit)}>
                <HeartIcon className={`h-5 w-5`} />
            </button>
        </div>
    );
};

export default DrugkitCardThumbnail;
