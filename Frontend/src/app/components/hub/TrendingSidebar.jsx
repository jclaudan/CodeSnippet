const TrendingSidebar = ({ categoryStyles }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow sticky top-4">
      <h2 className="font-bold text-lg text-gray-800 mb-4">Tendances</h2>
      <div className="space-y-3">
        <p className="text-sm text-gray-600">Les catégories populaires :</p>
        {Object.keys(categoryStyles)
          .slice(0, 5)
          .map((cat) => (
            <div key={cat} className="flex items-center justify-between">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${categoryStyles[cat]}`}
              >
                {cat}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TrendingSidebar;
