import React from 'react';
import Link from 'next/link';
import { BookOpenIcon, HandIcon, ChatIcon, HeartIcon, QuestionMarkCircleIcon } from '@heroicons/react/solid';

function Footer() {
    return (
        <footer className="bg-gray-800 p-2 text-white">
            <div className="flex justify-center px-4 max-w-7xl mx-auto space-x-36">
                <Link href="/library" passHref>
                    <div className="flex flex-col items-center">
                        <BookOpenIcon className="h-6 w-6" />
                        <span className="mt-2 text-sm">Library</span>
                    </div>
                </Link>
                <Link href="/support" passHref>
                    <div className="flex flex-col items-center">
                        <HandIcon className="h-6 w-6" />
                        <span className="mt-2 text-sm">Support</span>
                    </div>
                </Link>
                <Link href="/dialogue" passHref>
                    <div className="flex flex-col items-center">
                        <ChatIcon className="h-6 w-6" />
                        <span className="mt-2 text-sm">Dialogue</span>
                    </div>
                </Link>
                <Link href="/favorites" passHref>
                    <div className="flex flex-col items-center">
                        <HeartIcon className="h-6 w-6" />
                        <span className="mt-2 text-sm">Favorites</span>
                    </div>
                </Link>
                <Link href="/about" passHref>
                    <div className="flex flex-col items-center">
                        <QuestionMarkCircleIcon className="h-6 w-6" />
                        <span className="mt-2 text-sm">About</span>
                    </div>
                </Link>
            </div>
            <p className="text-center mt-4">© 2023 PartySafe. All rights reserved.</p>
        </footer>
    );
}

export default Footer;
