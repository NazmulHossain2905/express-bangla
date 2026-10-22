import type { Lesson } from "./types";

export const cheatsheet: Lesson = {
  id: "cheatsheet",
  title: "Express চিটশিট",
  subtitle: "সব গুরুত্বপূর্ণ কমান্ড ও কোড এক জায়গায়",
  duration: "রেফারেন্স",
  keywords: ["cheatsheet", "cheat sheet", "quick reference", "snippets", "সারসংক্ষেপ"],
  noProgress: true,
  blocks: [
    {
      type: "text",
      content:
        "এই পাঠটি মুখস্থ করার জন্য নয় — বরং প্রজেক্ট করতে গিয়ে যখন কিছু মনে না আসবে তখন দ্রুত দেখে নেওয়ার জন্য। প্রতিটি টপিকের সবচেয়ে প্রয়োজনীয় সিনট্যাক্স এখানে গুছিয়ে রাখা হলো (Express 5.3 + Node 24 LTS অনুযায়ী)। বুকমার্ক করে রাখুন!",
    },
    {
      type: "heading",
      content: "প্রজেক্ট সেটআপ কমান্ড",
    },
    {
      type: "code",
      language: "bash",
      code: `# নতুন প্রজেক্ট
mkdir my-app && cd my-app
npm init -y
npm install express          # Express 5.3.0 বসবে

# ডেভ টুল — Node 24-এ --watch বিল্ট-ইন, nodemon-ও চলে
# npm install --save-dev nodemon

# প্রায়ই লাগে
npm install cors helmet zod
# ফাইল আপলোড হলে:  npm install multer
# লগইন হলে:         npm install bcrypt jsonwebtoken

# TypeScript হলে:
npm install --save-dev typescript tsx @types/express @types/node`,
    },
    {
      type: "heading",
      content: "সার্ভার চালু — ES Modules (নতুন প্রজেক্টের ডিফল্ট)",
    },
    {
      type: "code",
      language: "js",
      variant: "esm",
      filename: "package.json-এ \"type\": \"module\" সহ",
      code: `import express from "express";

const app = express();
const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(\`সার্ভার চলছে \${PORT} পোর্টে\`);
});`,
    },
    {
      type: "code",
      language: "js",
      variant: "cjs",
      filename: "CommonJS বিকল্প",
      code: `const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("সার্ভার চলছে " + PORT + " পোর্টে");
});`,
    },
    {
      type: "heading",
      content: "রাউটিং",
    },
    {
      type: "code",
      language: "js",
      variant: "esm",
      code: `app.get("/", handler);             // পড়া
app.post("/items", handler);       // তৈরি
app.put("/items/:id", handler);   // আপডেট
app.delete("/items/:id", handler); // মুছা
app.all("/ping", handler);         // সব মেথড

// রুট প্যারামিটার ও কোয়েরি
app.get("/users/:id", (req, res) => {
  req.params.id;   // /users/5 -> "5"
  req.query.sort;  // ?sort=price -> "price"
});

// Express 5 wildcard (নামসহ!)
app.get("/*splat", (req, res) => {
  // /a/b -> req.params.splat = ["a", "b"] (অ্যারে)
});`,
    },
    {
      type: "heading",
      content: "মিডলওয়্যার",
    },
    {
      type: "code",
      language: "js",
      variant: "esm",
      code: `app.use(express.json());   // JSON বডি
app.use(express.urlencoded({ extended: true })); // ফর্ম
app.use(express.static("public")); // স্ট্যাটিক ফাইল

// নিজের মিডলওয়্যার
app.use((req, res, next) => {
  // কাজ করার পর অবশ্যই next() ডাকতে হবে
  next();
});`,
    },
    {
      type: "heading",
      content: "রেসপন্স পাঠানো",
    },
    {
      type: "code",
      language: "js",
      variant: "esm",
      code: `res.send("টেক্সট");
res.json({ ok: true });
res.status(201).json({ created: true });
res.status(404).json({ error: "পাওয়া যায়নি" });
res.sendStatus(204);
res.redirect("/login");
res.sendFile(path.join(import.meta.dirname, "file.html"));
res.render("template", { data: "value" });`,
    },
    {
      type: "heading",
      content: "স্ট্যাটাস কোড মনে রাখার সূত্র",
    },
    {
      type: "code",
      language: "text",
      code: `2xx = সফল          (200 OK, 201 Created, 204 No Content)
4xx = ক্লায়েন্টের ভুল (400 Bad, 401 লগইন নেই, 403 নিষেধ, 404 নেই)
5xx = সার্ভারের ভুল  (500 Internal Server Error)`,
    },
    {
      type: "heading",
      content: "এরর হ্যান্ডলিং (Express 5 ধারা)",
    },
    {
      type: "code",
      language: "js",
      variant: "esm",
      code: `// async হ্যান্ডলারে এরর স্বয়ংক্রিয় হ্যান্ডলারে যায় (Express 5)
app.get("/data", async (req, res) => {
  const data = await loadData(); // ব্যর্থ হলে? চিন্তা নেই!
  res.json(data);
});

// ৪০৪ ক্যাচ-অল (সব রাউটের পরে)
app.use((req, res) => {
  res.status(404).json({ error: "রাউট নেই" });
});

// এরর হ্যান্ডলার (৪ প্যারামিটার, সবার শেষে)
app.use((err, req, res, next) => {
  res.status(err.status ?? 500).json({ error: "সার্ভার এরর" });
});`,
    },
    {
      type: "heading",
      content: "রাউট আলাদা ফাইলে (Router)",
    },
    {
      type: "code",
      language: "js",
      variant: "esm",
      code: `// routes/books.js — ES Modules
import { Router } from "express";

export const booksRouter = Router();
booksRouter.get("/", (req, res) => res.json([]));

// app.js
import { booksRouter } from "./routes/books.js";
app.use("/books", booksRouter); // প্রিফিক্স /books`,
    },
    {
      type: "heading",
      content: "TypeScript মূল টুকরো",
    },
    {
      type: "code",
      language: "ts",
      variant: "ts",
      code: `import express, { type Request, type Response } from "express";

interface IdParam { id: string }

app.get("/users/:id", (req: Request<IdParam>, res: Response) => {
  const id = Number(req.params.id); // টাইপ-চেকড!
  res.json({ id });
});

// Zod schema → টাইপ একসাথে
import { z } from "zod";
const schema = z.object({ title: z.string().min(1) });
type Input = z.infer<typeof schema>;`,
    },
    {
      type: "heading",
      content: "হ্যান্ডি কমান্ড",
    },
    {
      type: "code",
      language: "bash",
      code: `node --watch server.js              # বিল্ট-ইন হট-রিলোড
node --env-file=.env server.js      # .env লোড (dotenv ছাড়া)
DEBUG=express:* node server.js      # Express ডিবাগ লগ
npm test                            # টেস্ট চালান
npx tsc --noEmit                    # শুধু টাইপ-যাচাই (TS প্রজেক্ট)
npx prisma studio                   # ডেটাবেস GUI (Prisma হলে)`,
    },
  ],
};
