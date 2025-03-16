// 共通タイプ定義
export type Difficulty = "beginner" | "intermediate" | "advanced";

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
  level: string; // "基礎" | "発展"
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
  difficulty?: Difficulty;
  relatedTests?: Test[];
  relatedExercises?: Exercise[];
}

export type BlogResponse = MicroCMSResponse<Blog>;

// テスト
export interface Test extends MicroCMSContent {
  title: string;
  question: string;
  answerOptions: string;
  category?: Category;
  relatedBlogs?: Blog[];
  difficulty?: Difficulty;
}

export type TestResponse = MicroCMSResponse<Test>;

// 演習
export interface Exercise extends MicroCMSContent {
  title: string;
  slug: string;
  description: string;
  difficulty: Difficulty;
  estimatedTime: string;
  tags: string;
  repositoryUrl: string;
  repositoryName: string;
  issueNumbers: string;
  imageUrl?: string;
  isPublished: boolean;
  category?: Category;
  relatedBlogs?: Blog[];
}

export type ExerciseResponse = MicroCMSResponse<Exercise>;
