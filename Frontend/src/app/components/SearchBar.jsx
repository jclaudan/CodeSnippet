import React from "react";

const SearchBar = ({ setSearchTerm }) => {
  return (
    <input
      type="text"
      placeholder="Rechercher un snippet..."
      onChange={(e) => setSearchTerm(e.target.value)}
      className="p-2 text-black border rounded-lg border-gray-300 outline-none  ease-in-out duration-200 focus:ring-black focus:ring-1"
    />
  );
};

export default SearchBar;
