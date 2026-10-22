import type { Lesson } from "./types";

export const lessonsPart3: Lesson[] = [
  {
    id: "rest-api",
    title: "REST API তৈরি করা",
    subtitle: "সম্পূর্ণ CRUD অ্যাপ্লিকেশন — আসল ব্যাকএন্ডের স্বাদ",
    duration: "১৮ মিনিট",
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
          "এবার লাইভ্যারি হিসেবে বইয়ের সম্পূর্ণ API — Create, Read, Update, Delete (CRUD) চারটি অপারেশনই আছে। ডেটাবেসের বদলে আপাতত মেমোরিতে একটি অ্যারে ব্যবহার করছি, যাতে শুধু Express-এ মনোযোগ দিতে পারেন:",
      },
      {
        type: "code",
        language: "js",
        filename: "server.js",
        code: `const express = require("express");
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
  const { title, author } = req.body;
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
  book.title = req.body.title || book.title;
  book.author = req.body.author || book.author;
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
          "মেমোরি অ্যারেতে ডেটা রাখলে সার্ভার রিস্টার্ট করলেই সব হারিয়ে যায়। বাস্তবের অ্যাপে ডেটা জমা থাকে ডেটাবেসে (MongoDB, PostgreSQL ইত্যাদি)। Express ডেটাবেস নিজে সামলায় না — সাধারণত Mongoose বা Prisma-র মতো লাইব্রেরি দিয়ে যোগাযোগ করে, যা আপনার পরবর্তী শেখার তালিকায় আছে।",
      },
    ],
  },
  {
    id: "error-handling",
    title: "এরর হ্যান্ডলিং",
    subtitle: "ভাঙা জায়গা ধরা ও ইউজারকে সুন্দর রেসপন্স দেওয়া",
    duration: "১২ মিনিট",
    blocks: [
      {
        type: "text",
        content:
          "সফটওয়্যারে এরর আসবেই — ইউজার ভুল ডেটা দেবে, ডেটাবেস কানেকশন ছিঁড়ে যাবে, কোডে বাগ থাকবে। ভালো ব্যাকএন্ড ডেভেলপারের পরিচয় হলো এররের মুখে সার্ভার ক্র্যাশ না করে পরিষ্কার, অর্থবহ রেসপন্স পাঠানো। Express এর জন্য দেয় বিশেষ ধরনের এরর-হ্যান্ডলিং মিডলওয়্যার।",
      },
      {
        type: "heading",
        content: "৪০৪: যে রাউটেই নেই",
      },
      {
        type: "text",
        content:
          "ইউজার যদি এমন URL-এ যায় যেটি আপনি লেখেননি, Express ডিফল্ট HTML পেজ দেখায় (Cannot GET /xyz) — দেখতে খারাপ লাগে। সব রাউটের নিচে একটি ক্যাচ-অল (catch-all) হ্যান্ডলার রাখলে সুন্দর ৪০৪ দেখানো যায়:",
      },
      {
        type: "code",
        language: "js",
        filename: "server.js",
        code: `// সব রাউটের একদম শেষে রাখুন
app.use((req, res) => {
  res.status(404).json({
    error: "রাস্তাটি খুঁজে পাওয়া যায়নি: " + req.url,
  });
});`,
      },
      {
        type: "heading",
        content: "এরর-হ্যান্ডলিং মিডলওয়্যার",
      },
      {
        type: "text",
        content:
          "এরর হ্যান্ডলিং মিডলওয়্যারকে সাধারণ মিডলওয়্যার থেকে আলাদা করে চেনে Express — এতে চারটি প্যারামিটার থাকে: (err, req, res, next)। চারটিই না লিখলে Express বুঝবে না এটি এরর হ্যান্ডলার! কোথাও এরর হলে (যেমন throw করলে) কন্ট্রোল সরাসরি এই মিডলওয়্যারে চলে আসে:",
      },
      {
        type: "code",
        language: "js",
        code: `// এরর হ্যান্ডলার: ৪টি প্যারামিটার, সব রাউটের শেষে
app.use((err, req, res, next) => {
  console.error("এরর ধরা পড়েছে:", err.message);
  res.status(500).json({
    error: "সার্ভারে কিছু একটা ভুল হয়েছে!",
  });
});`,
      },
      {
        type: "heading",
        content: "নিজে এরর পাঠানো: next(err)",
      },
      {
        type: "text",
        content:
          "যেকোনো মিডলওয়্যার বা রাউট থেকে next(err) কল করলে সাথে সাথে এরর হ্যান্ডলারে চলে যায় — মাঝের কোনো রাউট আর চলে না। এভাবে এক জায়গায় সব এররের হিসাব রাখা যায়:",
      },
      {
        type: "code",
        language: "js",
        code: `app.get("/risky", (req, res, next) => {
  try {
    // ধরুন এখানে কোনো ঝুঁকিপূর্ণ কাজ হচ্ছে
    throw new Error("ডেটাবেস কানেকশন পাওয়া যায়নি!");
  } catch (err) {
    next(err); // এররটি হ্যান্ডলারে পাঠিয়ে দিলাম
  }
});`,
      },
      {
        type: "warning",
        content:
          "Express 4-এ async ফাংশনের ভেতরে (যেমন await ব্যবহার করা কোডে) এরর হলে সেটি স্বয়ংক্রিয়ভাবে ধরা পড়ে না — try/catch দিয়ে ধরে next(err) পাঠাতে হয়। Express 5-এ এই সমস্যা নেই, এরর নিজেই হ্যান্ডলারে চলে যায়। তাই Express 4 ব্যবহার করলে অভ্যাস করুন: async রাউটে সবসময় try/catch।",
      },
      {
        type: "code",
        language: "js",
        code: `// Express 4-এ async রাউটের নিরাপদ প্যাটার্ন
app.get("/data", async (req, res, next) => {
  try {
    const data = await loadDataFromDb();
    res.json(data);
  } catch (err) {
    next(err);
  }
});`,
      },
      {
        type: "tip",
        content:
          "স্ট্যাটাস কোড বুদ্ধিমানের মতো পাঠান: err.status থাকলে সেটি, নাহলে 500। এতে ক্লায়েন্ট বুঝতে পারে সমস্যা তার নাকি সার্ভারের। পরে বড় প্রজেক্টে নিজের এরর ক্লাস (class AppError extends Error) বানানো শিখবেন।",
      },
      {
        type: "note",
        content:
          "প্রোডাকশনে এররের বিস্তারিত তথ্য ক্লায়েন্টকে ফাঁস করা বিপজ্জনক — ডেভেলপার দেখবে লগে (console.error), ক্লায়েন্ট পাবে শুধু সাধারণ বার্তা। নিরাপত্তা ও পেশাদারিত্বের দুটোই কথা!",
      },
    ],
  },
  {
    id: "template-engine",
    title: "টেমপ্লেট ইঞ্জিন (EJS)",
    subtitle: "সার্ভারে HTML পেজ বানিয়ে ডায়নামিক ডেটা দেখানো",
    duration: "১০ মিনিট",
    blocks: [
      {
        type: "text",
        content:
          "এ পর্যন্ত আমরা হয় টেক্সট পাঠিয়েছি, নয় JSON। কিন্তু অনেক ওয়েবসাইটেই সার্ভার HTML পেজ বানিয়ে পাঠায় — ইউজারের নাম, ছবি, ডেটা এম্বেড করা পেজ। এই কাজ করে টেমপ্লেট ইঞ্জিন (template engine): আপনি টেমপ্লেট ফাইল লিখবেন, ডেটা দেবেন, ইঞ্জিন মিলিয়ে ফাইনাল HTML বানিয়ে দেবে। জনপ্রিয় টেমপ্লেট ইঞ্জিনের মধ্যে EJS সবচেয়ে শেখার মতো সহজ — কারণ এতে সরাসরি HTML-ই লেখা হয়।",
      },
      {
        type: "heading",
        content: "EJS সেটআপ",
      },
      {
        type: "code",
        language: "bash",
        code: `npm install ejs`,
      },
      {
        type: "code",
        language: "js",
        filename: "server.js",
        code: `const express = require("express");
const path = require("path");
const app = express();

// ভিউ ফাইলগুলো কোথায় আর কোন ইঞ্জিন ব্যবহার হবে
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/profile/:name", (req, res) => {
  res.render("profile", {
    name: req.params.name,
    role: "শিক্ষার্থী",
  });
});

app.listen(3000);`,
      },
      {
        type: "heading",
        content: "টেমপ্লেট ফাইল",
      },
      {
        type: "text",
        content:
          "প্রজেক্টে views ফোল্ডার বানিয়ে তার ভেতরে profile.ejs ফাইল তৈরি করুন। সাধারণ HTML-এর ভেতরে EJS-এর বিশেষ ট্যাগ দিয়ে JavaScript চালানো যায়:",
      },
      {
        type: "code",
        language: "html",
        filename: "views/profile.ejs",
        code: `<!DOCTYPE html>
<html lang="bn">
<head>
  <title><%= name %> এর প্রোফাইল</title>
</head>
<body>
  <h1>স্বাগতম, <%= name %>!</h1>
  <p>আপনার পরিচয়: <%= role %></p>

  <% if (name === "admin") { %>
    <a href="/admin">অ্যাডমিন প্যানেল</a>
  <% } %>
</body>
</html>`,
      },
      {
        type: "text",
        content:
          "এখন localhost:3000/profile/রাফি খুললে দেখবেন \"স্বাগতম, রাফি!\" — সার্ভার নিজেই HTML বানিয়ে পাঠিয়েছে। EJS-এর তিনটি প্রধান ট্যাগ মনে রাখুন:",
      },
      {
        type: "list",
        items: [
          "<%= value %> — ভ্যালু প্রিন্ট করে (HTML এস্কেপ করে, তাই নিরাপদ)",
          "<% code %> — শুধু কোড চালায় (if/for লুপের জন্য), কিছু প্রিন্ট করে না",
          "<%- include('header') %> — অন্য টেমপ্লেট ফাইল যোগ করে (নেভবার-ফুটার শেয়ার করতে)",
        ],
      },
      {
        type: "heading",
        content: "লুপ চালিয়ে তালিকা দেখানো",
      },
      {
        type: "code",
        language: "html",
        filename: "views/books.ejs",
        code: `<h2>আমাদের লাইব্রেরি</h2>
<ul>
  <% books.forEach(function(book) { %>
    <li><%= book.title %> — <%= book.author %></li>
  <% }) %>
</ul>`,
      },
      {
        type: "code",
        language: "js",
        filename: "server.js (সংশ্লিষ্ট রাউট)",
        code: `app.get("/books-page", (req, res) => {
  res.render("books", {
    books: [
      { title: "পথের পাঁচালী", author: "বিভূতিভূষণ" },
      { title: "লালসালু", author: "সৈয়দ ওয়ালীউল্লাহ" },
    ],
  });
});`,
      },
      {
        type: "note",
        content:
          "res.render() টেমপ্লেট রেন্ডার করে, আর res.sendFile() শুধু ফাইল কপি করে পাঠায় — ডেটা ঢোকানোর সুযোগ নেই। এছাড়া Pug, Handlebars-এর মতো আরও টেমপ্লেট ইঞ্জিন আছে; ধারণা একই, সিনট্যাক্স ভিন্ন।",
      },
      {
        type: "tip",
        content:
          "আজকাল বেশিরভাগ অ্যাপে ফ্রন্টএন্ড (React/Vue) আলাদাভাবে বানানো হয় আর সার্ভার শুধু API দেয়। তবু সিম্পল সাইট, ইমেইল টেমপ্লেট বা SEO-গুরুত্বপূর্ণ পেজের জন্য সার্ভার-সাইড রেন্ডারিং (SSR) আজও অমূল্য — ধারণাটা কাজে লাগবেই।",
      },
    ],
  },
  {
    id: "structure",
    title: "প্রজেক্ট স্ট্রাকচার ও পরবর্তী ধাপ",
    subtitle: "পেশাদার প্রজেক্ট সাজানো আর শেখার রোডম্যাপ",
    duration: "১২ মিনিট",
    blocks: [
      {
        type: "text",
        content:
          "এত পাঠে আমরা সব কোড একটিমাত্র server.js ফাইলে লিখেছি — শেখার জন্য ঠিকই আছে, কিন্তু বড় প্রজেক্টে হাজার লাইনের এক ফাইল টেনে টোল পরিষ্কারের মতোই কষ্টকর। পেশাদার প্রজেক্টে কোড সাজানো হয় কাজের ধরন অনুযায়ী: রাউট এক জায়গায়, বিজনেস লজিক আরেক জায়গায়, মিডলওয়্যার তার নিজের ঘরে।",
      },
      {
        type: "heading",
        content: "একটি সুন্দর প্রজেক্ট স্ট্রাকচার",
      },
      {
        type: "code",
        language: "text",
        filename: "ফোল্ডার স্ট্রাকচার",
        code: `my-app/
├── src/
│   ├── routes/       # সব রাউট ডেফিনিশন
│   │   ├── books.js
│   │   └── users.js
│   ├── controllers/  # রাউটের হ্যান্ডলার লজিক
│   ├── middleware/   # নিজের মিডলওয়্যার
│   ├── models/       # ডেটাবেস স্কিমা
│   └── app.js        # অ্যাপ সেটআপ
├── public/           # স্ট্যাটিক ফাইল
├── views/            # টেমপ্লেট
├── .env              # সিক্রেট কনফিগ
├── package.json
└── server.js         # সার্ভার চালুর এন্ট্রি পয়েন্ট`,
      },
      {
        type: "heading",
        content: "express.Router() দিয়ে রাউট আলাদা করা",
      },
      {
        type: "text",
        content:
          "express.Router() হলো ছোট, আলাদা রাউটিং সিস্টেম — যাকে নিজস্ব ফাইলে লিখে মূল অ্যাপে মাউন্ট করা যায়। প্রথমে routes/books.js ফাইলটি দেখুন:",
      },
      {
        type: "code",
        language: "js",
        filename: "src/routes/books.js",
        code: `const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "সব বইয়ের তালিকা" });
});

router.get("/:id", (req, res) => {
  res.json({ message: req.params.id + " নম্বর বই" });
});

module.exports = router;`,
      },
      {
        type: "code",
        language: "js",
        filename: "src/app.js",
        code: `const express = require("express");
const booksRouter = require("./routes/books");
const app = express();

app.use(express.json());

// /books পাথের সব রিকোয়েস্ট booksRouter-এ যাবে
app.use("/books", booksRouter);

module.exports = app;`,
      },
      {
        type: "text",
        content:
          "মজার বিষয়: books.js ফাইলে router.get(\"/\") লিখেছি, কিন্তু ব্রাউজারে যেতে হয় /books — কারণ মাউন্ট করার সময় প্রিফিক্স /books দেওয়া হয়েছে। এভাবে প্রতিটি রিসোর্সের রাউট আলাদা ফাইলে থাকলে প্রজেক্ট অসাধারণ গোছানো লাগে।",
      },
      {
        type: "heading",
        content: "এনভায়রনমেন্ট ভেরিয়েবল (.env)",
      },
      {
        type: "text",
        content:
          "পোর্ট, ডেটাবেস পাসওয়ার্ড, API কী — এসব সিক্রেট কোডে হার্ডকোড করা বিপজ্জনক। এগুলো রাখা হয় .env ফাইলে, আর dotenv প্যাকেজ দিয়ে লোড করা হয়:",
      },
      {
        type: "code",
        language: "bash",
        code: `npm install dotenv`,
      },
      {
        type: "code",
        language: "text",
        filename: ".env",
        code: `PORT=3000
DB_URL=mongodb://localhost:27017/mydb`,
      },
      {
        type: "code",
        language: "js",
        filename: "server.js",
        code: `require("dotenv").config();
const app = require("./src/app");

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("সার্ভার চলছে " + PORT + " পোর্টে");
});`,
      },
      {
        type: "warning",
        content:
          ".env ফাইল GitHub-এ কমিট করবেন না! .gitignore-এ .env যোগ করে দিন। বরং .env.example নামে (কী-কী ভ্যালু লাগবে তার তালিকা, ভ্যালু ছাড়া) একটি কপি কমিট করুন যাতে টিমের সবাই বুঝে।",
      },
      {
        type: "heading",
        content: "পরবর্তী শেখার রোডম্যাপ",
      },
      {
        type: "text",
        content:
          "অভিনন্দন! Express-এর মূল সবকিছু শেষ করেছেন। এবার ধাপে ধাপে এগোন:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "ডেটাবেস — MongoDB + Mongoose অথবা PostgreSQL + Prisma দিয়ে ডেটা স্থায়ীভাবে জমা রাখা",
          "অথেনটিকেশন — JWT দিয়ে লগইন-রেজিস্ট্রেশন সিস্টেম ও পাসওয়ার্ড হ্যাশিং (bcrypt)",
          "ভ্যালিডেশন — zod বা Joi দিয়ে ইনপুট যাচাই, সাথে rate-limiting ও helmet দিয়ে নিরাপত্তা",
          "TypeScript — টাইপ নিরাপদ Express, বড় প্রজেক্টের আসল বন্ধু",
          "টেস্টিং — Jest + Supertest দিয়ে API টেস্ট লেখা",
          "ডিপ্লয় — Railway, Render বা VPS-এ সার্ভার উঠিয়ে বিশ্বকে দেখানো!",
        ],
      },
      {
        type: "tip",
        content:
          "প্র্যাকটিস প্রজেক্টের আইডিয়া: টু-ডু লিস্ট API (CRUD + কমপ্লিট মার্ক), ব্লগ API (পোস্ট + কমেন্ট + অথ), আবহাওয়ার অ্যাপ (বাইরের API কল করা শেখা)। ছোট ছোট প্রজেক্ট বানান, বানাতে বানাতে আসল শেখা হয়ে যাবে!",
      },
    ],
  },
];
