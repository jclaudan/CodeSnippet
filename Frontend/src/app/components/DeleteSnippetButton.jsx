import React, { useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import ConfirmationDialog from "./ConfirmationDialog";

const DeleteSnippetButton = ({ snippetId, onDelete }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [message, setMessage] = useState(null);

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
        setMessage("Snippet supprimé avec succès !");
      } else {
        setMessage("Erreur lors de la suppression du snippet.");
      }
    } catch (error) {
      console.error("Erreur :", error);
      setMessage(
        "Une erreur s'est produite lors de la suppression du snippet."
      );
    }
  };

  return (
    <>
      <button
        onClick={() => setIsDialogOpen(true)}
        className="bg-white border font-semibold text-black py-2 px-4 rounded transition hover:scale-[1.01] hover:bg-gray-50 focus:outline-none flex items-center justify-center"
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

      {/* Message de feedback */}
      {message && (
        <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-4 rounded shadow-lg">
          {message}
        </div>
      )}
    </>
  );
};

export default DeleteSnippetButton;
