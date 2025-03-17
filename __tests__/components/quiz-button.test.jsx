import { render, screen } from "@testing-library/react";
import QuizButton from "@/app/components/quiz-button";

// Next.jsのLinkコンポーネントをモック
jest.mock("next/link", () => {
  return ({ children, href }) => {
    return <a href={href}>{children}</a>;
  };
});

describe("QuizButton", () => {
  it("正しいURLとテキストでレンダリングされる", () => {
    const categoryId = "test-category-id";
    render(<QuizButton categoryId={categoryId} />);

    const button = screen.getByRole("button", {
      name: /理解度チェッククイズに挑戦/i,
    });
    expect(button).toBeInTheDocument();

    const link = button.closest("a");
    expect(link).toHaveAttribute("href", `/test/category/${categoryId}`);
  });

  it("categoryIdがない場合、テスト一覧ページへのリンクになる", () => {
    render(<QuizButton />);

    const button = screen.getByRole("button", {
      name: /理解度チェッククイズに挑戦/i,
    });
    const link = button.closest("a");
    expect(link).toHaveAttribute("href", "/test");
  });
});
