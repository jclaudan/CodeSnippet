import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "@/app/context/ThemeContext";

const categories = [
  // Web Frontend
  {
    group: "Frontend",
    items: [
      "JavaScript",
      "TypeScript",
      "React",
      "Angular",
      "Vue",
      "Svelte",
      "NextJS",
    ],
  },

  // Backend
  {
    group: "Backend",
    items: [
      "NodeJS",
      "Python",
      "Java",
      "PHP",
      "Ruby",
      "Go",
      "Rust",
      "Express",
      "NestJS",
      "Django",
      "Laravel",
    ],
  },

  // Mobile & Desktop
  {
    group: "Mobile & Desktop",
    items: ["Swift", "Kotlin", "Flutter", "ReactNative", "C", "C++", "C#"],
  },

  // Base de données & Autres
  {
    group: "Autres",
    items: ["SQL", "MongoDB", "PostgreSQL", "Redis", "JSON", "Regex"],
  },
];

const CategoryFilter = ({ onSelectCategory }) => {
  const { darkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    onSelectCategory(category);
    setIsOpen(false);
    setSearchTerm("");
  };

  const filteredCategories = categories
    .map((group) => ({
      group: group.group,
      items: group.items.filter((item) =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`${
          darkMode
            ? "bg-zinc-800 border-zinc-700 text-gray-300"
            : "bg-white border-gray-200"
        } w-full custom-select p-2 border rounded-lg cursor-pointer flex justify-between items-center`}
      >
        <span className={`${darkMode ? "text-gray-400" : "text-gray-800"}`}>
          {selectedCategory || "All categories"}
        </span>
        <span className="ml-2">▼</span>
      </div>

      {isOpen && (
        <div
          className={`absolute z-50 w-full mt-1 rounded-lg shadow-lg ${
            darkMode
              ? "bg-zinc-800 border-zinc-700"
              : "bg-white border-gray-200"
          } border`}
        >
          <div className="p-2">
            <input
              type="text"
              placeholder="Search a category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full p-2 rounded border outline-none ${
                darkMode
                  ? "bg-zinc-700 text-gray-200 rder-zinc-600 focus:ring-1 focus:ring-zinc-700"
                  : "bg-gray-50 border-gray-300 focus:ring-1 focus:ring-gray-400"
              }`}
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          <div className="max-h-60 overflow-y-auto">
            <div
              className={`px-4 py-2 cursor-pointer ${
                darkMode
                  ? "hover:bg-zinc-700 text-gray-300"
                  : "hover:bg-gray-100"
              } ${
                !selectedCategory
                  ? darkMode
                    ? "bg-zinc-600"
                    : "bg-blue-50"
                  : ""
              }`}
              onClick={() => handleSelectCategory("")}
            >
              Toutes les catégories
            </div>

            {filteredCategories.map((group) => (
              <div key={group.group}>
                <div
                  className={`px-3 py-1 font-semibold ${
                    darkMode ? "bg-zinc-700 text-gray-300" : "bg-gray-100"
                  }`}
                >
                  {group.group}
                </div>
                {group.items.map((item) => (
                  <div
                    key={item}
                    onClick={() => handleSelectCategory(item)}
                    className={`px-4 py-2 cursor-pointer ${
                      darkMode
                        ? "hover:bg-zinc-700 text-gray-300"
                        : "hover:bg-gray-100"
                    } ${
                      selectedCategory === item
                        ? darkMode
                          ? "bg-zinc-600"
                          : "bg-blue-50"
                        : ""
                    }`}
                  >
                    {item}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryFilter;
