"use client";
import React, { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function AuthSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    console.log("Page success - Début du processus");

    if (!token) {
      console.error("Page success - Token manquant");
      window.location.replace("/login");
      return;
    }

    try {
      // Stockage synchrone
      window.localStorage.setItem("token", token);

      // Vérification immédiate
      const storedToken = window.localStorage.getItem("token");
      if (storedToken !== token) {
        throw new Error("Échec du stockage du token");
      }

      console.log("Page success - Token stocké avec succès");

      // Redirection directe
      window.location.replace("/");
    } catch (error) {
      console.error("Page success - Erreur:", error);
      window.location.replace("/login");
    }
  }, []); // Dépendances vides pour éviter les re-renders

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4">Authentification réussie !</h2>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-4">Redirection en cours...</p>
      </div>
    </div>
  );
}

// Composant principal avec Suspense
export default function AuthSuccess() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-bold mb-4">Chargement...</h2>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          </div>
        </div>
      }
    >
      <AuthSuccessContent />
    </Suspense>
  );
}
