export type Difficulty = "beginner" | "intermediate" | "advanced";

export interface Exam {
  id: string;
  title: string;
  slug: string;
  description: string;
  difficulty: Difficulty[];
  estimatedTime: string;
  tags: string;
  repositoryUrl: string;
  repositoryName: string;
  issueNumbers: string;
  imageUrl?: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
}

export interface ExamResponse {
  contents: Exam[];
  totalCount: number;
  offset: number;
  limit: number;
}
