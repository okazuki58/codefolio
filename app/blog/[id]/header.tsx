import { BiCalendar } from "react-icons/bi";
import { Blog } from "@/types/blogs";
import QuizButton from "@/app/components/quiz-button";

interface BlogHeaderProps {
  blog: Blog;
}

export function BlogHeader({ blog }: BlogHeaderProps) {
  return (
    <div className="px-4 sm:px-6 md:px-10 mt-4 md:mt-5">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            {blog.title}
          </h1>
          <div className="flex flex-wrap items-center mt-2 gap-3">
            {blog.category && (
              <span className="bg-blue-600 text-white text-xs px-5 py-1 rounded">
                {blog.category.name}
              </span>
            )}
            <span className="text-sm text-gray-500 flex items-center">
              <BiCalendar className="mr-1" />
              {new Date(blog.publishedAt).toLocaleDateString("ja-JP")}
            </span>
          </div>
        </div>
        <div className="md:w-64">
          <QuizButton categoryId={blog.category?.id} />
        </div>
      </div>
    </div>
  );
}
