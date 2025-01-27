import { IoCode } from "react-icons/io5";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="flex items-center justify-between gap-2 px-6">
      <div className="flex items-center justify-center gap-2">
        <IoCode className="text-2xl text-black" />
        <h1 className="text-xl  text-black font-semibold">CodeSnippet</h1>
      </div>

      <button
        className="bg-black text-white px-4 py-2 rounded-xl hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none"
        onClick={handleLogout}
      >
        Déconnexion
      </button>
    </div>
  );
};
