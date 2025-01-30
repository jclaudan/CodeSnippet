"use client";
import React, { useEffect, Suspense } from "react";

function AuthSuccessContent() {
  useEffect(() => {
    const handleAuth = () => {
      try {
        // 1. Récupérer le token de l'URL
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");

        console.log("Token reçu:", token ? "Oui" : "Non");

        if (!token) {
          console.error("Token manquant");
          window.location.href = "/login";
          return;
        }

        // 2. Stocker le token
        localStorage.setItem("token", token);

        // 3. Vérifier le stockage
        const storedToken = localStorage.getItem("token");
        if (!storedToken) {
          throw new Error("Échec du stockage du token");
        }

        console.log("Token stocké avec succès");

        // 4. Redirection forcée
        window.location.href = "/";
      } catch (error) {
        console.error("Erreur d'authentification:", error);
        window.location.href = "/login";
      }
    };

    // Exécuter immédiatement
    handleAuth();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold mb-6">Authentification réussie !</h2>
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-200 border-t-blue-500"></div>
          <p className="text-gray-600">Redirection en cours...</p>
        </div>
      </div>
    </div>
  );
}

export default function AuthSuccess() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-6">Chargement...</h2>
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-200 border-t-blue-500"></div>
          </div>
        </div>
      }
    >
      <AuthSuccessContent />
    </Suspense>
  );
}
