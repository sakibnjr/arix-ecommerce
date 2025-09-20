export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
      <div className="h-4 w-40 bg-gray-200 rounded mb-6" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <div className="aspect-square bg-gray-200 rounded-xl mb-4" />
          <div className="grid grid-cols-4 gap-3">
            {[1,2,3,4].map((i) => (
              <div key={i} className="aspect-square bg-gray-200 rounded-lg" />
            ))}
          </div>
        </div>
        <div>
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-6" />
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4" />
          <div className="h-24 bg-gray-200 rounded w-full mb-6" />
          <div className="h-12 bg-gray-200 rounded w-full mb-4" />
          <div className="h-12 bg-gray-200 rounded w-full" />
        </div>
      </div>
    </div>
  );
}


