import React, { useState } from "react";

const categories = ["JavaScript", "Python", "React", "Node.js", "C"]; // Liste des catégories

const SnippetForm = ({ setSnippets, setMessage, closeModal }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  // Fonction pour ajouter un nouveau snippet
  const handleAddSnippet = async () => {
    if (title && description) {
      try {
        const response = await fetch("http://localhost:3000/snippets", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ title, description, category }), // Ajoute la catégorie ici
        });

        if (response.ok) {
          const newSnippet = await response.json();
          setSnippets((prevSnippets) => [...prevSnippets, newSnippet]);
          setTitle("");
          setDescription("");
          setCategory(""); // Réinitialise la catégorie
          setMessage("Snippet ajouté avec succès !");
          closeModal();
        } else {
          setMessage("Erreur lors de l'ajout du snippet.");
        }
      } catch (error) {
        console.error("Erreur :", error);
        setMessage("Une erreur s'est produite lors de l'ajout du snippet.");
      }
    } else {
      setMessage("Veuillez remplir tous les champs.");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-black font-bold text-xl">Ajouter un Snippet</h2>
        <button
          onClick={closeModal}
          style={{
            zIndex: 10,
            backgroundColor: "white",
          }}
          className="absolute top-4 right-4 text-black text-xl"
        >
          &times;
        </button>
      </div>
      <label htmlFor="title" className="text-black text-md font-semibold">
        Titre
      </label>
      <input
        id="title"
        type="text"
        placeholder="(ex: Formulaire)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4 bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
      />
      <label htmlFor="category" className="text-black text-md font-semibold">
        Catégorie
      </label>
      <select
        id="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-black"
        required
      >
        <option value="">Sélectionnez une catégorie</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <label htmlFor="description" className="text-black text-md font-semibold">
        Code
      </label>
      <textarea
        id="description"
        placeholder="Votre code ici..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4 bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
        rows="4"
      />

      <button
        onClick={handleAddSnippet}
        className="w-full bg-black text-white p-2 rounded hover:bg-gray-900 transition duration-200 focus:outline-none focus:ring-2 focus:ring-black"
      >
        Ajouter Snippet
      </button>
    </div>
  );
};

export default SnippetForm;
