"use client";
import React, { useState, useEffect } from "react";
import SnippetForm from "./components/SnippetForm";
import SnippetList from "./components/SnippetList";
import { Footer } from "./components/layouts/Footer";
import { Navbar } from "./components/layouts/Navbar";
import SearchBar from "./components/SearchBar";
import CategoryFilter from "./components/CategoryFilter"; // Importez le composant
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomePage = () => {
  const [snippets, setSnippets] = useState([]);
  const [filteredSnippets, setFilteredSnippets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(""); // État pour la catégorie sélectionnée
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSnippet, setEditingSnippet] = useState(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  // Récupérer les snippets de l'utilisateur
  useEffect(() => {
    const checkAuthAndFetchSnippets = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Token présent:", !!token);

        if (!token) {
          console.log("Pas de token, redirection vers login");
          router.push("/login");
          return;
        }

        // Charger directement les snippets avec le token
        const snippetsResponse = await fetch("http://localhost:3000/snippets", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!snippetsResponse.ok) {
          // Si la requête échoue à cause du token
          if (snippetsResponse.status === 401) {
            console.log("Token invalide ou expiré");
            localStorage.removeItem("token");
            router.push("/login");
            return;
          }
          throw new Error("Erreur lors du chargement des snippets");
        }

        const data = await snippetsResponse.json();
        setSnippets(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Erreur:", error);
        setIsLoading(false);
      }
    };

    checkAuthAndFetchSnippets();
  }, []);

  // Filtrer les snippets par recherche et par catégorie
  useEffect(() => {
    let filtered = snippets;

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
  }, [searchTerm, selectedCategory, snippets]);

  const handleEditSnippet = (snippet) => {
    setEditingSnippet(snippet);
    setIsModalOpen(true);
  };

  const handleDeleteSnippet = (snippetId) => {
    setSnippets((prevSnippets) =>
      prevSnippets.filter((snippet) => snippet.id !== snippetId)
    );
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingSnippet(null);
  };

  return (
    <div
      style={{ position: "relative", minHeight: "100vh" }}
      className="flex flex-col min-h-screen bg-gray-100 text-gray-200"
    >
      <header className="bg-gray-50">
        <Navbar />
      </header>
      <main className="flex flex-col flex-grow p-6 max-w-[1500px] mx-auto w-full">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Mes snippets</h1>
        </div>
        <div className="flex items-center mb-6">
          <div className="w-full pr-4">
            <SearchBar setSearchTerm={setSearchTerm} />
          </div>
          <div className="w-1/4">
            <CategoryFilter onSelectCategory={setSelectedCategory} />
          </div>
        </div>

        {/* Ajoutez le filtre de catégorie */}
        <SnippetList
          snippets={filteredSnippets}
          onEdit={handleEditSnippet}
          onDelete={handleDeleteSnippet}
        />
      </main>

      <Footer />

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={closeModal}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg max-w-xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <SnippetForm
              setSnippets={setSnippets}
              setMessage={setMessage}
              closeModal={closeModal}
              initialData={editingSnippet}
            />
          </div>
        </div>
      )}

      <button
        className="rounded-full bg-black h-20 w-20 flex items-center justify-center text-white fixed bottom-10 right-10 transition-transform duration-100 ease-in-out hover:scale-110"
        onClick={() => setIsModalOpen(true)}
      >
        +
      </button>
      <ToastContainer position="bottom-left" autoClose={5000} hideProgressBar />
    </div>
  );
};

export default HomePage;
