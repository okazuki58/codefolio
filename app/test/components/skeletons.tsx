export function TestCategoriesSkeleton() {
  return (
    <div className="space-y-10">
      {/* 基礎セクション */}
      <div>
        <h2 className="text-xl font-bold mb-4 text-gray-800 border-l-4 border-blue-500 pl-3">
          基礎
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <CategoryCardSkeleton key={i} />
          ))}
        </div>
      </div>

      {/* 発展セクション */}
      <div>
        <h2 className="text-xl font-bold mb-4 text-gray-800 border-l-4 border-purple-500 pl-3">
          発展
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[...Array(2)].map((_, i) => (
            <CategoryCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

function CategoryCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 w-full overflow-hidden">
      <div className="w-full flex items-center">
        <div className="p-3 rounded-full mr-3 flex-shrink-0 bg-gray-100">
          <div className="w-5 h-5 rounded-full bg-gray-200"></div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-2">
            <div className="h-6 bg-gray-200 rounded-md w-36 mb-2"></div>
          </div>
          <div className="h-4 bg-gray-200 rounded-md w-48"></div>
        </div>
      </div>
    </div>
  );
}
