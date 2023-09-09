import LikeButton from '@/components/ui/LikeButton';
import { ShoppingCartIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { useState } from 'react';
import Image from 'next/image'; // Import the Image component

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ProductDetailsPage() {
  const router = useRouter();
  const { id } = router.query;
  const [cartCount, setCartCount] = useState(0);

  // Fetch product details using SWR
  const { data: product, error } = useSWR(`/api/drugkit/${id}`, fetcher);

  // Handle errors and loading state
  if (error) return <div>Error loading product details</div>;
  if (!product) return <div>Loading...</div>;

  // Function to handle like button click
  const handleLikeClick = (isLiked) => {
    console.log(`Product liked: ${isLiked}`);
  };

  // Function to add the product to the cart
  const handleAddToCart = async () => {
    const itemId = product._id; // Assuming product._id is the ID of the added product
    const quantity = 1; // You can adjust the quantity as needed

    try {
      const response = await fetch('/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId, quantity }),
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

