"use client";

import { useState } from "react";
import {
  Braces,
  Clock3,
  FlaskConical,
  Loader2,
  Play,
  RotateCcw,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { CodeBlock } from "./code-block";

type Method = "GET" | "POST" | "PUT" | "DELETE";

const METHOD_COLORS: Record<Method, string> = {
  GET: "bg-emerald-500 text-white",
  POST: "bg-amber-500 text-white",
  PUT: "bg-sky-500 text-white",
  DELETE: "bg-red-500 text-white",
};

const SAMPLE_BODIES: Record<string, string> = {
  POST: `{
  "title": "হাতেম তাই",
  "author": "মুহম্মদ জাফর ইকবাল",
  "year": 1976
}`,
  PUT: `{
  "title": "পথের পাঁচালী (সংশোধিত)",
  "year": 1932
}`,
};

const EXPRESS_SNIPPETS: Record<Method, string> = {
  GET: `app.get("/books/:id?", (req, res) => {
  const id = req.params.id;
  if (!id) return res.json(books);        // সব বই

  const book = books.find(
    (b) => b.id === Number(id)
  );
  if (!book) {
    return res.status(404).json({ error: "বইটি নেই!" });
  }
  res.json(book);
});`,
  POST: `app.post("/books", (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({
      error: "title ও author দুটোই দরকার",
    });
  }

  const book = { id: nextId++, title, author };
  books.push(book);
  res.status(201).json(book);
});`,
  PUT: `app.put("/books/:id", (req, res) => {
  const book = books.find(
    (b) => b.id === Number(req.params.id)
  );
  if (!book) {
    return res.status(404).json({ error: "বইটি নেই!" });
  }

  book.title = req.body.title || book.title;
  book.author = req.body.author || book.author;
  res.json(book);
});`,
  DELETE: `app.delete("/books/:id", (req, res) => {
  const exists = books.some(
    (b) => b.id === Number(req.params.id)
  );
  if (!exists) {
    return res.status(404).json({ error: "বইটি নেই!" });
  }

  books = books.filter(
    (b) => b.id !== Number(req.params.id)
  );
  res.status(204).send(); // সফল, বডি নেই
});`,
};

interface HistoryItem {
  method: Method;
  path: string;
  status: number;
  ms: number;
}

export function Playground() {
  const [method, setMethod] = useState<Method>("GET");
  const [path, setPath] = useState("/books");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<number | null>(null);
  const [timeMs, setTimeMs] = useState<number | null>(null);
  const [response, setResponse] = useState<string>(
    "এখনো কোনো রিকোয়েস্ট পাঠানো হয়নি। উপরের বাটনে চেপে শুরু করুন!"
  );
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const needsBody = method === "POST" || method === "PUT";

  const changeMethod = (m: Method) => {
    setMethod(m);
    setBody(m === "POST" || m === "PUT" ? SAMPLE_BODIES[m] : "");
  };

  const send = async () => {
    setLoading(true);
    const started = performance.now();

    try {
      const target = path.startsWith("/") ? path : "/" + path;
      const init: RequestInit = { method };

      if (needsBody && body.trim()) {
        init.headers = { "Content-Type": "application/json" };
        init.body = body;
      }

      const res = await fetch("/api/playground?target=" + encodeURIComponent(target), init);
      const ms = Math.round(performance.now() - started);
      const text = await res.text();

      let pretty: string;
      try {
        pretty = text ? JSON.stringify(JSON.parse(text), null, 2) : "(কোনো বডি নেই — স্ট্যাটাস কোডটিই রেসপন্স)";
      } catch {
        pretty = text || "(কোনো বডি নেই)";
      }

      setStatus(res.status);
      setTimeMs(ms);
      setResponse(pretty);
      setHistory((h) => [
        { method, path: target, status: res.status, ms },
        ...h.slice(0, 4),
      ]);
    } catch {
      setStatus(0);
      setTimeMs(null);
      setResponse("রিকোয়েস্ট পাঠানো ব্যর্থ হয়েছে — ইন্টারনেট কানেকশন চেক করুন।");
    } finally {
      setLoading(false);
    }
  };

  const statusStyle =
    status === null
      ? "bg-muted text-muted-foreground"
      : status >= 200 && status < 300
        ? "bg-emerald-500 text-white"
        : status === 404
          ? "bg-amber-500 text-white"
          : "bg-red-500 text-white";

  return (
    <div className="max-w-4xl">
      {/* Intro */}
      <div className="rounded-xl border border-primary/25 bg-primary/5 p-4 md:p-5 mb-6 flex gap-3">
        <FlaskConical className="size-5 text-primary shrink-0 mt-0.5" />
        <div className="text-sm leading-relaxed text-foreground/85">
          <p className="font-bold text-foreground mb-1">স্বাগতম লাইভ প্লেগ্রাউন্ডে!</p>
          <p>
            এটি একটি <span className="font-semibold">আসল চলমান সার্ভার</span> — REST API পাঠে
            যে কোড লিখেছি ঠিক সেটিই এখানে চলছে (ডেটাবেসের বদলে মেমোরি অ্যারে)। নিচের
            বাটনগুলো দিয়ে রিকোয়েস্ট পাঠান, স্ট্যাটাস কোড ও JSON রেসপন্স সাথে সাথে দেখুন। ভুল
            করে বই মুছে ফেললে ডর নেই — রিসেট বাটন আছে!
          </p>
        </div>
      </div>

      {/* Request builder */}
      <div className="rounded-xl border bg-card overflow-hidden mb-6">
        <div className="px-4 py-3 border-b bg-muted/40 flex items-center gap-2">
          <Send className="size-4 text-primary" />
          <span className="font-bold text-sm">রিকোয়েস্ট বিল্ডার</span>
        </div>
        <div className="p-4 space-y-4">
          {/* Method buttons */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-2">HTTP মেথড</p>
            <div className="grid grid-cols-4 gap-2">
              {(Object.keys(METHOD_COLORS) as Method[]).map((m) => (
                <button
                  key={m}
                  onClick={() => changeMethod(m)}
                  className={`rounded-lg py-2.5 text-sm font-bold font-[family-name:var(--font-jetbrains)] transition-all min-h-[44px] ${
                    method === m
                      ? METHOD_COLORS[m] + " shadow-md"
                      : "bg-muted text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                  }`}
                  aria-pressed={method === m}
                  aria-label={m + " মেথড"}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Path */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-2">এন্ডপয়েন্ট (URL পাথ)</p>
            <div className="flex gap-2">
              <span className="hidden sm:flex items-center px-3 rounded-md bg-muted text-muted-foreground text-sm font-[family-name:var(--font-jetbrains)]">
                http://localhost:3000
              </span>
              <Input
                value={path}
                onChange={(e) => setPath(e.target.value)}
                className="font-[family-name:var(--font-jetbrains)] min-h-[44px]"
                placeholder="/books বা /books/2"
                aria-label="এন্ডপয়েন্ট পাথ"
              />
            </div>
            <div className="flex flex-wrap gap-2 mt-2.5">
              {["/books", "/books/1", "/books/99"].map((p) => (
                <button
                  key={p}
                  onClick={() => setPath(p)}
                  className="text-xs rounded-full border px-3 py-1 text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors font-[family-name:var(--font-jetbrains)]"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Body */}
          {needsBody && (
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-1.5">
                <Braces className="size-3.5" />
                রিকোয়েস্ট বডি (JSON) — express.json() এটি পড়বে
              </p>
              <Textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={5}
                className="font-[family-name:var(--font-jetbrains)] text-sm"
                aria-label="JSON বডি"
              />
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            <Button onClick={send} disabled={loading} className="gap-2 font-bold min-h-[44px] px-6">
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  পাঠানো হচ্ছে...
                </>
              ) : (
                <>
                  <Play className="size-4" />
                  রিকোয়েস্ট পাঠান
                </>
              )}
            </Button>
            <Button
              variant="outline"
              onClick={() => setHistory([])}
              className="gap-2 min-h-[44px]"
              aria-label="রিকোয়েস্ট হিস্টোরি মুছুন"
            >
              <RotateCcw className="size-4" />
              ডেমো হিস্টোরি মুছুন
            </Button>
          </div>
        </div>
      </div>

      {/* Response */}
      <div className="rounded-xl border bg-card overflow-hidden mb-6">
        <div className="px-4 py-3 border-b bg-muted/40 flex flex-wrap items-center gap-2.5">
          <span className="font-bold text-sm">রেসপন্স</span>
          {status !== null && (
            <span
              className={`text-xs font-bold font-[family-name:var(--font-jetbrains)] rounded-md px-2 py-1 ${statusStyle}`}
            >
              {status === 204 ? "204 No Content" : status === 0 ? "FAILED" : status}
            </span>
          )}
          {timeMs !== null && (
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock3 className="size-3" />
              {timeMs} ms
            </span>
          )}
        </div>
        <div className="bg-zinc-900 p-4 min-h-[140px] overflow-x-auto">
          <pre
            className={`text-xs leading-relaxed font-[family-name:var(--font-jetbrains)] whitespace-pre-wrap ${
              status !== null && status >= 400 ? "text-amber-300" : "text-emerald-300"
            }`}
          >
            {response}
          </pre>
        </div>
      </div>

      {/* History */}
      {history.length > 0 && (
        <div className="mb-6">
          <p className="text-xs font-semibold text-muted-foreground mb-2">
            সাম্প্রতিক রিকোয়েস্টগুলো
          </p>
          <div className="flex flex-wrap gap-2">
            {history.map((h, i) => (
              <Badge
                key={i}
                variant="outline"
                className="font-[family-name:var(--font-jetbrains)] gap-1.5 py-1.5"
              >
                <span className={h.method === "GET" ? "text-emerald-500" : h.method === "POST" ? "text-amber-500" : h.method === "PUT" ? "text-sky-500" : "text-red-500"}>
                  {h.method}
                </span>
                {h.path}
                <span className={h.status < 300 ? "text-emerald-500" : "text-amber-500"}>
                  {h.status}
                </span>
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Express code */}
      <div>
        <p className="text-sm font-bold mb-1 flex items-center gap-2">
          <Braces className="size-4 text-primary" />
          এই রিকোয়েস্টটি Express-এ যেভাবে হ্যান্ডেল হয়
        </p>
        <p className="text-xs text-muted-foreground mb-2">
          আপনার পাঠানো {method} রিকোয়েস্টটি সার্ভারে নিচের কোডটি চালাচ্ছে:
        </p>
        <CodeBlock
          code={EXPRESS_SNIPPETS[method]}
          language="js"
          filename="server.js"
        />
      </div>
    </div>
  );
}
