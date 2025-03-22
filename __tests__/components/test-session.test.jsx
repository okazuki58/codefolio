import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { TestSession } from "@/app/test/components/TestSession";


// Next.jsのLinkコンポーネントをモック
jest.mock("next/link", () => {
  return ({ children, href }) => {
    return <a href={href}>{children}</a>;
  };
});

// フェッチリクエストのモック
global.fetch = jest.fn();

describe("TestSession", () => {
  const mockTests = [
    {
      id: "test1",
      question: "これはテスト問題ですか？",
      answerOptions: ["はい", "いいえ", "わからない", "回答拒否"],
      correctAnswer: 0,
    },
  ];

  const mockCategory = {
    id: "category1",
    name: "テストカテゴリ",
  };

  // セッションのモックを直接作成
  const unauthenticatedSession = null;
  const authenticatedSession = {
    user: { id: "user-123" },
  };

  beforeEach(() => {
    // fetchのモックをリセット
    fetch.mockReset();
  });

  afterEach(() => {
    // テスト後のクリーンアップ
    jest.clearAllMocks();
  });

  it("テスト開始前の画面が正しく表示される", () => {
    render(
      <TestSession
        tests={mockTests}
        category={mockCategory}
        session={unauthenticatedSession}
      />
    );

    expect(
      screen.getByText("テストカテゴリ - 理解度テスト")
    ).toBeInTheDocument();
    expect(screen.getByText("テストを開始する")).toBeInTheDocument();
    expect(screen.getByText(/問題数:.*問/)).toBeInTheDocument();
  });

  it("テスト開始ボタンをクリックするとテストが開始される", async () => {
    render(
      <TestSession
        tests={mockTests}
        category={mockCategory}
        session={unauthenticatedSession}
      />
    );

    fireEvent.click(screen.getByText("テストを開始する"));

    // 問題が表示されるまで待機
    await waitFor(() => {
      expect(screen.getByText("これはテスト問題ですか？")).toBeInTheDocument();
      expect(screen.getByText("問題 1 / 1")).toBeInTheDocument();
    });
  });

  it("認証済みユーザーがテスト結果を送信できる", async () => {
    // fetchのレスポンスをモック
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: "result-123" }),
    });

    render(
      <TestSession
        tests={mockTests}
        category={mockCategory}
        session={authenticatedSession}
      />
    );

    // テスト開始
    fireEvent.click(screen.getByText("テストを開始する"));

    // 選択肢を選択
    await waitFor(() => {
      expect(screen.getByText("これはテスト問題ですか？")).toBeInTheDocument();
    });

    // 最初の選択肢をクリック
    const options = screen.getAllByRole("button", {
      name: /はい|いいえ|わからない|回答拒否/,
    });
    fireEvent.click(options[0]);

    // 送信ボタンをクリック
    fireEvent.click(screen.getByText("結果を見る"));

    // 結果画面が表示されるまで待機
    await waitFor(() => {
      expect(screen.getByText(/テスト結果/)).toBeInTheDocument();
    });

    // fetch APIが呼び出されたことを確認
    expect(fetch).toHaveBeenCalledWith(
      "/api/test-results",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          "Content-Type": "application/json",
        }),
      })
    );
  });
});
