import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoPersonCircleOutline } from "react-icons/io5";
import { Syne } from "next/font/google";
import { BiBookmark, BiCode, BiGlobe } from "react-icons/bi";
import { useTheme } from "@/app/context/ThemeContext";
import { FiSun, FiMoon } from "react-icons/fi";
import { RiCloseLine, RiMenu3Line } from "react-icons/ri";

const syne = Syne({
  subsets: ["latin"],
  display: "swap",
  weight: ["700"],
});

export const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { darkMode, toggleDarkMode } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <nav className="bg-zinc-900 shadow-md">
      <div className="max-w-[1500px] mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
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
              className={`text-xl text-zinc-100 font-bold ${syne.className}`}
            >
              CodeSnippet
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className={`px-3 py-2 text-zinc-400 font-medium rounded-lg ${
                pathname === "/"
                  ? "bg-zinc-800 text-zinc-100"
                  : "hover:bg-zinc-800 hover:text-zinc-100"
              }`}
            >
              <span className="flex items-center gap-2">
                <BiCode className="text-xl" />
                My Snippets
              </span>
            </Link>
            <Link
              href="/hub"
              className={`px-3 py-2 text-zinc-400 font-medium rounded-lg ${
                pathname === "/hub"
                  ? "bg-zinc-800 text-zinc-100"
                  : "hover:bg-zinc-800 hover:text-zinc-100"
              }`}
            >
              <span className="flex items-center gap-2">
                <BiGlobe className="text-xl" />
                Hub
              </span>
            </Link>
            <Link
              href="/bookmarks"
              className={`px-3 py-2 text-zinc-400 font-medium rounded-lg ${
                pathname === "/bookmarks"
                  ? "bg-zinc-800 text-zinc-100"
                  : "hover:bg-zinc-800 hover:text-zinc-100"
              }`}
            >
              <span className="flex items-center gap-2">
                <BiBookmark className="text-xl" />
                Bookmarks
              </span>
            </Link>
            <Link
              href="/profile"
              className={`px-3 py-2 text-zinc-400 font-medium rounded-lg hover:bg-zinc-800 hover:text-zinc-100`}
            >
              <span className="flex items-center gap-2">
                <IoPersonCircleOutline className="text-xl" />
                Profile
              </span>
            </Link>
            <button
              onClick={toggleDarkMode}
              className="p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded-full transition-all duration-300"
            >
              {darkMode ? (
                <FiSun className="w-5 h-5" />
              ) : (
                <FiMoon className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={handleLogout}
              className="bg-zinc-800 text-zinc-100 px-5 py-2 rounded-lg hover:bg-zinc-700 transition-colors font-medium border border-zinc-700"
            >
              Logout
            </button>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded-full transition-all duration-300"
          >
            {isMenuOpen ? (
              <RiCloseLine className="w-6 h-6" />
            ) : (
              <RiMenu3Line className="w-6 h-6" />
            )}
          </button>
        </div>

        <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
          <div className="flex flex-col space-y-4 pt-4 pb-3">
            <Link
              href="/"
              className={`px-3 py-2 text-zinc-400 font-medium rounded-lg ${
                pathname === "/"
                  ? "bg-zinc-800 text-zinc-100"
                  : "hover:bg-zinc-800 hover:text-zinc-100"
              }`}
            >
              <span className="flex items-center gap-2">
                <BiCode className="text-xl" />
                My Snippets
              </span>
            </Link>
            <Link
              href="/hub"
              className={`px-3 py-2 text-zinc-400 font-medium rounded-lg ${
                pathname === "/hub"
                  ? "bg-zinc-800 text-zinc-100"
                  : "hover:bg-zinc-800 hover:text-zinc-100"
              }`}
            >
              <span className="flex items-center gap-2">
                <BiGlobe className="text-xl" />
                Hub
              </span>
            </Link>
            <Link
              href="/bookmarks"
              className={`px-3 py-2 text-zinc-400 font-medium rounded-lg ${
                pathname === "/bookmarks"
                  ? "bg-zinc-800 text-zinc-100"
                  : "hover:bg-zinc-800 hover:text-zinc-100"
              }`}
            >
              <span className="flex items-center gap-2">
                <BiBookmark className="text-xl" />
                Bookmarks
              </span>
            </Link>
            <Link
              href="/profile"
              className={`px-3 py-2 text-zinc-400 font-medium rounded-lg hover:bg-zinc-800 hover:text-zinc-100`}
            >
              <span className="flex items-center gap-2">
                <IoPersonCircleOutline className="text-xl" />
                Profile
              </span>
            </Link>
            <button
              onClick={toggleDarkMode}
              className="flex items-center gap-2 w-full px-3 py-2 text-zinc-400 font-medium rounded-lg hover:bg-zinc-800 hover:text-zinc-100"
            >
              {darkMode ? (
                <>
                  <FiSun className="text-xl" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <FiMoon className="text-xl" />
                  <span>Dark Mode</span>
                </>
              )}
            </button>
            <button
              onClick={handleLogout}
              className="w-full bg-zinc-800 text-zinc-100 px-5 py-2 rounded-lg hover:bg-zinc-700 transition-colors font-medium border border-zinc-700"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
