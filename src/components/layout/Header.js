import React from 'react';
import Image from 'next/image';

const Header = () => {
    return (
        <header className="flex flex-col items-center justify-center py-6 bg-white shadow-md">
            <Image src="/logo.png" alt="PartySafe Logo" width={350} height={350} />

            <div className="py-2 w-full max-w-lg mt-4">
                <input 
                    type="text" 
                    placeholder="Search..." 
                    className="rounded-lg p-3 w-full border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
                />
            </div>
        </header>
    );
}

export default Header;
