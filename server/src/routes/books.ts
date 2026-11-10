import { Router } from "express";
import { prisma } from "../lib/prisma";
import { asyncHandler } from "../middleware/asyncHandler";

const router = Router();

// GET /api/books?limit=4  (latest books first)
// Search, filters and sorting are added in Phase 2.
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const raw = Number(req.query.limit);
    const limit = Number.isFinite(raw) && raw > 0 ? Math.min(Math.floor(raw), 50) : 20;

    const books = await prisma.book.findMany({
      orderBy: { createdAt: "desc" },
      take: limit,
      include: { category: { select: { name: true, slug: true } } },
    });

    res.json(books);
  })
);

export default router;
