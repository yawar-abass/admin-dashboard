// Type definitions
import { Book } from "./types";

interface AuthorDetails {
  birth_date: string;
  top_work: string;
}

// Fetch author details
async function fetchAuthorDetails(authorKey: string): Promise<AuthorDetails> {
  const authorUrl = `https://openlibrary.org/authors/${authorKey}.json`;
  try {
    const response = await fetch(authorUrl);
    if (!response.ok) {
      throw new Error(`Error fetching author details: ${response.statusText}`);
    }
    const authorData = await response.json();
    return {
      birth_date: authorData.birth_date || "Unknown",
      top_work: authorData.top_work || "Unknown",
    };
  } catch (error: any) {
    console.error("Error fetching author details: ", error.message);
    return { birth_date: "Unknown", top_work: "Unknown" };
  }
}

// Fetch books
export async function getBooks(page: number, limit: number): Promise<Book[]> {
  const url = `https://openlibrary.org/search.json?q=subject:science_fiction&limit=${limit}&page=${page}`;

  try {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Error fetching books: ${response.statusText}`);
    }
    const data = await response.json();

    const books: Book[] = await Promise.all(
      data.docs.map(async (book: any): Promise<Book> => {
        const authorKey = book.author_key ? book.author_key[0] : null;
        const authorDetails = authorKey
          ? await fetchAuthorDetails(authorKey)
          : { birth_date: "Unknown", top_work: "Unknown" };
        return {
          key: book.key,
          title: book.title,
          authorName: book.author_name ? book.author_name[0] : "Unknown",
          firstPublishYear: book.first_publish_year,
          subject: book.subject ? book.subject[0] : "Unknown",
          authorBirthdate: authorDetails.birth_date,
          authorTopWork: authorDetails.top_work,
        };
      })
    );
    return books;
  } catch (error: any) {
    console.error("Error fetching books: ", error.message);
    return [];
  }
}
