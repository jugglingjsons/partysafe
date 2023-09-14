import { HeartIcon } from "@heroicons/react/outline";
import { useState } from "react";

const LikeButton = ({ isLiked, onLikeClick }) => {
  const [liked, setLiked] = useState(isLiked);

  const toggleLike = async () => {
    setLiked(!liked);
    onLikeClick(!liked);
  };

  return (
    <button className="like-button" onClick={toggleLike}>
      <HeartIcon
        className={`h-5 w-5 ${liked ? "text-red-500" : "text-gray-500"}`}
      />
    </button>
  );
};

export default LikeButton;
