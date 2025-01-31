import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { IoCopyOutline, IoCheckmark, IoPencil, IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import DeleteSnippetButton from "./DeleteSnippetButton";

const categoryStyles = {
  JavaScript: "bg-yellow-200 text-yellow-800",
  Typescript: "bg-blue-300 text-blue-900",
  React: "bg-purple-200 text-purple-800",
  Angular: "bg-red-200 text-red-800",
  Vue: "bg-green-200 text-green-800",
  Python: "bg-blue-200 text-blue-800",
  NodeJS: "bg-green-300 text-green-900",
  Swift: "bg-orange-200 text-orange-800",
  Java: "bg-red-200 text-red-800",
  C: "bg-gray-300 text-gray-900",
};

const SnippetList = ({ snippets, onEdit, onDelete }) => {
  const [copiedSnippetId, setCopiedSnippetId] = useState(null);
  const [viewingSnippetId, setViewingSnippetId] = useState(null);

  const handleCopy = (text, snippetId) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Texte copié dans le presse-papiers");
        setCopiedSnippetId(snippetId);
        setTimeout(() => setCopiedSnippetId(null), 2000);
      })
      .catch((err) => {
        console.error("Erreur lors de la copie du texte : ", err);
      });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-2">
      {snippets.length === 0 ? (
        <p className="text-gray-900 text-center col-span-full">Aucun snippet ajouté.</p>
      ) : (
        [...snippets]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((snippet) => (
            <div
              key={snippet.id}
              className={`${
                viewingSnippetId === snippet.id
                  ? 'fixed inset-0 z-50 bg-white'
                  : 'bg-white'
              } p-3 rounded-lg shadow-lg transition-all duration-200 border border-gray-300 flex flex-col`}
            >
              <div className="flex justify-between items-center mb-2 sticky top-0 bg-white z-10 pb-2 border-b">
                <h3 className="text-gray-800 font-semibold text-sm truncate mr-2">
                  {snippet.title}
                </h3>
                {snippet.category && (
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap ${
                      categoryStyles[snippet.category]
                    }`}
                  >
                    {snippet.category}
                  </span>
                )}
              </div>
              <div className={`flex-grow ${viewingSnippetId === snippet.id ? 'h-[calc(100vh-180px)]' : 'h-[200px]'}`}>
                <SyntaxHighlighter
                  className="h-full rounded-lg text-sm"
                  language="javascript"
                  style={vscDarkPlus}
                  customStyle={{
                    height: '100%',
                    margin: 0,
                    fontSize: '12px',
                  }}
                >
                  {snippet.description}
                </SyntaxHighlighter>
              </div>
              <div className="flex items-center justify-center gap-2 mt-3 pt-2 border-t">
                <button
                  onClick={() => handleCopy(snippet.description, snippet.id)}
                  className="flex-1 bg-white border font-semibold text-black py-1.5 px-3 rounded text-xs transition hover:bg-gray-50 focus:outline-none flex items-center justify-center"
                >
                  {copiedSnippetId === snippet.id ? (
                    <>
                      Copié <IoCheckmark className="ml-1" />
                    </>
                  ) : (
                    <>
                      Copier <IoCopyOutline className="ml-1" />
                    </>
                  )}
                </button>
                <button
                  onClick={() => setViewingSnippetId(viewingSnippetId === snippet.id ? null : snippet.id)}
                  className="bg-white border font-semibold text-black p-1.5 rounded transition hover:bg-gray-50 focus:outline-none flex items-center justify-center min-w-[32px]"
                  title={viewingSnippetId === snippet.id ? "Réduire" : "Agrandir"}
                >
                  {viewingSnippetId === snippet.id ? (
                    <IoEyeOffOutline className="text-base" />
                  ) : (
                    <IoEyeOutline className="text-base" />
                  )}
                </button>
                <button
                  onClick={() => onEdit(snippet)}
                  className="bg-white border font-semibold text-black p-1.5 rounded transition hover:bg-gray-50 focus:outline-none flex items-center justify-center min-w-[32px]"
                  title="Modifier"
                >
                  <IoPencil className="text-base" />
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
