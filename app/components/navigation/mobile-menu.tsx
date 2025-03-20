"use client";

import { useEffect } from "react";
import Link from "next/link";
import { BiX } from "react-icons/bi";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
}

export function MobileMenu({ isOpen, onClose, pathname }: MobileMenuProps) {
  // スクロール禁止を制御
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      <div
        className={`fixed top-0 right-0 h-full w-[280px] bg-white shadow-lg transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-semibold text-gray-800">メニュー</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-md text-gray-500 hover:bg-gray-100"
            aria-label="メニューを閉じる"
          >
            <BiX className="text-xl" />
          </button>
        </div>

        <nav className="p-4">
          <ul className="space-y-3">
            <li>
              <Link
                href="/"
                className={`block px-3 py-2 rounded-md ${
                  isActive("/") ? "bg-blue-50 text-blue-600" : "text-gray-700"
                }`}
              >
                ホーム
              </Link>
            </li>
            <li>
              <Link
                href="/pricing"
                className={`block px-3 py-2 rounded-md ${
                  isActive("/pricing")
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700"
                }`}
              >
                料金プラン
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className={`block px-3 py-2 rounded-md ${
                  isActive("/blog")
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700"
                }`}
              >
                学習ドキュメント
              </Link>
            </li>
            <li>
              <Link
                href="/test"
                className={`block px-3 py-2 rounded-md ${
                  isActive("/test")
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700"
                }`}
              >
                理解度テスト
              </Link>
            </li>
            <li>
              <Link
                href="/exams"
                className={`block px-3 py-2 rounded-md ${
                  isActive("/exams")
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700"
                }`}
              >
                演習問題
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
