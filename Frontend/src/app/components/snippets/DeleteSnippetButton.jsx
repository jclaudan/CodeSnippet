import React, { useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import { toast } from "react-toastify"; // Importer toast
import ConfirmationDialog from "./ConfirmationDialog";
import { useTheme } from "@/app/context/ThemeContext";
const DeleteSnippetButton = ({ snippetId, onDelete }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { darkMode } = useTheme();
  const handleDelete = async () => {
    setIsDialogOpen(false); // Ferme la boîte de confirmation

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3000/snippets/${snippetId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        onDelete(snippetId); // Appelle la fonction onDelete pour mettre à jour l'état parent
        toast.success("Snippet supprimé avec succès !", {
          style: {
            position: "bottom-left",
            backgroundColor: "#81C784", // Vert
            color: "white",
          },
        }); // Affiche la notification de succès avec une couleur verte
      } else {
        toast.error("Erreur lors de la suppression du snippet.", {
          style: {
            backgroundColor: "#f44336", // Rouge
            color: "white",
          },
        });
      }
    } catch (error) {
      console.error("Erreur :", error);
      toast.error(
        "Une erreur s'est produite lors de la suppression du snippet."
      ); // Notification d'erreur
    }
  };

  return (
    <>
      <button
        onClick={() => setIsDialogOpen(true)}
        className={`${
          darkMode
            ? "bg-zinc-700 text-gray-300 border-zinc-600 py-2 px-4 rounded transition hover:scale-[1.01] hover:bg-zinc-600 flex items-center justify-center"
            : "bg-white border font-semibold text-black py-2 px-4 rounded transition hover:scale-[1.01] hover:bg-gray-50 focus:outline-none flex items-center justify-center"
        }`}
      >
        <IoTrashOutline className="text-lg" />
      </button>

      {/* Boîte de confirmation */}
      <ConfirmationDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleDelete}
        message="Êtes-vous sûr de vouloir supprimer ce snippet ?"
      />
    </>
  );
};

export default DeleteSnippetButton;
