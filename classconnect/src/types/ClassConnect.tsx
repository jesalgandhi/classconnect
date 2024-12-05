export type UserRole = "student" | "ta" | "professor";
export type PostType = "question" | "resource";

export interface Post {
  id: number;
  content: string;
  author: string;
  type: PostType;
  role: UserRole;
  image?: string;
}
