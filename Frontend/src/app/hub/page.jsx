"use client";
import React, { useState, useEffect } from "react";
import { Navbar } from "../components/layouts/Navbar";
import { Footer } from "../components/layouts/Footer";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  IoCopyOutline,
  IoCheckmark,
  IoHeart,
  IoHeartOutline,
  IoBookmark,
  IoBookmarkOutline,
} from "react-icons/io5";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";

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

    if (searchTerm) {
      filtered = filtered.filter((snippet) =>
        snippet.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

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
    navigator.clipboard.writeText(text).then(() => {
      setCopiedSnippetId(snippetId);
      setTimeout(() => setCopiedSnippetId(null), 2000);
    });
  };

  const handleLike = (snippetId) => {
    // Implementation of handleLike function
  };

  const handleSave = (snippetId) => {
    // Implementation of handleSave function
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-gray-50">
        <Navbar />
      </header>

      <main className="container mx-auto px-4 py-8 flex-grow">
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
              <div className="grid grid-cols-1 gap-6">
                {[...Array(3)].map((_, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-md p-6"
                  >
                    {/* En-tête du snippet */}
                    <div className="flex justify-between items-center mb-2">
                      <div className="animate-pulse h-6 w-48 bg-gray-200 rounded"></div>
                      <div className="animate-pulse h-6 w-24 bg-gray-200 rounded-full"></div>
                    </div>

                    {/* Info utilisateur */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="animate-pulse w-8 h-8 bg-gray-200 rounded-full"></div>
                      <div className="animate-pulse h-4 w-32 bg-gray-200 rounded"></div>
                    </div>

                    {/* Corps du snippet */}
                    <div className="mt-4">
                      <div className="animate-pulse h-40 bg-gray-200 rounded"></div>
                    </div>

                    {/* Bouton copier */}
                    <div className="mt-4">
                      <div className="animate-pulse h-10 w-24 bg-gray-200 rounded-full"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {filteredSnippets.map((snippet) => (
                  <div
                    key={snippet.id}
                    className="bg-white rounded-lg shadow-md p-6 transition-transform transform hover:scale-[1.01] hover:shadow-lg"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-gray-800 font-semibold text-lg">
                        {snippet.title}
                      </h3>
                      <div className="flex items-center gap-2">
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

                    {/* Ajout des informations de l'utilisateur */}
                    <div className="flex items-center gap-2 mb-4 ">
                      <img
                        src={
                          snippet.user?.avatar ||
                          snippet.user?.googleAvatar ||
                          snippet.user?.githubAvatar ||
                          "/default-avatar.png"
                        }
                        alt={`Avatar de ${snippet.user?.username}`}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="text-sm text-gray-600">
                        {snippet.user?.username}
                      </span>
                      <span className="text-sm text-gray-400">•</span>
                      <span className="text-sm text-gray-500">
                        {new Date(snippet.createdAt).toLocaleDateString(
                          "fr-FR",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }
                        )}
                        {" à "}
                        {new Date(snippet.createdAt).toLocaleTimeString(
                          "fr-FR",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </span>
                    </div>

                    <div className="mt-4 relative">
                      <SyntaxHighlighter
                        language="javascript"
                        className="rounded-lg flex-grow overflow-auto"
                        style={vscDarkPlus}
                        customStyle={{
                          borderRadius: "0.5rem",
                          padding: "1rem",
                          fontSize: "0.9rem",
                          maxHeight: "12rem",
                          overflow: "auto",
                        }}
                      >
                        {snippet.description}
                      </SyntaxHighlighter>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <div className="flex gap-4">
                        <button
                          onClick={() => handleLike(snippet.id)}
                          className="flex items-center space-x-2 text-gray-500 hover:text-red-600 transition"
                        >
                          {snippet.isLiked ? (
                            <IoHeart className="text-xl text-red-600" />
                          ) : (
                            <IoHeartOutline className="text-xl" />
                          )}
                          <span>{snippet.likesCount}</span>
                        </button>
                        <button
                          onClick={() => handleSave(snippet.id)}
                          className="flex items-center space-x-2 text-gray-500 hover:text-yellow-600 transition"
                        >
                          {snippet.isSaved ? (
                            <IoBookmark className="text-xl text-yellow-600" />
                          ) : (
                            <IoBookmarkOutline className="text-xl" />
                          )}
                        </button>
                      </div>
                      <button
                        onClick={() =>
                          handleCopy(snippet.description, snippet.id)
                        }
                        className="flex items-center space-x-2 text-gray-500 hover:text-indigo-500 transition px-4 py-2 rounded-full border border-gray-200 hover:borderindigo-500"
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
