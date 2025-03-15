interface TableOfContentsProps {
  items: {
    id: string;
    title: string;
    isActive?: boolean;
  }[];
  relatedConcepts: {
    title: string;
  }[];
  relatedTasks: {
    title: string;
  }[];
}

export default function TableOfContents({
  items,
  relatedConcepts,
  relatedTasks,
}: TableOfContentsProps) {
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

        <hr className="my-5 border-gray-200" />

        <h3 className="text-gray-500 text-sm mb-3">関連する概念</h3>
        <ul className="space-y-3">
          {relatedConcepts.map((concept, index) => (
            <li key={index} className="text-gray-500 text-xs ml-2">
              • {concept.title}
            </li>
          ))}
        </ul>

        <hr className="my-5 border-gray-200" />

        <h3 className="text-gray-500 text-sm mb-3">関連する課題</h3>
        <ul className="space-y-3">
          {relatedTasks.map((task, index) => (
            <li key={index} className="text-gray-500 text-xs ml-2">
              • {task.title}
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}
