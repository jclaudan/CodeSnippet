import React from "react";

const SearchBar = ({ setSearchTerm }) => {
  return (
    <input
      type="text"
      placeholder="Rechercher un snippet..."
      onChange={(e) => setSearchTerm(e.target.value)}
      className="p-2 text-black border rounded-lg border-gray-300 outline-none w-full ease-in-out duration-200 outline-none focus:ring-1 focus:ring-black/20"
    />
  );
};

export default SearchBar;
