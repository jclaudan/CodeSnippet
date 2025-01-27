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
      const response = await fetch("http://localhost:3000/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

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
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-bold text-center text-white mb-4">
          Inscription
        </h2>
        {successMessage && (
          <p className="text-green-500 text-center">{successMessage}</p>
        )}
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border border-gray-600 rounded mt-4 bg-gray-700 text-white placeholder-gray-400"
          />
          <input
            type="password"
            placeholder="Mot de passe"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-600 rounded mt-4 bg-gray-700 text-white placeholder-gray-400"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded mt-4 hover:bg-blue-500 transition duration-200"
          >
            S'inscrire
          </button>
        </form>
        <p className="text-center text-white mt-4">
          Vous avez déjà un compte ?{" "}
          <a href="/login" className="text-blue-400 hover:underline">
            Connectez-vous ici
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
