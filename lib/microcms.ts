import { createClient } from "microcms-js-sdk";

export const client = createClient({
  serviceDomain: "qerl71031i",
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
