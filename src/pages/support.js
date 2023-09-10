import { useState } from 'react';
import Image from 'next/image';

const links = [
  { text: 'Drogennotdienst.de', url: 'https://drogennotdienst.de/' },
  { text: 'Vistaberlin.de - English', url: 'https://vistaberlin.de/sprachen/english/' },
  { text: 'Drogennotdienst.de - English', url: 'https://drogennotdienst.de/english/' },
  // Add more links as needed
];

export default function Support() {
  const [showMoreLinks, setShowMoreLinks] = useState(false);

  const toggleShowMoreLinks = () => {
    setShowMoreLinks(!showMoreLinks);
  };

  const visibleLinks = showMoreLinks ? links : links.slice(0, 3);

  return (
    <div className="bg-white min-h-screen text-gray-800 p-4">
      <h1 className="text-center my-4 text-3xl font-semibold">Your Support</h1>
      <h2 className="text-center my-4 text-lg">
        Find confidential advice nearby. Find accepting drug counseling and drug checking services nearby. No strings attached.
      </h2>
      <div className="text-center my-4">
        <p className="mb-2">Useful Links:</p>
        <ul className="list-disc list-inside">
          {visibleLinks.map((link, index) => (
            <li key={index}>
              <a
                className="text-blue-600 hover:underline"
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.text}
              </a>
              <div className={`website-preview ${showMoreLinks ? 'show-preview' : ''}`}>
                {showMoreLinks && (
                  <iframe
                    title={`Website Preview - ${link.text}`}
                    src={link.url}
                    frameBorder="0"
                    width="320"
                    height="180"
                  />
                )}
              </div>
            </li>
          ))}
        </ul>
        {links.length > 3 && (
          <>
            <button
              className="mt-4 text-blue-600 hover:underline"
              onClick={toggleShowMoreLinks}
            >
              {showMoreLinks ? 'Show Less' : 'Show More'}
            </button>
            {showMoreLinks && (
              <div className="my-4">
                <Image
                  src="/support.gif" // Replace with your image source
                  alt="Cartoon Animation"
                  width={200} // Adjust the width as needed
                  height={200} // Adjust the height as needed
                />
              </div>
            )}
          </>
        )}
      </div>
      <style jsx>{`
        .website-preview {
          display: none;
          margin-top: 10px;
          overflow: hidden;
          transition: height 0.5s ease-in-out;
        }

        .show-preview {
          display: block;
          height: 180px; /* Adjust the height as needed */
        }
      `}</style>
    </div>
  );
}
