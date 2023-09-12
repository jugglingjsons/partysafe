import React, { useEffect, useState } from "react"; // Import useEffect and useState from React
import LikeButton from "@/components/ui/LikeButton";
import { ShoppingCartIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import useSWR from "swr";
import Image from "next/image";
import { useSession } from "next-auth/react";
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ProductDetailsPage() {
  const { data: session } = useSession(); // Use the session hook to get the user data
  const router = useRouter();
  const { id } = router.query;
  const [cartCount, setCartCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false); // State to track if the product is liked
  const [product, setProduct] = useState(null); // State to store product data

  useEffect(() => {
    // Fetch product details using SWR
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
  }, [id]); // Trigger the fetch when 'id' changes

  // Function to handle like button click
  const handleLikeClick = async (isLiked) => {
    if (!product) return; // Ensure product data is available
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
        console.log(`Product liked: ${isLiked}`);
      } else {
        console.error("Failed to like/unlike the product");
      }
    } catch (error) {
      console.error("Error liking/unliking the product:", error);
    }
  };

  // Function to add the product to the cart
  const handleAddToCart = async () => {
    if (!product || !session) return; // Ensure product data and session are available
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
        console.log("Item added to cart successfully");
      } else {
        console.error("Failed to add item to cart");
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  // Render product details once available
  if (!product) return <div>Loading...</div>;

  return (
    <div style={{ padding: "20px" }}>
      {/* Header */}
      <header
        style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
      >
        <p
          style={{ flex: 1, textAlign: "left", cursor: "pointer" }}
          onClick={() => router.back()}
        >
          Back
        </p>
        <ShoppingCartIcon className="h-6 w-6" style={{ marginRight: "10px" }} />
        <span>{cartCount}</span>
      </header>

      {/* Product Image */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Image
          src={product.image_url}
          alt={product.name}
          width={300}
          height={300}
          objectFit="contain"
        />
      </div>

      {/* Product Details */}
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h2>{product.name}</h2>
        <p>Description: {product.description}</p>
        <p>Price: {product.price}</p>

        {/* Like Button */}
        <LikeButton isLiked={isLiked} onLikeClick={handleLikeClick} />

        {/* Add to Cart Button */}
        <div>
          <button onClick={handleAddToCart} style={{ marginRight: "10px" }}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
