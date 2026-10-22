import { NextRequest, NextResponse } from "next/server";

/**
 * This API emulates an Express-style REST API for learning purposes.
 * The frontend playground calls it with a ?target= query (e.g. /books, /books/2)
 * and this route mirrors exactly what the corresponding Express code does,
 * including status codes (200/201/204/400/404).
 *
 * Data is kept in memory, so it resets when the server restarts.
 * That is intentional and mentioned in the playground UI.
 */

interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
}

let books: Book[] = [
  { id: 1, title: "পথের পাঁচালী", author: "বিভূতিভূষণ বন্দ্যোপাধ্যায়", year: 1929 },
  { id: 2, title: "লালসালু", author: "সৈয়দ ওয়ালীউল্লাহ", year: 1948 },
  { id: 3, title: "পদ্মা নদীর মাঝি", author: "মানিক বন্দ্যোপাধ্যায়", year: 1936 },
];
let nextId = 4;

function parseTarget(target: string): { path: string; id: number | null } {
  const parts = target.replace(/\/+$/, "").split("/").filter(Boolean);
  // parts[0] should be "books"
  const id = parts[1] ? Number(parts[1]) : null;
  return { path: "/" + (parts[0] || ""), id };
}

export async function GET(req: NextRequest) {
  const { path, id } = parseTarget(req.nextUrl.searchParams.get("target") || "/books");

  if (path === "/books") {
    if (id === null) {
      return NextResponse.json(books, { status: 200 });
    }
    const book = books.find((b) => b.id === id);
    if (!book) {
      return NextResponse.json({ error: id + " নম্বর বইটি খুঁজে পাওয়া যায়নি!" }, { status: 404 });
    }
    return NextResponse.json(book, { status: 200 });
  }

  return NextResponse.json({ error: "রাস্তাটি খুঁজে পাওয়া যায়নি: GET " + path }, { status: 404 });
}

export async function POST(req: NextRequest) {
  const { path, id } = parseTarget(req.nextUrl.searchParams.get("target") || "/books");

  if (path === "/books" && id === null) {
    let body: Partial<Book>;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "বডি পার্স করা যায়নি — JSON সিনট্যাক্স চেক করুন" }, { status: 400 });
    }

    const { title, author, year } = body;
    if (!title || !author) {
      return NextResponse.json({ error: "title ও author দুটোই দিতে হবে!" }, { status: 400 });
    }

    const book: Book = {
      id: nextId++,
      title: String(title),
      author: String(author),
      year: Number(year) || new Date().getFullYear(),
    };
    books.push(book);
    return NextResponse.json(book, { status: 201 });
  }

  return NextResponse.json({ error: "রাস্তাটি খুঁজে পাওয়া যায়নি: POST " + path }, { status: 404 });
}

export async function PUT(req: NextRequest) {
  const { path, id } = parseTarget(req.nextUrl.searchParams.get("target") || "/books");

  if (path === "/books" && id !== null) {
    const book = books.find((b) => b.id === id);
    if (!book) {
      return NextResponse.json({ error: id + " নম্বর বইটি খুঁজে পাওয়া যায়নি!" }, { status: 404 });
    }

    let body: Partial<Book>;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "বডি পার্স করা যায়নি — JSON সিনট্যাক্স চেক করুন" }, { status: 400 });
    }

    book.title = body.title ? String(body.title) : book.title;
    book.author = body.author ? String(body.author) : book.author;
    book.year = body.year ? Number(body.year) : book.year;
    return NextResponse.json(book, { status: 200 });
  }

  return NextResponse.json({ error: "রাস্তাটি খুঁজে পাওয়া যায়নি: PUT " + path }, { status: 404 });
}

export async function DELETE(req: NextRequest) {
  const { path, id } = parseTarget(req.nextUrl.searchParams.get("target") || "/books");

  if (path === "/books" && id !== null) {
    const exists = books.some((b) => b.id === id);
    if (!exists) {
      return NextResponse.json({ error: id + " নম্বর বইটি খুঁজে পাওয়া যায়নি!" }, { status: 404 });
    }
    books = books.filter((b) => b.id !== id);
    return new NextResponse(null, { status: 204 });
  }

  return NextResponse.json({ error: "রাস্তাটি খুঁজে পাওয়া যায়নি: DELETE " + path }, { status: 404 });
}
