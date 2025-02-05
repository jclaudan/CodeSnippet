"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "./context/ThemeContext";

import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";
import SnippetList from "./components/snippets/SnippetList";
import SnippetForm from "./components/snippets/SnippetForm";

import SearchAndFilter from "./components/ui/SearchAndFilter";
import SnippetModal from "./components/snippets/SnippetModal";
import AddSnippetButton from "./components/ui/AddSnippetButton";
import LoadingHome from "./components/ui/Loading/LoadingHome";

const HomePage = () => {
  const { darkMode } = useTheme();
  const [snippets, setSnippets] = useState([]);
  const [filteredSnippets, setFilteredSnippets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSnippet, setEditingSnippet] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

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
        const snippetsResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/snippets`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

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
      className={`flex flex-col min-h-screen ${
        darkMode ? "bg-zinc-900 text-gray-200" : "bg-gray-100 text-gray-800"
      }`}
    >
      <header>
        <Navbar />
      </header>

      <main className="flex flex-col flex-grow p-6 max-w-[1500px] mx-auto w-full">
        <div className="mb-6">
          <h1
            className={`text-2xl font-bold ${
              darkMode ? "text-gray-100" : "text-gray-800"
            }`}
          >
            My Snippets
          </h1>
        </div>

        <SearchAndFilter
          setSearchTerm={setSearchTerm}
          setSelectedCategory={setSelectedCategory}
        />

        {isLoading ? (
          <LoadingHome />
        ) : (
          <SnippetList
            snippets={filteredSnippets}
            onEdit={handleEditSnippet}
            onDelete={handleDeleteSnippet}
          />
        )}
      </main>

      <Footer />

      <SnippetModal isOpen={isModalOpen} onClose={closeModal}>
        <SnippetForm
          setSnippets={setSnippets}
          setMessage={setMessage}
          closeModal={closeModal}
          initialData={editingSnippet}
        />
      </SnippetModal>

      <AddSnippetButton onClick={() => setIsModalOpen(true)} />

      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar
        theme={darkMode ? "dark" : "light"}
      />
    </div>
  );
};

export default HomePage;
