# codefolio

プログラミング学習を次のレベルへ。実務で通用するエンジニアスキルを体系的に習得できる学習プラットフォーム。

## 概要

codefolioは、プログラミングの基礎から実践まで段階的に学べる学習プラットフォームです。理論的な知識だけでなく、実際の開発現場で役立つスキルを効率的に身につけることを目的としています。

## 特徴

### 基礎学習
プログラミングの基礎概念を学習ドキュメントで理解します。わかりやすい説明と実例で、初心者でも安心して学べます。各トピックは実務で使える知識を中心に構成されています。

### 理解度テスト
学んだ内容の理解度を確認するテストに取り組みます。苦手な部分を特定し、効率的に学習を進めることができます。各テストは実践的な問題で構成され、実務に即した応用力を養います。

### 実践課題
実際のプロジェクトを想定した課題に取り組みます。GitHub連携により、実務の開発フローを体験できます。チーム開発に必要なコミュニケーションやコードレビューの流れも学べます。

### 振り返りと評価
提出した課題の評価とフィードバックを受け取ります。改善点を把握し、次の学習に活かすことができます。現役エンジニアからの具体的なアドバイスが成長を加速させます。

## 技術スタック

- **フロントエンド**: Next.js 15, React 19, Tailwind CSS
- **バックエンド**: Next.js API Routes
- **データベース**: Prisma ORM
- **認証**: NextAuth.js (GitHub認証)
- **CMS**: microCMS
- **テスト**: Jest

## セットアップ

### 前提条件
- Node.js 20.x 以上
- npm 10.x 以上

### インストール

```
# リポジトリのクローン
git clone https://github.com/your-username/codefolio.git
cd codefolio
```
```
# 依存関係のインストール
npm install
```
```
# 環境変数のセットアップ
cp .env.example .env.local
# .env.localを編集して必要な環境変数を設定してください
```

### 環境変数の設定

以下の環境変数を設定する必要があります：

- NEXTAUTH_URL: アプリケーションのURL
- NEXTAUTH_SECRET: NextAuthのシークレットキー
- GITHUB_CLIENT_ID: GitHub OAuth App のクライアントID
- GITHUB_CLIENT_SECRET: GitHub OAuth App のクライアントシークレット
- MICROCMS_SERVICE_DOMAIN: microCMSのサービスドメイン
- MICROCMS_API_KEY: microCMSのAPIキー
- DATABASE_URL: データベース接続文字列

### 開発サーバーの起動
```
npm run dev
```

## 開発コマンド
```
- npm run dev: 開発サーバーを起動 (Turbopack使用)
- npm run build: 本番用ビルドを生成
- npm run start: 本番用サーバーを起動
- npm run lint: コードリントを実行
- npm run test: テストを実行
- npm run test:watch: 監視モードでテストを実行
- npm run import: テストデータをインポート
- npm run importprod: 本番環境にテストデータをインポート
```
## ライセンス

[MIT](LICENSE)

## コントリビューション

プルリクエストは大歓迎です。大きな変更を行う場合は、まずissueを開いて議論してください。