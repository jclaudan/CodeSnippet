"use client";
import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AuthSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    console.log("Received token:", token); // Debug log

    if (!token) {
      console.error("No token found in URL");
      router.push("/login?error=no_token");
      return;
    }

    try {
      // Stockage du token
      localStorage.setItem("token", token);
      console.log("Token stored successfully");

      // Redirection vers la page d'accueil
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
