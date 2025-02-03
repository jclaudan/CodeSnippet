import CategoryFilter from "./CategoryFilter";
import SearchBar from "./SearchBar";
import { useTheme } from "@/app/context/ThemeContext";

const SearchAndFilter = ({ setSearchTerm, setSelectedCategory }) => {
  const { darkMode } = useTheme();

  return (
    <div
      className={`flex flex-col md:flex-row gap-4 mb-6 ${
        darkMode ? "text-gray-200" : "text-gray-800"
      }`}
    >
      <div
        className={`${
          darkMode ? "bg-zinc-800 text-gray-300" : "bg-white"
        } w-full mr-4 p-4 rounded-lg shadow`}
      >
        <SearchBar setSearchTerm={setSearchTerm} />
      </div>
      <div
        className={`${
          darkMode ? "bg-zinc-800 text-gray-300" : "bg-white"
        } w-1/4 p-4 rounded-lg shadow`}
      >
        <CategoryFilter onSelectCategory={setSelectedCategory} />
      </div>
    </div>
  );
};

export default SearchAndFilter;
