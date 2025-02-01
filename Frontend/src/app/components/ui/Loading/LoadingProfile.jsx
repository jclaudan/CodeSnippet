export default function LoadingProfile() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-10 px-24 transform transition-all duration-300">
      <div className="h-8 bg-gray-200 rounded-lg w-1/3 mx-auto mb-8 animate-pulse"></div>

      <div className="flex flex-col items-center mb-8">
        <div className="w-32 h-32 rounded-full bg-gray-200 animate-pulse mb-6"></div>
        <div className="h-6 bg-gray-200 rounded w-48 animate-pulse mb-3"></div>
        <div className="h-4 bg-gray-200 rounded w-64 animate-pulse"></div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <div className="h-8 bg-gray-200 rounded-lg w-48 animate-pulse mb-6"></div>
        <div className="space-y-6 bg-gray-50 rounded-lg p-6">
          <div className="flex items-center space-x-4">
            <div className="h-4 bg-gray-200 rounded w-40 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="h-4 bg-gray-200 rounded w-40 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
