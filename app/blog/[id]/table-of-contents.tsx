"use client";

interface BlogTableOfContentsProps {
  items: {
    id: string;
    title: string;
    isActive?: boolean;
  }[];
}

export default function BlogTableOfContents({
  items,
}: BlogTableOfContentsProps) {
  return (
    <>
      {/* Mobile Table of Contents Toggle */}
      <div className="lg:hidden">
        <details className="bg-gray-50 rounded p-4 w-full">
          <summary className="font-bold text-gray-800 cursor-pointer">
            目次を表示
          </summary>
          <nav className="flex flex-col space-y-4 mt-4">
            {items.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`text-sm ${
                  item.isActive ? "text-blue-600" : "text-gray-500"
                }`}
              >
                {item.title}
              </a>
            ))}
          </nav>
        </details>
      </div>

      {/* Sidebar Navigation - Desktop */}
      <aside className="hidden lg:block w-full md:w-[320px] bg-gray-50 rounded p-5 h-fit sticky top-[24px] shrink-0">
        <h2 className="font-bold text-gray-800 mb-5">目次</h2>

        <nav className="flex flex-col space-y-4">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`text-sm ${
                item.isActive ? "text-blue-600" : "text-gray-500"
              }`}
            >
              {item.title}
            </a>
          ))}
        </nav>
      </aside>
    </>
  );
}
