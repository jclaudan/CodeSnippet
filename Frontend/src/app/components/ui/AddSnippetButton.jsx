import { FiPlus } from "react-icons/fi";

const AddSnippetButton = ({ onClick }) => {
  return (
    <button
      className="rounded-full bg-indigo-500 h-20 w-20 flex items-center justify-center text-white fixed bottom-10 right-10 transition-transform duration-200 ease-in-out hover:scale-110"
      onClick={onClick}
    >
      <FiPlus className="w-4 h-4" />
    </button>
  );
};

export default AddSnippetButton;
