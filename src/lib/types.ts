// types.ts
export interface Book {
  key: string;
  title: string;
  authorName: string;
  firstPublishYear: number;
  subject: string;
  authorBirthdate?: string;
  authorTopWork?: string;
}

export type Order = "asc" | "desc";
