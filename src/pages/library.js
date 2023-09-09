import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Library.module.css';

export default function LibraryPage() {
  const [drugLibrary, setDrugLibrary] = useState([]);

  useEffect(() => {
    // Fetch the drug library data from your JSON file
    fetch('/druglibrary.json')
      .then((response) => response.json())
      .then((data) => setDrugLibrary(data))
      .catch((error) => console.error('Error fetching drug library:', error));
  }, []);

  return (
    <div className="container">
      <h1>Drug Library</h1>
      <div className={styles.cardContainer}>
        {drugLibrary.map((drug) => (
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


