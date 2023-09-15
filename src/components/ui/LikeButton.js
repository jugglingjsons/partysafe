import { HeartIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";

const LikeButton = ({ isLiked, onClick }) => {
  const [liked, setLiked] = useState(isLiked);

  useEffect(() => {
    setLiked(isLiked);
  }, [isLiked]);

  const toggleLike = async () => {
    setLiked(!liked);
    onClick(!liked);
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
