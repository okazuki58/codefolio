/**
 * GitHub APIとの連携を行うユーティリティ関数
 */

// GitHub API の基本URL
const GITHUB_API_BASE = "https://api.github.com";

// GitHub API リクエストオプションの型定義
interface GitHubApiOptions extends RequestInit {
  headers?: Record<string, string>;
}

/**
 * GitHub APIを呼び出す汎用関数
 */
export async function callGitHubAPI(
  endpoint: string,
  options: GitHubApiOptions = {}
) {
  const token = process.env.GITHUB_API_TOKEN;

  if (!token) {
    throw new Error("GitHub API token is not configured");
  }

  const defaultOptions = {
    method: "GET",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
    },
  };

  const fetchOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  const response = await fetch(`${GITHUB_API_BASE}${endpoint}`, fetchOptions);

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    console.error("GitHub API error:", errorData);
    throw new Error(
      `GitHub API error: ${response.status} ${response.statusText}`
    );
  }

  return response.status === 204 ? {} : response.json();
}

/**
 * GitHubユーザーを組織に招待する
 */
export async function inviteUserToOrganization(username: string) {
  const org = process.env.GITHUB_ORGANIZATION;

  if (!org) {
    throw new Error("GitHub organization is not configured");
  }

  return callGitHubAPI(`/orgs/${org}/memberships/${username}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      role: "member",
    }),
  });
}

/**
 * GitHubのユーザー情報を取得する
 */
export async function getGitHubUserByProviderId(providerAccountId: string) {
  return callGitHubAPI(`/user/${providerAccountId}`);
}

/**
 * GitHubユーザーを組織から削除する
 */
export async function removeUserFromOrganization(username: string) {
  const org = process.env.GITHUB_ORGANIZATION;

  if (!org) {
    throw new Error("GitHub organization is not configured");
  }

  return callGitHubAPI(`/orgs/${org}/memberships/${username}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
