import type { Lesson } from "./types";

export const buildingApps: Lesson[] = [
  {
    id: "rest-api",
    title: "REST API তৈরি করা",
    subtitle: "সম্পূর্ণ CRUD অ্যাপ্লিকেশন — আসল ব্যাকএন্ডের স্বাদ",
    duration: "১৮ মিনিট",
    keywords: ["rest api", "crud", "create read update delete", "api design", "json api"],
    blocks: [
      {
        type: "text",
        content:
          "REST API হলো আধুনিক ওয়েবের ভাষা। আপনার মোবাইল অ্যাপ, React ওয়েবসাইট, এমনকি অন্য কোম্পানির সার্ভার — সবাই REST API দিয়েই একে অপরের সাথে কথা বলে। API (Application Programming Interface) মানে এমন ইন্টারফেস যা দিয়ে ক্লায়েন্ট পেজ নয়, ডেটা পায় — সাধারণত JSON আকারে।",
      },
      {
        type: "heading",
        content: "REST-এর মূল ধারণা",
      },
      {
        type: "text",
        content:
          "REST-এ প্রতিটি জিনিস একটি রিসোর্স (resource) — বই, ইউজার, পোস্ট। প্রতিটি রিসোর্সের একটি URL থাকে, আর HTTP মেথড বলে দেয় ওই রিসোর্সে কী করতে হবে। যেমন /books হলো বইয়ের কালেকশন, /books/5 হলো ৫ নম্বর বই — একই URL-এ ভিন্ন মেথড ভিন্ন কাজ করে:",
      },
      {
        type: "table",
        headers: ["মেথড + পাথ", "কাজ", "স্ট্যাটাস কোড"],
        rows: [
          ["GET /books", "সব বইয়ের তালিকা", "200"],
          ["GET /books/:id", "একটি নির্দিষ্ট বই", "200 / 404"],
          ["POST /books", "নতুন বই তৈরি", "201"],
          ["PUT /books/:id", "বইয়ের তথ্য আপডেট", "200 / 404"],
          ["DELETE /books/:id", "বই মুছে ফেলা", "204 / 404"],
        ],
      },
      {
        type: "heading",
        content: "পূর্ণ CRUD API লিখি",
      },
      {
        type: "text",
        content:
          "এবার লাইভ্যারি হিসেবে বইয়ের সম্পূর্ণ API — Create, Read, Update, Delete (CRUD) চারটি অপারেশনই আছে। ডেটাবেসের বদলে আপাতত মেমোরিতে একটি অ্যারে ব্যবহার করছি, যাতে শুধু Express-এ মনোযোগ দিতে পারেন। ES Modules সংস্করণটা মূল, CommonJS-ও শেষে দেখাব:",
      },
      {
        type: "code",
        language: "js",
        variant: "esm",
        filename: "server.js — Express 5 + ES Modules",
        code: `import express from "express";

const app = express();
app.use(express.json());

let books = [
  { id: 1, title: "পথের পাঁচালী", author: "বিভূতিভূষণ বন্দ্যোপাধ্যায়" },
  { id: 2, title: "লালসালু", author: "সৈয়দ ওয়ালীউল্লাহ" },
];
let nextId = 3;

// READ: সব বই
app.get("/books", (req, res) => {
  res.json(books);
});

// READ: একটি বই
app.get("/books/:id", (req, res) => {
  const book = books.find(
    (b) => b.id === Number(req.params.id)
  );
  if (!book) {
    return res.status(404).json({ error: "বইটি নেই!" });
  }
  res.json(book);
});

// CREATE: নতুন বই
app.post("/books", (req, res) => {
  const { title, author } = req.body ?? {};
  if (!title || !author) {
    return res.status(400).json({
      error: "title ও author দুটোই দরকার",
    });
  }
  const book = { id: nextId++, title, author };
  books.push(book);
  res.status(201).json(book);
});

// UPDATE: বই আপডেট
app.put("/books/:id", (req, res) => {
  const book = books.find(
    (b) => b.id === Number(req.params.id)
  );
  if (!book) {
    return res.status(404).json({ error: "বইটি নেই!" });
  }
  const { title, author } = req.body ?? {};
  book.title = title || book.title;
  book.author = author || book.author;
  res.json(book);
});

// DELETE: বই মুছা
app.delete("/books/:id", (req, res) => {
  const exists = books.some(
    (b) => b.id === Number(req.params.id)
  );
  if (!exists) {
    return res.status(404).json({ error: "বইটি নেই!" });
  }
  books = books.filter((b) => b.id !== Number(req.params.id));
  res.status(204).send(); // 204 = সফল, কিন্তু বডি নেই
});

app.listen(3000);`,
      },
      {
        type: "code",
        language: "js",
        variant: "cjs",
        filename: "server.cjs — একই API, CommonJS-এ",
        code: `const express = require("express");
const app = express();
app.use(express.json());

let books = [
  { id: 1, title: "পথের পাঁচালী", author: "বিভূতিভূষণ বন্দ্যোপাধ্যায়" },
];
let nextId = 2;

app.get("/books", (req, res) => res.json(books));

app.post("/books", (req, res) => {
  const { title, author } = req.body ?? {};
  if (!title || !author) {
    return res.status(400).json({ error: "title ও author দরকার" });
  }
  const book = { id: nextId++, title, author };
  books.push(book);
  res.status(201).json(book);
});

// ... বাকি রাউটগুলো হুবহু একই — শুধু এই ফাইলের শুরুতে require

app.listen(3000);`,
      },
      {
        type: "text",
        content:
          "লক্ষ্য করুন কোডের প্যাটার্ন: প্রথমে ডেটা খুঁজে বের করা, না পেলে 404, পেলে কাজ করে যথাযথ স্ট্যাটাস কোডসহ রেসপন্স। এই প্যাটার্নটিই বাস্তবের প্রায় সব API-তে ঘোরে।",
      },
      {
        type: "heading",
        content: "টেস্ট করে দেখুন",
      },
      {
        type: "code",
        language: "bash",
        code: `# সব বই দেখা
curl http://localhost:3000/books

# নতুন বই যোগ করা
curl -X POST http://localhost:3000/books \\
  -H "Content-Type: application/json" \\
  -d "{\\"title\\":\\"হাতেম তাই\\",\\"author\\":\\"মুহম্মদ জাফর ইকবাল\\"}"

# ৩ নম্বর বই মুছা
curl -X DELETE http://localhost:3000/books/3`,
      },
      {
        type: "tip",
        content:
          "এই কোর্সের প্লেগ্রাউন্ড সেকশনে ঠিক এমন একটি লাইভ /books API আছে — সেখানে গিয়ে POST, PUT, DELETE নিজে পাঠান, সাথে সাথে স্ট্যাটাস কোড ও রেসপন্স দেখুন। মুখস্থ নয়, হাতে-কলমে শিখুন!",
      },
      {
        type: "note",
        content:
          "মেমোরি অ্যারেতে ডেটা রাখলে সার্ভার রিস্টার্ট করলেই সব হারিয়ে যায়। বাস্তবের অ্যাপে ডেটা জমা থাকে ডেটাবেসে (MongoDB, PostgreSQL ইত্যাদি)। Express ডেটাবেস নিজে সামলায় না — সাধারণত Mongoose বা Prisma-র মতো লাইব্রেরি দিয়ে যোগাযোগ করে, যা এই সেকশনের \"ডেটাবেস ইন্টিগ্রেশন\" পাঠে শিখবেন।",
      },
    ],
  },
  {
    id: "validation",
    title: "ইনপুট ভ্যালিডেশন (Zod)",
    subtitle: "ভুল ডেটা ঢুকতে দেওয়া নয় — গেটেই আটকান",
    duration: "১৪ মিনিট",
    keywords: ["validation", "zod", "schema validation", "sanitize input", "400 bad request"],
    blocks: [
      {
        type: "text",
        content:
          "REST API-র সবচেয়ে বড় দুর্বল জায়গা ইউজারের পাঠানো ডেটা — ইউজার ভুল ফরম্যাটে ডেটা পাঠাতে পারে, শত্রুভাবাপন্ন কেউ ক্ষতিকর ডেটা ঢোকাতে পারে। তাই প্রতিটি ইনপুট যাচাই করা — ভ্যালিডেশন — ব্যাকএন্ডের অপরিহার্য দায়িত্ব। নিজে নিজে if দিয়ে চেক করা যায়, কিন্তু বড় অ্যাপে সেটা দ্রুত অসহ্য হয়ে ওঠে। আধুনিক Express দুনিয়ায় সবচেয়ে জনপ্রিয় ভ্যালিডেশন লাইব্রেরি Zod — একটা schema লিখলেই parse, এরর মেসেজ, টাইপ ইনফারেন্স সব রেডি।",
      },
      {
        type: "note",
        content:
          "মনে রাখার মতো কথা: ফ্রন্টএন্ডের চেক শুধু ভালো ইউজারের ভুল ধরার জন্য — curl দিয়ে যে কেউ ফ্রন্টএন্ড বাদ দিয়ে সরাসরি API-তে রিকোয়েস্ট পাঠাতে পারে। তাই সত্যিকারের ভ্যালিডেশন অবশ্যই ব্যাকএন্ডে হতে হবে। আর TypeScript ব্যবহার করলেও টাইপ চেক হয় শুধু কম্পাইল টাইমে — রানটাইমে আসা HTTP ডেটা আলাদাভাবে যাচাই করতেই হবে (TypeScript পাঠে বিস্তারিত)।",
      },
      {
        type: "heading",
        content: "Zod ইনস্টল ও প্রথম schema",
      },
      {
        type: "code",
        language: "bash",
        code: `npm install zod`,
      },
      {
        type: "text",
        content:
          "Zod-এ schema মানে ডেটার আকারের বর্ণনা — কোন ফিল্ড থাকবে, কোনটা স্ট্রিং, কোনটার সর্বনিম্ন দৈর্ঘ্য কত। safeParse() দিয়ে ডেটা যাচাই করলে সফল হলে data, ব্যর্থ হলে issues — দুটোই সুন্দর ফরম্যাটে পাওয়া যায়:",
      },
      {
        type: "code",
        language: "js",
        variant: "esm",
        filename: "validators/book.schema.js",
        code: `import { z } from "zod";

// বই তৈরির নিয়ম লিখে ফেললাম
export const createBookSchema = z.object({
  title: z
    .string({ message: "title অবশ্যই স্ট্রিং হতে হবে" })
    .min(1, "title খালি রাখা যাবে না")
    .max(200, "title খুব দীর্ঘ"),
  author: z.string().min(1, "author খালি রাখা যাবে না"),
  year: z.number().int().min(1000).max(2026).optional(),
});`,
      },
      {
        type: "code",
        language: "js",
        variant: "esm",
        filename: "server.js (আংশিক)",
        code: `import { createBookSchema } from "./validators/book.schema.js";

app.post("/books", (req, res) => {
  const result = createBookSchema.safeParse(req.body);

  if (!result.success) {
    // প্রথম এররটাই ইউজারকে দেখাই
    return res.status(400).json({
      error: result.error.issues[0]?.message ?? "ডেটা সঠিক নয়",
    });
  }

  // result.data — যাচাই হয়ে যাওয়া, পরিষ্কার ডেটা
  const book = { id: nextId++, ...result.data };
  books.push(book);
  res.status(201).json(book);
});`,
      },
      {
        type: "heading",
        content: "প্যারামিটার আর কোয়েরিও যাচাই করুন",
      },
      {
        type: "text",
        content:
          "শুধু বডি নয় — URL-এর প্যারামিটার আর কোয়েরির স্ট্রিংগুলোও (যা সবসময় স্ট্রিং হিসেবে আসে) Zod দিয়ে পরিষ্কার টাইপে রূপান্তর করা যায়। মাইন্ডব্লোয়িং সুবিধা: coerce দিয়ে স্ট্রিং থেকে স্বয়ংক্রিয়ভাবে সংখ্যা বানানো যায়:",
      },
      {
        type: "code",
        language: "js",
        variant: "esm",
        code: `import { z } from "zod";

// GET /books/3?fields=title,author&page=2
const listQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
});

const idParamSchema = z.object({
  id: z.coerce.number().int().positive("id ধনাত্মক সংখ্যা হতে হবে"),
});

app.get("/books/:id", (req, res) => {
  const idResult = idParamSchema.safeParse(req.params);
  if (!idResult.success) {
    return res.status(400).json({ error: "id সঠিক নয়" });
  }
  // idResult.data.id — এখন নিশ্চিত সংখ্যা!

  const qResult = listQuerySchema.safeParse(req.query);
  const { page, limit } = qResult.success
    ? qResult.data
    : { page: 1, limit: 10 };

  const book = books.find((b) => b.id === idResult.data.id);
  if (!book) return res.status(404).json({ error: "বইটি নেই!" });
  res.json({ data: book, meta: { page, limit } });
});`,
      },
      {
        type: "heading",
        content: "রিইউজেবল ভ্যালিডেশন মিডলওয়্যার",
      },
      {
        type: "text",
        content:
          "প্রতিটি হ্যান্ডলারে একই কোড লেখা বদভ্যাস — বরং একটা ছোট মিডলওয়্যার ফ্যাক্টরি বানিয়ে ফেলুন, যাকে যেকোনো schema দিয়ে যেকোনো অংশ (body/params/query) যাচাইয়ে ব্যবহার করা যায়:",
      },
      {
        type: "code",
        language: "js",
        variant: "esm",
        filename: "middleware/validate.js",
        code: `import { z } from "zod";

/**
 * validate({ body: schema, params: schema, query: schema })
 * সফল হলে যাচাই-করা ডেটা req-এ বসিয়ে দেয়
 */
export function validate(schemas) {
  return (req, res, next) => {
    try {
      if (schemas.body) req.body = schemas.body.parse(req.body);
      if (schemas.params) req.params = schemas.params.parse(req.params);
      if (schemas.query) req.query = schemas.query.parse(req.query);
      next();
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          error: "ভ্যালিডেশন ব্যর্থ",
          issues: err.issues.map((i) => ({
            field: i.path.join("."),
            message: i.message,
          })),
        });
      }
      next(err); // অন্য কোনো এরর — এরর হ্যান্ডলারে পাঠাও
    }
  };
}`,
      },
      {
        type: "code",
        language: "js",
        variant: "esm",
        filename: "server.js (আংশিক) — এখন এক লাইনেই ভ্যালিডেশন",
        code: `app.post(
  "/books",
  validate({ body: createBookSchema }),
  (req, res) => {
    // এখানে আসার আগেই req.body যাচাই হয়ে গেছে
    const book = { id: nextId++, ...req.body };
    books.push(book);
    res.status(201).json(book);
  }
);`,
        output: `# ভুল ডেটা পাঠালে:
{ "error": "ভ্যালিডেশন ব্যর্থ",
  "issues": [{ "field": "title", "message": "title খালি রাখা যাবে না" }] }`,
      },
      {
        type: "heading",
        content: "সাধারণ ভ্যালিডেশন ভুল",
      },
      {
        type: "table",
        headers: ["ভুল", "ফলাফল", "সমাধান"],
        rows: [
          ["ভ্যালিডেশন রাউটের পরে বসানো", "অশুদ্ধ ডেটা আগেই ঢুকে পড়ে", "মিডলওয়্যার সবসময় হ্যান্ডলারের আগে"],
          ["parse() করে ফেলে সরাসরি req.body-তে", "ব্যর্থ হলে ZodError এরর হ্যান্ডলারে যায় — ইউজার পায় 500", "safeParse() ব্যবহার করুন, বা try/catch-এ 400 পাঠান"],
          ["শুধু বডি যাচাই করা", "params-এ আবর্জনা ঢুকে যায় (যেমন /books/-1)", "params ও query-ও schema দিয়ে যাচাই করুন"],
          ["ফ্রন্টএন্ডের উপর ভরসা", "curl দিয়ে বাইপাস করা যায়", "ব্যাকএন্ডে সবসময় নিজস্ব ভ্যালিডেশন"],
        ],
      },
      {
        type: "tip",
        content:
          "Zod schema থেকে TypeScript টাইপ বানানো যায়: z.infer<typeof createBookSchema> — এক schema থেকে ভ্যালিডেশন আর টাইপ দুটোই! TypeScript সেকশনের \"Zod ভ্যালিডেশন\" পাঠে এটাই বিস্তারিত দেখবেন। এছাড়া বিকল্প হিসেবে Joi, express-validator-ও আছে — ধারণা মিল থাকলে যেটার সাথে যাবেন না কেন, নীতিটা একই।",
      },
    ],
  },
  {
    id: "file-upload",
    title: "ফাইল আপলোড (multer)",
    subtitle: "ছবি-ডকুমেন্ট আপলোড নিরাপদে সামলানো",
    duration: "১২ মিনিট",
    keywords: ["file upload", "multer", "multipart form data", "upload image", "file size limit"],
    blocks: [
      {
        type: "text",
        content:
          "প্রোফাইল ছবি, পোস্টের অ্যাটাচমেন্ট, সিভি — ওয়েব অ্যাপে ফাইল আপলোড থাকে সর্বত্র। কিন্তু ফাইল আপলোডের ফরম্যাট multipart/form-data হয়, যা express.json() বা express.urlencoded() পড়তে পারে না। Express নিজেও ফাইল আপলোড সামলায় না — এই কাজের জন্য প্রচলিত মিডলওয়্যার multer।",
      },
      {
        type: "code",
        language: "bash",
        code: `npm install multer`,
      },
      {
        type: "heading",
        content: "একক ফাইল আপলোড",
      },
      {
        type: "code",
        language: "js",
        variant: "esm",
        filename: "server.js",
        code: `import express from "express";
import multer from "multer";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// কোথায় আর কীভাবে সেভ হবে তার নিয়ম
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "uploads"));
  },
  filename: (req, file, cb) => {
    // নাম সংঘর্ষ এড়াতে ইউনিক নাম
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// single("avatar") = ফর্মের "avatar" নামের একটি ফাইল
app.post("/profile", upload.single("avatar"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "কোনো ফাইল আসেনি!" });
  }
  console.log("টেক্সট ফিল্ড:", req.body); // ফর্মের বাকি ফিল্ড
  res.status(201).json({
    message: "আপলোড সফল!",
    file: {
      originalname: req.file.originalname,
      size: req.file.size,        // বাইটে
      savedAs: req.file.filename, // ডিস্কে সেভ হওয়া নাম
    },
  });
});

app.listen(3000);`,
      },
      {
        type: "code",
        language: "bash",
        filename: "টেস্ট করা",
        code: `curl -X POST http://localhost:3000/profile \\
  -F "avatar=@/path/to/chobi.jpg" \\
  -F "name=রাফি"`,
      },
      {
        type: "heading",
        content: "একাধিক ফাইল ও নিরাপত্তার নিয়ম",
      },
      {
        type: "code",
        language: "js",
        variant: "esm",
        code: `// একসাথে একাধিক ফাইল — সর্বোচ্চ ৫টি
app.post(
  "/gallery",
  upload.array("photos", 5),
  (req, res) => {
    // req.files — ফাইলগুলোর অ্যারে
    res.json({ count: req.files?.length ?? 0 });
  }
);

// নির্দিষ্ট কয়েকটি ফিল্ড আলাদা নামে
app.post(
  "/docs",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  (req, res) => {
    res.json({
      avatar: req.files?.avatar?.[0]?.filename,
      resume: req.files?.resume?.[0]?.filename,
    });
  }
);`,
      },
      {
        type: "text",
        content:
          "নিরাপত্তা ছাড়া ফাইল আপলোড খোলা দরজার মতো। multer-কে কমপক্ষে তিনটি নিয়ম শেখান — সাইজ লিমিট, ফাইল ফিল্টার, আর জায়গা সীমাবদ্ধ রাখা:",
      },
      {
        type: "code",
        language: "js",
        variant: "esm",
        filename: "নিরাপদ multer কনফিগ",
        code: `const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // ৫ MB
    files: 5,                   // সর্বোচ্চ ৫ ফাইল
  },
  fileFilter: (req, file, cb) => {
    // শুধু ছবি নেব — MIME টাইপ দেখে
    const ok = ["image/jpeg", "image/png", "image/webp"].includes(
      file.mimetype
    );
    if (!ok) {
      // এরর দিলে আপলোড থেমে যাবে
      return cb(new Error("শুধু JPEG/PNG/WebP ছবি চলবে!"));
    }
    cb(null, true);
  },
});

// এররটা এরর হ্যান্ডলারে ধরে সুন্দর রেসপন্স দিন
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ error: "ফাইল ৫ MB-এর কম হতে হবে" });
    }
    return res.status(400).json({ error: "আপলোড সমস্যা: " + err.code });
  }
  if (err) {
    return res.status(400).json({ error: err.message });
  }
  next();
});`,
      },
      {
        type: "warning",
        content:
          "এই তিনটা ভুল কখনো করবেন না: (১) আপলোড ফোল্ডারের ভেতরে ফাইলনেম ইউজারের দেওয়া নামেই রাখা — নাম সংঘর্ষ আর path traversal (../../evil.sh) দুটোই বিপদ; তাই ইউনিক নাম জেনারেট করুন। (২) যেকোনো ফাইলটাইপ গ্রহণ করা — কেউ .html বা .exe আপলোড করে XSS ছড়াতে পারে; MIME ফিল্টার দিন। (৩) ফাইল সাইজ লিমিট না রাখা — বিশাল ফাইলে সার্ভারের ডিস্ক ভরে যাবে।",
      },
      {
        type: "heading",
        content: "আপলোড হওয়া ফাইল সার্ভ করা",
      },
      {
        type: "code",
        language: "js",
        variant: "esm",
        code: `// uploads ফোল্ডারটাও স্ট্যাটিক করে দিন
app.use("/uploads", express.static("uploads"));

// এখন ব্রাউজার থেকে সরাসরি দেখা যাবে:
// http://localhost:3000/uploads/1712345678-123456789.jpg`,
      },
      {
        type: "note",
        content:
          "প্রোডাকশনে ফাইল নিজের সার্ভারের ডিস্কে না রেখে ক্লাউড স্টোরেজে (Cloudflare R2, AWS S3, Vercel Blob) পাঠানোই ভালো অভ্যাস — সার্ভার রিস্টার্ট/স্কেলে ফাইল হারায় না, CDN-এ দ্রুত ডেলিভারি হয়। ছোট প্রজেক্টে ডিস্ক ঠিক আছে, বড় হলে ক্লাউডে যান। মেমরিতে রাখার storage: multer.memoryStorage() অপশনটা এমন ক্ষেত্রেই — ফাইল বাফার হিসেবে ধরে সরাসরি ক্লাউডে পাঠান।",
      },
    ],
  },
  {
    id: "authentication",
    title: "অথেনটিকেশন ও অথরাইজেশন",
    subtitle: "কে আপনি (authentication), আর কী করতে পারবেন (authorization)",
    duration: "১৬ মিনিট",
    keywords: ["authentication", "authorization", "jwt", "json web token", "bcrypt", "login", "session"],
    blocks: [
      {
        type: "text",
        content:
          "দুটি শব্দ গুলিয়ে ফেলা খুব সাধারণ, তাই শুরুতেই পরিষ্কার করি: অথেনটিকেশন (authentication) মানে পরিচয় যাচাই — \"আপনি আসলেই কি এই ইউজার?\"। অথরাইজেশন (authorization) মানে অনুমতি যাচাই — \"লগইন করেছেন ঠিকই, কিন্তু এই কাজটা করার অধিকার আপনার আছে?\"। লগইন ফর্ম authentication, আর \"শুধু অ্যাডমিন ডেটা মুছতে পারবে\" নীতিটা authorization।",
      },
      {
        type: "heading",
        content: "পাসওয়ার্ড কখনো সরাসরি জমা রাখা যায় না",
      },
      {
        type: "text",
        content:
          "প্রথম নিয়ম: ডেটাবেসে পাসওয়ার্ড হুবহু জমানো নিষিদ্ধ — ডেটাবেস লিক হলেই সব অ্যাকাউন্ট শেষ। bcrypt দিয়ে পাসওয়ার্ডের হ্যাশ বানিয়ে সেটিই জমান, লগইনের সময় হ্যাশের সাথে মিলিয়ে দেখেন:",
      },
      {
        type: "code",
        language: "bash",
        code: `npm install bcrypt`,
      },
      {
        type: "code",
        language: "js",
        variant: "esm",
        filename: "auth-এর ভিত্তি — bcrypt",
        code: `import bcrypt from "bcrypt";

// রেজিস্ট্রেশনে — হ্যাশ বানিয়ে জমান
const plainPassword = "amar-sonar-bangla";
const hash = await bcrypt.hash(plainPassword, 12); // 12 = cost
// hash দেখতে এমন: "$2b$12$KIX...দীর্ঘ..."

// লগইনে — মিলিয়ে দেখুন
const ok = await bcrypt.compare("amar-sonar-bangla", hash); // true
const wrong = await bcrypt.compare("bhul-password", hash);   // false`,
      },
      {
        type: "heading",
        content: "JWT: লগইনের পরের পরিচয়পত্র",
      },
      {
        type: "text",
        content:
          "HTTP-র স্বভার ভুলে যাওয়া — প্রতিটি রিকোয়েস্ট আলাদা, আগের লগইন মনে রাখে না। তাই লগইন সফল হলে সার্ভার ইউজারকে একটা স্বাক্ষরিত টোকেন দেয় — JWT (JSON Web Token)। এরপর থেকে ক্লায়েন্ট প্রতিটি রিকোয়েস্টের Authorization হেডারে টোকেনটা পাঠায়, সার্ভার স্বাক্ষর মিলিয়ে চিনে নেয়। সেশন-কুকি নিয়েও একই কাজ করা যায় — শেষে দুটোর তুলনা দেখব।",
      },
      {
        type: "code",
        language: "bash",
        code: `npm install jsonwebtoken`,
      },
      {
        type: "code",
        language: "js",
        variant: "esm",
        filename: "auth.js — টোকেন বানানো ও যাচাই",
        code: `import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET; // .env-তে রাখুন!

// লগইন সফল হলে টোকেন তৈরি
export function signToken(user) {
  return jwt.sign(
    { sub: user.id, role: user.role }, // payload
    SECRET,
    { expiresIn: "1h" }
  );
}

// টোকেন যাচাই
export function verifyToken(token) {
  return jwt.verify(token, SECRET); // payload ফেরায়, ব্যর্থ হলে throw
}`,
      },
      {
        type: "code",
        language: "js",
        variant: "esm",
        filename: "server.js — লগইন রাউট ও requireAuth মিডলওয়্যার",
        code: `import bcrypt from "bcrypt";
import { signToken, verifyToken } from "./auth.js";

// লগইন
app.post("/login", async (req, res) => {
  const { email, password } = req.body ?? {};

  const user = await findUserByEmail(email); // ডেটাবেস থেকে
  if (!user) {
    // কোন জিনিস ভুল সেটা না বলাই নিরাপদ
    return res.status(401).json({ error: "ইমেইল বা পাসওয়ার্ড ভুল" });
  }

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) {
    return res.status(401).json({ error: "ইমেইল বা পাসওয়ার্ড ভুল" });
  }

  res.json({ token: signToken(user) });
});

// প্রাইভেট রাউটের দরজা
function requireAuth(req, res, next) {
  const header = req.headers.authorization ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: "টোকেন নেই — লগইন করুন" });
  }

  try {
    // যাচাই হলে ইউজারের তথ্য req-এ বসিয়ে দিই
    req.user = verifyToken(token);
    next();
  } catch {
    return res.status(401).json({ error: "টোকেন অবৈধ বা মেয়াদ শেষ" });
  }
}

// এখন যেকোনো প্রাইভেট রাউটে:
app.get("/me", requireAuth, (req, res) => {
  res.json({ userId: req.user.sub, role: req.user.role });
});`,
      },
      {
        type: "code",
        language: "bash",
        filename: "ব্যবহার",
        code: `# ১. লগইন করে টোকেন নিন
curl -X POST http://localhost:3000/login \\
  -H "Content-Type: application/json" \\
  -d "{\\"email\\":\\"rafi@example.com\\",\\"password\\":\\"amar-sonar-bangla\\"}"

# ২. টোকেন দিয়ে প্রাইভেট রাউটে যান
curl http://localhost:3000/me \\
  -H "Authorization: Bearer eyJhbGciOi..."`,
      },
      {
        type: "heading",
        content: "অথরাইজেশন: ভূমিকা অনুযায়ী অনুমতি",
      },
      {
        type: "code",
        language: "js",
        variant: "esm",
        code: `// requireAuth-এর পরে বসান
function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        error: "এই কাজের অনুমতি আপনার নেই",
      });
    }
    next();
  };
}

// 401 = লগইনই নেই, 403 = লগইন আছে কিন্তু অনুমতি নেই
app.delete(
  "/books/:id",
  requireAuth,
  requireRole("admin", "editor"),
  async (req, res) => {
    await deleteBook(req.params.id);
    res.sendStatus(204);
  }
);`,
      },
      {
        type: "heading",
        content: "JWT বনাম সেশন-কুকি",
      },
      {
        type: "table",
        headers: ["বিষয়", "JWT", "সেশন-কুকি"],
        rows: [
          ["কোথায় থাকে", "ক্লায়েন্ট জমা রাখে (localStorage/মেমরি)", "ব্রাউজারের HttpOnly কুকিতে"],
          ["সার্ভারের অবস্থা", " Stateless — টেবিলে কিছু রাখে না", "Stateful — সেশন স্টোর লাগে"],
          ["স্কেল", "সহজ (যেকোনো সার্ভার যাচাই করতে পারে)", "স্টোর শেয়ার করতে হয়"],
          ["খালাস করা (revoke)", "কঠিন — মেয়াদ না শেষ পর্যন্ত চলে", "সহজ — সেশন মুছলেই শেষ"],
          ["সাধারণ ব্যবহার", "মোবাইল অ্যাপ, SPA, মাইক্রোসার্ভিস", "প্রচলিত ওয়েবসাইট"],
          ["প্যাকেজ", "jsonwebtoken", "express-session + কুকি পার্সার"],
        ],
      },
      {
        type: "warning",
        content:
          "নিরাপত্তার চেকলিস্ট: JWT_SECRET কখনো কোডে লিখবেন না (.env-তে রাখুন)। টোকেন localStorage-এ রাখলে XSS-এ চুরি হওয়ার ঝুঁকি, HttpOnly কুকিতে রাখলে CSRF-এর ঝুঁকি — উভয় ক্ষেত্রেই helmet আর সঠিক CORS সেটিংস দরকার। পাসওয়ার্ড যাচাইয়ের এরর মেসেজ নির্দিষ্ট করবেন না (\"ইমেইল ভুল\" আলাদা করে বলা যাবে না)। HTTPS ছাড়া প্রোডাকশনে অথেনটিকেশন চালুই করবেন না।",
      },
      {
        type: "note",
        content:
          "Express নিজে অথেনটিকেশন করে না — bcrypt, jsonwebtoken, express-session এগুলো সব আলাদা প্যাকেজ। ফ্রেমওয়ার্ক দেয় শুধু হুক (মিডলওয়্যার), নীতিগুলো আপনাকেই সাজাতে হবে। Passport.js-এর মতো লাইব্রেরি Google/GitHub লগইনের মতো OAuth প্রোভাইডার যোগ করলে বিবেচনা করতে পারেন — ধারণাগুলো শক্ত থাকলে সেগুলো বসানো সহজ।",
      },
    ],
  },
  {
    id: "database",
    title: "ডেটাবেস ইন্টিগ্রেশন",
    subtitle: "Express-এর সাথে Prisma ও MongoDB — ডেটার স্থায়ী ঠিকানা",
    duration: "১৪ মিনিট",
    keywords: ["database", "prisma", "mongodb", "mongoose", "sql", "nosql", "orm"],
    blocks: [
      {
        type: "text",
        content:
          "এ পর্যন্ত ডেটা রেখেছি মেমোরির অ্যারেতে — সার্ভার রিস্টার্ট হলেই সব শূন্য। বাস্তবের অ্যাপে ডেটা চলে যায় ডেটাবেসে, আর Express বসে বসে শুধু বার্তাবাহকের ভূমিকায়: রিকোয়েস্ট এলে ডেটাবেসে জিজ্ঞেস করে, উত্তর JSON হয়ে ফেরে। প্রথমে দুই দুনিয়ার মানচিত্রটা দেখি:",
      },
      {
        type: "table",
        headers: ["বিষয়", "SQL (PostgreSQL, MySQL)", "NoSQL (MongoDB)"],
        rows: [
          ["ডেটার আকার", "টেবিল — নির্দিষ্ট কলাম, স্কিমা কড়া", "ডকুমেন্ট — নমনীয় JSON-সদৃশ"],
          ["সম্পর্ক (relations)", "JOIN-এ পাকা সম্পর্ক", "এমবেড বা রেফারেন্স — নমনীয়"],
          ["কখন মানানসই", "ব্যাংক, ইনভেন্টরি — সম্পর্ক ঘন ডেটা", "কনটেন্ট ফিড, প্রোফাইল — নমনীয় ডেটা"],
          ["জনপ্রিয় ORM/ODM", "Prisma, Drizzle, Knex", "Mongoose"],
        ],
      },
      {
        type: "text",
        content:
          "এই পাঠে মূল উদাহরণ হিসেবে Prisma দেখব — কারণ SQL-ই শেখার জন্য শক্ত ভিত্তি, আর Prisma-র টাইপ-নিরাপদ কোড পরে TypeScript সেকশনেও সুন্দরভাবে খাপ খায়। MongoDB+Mongoose-র সমতুল্যও শেষে দেখাব।",
      },
      {
        type: "heading",
        content: "Prisma সেটআপ",
      },
      {
        type: "code",
        language: "bash",
        code: `npm install prisma --save-dev
npm install @prisma/client

# কনফিগ ফাইল তৈরি (prisma/schema.prisma)
npx prisma init --datasource-url postgresql://...`,
      },
      {
        type: "code",
        language: "text",
        filename: "prisma/schema.prisma",
        code: `generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Book {
  id     Int    @id @default(autoincrement())
  title  String
  author String
  year   Int?
}`,
      },
      {
        type: "code",
        language: "bash",
        code: `# স্কিমা থেকে ডেটাবেস টেবিল তৈরি + ক্লায়েন্ট জেনারেট
npx prisma db push
npx prisma generate`,
      },
      {
        type: "heading",
        content: "Express রাউটে Prisma",
      },
      {
        type: "code",
        language: "js",
        variant: "esm",
        filename: "db.js — একটাই ক্লায়েন্ট শেয়ার করুন",
        code: `import { PrismaClient } from "@prisma/client";

// ডেভ-এ হট-রিলোডে বারবার কানেকশন খোলা এড়াতে global ব্যবহার
const globalForPrisma = globalThis;

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}`,
      },
      {
        type: "code",
        language: "js",
        variant: "esm",
        filename: "server.js — ডেটাবেসসহ Books CRUD",
        code: `import express from "express";
import { prisma } from "./db.js";

const app = express();
app.use(express.json());

// READ: সব বই (পেজিনেশনসহ)
app.get("/books", async (req, res) => {
  const page = Number(req.query.page ?? 1);
  const books = await prisma.book.findMany({
    skip: (page - 1) * 10,
    take: 10,
    orderBy: { id: "desc" },
  });
  res.json(books);
});

// READ: একটি বই
app.get("/books/:id", async (req, res) => {
  const book = await prisma.book.findUnique({
    where: { id: Number(req.params.id) },
  });
  if (!book) {
    return res.status(404).json({ error: "বইটি নেই!" });
  }
  res.json(book);
});

// CREATE
app.post("/books", async (req, res) => {
  const { title, author, year } = req.body ?? {};
  if (!title || !author) {
    return res.status(400).json({ error: "title ও author দরকার" });
  }
  const book = await prisma.book.create({
    data: { title, author, year: year ? Number(year) : null },
  });
  res.status(201).json(book);
});

// DELETE
app.delete("/books/:id", async (req, res) => {
  try {
    await prisma.book.delete({
      where: { id: Number(req.params.id) },
    });
    res.sendStatus(204);
  } catch {
    // Prisma বই না পেলে নির্দিষ্ট কোড দেয়
    res.status(404).json({ error: "বইটি নেই!" });
  }
});

app.listen(3000);`,
      },
      {
        type: "text",
        content:
          "লক্ষ্য করুন — Express 5-এ async হ্যান্ডলারে ডেটাবেস কোয়েরি ব্যর্থ হলে (যেমন কানেকশন ছিঁড়ে গেলে) এররটা স্বয়ংক্রিয়ভাবেই এরর হ্যান্ডলারে চলে যায়, try/catch লেখার বাধ্যবাধকতা নেই। তবে \"বই নেই\" মানের নিয়ন্ত্রিত 404 পাঠাতে চাইলে নিজে চেক করতে হবে — সেটা উপরে করেছি।",
      },
      {
        type: "heading",
        content: "MongoDB + Mongoose হলে",
      },
      {
        type: "code",
        language: "js",
        variant: "esm",
        filename: "mongoose-এর সমতুল্য অংশ",
        code: `import mongoose from "mongoose";

await mongoose.connect(process.env.DATABASE_URL);

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  year: Number,
});

const Book = mongoose.model("Book", bookSchema);

// রাউটে ব্যবহার — Prisma-র চেয়েও কাছাকাছি:
app.get("/books", async (req, res) => {
  const books = await Book.find().limit(10).sort({ _id: -1 });
  res.json(books);
});`,
      },
      {
        type: "heading",
        content: "সাধারণ ডেটাবেস ভুল",
      },
      {
        type: "table",
        headers: ["ভুল", "ফলাফল", "সমাধান"],
        rows: [
          ["প্রতি রিকোয়েস্টে নতুন কানেকশন", "কানেকশন লিক, সার্ভার ধীর", "একটাই ক্লায়েন্ট ইনস্ট্যান্স শেয়ার করুন"],
          ["N+1 কোয়েরি — লুপের ভেতরে কোয়েরি", "১০০ আইটেমে ১০১টা কোয়েরি!", "findMany + include বা aggregate দিয়ে একসাথে"],
          ["স্ট্রিং প্যারাম সরাসরি কোয়েরিতে", "অপ্রত্যাশিত ফল / এরর", "Number(req.params.id) — আগে রূপান্তর/যাচাই"],
          ["পেজিনেশন ছাড়া সব ডেটা ফেরানো", "হাজার রেকর্ডে সার্ভার+নেটওয়ার্ক ভেঙে পড়ে", "skip/take (limit) ব্যবহার করুন"],
        ],
      },
      {
        type: "tip",
        content:
          "লোকাল ডেভেলপমেন্টে PostgreSQL চালাতে Docker সবচেয়ে সহজ: docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=dev postgres:17 — অথবা ক্লাউডের ফ্রি টিয়ার (Neon, Supabase, MongoDB Atlas) ব্যবহার করুন। ডেটাবেস URL সবসময় .env-র DATABASE_URL-এ — কোডে কখনো না।",
      },
    ],
  },
];
