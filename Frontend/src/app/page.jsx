"use client";
import React from "react";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();

  // Vérifier si l'utilisateur est authentifié
  const isAuthenticated = () => {
    return !!localStorage.getItem("token"); // Vérifie si le token est présent
  };

  // Rediriger si l'utilisateur n'est pas authentifié
  if (!isAuthenticated()) {
    router.push("/login");
    return null; // Ne pas rendre le contenu de la page
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <h1 className="text-4xl text-white">Bienvenue sur la page d'accueil !</h1>
    </div>
  );
};

export default HomePage;
