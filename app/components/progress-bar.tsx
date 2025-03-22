"use client";

import { useEffect, useState } from "react";

export function TopProgressBar() {
  const [visible, setVisible] = useState(false);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    // ルーティング変更開始時のハンドラー
    const handleStart = () => {
      setVisible(true);
      setWidth(0);

      // アニメーションを開始 - 少しずつ進める
      const interval = setInterval(() => {
        setWidth((prevWidth) => {
          // 80%まで徐々に進める
          if (prevWidth < 80) {
            return prevWidth + (80 - prevWidth) / 10 + 1;
          }
          clearInterval(interval);
          return prevWidth;
        });
      }, 100);

      return () => clearInterval(interval);
    };

    // ルーティング変更完了時のハンドラー
    const handleComplete = () => {
      setWidth(100);

      // 完了後、少し待ってから非表示に
      const timeout = setTimeout(() => {
        setVisible(false);
        setWidth(0);
      }, 300);

      return () => clearTimeout(timeout);
    };

    // グローバルなイベントリスナーとして登録
    document.addEventListener("navigationStart", handleStart);
    document.addEventListener("navigationComplete", handleComplete);

    // カスタムイベントを発火して初回表示時にも進捗バーを表示
    const startEvent = new Event("navigationStart");
    document.dispatchEvent(startEvent);

    // 少し後に完了イベントも発火
    const completeTimeout = setTimeout(() => {
      const completeEvent = new Event("navigationComplete");
      document.dispatchEvent(completeEvent);
    }, 1000);

    // クリーンアップ関数
    return () => {
      document.removeEventListener("navigationStart", handleStart);
      document.removeEventListener("navigationComplete", handleComplete);
      clearTimeout(completeTimeout);
    };
  }, []);

  // Next.jsのルーターでページ遷移を監視
  useEffect(() => {
    // カスタムイベント作成
    const createCustomEvent = (name: string) => {
      return new Event(name, { bubbles: true });
    };

    // ページ遷移開始時と完了時のイベント
    const startEvent = createCustomEvent("navigationStart");
    const completeEvent = createCustomEvent("navigationComplete");

    // クリックイベントをリッスン（Next.js App Routerでの代替方法）
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");

      if (
        anchor &&
        anchor.href &&
        anchor.href.startsWith(window.location.origin) &&
        !anchor.target &&
        !anchor.download &&
        !anchor.rel?.includes("external")
      ) {
        document.dispatchEvent(startEvent);
        // 遷移完了を少し遅延させて検出
        setTimeout(() => {
          document.dispatchEvent(completeEvent);
        }, 500);
      }
    };

    // イベントリスナー登録
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed top-0 left-0 h-0.5 bg-blue-600 z-50 shadow-md transition-all duration-300 ease-out"
      style={{
        width: `${width}%`,
        boxShadow: "0 0 10px rgba(59, 130, 246, 0.7)",
      }}
    />
  );
}
