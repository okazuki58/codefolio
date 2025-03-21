import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 認証が必要なパス
const authRequiredPaths = ["/settings", "/profile", "/subscription/cancel"];

// ログイン済みユーザーがアクセスできないパス
const noAuthPaths = ["/auth/signin", "/auth/register"];

export function middleware(request: NextRequest) {
  // 現在のパス
  const path = request.nextUrl.pathname;

  // セッションCookieをチェック
  const possibleSessionCookies = [
    "next-auth.session-token",
    "__Secure-next-auth.session-token",
  ];

  // いずれかのセッションCookieが存在する場合、認証されているとみなす
  const isAuthenticated = possibleSessionCookies.some((cookieName) =>
    request.cookies.has(cookieName)
  );

  // 認証が必要なページに未ログインでアクセスした場合
  if (
    !isAuthenticated &&
    authRequiredPaths.some((authPath) => path.startsWith(authPath))
  ) {
    // リダイレクトURLを確実に生成
    const redirectUrl = new URL("/auth/signin", request.url);
    return NextResponse.redirect(redirectUrl);
  }

  // ログイン済みユーザーが認証ページにアクセスした場合
  if (isAuthenticated && noAuthPaths.includes(path)) {
    // 完全一致のみをチェック
    const profileUrl = new URL("/profile", request.url);
    return NextResponse.redirect(profileUrl);
  }

  return NextResponse.next();
}

// ミドルウェアを適用するパスを指定
export const config = {
  matcher: [
    "/settings/:path*",
    "/profile/:path*",
    "/subscription/:path*",
    "/auth/signin",
    "/auth/register",
  ],
};
