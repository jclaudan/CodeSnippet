const LoadingHome = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="animate-pulse h-6 w-48 bg-gray-200 rounded"></div>
            <div className="animate-pulse h-6 w-24 bg-gray-200 rounded-full"></div>
          </div>
          <div className="mt-4">
            <div className="animate-pulse h-32 bg-gray-200 rounded"></div>
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <div className="animate-pulse h-8 w-20 bg-gray-200 rounded"></div>
            <div className="animate-pulse h-8 w-20 bg-gray-200 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingHome;
