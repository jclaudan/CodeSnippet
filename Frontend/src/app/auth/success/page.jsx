"use client";
import React, { useEffect, Suspense } from "react";

function AuthSuccessContent() {
  useEffect(() => {
    const handleAuth = () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");
        console.log("Token reçu dans success:", token ? "Oui" : "Non");

        if (!token) {
          console.error("Token manquant dans success");
          window.location.replace("/login");
          return;
        }

        // Nettoyer le localStorage avant de stocker le nouveau token
        localStorage.clear();
        localStorage.setItem("token", token);
        console.log("Token stocké avec succès dans success");

        // Vérifier immédiatement que le token est bien stocké
        const storedToken = localStorage.getItem("token");
        if (storedToken !== token) {
          throw new Error("Échec du stockage du token");
        }

        // Redirection avec un petit délai pour assurer le stockage
        setTimeout(() => {
          window.location.replace("/");
        }, 500);
      } catch (error) {
        console.error("Erreur dans success:", error);
        window.location.replace("/login");
      }
    };

    // Exécuter immédiatement
    handleAuth();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold mb-6">Authentication successful !</h2>
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-200 border-t-indigo-600"></div>
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
            <h2 className="text-2xl font-bold mb-6">Loading...</h2>
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-200 border-t-indigo-600"></div>
          </div>
        </div>
      }
    >
      <AuthSuccessContent />
    </Suspense>
  );
}
