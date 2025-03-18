export function BlogDetailSkeleton() {
  return (
    <div className="max-w-4xl mx-auto animate-pulse">
      <div className="h-10 bg-gray-200 rounded mb-4 w-3/4"></div>

      <div className="flex gap-4 mb-6">
        <div className="h-5 bg-gray-200 rounded w-24"></div>
        <div className="h-5 bg-gray-200 rounded w-24"></div>
      </div>

      <div className="aspect-video w-full bg-gray-200 rounded-lg mb-8"></div>

      <div className="space-y-4">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-4/5"></div>
      </div>
    </div>
  );
}
