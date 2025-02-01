import CategoryFilter from "./CategoryFilter";
import SearchBar from "./SearchBar";

const SearchAndFilter = ({ setSearchTerm, setSelectedCategory }) => {
  return (
    <div className="flex items-center mb-6">
      <div className="w-full mr-4 bg-white p-4 rounded-lg shadow">
        <SearchBar setSearchTerm={setSearchTerm} />
      </div>
      <div className="w-1/4 bg-white p-4 rounded-lg shadow">
        <CategoryFilter onSelectCategory={setSelectedCategory} />
      </div>
    </div>
  );
};

export default SearchAndFilter;
