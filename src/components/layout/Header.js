import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useSession, signOut } from 'next-auth/react';

const Header = () => {
    const [sloganVisible, setSloganVisible] = useState(false);
    const [sloganText, setSloganText] = useState('');
    const [advertImages, setAdvertImages] = useState([
        '/adv.png',
        '/adv2.png',
    ]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const router = useRouter();
    const { t, i18n } = useTranslation();
    const { data: session } = useSession();

    const fullSlogan = "  Stop wondering what’s inside your drugs. Start making informed decisions.  ";

    const intervalRef = useRef();

    useEffect(() => {
        const timeout = setTimeout(() => {
            setSloganVisible(true);
        }, 500);

        return () => clearTimeout(timeout);
    }, []);

    const startSloganAnimation = () => {
        let index = 0;
        intervalRef.current = setInterval(() => {
            if (index < fullSlogan.length) {
                setSloganText((prev) => prev + fullSlogan[index]);
                index += 1;
            } else {
                clearInterval(intervalRef.current);
                setTimeout(() => {
                    setSloganText('');
                    startSloganAnimation();
                }, 1000);
            }
        }, 100);
    };

    useEffect(() => {
        if (sloganVisible) {
            startSloganAnimation();
        } else {
            clearInterval(intervalRef.current);
        }
        return () => {
            clearInterval(intervalRef.current);
        };
    }, [sloganVisible, fullSlogan]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % advertImages.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [advertImages]);

    const handleLanguageChange = (e) => {
        const selectedLanguage = e.target.value;
        i18n.changeLanguage(selectedLanguage);
    };

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
                        <Link href="/account" passHref>
                            <div className="text-gray-600 cursor-pointer text-lg">{t('myAccount')}</div>
                        </Link>
                        <Link href="/cart" passHref>
                            <div className="text-gray-600 cursor-pointer text-lg">{t('checkout')}</div>
                        </Link>
                        {session ? (
                            <button
                                className="text-gray-600 cursor-pointer text-lg"
                                onClick={() => signOut()}
                            >
                                {t('logOut')}
                            </button>
                        ) : (
                            <Link href="/login" passHref>
                                <div className="text-gray-600 cursor-pointer text-lg">{t('logIn')}</div>
                            </Link>
                        )}
                        <div className="relative">
                            <select
                                className="block appearance-none w-full bg-white border border-gray-300 text-gray-350 py-2 px-3 pr-7 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                value={i18n.language}
                                onChange={handleLanguageChange}
                            >
                                <option value="en">English</option>
                                <option value="de">German</option>
                                <option value="fr">French</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto text-center mt-2">
                    <p className={`text-gray-600 text-sm ${sloganVisible ? 'opacity-100' : 'opacity-0 transition-opacity duration-1000 ease-in'}`}>
                        {sloganText}
                    </p>
                </div>
            </header>

            <div className="container mx-auto mt-4 flex justify-center" style={{ margin: '20 20px' }}>
                <Image
                    src={advertImages[currentImageIndex]}
                    alt={`Advertisement ${currentImageIndex + 1}`}
                    className="object-cover rounded mx-auto"
                    style={{ maxHeight: 'calc(100vh - 100px)', width: 'calc(100% - 40px)' }}
                    width={1200}
                    height={800}
                />
            </div>
        </>
    );
};

export default Header;
