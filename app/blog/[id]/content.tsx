"use client";

import { useEffect, useState } from "react";
import Feedback from "@/app/components/feedback";
import QuizButton from "@/app/components/quiz-button";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { createRoot } from "react-dom/client";
import { Session } from "next-auth";

interface BlogContentProps {
  content: string;
  categoryId?: string;
  contentId: string;
  session: Session | null;
}

export default function BlogContent({
  content,
  categoryId,
  contentId,
  session,
}: BlogContentProps) {
  const [processedContent, setProcessedContent] = useState(content);

  // コンテンツに構文ハイライトを追加する処理
  useEffect(() => {
    if (!content) return;

    // HTMLを解析するための一時コンテナを作成
    const container = document.createElement("div");
    container.innerHTML = content;

    // すべてのpre-codeブロックを見つけて構文ハイライト版に置き換える
    const codeBlocks = container.querySelectorAll("pre code");
    codeBlocks.forEach((codeBlock) => {
      // クラスから言語を取得（例: "language-javascript"）
      const classNames = codeBlock.className.split(" ");
      const languageClass = classNames.find((c) => c.startsWith("language-"));
      const language = languageClass
        ? languageClass.replace("language-", "")
        : "text";

      // コードコンテンツを取得
      const code = codeBlock.textContent || "";

      // 元のpre要素を置き換えるためのラッパーを作成
      const wrapper = document.createElement("div");
      wrapper.className = "syntax-highlighter-wrapper";
      wrapper.setAttribute("data-language", language);
      wrapper.setAttribute("data-code", encodeURIComponent(code));

      // 元のpre要素をラッパーで置き換え
      const preElement = codeBlock.parentElement;
      if (preElement?.parentElement) {
        preElement.parentElement.replaceChild(wrapper, preElement);
      }
    });

    // インラインコードの処理は不要（globals.cssで対応済み）

    setProcessedContent(container.innerHTML);
  }, [content]);

  // 構文ハイライト付きのコードブロックをレンダリング
  useEffect(() => {
    if (!processedContent) return;

    const wrappers = document.querySelectorAll(".syntax-highlighter-wrapper");
    wrappers.forEach((wrapper) => {
      const language = wrapper.getAttribute("data-language") || "text";
      const code = decodeURIComponent(wrapper.getAttribute("data-code") || "");

      // 構文ハイライト用のReact要素を作成
      const syntaxElement = document.createElement("div");
      wrapper.appendChild(syntaxElement);

      // 構文ハイライトコンポーネントをレンダリング
      const reactRoot = createRoot(syntaxElement);
      reactRoot.render(
        <div className="rounded-md overflow-hidden my-4">
          <div className="flex items-center justify-between px-4 py-2 bg-gray-800 text-gray-200">
            <span className="text-xs font-medium">{language}</span>
            <button
              onClick={() => navigator.clipboard.writeText(code)}
              className="text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded transition-colors"
            >
              コピー
            </button>
          </div>
          <SyntaxHighlighter
            language={language}
            style={atomDark}
            customStyle={{ margin: 0, borderRadius: "0 0 0.375rem 0.375rem" }}
            codeTagProps={{
              style: {
                fontFamily:
                  'Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
              },
            }}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      );
    });
  }, [processedContent]);

  return (
    <div className="blog-content">
      <div
        className="prose prose-lg max-w-none leading-relaxed mb-10"
        dangerouslySetInnerHTML={{ __html: processedContent }}
      />
      {categoryId && <QuizButton categoryId={categoryId} />}
      <Feedback contentId={contentId} session={session} />
    </div>
  );
}
