import { useTranslation } from "next-i18next";
import React from "react";
import Image from "next/image";
import { HeartIcon } from "@heroicons/react/solid";
import Link from "next/link";
import LikeButton from "./ui/LikeButton";

const DrugkitCardThumbnail = ({ drugkit, onLike, liked }) => {
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
              priority={true} // Load the image as soon as the page loads
            />
          </div>
        </div>
      </Link>
      <LikeButton isLiked={liked} onClick={() => onLike(drugkit)} />
    </div>
  );
};

export default DrugkitCardThumbnail;
