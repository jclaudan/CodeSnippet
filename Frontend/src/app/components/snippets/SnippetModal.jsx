import { useTheme } from "@/app/context/ThemeContext";

const SnippetModal = ({ isOpen, onClose, children }) => {
  const { darkMode } = useTheme();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className={`${
          darkMode ? "bg-zinc-900" : "bg-white"
        } p-6 rounded-lg shadow-lg w-[600px] max-w-xl relative`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default SnippetModal;
