import type { QuizQuestion } from "./types";

export const quizQuestions: QuizQuestion[] = [
  {
    question: "Express.js আসলে কোনটির উপর তৈরি করা একটি ফ্রেমওয়ার্ক?",
    options: ["Python", "Node.js", "PHP", "Java"],
    answerIndex: 1,
    explanation:
      "Express.js হলো Node.js-এর উপর তৈরি ওয়েব ফ্রেমওয়ার্ক। Node.js ইঞ্জিন হলে Express সেই ইঞ্জিনের উপর বানানো গাড়ি!",
  },
  {
    question: "app.listen(3000) কী কাজ করে?",
    options: [
      "ডেটাবেসে কানেক্ট করে",
      "HTML ফাইল তৈরি করে",
      "সার্ভারকে ৩০০০ পোর্টে চালু করে রিকোয়েস্টের জন্য অপেক্ষা করে",
      "npm প্যাকেজ ইনস্টল করে",
    ],
    answerIndex: 2,
    explanation:
      "app.listen() মেথড সার্ভার চালু করে নির্দিষ্ট পোর্টে আসা রিকোয়েস্টের জন্য অপেক্ষা করতে থাকে। ঐচ্ছিক কলব্যাক ফাংশনে কনফার্মেশন মেসেজ দেখানো যায়।",
  },
  {
    question: "URL: /users/42 — এখানে 42 কোথা থেকে পাওয়া যাবে?",
    options: ["req.query", "req.body", "req.headers", "req.params"],
    answerIndex: 3,
    explanation:
      "/users/:id রাউটে প্যারামিটার পাওয়া যায় req.params অবজেক্ট থেকে। কোয়েরি স্ট্রিং (?key=value) পাওয়া যায় req.query তে, আর POST বডি পাওয়া যায় req.body তে।",
  },
  {
    question: "মিডলওয়্যারে next() কল না করলে কী হবে?",
    options: [
      "এরর হবে ও সার্ভার বন্ধ হবে",
      "রিকোয়েস্ট সেখানেই আটকে যাবে, রেসপন্স কখনো আসবে না",
      "Express নিজে থেকেই পরের ধাপে যাবে",
      "রেসপন্স দুইবার যাবে",
    ],
    answerIndex: 1,
    explanation:
      "next() কল করলেই রিকোয়েস্ট পরের মিডলওয়্যার বা রাউট হ্যান্ডলারে যায়। না ডাকলে রিকোয়েস্ট ঝুলে থাকে — ব্রাউজার বারবার লোড হতে থাকে। নতুনদের প্রচলিত ভুল!",
  },
  {
    question: "POST রিকোয়েস্টের JSON বডি পড়তে কোন মিডলওয়্যার দরকার?",
    options: ["express.static()", "express.json()", "express.urlencoded() শুধু", "cors()"],
    answerIndex: 1,
    explanation:
      "express.json() মিডলওয়্যার JSON বডি পড়ে req.body-তে বসায়। express.urlencoded() HTML ফর্মের জন্য, express.static() স্ট্যাটিক ফাইলের জন্য, আর cors() ভিন্ন ডোমেইনের অনুমতির জন্য।",
  },
  {
    question: "ছবি, CSS, HTML ফাইল সার্ভ করার জন্য কোনটি ব্যবহার করা হয়?",
    options: [
      "app.use(express.static(\"public\"))",
      "res.send(\"public\")",
      "app.listen(\"public\")",
      "app.get(\"public\")",
    ],
    answerIndex: 0,
    explanation:
      "express.static() মিডলওয়্যার একটি ফোল্ডারকে স্ট্যাটিক ফাইলের উৎস বানায় — তার ভেতরের প্রতিটি ফাইল তারপর URL থেকে সরাসরি অ্যাক্সেসযোগ্য হয়ে যায়।",
  },
  {
    question: "HTTP স্ট্যাটাস কোড 404 কী বোঝায়?",
    options: [
      "সার্ভারে ইন্টার্নাল এরর",
      "রিকোয়েস্ট সফল হয়েছে",
      "লগইন করা হয়নি",
      "রিকোয়েস্ট করা জিনিসটি পাওয়া যায়নি",
    ],
    answerIndex: 3,
    explanation:
      "404 মানে Not Found — রাউট বা রিসোর্সটি পাওয়া যায়নি। 401 লগইন না থাকা, 403 অনুমতি না থাকা আর 500 সার্ভারের নিজস্ব এরর বোঝায়।",
  },
  {
    question: "এরর-হ্যান্ডলিং মিডলওয়্যারে কয়টি প্যারামিটার থাকে?",
    options: ["২টি", "৩টি", "৪টি", "যত খুশি"],
    answerIndex: 2,
    explanation:
      "এরর হ্যান্ডলারে চারটি প্যারামিটার: (err, req, res, next)। চারটিই না লিখলে Express বুঝবে না এটি এরর হ্যান্ডলার, আর তাকে রাখতে হয় সব রাউটের একদম শেষে।",
  },
  {
    question: "res.status(204).send() — এখানে 204 কী বোঝায়?",
    options: [
      "সফল, তবে রেসপন্স বডিতে কিছু নেই",
      "নতুন রিসোর্স তৈরি হয়েছে",
      "সার্ভার রিস্টার্ট হয়েছে",
      "অনুমতি নেই",
    ],
    answerIndex: 0,
    explanation:
      "204 মানে No Content — কাজ সফলভাবে হয়েছে কিন্তু ফেরত কিছু পাঠানোর দরকার নেই। DELETE অপারেশনে এটি খুব প্রচলিত।",
  },
  {
    question: "বড় প্রজেক্টে রাউট গুছিয়ে আলাদা ফাইলে রাখতে কোনটি ব্যবহার করা হয়?",
    options: [
      "express.static()",
      "express.Router()",
      "app.listen()",
      "req.query",
    ],
    answerIndex: 1,
    explanation:
      "express.Router() দিয়ে ছোট আলাদা রাউটিং সিস্টেম বানানো হয়, যাকে নিজস্ব ফাইলে লিখে app.use(\"/prefix\", router) দিয়ে মূল অ্যাপে মাউন্ট করা যায়।",
  },
  {
    question: "package.json-এ \"type\": \"module\" সেট করলে কী হয়?",
    options: [
      "প্রজেক্টের .js ফাইলগুলো ES Modules হিসেবে চলে (import/export)",
      "Express ইনস্টল হয়ে যায়",
      "প্রজেক্ট TypeScript হয়ে যায়",
      "নতুন ডিপেন্ডেন্সি ইনস্টল হয়",
    ],
    answerIndex: 0,
    explanation:
      "\"type\": \"module\" বলে Node.js-কে: এই প্রজেক্টের .js ফাইলগুলো ES Modules — অর্থাৎ import express from \"express\" লেখা যাবে। এটা ছাড়া .js ফাইলে import লিখলে SyntaxError আসে।",
  },
  {
    question: "ES Modules-এ নিজের প্রজেক্টের ফাইল import করার সময় কী মনে রাখতে হয়?",
    options: [
      "ফাইলের নাম ছোট হাতের অক্ষরে লিখতে হয়",
      "এক্সটেনশনসহ পুরো পাথ লিখতে হয় — import \"./routes/books.js\"",
      "শুধু ফোল্ডারের নাম লিখলেই হয়",
      "require() ব্যবহার করতে হয়",
    ],
    answerIndex: 1,
    explanation:
      "CommonJS-এ require(\"./routes/books\") চলত, কিন্তু ES Modules-এ এক্সটেনশন বাধ্যতামূলক — ভুলে গেলে ERR_MODULE_NOT_FOUND এরর! এটাই দুই সিস্টেমের সবচেয়ে ঘন ঘন ধাক্কা।",
  },
  {
    question: "Express 5-এ async হ্যান্ডলারের ভেতরে এরর হলে (await ব্যর্থ হলে) কী হয়?",
    options: [
      "সার্ভার ক্র্যাশ করে",
      "এররটি স্বয়ংক্রিয়ভাবে এরর-হ্যান্ডলিং মিডলওয়্যারে চলে যায়",
      "রেসপন্স হিসেবে HTML পেজ যায়",
      "কিছুই হয় না, রিকোয়েস্ট ঝুলে থাকে",
    ],
    answerIndex: 1,
    explanation:
      "Express 5-এর সবচেয়ে আরামদায়ক উন্নতি: async হ্যান্ডলারের rejected promise স্বয়ংক্রিয়ভাবে এরর হ্যান্ডলারে পাঠানো হয় — try/catch + next(err) লেখার দরকার নেই (সেটা ছিল Express 4-এর যুগের কাজ)।",
  },
  {
    question: "TypeScript-এ req.body-র জন্য interface লিখলেই কি ভুল ডেটা আটকায়?",
    options: [
      "হ্যাঁ — টাইপ সব যাচাই করে",
      "না — টাইপ কম্পাইলের পর মুছে যায়; রানটাইম যাচাইয়ের জন্য Zod-জাতীয় ভ্যালিডেশন লাগে",
      "শুধু বড় প্রজেক্টে আটকায়",
      "শুধু TypeScript 7-এ আটকায়",
    ],
    answerIndex: 1,
    explanation:
      "TypeScript-এর টাইপ কম্পাইল-টাইমের জিনিস — জাভাস্ক্রিপ্টে কম্পাইল হওয়ার সময় মুছে যায়। বাইরের HTTP রিকোয়েস্টের ডেটা রানটাইমে আসে, তাই Zod-এর মতো রানটাইম ভ্যালিডেশন আলাদাভাবেই দরকার — টাইপ আর ভ্যালিডেশন দুই হাত।",
  },
];
