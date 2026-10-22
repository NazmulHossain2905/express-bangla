import type { Lesson } from "./types";

export const moduleSystems: Lesson[] = [
  {
    id: "commonjs",
    title: "CommonJS: require() ও module.exports",
    subtitle: "Node.js-এর ক্লাসিক মডিউল সিস্টেম — যেটা আজও চলছে",
    duration: "১২ মিনিট",
    keywords: ["commonjs", "require", "module.exports", "exports", "cjs", "module system"],
    blocks: [
      {
        type: "text",
        content:
          "মডিউল মানে গুছানো টুকরো — বড় প্রোগ্রামকে ছোট ছোট ফাইলে ভাগ করে লেখা, যাতে এক ফাইল আরেক ফাইলের কোড ব্যবহার করতে পারে। Node.js 2009 সালে জন্ম নেওয়ার সময় থেকেই ব্যবহার করে আসছে CommonJS — যেখানে require() দিয়ে কোড আনে আর module.exports দিয়ে কোড দেয়। বিশ্বের অগণিত পুরনো ও চলমান প্রজেক্টে আজও CommonJS-ই চলছে, তাই এটা না জানলে বাস্তবের কোডবেস পড়াই কঠিন হয়ে যাবে।",
      },
      {
        type: "note",
        content:
          "Node.js 24-এও CommonJS সম্পূর্ণভাবে সাপোর্টেড — এটা কোনো মৃত প্রযুক্তি নয়। npm-এর বেশিরভাগ প্যাকেজ দুই সিস্টেমেই কাজ করে। নতুন প্রজেক্টে সাধারণত ES Modules বেছে নেওয়া হয়, কিন্তু CommonJS পড়তে-লিখতে পারা প্রতিটি ব্যাকএন্ড ডেভেলপারের জন্য বাধ্যতামূলক দক্ষতা।",
      },
      {
        type: "heading",
        content: "module.exports: নিজের কোড বাইরে দেওয়া",
      },
      {
        type: "text",
        content:
          "প্রতিটি CommonJS ফাইল একটি মডিউল। একটি ফাইলে module.exports-এ যা বসাবেন, require() করলে বাইরে ঠিক সেটিই পাওয়া যায়। সহজ একটা উদাহরণ — বাংলা তারিখ ফরম্যাট করার দুটি ফাংশন আছে এমন একটি মডিউল:",
      },
      {
        type: "code",
        language: "js",
        variant: "cjs",
        filename: "utils/date.cjs",
        code: `// এই ফাইলের ভেতরের সবকিছু প্রাইভেট —
// যা module.exports-এ বসবে, শুধু সেটাই বাইরে যাবে

function formatDate(date) {
  const months = [
    "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল",
    "মে", "জুন", "জুলাই", "আগস্ট",
    "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর",
  ];
  return \`\${date.getDate()} \${months[date.getMonth()]} \${date.getFullYear()}\`;
}

function greetInBangla(name) {
  const hour = new Date().getHours();
  if (hour < 12) return "শুভ সকাল, " + name;
  if (hour < 17) return "শুভ অপরাহ্ন, " + name;
  return "শুভ সন্ধ্যা, " + name;
}

// দুটি ফাংশনই এক অবজেক্টে প্যাক করে দিলাম
module.exports = { formatDate, greetInBangla };`,
      },
      {
        type: "code",
        language: "js",
        variant: "cjs",
        filename: "server.cjs",
        code: `const express = require("express");
const { formatDate, greetInBangla } = require("./utils/date.cjs");

const app = express();

app.get("/", (req, res) => {
  res.send(greetInBangla("রাফি") + " — আজ " + formatDate(new Date()));
});

app.listen(3000);`,
      },
      {
        type: "heading",
        content: "require() যেভাবে ফাইল খুঁজে বের করে",
      },
      {
        type: "text",
        content:
          "require()-কে যা দেওয়া হয়, সেটার ধরন অনুযায়ী Node.js ঠিক করে কোথা থেকে মডিউল আনবে। নিয়মগুলো মুখস্থ নয়, বুঝে নিন:",
      },
      {
        type: "table",
        headers: ["require()-এ যা লেখা হয়", "Node কোথা থেকে আনে", "উদাহরণ"],
        rows: [
          ["নাম (স্ল্যাশ ছাড়া)", "node_modules ফোল্ডার থেকে (npm প্যাকেজ)", "require(\"express\")"],
          ["./ বা ../ দিয়ে শুরু", "নিজের প্রজেক্টের আপেক্ষিক পাথ", "require(\"./utils/date\")"],
          ["কোর মডিউলের নাম", "Node.js-এর ভেতরে বিল্ট-ইন", "require(\"path\"), require(\"fs\")"],
          ["/ দিয়ে শুরু (absolute)", "কম্পিউটারের সম্পূর্ণ পাথ", "require(\"/usr/lib/helper\")"],
        ],
      },
      {
        type: "note",
        content:
          "লক্ষ্য করুন — CommonJS-এ require(\"./utils/date\") লিখলেও চলে (.js এক্সটেনশনটা বাদ দিলে Node নিজেই date.js খুঁজে নেয়)। কিন্তু ES Modules-এ এক্সটেনশন বাধ্যতামূলক — এই পার্থক্যটা পরের পাঠে আবার আসবে।",
      },
      {
        type: "heading",
        content: "এক্সপোর্টের দুই স্টাইল",
      },
      {
        type: "text",
        content:
          "CommonJS-এ exports-এর দুটো চেনা স্টাইল আছে। প্রথমটি একবারে সব সেট করা — যা আমরা উপরে দেখেছি। দ্বিতীয়টি একটা একটা করে প্রপার্টি বসানো:",
      },
      {
        type: "code",
        language: "js",
        variant: "cjs",
        filename: "utils/math.cjs",
        code: `// স্টাইল ১: শেষে একবারে সব দিয়ে দেওয়া
module.exports = { add, multiply };

// স্টাইল ২: একটা একটা করে বসানো — exports আসলে
// module.exports-এরই একটা শর্টকাট রেফারেন্স
exports.add = (a, b) => a + b;
exports.multiply = (a, b) => a * b;

// স্টাইল ৩: একটামাত্র জিনিস দিতে চাইলে সরাসরি ফাংশন/ক্লাস
module.exports = function validateEmail(email) {
  return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
};`,
      },
      {
        type: "warning",
        content:
          "সবচেয়ে বড় ভুল: module.exports = {...} আর exports.x = ... একসাথে মেশানো! exports যেহেতু শুধু module.exports-এর রেফারেন্স, module.exports-কে নতুন অবজেক্টে বদলে দিলে exports-এ পরে যা বসান সব হারিয়ে যায়। নিয়ম: একটা ফাইলে একটা স্টাইলই ব্যবহার করুন।",
      },
      {
        type: "heading",
        content: "Node.js-এর বিল্ট-ইন মডিউল",
      },
      {
        type: "text",
        content:
          "Node.js নিজেই অনেক কাজের মডিউল সাথে নিয়ে আসে — এগুলো ইনস্টল করতে হয় না। Express অ্যাপে বারবার দেখবেন:",
      },
      {
        type: "table",
        headers: ["মডিউল", "কাজ", "CommonJS ব্যবহার"],
        rows: [
          ["path", "ফাইল পাথ জোড়া/নরমালাইজ করা", "const path = require(\"node:path\")"],
          ["fs", "ফাইল পড়া/লেখা", "const fs = require(\"node:fs\")"],
          ["crypto", "হ্যাশ, র‍্যান্ডম ভ্যালু", "const crypto = require(\"node:crypto\")"],
          ["url", "URL পার্স করা", "const url = require(\"node:url\")"],
          ["http", "লো-লেভেল HTTP সার্ভার/ক্লায়েন্ট", "const http = require(\"node:http\")"],
        ],
      },
      {
        type: "note",
        content:
          "node: প্রিফিক্স (যেমন require(\"node:path\")) আধুনিক এবং নিরাপদ লেখা — এটা নিশ্চিত করে যে নামটা npm প্যাকেজ নয়, Node-এর বিল্ট-ইন মডিউলই লোড হচ্ছে। পুরনো লেখা require(\"path\")-ও ঠিক আছে।",
      },
      {
        type: "heading",
        content: "কখন CommonJS এখনও দরকার?",
      },
      {
        type: "list",
        items: [
          "লিগ্যাসি প্রজেক্ট — চাকরিতে পাওয়া বেশিরভাগ পুরনো কোডবেস CommonJS-এ লেখা, সেগুলো বুঝে মেরামত করতে হবে",
          "কিছু টুল/প্লাগিন এখনও CJS-অনলাভ (CJS থেকে require করা যায় না এমন) — যদিও সংখ্যা কমে আসছে",
          "দ্রুত স্ক্রিপ্ট — ছোট স্ক্রিপ্টে \"type\": \"module\" সেট না করে সরাসরি require দিয়ে লিখে ফেলা সুবিধাজনক",
          "কমন জ্ঞান — ইন্টারভিউতে CommonJS বনাম ESM-এর পার্থক্য একটা ক্লাসিক প্রশ্ন!",
        ],
      },
      {
        type: "tip",
        content:
          ".cjs এক্সটেনশন দিয়ে ফাইল সেভ করলে Node সেটাকে সবসময় CommonJS ধরে নেয় — প্রজেক্টে \"type\": \"module\" থাকলেও। তিনটা এক্সটেনশন মনে রাখুন: .cjs = CommonJS, .mjs = ESM, .js = package.json-এর \"type\" যা বলে তা-ই।",
      },
    ],
  },
  {
    id: "esm",
    title: "ES Modules: import ও export",
    subtitle: "আধুনিক জাভাস্ক্রিপ্ট মডিউল সিস্টেম — নতুন প্রজেক্টের স্ট্যান্ডার্ড",
    duration: "১৫ মিনিট",
    keywords: ["esm", "es modules", "import", "export", "type module", "mjs", "import express"],
    blocks: [
      {
        type: "text",
        content:
          "ES Modules (ECMAScript Modules) হলো জাভাস্ক্রিপ্টের অফিসিয়াল, স্ট্যান্ডার্ড মডিউল সিস্টেম — ব্রাউজার আর Node.js দুই জায়গাতেই চলে। Node.js 12 (2019) থেকে স্টেবল সাপোর্ট পেয়েছে, আর 2020-এর দশকের শেষে এসে নতুন প্রজেক্টের ডিফল্ট পছন্দ হয়ে গেছে। নতুন প্যাকেজগুলো (Zod, Drizzle, অধিকাংশ আধুনিক লাইব্রেরি) ESM-first হয়ে আসছে, তাই Express শেখার পথে এটা আয়ত্তে আনা জরুরি।",
      },
      {
        type: "heading",
        content: "\"type\": \"module\" — চালু করার সুইচ",
      },
      {
        type: "text",
        content:
          "Node.js ডিফল্টভাবে .js ফাইলকে CommonJS ধরে নেয়। ES Modules ব্যবহার করতে চাইলে package.json-এ \"type\": \"module\" যোগ করতে হয় — তখন সব .js ফাইল ESM নিয়মে চলবে:",
      },
      {
        type: "code",
        language: "json",
        filename: "package.json (আংশিক)",
        code: `{
  "name": "express-esm-demo",
  "type": "module",
  "scripts": {
    "dev": "node --watch server.js"
  },
  "dependencies": {
    "express": "^5.3.0"
  }
}`,
      },
      {
        type: "code",
        language: "js",
        variant: "esm",
        filename: "server.js",
        code: `import express from "express";

const app = express();
const PORT = process.env.PORT ?? 3000;

app.get("/", (req, res) => {
  res.send("স্বাগতম Express.js Bangla Docs-এ!");
});

app.listen(PORT, () => {
  console.log(\`সার্ভার চলছে http://localhost:\${PORT} ঠিকানায়\`);
});`,
      },
      {
        type: "note",
        content:
          "\"type\": \"module\" সেট না করেও ESM চালানো যায় — ফাইলের এক্সটেনশন .mjs করলেই Node বুঝে যায় এটা ES Module। উল্টোটাও সত্যি: \"type\": \"module\" থাকা প্রজেক্টে কোনো ফাইলকে CommonJS করতে চাইলে এক্সটেনশন .cjs দিন।",
      },
      {
        type: "heading",
        content: "import-এর নানা রূপ",
      },
      {
        type: "text",
        content:
          "ES Modules-এ আনার কয়েকটা প্যাটার্ন আছে — কোনটা কখন লাগে সব একসাথে দেখুন। প্রথমে যে ফাইল থেকে আনব, সেটি লিখি:",
      },
      {
        type: "code",
        language: "js",
        variant: "esm",
        filename: "utils/text.js",
        code: `// নাম দিয়ে এক্সপোর্ট — এক ফাইলে যত খুশি
export function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/\\s+/g, "-");
}

export function truncate(text, limit = 50) {
  if (text.length <= limit) return text;
  return text.slice(0, limit) + "…";
}

export const MAX_TITLE_LENGTH = 100;

// ডিফল্ট এক্সপোর্ট — এক ফাইলে সর্বোচ্চ একটাই
export default function formatDate(date) {
  return new Intl.DateTimeFormat("bn-BD").format(date);
}`,
      },
      {
        type: "code",
        language: "js",
        variant: "esm",
        filename: "server.js (আংশিক)",
        code: `import express from "express";

// ১. ডিফল্ট এক্সপোর্ট আনা — নাম যা খুশি দিতে পারেন
import formatDate from "./utils/text.js";

// ২. নাম দিয়ে আনা — নাম হুবহু মিলতে হবে
import { slugify, truncate, MAX_TITLE_LENGTH } from "./utils/text.js";

// ৩. নাম বদলে আনা
import { slugify as toSlug } from "./utils/text.js";

// ৪. সব এক অবজেক্টে আনা
import * as textUtils from "./utils/text.js";

// ৫. এক্সপ্রেশন দিয়ে ডাইনামিক আনা — যখন পাথ রানটাইমে জানা যায়
const moduleName = "./utils/text.js";
const mod = await import(moduleName);`,
      },
      {
        type: "warning",
        content:
          "ES Modules-এ আনার পাথে এক্সটেনশন বাধ্যতামূলক: ./utils/text.js — .js বাদ দিলে ERR_MODULE_NOT_FOUND এরর! CommonJS-এ যেটা ঐচ্ছিক ছিল, ESM-এ নিয়ম। (TypeScript-এ tsconfig-এর moduleResolution ঠিক করলে .js ছাড়াও চলে — সেটা TypeScript সেকশনে দেখব।)",
      },
      {
        type: "heading",
        content: "Node.js বিল্ট-ইন মডিউল ESM-এ",
      },
      {
        type: "code",
        language: "js",
        variant: "esm",
        code: `import path from "node:path";
import fs from "node:fs/promises";   // promise-ভিত্তিক ফাইল API
import crypto from "node:crypto";

// নাম দিয়েও আনা যায় — বেশি ব্যবহৃত আধুনিক স্টাইল:
import { join, dirname } from "node:path";
import { randomUUID } from "node:crypto";`,
      },
      {
        type: "text",
        content:
          "node: প্রিফিক্সটা ESM-এ বিশেষভাবে কাজে লাগে — এটা দিলে নিশ্চিত হয় বিল্ট-ইন মডিউলই লোড হচ্ছে, কখনো ভুল করে npm-এ ওই নামের কোনো প্যাকেজ নয়।",
      },
      {
        type: "heading",
        content: "প্রজেক্ট ভাগ করে সাজানো: রাউট, কন্ট্রোলার, সার্ভিস",
      },
      {
        type: "text",
        content:
          "ES Modules-এর সবচেয়ে সুন্দর দিক — প্রতিটি ফাইল পরিষ্কারভাবে নিজের ভূমিকা জানিয়ে দেয়: export করে যা দেয়, import করে যা নেয়। একটি বাস্তব প্রজেক্ট কাঠামো দেখুন যেখানে রাউট, কন্ট্রোলার আর সার্ভিস আলাদা:",
      },
      {
        type: "code",
        language: "text",
        filename: "ফোল্ডার স্ট্রাকচার",
        code: `bookstore/
├── src/
│   ├── routes/
│   │   └── books.routes.js    # কোন URL-এ কোন হ্যান্ডলার
│   ├── controllers/
│   │   └── books.controller.js # রিকোয়েস্ট নিয়ে কী করবে
│   ├── services/
│   │   └── books.service.js   # ডেটা/বিজনেস লজিক
│   └── app.js                 # অ্যাপ তৈরি + মিডলওয়্যার
├── package.json               # "type": "module"
└── server.js                  # শুধু সার্ভার চালু`,
      },
      {
        type: "code",
        language: "js",
        variant: "esm",
        filename: "src/services/books.service.js",
        code: `// ডেটা লেয়ার — কোথা থেকে বই আসে তার দায়িত্ব শুধু এখানে
let books = [
  { id: 1, title: "পথের পাঁচালী", author: "বিভূতিভূষণ বন্দ্যোপাধ্যায়" },
  { id: 2, title: "লালসালু", author: "সৈয়দ ওয়ালীউল্লাহ" },
];
let nextId = 3;

export function findAll() {
  return books;
}

export function findById(id) {
  return books.find((b) => b.id === Number(id));
}

export function create({ title, author }) {
  const book = { id: nextId++, title, author };
  books.push(book);
  return book;
}

export function remove(id) {
  const exists = books.some((b) => b.id === Number(id));
  if (exists) books = books.filter((b) => b.id !== Number(id));
  return exists;
}`,
      },
      {
        type: "code",
        language: "js",
        variant: "esm",
        filename: "src/controllers/books.controller.js",
        code: `import * as service from "../services/books.service.js";

// কন্ট্রোলার — রিকোয়েস্ট থেকে ডেটা বের করে সার্ভিসকে বলে, রেসপন্স পাঠায়
export function listBooks(req, res) {
  res.json(service.findAll());
}

export function getBook(req, res) {
  const book = service.findById(req.params.id);
  if (!book) {
    return res.status(404).json({ error: "বইটি নেই!" });
  }
  res.json(book);
}

export function createBook(req, res) {
  const { title, author } = req.body ?? {};
  if (!title || !author) {
    return res.status(400).json({ error: "title ও author দুটোই দরকার" });
  }
  res.status(201).json(service.create({ title, author }));
}

export function deleteBook(req, res) {
  if (!service.remove(req.params.id)) {
    return res.status(404).json({ error: "বইটি নেই!" });
  }
  res.status(204).send();
}`,
      },
      {
        type: "code",
        language: "js",
        variant: "esm",
        filename: "src/routes/books.routes.js",
        code: `import { Router } from "express";
import {
  listBooks,
  getBook,
  createBook,
  deleteBook,
} from "../controllers/books.controller.js";

export const booksRouter = Router();

booksRouter.get("/", listBooks);
booksRouter.get("/:id", getBook);
booksRouter.post("/", createBook);
booksRouter.delete("/:id", deleteBook);`,
      },
      {
        type: "code",
        language: "js",
        variant: "esm",
        filename: "src/app.js + server.js",
        code: `// src/app.js
import express from "express";
import { booksRouter } from "./routes/books.routes.js";

export const app = express();
app.use(express.json());
app.use("/books", booksRouter);

// server.js
import { app } from "./src/app.js";
const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => console.log(\`চলছে \${PORT} পোর্টে\`));`,
      },
      {
        type: "text",
        content:
          "লক্ষ্য করুন তিন স্তরের ভাগ: রাউট শুধু URL ম্যাপ করে, কন্ট্রোলার রিকোয়েস্ট/রেসপন্স সামলায়, আর সার্ভিস আসল ডেটা লজিক রাখে। পরে ডেটাবেস যোগ করতে হলে শুধু সার্ভিস লেয়ার বদলাবে — রাউট-কন্ট্রোলার একটুও ছোঁয়া লাগবে না। এভাবে ভাগ করাই বড় প্রজেক্ট টিকে থাকার রহস্য।",
      },
      {
        type: "heading",
        content: "নোডমন ছাড়াও: --watch ফ্ল্যাগ",
      },
      {
        type: "code",
        language: "bash",
        code: `# Node.js 18.11+ থেকে বিল্ট-ইন watch মোড — কোনো প্যাকেজ লাগে না
node --watch server.js

# সাথে .env লোডও চাইলে:
node --watch --env-file=.env server.js`,
      },
      {
        type: "tip",
        content:
          "nodemon-ও চমৎকার, তবে ছোট-মাঝারি প্রজেক্টে Node-এর নিজস্ব --watch ফ্ল্যাগ-ই যথেষ্ট — একটা devDependency কম! টেস্ট রানার, প্রসেস ম্যানেজমেন্টের মতো উঁচু ফিচার দরকার হলে তখন nodemon-এ ফিরে যান।",
      },
    ],
  },
  {
    id: "cjs-vs-esm",
    title: "CommonJS বনাম ES Modules",
    subtitle: "পাশাপাশি তুলনা — কোনটা কখন, কেন",
    duration: "১০ মিনিট",
    keywords: ["cjs vs esm", "commonjs vs es modules", "comparison", "difference", "which one"],
    blocks: [
      {
        type: "text",
        content:
          "দুটি পাঠে আলাদাভাবে CommonJS আর ES Modules শিখলেন। এবার পাশাপাশি রেখে তুলনা করি — কারণ বাস্তবের কাজে সিদ্ধান্তটা আসে ঠিক এখানেই: নতুন প্রজেক্টে কোনটা নেব? পুরনো কোডে কোনটা দেখব? একসাথে মেশানো যায়?",
      },
      {
        type: "heading",
        content: "এক নজরে পার্থক্য",
      },
      {
        type: "table",
        headers: ["বিষয়", "CommonJS (CJS)", "ES Modules (ESM)"],
        rows: [
          ["কোড আনা", "require(\"express\")", "import express from \"express\""],
          ["কোড দেওয়া", "module.exports = {...}", "export / export default"],
          ["প্যাকেজজ কী", "\"type\": \"commonjs\" (বা কিছু না)", "\"type\": \"module\""],
          ["ফাইল এক্সটেনশন", ".js / .cjs", ".js / .mjs"],
          ["লোকাল ফাইল পাথ", "এক্সটেনশন ঐচ্ছিক: require(\"./books\")", "এক্সটেনশন বাধ্যতামূলক: import \"./books.js\""],
          ["লোড হওয়ার সময়", "রানটাইমে, সিনক্রোনাস", "পার্স টাইমে, অ্যাসিনক্রোনাস ভিত্তি"],
          ["কখন ব্যবহার হয়", "পুরনো প্রজেক্ট, কিছু টুল", "নতুন প্রজেক্টের স্ট্যান্ডার্ড"],
          ["ব্রাউজার সাপোর্ট", "নেই", "আছে (<script type=\"module\">)"],
          ["top-level await", "না", "হ্যাঁ"],
          ["ইমপোর্ট বদলে দেওয়া", "রানটাইমে শর্ত দিয়ে সম্ভব", "স্ট্যাটিক — dynamic import() দিয়ে সম্ভব"],
        ],
      },
      {
        type: "heading",
        content: "একই কাজ — দুই স্টাইলে",
      },
      {
        type: "text",
        content:
          "একই books রাউটার দুই সিস্টেমে লিখলে পার্থক্যটা চোখে পড়ে যায়। ব্যবসায়িক লজিক হুবহু এক — শুধু আনা-দেওয়ার সিনট্যাক্স বদলায়:",
      },
      {
        type: "code",
        language: "js",
        variant: "cjs",
        filename: "routes/books.cjs — CommonJS",
        code: `const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "সব বই" });
});

module.exports = router;`,
      },
      {
        type: "code",
        language: "js",
        variant: "esm",
        filename: "routes/books.js — ES Modules",
        code: `import { Router } from "express";

export const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "সব বই" });
});`,
      },
      {
        type: "heading",
        content: "দুটো একসাথে মেশানো যায়?",
      },
      {
        type: "text",
        content:
          "হ্যাঁ — এবং বাস্তবে প্রায়ই মেশাতে হয়! Node.js দুই সিস্টেমের মধ্যে সেতু দিয়ে রেখেছে:",
      },
      {
        type: "list",
        items: [
          "ESM ফাইল থেকে CommonJS প্যাকেজ import করা যায় — import express from \"express\" কাজ করে, কারণ Node নিজেই CJS মডিউলটাকে ESM-এ মুড়ে দেয়। Express 5 এভাবেই ESM প্রজেক্টে ঝামেলাহীন চলে।",
          "CJS ফাইল থেকে ESM আনতে require() চলে না (ERR_REQUIRE_ESM) — ব্যবহার করতে হয় dynamic import(): const mod = await import(\"./esm-file.js\")।",
          "package.json-এ \"type\": \"module\" থাকলে পুরনো CJS ফাইলগুলো .cjs এক্সটেনশনে রাখলে দুই দুনিয়া এক প্রজেক্টেই চলতে পারে।",
        ],
      },
      {
        type: "warning",
        content:
          "একটি ফাইলের ভেতরে require আর import একসাথে লেখা যায় না — SyntaxError আসবে। মেশানোর ইউনিট ফাইল, লাইন নয়। আর ESM-এ import করা CJS প্যাকেজের default এক্সপোর্টটাই পাওয়া যায় — named export হিসেবে CJS-এর module.exports-এর প্রপার্টিগুলো সবসময় ধরা যায় না (cjs-module-lexer যা স্ট্যাটিকভাবে বুঝতে পারে সেগুলো ছাড়া)।",
      },
      {
        type: "heading",
        content: "তাহলে কোনটা বেছে নেবেন?",
      },
      {
        type: "list",
        items: [
          "নতুন Express প্রজেক্ট → ES Modules। ইকোসিস্টেম সেদিকেই যাচ্ছে, TypeScript-এর আধুনিক কনফিগও ESM-কেন্দ্রিক।",
          "অফিসের পুরনো প্রজেক্ট মেরামত → যে সিস্টেমে লেখা সেটাই ব্যবহার করুন। মাঝপথে সিস্টেম বদলানো ঝুঁকি ছাড়া কিছু না।",
          "টিউটোরিয়াল পড়া → উভয় সিনট্যাক্সই চেনা রাখুন — ইন্টারনেটের অর্ধেক টিউটোরিয়াল এখনো CJS-এ!",
          "npm প্যাকেজ পাবলিশ করা → দুই সিস্টেমেই কাজ করে এমন (dual) সেটআপ করা ভালো অভ্যাস।",
        ],
      },
      {
        type: "note",
        content:
          "মনে রাখুন — Express নিজে কোনো মডিউল সিস্টেম বাধ্য করে না। require(\"express\") আর import express from \"express\" দুটোই Express 5.3-এ পুরোপুরি সাপোর্টেড। পছন্দটা আপনার প্রজেক্টের package.json-এর, Express-এর নয়।",
      },
    ],
  },
  {
    id: "migrate-to-esm",
    title: "CommonJS থেকে ES Modules-এ মাইগ্রেশন",
    subtitle: "পুরনো প্রজেক্ট ধীরে ধীরে আধুনিক করার নিরাপদ পথ",
    duration: "১২ মিনিট",
    keywords: ["migrate to esm", "cjs to esm", "migration", "convert require to import"],
    blocks: [
      {
        type: "text",
        content:
          "পুরনো CommonJS প্রজেক্টটা ES Modules-এ নিয়ে যেতে চান? সম্ভব — এবং ধাপে ধাপে করলে ঝুঁকিও কম। এই পাঠে একটি সাধারণ Express 4/CJS প্রজেক্টকে Express 5/ESM-এ রূপান্তরের পুরো প্রক্রিয়া দেখব, সাথে প্রতিটি ধাপে যে এররগুলো আসবে তার ম্যাপও।",
      },
      {
        type: "heading",
        content: "শুরুর আগে: চেকলিস্ট",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "প্রজেক্টের টেস্ট আছে কি না দেখুন — না থাকলে মাইগ্রেশনের আগে অন্তত হাতে-কলমে কয়েকটা স্মোক টেস্ট লিখে নিন",
          "নির্ভরতাগুলো চেক করুন — কোনো প্যাকেজ যদি ESM-এ কাজ না করে (বিরল), বিকল্প খুঁজতে হবে",
          "Node ভার্সন 18+ নিশ্চিত করুন (আদর্শ 24 LTS)",
          "একটা নতুন git ব্রাঞ্চ খুলুন — কিছু ভুল হলে ফিরে আসার রাস্তা থাকবে",
        ],
      },
      {
        type: "heading",
        content: "ধাপ ১: সব require/module.exports খুঁজে বের করুন",
      },
      {
        type: "code",
        language: "bash",
        code: `# কোন কোন ফাইলে CJS আছে তার তালিকা
grep -r "require(" --include="*.js" src/ server.js | cut -d: -f1 | sort -u`,
      },
      {
        type: "heading",
        content: "ধাপ ২: package.json আপডেট",
      },
      {
        type: "code",
        language: "json",
        filename: "package.json (আংশিক)",
        code: `{
  "type": "module",
  "scripts": {
    "dev": "node --watch --env-file=.env server.js",
    "start": "node --env-file=.env server.js"
  }
}`,
      },
      {
        type: "text",
        content:
          "\"type\": \"module\" সেট করামাত্র প্রজেক্টের সব .js ফাইল ESM হিসেবে ব্যাখ্যা হবে — এখন কোড এডিট করার পালা। যেসব পুরনো ফাইল এখনও CJS-ই থাকতে চায় (যেমন কোনো লিগ্যাসি স্ক্রিপ্ট), সেগুলোর এক্সটেনশন .cjs করে দিন।",
      },
      {
        type: "heading",
        content: "ধাপ ৩: সিনট্যাক্স বদলান — রেসিপি",
      },
      {
        type: "table",
        headers: ["CommonJS (আগে)", "ES Modules (পরে)"],
        rows: [
          ["const express = require(\"express\")", "import express from \"express\""],
          ["const { Router } = require(\"express\")", "import { Router } from \"express\""],
          ["const path = require(\"path\")", "import path from \"node:path\""],
          ["const books = require(\"./routes/books\")", "import books from \"./routes/books.js\""],
          ["module.exports = router", "export default router"],
          ["module.exports = { list, create }", "export function list() {} / export const create = ..."],
          ["const config = require(\"../config.json\")", "import config from \"../config.json\" with { type: \"json\" }"],
        ],
      },
      {
        type: "text",
        content:
          "বাস্তব উদাহরণ হিসেবে আমাদের চেনা CJS সার্ভারটার রূপান্তর দেখুন — আগে:",
      },
      {
        type: "code",
        language: "js",
        variant: "cjs",
        filename: "server.cjs — মাইগ্রেশনের আগে",
        code: `require("dotenv").config();
const express = require("express");
const path = require("path");
const booksRouter = require("./src/routes/books");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/books", booksRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("সার্ভার চলছে " + PORT + " পোর্টে");
});`,
      },
      {
        type: "text",
        content:
          "...এবং পরে। তিনটি জায়গায় বিশেষ খেয়াল করুন — __dirname অদৃশ্য হয়ে গেছে, dotenv-এর বদলে বিল্ট-ইন ফ্ল্যাগ, আর ইমপোর্টে .js এক্সটেনশন:",
      },
      {
        type: "code",
        language: "js",
        variant: "esm",
        filename: "server.js — মাইগ্রেশনের পরে",
        code: `import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import booksRouter from "./src/routes/books.js";

const app = express();

// ESM-এ __dirname নেই — নিজে বানিয়ে নিতে হয়:
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/books", booksRouter);

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
  console.log(\`সার্ভার চলছে \${PORT} পোর্টে\`);
});`,
      },
      {
        type: "code",
        language: "bash",
        filename: "package.json (scripts আংশিক)",
        code: `// .env লোডের দায়িত্ব এখন Node-এর ফ্ল্যাগে:
"scripts": {
  "dev": "node --watch --env-file=.env server.js"
}`,
      },
      {
        type: "heading",
        content: "__dirname আর import.meta.url",
      },
      {
        type: "text",
        content:
          "CommonJS-এর দুটো ম্যাজিক ভেরিয়েবল __dirname (বর্তমান ফোল্ডারের পাথ) আর __filename (বর্তমান ফাইলের পাথ) — ESM-এ এগুলো নেই। বদলে আছে import.meta.url। দরকার হলে নিজে বানিয়ে নিন (উপরের উদাহরণে করেছি), বা আরও সহজে import.meta.dirname — Node 20.11+ থেকে সরাসরি পাওয়া যায়:",
      },
      {
        type: "code",
        language: "js",
        variant: "esm",
        code: `// Node 20.11+ (মানে Node 24-এ নিশ্চিন্তে):
import path from "node:path";

app.use(express.static(path.join(import.meta.dirname, "public")));

// ফাইলের নিজের ঠিকানা:
console.log("এই ফাইলটা এখানে:", import.meta.filename);`,
      },
      {
        type: "heading",
        content: "মাইগ্রেশনে যে এররগুলো দেখবেন",
      },
      {
        type: "table",
        headers: ["এরর", "মানে", "সমাধান"],
        rows: [
          ["SyntaxError: Cannot use import statement outside a module", "\"type\": \"module\" এখনো সেট হয়নি", "package.json-এ \"type\": \"module\" যোগ করুন"],
          ["ERR_MODULE_NOT_FOUND", "ইমপোর্ট পাথে .js এক্সটেনশন নেই", "import \"./routes/books.js\" — এক্সটেনশনসহ লিখুন"],
          ["ReferenceError: __dirname is not defined", "__dirname CJS-এর জিনিস", "import.meta.dirname বা fileURLToPath(import.meta.url) ব্যবহার করুন"],
          ["ERR_REQUIRE_ESM", "CJS ফাইল থেকে ESM-only প্যাকেজ require করা হচ্ছে", "ওই ফাইলটা .mjs করুন বা dynamic import() ব্যবহার করুন"],
          ["ERR_IMPORT_ASSERTION_TYPE_MISSING", "JSON ফাইল import করতে গিয়েছেন", "with { type: \"json\" } যোগ করুন (Node 20.10+)"],
        ],
      },
      {
        type: "heading",
        content: "ধাপ ৪: চালান, টেস্ট করুন, কমিট করুন",
      },
      {
        type: "text",
        content:
          "রূপান্তরের পর সার্ভার চালিয়ে সব রাউট একবার করে হাতে গুঁজে দেখুন — বিশেষ করে স্ট্যাটিক ফাইল সার্ভিং (path ভুল হলে সবার আগে সেটাই ধরা পড়বে)। যেটা কাজ করছে সেটা কমিট করুন, তারপর পরের ফাইলে যান। পুরো প্রজেক্ট এক কমিটে বদলাবেন না — ছোট ছোট ধাপে গেলে কিছু ভাঙলে কোথায় ভাঙল সহজে পাওয়া যায়।",
      },
      {
        type: "tip",
        content:
          "চাইলে স্বয়ংক্রিয় সাহায্যও আছে: ওয়ান-কমান্ড টুল cjs-to-es অথবা lint রুলস। তবে টুলের আউটপুট সবসময় নিজে চোখে পড়ে নেওয়ার অভ্যাস করুন — বিশেষ করে circular import (এক ফাইল আরেক ফাইলকে import করা) থাকলে ESM-এ অদ্ভুত আচরণ দেখা দিতে পারে।",
      },
      {
        type: "note",
        content:
          "এই পাঠের সব কোড আসল Node.js 24 + Express 5.3 পরিবেশে চালিয়ে যাচাই করা। Express 4-প্রজেক্টকে একসাথে Express 5-এও তুলতে চাইলে আগে ESM মাইগ্রেশন শেষ করুন, তারপর \"Express 4 থেকে 5-এ মাইগ্রেশন\" গাইডটা অনুসরণ করুন — দুই বড় বদল একসাথে করলে এরর খুঁজে বের করা দ্বিগুণ কঠিন হয়।",
      },
    ],
  },
];
