"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Register = () => {
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
        "https://codesnippet-cy4q.onrender.com/user",
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
        throw new Error(errorData.message || "Erreur lors de l'inscription");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      setSuccessMessage(
        "Inscription réussie ! Vous pouvez maintenant vous connecter."
      );
      setTimeout(() => {
        router.push("/login");
      }, 2000);
      console.log("Inscription réussie", data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white py-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-start justify-center gap-20">
        <div className="bg-white p-6 rounded-lg shadow-xl w-[400px] border border-gray-200">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
            Inscription
          </h2>
          {successMessage && (
            <p className="text-green-500 text-center text-sm">
              {successMessage}
            </p>
          )}
          {error && <p className="text-red-500 text-center text-sm">{error}</p>}

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
              className="w-full bg-black text-white p-2.5 rounded-lg hover:bg-gray-800 transition duration-200"
            >
              S'inscrire
            </button>
          </form>
          <p className="text-center text-gray-500 text-sm mt-6">
            Vous avez déjà un compte ?{" "}
            <a href="/login" className="text-black hover:underline">
              Connectez-vous ici
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
