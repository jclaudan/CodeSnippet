import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { IoCopyOutline, IoCheckmark } from "react-icons/io5";

const SnippetList = ({ snippets }) => {
  // État pour suivre quel snippet a été copié
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
    <div className="mt-8 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {snippets.length === 0 ? (
          <p className="text-gray-900 text-center">Aucun snippet ajouté.</p>
        ) : (
          snippets.map((snippet) => (
            <div
              key={snippet.id}
              className="bg-white p-4 rounded-lg shadow-lg transition-transform transform hover:scale-[1.01] max-w-xl max-h-80 overflow-auto border border-gray-300"
            >
              <h3 className="text-gray-800 pb-3 font-semibold text-lg">
                {snippet.title}
              </h3>
              <SyntaxHighlighter
                className="max-h-48 rounded-lg"
                language="javascript"
                style={vscDarkPlus}
              >
                {snippet.description}
              </SyntaxHighlighter>
              <button
                onClick={() => handleCopy(snippet.description, snippet.id)}
                className="w-full mt-4 bg-white border font-semibold text-black py-2 px-4 rounded transition hover:scale-[1.01] hover:bg-gray-50 focus:outline-none flex items-center justify-center"
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
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SnippetList;
