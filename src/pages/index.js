import Image from 'next/image';
import Link from 'next/link';
import useSWR from 'swr';
import { HomeIcon, HeartIcon, ShoppingCartIcon, UserIcon } from '@heroicons/react/solid';  // Import icons

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {
    const { data: products, error } = useSWR('/api/drugkit', fetcher);

    if (error) return <div>Failed to load products</div>;
    if (!products) return <div>Loading...</div>;

    return (
        <div className="bg-white min-h-screen text-gray-800">
            <header className="flex flex-col items-center justify-center p-4">
                <Image src="/logo.png" alt="Logo" width={450} height={450} />
                <div className="py-2 w-full max-w-lg">
                    <input 
                        type="text" 
                        placeholder="Search..." 
                        className="rounded p-2 w-full border border-gray-400"
                    />
                </div>
            </header>
            
            <main className="p-4 grid grid-cols-3 gap-4">
                {products.map(product => (
                    <div key={product.id} className="border p-2 rounded">
                        <h2 className="text-center mb-2">{product.name}</h2>
                        <Image 
                            src={product.image_url}
                            alt={product.name}
                            width={100}
                            height={100}
                        />
                        <button className="like-button mt-2">Like</button>
                    </div>
                ))}
            </main>

            <footer className="bg-gray-800 p-4 text-white fixed bottom-0 left-0 w-full">
                <div className="flex justify-between">
                    <Link href="/">
                        <Image src="/homepage-icon.svg" alt="Home Icon" width={24} height={24} />
                    </Link>
                    <Link href="/favorites">
                        <Image src="/favorite-icon.svg" alt="Favorites Icon" width={24} height={24} />
                    </Link>
                    <Link href="/cart">
                        <Image src="/cart-icon.svg" alt="Shopping Cart Icon" width={24} height={24} />
                    </Link>
                    <Link href="/account">
                        <Image src="/user-icon.svg" alt="Account Icon" width={24} height={24} />
                    </Link>
                </div>
            </footer>
        </div>
    );
}
