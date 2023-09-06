import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Header = () => {
    const [sloganVisible, setSloganVisible] = useState(false);
    const [sloganText, setSloganText] = useState('');
    const [advertImages, setAdvertImages] = useState([
        '/adv.png',
        '/adv2.png',
    ]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const router = useRouter();
    const fullSlogan = " Stop wondering what’s inside your drugs. Start making informed decisions. ";

    useEffect(() => {
        const timeout = setTimeout(() => {
            setSloganVisible(true);
        }, 500);

        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        let index = 0;
        if (sloganVisible) {
            const interval = setInterval(() => {
                if (index < fullSlogan.length) {
                    setSloganText((prev) => prev + fullSlogan[index]);
                    index += 1;
                } else {
                    clearInterval(interval);
                }
            }, 100); 
        }
    }, [sloganVisible]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % advertImages.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [advertImages]);

    return (
        <>
            <header className="bg-white shadow-md">
    <div className="container mx-auto flex justify-between items-center py-6">
        <Link href="/">
            <div className="cursor-pointer flex-shrink-0">
                <Image src="/newlogo2.png" alt="PartySafe Logo" width={250} height={250} />
            </div>
        </Link>
        <div className="flex items-center space-x-4 ml-auto">
            <Link href="/my-account" passHref>
                <div className="text-gray-600 cursor-pointer text-lg">My Account</div>
            </Link>
            <Link href="/checkout" passHref>
                <div className="text-gray-600 cursor-pointer text-lg">Checkout</div>
            </Link>
            <Link href="/login" passHref>
                <div className="text-gray-600 cursor-pointer text-lg">Log In</div>
            </Link>
            <div className="relative">
                <select className="block appearance-none w-full bg-white border border-gray-300 text-gray-350 py-2 px-3 pr-7 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                    <option>English</option>
                    <option>German</option>
                    <option>French</option>
                </select>
            </div>
        </div>
    </div>

                <div className="container mx-auto text-center mt-2">
                    <p className={`text-gray-600 text-sm ${sloganVisible ? 'opacity-100' : 'opacity-0 transition-opacity duration-1000 ease-in'}`}>
                        {sloganText}
                    </p>
                </div>

                <div className="container mx-auto py-2 w-4/5 max-w-lg mt-4 flex justify-center">
                    <input 
                        type="text" 
                        placeholder="Search your kit..." 
                        className="rounded-lg p-3 w-full border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
                    />
                </div>
                
                <div className="container mx-auto text-center mt-4">
                    <Link href="/category-bundles" passHref>
                        <button className="bg-white text-black py-2 px-4 rounded text-lg">Category Bundles</button>
                    </Link>
                </div>
            </header>

            <div className="container mx-auto mt-4 flex justify-center" style={{ margin: '20 20px' }}>
                <img 
                    src={advertImages[currentImageIndex]} 
                    alt={`Advertisement ${currentImageIndex + 1}`} 
                    className="object-cover rounded mx-auto" 
                    style={{ maxHeight: 'calc(100vh - 100px)', width: 'calc(100% - 40px)' }} 
                />
            </div>
        </>
    );
};

export default Header;

