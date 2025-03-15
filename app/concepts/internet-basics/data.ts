export const articleData = {
  title: "インターネットの仕組み",
  category: "コンピュータ基礎",
  learningTime: 30,
  tableOfContents: [
    { id: "section-1", title: "1. インターネットとは", isActive: true },
    { id: "section-2", title: "2. クライアント・サーバーモデル" },
    { id: "section-3", title: "3. IPアドレスとドメイン名" },
    { id: "section-4", title: "4. HTTPとHTTPSの違い" },
    { id: "section-5", title: "5. ブラウザの役割" },
    { id: "section-6", title: "6. ウェブページの表示手順" },
  ],
  relatedConcepts: [
    { title: "HTML/CSSの基本" },
    { title: "WebAPI入門" },
    { title: "セキュリティの基礎" },
  ],
  relatedTasks: [{ title: "#1 HTML/CSS基礎" }, { title: "#4 Node.js基礎" }],
};
