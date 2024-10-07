import React from 'react';

function SearchBar({ setSearchTerm }) {
    return (
        <div className="mb-4">
            <input
                type="text"
                placeholder="Search for products..."
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border rounded p-2 w-full"
            />
        </div>
    );
}

export default SearchBar;
