import React, { useState } from 'react';

const Searchbar = ({ onSearch }) => {
    const [searchText, setSearchText] = useState('');

    const handleSearch = () => {
        if (searchText.trim() !== '') {
            onSearch(searchText);
        }
    };

    return (
        <div className="mb-4">
            <input
                type="text"
                className="w-full border rounded p-2"
                placeholder="Search drug kits..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />
            <button
                className="bg-blue-500 text-white py-1 px-2 rounded mt-2"
                onClick={handleSearch}
            >
                Search
            </button>
        </div>
    );
};

export default Searchbar;
