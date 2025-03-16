"use client";

import { useState } from "react";
import { BiMessageDetail } from "react-icons/bi";

export default function Feedback() {
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const handleFeedback = (type: "positive" | "negative" | "message") => {
    console.log(`Feedback received: ${type}`);
    // 実際の実装では、フィードバックをバックエンドに送信します
    setFeedbackSubmitted(true);
  };

  return (
    <div className="text-center">
      <p className="text-gray-500 mb-2">この説明はわかりやすかったですか？</p>
      {!feedbackSubmitted ? (
        <div className="flex justify-center gap-2">
          <button
            className="w-[30px] h-[30px] rounded-full border border-green-500 text-green-500 flex items-center justify-center"
            onClick={() => handleFeedback("positive")}
            aria-label="役に立った"
          ></button>
          <button
            className="w-[30px] h-[30px] rounded-full border border-red-500 text-red-500 flex items-center justify-center"
            onClick={() => handleFeedback("negative")}
            aria-label="役に立たなかった"
          ></button>
          <button
            className="h-[30px] px-3 rounded-full border border-gray-200 text-gray-500 flex items-center justify-center gap-1"
            onClick={() => handleFeedback("message")}
          >
            <BiMessageDetail aria-hidden="true" />
            <span>フィードバック</span>
          </button>
        </div>
      ) : (
        <p className="text-green-600">ご意見ありがとうございました！</p>
      )}
    </div>
  );
}
