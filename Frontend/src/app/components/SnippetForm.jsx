import React, { useState } from "react";
import { toast } from "react-toastify";
import MonacoEditor from "@monaco-editor/react";

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
  "Java",
  "C",
]; // Liste des catégories

const SnippetForm = ({ setSnippets, setMessage, closeModal, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [category, setCategory] = useState(initialData?.category || "");

  const handleSubmit = async () => {
    if (title && description) {
      try {
        const method = initialData ? "PUT" : "POST"; // Utilise PUT pour la mise à jour, POST pour la création
        const url = initialData
          ? `https://codesnippet-cy4q.onrender.com/snippets/${initialData.id}`
          : "https://codesnippet-cy4q.onrender.com/snippets";

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
            setSnippets((prevSnippets) =>
              prevSnippets.map((snippet) =>
                snippet.id === initialData.id ? updatedSnippet : snippet
              )
            );
            toast.success("Snippet modifié avec succès !", {
              style: { backgroundColor: "#BB86FC", color: "white" },
            });
          } else {
            setSnippets((prevSnippets) => [...prevSnippets, updatedSnippet]);
            toast.success("Snippet ajouté avec succès !", {
              style: { backgroundColor: "#81C784", color: "white" },
            });
          }
          closeModal();
        } else {
          setMessage("Erreur lors de la soumission du snippet.");
          toast.error("Erreur lors de la soumission du snippet.", {
            style: { backgroundColor: "#F44336", color: "white" },
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
            style: { backgroundColor: "#F44336", color: "white" },
          }
        );
      }
    } else {
      setMessage("Veuillez remplir tous les champs.");
      toast.error("Veuillez remplir tous les champs.", {
        style: { backgroundColor: "#FFEB3B", color: "black" },
      });
    }
  };

  const getLanguage = () => {
    switch (category) {
      case "JavaScript":
      case "Typescript":
      case "NodeJS":
      case "NestJS":
        return "javascript";
      case "React":
        return "jsx";
      case "Python":
        return "python";
      case "Swift":
        return "swift";
      case "Java":
      case "C":
        return "java";
      default:
        return "javascript";
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-black font-bold text-xl">
          {initialData ? "Modifier un Snippet" : "Ajouter un Snippet"}
        </h2>
        <button
          onClick={closeModal}
          style={{ zIndex: 10, backgroundColor: "white" }}
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
        Language
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

      {/* Monaco Editor */}
      <MonacoEditor
        height="200px"
        language={getLanguage()}
        theme="vs-dark" // ou "vs" pour un thème clair
        value={description}
        onChange={(value) => setDescription(value)}
        options={{
          selectOnLineNumbers: true,
          wordWrap: "on",
          minimap: { enabled: false },
        }}
        className="w-full py-4 rounded-full"
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
