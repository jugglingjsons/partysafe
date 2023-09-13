import React, { useEffect, useState } from "react";
import LikeButton from "@/components/ui/LikeButton";
import { ShoppingCartIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import useSWR from "swr";
import Image from "next/image";
import { useSession } from "next-auth/react";
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ProductDetailsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = router.query;
  const [cartCount, setCartCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/drugkit/${id}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        } else {
          console.error("Failed to fetch product details");
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleLikeClick = async (isLiked) => {
    if (!product) return;
    const productId = product._id;

    try {
      const response = await fetch(`/api/favorites/${productId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, isLiked }),
      });

      if (response.ok) {
        setIsLiked(isLiked);
      } else {
        console.error("Failed to like/unlike the product");
      }
    } catch (error) {
      console.error("Error liking/unliking the product:", error);
    }
  };

  const handleAddToCart = async () => {
    if (!product || !session) return;
    const itemId = id;
    const userId = session.user.id;
    const quantity = 1;

    try {
      const response = await fetch("/api/cart/add", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId, userId, quantity }),
      });

      if (response.ok) {
        setCartCount(cartCount + 1);
      } else {
        console.error("Failed to add item to cart");
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="product-details-container">
      {/* <header className="product-header">
        <p onClick={() => router.back()} className="back-link">
          Back
        </p>
        <ShoppingCartIcon className="cart-icon" />
        <span className="cart-count">{cartCount}</span>
      </header> */}

      <div className="product-content">
        <div className="product-image-container">
          <LikeButton isLiked={isLiked} onLikeClick={handleLikeClick} />
          <Image
            src={product.image_url}
            alt={product.name}
            width={300}
            height={300}
            objectFit="contain"
          />
          <div className="price-container">
            <h2 className="product-name">{product.name}</h2>
            <p className="product-price">{product.price}€</p>
            <button onClick={handleAddToCart} className="add-to-cart-button">
              <ShoppingCartIcon className="add-to-cart-icon" />
              <span className="cart-count">{cartCount}</span>
              <h1> </h1>
              Add to cart
            </button>
          </div>
        </div>

        <div className="product-description">
          <h3 className="section-title">Description:</h3>
          <p>{product.description}</p>
        </div>

        <div className="product-instructions">
          <h3 className="section-title">Instructions:</h3>
          <p>{product.instructions}</p>
        </div>
      </div>
    </div>
  );
}
