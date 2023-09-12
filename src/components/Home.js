import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import Searchbar from "@/components/ui/Searchbar";
import DrugkitCardThumbnail from "../components/DrugkitCardThumbnail";
import { useSession } from "next-auth/react";

const fetcher = (url) => fetch(url).then((res) => res.json());

const Home = () => {
  const { data: products, error } = useSWR("/api/drugkit", fetcher);
  const [likedProducts, setLikedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { data: session, loading: loadingSession } = useSession();

  useEffect(() => {
    async function fetchLikedProducts() {
      try {
        if (!session) {
          // Redirect to the login page
          router.push("/login");
          return; // Exit the function to prevent further execution
        }

        const response = await fetch("/api/favorites");
        const data = await response.json();
        setLikedProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching liked products:", error);
        setLoading(false);
      }
    }

    fetchLikedProducts();
  }, [session, router]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
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
      const isAlreadyLiked = likedProducts.some(
        (like) => like._id === product._id
      );

      if (isAlreadyLiked) {
        const updatedLikes = likedProducts.filter(
          (like) => like._id !== product._id
        );
        setLikedProducts(updatedLikes);
        await fetch(`/api/favorites/${product._id}`, { method: "DELETE" });
      } else {
        const updatedLikes = [...likedProducts, product];
        setLikedProducts(updatedLikes);
        await fetch(`/api/favorites/${product._id}`, { method: "POST" });
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleClear = () => {
    setSearchQuery(""); // Clear the search query
    setSearchResults([]); // Clear the search results
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
};

export default Home;
