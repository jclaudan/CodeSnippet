import CategoryFilter from "./CategoryFilter";
import SearchBar from "./SearchBar";
import { useTheme } from "@/app/context/ThemeContext";

const SearchAndFilter = ({ setSearchTerm, setSelectedCategory }) => {
  const { darkMode } = useTheme();

  return (
    <div
      className={`flex flex-col sm:flex-row gap-4 mb-4 sm:mb-6 ${
        darkMode ? "text-gray-200" : "text-gray-800"
      }`}
    >
      <div
        className={`${
          darkMode ? "bg-zinc-800 text-gray-300" : "bg-white"
        } w-full flex items-center p-3 rounded-lg shadow`}
      >
        <SearchBar setSearchTerm={setSearchTerm} />
      </div>
      <div
        className={`${
          darkMode ? "bg-zinc-800 text-gray-300" : "bg-white"
        } w-full sm:w-1/4 p-3 rounded-lg shadow flex items-center`}
      >
        <CategoryFilter onSelectCategory={setSelectedCategory} />
      </div>
    </div>
  );
};

export default SearchAndFilter;
