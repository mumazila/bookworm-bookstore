import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const data = [
  {
    name: "Fiction",
    slug: "fiction",
    books: [
      { title: "The Midnight Library", author: "Matt Haig", price: 1299, year: 2020 },
      { title: "Pachinko", author: "Min Jin Lee", price: 1499, year: 2017 },
      { title: "Circe", author: "Madeline Miller", price: 1399, year: 2018 },
    ],
  },
  {
    name: "Science & Technology",
    slug: "science-technology",
    books: [
      { title: "A Brief History of Time", author: "Stephen Hawking", price: 1199, year: 1988 },
      { title: "The Pragmatic Programmer", author: "Hunt & Thomas", price: 4499, year: 2019 },
    ],
  },
  {
    name: "Self-Help",
    slug: "self-help",
    books: [
      { title: "Atomic Habits", author: "James Clear", price: 1599, year: 2018 },
      { title: "Deep Work", author: "Cal Newport", price: 1499, year: 2016 },
    ],
  },
  {
    name: "History",
    slug: "history",
    books: [
      { title: "Sapiens", author: "Yuval Noah Harari", price: 1799, year: 2011 },
      { title: "Guns, Germs, and Steel", author: "Jared Diamond", price: 1699, year: 1997 },
    ],
  },
];

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

async function main() {
  await prisma.book.deleteMany();
  await prisma.category.deleteMany();

  for (const c of data) {
    await prisma.category.create({
      data: {
        name: c.name,
        slug: c.slug,
        books: {
          create: c.books.map((b) => ({
            ...b,
            slug: slugify(b.title),
            description: `${b.title} by ${b.author}. A well-loved title in our ${c.name} collection.`,
            stock: 25,
          })),
        },
      },
    });
  }
  console.log("Seeded.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
