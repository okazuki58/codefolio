"use client";

import { useEffect, useState } from "react";

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
  const [activeId, setActiveId] = useState<string>("");

  // クリック時にアクティブIDを設定するハンドラー
  const handleLinkClick = (id: string) => {
    setActiveId(id);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    // 監視する見出し要素の取得
    const headingElements = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    // IntersectionObserverのコールバック関数
    const callback: IntersectionObserverCallback = (entries) => {
      // 画面内に入った要素を抽出
      const visibleHeadings = entries
        .filter(
          (entry) => entry.isIntersecting && entry.intersectionRatio >= 0.5
        )
        .map((entry) => entry.target)
        .sort(
          (a, b) =>
            (a.getBoundingClientRect().top || 0) -
            (b.getBoundingClientRect().top || 0)
        );

      // 表示されている最も上の見出しをアクティブにする
      if (visibleHeadings.length > 0) {
        setActiveId(visibleHeadings[0].id);
      }
    };

    // IntersectionObserverの設定
    const observer = new IntersectionObserver(callback, {
      rootMargin: "-100px 0px -50% 0px",
      threshold: [0.5, 1.0],
    });

    // 見出し要素の監視を開始
    headingElements.forEach((element) => observer.observe(element));

    // クリーンアップ関数
    return () => {
      headingElements.forEach((element) => observer.unobserve(element));
      observer.disconnect();
    };
  }, [items]);

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
                onClick={() => handleLinkClick(item.id)}
                className={`text-sm ${
                  activeId === item.id
                    ? "text-blue-600 font-medium"
                    : "text-gray-500"
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
              onClick={() => handleLinkClick(item.id)}
              className={`text-sm transition-colors duration-200 ${
                activeId === item.id
                  ? "text-blue-600 font-medium"
                  : "text-gray-500"
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
