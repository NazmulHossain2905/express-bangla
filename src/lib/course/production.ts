import type { Lesson } from "./types";

export const production: Lesson[] = [
  {
    id: "testing",
    title: "টেস্টিং: Supertest দিয়ে API টেস্ট",
    subtitle: "ভাঙা আগে ধরা — স্বয়ংক্রিয় টেস্ট দিয়ে নিশ্চিন্তে কোড বদলান",
    duration: "১৪ মিনিট",
    keywords: ["testing", "supertest", "node test runner", "api test", "test express app", "unit test"],
    blocks: [
      {
        type: "text",
        content:
          "কোড বদলালেন, কোথাও কিছু ভাঙল কি না — হাতে ২০টা রাউট curl দিয়ে চেক করা যায়, ২০০টা হলে? টেস্ট লেখা মানে এই চেকটাই স্বয়ংক্রিয় করা: একবার লিখে রাখুন, তারপর প্রতিবার এক কমান্ডে সব যাচাই। বাগ আগে ধরা পড়ে, রিফ্যাক্টর করার সাহস বাড়ে, আর ভবিষ্যতের নিজেকেই (বা সহকর্মীকে) ডকুমেন্টেশন উপহার দেন — টেস্টই বলে দেয় API-র আচরণ কেমন হওয়ার কথা।",
      },
      {
        type: "heading",
        content: "টুল চয়েস: Node Test Runner + Supertest",
      },
      {
        type: "text",
        content:
          "Node.js 18 থেকে বিল্ট-ইন টেস্ট রানার পাওয়া যায় (node:test) — কোনো ফ্রেমওয়ার্ক ইনস্টল ছাড়াই test, assert, মকিং সব আছে। জনপ্রিয় বিকল্প Jest/Vitest-ও আছে, কিন্তু ছোট-মাঝারি Express প্রজেক্টে Node-এর নিজস্ব রানারই যথেষ্ট ও হালকা। আর HTTP রিকোয়েস্ট নকল করার জন্য চাই Supertest — সত্যিকারের সার্ভার পোর্ট খুলে ফেলে না, ভেতরের কানেকশনেই রিকোয়েস্ট পাঠায়:",
      },
      {
        type: "code",
        language: "bash",
        code: `npm install --save-dev supertest`,
      },
      {
        type: "heading",
        content: "টেস্টযোগ্য কাঠামো: অ্যাপ আর সার্ভার আলাদা",
      },
      {
        type: "text",
        content:
          "টেস্ট লেখার আগে একটা ছোট পুনর্গঠন দরকার: app.js-এ app তৈরি করে export করুন, আর server.js শুধু listen করুক। কারণ Supertest-এর দরকার app, সার্ভারের নয় — এতে টেস্টে পোর্ট নিয়ে ঝামেলাই হয় না। এই প্যাটার্ন আমরা প্রজেক্ট স্ট্রাকচার পাঠেই শিখেছি:",
      },
      {
        type: "code",
        language: "js",
        variant: "esm",
        filename: "src/app.js",
        code: `import express from "express";

export const app = express();
app.use(express.json());

let books = [
  { id: 1, title: "পথের পাঁচালী", author: "বিভূতিভূষণ" },
];

app.get("/books", (req, res) => {
  res.json(books);
});

app.post("/books", (req, res) => {
  const { title, author } = req.body ?? {};
  if (!title || !author) {
    return res.status(400).json({ error: "title ও author দরকার" });
  }
  const book = { id: books.length + 1, title, author };
  books.push(book);
  res.status(201).json(book);
});

export function resetBooks() {
  books = [{ id: 1, title: "পথের পাঁচালী", author: "বিভূতিভূষণ" }];
}`,
      },
      {
        type: "heading",
        content: "প্রথম টেস্ট ফাইল",
      },
      {
        type: "code",
        language: "js",
        variant: "esm",
        filename: "test/books.test.js",
        code: `import test from "node:test";
import assert from "node:assert/strict";
import request from "supertest";

import { app, resetBooks } from "../src/app.js";

// প্রতিটি টেস্টের আগে ডেটা রিসেট — টেস্টগুলো স্বাধীন থাকে
test("GET /books বইয়ের তালিকা দেয়", async () => {
  const res = await request(app).get("/books");

  assert.equal(res.status, 200);
  assert.ok(Array.isArray(res.body));
  assert.ok(res.body.length > 0);
});

test("POST /books নতুন বই তৈরি করে (201)", async () => {
  const res = await request(app)
    .post("/books")
    .send({ title: "লালসালু", author: "সৈয়দ ওয়ালীউল্লাহ" });

  assert.equal(res.status, 201);
  assert.equal(res.body.title, "লালসালু");
  assert.ok(res.body.id > 0);
});

test("POST /books বিনা টাইটেলে 400 দেয়", async () => {
  const res = await request(app)
    .post("/books")
    .send({ author: "কেউ একজন" }); // title নেই!

  assert.equal(res.status, 400);
  assert.ok(res.body.error);
});

test("GET /books/:id অবৈধ আইডিতে 404", async () => {
  const res = await request(app).get("/books/999");
  assert.equal(res.status, 404);
});`,
      },
      {
        type: "code",
        language: "json",
        filename: "package.json (scripts)",
        code: `"scripts": {
  "test": "node --test",
  "dev": "node --watch server.js"
}`,
      },
      {
        type: "code",
        language: "bash",
        code: `npm test`,
        output: `▶ GET /books বইয়ের তালিকা দেয়
✔ GET /books বইয়ের তালিকা দেয় (12ms)
▶ POST /books নতুন বই তৈরি করে (201)
✔ POST /books নতুন বই তৈরি করে (201) (8ms)
...

# tests 4
# suites 0
# pass 4
# fail 0`,
      },
      {
        type: "heading",
        content: "টেস্টের স্তরগুলো",
      },
      {
        type: "list",
        items: [
          "ইউনিট টেস্ট — একক ফাংশনের টেস্ট (যেমন slugify() ঠিক আউটপুট দেয় কি না), ডেটাবেস/নেটওয়ার্ক ছাড়া",
          "ইন্টিগ্রেশন টেস্ট — কয়েকটা অংশ মিলে কাজ করে কি না (রাউট + ডেটাবেস)",
          "E2E (end-to-end) — চালু সার্ভারের বিপরীতে পুরো ফ্লো টেস্ট (লগইন → অর্ডার → পেমেন্ট)",
          "Supertest-এর টেস্টগুলো মূলত ইন্টিগ্রেশন স্তরের — রাউট+মিডলওয়্যার+হ্যান্ডলার একসাথে চালায়",
        ],
      },
      {
        type: "warning",
        content:
          "টেস্ট লেখার বড় নিয়মগুলো: এক টেস্ট এক জিনিস পরীক্ষা করবে। টেস্টগুলো পরস্পর স্বাধীন হবে — একটার ডেটা অন্যটার উপর নির্ভর করবে না (তাই রিসেট)। আর টেস্টের নাম বাংলায় হোক আর ইংরেজিতে — ব্যর্থ হলে নাম দেখেই বোঝা যাবে কী ভাঙল। ডেটাবেস লাগলে টেস্ট ডেটাবেস আলাদা রাখুন — প্রোডাকশনের ডেটা দিয়ে কখনো টেস্ট নয়!",
      },
      {
        type: "tip",
        content:
          "Vitest/Jest চাইলে তাদের নিজস্ব expect-স্টাইল API পাবেন (expect(res.status).toBe(200)) — Node Test Runner-এ assert-এর বদলে। মূল স্ট্রাকচার একই থাকে। CI-তে (GitHub Actions) npm test চালিয়ে দিলে প্রতিটা pull request-এ স্বয়ংক্রিয়ভাবে টেস্ট হবে — ডিপ্লয়মেন্ট পাঠে সেটার সেটআপও দেখব।",
      },
    ],
  },
  {
    id: "security",
    title: "নিরাপত্তা (Security) সেরা অভ্যাস",
    subtitle: "helmet, CORS, rate limiting আর হটলিস্টে থাকা ভুলগুলো",
    duration: "১৪ মিনিট",
    keywords: ["security", "helmet", "cors", "rate limit", "express rate limit", "best practices"],
    blocks: [
      {
        type: "text",
        content:
          "ইন্টারনেটে সার্ভার তুললে সেটা সবার হাতের নাগালে চলে আসে — ভালো মানুষের পাশাপাশি স্ক্যানার বটও মিনিটের মধ্যে খুঁজে নেয়। Express অ্যাপের সাধারণ নিরাপত্তা-দুর্বলতাগুলো অবিশ্বাস্য রকমের পরিচিত আর প্রতিরোধযোগ্য — এই পাঠে সেই প্রতিরোধের চেকলিস্টটাই সাজিয়ে দিই।",
      },
      {
        type: "heading",
        content: "helmet: নিরাপত্তা হেডারের তোড়া এক লাইনে",
      },
      {
        type: "text",
        content:
          "HTTP রেসপন্স হেডারে কিছু নিরাপত্তা নির্দেশনা দেওয়া যায় (ব্রাউজারকে বলে দেওয়া — কোন স্ক্রিপ্ট চালাবে, কে ফ্রেম দেখাতে পারবে)। helmet মিডলওয়্যার এগুলোর সব সঠিক ডিফল্ট এক লাইনে বসিয়ে দেয়:",
      },
      {
        type: "code",
        language: "bash",
        code: `npm install helmet`,
      },
      {
        type: "code",
        language: "js",
        variant: "esm",
        code: `import helmet from "helmet";

// সব রাউটের আগে
app.use(helmet());`,
      },
      {
        type: "heading",
        content: "CORS: কাকে ঢুকতে দেবেন",
      },
      {
        type: "text",
        content:
          "ব্রাউজারের same-origin নীতির কারণে অন্য ডোমেইনের ফ্রন্টএন্ড (যেমন localhost:5173-এর React) আপনার API-তে সরাসরি রিকোয়েস্ট পাঠাতে পারে না — চাইলে সার্ভারে CORS চালু করে অনুমোদিত ঠিকানার তালিকা দিতে হয়। সবার জন্য খোলা রাখা (cors()) ডেভেলপমেন্টে ঠিক, প্রোডাকশনে তালিকা দিন:",
      },
      {
        type: "code",
        language: "bash",
        code: `npm install cors`,
      },
      {
        type: "code",
        language: "js",
        variant: "esm",
        code: `import cors from "cors";

app.use(
  cors({
    origin: [
      "https://myapp.com",
      "https://www.myapp.com",
      // ডেভে লোকাল ফ্রন্টএন্ড:
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);`,
      },
      {
        type: "heading",
        content: "Rate limiting: হামলা আর বট থামানো",
      },
      {
        type: "text",
        content:
          "এক IP মিনিটে হাজার রিকোয়েস্ট পাঠাচ্ছে? ব্রুট-ফোর্স পাসওয়ার্ড চেষ্টা কিংবা কেবল অসতর্ক লুপ — express-rate-limit দিয়ে সীমা বেঁধে দিন:",
      },
      {
        type: "code",
        language: "bash",
        code: `npm install express-rate-limit`,
      },
      {
        type: "code",
        language: "js",
        variant: "esm",
        code: `import rateLimit from "express-rate-limit";

// সাধারণ লিমিট: প্রতি IP-তে ১৫ মিনিটে ১০০ রিকোয়েস্ট
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: true, // RateLimit-* হেডার
});

app.use(generalLimiter);

// সংবেদনশীল রাউটে কড়া লিমিট: লগইনে ১৫ মিনিটে ৫ বার
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  message: { error: "অনেকবার চেষ্টা হয়েছে — কিছুক্ষণ পরে আসুন" },
});

app.post("/login", loginLimiter, handleLogin);`,
      },
      {
        type: "heading",
        content: "ওভারফ্লো না করা হলেও বিপদ: ভুলগুলো যা সবাই করে",
      },
      {
        type: "table",
        headers: ["দুর্বলতা", "কী হয়", "প্রতিরোধ"],
        rows: [
          ["NoSQL/SQL Injection", "req.query-র স্ট্রিং সরাসরি কোয়েরিতে ঢুকে ডেটা চুরি", "Prisma/Mongoose-এর প্যারামিটারাইজড কোয়েরি + Zod ভ্যালিডেশন"],
          ["XSS (Cross-Site Scripting)", "ইউজারের দেওয়া টেক্সট HTML হয়ে ব্রাউজারে স্ক্রিপ্ট চালায়", "EJS-এর <%= %> ব্যবহার (এস্কেপ করে), res.send-এ র HTML জমা রাখা নয়"],
          ["সিক্রেট কোডে হার্ডকোড", "GitHub-এ push করামাত্র চুরি", ".env + .gitignore; কমিট হয়ে গেলে কী বদলে ফেলুন"],
          ["অতিরিক্ত এরর ফাঁস", "স্ট্যাক ট্রেসে DB স্ট্রাকচার/পাথ ফাঁস", "প্রোডাকশনে জেনেরিক মেসেজ, বিস্তারিত শুধু লগে"],
          ["প্রি-ফ্লাইট ছাড়া বডি পার্সিং অসীম", "বিশাল পেলোডে মেমরি শেষ", "express.json({ limit: \"100kb\" })"],
        ],
      },
      {
        type: "code",
        language: "js",
        variant: "esm",
        filename: "server.js — প্রোডাকশনের শুরুর কয়েক লাইন",
        code: `import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.ALLOWED_ORIGINS?.split(",") }));
app.use(rateLimit({ windowMs: 60_000, limit: 100 }));
app.use(express.json({ limit: "100kb" })); // বডির সীমা

// ... রাউট`,
      },
      {
        type: "note",
        content:
          "Express 4-এ helmet নিয়ে বিখ্যাত এক নিরাপত্তা দুর্বলতা ছিল — টাইমিং অ্যাটাক সামলাতে res.setHeader-এর সাথে unsafe নীতি (CVE-2024-43796-এর মতো ঘটনা)। helmet-এর নিয়মিত আপডেট রাখাই শৃঙ্খলা — npm audit মাঝে মাঝে চালিয়ে পরিচিত দুর্বলতার খবর নিন, আর নির্ভরতা বাদ না দিয়ে আপডেট রাখুন।",
      },
      {
        type: "warning",
        content:
          "HTTPS আলাদা কথা নয় — প্রোডাকশনের ভিত্তি। ভালো খবর: Vercel, Railway, Render-এর মতো প্ল্যাটফর্ম HTTPS এমনিতেই দেয়; নিজের VPS-এ হলে Caddy বা nginx + Let's Encrypt ব্যবহার করুন। কুকিতে secure: true আর SameSite সেট করা, JWT-র বজায় HTTPS-নির্ভর ধরে নেওয়াই স্বাভাবিক।",
      },
      {
        type: "tip",
        content:
          "অতিরিক্ত পড়ার জন্য Express-এর নিজের \"Security Best Practices\" গাইডটা (expressjs.com/en/advanced/best-practice-security.html) অনুসরণ করুন — এই পাঠের অনেক নীতির উৎস সেটাই। নিয়মিত npm audit, ডিপেন্ডেন্সি আপডেট আর সর্বনিম্ন-অনুমতির (least privilege) নীতি — এই তিনটাই দীর্ঘমেয়াদি নিরাপত্তার আসল রহস্য।",
      },
    ],
  },
  {
    id: "deployment",
    title: "প্রোডাকশন ডিপ্লয়মেন্ট",
    subtitle: "সার্ভার থেকে জগৎ-দরবারে — প্রোডাকশন মোড থেকে ক্লাউড পর্যন্ত",
    duration: "১৫ মিনিট",
    keywords: ["deployment", "production", "deploy", "vercel", "railway", "docker", "pm2", "environment"],
    blocks: [
      {
        type: "text",
        content:
          "লোকালহোস্টে চলা সার্ভার আর প্রোডাকশন সার্ভারের মধ্যে পার্থক্য শুধু ঠিকানার নয় — পরিবেশ, নিরাপত্তা, লগ, পুনরায় চালু হওয়া, সবকিছুতেই। এই পাঠে ধাপে ধাপে দেখব: অ্যাপকে প্রোডাকশন-প্রস্তুত করা, তারপর কোথায় কীভাবে তোলা।",
      },
      {
        type: "heading",
        content: "প্রস্তুতির চেকলিস্ট",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "NODE_ENV=production সেট করুন — অনেক লাইব্রেরি এতে দ্রুত ও নীরব মোডে চলে",
          "পোর্ট process.env.PORT ?? 3000 থেকে নিন — প্ল্যাটফর্ম নিজের পোর্ট দেয়",
          "সব সিক্রেট .env-তে, .env কখনো কমিট নয়, প্ল্যাটফর্মের env সেটিংসে বসান",
          "এরর হ্যান্ডলার যাচাই করুন — প্রোডাকশনে বিস্তারিত এরর বাইরে যায় না, লগে যায়",
          "helmet, CORS-অরিজিন, rate limit — নিরাপত্তার পাটা শেষ",
          "npm test সবুজ — তারপরই ডিপ্লয়ের পালা",
        ],
      },
      {
        type: "heading",
        content: "PaaS: Railway/Render — Express-এর জন্য সবচেয়ে সহজ",
      },
      {
        type: "text",
        content:
          "Railway, Render, Fly.io-র মতো প্ল্যাটফর্মে GitHub রিপো যুক্ত করলেই বাকিটা তারা করে: বিল্ড, রান, HTTPS, ডোমেন, পরিবেশ ভেরিয়েবল। Express-এর মতো দীর্ঘ চলা সার্ভারের (long-running server) জন্য এগুলোই স্বাভাবিক ঠিকানা — Vercelের সার্ভারলেস মডেল Express-এর জন্য সরাসরি নয়, কথাটা শেষে পরিষ্কার করব:",
      },
      {
        type: "code",
        language: "bash",
        filename: "শুরুর কমান্ড — সাধারণত এটুকুই দরকার",
        code: `# Build command:   npm install
# Start command:    npm start

# প্ল্যাটফর্মের Environment Variables-এ দিন:
# NODE_ENV=production
# PORT=3000
# DATABASE_URL=...
# JWT_SECRET=...`,
      },
      {
        type: "code",
        language: "json",
        filename: "package.json (scripts)",
        code: `"scripts": {
  "start": "node --env-file=.env.production server.js",
  "dev": "node --watch --env-file=.env server.js"
}`,
      },
      {
        type: "heading",
        content: "নিজের VPS: PM2 দিয়ে প্রসেস ম্যানেজমেন্ট",
      },
      {
        type: "text",
      content:
          "নিজের ভার্চুয়াল সার্ভার (DigitalOcean, Hetzner, AWS EC2) হলে সার্ভার ক্র্যাশে বা রিবুটে অ্যাপ নিজে থেকে উঠে আসা চাই — এই কাজ PM2-র। সাথে ক্লাস্টার মোডে CPU-র সব কোর ব্যবহারের সুবিধাও:",
      },
      {
        type: "code",
        language: "bash",
        code: `# VPS-এ একবার
npm install -g pm2

# অ্যাপ চালু (ক্লাস্টার মোডে, সব কোরে)
pm2 start server.js --name my-api -i max

pm2 save           # তালিকা সেভ
pm2 startup        # সার্ভার বুটে অটো-চালু
pm2 logs my-api    # লগ দেখা
pm2 monit           # লাইভ মনিটর`,
      },
      {
        type: "code",
        language: "text",
        filename: "nginx/Caddy দিয়ে রিভার্স প্রক্সি (80/443 → 3000)",
        code: `# Caddyfile — সবচেয়ে সহজ (HTTPS এমনিই হয়ে যায়!)
api.myapp.com {
  reverse_proxy localhost:3000
}`,
      },
      {
        type: "heading",
        content: "Docker: পরিবেশ সঙ্গে করে বহন",
      },
      {
        type: "code",
        language: "text",
        filename: "Dockerfile",
        code: `FROM node:24-alpine
WORKDIR /app

# আগে শুধু manifest — লেয়ার ক্যাশের সুবিধা
COPY package*.json ./
RUN npm ci --omit=dev

COPY . .
ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "server.js"]`,
      },
      {
        type: "heading",
        content: "Vercel প্রশ্নের সোজা উত্তর",
      },
      {
        type: "text",
        content:
          "প্রায়ই জিজ্ঞেস হয় — Express কি Vercel-এ চলে? চলে, তবে বুঝে ব্যবহার করতে হয়। Vercel মূলত সার্ভারলেস (serverless) — প্রতিটি ফাংশন ইভেন্টে জেগে কাজ সেরে ঘুমিয়ে পড়ে; দীর্ঘ চলা Express সার্ভার, WebSocket, পটভর স্টেট এই মডেলের সাথে বাঁধে না। ছোট API হলে @vercel/node-এর express bridge কাজ করে, কিন্তু আসল Express অ্যাপের জন্য Railway/Render/Fly/VPS-ই নির্ভরযোগ্য ঠিকানা। (এই ডকুমেন্টেশন সাইটটা নিজে নিজে Next.js হওয়ায় Vercel-এ চলে — আর Next.js-ই Vercel-এর নিজের প্রযুক্তি, সেটা আলাদা গল্প!)",
      },
      {
        type: "heading",
        content: "স্বাস্থ্য পরীক্ষা ও গ্রেসফুল শাটডাউন",
      },
      {
        type: "code",
        language: "js",
        variant: "esm",
        filename: "server.js (আংশিক)",
        code: `// হেলথ চেক — মনিটরিং/লোড ব্যালেন্সার এটাই দেখে
app.get("/health", (req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

const server = app.listen(PORT, () => {
  console.log(\`প্রোডাকশনে চলছে \${PORT} পোর্টে\`);
});

// SIGTERM পেলে ধীরে ধীরে বন্ধ — চলমান রিকোয়েস্ট শেষ হতে দেয়
process.on("SIGTERM", () => {
  console.log("বন্ধ হচ্ছে...");
  server.close(() => process.exit(0));
});`,
      },
      {
        type: "warning",
        content:
          "ডিপ্লয়ের আগে সবসময় লোকালে প্রোডাকশন বিল্ড টেস্ট করুন: NODE_ENV=production সেট করে node server.js চালিয়ে দেখুন। অনেক সমস্যা — অনুপস্থিত env, আলাদা relative path, ভুলে যাওয়া devDependency — শুধু প্রোডাকশন মোডেই ধরা পড়ে।",
      },
      {
        type: "tip",
        content:
          "CI/CD-এর ন্যূনতম সেটআপ: GitHub Actions-এ .github/workflows/ci.yml বসিয়ে push প্রতি npm ci && npm test চালান — টেস্ট লাল হলে merge-ই হবে না। তারপর প্ল্যাটফর্মের অটো-ডিপ্লয় ব্রাঞ্চ main-কে গেঁথে দিন: মেইনে merge = স্বয়ংক্রিয় ডিপ্লয়। ছোট টিমের জন্য এটাই যথেষ্ট বড় নিরাপত্তা।",
      },
    ],
  },
];
