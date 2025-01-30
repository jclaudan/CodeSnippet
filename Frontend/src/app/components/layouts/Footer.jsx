export const Footer = () => {
  return (
    <footer className="bg-gray-50 text-center p-6 border-t">
      <div className="text-black font-medium">
        &copy; 2025 CodeSnippet. Tous droits réservés.
      </div>
      <div className="flex justify-center gap-6 mt-3 text-sm">
        <span className="text-gray-600">
          Made by{" "}
          <a
            href="https://elyesasahin.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Spectre
          </a>
        </span>
        <span className="text-gray-400">|</span>
        <a
          href="https://github.com/Spectrenard/CodeSnippet"
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 font-semibold hover:underline"
        >
          ⭐ Contribuer au projet
        </a>
      </div>
    </footer>
  );
};
