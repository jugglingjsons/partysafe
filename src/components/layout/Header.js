import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Header = () => {
    const [sloganVisible, setSloganVisible] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Delay the display of the slogan by a short time to create an animation effect
        const timeout = setTimeout(() => {
            setSloganVisible(true);
        }, 500);

        return () => clearTimeout(timeout);
    }, []);

    if (router.pathname !== '/') {
        return null; // Don't display the header on pages other than the homepage
    }

    return (
        <header className="flex flex-col items-center justify-center py-6 bg-white shadow-md">
            <Image src="/logo.png" alt="PartySafe Logo" width={550} height={550} />

            <p
                className={`mt-4 text-gray-600 text-center ${sloganVisible ? 'opacity-100' : 'opacity-0 transition-opacity duration-1000 ease-in'}`}
            >
                Everybody should have the right to know what’s inside their drugs.
                So that they can make informed decisions.
            </p>

            <div className="py-2 w-full max-w-lg mt-4">
                <input 
                    type="text" 
                    placeholder="Search your kit..." 
                    className="rounded-lg p-3 w-full border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
                />
            </div>
        </header>
    );
}

export default Header;
