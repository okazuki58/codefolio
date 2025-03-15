import { createClient } from "microcms-js-sdk";

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN || "",
  apiKey: process.env.MICROCMS_API_KEY || "",
});

export async function getBlogWithDraftKey(
  contentId: string,
  draftKey?: string
) {
  try {
    const queries = draftKey ? { draftKey } : {};

    const blog = await client.get({
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

export async function getBlogs(queries?: any) {
  try {
    const response = await client.get({
      endpoint: "blogs",
      queries: {
        limit: 10,
        orders: "-publishedAt",
        ...queries,
      },
    });

    return response;
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    return { contents: [] };
  }
}

// 追加: カテゴリ一覧を取得する関数
export async function getCategories(queries?: any) {
  try {
    const response = await client.get({
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

// 修正: 特定カテゴリに紐づくテスト一覧を取得する関数
export async function getTestsByCategory(categoryId: string, queries?: any) {
  try {
    const response = await client.get({
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

// 追加: 特定のテスト問題を取得する関数
export async function getTestById(testId: string, draftKey?: string) {
  try {
    const queries = draftKey ? { draftKey } : {};

    const test = await client.get({
      endpoint: "tests",
      contentId: testId,
      queries,
    });

    return test;
  } catch (error) {
    console.error("Failed to fetch test:", error);
    return null;
  }
}

// 追加: 特定カテゴリを取得する関数
export async function getCategoryById(categoryId: string) {
  try {
    const category = await client.get({
      endpoint: "categories",
      contentId: categoryId,
    });

    return category;
  } catch (error) {
    console.error("Failed to fetch category:", error);
    return null;
  }
}
