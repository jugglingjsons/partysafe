import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Library.module.css';
import Searchbar from '@/components/ui/Searchbar'; // Import the Searchbar component

export default function LibraryPage() {
  const [drugLibrary, setDrugLibrary] = useState([]);
  const [searchResults, setSearchResults] = useState([]); // State to hold search results
  const [searchQuery, setSearchQuery] = useState(''); // State to hold search query

  useEffect(() => {
    // Fetch the drug library data from your JSON file
    fetch('/druglibrary.json')
      .then((response) => response.json())
      .then((data) => {
        setDrugLibrary(data);
        setSearchResults(data); // Initialize search results with all data
      })
      .catch((error) => console.error('Error fetching drug library:', error));
  }, []);

  // Function to handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
    // Filter the drug library based on the search query
    const filteredResults = drugLibrary.filter((drug) =>
      drug.name.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  // Function to handle clearing the search
  const handleClear = () => {
    setSearchQuery('');
    setSearchResults(drugLibrary); // Reset search results to all data
  };

  return (
    <div className="container">
      <h1>Drug Library</h1>

      {/* Render the Searchbar component with the handleSearch and handleClear functions */}
      <Searchbar
        onSearch={handleSearch}
        onClear={handleClear}
        placeholder="Search a drug..."
      />

      <div className={styles.cardContainer}>
        {searchResults.map((drug) => (
          <Link key={drug.name} href={`/library/${encodeURIComponent(drug.name)}`}>
            <div className={styles.card}>
              <h2>{drug.name}</h2>
              {drug.aliases && (
                <p>
                  <strong>Aliases:</strong> {drug.aliases.join(', ')}
                </p>
              )}
              <p>
                <strong>Appearance:</strong> {drug.appearance}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}




