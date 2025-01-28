import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { IoCopyOutline, IoCheckmark, IoPencil } from "react-icons/io5"; // Ajout de IoPencil
import DeleteSnippetButton from "./DeleteSnippetButton";

// Styles pour les catégories
const categoryStyles = {
  JavaScript: "bg-yellow-200 text-yellow-800",
  Python: "bg-blue-200 text-blue-800",
  React: "bg-purple-200 text-purple-800",
  "Node.js": "bg-green-200 text-green-800",
  C: "bg-red-200 text-red-800",
};

const SnippetList = ({ snippets, onEdit, onDelete }) => {
  const [copiedSnippetId, setCopiedSnippetId] = useState(null);

  const handleCopy = (text, snippetId) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Texte copié dans le presse-papiers");
        setCopiedSnippetId(snippetId); // Met à jour l'état pour indiquer que ce snippet a été copié
        setTimeout(() => setCopiedSnippetId(null), 2000); // Réinitialise après 2 secondes
      })
      .catch((err) => {
        console.error("Erreur lors de la copie du texte : ", err);
      });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {snippets.length === 0 ? (
        <p className="text-gray-900 text-center">Aucun snippet ajouté.</p>
      ) : (
        [...snippets]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Trie les snippets
          .map((snippet) => (
            <div
              key={snippet.id}
              className="bg-white p-4 rounded-lg shadow-lg transition-transform transform hover:scale-[1.01] max-w-xl max-h-80 overflow-auto border border-gray-300 flex flex-col"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-gray-800 font-semibold text-lg">
                  {snippet.title}
                </h3>
                {snippet.category && (
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-semibold ${
                      categoryStyles[snippet.category]
                    }`}
                  >
                    {snippet.category}
                  </span>
                )}
              </div>
              <SyntaxHighlighter
                className="max-h-48 rounded-lg flex-grow"
                language="javascript"
                style={vscDarkPlus}
              >
                {snippet.description}
              </SyntaxHighlighter>
              <div className="flex gap-2 mt-4 ">
                <button
                  onClick={() => handleCopy(snippet.description, snippet.id)}
                  className="w-full bg-white border font-semibold text-black py-2 px-4 rounded transition hover:scale-[1.01] hover:bg-gray-50 focus:outline-none flex items-center justify-center"
                >
                  {copiedSnippetId === snippet.id ? (
                    <>
                      Copié ! <IoCheckmark className="ml-2" />
                    </>
                  ) : (
                    <>
                      Copier <IoCopyOutline className="ml-2" />
                    </>
                  )}
                </button>
                <button
                  onClick={() => onEdit(snippet)}
                  className="bg-white border font-semibold text-black py-2 px-4 rounded transition hover:scale-[1.01] hover:bg-gray-50 focus:outline-none flex items-center justify-center"
                >
                  <IoPencil className="text-lg" />
                </button>
                <DeleteSnippetButton
                  snippetId={snippet.id}
                  onDelete={onDelete}
                />
              </div>
            </div>
          ))
      )}
    </div>
  );
};

export default SnippetList;
