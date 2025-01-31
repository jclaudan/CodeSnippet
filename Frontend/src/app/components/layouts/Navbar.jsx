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
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-[1500px] mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/favicon.png"
                alt="CodeSnippet Logo"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="text-xl text-gray-900 font-bold">
                CodeSnippet
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-6">
              <Link
                href="/"
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                Mes Snippets
              </Link>
              <Link
                href="/hub"
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                Hub
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="/profile"
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
            >
              <IoPersonCircleOutline className="w-6 h-6" />
            </Link>

            <button
              onClick={handleLogout}
              className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
