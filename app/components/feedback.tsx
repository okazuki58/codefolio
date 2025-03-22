"use client";

import { useState, useEffect } from "react";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { Session } from "next-auth";

interface FeedbackProps {
  contentId: string; // 記事ID
  session: Session | null;
}

export default function Feedback({ contentId, session }: FeedbackProps) {
  const userId = session?.user?.id || null;

  const [liked, setLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // コンポーネントマウント時、ユーザーが既にいいねしているか確認
  useEffect(() => {
    const checkLikedStatus = async () => {
      // 認証済みユーザーの場合、APIでいいね状態を確認
      if (userId) {
        try {
          const response = await fetch(`/api/likes?contentId=${contentId}`);
          if (response.ok) {
            const data = await response.json();
            setLiked(data.liked);
          }
        } catch (error) {
          console.error("Failed to fetch like status:", error);
        }
      } else {
        // 未認証ユーザーの場合、ローカルストレージで確認
        const localLiked = localStorage.getItem(`liked_blog_${contentId}`);
        setLiked(localLiked === "true");
      }
    };

    checkLikedStatus();
  }, [contentId, userId]);

  const handleLike = async () => {
    if (isLoading) return;

    setIsLoading(true);
    const newLikedState = !liked;

    try {
      if (userId) {
        // 認証済みユーザー: APIを使用していいね情報を保存
        const response = await fetch("/api/likes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contentId,
            liked: newLikedState,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to save like");
        }
      } else {
        // 未認証ユーザー: ローカルストレージに保存
        localStorage.setItem(`liked_blog_${contentId}`, String(newLikedState));
      }

      setLiked(newLikedState);
    } catch (error) {
      console.error("Failed to toggle like:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-6 border-t border-gray-100 pt-4">
      <div className="flex items-center justify-between">
        <p className="text-gray-500 text-sm">この内容は役に立ちましたか？</p>

        <button
          onClick={handleLike}
          disabled={isLoading}
          className={`
            flex items-center gap-1.5 px-4 py-2 rounded-md
            transition-colors duration-200
            ${
              liked
                ? "bg-blue-50 text-blue-600"
                : "bg-gray-50 text-gray-600 hover:bg-gray-100"
            }
            ${isLoading ? "opacity-70 cursor-not-allowed" : ""}
          `}
          aria-label={liked ? "いいねを取り消す" : "いいねする"}
        >
          {liked ? (
            <BiSolidLike className="text-lg" />
          ) : (
            <BiLike className="text-lg" />
          )}
          <span className="font-medium text-sm">
            {liked ? "役に立った" : "役に立つ"}
          </span>
        </button>
      </div>
    </div>
  );
}
