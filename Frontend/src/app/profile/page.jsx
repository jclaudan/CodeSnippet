"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import Avatar from "../components/profile/Avatar";
import UserInfo from "../components/profile/UserInfo";
import { getUserProfile, updateUserAvatar } from "../../api/users";
import { toast } from "react-toastify";
import LoadingProfile from "../components/ui/Loading/LoadingProfile";
import { useTheme } from "../context/ThemeContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfilePage = () => {
  const { darkMode } = useTheme();
  const [user, setUser] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await getUserProfile(token);

      if (response.ok) {
        const data = await response.json();
        setUser(data);
        setAvatar(data.avatar || data.googleAvatar || data.githubAvatar);
      } else if (response.status === 401) {
        toast.error("Please login again");
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
      toast.error("The image must not exceed 5MB");
      return;
    }

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const response = await updateUserAvatar(token, formData);
      if (response.ok) {
        const data = await response.json();
        setAvatar(data.avatar);
        toast.success("Avatar updated successfully !");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error updating avatar");
    }
  };

  if (isLoading) {
    return (
      <div
        className={`${
          darkMode ? "bg-zinc-900" : "bg-gray-100"
        } min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-grow  max-w-4xl mx-auto py-16 w-full">
          <LoadingProfile />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div
      className={`${darkMode ? "bg-zinc-900" : "bg-gray-100"} flex flex-col`}
    >
      <Navbar />
      <main className="flex-grow max-w-4xl mx-auto py-16 w-full px-4 sm:px-6">
        <div
          className={`${
            darkMode ? "bg-zinc-800" : "bg-white"
          } rounded-xl shadow-lg p-4 sm:p-10 sm:px-24 transform transition-all duration-300`}
        >
          <h1
            className={`${
              darkMode
                ? "text-gray-200 border-b border-zinc-700"
                : "text-gray-800 border-b border-gray-200"
            } text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 border-b pb-4 text-center`}
          >
            My Profile
          </h1>

          <div className="flex flex-col items-center mb-8">
            <Avatar
              avatar={avatar}
              username={user?.username}
              onAvatarChange={handleAvatarChange}
            />
            <h2
              className={`${
                darkMode ? "text-gray-200" : "text-gray-800"
              } text-2xl font-semibold mt-6`}
            >
              {user?.username}
            </h2>
            <p
              className={`${
                darkMode ? "text-gray-400" : "text-gray-600"
              } mt-2 font-medium`}
            >
              {user?.email}
            </p>
          </div>

          <UserInfo user={user} setUser={setUser} />
        </div>
      </main>
      <Footer />

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme={darkMode ? "dark" : "light"}
      />
    </div>
  );
};

export default ProfilePage;
