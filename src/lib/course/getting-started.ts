import type { Lesson } from "./types";

export const gettingStarted: Lesson[] = [
  {
    id: "intro",
    title: "Express.js পরিচিতি: কী এবং কেন?",
    subtitle: "সার্ভার, রিকোয়েস্ট-রেসপন্স আর Express-এর পরিচয়",
    duration: "৮ মিনিট",
    keywords: ["express intro", "what is express", "server", "web server", "framework"],
    blocks: [
      {
        type: "text",
        content:
          "আপনি যখন ব্রাউজারে কোনো ওয়েবসাইট খুলেন, আপনার কম্পিউটার একটি সার্ভারকে রিকোয়েস্ট (request) পাঠায়। সার্ভার সেই রিকোয়েস্ট প্রসেস করে আপনাকে পেজ, ছবি বা ডেটা ফেরত পাঠায় — এটাই রেসপন্স (response)। প্রতিটি অ্যাপের পেছনে এমন একটি সার্ভার কাজ করে। এই সার্ভার তৈরি করার সবচেয়ে জনপ্রিয় উপায়ই হলো Express.js। এই কোর্সে আমরা একদম গোড়া থেকে Express.js শিখব — সম্পূর্ণ বাংলায়, বাংলা ব্যাখ্যা আর হাতে-কলমে উদাহরণে।",
      },
      {
        type: "heading",
        content: "Express.js আসলে কী?",
      },
      {
        type: "text",
        content:
          "Express.js হলো Node.js-এর উপর তৈরি একটি দ্রুত, মিনিমাল ও নমনীয় ওয়েব ফ্রেমওয়ার্ক। Node.js দিয়ে সার্ভার বানানো সম্ভব, কিন্তু রিকোয়েস্ট হ্যান্ডলিং, রাউটিং, হেডার, কুকি — সব নিজে লিখতে হয় অনেক নিম্নস্তরের (low-level) ও ক্লান্তিকর কোড দিয়ে। Express এসে সেই কঠিন কাজগুলো সহজ করে দেয়, যাতে আপনি অ্যাপ্লিকেশনের মূল লজিকে মনোযোগ দিতে পারেন।",
      },
      {
        type: "text",
        content:
          "সহজ তুলনা দিয়ে বলি: Node.js হলো গাড়ির ইঞ্জিন, আর Express.js হলো সেই ইঞ্জিনের উপর বানানো পূর্ণাঙ্গ গাড়ির বডি — স্টিয়ারিং, ব্রেক, এসি সব সাজানো। ইঞ্জিন ছাড়া গাড়ি চলে না, আবার শুধু ইঞ্জিন দিয়েও রাস্তায় নামা কঠিন!",
      },
      {
        type: "list",
        items: [
          "দ্রুত ও মিনিমাল — Express-এর কোর খুবই ছোট, অপ্রয়োজনীয় কিছুই বোঝা করে না",
          "সহজ রাউটিং — কয়েক লাইনেই ভিন্ন URL ও HTTP মেথডের জন্য আলাদা হ্যান্ডলার লেখা যায়",
          "মিডলওয়্যার আর্কিটেকচার — রিকোয়েস্ট ও রেসপন্সের মাঝখানে নিজের লজিক সুন্দরভাবে ঢোকানো যায়",
          "বিশাল কমিউনিটি — বিশ্বের সবচেয়ে বেশি ব্যবহৃত Node.js ফ্রেমওয়ার্ক, তাই যেকোনো সমস্যার সমাধান সহজে পাওয়া যায়",
          "চাকরির বাজার — MERN/MEAN স্ট্যাকের ব্যাকএন্ড হিসেবে Express-এর চাহিদা প্রচুর",
        ],
      },
      {
        type: "heading",
        content: "কোন ভার্সন শিখবেন?",
      },
      {
        type: "text",
        content:
          "এই কোর্সটি লেখার সময় (অক্টোবর ২০২৬) Express.js-এর সর্বশেষ স্টেবল ভার্সন হলো Express 5.3.0, আর Node.js-এর বর্তমান LTS (Long Term Support) ভার্সন হলো Node.js 24 (Krypton)। Express 5 চালাতে Node.js 18 বা তার পরের ভার্সন লাগে — তাই Node.js 24 LTS-এর সাথে একদম নিখুঁতভাবে চলে। এই কোর্সের সব উদাহরণ Express 5 ধরে লেখা, আর যেখানে Express 4-এর সাথে আচরণে পার্থক্য আছে, সেখানে স্পষ্ট করে বলা হয়েছে।",
      },
      {
        type: "table",
        headers: ["টুল", "ভার্সন (অক্টোবর ২০২৬)", "নোট"],
        rows: [
          ["Node.js (LTS)", "24.22.0 (Krypton)", "প্রোডাকশনের জন্য সুপারিশকৃত LTS লাইন"],
          ["Express.js", "5.3.0", "Node.js 18+ প্রয়োজন"],
          ["TypeScript", "7.0.2", "নেটিভ (Go) কম্পাইলার — TypeScript সেকশনে বিস্তারিত"],
        ],
      },
      {
        type: "heading",
        content: "Express দেখতে কেমন?",
      },
      {
        type: "text",
        content:
          "নিচের কোডটি দেখুন — এই কোর্সের শেষে আপনি নিজেই এমন কোড লিখতে পারবেন এবং প্রতিটি লাইন বুঝে বুঝে ব্যাখ্যা করতে পারবেন। এই ছোট্ট কোডটিই একটি সম্পূর্ণ ওয়েব সার্ভার, যা ব্রাউজার থেকে রিকোয়েস্ট নিয়ে রেসপন্স পাঠায়। নতুন প্রজেক্টে আধুনিক ES Modules (import/export) ব্যবহার করাই ভালো অভ্যাস — CommonJS (require) অবশ্যই কাজ করে এবং পুরনো প্রজেক্টে দেখতে পাবেন:",
      },
      {
        type: "code",
        language: "js",
        variant: "esm",
        filename: "server.js — ES Modules সংস্করণ",
        code: `import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("স্বাগতম Express.js Bangla Docs-এ!");
});

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(\`সার্ভার চলছে http://localhost:\${PORT} ঠিকানায়\`);
});`,
      },
      {
        type: "code",
        language: "js",
        variant: "cjs",
        filename: "server.js — CommonJS সংস্করণ",
        code: `const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("স্বাগতম Express.js Bangla Docs-এ!");
});

app.listen(3000, () => {
  console.log("সার্ভার চলছে http://localhost:3000 ঠিকানায়");
});`,
      },
      {
        type: "note",
        content:
          "দুটি সংস্করণের পার্থক্য শুধু প্যাকেজ আনার ধরনে — import বনাম require। বাকি সব Express API হুবহু এক। কোন সিস্টেম কখন কাজ করে, \"type\": \"module\" কী — সব বিস্তারিত শিখবেন \"জাভাস্ক্রিপ্ট মডিউল সিস্টেম\" সেকশনে।",
      },
      {
        type: "heading",
        content: "এই কোর্সে কী কী শিখবেন?",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Node.js সেটআপ করে প্রথম সার্ভার চালানো",
          "CommonJS ও ES Modules — দুই মডিউল সিস্টেমেই কোড লেখা",
          "রাউটিং — ভিন্ন পেজ ও ডেটার জন্য ভিন্ন রাস্তা তৈরি",
          "মিডলওয়্যার — Express-এর সবচেয়ে শক্তিশালী ধারণা",
          "রিকোয়েস্ট-রেসপন্স অবজেক্ট নিয়ে কাজ",
          "ফর্ম ডেটা ও JSON বডি হ্যান্ডল করা",
          "সম্পূর্ণ REST API বানানো (CRUD অপারেশন)",
          "TypeScript দিয়ে টাইপ-নিরাপদ Express অ্যাপ",
          "এরর হ্যান্ডলিং, নিরাপত্তা, টেস্টিং ও ডিপ্লয়মেন্ট",
        ],
      },
      {
        type: "note",
        content:
          "প্রয়োজনীয় পূর্বশর্ত: JavaScript-এর বেসিক (var/let/const, ফাংশন, অ্যারে-অবজেক্ট, কন্ডিশন) জানা থাকলেই এই কোর্স সহজে করা যাবে। এর বেশি কিছু লাগবে না!",
      },
      {
        type: "tip",
        content:
          "প্রতিটি পাঠের কোড হুবহু কপি না করে নিজে টাইপ করে চালান। নিজের হাতে টাইপ করলে বাগ তৈরি হয়, বাগ ঠিক করতে গিয়ে সবচেয়ে ভালোভাবে শেখা হয়!",
      },
    ],
  },
  {
    id: "setup",
    title: "Node.js ইনস্টল ও প্রজেক্ট সেটআপ",
    subtitle: "টুল ইনস্টল, প্রজেক্ট তৈরি আর Express যোগ করা",
    duration: "১০ মিনিট",
    keywords: ["install node", "npm init", "setup express project", "installation"],
    blocks: [
      {
        type: "text",
        content:
          "Express.js চালাতে হলে প্রথমে আপনার কম্পিউটারে Node.js থাকতে হবে, কারণ Express আসলে Node.js-এর একটি প্যাকেজ। এই পাঠে আমরা ধাপে ধাপে Node.js ইনস্টল করব, একটি প্রজেক্ট ফোল্ডার তৈরি করব এবং সেখানে Express যোগ করব।",
      },
      {
        type: "heading",
        content: "ধাপ ১: Node.js ইনস্টল করুন",
      },
      {
        type: "text",
        content:
          "nodejs.org ওয়েবসাইটে গিয়ে LTS (Long Term Support) ভার্সনটি ডাউনলোড করে ইনস্টল করুন। এই কোর্স লেখার সময় LTS লাইন হলো Node.js 24 (Krypton), সর্বশেষ প্যাচ v24.22.0। LTS ভার্সনই সবচেয়ে স্থিতিশীল এবং প্রোডাকশনের জন্য সুপারিশকৃত — সাইটে \"Current\" লেবেলের নতুন ভার্সন (এখন Node 26) থাকলেও শেখার ও কাজের জন্য LTS-ই বেছে নিন। Express 5 চালাতে Node.js 18 বা ঊর্ধ্বতন লাগে, তাই Node 24 হলে সব ঠিক আছে। ইনস্টলেশন শেষে টার্মিনাল (Windows-এ Command Prompt বা PowerShell, Mac-এ Terminal) খুলে নিচের কমান্ড দিয়ে চেক করুন:",
      },
      {
        type: "code",
        language: "bash",
        code: `node -v
npm -v`,
        output: `v24.22.0
11.19.1`,
      },
      {
        type: "text",
        content:
          "ভার্সন নম্বর দেখালেই বুঝবেন ইনস্টলেশন সফল হয়েছে। আপনার ভার্সন আমার এখানের থেকে ভিন্ন হলে সমস্যা নেই — v18 বা তার নতুন যেকোনো ভার্সন হলে এই কোর্সের সবকিছু কাজ করবে। npm হলো Node Package Manager, যা দিয়ে আমরা Express-সহ হাজারো প্যাকেজ ইনস্টল করব।",
      },
      {
        type: "tip",
        content:
          "একসাথে একাধিক Node ভার্সন সামলাতে nvm (Node Version Manager) ব্যবহার করতে পারেন। পুরনো প্রজেক্টে Node 20/22 আর নতুন প্রজেক্টে Node 24 — সব পাশাপাশি রাখা যায়: nvm install 24 && nvm use 24।",
      },
      {
        type: "heading",
        content: "ধাপ ২: প্রজেক্ট ফোল্ডার তৈরি করুন",
      },
      {
        type: "text",
        content:
          "এবার একটি নতুন ফোল্ডার তৈরি করে সেখানে npm প্রজেক্ট চালু করি। npm init -y কমান্ডটি সব প্রশ্নের ডিফল্ট উত্তর দিয়ে স্বয়ংক্রিয়ভাবে package.json ফাইল তৈরি করে:",
      },
      {
        type: "code",
        language: "bash",
        code: `mkdir express-demo
cd express-demo
npm init -y`,
      },
      {
        type: "code",
        language: "json",
        filename: "package.json",
        code: `{
  "name": "express-demo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \\"Error: no test specified\\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}`,
      },
      {
        type: "text",
        content:
          "package.json ফাইলটি আপনার প্রজেক্টের পরিচয়পত্র — প্রজেক্টের নাম, ভার্সন আর কোন কোন প্যাকেজ (dependencies) ব্যবহার হচ্ছে তা এখানে থাকে। সামনে এই ফাইলে আরও অনেক কিছু যোগ হবে (যেমন ES Modules চালু করতে \"type\": \"module\"), ধীরে ধীরে সব বুঝে নেবেন।",
      },
      {
        type: "heading",
        content: "ধাপ ৩: Express ইনস্টল করুন",
      },
      {
        type: "text",
        content:
          "এখন npm দিয়ে Express 5 ইনস্টল করি। 2025 সালের সেপ্টেম্বর থেকে npm-এ express@5-ই ডিফল্ট latest — তাই সরাসরি npm install express দিলেই এখন Express 5.x বসে যায়:",
      },
      {
        type: "code",
        language: "bash",
        code: `npm install express
# নির্দিষ্টভাবে লিখতে চাইলে:
npm install express@5`,
        output: `added 57 packages in 4s

3 packages are looking for funding
  run \`npm fund\` for details`,
      },
      {
        type: "code",
        language: "bash",
        code: `# ইনস্টল হওয়া ভার্সন দেখুন
npm list express`,
        output: `express-demo@1.0.0 /path/to/express-demo
└── express@5.3.0`,
      },
      {
        type: "text",
        content:
          "ইনস্টল শেষে দেখবেন প্রজেক্ট ফোল্ডারে দুটি নতুন জিনিস এসেছে। এদের কাজ বুঝে রাখা জরুরি:",
      },
      {
        type: "list",
        items: [
          "node_modules ফোল্ডার — Express ও তার সব ডিপেন্ডেন্সির আসল কোড এখানে থাকে। কখনো হাত দিয়ে এডিট করবেন না।",
          "package-lock.json — ঠিক কোন প্যাকেজের কোন ভার্সন ইনস্টল হয়েছে তার রেকর্ড। টিমের সবার একই ভার্সন নিশ্চিত করে।",
          "package.json আপডেট — dependencies-এর নিচে express: \"^5.3.0\" যোগ হয়েছে, এখন থেকে প্রজেক্ট Express ছাড়া চলবে না!",
        ],
      },
      {
        type: "note",
        content:
          "Bun ব্যবহার করলে কমান্ড হবে bun add express — ইনস্টল অনেক দ্রুত হয়। তবে npm-ই সবচেয়ে বেশি প্রচলিত, তাই কোর্সজুড়ে npm ব্যবহার করা হয়েছে; প্রতিটি কমান্ডের Bun সমতুল্য হলো: bun add (install), bun run dev (npm run dev)।",
      },
      {
        type: "tip",
        content:
          "VS Code এডিটর ব্যবহার করলে ভেতরেই বিল্ট-ইন টার্মিনাল পাবেন (Ctrl + ` বা View → Terminal)। এডিটর আর টার্মিনাল এক জায়গায় থাকলে কাজ অনেক সহজ হয়।",
      },
      {
        type: "warning",
        content:
          "GitHub-এ প্রজেক্ট আপলোড করলে node_modules ফোল্ডার কখনোই কমিট করবেন না। .gitignore ফাইলে node_modules লিখে দিন — পরে npm install দিয়ে সবাই আবার তৈরি করে নিতে পারবে।",
      },
    ],
  },
  {
    id: "hello-world",
    title: "প্রথম Express সার্ভার (Hello World)",
    subtitle: "সার্ভার চালু, ব্রাউজারে টেস্ট ও nodemon সেটআপ",
    duration: "১২ মিনিট",
    keywords: ["hello world", "first server", "app.listen", "nodemon", "dev script"],
    blocks: [
      {
        type: "text",
        content:
          "সেটআপ শেষ! এবার সবচেয়ে রোমাঞ্চকর মুহূর্ত — আপনার জীবনের প্রথম ওয়েব সার্ভার চালু করা। আধুনিক জাভাস্ক্রিপ্টে নতুন প্রজেক্ট শুরু করলে ES Modules ব্যবহার করাই সেরা অভ্যাস, তাই আমরা প্রথমে সেটিই দেখব। প্রথমে package.json-এ \"type\": \"module\" যোগ করুন — এটি Node.js-কে জানিয়ে দেয় যে এই প্রজেক্টের .js ফাইলগুলো ES Modules হিসেবে ব্যবহৃত হবে:",
      },
      {
        type: "code",
        language: "json",
        filename: "package.json (আংশিক)",
        code: `{
  "name": "express-demo",
  "type": "module",
  "scripts": {
    "start": "node server.js"
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
        code: `// ১. Express প্যাকেজটি import করলাম
import express from "express";

// ২. একটি Express অ্যাপ্লিকেশন তৈরি করলাম
const app = express();

// ৩. রুট পেজ ("/")-এ GET রিকোয়েস্টের হ্যান্ডলার
app.get("/", (req, res) => {
  res.send("আসসালামু আলাইকুম! এটি আমার প্রথম Express সার্ভার।");
});

// ৪. সার্ভারকে ৩০০০ পোর্টে চালু করলাম
const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
  console.log(\`সার্ভার চলছে http://localhost:\${PORT} ঠিকানায়\`);
});`,
      },
      {
        type: "text",
        content:
          "আপনি যদি \"type\": \"module\" যোগ না করতে চান, একই কোড CommonJS দিয়েও লেখা যায় — শুধু import-এর জায়গায় require বসাবেন এবং পোর্টের জন্য ??-এর বদলে || ব্যবহার করতে পারেন (CommonJS-এ ??-ও চলে, দুটোই আধুনিক জাভাস্ক্রিপ্ট):",
      },
      {
        type: "code",
        language: "js",
        variant: "cjs",
        filename: "server.js — CommonJS বিকল্প",
        code: `const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("আসসালামু আলাইকুম! এটি আমার প্রথম Express সার্ভার।");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("সার্ভার চলছে http://localhost:" + PORT + " ঠিকানায়");
});`,
      },
      {
        type: "heading",
        content: "কোডের প্রতিটি লাইন কী করছে?",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "import express from \"express\" — Node.js-কে বলছি express প্যাকেজটি লোড করে দিতে। এটি একটি ফাংশন রিটার্ন করে।",
          "express() কল করলে একটি নতুন অ্যাপ্লিকেশন তৈরি হয় — এটিই আমাদের সার্ভারের মূল অবজেক্ট, নাম দিয়েছি app।",
          "app.get() — বলছি: কেউ হোমপেজে (\"/\") রিকোয়েস্ট করলে এই ফাংশনটি চালাও। req হলো রিকোয়েস্ট, res হলো রেসপন্স।",
          "res.send() — ক্লায়েন্টকে রেসপন্স হিসেবে টেক্সট পাঠায়। এখানে একটি বাংলা বার্তা পাঠালাম।",
          "process.env.PORT ?? 3000 — এনভায়রনমেন্টে PORT সেট করা থাকলে সেটি নেয়, নাহলে 3000। এভাবে লিখলে ডিপ্লয়মেন্ট প্ল্যাটফর্ম নিজের পোর্ট দিলে সেটিই ব্যবহৃত হবে।",
          "app.listen() — সার্ভার চালু করে নির্দিষ্ট পোর্টে রিকোয়েস্টের জন্য অপেক্ষা করতে থাকে। কলব্যাক ফাংশনে কনফার্মেশন মেসেজ দেখাচ্ছি।",
        ],
      },
      {
        type: "heading",
        content: "সার্ভার চালান এবং টেস্ট করুন",
      },
      {
        type: "code",
        language: "bash",
        code: `node server.js`,
        output: `সার্ভার চলছে http://localhost:3000 ঠিকানায়`,
      },
      {
        type: "text",
        content:
          "এবার ব্রাউজার খুলে ঠিকানায় যান: http://localhost:3000 — আপনার পাঠানো বার্তাটি দেখতে পাবেন! অভিনন্দন, আপনি এখন একজন ব্যাকএন্ড ডেভেলপার। localhost মানে আপনার নিজের কম্পিউটার, আর 3000 হলো পোর্ট নম্বর — বাড়ির ঠিকানার মতো, এই ঠিকানায় আমাদের সার্ভার বাস করছে।",
      },
      {
        type: "warning",
        content:
          "কনসোলের মেসেজ (console.log) ব্রাউজারে নয়, টার্মিনালে দেখা যায়। আর কোড এডিট করার পর নতুন কোড কাজ করতে হলে সার্ভার আবার চালু করতে হয় — Ctrl + C চেপে বন্ধ করে আবার node server.js চালান। এই হাস্যকর কাজটি এড়াতেই আছে nodemon!",
      },
      {
        type: "heading",
        content: "nodemon দিয়ে অটো-রিস্টার্ট",
      },
      {
        type: "text",
        content:
          "প্রতিবার কোড বদলালে সার্ভার ম্যানুয়ালি রিস্টার্ট করা খুবই বিরক্তিকর। nodemon প্যাকেজটি ফাইল সেভ করামাত্র নিজে থেকেই সার্ভার রিস্টার্ট করে দেয়। এটিকে devDependency হিসেবে ইনস্টল করি — কারণ প্রোডাকশন সার্ভারে এর দরকার হয় না:",
      },
      {
        type: "code",
        language: "bash",
        code: `npm install --save-dev nodemon`,
      },
      {
        type: "code",
        language: "json",
        filename: "package.json (scripts অংশ)",
        code: `"scripts": {
  "dev": "nodemon server.js",
  "start": "node server.js"
}`,
      },
      {
        type: "text",
        content:
          "এবার চালান npm run dev — ডেভেলপমেন্টের সময় এটিই ব্যবহার করবেন। এখন যেকোনো কোড সেভ করলেই সার্ভার অটোমেটিক রিস্টার্ট হবে — টার্মিনালে দেখবেন nodemon রিস্টার্টিং মেসেজ দেখাচ্ছে। আর npm start থাকল প্রোডাকশনের জন্য (npm start এর ডিফল্ট অর্থ NODE_ENV=production সহ চালানো)।",
      },
      {
        type: "note",
        content:
          "পোর্ট 3000 আগে থেকে ব্যস্ত থাকলে (Error: listen EADDRINUSE) কোডের PORT ভ্যালু বদলে 4000 বা 5000 করে দিন। পোর্ট নম্বর 1024 থেকে 65535-এর মধ্যে যেকোনোটি ব্যবহার করা যায়। Express 5-এ app.listen-এর কলব্যাক এখন এররও পায় — কলব্যাকের প্রথম আর্গুমেন্ট চেক করে সুন্দরভাবে হ্যান্ডল করা যায়।",
      },
    ],
  },
  {
    id: "project-structure",
    title: "প্রজেক্ট স্ট্রাকচার ও পরিষ্কার কোড",
    subtitle: "পেশাদার প্রজেক্ট সাজানো — Router, এনভায়রনমেন্ট ও রোডম্যাপ",
    duration: "১৪ মিনিট",
    keywords: ["project structure", "express.Router", "MVC", "env", "dotenv", "folder structure"],
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
        filename: "ফোল্ডার স্ট্রাকচার (ES Modules)",
        code: `my-app/
├── src/
│   ├── routes/       # সব রাউট ডেফিনিশন
│   │   ├── books.js
│   │   └── users.js
│   ├── controllers/  # রাউটের হ্যান্ডলার লজিক
│   ├── middleware/   # নিজের মিডলওয়্যার
│   ├── services/     # ডেটাবেস/বিজনেস লজিক
│   └── app.js        # অ্যাপ সেটআপ
├── public/           # স্ট্যাটিক ফাইল
├── views/            # টেমপ্লেট
├── .env              # সিক্রেট কনফিগ
├── package.json      # "type": "module" সহ
└── server.js         # সার্ভার চালুর এন্ট্রি পয়েন্ট`,
      },
      {
        type: "heading",
        content: "express.Router() দিয়ে রাউট আলাদা করা",
      },
      {
        type: "text",
        content:
          "express.Router() হলো ছোট, আলাদা রাউটিং সিস্টেম — যাকে নিজস্ব ফাইলে লিখে মূল অ্যাপে মাউন্ট করা যায়। প্রথমে ES Modules সংস্করণ দেখুন — routes/books.js ফাইলটি নিজেকে একটি মডিউল হিসেবে export করে:",
      },
      {
        type: "code",
        language: "js",
        variant: "esm",
        filename: "src/routes/books.js",
        code: `import express from "express";

export const booksRouter = express.Router();

booksRouter.get("/", (req, res) => {
  res.json({ message: "সব বইয়ের তালিকা" });
});

booksRouter.get("/:id", (req, res) => {
  res.json({ message: req.params.id + " নম্বর বই" });
});`,
      },
      {
        type: "code",
        language: "js",
        variant: "esm",
        filename: "src/app.js",
        code: `import express from "express";
import { booksRouter } from "./routes/books.js";

export const app = express();

app.use(express.json());

// /books পাথের সব রিকোয়েস্ট booksRouter-এ যাবে
app.use("/books", booksRouter);`,
      },
      {
        type: "text",
        content:
          "CommonJS-এ একই কাজ করতে চাইলে require আর module.exports ব্যবহার হবে — ধারণা হুবহু এক, শুধু সিনট্যাক্স আলাদা:",
      },
      {
        type: "code",
        language: "js",
        variant: "cjs",
        filename: "src/routes/books.js — CommonJS",
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
        type: "text",
        content:
          "মজার বিষয়: books.js ফাইলে router.get(\"/\") লিখেছি, কিন্তু ব্রাউজারে যেতে হয় /books — কারণ মাউন্ট করার সময় প্রিফিক্স /books দেওয়া হয়েছে। আর ES Modules-এ ইমপোর্ট করার সময় ./routes/books.js — ফাইল এক্সটেনশন .js সহ পুরোপুরি লিখতে হয়, এটাই নিয়ম। এভাবে প্রতিটি রিসোর্সের রাউট আলাদা ফাইলে থাকলে প্রজেক্ট অসাধারণ গোছানো লাগে।",
      },
      {
        type: "heading",
        content: "এনভায়রনমেন্ট ভেরিয়েবল (.env)",
      },
      {
        type: "text",
        content:
          "পোর্ট, ডেটাবেস পাসওয়ার্ড, API কী — এসব সিক্রেট কোডে হার্ডকোড করা বিপজ্জনক। এগুলো রাখা হয় .env ফাইলে। খুশির খবর: Node.js 20.6 থেকে এর জন্য আলাদা প্যাকেজ লাগেই না — node --env-file ফ্ল্যাগ দিয়ে চালালেই .env লোড হয়ে যায় (Node 24-তেও একই)। পুরনো প্রজেক্টগুলোতে dotenv প্যাকেজ দেখতে পাবেন, সেটিও এখন ঠিকই কাজ করে:",
      },
      {
        type: "code",
        language: "text",
        filename: ".env",
        code: `PORT=3000
DB_URL=postgresql://localhost:5432/mydb
JWT_SECRET=super-secret-key`,
      },
      {
        type: "code",
        language: "js",
        variant: "esm",
        filename: "server.js",
        code: `import { app } from "./src/app.js";

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(\`সার্ভার চলছে \${PORT} পোর্টে\`);
});`,
      },
      {
        type: "code",
        language: "bash",
        filename: "টার্মিনাল",
        code: `# Node.js-এর বিল্ট-ইন ফ্ল্যাগ দিয়ে .env লোড
node --env-file=.env server.js

# স্ক্রিপ্টে যোগ করতে চাইলে (package.json):
"dev": "nodemon --env-file=.env server.js"`,
      },
      {
        type: "text",
        content:
          "Node 20.6-এর আগের ভার্সনে বা dotenv-এর অতিরিক্ত ফিচার দরকার হলে প্যাকেজটিও ব্যবহার করা যায়: npm install dotenv দিয়ে ইনস্টল করে কোডের একদম উপরে import \"dotenv/config\" লিখলেই হয়। আরেকটি বিল্ট-ইন উপায় হলো কোড থেকে process.loadEnvFile() কল করা — যেকোনো সময় ইচ্ছেমতো লোড করা যায়।",
      },
      {
        type: "warning",
        content:
          ".env ফাইল GitHub-এ কমিট করবেন না! .gitignore-এ .env যোগ করে দিন। বরং .env.example নামে (কী-কী ভ্যালু লাগবে তার তালিকা, ভ্যালু ছাড়া) একটি কপি কমিট করুন যাতে টিমের সবাই বুঝে।",
      },
      {
        type: "heading",
        content: "সাধারণ সেটআপ এরর ও সমাধান",
      },
      {
        type: "table",
        headers: ["এরর", "কারণ", "সমাধান"],
        rows: [
          ["SyntaxError: Cannot use import statement outside a module", ".js ফাইলে import লেখা হয়েছে কিন্তু package.json-এ \"type\": \"module\" নেই", "package.json-এ \"type\": \"module\" যোগ করুন, অথবা ফাইলের নাম .mjs করুন"],
          ["ERR_MODULE_NOT_FOUND", "import-এ ফাইল এক্সটেনশন (.js) বাদ দেওয়া হয়েছে", "ESM-এ import \"./routes/books.js\" — এক্সটেনশনসহ পুরো পাথ লিখুন"],
          ["Error: listen EADDRINUSE", "পোর্টটি আগেই অন্য প্রসেসে ব্যস্ত", "অন্য পোর্ট ব্যবহার করুন বা আগের সার্ভার বন্ধ করুন"],
          ["ERR_REQUIRE_ESM", "CommonJS ফাইল থেকে ESM-only প্যাকেজ require করা হয়েছে", "প্যাকেজটির ESM ভার্সন import দিয়ে ব্যবহার করুন"],
        ],
      },
      {
        type: "heading",
        content: "পরবর্তী শেখার রোডম্যাপ",
      },
      {
        type: "text",
        content:
          "এই কোর্সের বাকি সেকশনগুলো সেরা ক্রমে পড়ে ফেলুন, তারপর বাইরের জগতে এগোন:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "জাভাস্ক্রিপ্ট মডিউল সিস্টেম — CommonJS ও ES Modules পুরোপুরি আয়ত্তে (এই কোর্সেই আছে)",
          "অ্যাপ্লিকেশন তৈরি — ভ্যালিডেশন, অথেনটিকেশন, ডেটাবেস, ফাইল আপলোড, টেস্টিং, নিরাপত্তা, ডিপ্লয় (এই কোর্সেই আছে)",
          "TypeScript — টাইপ নিরাপদ Express, বড় প্রজেক্টের আসল বন্ধু (এই কোর্সে সম্পূর্ণ সেকশন আছে)",
          "GraphQL বা WebSocket — যখন REST-এর বাইরের চাহিদা আসবে",
          "ক্লাউড — Docker, CI/CD পাইপলাইন আর মনিটরিং",
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
