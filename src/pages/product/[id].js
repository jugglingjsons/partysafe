import LikeButton from '@/components/ui/LikeButton';
import { ShoppingCartIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { useState } from 'react';
import Image from 'next/image'; // Import the Image component
import { useSession } from 'next-auth/react'; // Import the useSession hook

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ProductDetailsPage() {
  const { data: session } = useSession(); // Use the session hook to get the user data
  console.log('Session:', session); // Debugging statement
  const router = useRouter();
  const { id } = router.query;
  console.log('Id:', id); // Debugging statement
  const [cartCount, setCartCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false); // State to track if the product is liked

  // Fetch product details using SWR
  const { data: product, error } = useSWR(`/api/drugkit/${id}`, fetcher);

  // Handle errors and loading state
  if (error) return <div>Error loading product details</div>;
  if (!product) return <div>Loading...</div>;

  // Function to handle like button click
const handleLikeClick = async (isLiked) => {
  const productId = product._id; // Assuming product._id is the ID of the product

  try {
      console.log('ProductId:', productId); // Debugging statement
      console.log('IsLiked:', isLiked); // Debugging statement

      const response = await fetch(`/api/favorites/${productId}`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ productId, isLiked }), // Include productId and isLiked in the request body
      });

      if (response.ok) {
          console.log(`Product liked: ${isLiked}`);
          setLiked(isLiked); // Update the liked state
      } else {
          console.error('Failed to like/unlike the product');
      }
  } catch (error) {
      console.error('Error liking/unliking the product:', error);
  }
};


  // Function to add the product to the cart
  const handleAddToCart = async () => {
    const itemId = id; // Assuming product._id is the ID of the added product
    const userId = session.user.id; // Assuming userId is the ID of the authenticated user
    const quantity = 1; // You can adjust the quantity as needed

    try {
      const response = await fetch('/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId, userId, quantity }),
      });

      if (response.ok) {
        setCartCount(cartCount + 1);
        console.log('Item added to cart successfully');
      } else {
        console.error('Failed to add item to cart');
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* Header */}
      <header style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <p style={{ flex: 1, textAlign: 'left', cursor: 'pointer' }} onClick={() => router.back()}>Back</p>
        <ShoppingCartIcon className="h-6 w-6" style={{ marginRight: '10px' }} />
        <span>{cartCount}</span>
      </header>

      {/* Product Image */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Image
          src={product.image_url}
          alt={product.name}
          width={300}
          height={300}
          objectFit="contain"
        />
      </div>

      {/* Product Details */}
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h2>{product.name}</h2>
        <p>Description: {product.description}</p>
        <p>Price: {product.price}</p>

        {/* Like Button */}
        <LikeButton isLiked={false} onLikeClick={handleLikeClick} />

        {/* Add to Cart Button */}
        <div>
          <button onClick={handleAddToCart} style={{ marginRight: '10px' }}>Add to cart</button>
        </div>
      </div>
    </div>
  );
}

