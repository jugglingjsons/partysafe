import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import Searchbar from "@/components/ui/Searchbar";
import DrugkitCardThumbnail from "../components/DrugkitCardThumbnail";
import { useSession } from "next-auth/react";
import { HeartIcon } from "@heroicons/react/solid";
import LikeButton from "@/components/ui/LikeButton";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data: products, error } = useSWR("/api/drugkit", fetcher);
  const [likedProducts, setLikedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState(
    "Search your kit in the search bar"
  );
  const [userFavorites, setUserFavorites] = useState([]);
  const router = useRouter();
  const isDialoguePage = router.pathname === "/dialogue";
  const { data: session, loadingSession } = useSession();

  useEffect(() => {
    if (session?.user) {
      setUserFavorites(session.user.favorites);
    }
  }, [session]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/drugkit");
        const data = await response.json();
        setSearchResults(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (products) {
      if (searchQuery.trim() !== "") {
        const filteredResults = products.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(filteredResults);
      } else {
        setSearchResults(products);
      }
    }
  }, [searchQuery, products]);

  const toggleLike = async (product) => {
    if (!product || !session) {
      router.push("/login");
      return;
    }
    const favoritesInfo = { userid: session.user.id };

    const response = await fetch(`/api/favorites/${product._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleClear = () => {
    setSearchQuery("Search your kit in the search bar");
  };

  if (error) return <div>Failed to load products</div>;

  return (
    <div className="bg-white min-h-screen text-gray-800">
      {!isDialoguePage && (
        <Searchbar
          onSearch={handleSearch}
          onClear={handleClear}
          placeholder="Search drug testing kits..."
          searchText={searchQuery}
        />
      )}
      <main className="p-4 grid grid-cols-2 gap-4">
        {loading ? (
          <div>Loading...</div>
        ) : (
          searchResults.map((product) => (
            <DrugkitCardThumbnail
              key={product._id}
              drugkit={product}
              onLike={toggleLike}
              liked={userFavorites.includes(product._id)}
            />
          ))
        )}
      </main>
    </div>
  );
}
