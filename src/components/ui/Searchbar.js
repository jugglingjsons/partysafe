// Inside Searchbar.js
import React, { useState } from 'react';

const Searchbar = ({ onSearch, onClear, placeholder }) => {
    const [searchText, setSearchText] = useState('');

    const handleSearch = () => {
        if (searchText.trim() !== '') {
            onSearch(searchText);
        }
    };

    const handleKeyUp = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleClear = () => {
        setSearchText('');
        onClear(); // Clear the search results in the parent component
    };

    return (
        <div className="mb-4">
            <input
                type="text"
                className="w-full border rounded p-2"
                placeholder={placeholder} // Use the custom placeholder text here
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyUp={handleKeyUp}
            />
            <button
                className="bg-blue-500 text-white py-1 px-2 rounded mt-2"
                onClick={handleSearch}
            >
                Search
            </button>
            <button
                className="bg-gray-300 text-gray-600 py-1 px-2 rounded mt-2 ml-2"
                onClick={handleClear}
            >
                Clear
            </button>
        </div>
    );
};

export default Searchbar;
