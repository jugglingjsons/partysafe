// import LikeButton from '@/components/ui/LikeButton';
// import { ShoppingCartIcon } from '@heroicons/react/solid';
// import { useRouter } from 'next/router';
// import useSWR from 'swr';
// import { useState } from 'react';

// const fetcher = (url) => fetch(url).then((res) => res.json());

// export default function ProductDetailsPage() {
//     const router = useRouter();
//     const { id } = router.query;
//     const [cartCount, setCartCount] = useState(0);

//     const { data: product, error } = useSWR(`/api/drugkit/${id}`, fetcher);

//     if (error) return <div>Error loading product details</div>;
//     if (!product) return <div>Loading...</div>;

//     const handleLikeClick = (isLiked) => {
//         console.log(`Product liked: ${isLiked}`);
//     };

//     const handleAddToCart = async () => {
//         const itemId = product._id; // Assuming product._id is the ID of the added product
//         const quantity = 1; // You can adjust the quantity as needed

//         try {
//             const response = await fetch('/api/cart/add', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ itemId, quantity }),
//             });

//             if (response.ok) {
//                 setCartCount(cartCount + 1);
//                 console.log('Item added to cart successfully');
//             } else {
//                 console.error('Failed to add item to cart');
//             }
//         } catch (error) {
//             console.error('Error adding item to cart:', error);
//         }
//     };

//     return (
//         <div style={{ padding: '20px' }}>
//             <header style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
//                 <p style={{ flex: 1, textAlign: 'left' }}>Back</p>
//                 <ShoppingCartIcon className="h-6 w-6" style={{ marginRight: '10px' }} />
//                 <span>{cartCount}</span>
//             </header>

//             <img src={product.image_url} alt={product.name} style={{ maxWidth: '300px', margin: 'auto', display: 'block' }} />

//             <div style={{ textAlign: 'center', padding: '20px' }}>
//                 <h2>{product.name}</h2>
//                 <p>Description: {product.description}</p>
//                 <p>Price: {product.price}</p>

//                 <LikeButton isLiked={false} onLikeClick={handleLikeClick} />

//                 <div>
//                     <button onClick={handleAddToCart} style={{ marginRight: '10px' }}>Add to cart</button>
//                 </div>
//             </div>
//         </div>
//     );
// }
