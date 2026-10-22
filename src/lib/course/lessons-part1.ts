import type { Lesson } from "./types";

export const lessonsPart1: Lesson[] = [
  {
    id: "intro",
    title: "Express.js পরিচিতি: কী এবং কেন?",
    subtitle: "সার্ভার, রিকোয়েস্ট-রেসপন্স আর Express-এর পরিচয়",
    duration: "৮ মিনিট",
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
        content: "Express দেখতে কেমন?",
      },
      {
        type: "text",
        content:
          "নিচের কোডটি দেখুন — এই কোর্সের শেষে আপনি নিজেই এমন কোড লিখতে পারবেন এবং প্রতিটি লাইন বুঝে বুঝে ব্যাখ্যা করতে পারবেন। এই ছোট্ট কোডটিই একটি সম্পূর্ণ ওয়েব সার্ভার, যা ব্রাউজার থেকে রিকোয়েস্ট নিয়ে রেসপন্স পাঠায়।",
      },
      {
        type: "code",
        language: "js",
        filename: "একটি ঝলমলে নতুন Express সার্ভার",
        code: `const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("আসসালামু আলাইকুম! এটি আমার প্রথম Express সার্ভার।");
});

app.listen(3000, () => {
  console.log("সার্ভার চলছে ৩০০০ পোর্টে...");
});`,
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
          "রাউটিং — ভিন্ন পেজ ও ডেটার জন্য ভিন্ন রাস্তা তৈরি",
          "মিডলওয়্যার — Express-এর সবচেয়ে শক্তিশালী ধারণা",
          "রিকোয়েস্ট-রেসপন্স অবজেক্ট নিয়ে কাজ",
          "ফর্ম ডেটা ও JSON বডি হ্যান্ডল করা",
          "সম্পূর্ণ REST API বানানো (CRUD অপারেশন)",
          "এরর হ্যান্ডলিং ও পেশাদার প্রজেক্ট স্ট্রাকচার",
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
          "nodejs.org ওয়েবসাইটে যান এবং LTS (Long Term Support) ভার্সনটি ডাউনলোড করে ইনস্টল করুন। LTS ভার্সনই সবচেয়ে স্থিতিশীল, তাই শেখার জন্য এটিই সবচেয়ে ভালো। ইনস্টলেশন শেষে টার্মিনাল (Windows-এ Command Prompt বা PowerShell, Mac-এ Terminal) খুলে নিচের কমান্ড দিয়ে চেক করুন:",
      },
      {
        type: "code",
        language: "bash",
        code: `node -v
npm -v`,
        output: `v22.11.0
10.9.0`,
      },
      {
        type: "text",
        content:
          "ভার্সন নম্বর দেখালেই বুঝবেন ইনস্টলেশন সফল হয়েছে। আপনার ভার্সন আমার এখানের থেকে ভিন্ন হলে সমস্যা নেই — যত নতুনই হোক, এই কোর্সের সবকিছু কাজ করবে। npm হলো Node Package Manager, যা দিয়ে আমরা Express-সহ হাজারো প্যাকেজ ইনস্টল করব।",
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
          "package.json ফাইলটি আপনার প্রজেক্টের পরিচয়পত্র — প্রজেক্টের নাম, ভার্সন আর কোন কোন প্যাকেজ (dependencies) ব্যবহার হচ্ছে তা এখানে থাকে। সামনে এই ফাইলে আরও অনেক কিছু যোগ হবে, ধীরে ধীরে সব বুঝে নেবেন।",
      },
      {
        type: "heading",
        content: "ধাপ ৩: Express ইনস্টল করুন",
      },
      {
        type: "code",
        language: "bash",
        code: `npm install express`,
        output: `added 57 packages in 4s

3 packages are looking for funding
  run \`npm fund\` for details`,
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
          "package.json আপডেট — dependencies-এর নিচে express যোগ হয়েছে, এখন থেকে প্রজেক্ট Express ছাড়া চলবে না!",
        ],
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
    blocks: [
      {
        type: "text",
        content:
          "সেটআপ শেষ! এবার সবচেয়ে রোমাঞ্চকর মুহূর্ত — আপনার জীবনের প্রথম ওয়েব সার্ভার চালু করা। প্রজেক্ট ফোল্ডারে server.js নামে একটি ফাইল তৈরি করুন এবং নিচের কোডটি লিখুন।",
      },
      {
        type: "code",
        language: "js",
        filename: "server.js",
        code: `// ১. Express প্যাকেজটি আমদানি (import) করলাম
const express = require("express");

// ২. একটি Express অ্যাপ্লিকেশন তৈরি করলাম
const app = express();

// ৩. রুট পেজ ("/")-এ GET রিকোয়েস্টের হ্যান্ডলার
app.get("/", (req, res) => {
  res.send("আসসালামু আলাইকুম! এটি আমার প্রথম Express সার্ভার।");
});

// ৪. সার্ভারকে ৩০০০ পোর্টে চালু করলাম
const PORT = 3000;
app.listen(PORT, () => {
  console.log("সার্ভার চলছে http://localhost:3000 ঠিকানায়");
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
          "require(\"express\") — Node.js-কে বলছি express প্যাকেজটি লোড করে দিতে। এটি একটি ফাংশন রিটার্ন করে।",
          "express() কল করলে একটি নতুন অ্যাপ্লিকেশন তৈরি হয় — এটিই আমাদের সার্ভারের মূল অবজেক্ট, নাম দিয়েছি app।",
          "app.get() — বলছি: কেউ হোমপেজে (\"/\") রিকোয়েস্ট করলে এই ফাংশনটি চালাও। req হলো রিকোয়েস্ট, res হলো রেসপন্স।",
          "res.send() — ক্লায়েন্টকে রেসপন্স হিসেবে টেক্সট পাঠায়। এখানে একটি বাংলা বার্তা পাঠালাম।",
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
  "start": "nodemon server.js"
}`,
      },
      {
        type: "text",
        content:
          "package.json-এ উপরের মতো script যোগ করে এবার চালান npm start। এখন যেকোনো কোড সেভ করলেই সার্ভার অটোমেটিক রিস্টার্ট হবে — টার্মিনালে দেখবেন nodemon রিস্টার্টিং মেসেজ দেখাচ্ছে।",
      },
      {
        type: "note",
        content:
          "পোর্ট 3000 আগে থেকে ব্যস্ত থাকলে (Error: listen EADDRINUSE) কোডের PORT = 3000 বদলে 4000 বা 5000 করে দিন। পোর্ট নম্বর 1024 থেকে 65535-এর মধ্যে যেকোনোটি ব্যবহার করা যায়।",
      },
    ],
  },
  {
    id: "routing",
    title: "রাউটিং: রিকোয়েস্ট হ্যান্ডল করা",
    subtitle: "পেজ ও ডেটার রাস্তা তৈরি — মেথড, প্যারামিটার ও কোয়েরি",
    duration: "১৫ মিনিট",
    blocks: [
      {
        type: "text",
        content:
          "রাউটিং (Routing) মানে ঠিক করা দেওয়া — কোন URL-এ, কোন HTTP মেথডে রিকোয়েস্ট এলে কোন ফাংশন চলবে। আপনি যখন facebook.com/profile আর facebook.com/messages খোলেন, আসলে একই সার্ভারের দুটি ভিন্ন রাউটে যাচ্ছেন। Express-এ রাউটিং এতটাই সহজ যে কয়েক মিনিটেই আয়ত্তে আসবে।",
      },
      {
        type: "heading",
        content: "রাউটের তিনটি অংশ",
      },
      {
        type: "text",
        content:
          "প্রতিটি রাউটের তিনটি অংশ থাকে: HTTP মেথড (GET, POST, PUT, DELETE), পাথ (\"/\", \"/about\" ইত্যাদি) এবং হ্যান্ডলার ফাংশন (রিকোয়েস্ট এলে কী করবে)। নিচে একটি ওয়েবসাইটের একাধিক পেজের রাউট দেখুন:",
      },
      {
        type: "code",
        language: "js",
        filename: "server.js",
        code: `const express = require("express");
const app = express();

// হোমপেজ
app.get("/", (req, res) => {
  res.send("এটি হোমপেজ");
});

// আমাদের সম্পর্কে পেজ
app.get("/about", (req, res) => {
  res.send("এটি আমাদের সম্পর্কে পেজ");
});

// যোগাযোগ পেজ
app.get("/contact", (req, res) => {
  res.send("এটি যোগাযোগের পেজ");
});

app.listen(3000);`,
      },
      {
        type: "text",
        content:
          "এখন ব্রাউজারে localhost:3000, localhost:3000/about, localhost:3000/contact — তিনটি আলাদা ঠিকানায় গেলে তিনটি আলাদা রেসপন্স পাবেন। প্রতিটি রাউট তার নিজের হ্যান্ডলার দিয়ে রেসপন্স দিয়েছে।",
      },
      {
        type: "heading",
        content: "ভিন্ন HTTP মেথডের রাউট",
      },
      {
        type: "text",
        content:
          "একই পাথে ভিন্ন মেথডে রিকোয়েস্ট আসতে পারে। যেমন /books পাথে GET এলে বইয়ের তালিকা দেখাব, আর POST এলে নতুন বই যোগ করব। Express-এ প্রতিটি মেথডের জন্য আলাদা ফাংশন আছে:",
      },
      {
        type: "code",
        language: "js",
        code: `app.get("/books", (req, res) => {
  res.send("সব বইয়ের তালিকা দেখাও");
});

app.post("/books", (req, res) => {
  res.send("নতুন বই তৈরি করো");
});

app.put("/books", (req, res) => {
  res.send("বই আপডেট করো");
});

app.delete("/books", (req, res) => {
  res.send("বই মুছে ফেলো");
});`,
      },
      {
        type: "table",
        headers: ["মেথড", "কাজ", "উদাহরণ"],
        rows: [
          ["GET", "ডেটা পড়া / পেজ দেখানো", "বইয়ের তালিকা দেখা"],
          ["POST", "নতুন ডেটা তৈরি", "নতুন বই যোগ করা"],
          ["PUT", "আগের ডেটা আপডেট", "বইয়ের দাম বদলানো"],
          ["DELETE", "ডেটা মুছে ফেলা", "বই ডিলিট করা"],
        ],
      },
      {
        type: "heading",
        content: "রুট প্যারামিটার (Route Parameters)",
      },
      {
        type: "text",
        content:
          "একেক ইউজারের জন্য একেক রাউট লিখবেন নিশ্চয়ই! এজন্য আছে রুট প্যারামিটার — পাথের ভেতরে ভেরিয়েবলের মতো জায়গা। পাথে কোলন (:) দিয়ে প্যারামিটার লিখলে সেই জায়গায় যা আসে তা req.params অবজেক্টে ধরা যায়:",
      },
      {
        type: "code",
        language: "js",
        code: `app.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  res.send(userId + " নম্বর ইউজারের প্রোফাইল দেখাচ্ছি");
});

// localhost:3000/users/42 দিলে রেসপন্স হবে:
// "42 নম্বর ইউজারের প্রোফাইল দেখাচ্ছি"`,
      },
      {
        type: "text",
        content:
          "একই রাউটে একাধিক প্যারামিটারও ব্যবহার করা যায়: /users/:userId/books/:bookId — তখন req.params-এ userId ও bookId দুটোই পাওয়া যাবে। রাউটিংয়ের শক্তি এখানেই — একটি রাউটই হাজারো ভিন্ন রিকোয়েস্ট সামলায়।",
      },
      {
        type: "heading",
        content: "কোয়েরি স্ট্রিং (Query String)",
      },
      {
        type: "text",
        content:
          "URL-এর শেষে প্রশ্নবোধক চিহ্ন (?) দিয়ে যা লেখা হয় তাকে কোয়েরি স্ট্রিং বলে — যেমন /search?q=express&page=2। এগুলো ঐচ্ছিক তথ্য, যেমন সার্চ কীওয়ার্ড বা পেজ নম্বর। Express এগুলো স্বয়ংক্রিয়ভাবে req.query অবজেক্টে গুছিয়ে দেয়:",
      },
      {
        type: "code",
        language: "js",
        code: `app.get("/search", (req, res) => {
  const keyword = req.query.q;
  const page = req.query.page;
  res.send(
    "আপনি খুঁজছেন: " + keyword + ", পেজ: " + (page || "১")
  );
});

// localhost:3000/search?q=bangla&page=3
// রেসপন্স: "আপনি খুঁজছেন: bangla, পেজ: 3"`,
      },
      {
        type: "warning",
        content:
          "রাউটের ক্রম (order) গুরুত্বপূর্ণ! Express উপর থেকে নিচে মিলিয়ে দেখে, প্রথম মিলে যাওয়া রাউটই চলে। তাই /users/new এর মতো নির্দিষ্ট রাউট সবসময় /users/:id এর আগে রাখুন — নাহলে \"new\" শব্দটিই id হয়ে যাবে!",
      },
      {
        type: "tip",
        content:
          "রাউট অনেক হয়ে গেলে সেগুলো আলাদা ফাইলে সাজানোর জন্য Express দেয় express.Router() — সেটা আমরা বিস্তারিত শিখব প্রজেক্ট স্ট্রাকচারের পাঠে।",
      },
    ],
  },
];
