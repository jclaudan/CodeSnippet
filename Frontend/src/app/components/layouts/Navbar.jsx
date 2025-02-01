import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { IoPersonCircleOutline } from "react-icons/io5";

export const Navbar = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <nav className="bg-zinc-900 border-b border-zinc-800">
      <div className="max-w-[1500px] mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link
              href="/"
              className="flex items-center gap-3 hover:opacity-90 transition-opacity"
            >
              <Image
                src="/favicon.png"
                alt="CodeSnippet Logo"
                width={36}
                height={36}
                className="w-9 h-9"
              />
              <span className="text-xl text-zinc-100 font-bold">
                CodeSnippet
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className="text-zinc-400 hover:text-zinc-100 font-medium transition-colors relative group"
              >
                Mes Snippets
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="/hub"
                className="text-zinc-400 hover:text-zinc-100 font-medium transition-colors relative group"
              >
                Hub
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <Link
              href="/profile"
              className="p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded-full transition-all duration-300"
            >
              <IoPersonCircleOutline className="w-7 h-7" />
            </Link>

            <button
              onClick={handleLogout}
              className="bg-zinc-800 text-zinc-100 px-5 py-2 rounded-lg hover:bg-zinc-700 transition-colors font-medium border border-zinc-700"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
