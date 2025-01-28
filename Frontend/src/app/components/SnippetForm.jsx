import React, { useState } from "react";
import { toast } from "react-toastify";

const categories = ["JavaScript", "Python", "React", "Node.js", "C"]; // Liste des catégories

const SnippetForm = ({ setSnippets, setMessage, closeModal, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [category, setCategory] = useState(initialData?.category || "");

  // Fonction pour ajouter ou mettre à jour un snippet
  const handleSubmit = async () => {
    if (title && description) {
      try {
        const method = initialData ? "PUT" : "POST"; // Utilise PUT pour la mise à jour, POST pour la création
        const url = initialData
          ? `https://codesnippet-gjn2.onrender.com/snippets/${initialData.id}`
          : "https://codesnippet-gjn2.onrender.com/snippets";

        const response = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ title, description, category }),
        });

        if (response.ok) {
          const updatedSnippet = await response.json();
          if (initialData) {
            // Mise à jour du snippet existant
            setSnippets((prevSnippets) =>
              prevSnippets.map((snippet) =>
                snippet.id === initialData.id ? updatedSnippet : snippet
              )
            );
            toast.success("Snippet modifié avec succès !", {
              style: {
                backgroundColor: "#BB86FC",
                color: "white",
              },
            });
          } else {
            // Ajout d'un nouveau snippet
            setSnippets((prevSnippets) => [...prevSnippets, updatedSnippet]);
            toast.success("Snippet ajouté avec succès !", {
              style: {
                backgroundColor: "#81C784", // Vert moyen
                color: "white",
              },
            });
          }
          closeModal();
        } else {
          setMessage("Erreur lors de la soumission du snippet.");
          toast.error("Erreur lors de la soumission du snippet.", {
            style: {
              backgroundColor: "#F44336", // Rouge
              color: "white",
            },
          });
        }
      } catch (error) {
        console.error("Erreur :", error);
        setMessage(
          "Une erreur s'est produite lors de la soumission du snippet."
        );
        toast.error(
          "Une erreur s'est produite lors de la soumission du snippet.",
          {
            style: {
              backgroundColor: "#F44336", // Rouge
              color: "white",
            },
          }
        );
      }
    } else {
      setMessage("Veuillez remplir tous les champs.");
      toast.error("Veuillez remplir tous les champs.", {
        style: {
          backgroundColor: "#FFEB3B", // Jaune pour l'avertissement
          color: "black",
        },
      });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4 ">
        <h2 className="text-black font-bold text-xl">
          {initialData ? "Modifier un Snippet" : "Ajouter un Snippet"}
        </h2>
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
        placeholder="(ex: for loop)"
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
        onClick={handleSubmit}
        className="w-full bg-black text-white p-2 rounded hover:bg-gray-900 transition duration-200 focus:outline-none focus:ring-2 focus:ring-black"
      >
        {initialData ? "Modifier Snippet" : "Ajouter Snippet"}
      </button>
    </div>
  );
};

export default SnippetForm;
