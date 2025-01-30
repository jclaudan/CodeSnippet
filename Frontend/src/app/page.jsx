"use client";
import React, { useState, useEffect } from "react";
import SnippetForm from "./components/SnippetForm";
import SnippetList from "./components/SnippetList";
import { Footer } from "./components/layouts/Footer";
import { Navbar } from "./components/layouts/Navbar";
import SearchBar from "./components/SearchBar";
import CategoryFilter from "./components/CategoryFilter";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomePage = () => {
  const router = useRouter();
  const [snippets, setSnippets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

        // Vérifier la validité du token
        const verifyResponse = await fetch(
          "https://codesnippet-cy4q.onrender.com/auth/verify",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!verifyResponse.ok) {
          console.log("Token invalide, nettoyage et redirection");
          localStorage.removeItem("token");
          router.push("/login");
          return;
        }

        // Si le token est valide, charger les snippets
        const snippetsResponse = await fetch(
          "https://codesnippet-cy4q.onrender.com/snippets",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (snippetsResponse.ok) {
          const data = await snippetsResponse.json();
          setSnippets(data);
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Erreur de vérification:", error);
        setIsLoading(false);
      }
    };

    checkAuthAndFetchSnippets();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <SearchBar />
        <CategoryFilter />
        <SnippetForm setSnippets={setSnippets} />
        <SnippetList snippets={snippets} setSnippets={setSnippets} />
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default HomePage;
