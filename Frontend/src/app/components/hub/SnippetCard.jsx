import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  IoCopyOutline,
  IoCheckmark,
  IoHeart,
  IoHeartOutline,
  IoBookmark,
  IoBookmarkOutline,
} from "react-icons/io5";

const SnippetCard = ({
  snippet,
  categoryStyles,
  copiedSnippetId,
  onCopy,
  onLike,
  onSave,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 transition-transform transform hover:scale-[1.01] hover:shadow-lg">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-gray-800 font-semibold text-lg">{snippet.title}</h3>
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
            "/default-avatar.png"
          }
          alt={`Avatar de ${snippet.user?.username}`}
          className="w-8 h-8 rounded-full object-cover"
        />
        <span className="text-sm text-gray-600">{snippet.user?.username}</span>
        <span className="text-sm text-gray-400">•</span>
        <span className="text-sm text-gray-500">
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
            onClick={() => onLike(snippet.id)}
            className="flex items-center space-x-2 text-gray-500 hover:text-red-600 transition"
          >
            {snippet.isLiked ? (
              <IoHeart className="text-xl text-red-600" />
            ) : (
              <IoHeartOutline className="text-xl" />
            )}
            <span>{snippet.likesCount}</span>
          </button>
          <button
            onClick={() => onSave(snippet.id)}
            className="flex items-center space-x-2 text-gray-500 hover:text-yellow-600 transition"
          >
            {snippet.isSaved ? (
              <IoBookmark className="text-xl text-yellow-600" />
            ) : (
              <IoBookmarkOutline className="text-xl" />
            )}
          </button>
        </div>
        <button
          onClick={() => onCopy(snippet.description, snippet.id)}
          className="flex items-center space-x-2 text-gray-500 hover:text-indigo-500 transition px-4 py-2 rounded-full border border-gray-200 hover:border-indigo-500"
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
