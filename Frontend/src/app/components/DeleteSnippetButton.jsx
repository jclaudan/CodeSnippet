import React from "react";
import { IoTrashOutline } from "react-icons/io5";

const DeleteSnippetButton = ({ snippetId, onDelete }) => {
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Êtes-vous sûr de vouloir supprimer ce snippet ?"
    );
    if (!confirmDelete) return;

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
        alert("Snippet supprimé avec succès !");
      } else {
        alert("Erreur lors de la suppression du snippet.");
      }
    } catch (error) {
      console.error("Erreur :", error);
      alert("Une erreur s'est produite lors de la suppression du snippet.");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-white border font-semibold text-black py-2 px-4 rounded transition hover:scale-[1.01] hover:bg-gray-50 focus:outline-none flex items-center justify-center"
    >
      <IoTrashOutline className="text-lg" /> {/* Icône de suppression */}
    </button>
  );
};

export default DeleteSnippetButton;
