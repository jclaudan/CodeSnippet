import React from "react";
import { useTheme } from "@/app/context/ThemeContext";

const SearchBar = ({ setSearchTerm }) => {
  const { darkMode } = useTheme();

  return (
    <input
      type="text"
      placeholder="Search a snippet..."
      onChange={(e) => setSearchTerm(e.target.value)}
      className={`${
        darkMode
          ? "bg-zinc-800 border-zinc-700 text-gray-200 focus:ring-zinc-600"
          : "bg-white border-gray-200 text-gray-800"
      } p-2 text-black border rounded-lg w-full ease-in-out duration-200 outline-none focus:ring-1 focus:ring-black/20`}
    />
  );
};

export default SearchBar;
