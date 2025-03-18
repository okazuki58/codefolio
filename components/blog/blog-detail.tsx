"use client";

import { Blog } from "@/types";
import Image from "next/image";
import { format } from "date-fns";
import { BiCalendar, BiFolder } from "react-icons/bi";

interface BlogDetailProps {
  blog: Blog;
}

export function BlogDetail({ blog }: BlogDetailProps) {
  return (
    <article className="max-w-4xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">{blog.title}</h1>

      <div className="flex items-center gap-4 text-gray-600 mb-6">
        {blog.publishedAt && (
          <div className="flex items-center gap-1">
            <BiCalendar />
            <time dateTime={blog.publishedAt}>
              {format(new Date(blog.publishedAt), "yyyy.MM.dd")}
            </time>
          </div>
        )}

        {blog.category && (
          <div className="flex items-center gap-1">
            <BiFolder />
            <span>{blog.category.name}</span>
          </div>
        )}
      </div>

      {blog.eyecatch && (
        <div className="mb-8 relative aspect-video w-full">
          <Image
            src={blog.eyecatch.url}
            alt={blog.title}
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>
      )}

      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </article>
  );
}
