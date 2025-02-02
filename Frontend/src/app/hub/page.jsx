"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import SearchBar from "../components/ui/SearchBar";
import CategoryFilter from "../components/ui/CategoryFilter";
import SnippetCard from "../components/hub/SnippetCard";
import LoadingHub from "../components/ui/Loading/LoadingHub";
import TrendingSidebar from "../components/hub/TrendingSidebar";

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
    if (!publicSnippets) return;

    let filtered = [...publicSnippets];

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
          <div className="hidden lg:block w-64 space-y-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="font-bold text-lg text-gray-800 mb-4">
                Catégories
              </h2>
              <CategoryFilter onSelectCategory={setSelectedCategory} />
            </div>
          </div>

          <div className="flex-1 max-w-3xl">
            <div className="bg-white p-4 rounded-lg shadow mb-6">
              <SearchBar setSearchTerm={setSearchTerm} />
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 gap-6">
                {[...Array(3)].map((_, index) => (
                  <LoadingHub key={index} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {filteredSnippets && filteredSnippets.length > 0 ? (
                  filteredSnippets.map((snippet) => (
                    <SnippetCard
                      key={snippet.id}
                      snippet={snippet}
                      categoryStyles={categoryStyles}
                      copiedSnippetId={copiedSnippetId}
                      onCopy={handleCopy}
                      onLike={handleLike}
                      onSave={handleSave}
                    />
                  ))
                ) : (
                  <div className="text-center py-12 bg-white rounded-lg shadow">
                    <p className="text-gray-600 text-lg">
                      Aucun snippet trouvé
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="hidden xl:block w-72">
            <TrendingSidebar categoryStyles={categoryStyles} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HubPage;
