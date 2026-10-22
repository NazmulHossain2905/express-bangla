// ডকুমেন্টেশনে দেখানো মূল TypeScript উদাহরণগুলোর সংকলন-যাচাই (compile check)
// ts-intro পাঠের সম্পূর্ণ অ্যাপ + ts-types/ts-middleware পাঠের জুতসই অংশ
import express, { type Request, type Response } from "express";

const app = express();
app.use(express.json());

interface Book {
  id: number;
  title: string;
  author: string;
  year?: number;
}

const books: Book[] = [
  { id: 1, title: "পথের পাঁচালী", author: "বিভূতিভূষণ বন্দ্যোপাধ্যায়" },
];

// ts-types পাঠ — Request জেনেরিক
interface IdParam {
  id: string;
}

app.get("/books/:id", (req: Request<IdParam>, res: Response) => {
  const book = books.find((b) => b.id === Number(req.params.id));
  if (!book) {
    res.status(404).json({ error: "বইটি নেই!" });
    return;
  }
  res.json(book);
});

interface CreateBookInput {
  title: string;
  author: string;
  year?: number;
}

app.post(
  "/books",
  (req: Request<{}, {}, CreateBookInput>, res: Response) => {
    const { title, author } = req.body;
    if (!title || !author) {
      res.status(400).json({ error: "দুটোই দরকার" });
      return;
    }
    const book: Book = { id: books.length + 1, ...req.body };
    books.push(book);
    res.status(201).json(book);
  }
);

// ts-middleware পাঠ — AuthUser এক্সটেনশন ব্যবহার (types/express.d.ts দেখুন)
import type { AuthUser } from "./types/express.js";

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

function requireAuth(req: Request, res: Response, next: import("express").NextFunction) {
  const header = req.headers.authorization ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) {
    res.status(401).json({ error: "লগইন করুন" });
    return;
  }
  req.user = { id: 1, email: "rafi@example.com", role: "admin" };
  next();
}

app.get("/me", requireAuth, (req, res) => {
  if (!req.user) {
    res.sendStatus(401);
    return;
  }
  res.json({ id: req.user.id, role: req.user.role });
});

// ts-middleware পাঠ — AppError + errorHandler
class AppError extends Error {
  constructor(
    message: string,
    public readonly status: number = 500
  ) {
    super(message);
    this.name = "AppError";
  }
}

app.get("/boom", async (_req, res) => {
  throw new AppError("যাচাই এরর", 400);
});

app.use(
  (
    err: Error,
    _req: Request,
    res: Response,
    _next: import("express").NextFunction
  ) => {
    const status = err instanceof AppError ? err.status : 500;
    res.status(status).json({ error: err.message });
  }
);

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
  console.log(`TypeScript সার্ভার চলছে http://localhost:${PORT}-এ`);
});
