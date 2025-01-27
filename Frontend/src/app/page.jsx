"use client";
import React, { useState, useEffect } from "react";
import SnippetForm from "./components/SnippetForm";
import SnippetList from "./components/SnippetList";
import { Footer } from "./components/layouts/Footer";
import { Navbar } from "./components/layouts/Navbar";
import SearchBar from "./components/SearchBar";

const HomePage = () => {
  const [snippets, setSnippets] = useState([]);
  const [filteredSnippets, setFilteredSnippets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Récupérer les snippets de l'utilisateur lors du chargement de la page
  useEffect(() => {
    const fetchSnippets = async () => {
      const userId = localStorage.getItem("userId");
      const response = await fetch(
        `http://localhost:3000/snippets/user/${userId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSnippets(data);
      } else {
        console.error("Erreur lors de la récupération des snippets");
      }
    };

    fetchSnippets();
  }, []);

  // Mettre à jour les snippets filtrés lorsque le terme de recherche change
  useEffect(() => {
    setFilteredSnippets(
      snippets.filter((snippet) =>
        snippet.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, snippets]);

  return (
    <div
      style={{ position: "relative", minHeight: "100vh" }}
      className="flex flex-col min-h-screen bg-gray-100 text-gray-200 "
    >
      <header className="bg-gray-50 p-4 ">
        <Navbar />
      </header>
      <main className="flex flex-col flex-grow  p-6 max-w-[1500px] mx-auto">
        <SearchBar setSearchTerm={setSearchTerm} />
        <SnippetList snippets={filteredSnippets} />
      </main>
      <Footer />

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={() => {
            setIsModalOpen(false);
          }}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg relative"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <SnippetForm
              setSnippets={setSnippets}
              setMessage={setMessage}
              closeModal={() => setIsModalOpen(false)}
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
    </div>
  );
};

export default HomePage;
