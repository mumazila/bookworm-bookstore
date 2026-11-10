import Link from "next/link";
import { formatPrice } from "@/lib/format";

type Props = {
  title: string;
  slug: string;
  author: string;
  price: number;
};

export default function BookCard({ title, slug, author, price }: Props) {
  return (
    <Link
      href={`/books/${slug}`}
      className="group block rounded-xl border border-stone-200 bg-white p-4 transition hover:shadow-md"
    >
      <div className="mb-3 flex aspect-[3/4] items-center justify-center rounded-lg bg-gradient-to-br from-amber-100 to-amber-300 p-4 text-center font-serif text-lg font-semibold text-amber-900">
        {title}
      </div>
      <h3 className="font-medium text-stone-900 group-hover:underline">{title}</h3>
      <p className="text-sm text-stone-500">{author}</p>
      <p className="mt-1 font-semibold text-stone-800">{formatPrice(price)}</p>
    </Link>
  );
}
