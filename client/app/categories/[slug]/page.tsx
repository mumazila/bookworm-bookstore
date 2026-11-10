import Link from "next/link";
import { notFound } from "next/navigation";
import BookCard from "@/components/BookCard";
import { apiGet } from "@/lib/api";
import type { CategoryWithBooks } from "@/lib/types";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await apiGet<CategoryWithBooks>(`/categories/${slug}`);

  if (!category) notFound();

  return (
    <div>
      <Link href="/" className="text-sm text-stone-500 hover:underline">
        ← All categories
      </Link>
      <h1 className="mb-1 mt-2 font-serif text-3xl font-bold">{category.name}</h1>
      <p className="mb-6 text-stone-500">{category.books.length} books</p>

      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {category.books.map((b) => (
          <BookCard key={b.id} {...b} />
        ))}
      </div>
    </div>
  );
}
