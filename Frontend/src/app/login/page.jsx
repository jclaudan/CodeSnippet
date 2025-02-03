"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { Syne } from "next/font/google";

const syne = Syne({
  subsets: ["latin"],
  display: "swap",
  weight: ["700"],
});

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/signin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur lors de la connexion");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
      setSuccessMessage("Connexion réussie ! Bienvenue !");
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  };

  const handleGithubLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/github`;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex items-center justify-center py-12 flex-grow">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-start justify-center gap-20">
          <div className="md:w-1/2 max-w-lg self-center">
            <h1
              className={`text-4xl font-bold mb-4 text-gray-800 ${syne.className} relative`}
            >
              CodeSnippet
              <span
                className="absolute -bottom-1 left-0 w-32 h-1 bg-indigo-500"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 90% 100%, 10% 100%)",
                  transform: "skewX(-15deg)",
                }}
              ></span>
            </h1>
            <p className="text-gray-600 text-base mb-6">
              Partagez vos snippets, découvrez ceux des autres et enrichissez
              votre bibliothèque de code avec notre communauté active.
            </p>

            <div className="space-y-4">
              <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="font-semibold text-gray-800 mb-1 text-sm">
                  🌟 Hub communautaire
                </h3>
                <p className="text-gray-600 text-sm">
                  Explorez, partagez et interagissez avec les snippets de la
                  communauté
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-1 text-sm">
                  💾 Bibliothèque personnelle
                </h3>
                <p className="text-gray-600 text-sm">
                  Sauvegardez vos snippets préférés et organisez votre
                  collection
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-1 text-sm">
                  🔄 Partage et collaboration
                </h3>
                <p className="text-gray-600 text-sm">
                  Contribuez à la communauté en partageant vos meilleures
                  solutions
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-xl w-[400px] border border-gray-200">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
              Connexion
            </h2>
            {successMessage && (
              <p className="text-green-500 text-center text-sm">
                {successMessage}
              </p>
            )}
            {error && (
              <p className="text-red-500 text-center text-sm">{error}</p>
            )}

            <div className="flex flex-col gap-3">
              <button
                onClick={handleGoogleLogin}
                className="w-full bg-white text-gray-700 border border-gray-300 p-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition duration-200"
              >
                <FaGoogle className="text-red-500" />
                Continuer avec Google
              </button>
              <button
                onClick={handleGithubLogin}
                className="w-full bg-white text-gray-700 border border-gray-300 p-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition duration-200"
              >
                <FaGithub />
                Continuer avec GitHub
              </button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Ou</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Nom d'utilisateur"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 outline-none focus:ring-1 focus:ring-black/20"
              />
              <input
                type="password"
                placeholder="Mot de passe"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 outline-none focus:ring-1 focus:ring-black/20"
              />
              <button
                type="submit"
                className="w-full bg-indigo-500 text-white p-2.5 rounded-lg hover:bg-indigo-600 transition duration-200"
              >
                Se connecter
              </button>
            </form>
            <p className="text-center text-gray-500 text-sm mt-6">
              Vous n'avez pas de compte ?{" "}
              <a href="/register" className="text-black hover:underline">
                Inscrivez-vous ici
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
