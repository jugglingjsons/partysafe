import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import i18n from "../../../i18n";
import { FiUser, FiShoppingCart } from "react-icons/fi"; // Import icons
import { BsBoxArrowRight } from "react-icons/bs"; // Import logout icon
import styles from "../../styles/Header.module.css"; // Import your header styles

const Header = () => {
  const { t } = useTranslation();
  const { data: session } = useSession();
  const [sloganVisible, setSloganVisible] = useState(false);
  const [sloganText, setSloganText] = useState("");
  const [advertImages, setAdvertImages] = useState(["/adv.png", "/adv2.png"]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const router = useRouter();
  const fullSlogan =
    "Stop wondering what’s inside your drugs. Start making informed decisions.";

  const intervalRef = useRef(null);

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    i18n.changeLanguage(selectedLanguage);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSloganVisible(true);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  const startSloganAnimation = () => {
    let index = 0;

    const animate = () => {
      if (index < fullSlogan.length) {
        setSloganText((prev) => prev + fullSlogan[index]);
        index += 1;
        requestAnimationFrame(animate);
      }
    };

    animate();
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
  }, [sloganVisible]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % advertImages.length
      );
    }, 5000);

    intervalRef.current = interval;

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [advertImages]);

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <>
      <header className={`${styles.header} bg-white shadow-md`}>
        <div className="container mx-auto flex justify-between items-center py-6">
          <Link href="/">
            <div className="cursor-pointer flex-shrink-0">
              <Image
                src="/newlogo2.png"
                alt="PartySafe Logo"
                width={250}
                height={250}
              />
            </div>
          </Link>
          <div className="flex items-center space-x-4 ml-auto">
            <Link href="/account" passHref>
              <div
                className={`${styles.iconButton} text-gray-600 cursor-pointer text-lg`}
              >
                <FiUser />
                {t("Account")}
              </div>
            </Link>
            <Link href="/cart" passHref>
              <div
                className={`${styles.iconButton} text-gray-600 cursor-pointer text-lg`}
              >
                <FiShoppingCart />
                {t("Cart")}
              </div>
            </Link>
            {session ? (
              <button
                className={`${styles.iconButton} text-gray-600 cursor-pointer text-lg`}
                onClick={handleSignOut}
              >
                <BsBoxArrowRight />
                {t("Log Out")}
              </button>
            ) : (
              <Link href="/login" passHref>
                <div
                  className={`${styles.iconButton} text-gray-600 cursor-pointer text-lg`}
                >
                  {t("Log In")}
                </div>
              </Link>
            )}
            <div className="relative">
              <select
                className={`${styles.languageSelect} block appearance-none w-full bg-white border border-gray-300 text-gray-350 py-2 px-3 pr-7 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
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
          <p
            className={`${styles.slogan} text-gray-600 text-sm ${
              sloganVisible
                ? "opacity-100"
                : "opacity-0 transition-opacity duration-1000 ease-in"
            }`}
          >
            {sloganText}
          </p>
        </div>
      </header>

      <div
        className="container mx-auto mt-4 flex justify-center"
        style={{ margin: "20 20px" }}
      >
        <Image
          src={advertImages[currentImageIndex]}
          alt={`Advertisement ${currentImageIndex + 1}`}
          className={`${styles.adBanner} object-cover rounded mx-auto`}
          style={{
            maxHeight: "calc(100vh - 100px)",
            width: "calc(100% - 40px)",
          }}
          width={800} // Adjusted the width and height
          height={400} // Adjusted the width and height
        />
      </div>
    </>
  );
};

export default Header;
