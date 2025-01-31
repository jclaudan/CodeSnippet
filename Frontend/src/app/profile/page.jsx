"use client";
import React, { useState, useEffect } from "react";
import { Navbar } from "../components/layouts/Navbar";
import { Footer } from "../components/layouts/Footer";
import { IoCamera } from "react-icons/io5";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const API_URL = "http://localhost:3000"; // Définir l'URL de base

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Veuillez vous connecter");
        router.push("/login");
        return;
      }

      const response = await fetch(`${API_URL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
        setAvatar(data.avatar || data.googleAvatar || data.githubAvatar);
      } else if (response.status === 401) {
        toast.error("Session expirée, veuillez vous reconnecter");
        router.push("/login");
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
    if (!token) {
      toast.error("Veuillez vous connecter");
      router.push("/login");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const response = await fetch(`${API_URL}/users/avatar`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setAvatar(data.avatar);
        toast.success("Avatar mis à jour avec succès !");
      } else if (response.status === 401) {
        toast.error("Session expirée, veuillez vous reconnecter");
        router.push("/login");
      } else {
        throw new Error("Erreur lors de la mise à jour");
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

      <main className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Mon Profil</h1>

          <div className="flex flex-col items-center mb-8">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200">
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

              <label className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full cursor-pointer hover:bg-blue-700 transition group-hover:scale-110">
                <IoCamera className="text-white text-xl" />
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
              </label>
            </div>

            <h2 className="text-xl font-semibold mt-4">{user?.username}</h2>
            <p className="text-gray-600">{user?.email}</p>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold mb-4">
              Informations de connexion
            </h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="text-gray-600 w-40">
                  Méthode de connexion:
                </span>
                <span className="font-medium">
                  {user?.googleId
                    ? "Google"
                    : user?.githubId
                    ? "GitHub"
                    : "Email"}
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-600 w-40">Membre depuis:</span>
                <span className="font-medium">
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
