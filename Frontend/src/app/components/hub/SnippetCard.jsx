import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { IoCopyOutline, IoCheckmark } from "react-icons/io5";
import {
  BiUpvote,
  BiSolidUpvote,
  BiBookmark,
  BiSolidBookmark,
} from "react-icons/bi";
import { useState, useEffect } from "react";
import { useTheme } from "@/app/context/ThemeContext";

const SnippetCard = ({
  snippet,
  categoryStyles,
  copiedSnippetId,
  onCopy,
  onLike,
  onBookmark,
}) => {
  // État local pour le like
  const [isLiked, setIsLiked] = useState(snippet.isLiked);
  const [likesCount, setLikesCount] = useState(snippet.likesCount);
  const [isBookmarked, setIsBookmarked] = useState(snippet.isBookmarked);

  // Mettre à jour l'état local quand les props changent
  useEffect(() => {
    setIsLiked(snippet.isLiked);
    setLikesCount(snippet.likesCount);
    setIsBookmarked(snippet.isBookmarked);
  }, [snippet.isLiked, snippet.likesCount, snippet.isBookmarked]);

  const { darkMode } = useTheme();

  const handleLike = async (snippetId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Veuillez vous connecter pour voter");
        return;
      }

      const response = await fetch(
        `http://localhost:3000/hub/snippets/${snippetId}/like`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        // Mettre à jour l'état local
        setIsLiked(data.isLiked);
        setLikesCount(data.likesCount);
        // Informer le parent
        onLike(snippetId, data.isLiked, data.likesCount);
      }
    } catch (error) {
      console.error("Erreur lors du vote:", error);
      toast.error("Erreur lors du vote");
    }
  };

  const handleBookmark = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Veuillez vous connecter pour sauvegarder");
        return;
      }

      const response = await fetch(
        `http://localhost:3000/hub/snippets/${snippet.id}/bookmark`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setIsBookmarked(data.isBookmarked);
        onBookmark(snippet.id, data.isBookmarked);
      }
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
      toast.error("Erreur lors de la sauvegarde");
    }
  };

  return (
    <div
      className={`${
        darkMode ? "bg-zinc-800" : "bg-white"
      } rounded-lg shadow-md p-6 transition-transform transform hover:scale-[1.01] hover:shadow-lg`}
    >
      <div className="flex justify-between items-center mb-2">
        <h3
          className={`${
            darkMode ? "text-gray-100" : "text-gray-800"
          } font-semibold text-lg`}
        >
          {snippet.title}
        </h3>
        <div className="flex items-center gap-2">
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
      </div>

      <div className="flex items-center gap-2 mb-4">
        <img
          src={
            snippet.user?.avatar ||
            snippet.user?.googleAvatar ||
            snippet.user?.githubAvatar ||
            "/pfp.jpg"
          }
          alt={`Avatar de ${snippet.user?.username}`}
          className="w-8 h-8 rounded-full object-cover"
        />
        <span
          className={`${darkMode ? "text-gray-300" : "text-gray-800"} text-sm`}
        >
          {snippet.user?.username}
        </span>
        <span
          className={`${darkMode ? "text-gray-500" : "text-gray-400"} text-sm`}
        >
          •
        </span>
        <span
          className={`${darkMode ? "text-gray-500" : "text-gray-400"} text-sm`}
        >
          {new Date(snippet.createdAt).toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
          {" à "}
          {new Date(snippet.createdAt).toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>

      <div className="mt-4 relative">
        <SyntaxHighlighter
          language="javascript"
          className="rounded-lg flex-grow overflow-auto"
          style={vscDarkPlus}
          customStyle={{
            borderRadius: "0.5rem",
            padding: "1rem",
            fontSize: "0.9rem",
            maxHeight: "12rem",
            overflow: "auto",
          }}
        >
          {snippet.description}
        </SyntaxHighlighter>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div className="flex gap-4">
          <button
            onClick={() => handleLike(snippet.id)}
            className={`${
              darkMode ? "text-gray-300" : "text-gray-800"
            } flex items-center space-x-2 transition group`}
            title={isLiked ? "Retirer le vote" : "Voter"}
          >
            <div className="relative">
              {isLiked ? (
                <BiSolidUpvote
                  className={`${
                    darkMode ? "text-orange-600" : "text-orange-600"
                  } text-xl transform transition-transform group-hover:scale-110 group-active:scale-95`}
                />
              ) : (
                <BiUpvote
                  className={`${
                    darkMode ? "text-orange-600" : "text-orange-600"
                  } text-xl transform transition-transform group-hover:scale-110 group-active:scale-95`}
                />
              )}
              <span className="absolute -top-1 -right-1 opacity-0 group-active:opacity-100 pointer-events-none">
                <div className="animate-like-burst">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className={`${
                        darkMode ? "bg-orange-600" : "bg-orange-500"
                      } absolute h-1.5 w-1.5 rounded-full`}
                      style={{
                        transform: `rotate(${i * 60}deg) translateY(-6px)`,
                      }}
                    />
                  ))}
                </div>
              </span>
            </div>
            <span>{likesCount}</span>
          </button>

          <button
            onClick={handleBookmark}
            className={`${
              darkMode ? "text-gray-300" : "text-gray-800"
            } flex items-center space-x-2 transition group`}
            title={isBookmarked ? "Retirer des favoris" : "Sauvegarder"}
          >
            <div className="relative">
              {isBookmarked ? (
                <BiSolidBookmark
                  className={`${
                    darkMode ? "text-blue-600" : "text-blue-600"
                  } text-xl transform transition-transform group-hover:scale-110 group-active:scale-95`}
                />
              ) : (
                <BiBookmark
                  className={`${
                    darkMode ? "text-blue-600" : "text-blue-600"
                  } text-xl transform transition-transform group-hover:scale-110 group-active:scale-95`}
                />
              )}
              <span className="absolute -top-1 -right-1 opacity-0 group-active:opacity-100 pointer-events-none">
                <div className="animate-bookmark-pop">
                  <div
                    className={`${
                      darkMode ? "bg-blue-600" : "bg-blue-500"
                    } h-2 w-2 rounded-full`}
                  />
                </div>
              </span>
            </div>
          </button>
        </div>
        <button
          onClick={() => onCopy(snippet.description, snippet.id)}
          className={`${
            darkMode ? "text-gray-400 border-gray-600" : "text-gray-800"
          } flex items-center space-x-2 transition px-4 py-2 rounded-full border border-gray-200 hover:border-indigo-500`}
        >
          {copiedSnippetId === snippet.id ? (
            <>
              <IoCheckmark className="text-xl text-green-600" />
              <span>Copié</span>
            </>
          ) : (
            <>
              <IoCopyOutline className="text-xl" />
              <span>Copier</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default SnippetCard;
