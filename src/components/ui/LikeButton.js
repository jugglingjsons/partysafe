import React, { useState } from 'react';
import { HeartIcon } from '@heroicons/react/solid';
import { useTranslation } from 'next-i18next';

const LikeButton = ({ isLiked, onLikeClick }) => {
    const [liked, setLiked] = useState(isLiked);

    const toggleLike = () => {
        setLiked(!liked);
        onLikeClick(!liked); // Pass the updated like status to the parent component
    };

    return (
        <button className="like-button" onClick={toggleLike}>
            <HeartIcon className={`h-5 w-5 ${liked ? 'text-red-500' : 'text-gray-500'}`} />
        </button>
    );
};

export default LikeButton;
