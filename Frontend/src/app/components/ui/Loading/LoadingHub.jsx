import { useTheme } from "@/app/context/ThemeContext";

const LoadingHub = () => {
  const { darkMode } = useTheme();

  return (
    <div
      className={`${
        darkMode ? "bg-zinc-800" : "bg-white"
      } rounded-lg shadow-md p-6`}
    >
      <div className="flex justify-between items-center mb-2">
        <div
          className={`${
            darkMode ? "bg-zinc-700" : "bg-gray-200"
          } animate-pulse h-6 w-48 rounded`}
        ></div>
        <div
          className={`${
            darkMode ? "bg-zinc-700" : "bg-gray-200"
          } animate-pulse h-6 w-24 rounded-full`}
        ></div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <div
          className={`${
            darkMode ? "bg-zinc-700" : "bg-gray-200"
          } animate-pulse w-8 h-8 rounded-full`}
        ></div>
        <div
          className={`${
            darkMode ? "bg-zinc-700" : "bg-gray-200"
          } animate-pulse h-4 w-32 rounded`}
        ></div>
      </div>

      <div className="mt-4">
        <div
          className={`${
            darkMode ? "bg-zinc-700" : "bg-gray-200"
          } animate-pulse h-40 rounded`}
        ></div>
      </div>

      <div className="mt-4">
        <div
          className={`${
            darkMode ? "bg-zinc-700" : "bg-gray-200"
          } animate-pulse h-10 w-24 rounded-full`}
        ></div>
      </div>
    </div>
  );
};

export default LoadingHub;
