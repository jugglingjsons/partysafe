import useSWR from "swr";
import Image from "next/image";
import { HeartIcon } from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import Link from "next/link";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Favorites() {
  const { data: session, loadingSession } = useSession();
  const userId = session?.user?.id; // Get the user ID from the session

  // Fetch user data with favorites populated
  const { data: userData, error: userError } = useSWR(
    userId ? `/api/user/${userId}` : null,
    fetcher
  );

  if (userError) {
    console.error("Error fetching user data:", userError);
    return <div>Error loading user data</div>;
  }

  if (!userData) return <div>Loading...</div>;

  if (!Array.isArray(userData.favorites)) {
    console.error("Favorites data is not an array:", userData.favorites);
    return <div>Data format error</div>;
  }

  return (
    <div className="bg-white min-h-screen text-gray-800">
      <h1 className="text-center my-4">Your Favorites</h1>
      <main className="p-4 grid grid-cols-3 gap-4">
        {userData.favorites.map((product) => (
          <div key={product._id} className="border p-2 rounded">
            <Link href={`/drugkit/${product.productId}`}>
              <h2 className="text-center mb-2">{product.name}</h2>
              <Image
                src={product.image_url}
                alt={product.name}
                width={100}
                height={100}
              />
            </Link>
            <button className="like-button mt-2">
              <HeartIcon className="h-5 w-5 text-red-500" />
            </button>
          </div>
        ))}
      </main>
    </div>
  );
}
