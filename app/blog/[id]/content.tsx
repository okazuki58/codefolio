"use client";

import { useEffect } from "react";
import Feedback from "@/app/components/feedback";
import QuizButton from "@/app/components/quiz-button";

interface BlogContentProps {
  content: string;
  categoryId?: string;
}

export default function BlogContent({ content, categoryId }: BlogContentProps) {
  // Add syntax highlighting if needed
  useEffect(() => {
    // Load any client-side scripts for content if needed
  }, []);

  return (
    <div className="blog-content">
      <div
        className="prose prose-lg max-w-none leading-relaxed mb-10"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <QuizButton categoryId={categoryId} />
      <Feedback />
    </div>
  );
}
