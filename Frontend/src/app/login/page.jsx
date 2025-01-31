"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaGoogle, FaGithub } from "react-icons/fa";

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
    <div className="flex items-center justify-center min-h-screen bg-white/95">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-bold text-center text-black mb-4">
          Connexion
        </h2>
        {successMessage && (
          <p className="text-green-500 text-center">{successMessage}</p>
        )}
        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="flex flex-col gap-3 mb-4">
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-white text-black border border-gray-300 p-2 rounded flex items-center justify-center gap-2 hover:bg-gray-50 transition duration-200"
          >
            <FaGoogle className="text-red-500" />
            Continuer avec Google
          </button>
          <button
            onClick={handleGithubLogin}
            className="w-full bg-white text-black border border-gray-300 p-2 rounded flex items-center justify-center gap-2 hover:bg-gray-50 transition duration-200"
          >
            <FaGithub />
            Continuer avec GitHub
          </button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Ou</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border border-gray-400 rounded mt-4 bg-white text-black placeholder-gray-500 outline-none focus:ring-1 focus:ring-black"
          />
          <input
            type="password"
            placeholder="Mot de passe"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-400 rounded mt-4 bg-white text-black placeholder-gray-500 outline-none focus:ring-1 focus:ring-black"
          />
          <button
            type="submit"
            className="w-full bg-black text-white p-2 rounded mt-4 hover:scale-[1.02] transition duration-200"
          >
            Se connecter
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Vous n'avez pas de compte ?{" "}
          <a href="/register" className="text-gray-400 hover:underline">
            Inscrivez-vous ici
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
