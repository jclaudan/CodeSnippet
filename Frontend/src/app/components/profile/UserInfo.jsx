import { useTheme } from "@/app/context/ThemeContext";

export default function UserInfo({ user }) {
  const { darkMode } = useTheme();

  return (
    <div
      className={`${
        darkMode ? "border-t border-zinc-700" : "border-t border-gray-200"
      } pt-6`}
    >
      <h3
        className={`${
          darkMode ? "text-gray-200" : "text-gray-800"
        } text-xl font-semibold mb-6 flex items-center`}
      >
        <span
          className={`${
            darkMode ? "bg-zinc-700" : "bg-indigo-100"
          } rounded-lg px-4 py-2`}
        >
          Informations de connexion
        </span>
      </h3>
      <div
        className={`${
          darkMode ? "bg-zinc-700" : "bg-gray-50"
        } space-y-6 rounded-lg p-6`}
      >
        <div
          className={`${
            darkMode ? "hover:bg-zinc-800" : "hover:bg-white"
          } flex items-center p-3 rounded-lg transition-all duration-300`}
        >
          <span
            className={`${
              darkMode ? "text-gray-400" : "text-gray-600"
            } w-40 font-medium`}
          >
            Méthode de connexion:
          </span>
          <span className="font-medium text-indigo-600">
            {user?.googleId ? "Google" : user?.githubId ? "GitHub" : "Email"}
          </span>
        </div>
        <div
          className={`${
            darkMode ? "hover:bg-zinc-800" : "hover:bg-white"
          } flex items-center p-3 rounded-lg transition-all duration-300`}
        >
          <span
            className={`${
              darkMode ? "text-gray-400" : "text-gray-600"
            } w-40 font-medium`}
          >
            Membre depuis:
          </span>
          <span className="font-medium text-indigo-600">
            {new Date(user?.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}
