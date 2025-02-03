import { IoCamera } from "react-icons/io5";
import { useTheme } from "../../context/ThemeContext";
import Image from "next/image";
export default function Avatar({ avatar, username, onAvatarChange }) {
  const { darkMode } = useTheme();

  return (
    <div className="relative group">
      <div
        className={`${
          darkMode ? "border-zinc-700" : "border-gray-200"
        } w-32 h-32 rounded-full overflow-hidden border-4 transition-transform duration-300 transform hover:scale-105 hover:border-indigo-500`}
      >
        {avatar ? (
          <Image
            src={avatar}
            alt="Avatar"
            className="w-full h-full object-cover"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
            loading="lazy"
          />
        ) : (
          <div
            className={`${
              darkMode ? "bg-zinc-700" : "bg-gray-300"
            } w-full h-full flex items-center justify-center`}
          >
            <span
              className={`${
                darkMode ? "text-gray-400" : "text-gray-600"
              } text-4xl`}
            >
              {username?.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </div>

      <label className="absolute bottom-0 right-0 bg-indigo-600 p-2 rounded-full cursor-pointer hover:bg-indigo-700 transition-all duration-300 group-hover:scale-110 hover:shadow-lg">
        <IoCamera className="text-white text-xl" />
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={onAvatarChange}
        />
      </label>
    </div>
  );
}
