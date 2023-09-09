import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import Searchbar from '@/components/ui/Searchbar';
import DrugkitCardThumbnail from '../components/DrugkitCardThumbnail'; // Import the simplified card component

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {
    const { data: products, error } = useSWR('/api/drugkit', fetcher);
    const [likedProducts, setLikedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        // Fetch liked products from API
        async function fetchLikedProducts() {
            try {
                const response = await fetch('/api/favorites');
                const data = await response.json();
                setLikedProducts(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching liked products:', error);
                setLoading(false);
            }
        }

        fetchLikedProducts();
    }, []);

    useEffect(() => {
        // Filter products based on search query
        if (searchQuery.trim() === '') {
            setSearchResults(products);
        } else {
            const filteredResults = products.filter((product) =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setSearchResults(filteredResults);
        }
    }, [searchQuery, products]);

    const toggleLike = async (product) => {
        try {
            const isAlreadyLiked = likedProducts.some((like) => like._id === product._id);

            if (isAlreadyLiked) {
                const updatedLikes = likedProducts.filter((like) => like._id !== product._id);
                setLikedProducts(updatedLikes);
                await fetch(`/api/favorites/${product._id}`, { method: 'DELETE' });
            } else {
                const updatedLikes = [...likedProducts, product];
                setLikedProducts(updatedLikes);
                await fetch(`/api/favorites/${product._id}`, { method: 'POST' });
            }
        } catch (error) {
            console.error('Error toggling like:', error);
        }
    };

    // This function is used to handle the search query from the Searchbar component.
    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    // This function is used to handle clearing the search query and optionally clear search results.
    const handleClear = () => {
        setSearchQuery('');
        // Optionally, you can also clear the search results or perform other actions here.
    };

    if (error) return <div>Failed to load products</div>;

    return (
        <div className="bg-white min-h-screen text-gray-800">
            <Searchbar onSearch={handleSearch} onClear={handleClear} />
            <main className="p-4 grid grid-cols-2 gap-4">
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    searchResults.map((product) => (
                        <DrugkitCardThumbnail
                            key={product._id}
                            drugkit={product}
                            onLike={toggleLike}
                            likedProducts={likedProducts}
                        />
                    ))
                )}
            </main>
        </div>
    );
}
