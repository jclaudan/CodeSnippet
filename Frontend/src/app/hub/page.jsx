"use client";
import React, { useState, useEffect } from "react";
import { Navbar } from "../components/layouts/Navbar";
import { Footer } from "../components/layouts/Footer";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  IoCopyOutline,
  IoCheckmark,
  IoThumbsUpOutline,
  IoPersonCircleOutline,
} from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import Image from "next/image";

const HubPage = () => {
  const categoryStyles = {
    JavaScript: "bg-yellow-200 text-yellow-800",
    Typescript: "bg-blue-300 text-blue-900",
    React: "bg-purple-200 text-purple-800",
    Angular: "bg-red-200 text-red-800",
    Vue: "bg-green-200 text-green-800",
    Python: "bg-blue-200 text-blue-800",
    NodeJS: "bg-green-300 text-green-900",
    Swift: "bg-orange-200 text-orange-800",
    Java: "bg-red-200 text-red-800",
    C: "bg-gray-300 text-gray-900",
  };
  const [publicSnippets, setPublicSnippets] = useState([]);
  const [filteredSnippets, setFilteredSnippets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [copiedSnippetId, setCopiedSnippetId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetchPublicSnippets();
  }, []);

  useEffect(() => {
    let filtered = publicSnippets;

    // Filtre par recherche
    if (searchTerm) {
      filtered = filtered.filter((snippet) =>
        snippet.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtre par catégorie
    if (selectedCategory) {
      filtered = filtered.filter(
        (snippet) => snippet.category === selectedCategory
      );
    }

    setFilteredSnippets(filtered);
  }, [searchTerm, selectedCategory, publicSnippets]);

  const fetchPublicSnippets = async () => {
    try {
      const response = await fetch("http://localhost:3000/hub/public");
      if (response.ok) {
        const data = await response.json();
        console.log("Données reçues:", data);
        setPublicSnippets(data);
      } else {
        console.error("Erreur de réponse:", response.status);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text, snippetId) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopiedSnippetId(snippetId);
        toast.success("Code copié !");
        setTimeout(() => setCopiedSnippetId(null), 2000);
      })
      .catch((err) => toast.error("Erreur lors de la copie"));
  };

  const handleLike = async (snippetId) => {
    try {
      const token = localStorage.getItem("token");
      console.log("Tentative de like pour le snippet:", snippetId);

      const response = await fetch(
        `http://localhost:3000/hub/${snippetId}/like`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const updatedSnippet = await response.json();
        console.log("Réponse du serveur:", updatedSnippet);

        setPublicSnippets((prevSnippets) => {
          const newSnippets = prevSnippets.map((snippet) =>
            snippet.id === snippetId
              ? {
                  ...snippet,
                  likes: updatedSnippet.likes,
                  isLiked: updatedSnippet.isLiked,
                }
              : snippet
          );
          console.log("Nouveaux snippets:", newSnippets);
          return newSnippets;
        });

        toast.success(
          updatedSnippet.isLiked ? "Snippet liké !" : "Like retiré !",
          {
            style: {
              backgroundColor: updatedSnippet.isLiked ? "#81C784" : "#FF9800",
              color: "white",
            },
          }
        );
      }
    } catch (error) {
      console.error("Erreur lors du like:", error);
      toast.error("Erreur lors de la modification du like", {
        style: { backgroundColor: "#F44336", color: "white" },
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gray-50">
        <Navbar />
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar gauche */}
          <div className="hidden lg:block w-64 space-y-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="font-bold text-lg text-gray-800 mb-4">
                Catégories
              </h2>
              <CategoryFilter onSelectCategory={setSelectedCategory} />
            </div>
          </div>

          {/* Flux principal */}
          <div className="flex-1 max-w-3xl">
            {/* Barre de recherche */}
            <div className="bg-white p-4 rounded-lg shadow mb-6">
              <SearchBar setSearchTerm={setSearchTerm} />
            </div>

            {/* Liste des snippets */}
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSnippets.map((snippet) => (
                  <div
                    key={snippet.id}
                    className="bg-white rounded-lg shadow-md p-6"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-gray-800 font-semibold text-lg">
                        {snippet.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        {snippet.isPublic && (
                          <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                            Public
                          </span>
                        )}
                        {snippet.category && (
                          <span
                            className={`px-2 py-1 rounded-full text-sm font-semibold ${
                              categoryStyles[snippet.category]
                            }`}
                          >
                            {snippet.category}
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">
                      {new Date(snippet.createdAt).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                    <div className="mt-4">
                      <SyntaxHighlighter
                        language="javascript"
                        style={vscDarkPlus}
                        customStyle={{
                          borderRadius: "0.5rem",
                          padding: "1rem",
                          fontSize: "0.9rem",
                          maxHeight: "400px",
                        }}
                      >
                        {snippet.description}
                      </SyntaxHighlighter>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <button
                        onClick={() =>
                          handleCopy(snippet.description, snippet.id)
                        }
                        className="flex items-center space-x-2 text-gray-500 hover:text-blue-600 transition px-4 py-2 rounded-full border border-gray-200 hover:border-blue-600"
                      >
                        {copiedSnippetId === snippet.id ? (
                          <>
                            <IoCheckmark className="text-xl text-green-600" />
                            <span>Copié</span>
                          </>
                        ) : (
                          <>
                            <IoCopyOutline className="text-xl" />
                            <span>Copier</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!isLoading && filteredSnippets.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <p className="text-gray-600 text-lg">Aucun snippet trouvé</p>
              </div>
            )}
          </div>

          {/* Sidebar droite */}
          <div className="hidden xl:block w-72">
            <div className="bg-white p-4 rounded-lg shadow sticky top-4">
              <h2 className="font-bold text-lg text-gray-800 mb-4">
                Tendances
              </h2>
              <div className="space-y-3">
                <p className="text-sm text-gray-600">
                  Les catégories populaires :
                </p>
                {Object.keys(categoryStyles)
                  .slice(0, 5)
                  .map((cat) => (
                    <div
                      key={cat}
                      className="flex items-center justify-between"
                    >
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${categoryStyles[cat]}`}
                      >
                        {cat}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HubPage;
