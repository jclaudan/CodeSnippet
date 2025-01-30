"use client";
import React, { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// Composant qui contient la logique d'authentification
function AuthSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    console.log("Received token:", token);

    if (!token) {
      console.error("No token found in URL");
      router.push("/login?error=no_token");
      return;
    }

    try {
      localStorage.setItem("token", token);
      console.log("Token stored successfully");
      router.push("/");
    } catch (error) {
      console.error("Error handling token:", error);
      router.push("/login?error=token_storage_failed");
    }
  }, [router, searchParams]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Authentification réussie</h2>
        <p>Redirection en cours...</p>
      </div>
    </div>
  );
}

// Composant principal avec Suspense
export default function AuthSuccess() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Chargement...</h2>
            <p>Veuillez patienter...</p>
          </div>
        </div>
      }
    >
      <AuthSuccessContent />
    </Suspense>
  );
}
