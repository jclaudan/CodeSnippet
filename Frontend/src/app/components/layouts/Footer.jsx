export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-center p-6 border-t border-zinc-800">
      <div className="text-zinc-100 font-medium">
        &copy; 2025 CodeSnippet. Tous droits réservés.
      </div>
      <div className="flex justify-center gap-6 mt-3 text-sm">
        <span className="text-zinc-400">
          Made by{" "}
          <a
            href="https://elyesasahin.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-500 font-semibold hover:text-indigo-400 transition-colors"
          >
            Spectre
          </a>
        </span>
        <span className="text-zinc-700">|</span>
        <a
          href="https://github.com/Spectrenard/CodeSnippet"
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-500 font-semibold hover:text-indigo-400 transition-colors"
        >
          ⭐ Contribuer au projet
        </a>
      </div>
    </footer>
  );
}
