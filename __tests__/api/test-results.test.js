import { POST } from "@/app/api/test-results/route";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// モックの設定
jest.mock("@/lib/prisma", () => ({
  prisma: {
    testResult: {
      create: jest.fn(),
    },
  },
}));

jest.mock("@/lib/auth", () => ({
  auth: jest.fn(),
}));

jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn().mockImplementation((data, options) => {
      return { data, options };
    }),
  },
}));

// Requestオブジェクトのグローバルモック
global.Request = class MockRequest {
  constructor(url, options = {}) {
    this.url = url;
    this.options = options;
    this.body = options.body;
  }

  async json() {
    return typeof this.body === "string"
      ? JSON.parse(this.body)
      : this.body || {};
  }
};

describe("/api/test-results", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("認証済みユーザーのテスト結果を保存できる", async () => {
    // モックの戻り値を設定
    auth.mockResolvedValue({
      user: { id: "test-user-id" },
    });

    prisma.testResult.create.mockResolvedValue({
      id: "test-result-id",
      userId: "test-user-id",
      categoryId: "test-category",
      score: 8,
      total: 10,
      percentage: 80,
      createdAt: new Date(),
    });

    // リクエストオブジェクトを作成
    const req = new Request("https://example.com/api/test-results", {
      method: "POST",
      body: JSON.stringify({
        categoryId: "test-category",
        score: 8,
        total: 10,
        percentage: 80,
      }),
    });

    // APIハンドラを呼び出す
    await POST(req);

    // 期待されるPrisma呼び出しを検証
    expect(prisma.testResult.create).toHaveBeenCalledWith({
      data: {
        userId: "test-user-id",
        categoryId: "test-category",
        score: 8,
        total: 10,
        percentage: 80,
      },
    });
  });
});
