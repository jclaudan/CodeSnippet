const LoadingHub = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-2">
        <div className="animate-pulse h-6 w-48 bg-gray-200 rounded"></div>
        <div className="animate-pulse h-6 w-24 bg-gray-200 rounded-full"></div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <div className="animate-pulse w-8 h-8 bg-gray-200 rounded-full"></div>
        <div className="animate-pulse h-4 w-32 bg-gray-200 rounded"></div>
      </div>

      <div className="mt-4">
        <div className="animate-pulse h-40 bg-gray-200 rounded"></div>
      </div>

      <div className="mt-4">
        <div className="animate-pulse h-10 w-24 bg-gray-200 rounded-full"></div>
      </div>
    </div>
  );
};

export default LoadingHub;
