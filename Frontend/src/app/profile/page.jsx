"use client";
import React, { useState, useEffect } from "react";
import { Navbar } from "../components/layouts/Navbar";
import { Footer } from "../components/layouts/Footer";
import { IoCamera } from "react-icons/io5";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/users/profile", {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
        setAvatar(data.avatar || data.googleAvatar || data.githubAvatar);
      } else if (response.status === 401) {
        toast.error("Veuillez vous reconnecter");
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Erreur:", error);
      toast.error("Erreur lors du chargement du profil");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("L'image ne doit pas dépasser 5MB");
      return;
    }

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const response = await fetch("http://localhost:3000/users/avatar", {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setAvatar(data.avatar);
        toast.success("Avatar mis à jour avec succès !");
      }
    } catch (error) {
      console.error("Erreur:", error);
      toast.error("Erreur lors de la mise à jour de l'avatar");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="max-w-4xl mx-auto py-16 flex-grow">
        <div className="bg-white rounded-xl shadow-lg p-10 px-24 transform  transition-all duration-300">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-4 text-center">
            Mon Profil
          </h1>

          <div className="flex flex-col items-center mb-8">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 transition-transform duration-300 transform hover:scale-105 hover:border-indigo-500">
                {avatar ? (
                  <img
                    src={avatar}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                    <span className="text-gray-600 text-4xl">
                      {user?.username?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>

              <label className="absolute bottom-0 right-0 bg-indigo-600 p-2 rounded-full cursor-pointer hover:bg-indigo-700 transition-all duration-300 group-hover:scale-110 hover:shadow-lg">
                <IoCamera className="text-white text-xl" />
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
              </label>
            </div>

            <h2 className="text-2xl font-semibold mt-6 text-gray-800">
              {user?.username}
            </h2>
            <p className="text-gray-600 mt-2 font-medium">{user?.email}</p>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
              <span className="bg-indigo-100 rounded-lg px-4 py-2">
                Informations de connexion
              </span>
            </h3>
            <div className="space-y-6 bg-gray-50 rounded-lg p-6">
              <div className="flex items-center hover:bg-white p-3 rounded-lg transition-all duration-300">
                <span className="text-gray-600 w-40 font-medium">
                  Méthode de connexion:
                </span>
                <span className="font-medium text-indigo-600">
                  {user?.googleId
                    ? "Google"
                    : user?.githubId
                    ? "GitHub"
                    : "Email"}
                </span>
              </div>
              <div className="flex items-center hover:bg-white p-3 rounded-lg transition-all duration-300">
                <span className="text-gray-600 w-40 font-medium">
                  Membre depuis:
                </span>
                <span className="font-medium text-indigo-600">
                  {new Date(user?.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProfilePage;
