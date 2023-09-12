import React, { useState } from "react";
import { HeartIcon } from "@heroicons/react/solid";

const LikeButton = ({ isLiked, onLikeClick, id }) => {
  const [liked, setLiked] = useState(isLiked);

  const toggleLike = async () => {
    // Toggle the liked state locally
    setLiked(!liked);

    // Make an API call to update the liked status on the server
    try {
      const response = await fetch(`/api/favorites/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ liked: !liked }), // Invert the liked status
      });

      if (!response.ok) {
        // Revert the liked state if the API call fails
        setLiked(!liked);
        console.error("Failed to update liked status on the server");
      } else {
        // Call the parent component's callback with the updated liked status
        onLikeClick(!liked);
      }
    } catch (error) {
      // Handle API call error
      console.error("Error updating liked status:", error);

      // Revert the liked state if there's an error
      setLiked(!liked);
    }
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
