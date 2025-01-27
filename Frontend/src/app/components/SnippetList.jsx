import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { IoCopyOutline } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SnippetList = ({ snippets }) => {
  const handleCopy = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Texte copié dans le presse-papiers");
        toast.success("Texte copié !", {
          className: "custom-toast",
        });
      })
      .catch((err) => {
        console.error("Erreur lors de la copie du texte : ", err);
      });
  };

  return (
    <>
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
                  onClick={() => handleCopy(snippet.description)}
                  className="w-full mt-4 bg-white border font-semibold text-black py-2 px-4 rounded transition hover:scale-[1.01] hover:bg-gray-50 focus:outline-none flex items-center justify-center"
                >
                  <IoCopyOutline className="mr-2 " /> Copier
                </button>
              </div>
            ))
          )}
        </div>
      </div>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
      />
    </>
  );
};

export default SnippetList;
