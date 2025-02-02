import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { IoPersonCircleOutline } from "react-icons/io5";
import { Syne } from "next/font/google";

const syne = Syne({
  subsets: ["latin"],
  display: "swap",
  weight: ["700"],
});

export const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

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
              <span
                className={`text-xl  text-zinc-100 font-bold ${syne.className}`}
              >
                CodeSnippet
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className={`relative px-3 py-2 text-zinc-400 font-medium group transition-colors duration-300
                  ${pathname === "/" ? "text-zinc-100" : "hover:text-zinc-100"}
                `}
              >
                <span className="relative z-10">Mes Snippets</span>
                <div
                  className={`absolute inset-0 bg-zinc-800 rounded-lg transform scale-95 opacity-0 transition-all duration-300
                  ${
                    pathname === "/" ? "opacity-100" : "group-hover:opacity-100"
                  }`}
                />
              </Link>
              <Link
                href="/hub"
                className={`relative px-3 py-2 text-zinc-400 font-medium group transition-colors duration-300
                  ${
                    pathname === "/hub"
                      ? "text-zinc-100"
                      : "hover:text-zinc-100"
                  }
                `}
              >
                <span className="relative z-10">Hub</span>
                <div
                  className={`absolute inset-0 bg-zinc-800 rounded-lg transform scale-95 opacity-0 transition-all duration-300
                  ${
                    pathname === "/hub"
                      ? "opacity-100"
                      : "group-hover:opacity-100"
                  }`}
                />
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
