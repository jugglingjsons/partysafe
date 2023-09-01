import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { HomeIcon, HeartIcon, ShoppingCartIcon, UserIcon, BookOpenIcon, HandIcon, ChatIcon, QuestionMarkCircleIcon } from '@heroicons/react/solid';

function Footer() {
    return (
        <footer className="bg-gray-800 p-4 text-white">
            <div className="flex justify-between px-4 max-w-5xl mx-auto">
                <Link href="/">
                    <HomeIcon className="h-6 w-6 mx-2 hover:text-gray-400 cursor-pointer" />
                </Link>
                <Link href="/library">
                    <BookOpenIcon className="h-6 w-6 mx-2 hover:text-gray-400 cursor-pointer" />
                </Link>
                <Link href="/support">
                    <HandIcon className="h-6 w-6 mx-2 hover:text-gray-400 cursor-pointer" />
                </Link>
                <Link href="/dialogue">
                    <ChatIcon className="h-6 w-6 mx-2 hover:text-gray-400 cursor-pointer" />
                </Link>
                <Link href="/favorites">
                    <HeartIcon className="h-6 w-6 mx-2 hover:text-gray-400 cursor-pointer" />
                </Link>
                <Link href="/cart">
                    <ShoppingCartIcon className="h-6 w-6 mx-2 hover:text-gray-400 cursor-pointer" />
                </Link>
                <Link href="/account">
                    <UserIcon className="h-6 w-6 mx-2 hover:text-gray-400 cursor-pointer" />
                </Link>
                <Link href="/about">
                    <QuestionMarkCircleIcon className="h-6 w-6 mx-2 hover:text-gray-400 cursor-pointer" />
                </Link>
            </div>
            <p className="text-center mt-4">© 2023 PartySafe. All rights reserved.</p>
        </footer>
    );
}

export default Footer;
