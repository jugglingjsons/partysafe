import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next'; // Import the useTranslation hook
import { BookOpenIcon, HandIcon, ChatIcon, HeartIcon, QuestionMarkCircleIcon } from '@heroicons/react/solid';

function Footer() {
    const { t } = useTranslation(); // Access the t function for translations

    return (
        <footer className="bg-gray-800 p-2 text-white">
            <div className="flex justify-center px-4 max-w-7xl mx-auto space-x-5">
                <Link href="/library" passHref>
                    <div className="flex flex-col items-center">
                        <BookOpenIcon className="h-6 w-6" />
                        <span className="mt-2 text-sm">{t('library')}</span> {/* Translate 'library' */}
                    </div>
                </Link>
                <Link href="/support" passHref>
                    <div className="flex flex-col items-center">
                        <HandIcon className="h-6 w-6" />
                        <span className="mt-2 text-sm">{t('support')}</span> {/* Translate 'support' */}
                    </div>
                </Link>
                <Link href="/dialogue" passHref>
                    <div className="flex flex-col items-center">
                        <ChatIcon className="h-6 w-6" />
                        <span className="mt-2 text-sm">{t('dialogue')}</span> {/* Translate 'dialogue' */}
                    </div>
                </Link>
                <Link href="/favorites" passHref>
                    <div className="flex flex-col items-center">
                        <HeartIcon className="h-6 w-6" />
                        <span className="mt-2 text-sm">{t('favorites')}</span> {/* Translate 'favorites' */}
                    </div>
                </Link>
                <Link href="/about" passHref>
                    <div className="flex flex-col items-center">
                        <QuestionMarkCircleIcon className="h-6 w-6" />
                        <span className="mt-2 text-sm">{t('about')}</span> {/* Translate 'about' */}
                    </div>
                </Link>
            </div>
            <p className="text-center mt-4">&copy; 2023 PartySafe. {t('allRightsReserved')}</p> {/* Translate 'allRightsReserved' */}
        </footer>
    );
}

export default Footer;

