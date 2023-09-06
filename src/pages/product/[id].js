import LikeButton from '@/components/ui/LikeButton';
import { ShoppingCartIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { useState } from 'react'; // Import useState for cart management

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ProductDetailsPage() {
    const router = useRouter();
    const { id } = router.query;
    const [cartCount, setCartCount] = useState(0); // State to manage cart count

    const { data: product, error } = useSWR(`/api/drugkit/${id}`, fetcher);

    if (error) return <div>Error loading product details</div>;
    if (!product) return <div>Loading...</div>;

    // Function to handle liking/unliking the product
    const handleLikeClick = (isLiked) => {
        console.log(`Product liked: ${isLiked}`);
    };

    const handleAddToCart = () => {
        setCartCount(cartCount + 1); // Increase cart count on clicking "Add to Cart"
    };

    return (
        <div style={{ padding: '20px' }}>
            <header style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <p style={{ flex: 1, textAlign: 'left' }}>Back</p>
                <img src="/logo.png" alt="Company Logo" style={{ width: '200px', marginRight: '165px' }} />
                <ShoppingCartIcon className="h-6 w-6" style={{ marginRight: '10px' }} />
                <span>{cartCount}</span>
            </header>

            <img src={product.image_url} alt={product.name} style={{ maxWidth: '300px', margin: 'auto', display: 'block' }} />
            
            <div style={{ textAlign: 'center', padding: '20px' }}>
                <h2>{product.name}</h2>
                <p>Description: {product.description}</p>
                <p>Price: {product.price}</p>
                
                <LikeButton isLiked={false} onLikeClick={handleLikeClick} />

                <div>
                    <button onClick={handleAddToCart} style={{ marginRight: '10px' }}>Add to cart</button>
                    <ShoppingCartIcon className="h-5 w-5 inline-block" />
                </div>
            </div>
        </div>
    );
}

