import { useTheme } from "@/app/context/ThemeContext";

const LoadingHome = () => {
  const { darkMode } = useTheme();

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${
        darkMode ? "bg-zinc-900" : "bg-white"
      }`}
    >
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className={`${
            darkMode ? "bg-zinc-800" : "bg-white"
          } rounded-lg shadow-md p-6`}
        >
          <div className="flex justify-between items-center mb-4">
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
          <div className="mt-4">
            <div
              className={`${
                darkMode ? "bg-zinc-700" : "bg-gray-200"
              } animate-pulse h-32 rounded`}
            ></div>
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <div
              className={`${
                darkMode ? "bg-zinc-700" : "bg-gray-200"
              } animate-pulse h-8 w-20 rounded`}
            ></div>
            <div
              className={`${
                darkMode ? "bg-zinc-700" : "bg-gray-200"
              } animate-pulse h-8 w-20 rounded`}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingHome;
