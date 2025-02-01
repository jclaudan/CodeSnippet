export default function UserInfo({ user }) {
  return (
    <div className="border-t border-gray-200 pt-6">
      <h3 className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
        <span className="bg-indigo-100 rounded-lg px-4 py-2">
          Informations de connexion
        </span>
      </h3>
      <div className="space-y-6 bg-gray-50 rounded-lg p-6">
        <div className="flex items-center hover:bg-white p-3 rounded-lg transition-all duration-300">
          <span className="text-gray-600 w-40 font-medium">
            Méthode de connexion:
          </span>
          <span className="font-medium text-indigo-600">
            {user?.googleId ? "Google" : user?.githubId ? "GitHub" : "Email"}
          </span>
        </div>
        <div className="flex items-center hover:bg-white p-3 rounded-lg transition-all duration-300">
          <span className="text-gray-600 w-40 font-medium">Membre depuis:</span>
          <span className="font-medium text-indigo-600">
            {new Date(user?.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}
