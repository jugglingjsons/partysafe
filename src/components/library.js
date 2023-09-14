import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../styles/Library.module.css";
import Searchbar from "@/components/ui/Searchbar";
import Chatbot from "react-chatbot-kit";
// import Chatbot from "@/components/bot/Chatbot";
import config from "../components/bot/config";
import MessageParser from "../components/bot/MessageParser";
import ActionProvider from "../components/bot/ActionProvider";
import Image from "next/image";

export default function Library({ drugLibraryData }) {
  const [drugLibrary, setDrugLibrary] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [displayCount, setDisplayCount] = useState(3); // Number of drugs to display

  useEffect(() => {
    // Fetch the drug library data from your JSON file
    fetch("/druglibrary.json")
      .then((response) => response.json())
      .then((data) => {
        setDrugLibrary(data);
        setSearchResults(data);
      })
      .catch((error) => console.error("Error fetching drug library:", error));
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredResults = drugLibrary.filter((drug) =>
      drug.name.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredResults);
    setDisplayCount(3); // Reset display count when searching
  };

  const handleClear = () => {
    setSearchQuery("");
    setSearchResults(drugLibrary);
    setDisplayCount(3); // Reset display count when clearing search
  };

  const handleViewMore = () => {
    // Increase the number of drugs to display (e.g., show 3 more)
    setDisplayCount(displayCount + 3);
  };

  const handleViewLess = () => {
    // Decrease the number of drugs to display (e.g., show 3 fewer)
    setDisplayCount(Math.max(displayCount - 3, 3));
  };

  return (
    <div className="container">
      <h1>Drug Library</h1>
      <div className={styles["image-container"]}>
        <Image
          src="/pills-drug-matrix.gif" // Replace with your image source
          alt="Pills Drug Matrix"
          width={300} // Adjust the width as needed
          height={300} // Adjust the height as needed
          className={styles["support-image"]}
        />
      </div>
      {/* Render the Searchbar component */}
      <Searchbar
        onSearch={handleSearch}
        onClear={handleClear}
        placeholder="Search a drug..."
      />

      {/* Render the DrugMaster Chatbot component
      <Chatbot
        botName="DrugMaster"
        chatIcon={<img src="/favicon.ico" alt="Pill Icon" />}
      /> */}

      <div className={styles.cardContainer}>
        {searchResults.slice(0, displayCount).map((drug) => (
          <Link
            key={drug.name}
            href={`/library/${encodeURIComponent(drug.name)}`}
          >
            <div className={styles.card}>
              <h2>{drug.name}</h2>
              {drug.aliases && (
                <p>
                  <strong>Aliases:</strong> {drug.aliases.join(", ")}
                </p>
              )}
              <p>
                <strong>Appearance:</strong> {drug.appearance}
              </p>
            </div>
          </Link>
        ))}
        {searchResults.length > 3 && (
          <div className={styles.viewButtonContainer}>
            {displayCount < searchResults.length ? (
              <button
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${styles.viewButton}`}
                onClick={handleViewMore}
              >
                View More
              </button>
            ) : (
              <button
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${styles.viewButton}`}
                onClick={handleViewLess}
              >
                View Less
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
