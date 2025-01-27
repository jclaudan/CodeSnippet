"use client";
import React, { useState, useEffect } from "react";

const HomePage = () => {
  const [snippets, setSnippets] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

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

  // Fonction pour ajouter un nouveau snippet
  const handleAddSnippet = async () => {
    if (title && description) {
      const response = await fetch("http://localhost:3000/snippets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ title, description }),
      });

      if (response.ok) {
        const newSnippet = await response.json();
        setSnippets([...snippets, newSnippet]);
        setTitle("");
        setDescription("");
        setMessage("Snippet ajouté avec succès !");
      } else {
        setMessage("Erreur lors de l'ajout du snippet.");
      }
    } else {
      setMessage("Veuillez remplir tous les champs.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
      <h1 className="text-4xl text-white mb-6">Outil de Snippet de Code</h1>
      {message && <p className="text-green-500 mb-4">{message}</p>}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl text-white mb-4">Ajouter un Snippet</h2>
        <input
          type="text"
          placeholder="Langage (ex: JavaScript)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-600 rounded mb-4 bg-gray-700 text-white placeholder-gray-400"
        />
        <textarea
          placeholder="Votre code ici..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border border-gray-600 rounded mb-4 bg-gray-700 text-white placeholder-gray-400"
          rows="4"
        />
        <button
          onClick={handleAddSnippet}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-500 transition duration-200"
        >
          Ajouter Snippet
        </button>
      </div>

      <div className="mt-8 w-full max-w-md">
        <h2 className="text-2xl text-white mb-4">Mes Snippets</h2>
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          {snippets.length === 0 ? (
            <p className="text-gray-400">Aucun snippet ajouté.</p>
          ) : (
            snippets.map((snippet) => (
              <div
                key={snippet.id}
                className="border-b border-gray-600 mb-2 pb-2"
              >
                <h3 className="text-white">{snippet.title}</h3>
                <pre className="text-gray-300">{snippet.description}</pre>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
