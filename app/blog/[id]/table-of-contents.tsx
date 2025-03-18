"use client";

import { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";

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

    if (headingElements.length === 0) return;

    // IntersectionObserverのコールバック関数
    const callback: IntersectionObserverCallback = (entries) => {
      // 画面内に入った要素を抽出
      const visibleHeadings = entries
        .filter((entry) => entry.isIntersecting)
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
      rootMargin: "-80px 0px -40% 0px",
      threshold: 0.1,
    });

    // 見出し要素の監視を開始
    headingElements.forEach((element) => observer.observe(element));

    // 初期状態でアクティブな項目を設定（最初の要素）
    if (headingElements.length > 0 && !activeId) {
      setActiveId(headingElements[0].id);
    }

    // クリーンアップ関数
    return () => {
      headingElements.forEach((element) => observer.unobserve(element));
      observer.disconnect();
    };
  }, [items, activeId]);

  return (
    <>
      {/* Mobile Table of Contents Toggle */}
      <div className="lg:hidden">
        <details className="bg-gray-50 rounded p-4 w-full">
          <summary className="font-bold text-gray-800 cursor-pointer flex items-center justify-between">
            <span>目次を表示</span>
            <BiChevronDown className="text-xl" />
          </summary>
          <nav className="flex flex-col space-y-4 mt-4">
            {items.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => handleLinkClick(item.id)}
                className={`text-sm transition-colors ${
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
              className={`text-sm transition-colors ${
                activeId === item.id
                  ? "text-blue-600 font-medium"
                  : "text-gray-500 hover:text-gray-700"
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
