import Link from "next/link";
import BookCard from "@/components/BookCard";
import { apiGet } from "@/lib/api";
import type { BookWithCategory, Category } from "@/lib/types";

export default async function Home() {
  const [categories, latest] = await Promise.all([
    apiGet<Category[]>("/categories"),
    apiGet<BookWithCategory[]>("/books?limit=4"),
  ]);

  return (
    <div className="space-y-12">
      <section>
        <h1 className="mb-6 font-serif text-3xl font-bold">Browse by Category</h1>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {(categories ?? []).map((c) => (
            <Link
              key={c.id}
              href={`/categories/${c.slug}`}
              className="rounded-xl border border-stone-200 bg-white p-6 transition hover:border-amber-400 hover:shadow-md"
            >
              <h2 className="font-semibold">{c.name}</h2>
              <p className="text-sm text-stone-500">{c.bookCount} books</p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-6 font-serif text-2xl font-bold">New Arrivals</h2>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {(latest ?? []).map((b) => (
            <BookCard key={b.id} {...b} />
          ))}
        </div>
      </section>
    </div>
  );
}
