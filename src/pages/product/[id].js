import React, { useEffect, useState } from "react";
import LikeButton from "@/components/ui/LikeButton";
import { ShoppingCartIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import useSWR from "swr";
import Image from "next/image";
import { useSession } from "next-auth/react";
import styles from "../../styles/ProductDetails.module.css"; // Import the CSS module

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ProductDetailsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = router.query;
  const [cartCount, setCartCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [product, setProduct] = useState(null);
  const [userFavorites, setUserFavorites] = useState([]);

  useEffect(() => {
    if (session?.user) {
      console.log("session.user.favorites", session.user.favorites);
      setUserFavorites(session.user.favorites);
    }
  }, [session]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/drugkit/${id}`);
        if (response.ok) {
          const data = await response.json();
          console.log("data", data);
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

  const handleLikeClick = async (product) => {
    if (!product || !session) {
      router.push("/login");
      return;
    }
    const productId = product._id;

    try {
      await fetch(`/api/favorites/${product._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
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
    if (!product || !session) {
      router.push("/login");
      return;
    }

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
    <div className={styles.productDetailsContainer}>
      <div className={styles.productContent}>
        <div className={styles.productImageContainer}>
          <div className={styles.likeButtonContainer}>
            <LikeButton
              isLiked={userFavorites.includes(product._id)}
              onClick={() => handleLikeClick(product)}
            />
          </div>
          <div className={styles.imageWrapper}>
            <Image
              src={product.image_url}
              alt={product.name}
              width={300}
              height={300}
              className={styles.productImage}
            />
          </div>
        </div>

        <div className={styles.priceContainer}>
          <h2 className={styles.productName}>{product.name}</h2>
          <p className={styles.productPrice}>{product.price}€</p>
          <button onClick={handleAddToCart} className={styles.addToCartButton}>
            <ShoppingCartIcon className={styles.addToCartIcon} />
            <span className={styles.cartCount}>{cartCount}</span>
            Add to cart
          </button>
        </div>
      </div>

      <div className={styles.productDescription}>
        <h3 className={styles.sectionTitle}>Description:</h3>
        <p>{product.description}</p>
      </div>

      <div className={styles.productInstructions}>
        <h3 className={styles.sectionTitle}>Instructions:</h3>
        <p>{product.instructions}</p>
      </div>
    </div>
  );
}
