import { useRouter } from 'next/router';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ProductDetailsPage() {
    const router = useRouter();
    const { id } = router.query;
    console.log(id);

    const { data: product, error } = useSWR(`/api/drugkit/${id}`, fetcher);
    console.log(product);

    if (error) return <div>Error loading product details</div>;
    if (!product) return <div>Loading...</div>;

    return (
        <div>
            <h1>Product Details</h1>
             <img src={product.image_url} alt={product.name} style={{ maxWidth: '300px', margin: 'auto' }} /> 
            <h2>{product.name}</h2>
            <p>Description: {product.description}</p>
            <p>Price: {product.price}</p>
            <button>Add to cart</button>
        </div>
    );
}
