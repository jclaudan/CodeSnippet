import { IoCamera } from "react-icons/io5";

export default function Avatar({ avatar, username, onAvatarChange }) {
  return (
    <div className="relative group">
      <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 transition-transform duration-300 transform hover:scale-105 hover:border-indigo-500">
        {avatar ? (
          <img
            src={avatar}
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-300 flex items-center justify-center">
            <span className="text-gray-600 text-4xl">
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
