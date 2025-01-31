import { useRouter } from "next/navigation";
import Image from "next/image";

export const Navbar = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="flex items-center justify-between gap-2 px-6">
      <div className="flex items-center justify-center gap-2">
        <Image
          src="/favicon.png"
          alt="CodeSnippet Logo"
          width={32}
          height={32}
          className="w-10 h-10"
        />
        <h1 className="text-xl text-black font-semibold">CodeSnippet</h1>
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
