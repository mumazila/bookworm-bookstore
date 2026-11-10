export type Category = {
  id: number;
  name: string;
  slug: string;
  bookCount: number;
};

export type Book = {
  id: number;
  title: string;
  slug: string;
  author: string;
  description: string;
  price: number; // cents
  stock: number;
  isbn: string | null;
  year: number | null;
  categoryId: number;
};

export type BookWithCategory = Book & {
  category: { name: string; slug: string };
};

export type CategoryWithBooks = {
  id: number;
  name: string;
  slug: string;
  books: Book[];
};
