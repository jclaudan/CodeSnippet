import React, { useState } from "react";
import { toast } from "react-toastify";
import MonacoEditor from "@monaco-editor/react";
import { IoExpand, IoContract } from "react-icons/io5";

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
];

const SnippetForm = ({ setSnippets, setMessage, closeModal, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleSubmit = async () => {
    if (title && description) {
      try {
        const method = initialData ? "PUT" : "POST";
        const url = initialData
          ? `${process.env.NEXT_PUBLIC_API_URL}/snippets/${initialData.id}`
          : `${process.env.NEXT_PUBLIC_API_URL}/snippets`;

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
        setMessage("Une erreur s'est produite lors de la soumission du snippet.");
        toast.error("Une erreur s'est produite lors de la soumission du snippet.", {
          style: { backgroundColor: "#F44336", color: "white" },
        });
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
    <div className={`${isFullscreen ? 'fixed inset-0 z-50 bg-white' : ''}`}>
      <div className="p-3">
        <div className="flex justify-between items-center mb-3 sticky top-0 bg-white z-10">
          <h2 className="text-black font-bold text-base">
            {initialData ? "Modifier un Snippet" : "Ajouter un Snippet"}
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="text-black p-1 rounded hover:bg-gray-100"
              title={isFullscreen ? "Réduire" : "Agrandir"}
            >
              {isFullscreen ? <IoContract size={18} /> : <IoExpand size={18} />}
            </button>
            <button
              onClick={closeModal}
              className="text-black text-xl px-1"
              title="Fermer"
            >
              &times;
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <label htmlFor="title" className="text-black text-xs font-semibold block mb-1">
              Titre
            </label>
            <input
              id="title"
              type="text"
              placeholder="(ex: for loop)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-1.5 border border-gray-300 rounded bg-white text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          <div>
            <label htmlFor="category" className="text-black text-xs font-semibold block mb-1">
              Language
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-1.5 border border-gray-300 rounded bg-white text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-black"
              required
            >
              <option value="">Sélectionnez une catégorie</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="description" className="text-black text-xs font-semibold block mb-1">
              Code
            </label>
            <div className="relative" style={{ 
              height: isFullscreen 
                ? 'calc(100vh - 220px)' 
                : '280px'
            }}>
              <MonacoEditor
                height="100%"
                language={getLanguage()}
                theme="vs-dark"
                value={description}
                onChange={(value) => setDescription(value)}
                options={{
                  selectOnLineNumbers: true,
                  wordWrap: "on",
                  minimap: { enabled: false },
                  fontSize: 12,
                  lineHeight: 18,
                  automaticLayout: true,
                }}
                className="rounded overflow-hidden"
              />
            </div>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full mt-3 bg-black text-white p-1.5 rounded text-xs hover:bg-gray-900 transition duration-200 focus:outline-none focus:ring-1 focus:ring-black"
        >
          {initialData ? "Modifier Snippet" : "Ajouter Snippet"}
        </button>
      </div>
    </div>
  );
};

export default SnippetForm;
