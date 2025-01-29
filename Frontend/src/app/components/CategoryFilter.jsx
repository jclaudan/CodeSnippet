import React, { useState } from "react";

const categories = [
  "JavaScript",
  "Typescript",
  "React",
  "Angular",
  "Vue",
  "Python",
  "NodeJS",
  "NestJS",
  "Swift",
  "C",
]; // Liste des catégories disponibles

const CategoryFilter = ({ onSelectCategory }) => {
  const [isOpen, setIsOpen] = useState(false); // État pour gérer l'ouverture de la liste déroulante
  const [selectedCategory, setSelectedCategory] = useState(""); // Catégorie sélectionnée

  // Fonction pour gérer la sélection d'une catégorie
  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    onSelectCategory(category); // Appeler le parent pour gérer la catégorie sélectionnée
    setIsOpen(false); // Fermer la liste après sélection
  };

  return (
    <div className="relative">
      {/* Zone d'affichage de la catégorie sélectionnée */}
      <div
        className="custom-select p-2 text-black border rounded-lg border-gray-300 bg-white cursor-pointer flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-gray-400">
          {selectedCategory || "Sélectionner une catégorie"}
        </span>
        <span className="ml-2">&#9662;</span> {/* Icône de flèche */}
      </div>

      {/* Liste déroulante personnalisée */}
      {isOpen && (
        <div className="absolute top-full z-10 left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
          <div
            className="p-2 cursor-pointer text-black hover:bg-gray-100"
            onClick={() => handleSelectCategory("")}
          >
            Tous
          </div>
          {categories.map((category) => (
            <div
              key={category}
              className="p-2 cursor-pointer text-black hover:bg-gray-100"
              onClick={() => handleSelectCategory(category)}
            >
              {category}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryFilter;
