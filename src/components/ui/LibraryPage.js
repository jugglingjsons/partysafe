import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function LibraryPage({ drugLibrary }) {
  return (
    <div className="cardContainer">
      {drugLibrary.map((drug) => (
        <Link key={drug.name} href={`/library/${encodeURIComponent(drug.name)}`}>
          <a className="card">
            <h2>{drug.name}</h2>
            {drug.aliases && (
              <p>
                <strong>Aliases:</strong> {drug.aliases.join(', ')}
              </p>
            )}
            <p>
              <strong>Appearance:</strong> {drug.appearance}
            </p>
          </a>
        </Link>
      ))}
    </div>
  );
}
