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
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
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
      setSuccessMessage("Registration successful ! You can now login.");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
      console.log("Inscription réussie", data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex items-center justify-center py-12 flex-grow">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-start justify-center gap-20">
          <div className="bg-white p-8 rounded-lg shadow-md w-[400px] border border-gray-200">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
              Register
            </h2>
            {successMessage && (
              <p className="text-green-500 text-center text-sm">
                {successMessage}
              </p>
            )}
            {error && (
              <p className="text-red-500 text-center text-sm">{error}</p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2.5 border border-gray-200 rounded-lg bg-white text-gray-800 placeholder-gray-400 outline-none focus:ring-1 focus:ring-indigo-500/20"
              />
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2.5 border border-gray-200 rounded-lg bg-white text-gray-800 placeholder-gray-400 outline-none focus:ring-1 focus:ring-indigo-500/20"
              />
              <button
                type="submit"
                className="w-full bg-indigo-500 text-white p-2.5 rounded-lg hover:bg-indigo-600 transition duration-200"
              >
                Register
              </button>
            </form>
            <p className="text-center text-gray-500 text-sm mt-6">
              You already have an account ?{" "}
              <a href="/login" className="text-black hover:underline">
                Login here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
