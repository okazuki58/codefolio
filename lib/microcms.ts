import { createClient } from "microcms-js-sdk";
import { Blog, BlogsResponse } from "@/types/blogs";
import { Category, Test } from "@/types/index";
import { Exam, ExamResponse } from "@/types/exams";

// Client setup
export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN || "",
  apiKey: process.env.MICROCMS_API_KEY || "",
});

// Blog related functions
export async function getBlogWithDraftKey(
  contentId: string,
  draftKey?: string
) {
  try {
    const queries = draftKey ? { draftKey } : {};

    const blog = await client.get<Blog>({
      endpoint: "blogs",
      contentId,
      queries,
    });

    return blog;
  } catch (error) {
    console.error("Failed to fetch blog:", error);
    return null;
  }
}

export async function getBlogs(queries?: any): Promise<BlogsResponse> {
  try {
    const response = await client.get<BlogsResponse>({
      endpoint: "blogs",
      queries,
    });
    return response;
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    return { contents: [], totalCount: 0, offset: 0, limit: 10 };
  }
}

// Category related functions
export async function getCategories(queries?: any) {
  try {
    const response = await client.get<{ contents: Category[] }>({
      endpoint: "categories",
      queries: {
        limit: 100,
        ...queries,
      },
    });

    return response;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return { contents: [] };
  }
}

export async function getCategoryById(categoryId: string) {
  try {
    const category = await client.get<Category>({
      endpoint: "categories",
      contentId: categoryId,
    });

    return category;
  } catch (error) {
    console.error("Failed to fetch category:", error);
    return null;
  }
}

// Test related functions
export async function getTestsByCategory(categoryId: string, queries?: any) {
  try {
    const response = await client.get<{ contents: Test[] }>({
      endpoint: "tests",
      queries: {
        filters: `blog_relation[equals]${categoryId}`,
        limit: 100,
        ...queries,
      },
    });

    return response;
  } catch (error) {
    console.error("Failed to fetch tests by category:", error);
    return { contents: [] };
  }
}

// Exam related functions
export async function getExams(queries?: any): Promise<ExamResponse> {
  try {
    const response = await client.get<ExamResponse>({
      endpoint: "exams",
      queries: {
        limit: 20,
        orders: "-publishedAt",
        ...queries,
      },
    });

    return response;
  } catch (error) {
    console.error("Failed to fetch exams:", error);
    return { contents: [], totalCount: 0, offset: 0, limit: 10 };
  }
}

export async function getExamBySlug(slug: string) {
  try {
    const response = await client.get<{ contents: Exam[] }>({
      endpoint: "exams",
      queries: {
        filters: `slug[equals]${slug}`,
        limit: 1,
      },
    });

    if (!response.contents[0]) {
      throw new Error("Exam not found");
    }

    return response.contents[0];
  } catch (error) {
    console.error("Failed to fetch exam by slug:", error);
    throw error;
  }
}

export async function getExamById(examId: string) {
  try {
    const exam = await client.get<Exam>({
      endpoint: "exams",
      contentId: examId,
    });

    return exam;
  } catch (error) {
    console.error("Failed to fetch exam:", error);
    return null;
  }
}
