export interface MicroCMSContent {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
}

export interface MicroCMSResponse<T> {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
}

// カテゴリ
export interface Category extends MicroCMSContent {
  name: string;
  level: string[]; // 配列に修正
  index: number;
}

// メディア
export interface Media {
  url: string;
  height?: number;
  width?: number;
}

// ブログ
export interface Blog extends MicroCMSContent {
  title: string;
  content: string;
  eyecatch?: Media;
  category?: Category;
  tags?: string;
}

export type BlogResponse = MicroCMSResponse<Blog>;

// テスト
export interface Test extends MicroCMSContent {
  question: string;
  answerOptions: string;
  category?: Category;
}

export type TestResponse = MicroCMSResponse<Test>;

// 演習 (APIでは"exams"という名前)
export interface Exam extends MicroCMSContent {
  title: string;
  slug: string;
  description: string;
  estimatedTime: string;
  tags: string;
  repositoryUrl: string;
  repositoryName: string;
  repositoryUrlAnswer: string;
  issueNumbers: string;
  imageUrl?: string;
  isPublished: boolean;
  category?: Category;
}

export type ExamResponse = MicroCMSResponse<Exam>;
