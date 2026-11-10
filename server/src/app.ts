import cors from "cors";
import express from "express";
import booksRouter from "./routes/books";
import categoriesRouter from "./routes/categories";
import { errorHandler, notFound } from "./middleware/errorHandler";

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL ?? "http://localhost:3000" }));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/categories", categoriesRouter);
app.use("/api/books", booksRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
