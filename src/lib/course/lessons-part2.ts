import type { Lesson } from "./types";

export const lessonsPart2: Lesson[] = [
  {
    id: "middleware",
    title: "মিডলওয়্যার: Express-এর প্রাণ",
    subtitle: "প্রতিটি রিকোয়েস্টের মাঝপথে নিজের লজিক বসানো",
    duration: "১৫ মিনিট",
    blocks: [
      {
        type: "text",
        content:
          "মিডলওয়্যার (Middleware) Express-এর হৃদপিণ্ড। এর নামেই রহস্য: মিডল (মাঝে) + ওয়্যার — রিকোয়েস্ট আসার পর থেকে রেসপন্স যাওয়ার আগ পর্যন্ত মাঝপথে চলা প্রতিটি ফাংশন। একটি রিকোয়েস্ট অনেকগুলো মিডলওয়্যারের ভেতর দিয়ে প্রবাহিত (flow) হয় — একটির কাজ শেষ হলে পরেরটি শুরু হয়।",
      },
      {
        type: "text",
        content:
          "বিমানবন্দরের নিরাপত্তা চেকের সাথে তুলনা করুন: যাত্রী (রিকোয়েস্ট) একে একে পাসপোর্ট চেক, ব্যাগ স্ক্যান, বডি স্ক্যান — সবগুলো স্টেশনের ভেতর দিয়ে যায়। কোনো স্টেশনে সমস্যা হলে সেখানেই থেমে যায়, আর সব ঠিক থাকলে ফাইনাল গেট (রাউট হ্যান্ডলার) পর্যন্ত পৌঁছায়।",
      },
      {
        type: "heading",
        content: "প্রথম মিডলওয়্যার লিখি",
      },
      {
        type: "text",
        content:
          "মিডলওয়্যার আসলে একটি ফাংশন, যার তিনটি প্যারামিটার: req (রিকোয়েস্ট), res (রেসপন্স) এবং next। next কল করলে প্রবাহ পরের মিডলওয়্যারে চলে যায়, না করলে রিকোয়েস্ট সেখানেই ঝুলে থাকে। নিচে একটি সিম্পল লগার — প্রতিটি রিকোয়েস্টের তথ্য টার্মিনালে দেখাবে:",
      },
      {
        type: "code",
        language: "js",
        filename: "server.js",
        code: `const express = require("express");
const app = express();

// নিজের হাতে বানানো প্রথম মিডলওয়্যার
app.use((req, res, next) => {
  console.log(
    "নতুন রিকোয়েস্ট এসেছে:",
    req.method,
    req.url
  );
  next(); // পরের ধাপে পাঠিয়ে দাও
});

app.get("/", (req, res) => {
  res.send("হোমপেজ");
});

app.get("/about", (req, res) => {
  res.send("আমাদের সম্পর্কে");
});

app.listen(3000);`,
      },
      {
        type: "text",
        content:
          "এখন / বা /about — যে রাউটেই যান না কেন, টার্মিনালে আগে \"নতুন রিকোয়েস্ট এসেছে: GET /\" জাতীয় মেসেজ দেখবেন, তারপর রাউটের রেসপন্স আসবে। অর্থাৎ মিডলওয়্যারটি প্রতিটি রিকোয়েস্টের মাঝপথে চলল।",
      },
      {
        type: "warning",
        content:
          "next() কল করতে ভুলে গেলে রিকোয়েস্ট সেখানেই আটকে যাবে — ব্রাউজার বারবার লোড হতে থাকবে, কোনো রেসপন্স আসবে না! নতুনদের সবচেয়ে প্রচলিত ভুল এটিই।",
      },
      {
        type: "heading",
        content: "মিডলওয়্যারের ধরনগুলো",
      },
      {
        type: "list",
        items: [
          "অ্যাপ্লিকেশন-লেভেল: app.use() দিয়ে যুক্ত — সব রাউটেই চলে (উপরের লগার এ ধরনেরই)",
          "রাউট-নির্দিষ্ট: app.get(), app.post() এর পাথ ও হ্যান্ডলারের মাঝে বসানো — শুধু ওই রাউটে চলে",
          "বিল্ট-ইন: Express-এর সাথেই আসে — express.json(), express.static() ইত্যাদি",
          "থার্ড-পার্টি: npm থেকে ইনস্টল করতে হয় — cors, morgan, helmet ইত্যাদি",
          "এরর-হ্যান্ডলিং: এরর ধরার বিশেষ মিডলওয়্যার — চারটি প্যারামিটার নেয় (আলাদা পাঠে শিখব)",
        ],
      },
      {
        type: "code",
        language: "js",
        code: `// রাউট-নির্দিষ্ট মিডলওয়্যার: শুধু /admin-এ চলবে
app.get(
  "/admin",
  (req, res, next) => {
    const isAdmin = false; // ধরুন লগইন চেক করলাম
    if (!isAdmin) {
      res.send("দুঃখিত! আপনার প্রবেশাধিকার নেই।");
      return; // এখানেই থেমে যাও
    }
    next(); // সব ঠিক, এগিয়ে যাও
  },
  (req, res) => {
    res.send("অ্যাডমিন প্যানেলে স্বাগতম!");
  }
);`,
      },
      {
        type: "heading",
        content: "কিছু জনপ্রিয় মিডলওয়্যার",
      },
      {
        type: "table",
        headers: ["মিডলওয়্যার", "কাজ"],
        rows: [
          ["express.json()", "JSON বডি পড়ে req.body তে বসায়"],
          ["express.urlencoded()", "HTML ফর্ম ডেটা পড়ে req.body তে বসায়"],
          ["express.static()", "ছবি, CSS, JS ফাইল সার্ভ করে"],
          ["cors", "ভিন্ন ডোমেইন থেকে রিকোয়েস্ট অনুমতি দেয়"],
          ["morgan", "সুন্দর করে রিকোয়েস্ট লগ দেখায়"],
          ["helmet", "নিরাপত্তা হেডার যোগ করে"],
        ],
      },
      {
        type: "code",
        language: "bash",
        code: `npm install cors morgan`,
      },
      {
        type: "code",
        language: "js",
        code: `const cors = require("cors");
const morgan = require("morgan");

app.use(cors());      // CORS সমস্যার সমাধান
app.use(morgan("dev")); // রঙিন লগ: GET / 200 5.234 ms - 12`,
      },
      {
        type: "warning",
        content:
          "মিডলওয়্যারের ক্রম খুব গুরুত্বপূর্ণ — উপর থেকে নিচে ক্রমানুসারে চলে। express.json() রাউটের উপরে না রাখলে req.body খালি থেকে যাবে! নিয়ম হলো: সাধারণ মিডলওয়্যার আগে, রাউট পরে, এরর হ্যান্ডলার সবার শেষে।",
      },
      {
        type: "tip",
        content:
          "মিডলওয়্যারে সাধারণত কী কী কাজ হয়: লগিং, লগইন যাচাই (authentication), ডেটা পার্সিং, CORS হ্যান্ডলিং, রেট লিমিট ইত্যাদি। একবার মিডলওয়্যার লিখে সব রাউটে ব্যবহার করা যায় — ড্রাই প্রিন্সিপল (DRY) মেনে কোড হয় পরিষ্কার।",
      },
    ],
  },
  {
    id: "req-res",
    title: "রিকোয়েস্ট ও রেসপন্স অবজেক্ট",
    subtitle: "req আর res — ব্যাকএন্ড ডেভেলপারের দুই হাত",
    duration: "১২ মিনিট",
    blocks: [
      {
        type: "text",
        content:
          "প্রতিটি রাউট হ্যান্ডলারে আমরা দুটি অবজেক্ট পাই: req (রিকোয়েস্ট) এবং res (রেসপন্স)। ক্লায়েন্ট যা পাঠিয়েছে সবকিছু req-এর ভেতরে, আর ক্লায়েন্টকে যা ফেরত পাঠাবেন সেটি res দিয়ে। এই দুটি অবজেক্টের জেনারেল জানলেই Express-এর ৮০% কাজ করা যায়।",
      },
      {
        type: "heading",
        content: "req অবজেক্ট: ক্লায়েন্ট কী পাঠিয়েছে?",
      },
      {
        type: "table",
        headers: ["প্রপার্টি", "কী পাওয়া যায়", "উদাহরণ"],
        rows: [
          ["req.params", "রুট প্যারামিটার", "/users/:id থেকে id"],
          ["req.query", "কোয়েরি স্ট্রিং", "?q=express থেকে q"],
          ["req.body", "রিকোয়েস্ট বডি (JSON/ফর্ম)", "POST-এর ডেটা"],
          ["req.headers", "রিকোয়েস্ট হেডার", "Content-Type, Authorization"],
          ["req.method", "HTTP মেথড", "GET, POST..."],
          ["req.url", "রিকোয়েস্টের পাথ", "/books?sort=price"],
        ],
      },
      {
        type: "code",
        language: "js",
        code: `app.post("/users/:id/posts", (req, res) => {
  console.log(req.params.id);   // পাথ থেকে id
  console.log(req.body.title);  // বডি থেকে টাইটেল
  console.log(req.query.lang);  // ?lang=bn
  console.log(req.headers);     // সব হেডার
  res.send("চেক করুন টার্মিনাল");
});`,
      },
      {
        type: "heading",
        content: "res অবজেক্ট: ক্লায়েন্টকে কী পাঠাবেন?",
      },
      {
        type: "table",
        headers: ["মেথড", "কাজ", "উদাহরণ"],
        rows: [
          ["res.send()", "টেক্সট/HTML/অবজেক্ট পাঠায়", "res.send(\"হ্যালো\")"],
          ["res.json()", "JSON ডেটা পাঠায়", "res.json({ name: \"রাফি\" })"],
          ["res.status()", "স্ট্যাটাস কোড সেট করে", "res.status(404)"],
          ["res.redirect()", "অন্য URL-এ পাঠিয়ে দেয়", "res.redirect(\"/login\")"],
          ["res.sendFile()", "ফাইল পাঠায়", "res.sendFile(path)"],
          ["res.set()", "রেসপন্স হেডার সেট করে", "res.set(\"X-Key\", \"abc\")"],
        ],
      },
      {
        type: "code",
        language: "js",
        code: `app.get("/user", (req, res) => {
  res.status(200).json({
    name: "রাফি আহমেদ",
    role: "শিক্ষার্থী",
    city: "ঢাকা",
  });
});

// ব্রাউজারে দেখবেন:
// {"name":"রাফি আহমেদ","role":"শিক্ষার্থী","city":"ঢাকা"}`,
      },
      {
        type: "heading",
        content: "HTTP স্ট্যাটাস কোড: রেসপন্সের মুড",
      },
      {
        type: "text",
        content:
          "প্রতিটি রেসপন্সের সাথে একটি স্ট্যাটাস কোড যায় — তিন ডিজিটের সংখ্যা যা বলে দেয় কাজটা কী হলো। ডিফল্টে Express 200 (সফল) পাঠায়, কিন্তু পরিস্থিতি বুঝে সঠিক কোড পাঠানো পেশাদারিত্বের অংশ:",
      },
      {
        type: "table",
        headers: ["কোড", "অর্থ", "কখন পাঠাবেন"],
        rows: [
          ["200", "OK — সফল", "সাধারণ সফল রিকোয়েস্ট"],
          ["201", "Created — নতুন কিছু তৈরি হয়েছে", "POST-এ নতুন ডেটা সেভ করার পর"],
          ["400", "Bad Request — ক্লায়েন্টের ডেটা ভুল", "ফর্মে জরুরি ফিল্ড খালি থাকলে"],
          ["401", "Unauthorized — লগইন নেই", "টোকেন ছাড়া প্রাইভেট রাউটে"],
          ["403", "Forbidden — অনুমতি নেই", "লগইন আছে কিন্তু অ্যাডমিন নয়"],
          ["404", "Not Found — পাওয়া যায়নি", "রাউট বা ডেটা না মিললে"],
          ["500", "Server Error — সার্ভারে সমস্যা", "আমাদের কোডে এরর হলে"],
        ],
      },
      {
        type: "code",
        language: "js",
        code: `app.get("/books/:id", (req, res) => {
  const book = findBook(req.params.id);
  if (!book) {
    return res.status(404).json({
      error: "এই বইটি খুঁজে পাওয়া যায়নি!",
    });
  }
  res.json(book);
});`,
      },
      {
        type: "tip",
        content:
          "res.send() বনাম res.json(): অবজেক্ট পাঠালে send() নিজে থেকেই JSON বানিয়ে দেয়, তবু পরিষ্কার উদ্দেশ্য জানাতে API-তে res.json() ব্যবহার করাই ভালো অভ্যাস। আর মনে রাখবেন — একটি হ্যান্ডলারে res.send()/res.json() একবারই কল করা যায়, দুইবার করলে Error: Cannot set headers after they are sent to the client এরর আসবে!",
      },
    ],
  },
  {
    id: "static-files",
    title: "স্ট্যাটিক ফাইল সার্ভ করা",
    subtitle: "CSS, ছবি আর HTML ফাইল সরাসরি ব্রাউজারে দেখানো",
    duration: "৮ মিনিট",
    blocks: [
      {
        type: "text",
        content:
          "এ পর্যন্ত আমরা শুধু টেক্সট রেসপন্স পাঠিয়েছি। কিন্তু আসল ওয়েবসাইটে থাকে HTML ফাইল, CSS স্টাইলশিট, ছবি, ফন্ট — এসবকে বলে স্ট্যাটিক ফাইল, কারণ সার্ভার এগুলো যেমন আছে তেমনই (স্ট্যাটিকভাবে) পাঠিয়ে দেয়, প্রসেস করে না। Express-এ এর জন্য বিল্ট-ইন মিডলওয়্যার আছে: express.static()।",
      },
      {
        type: "heading",
        content: "public ফোল্ডার সেটআপ",
      },
      {
        type: "text",
        content:
          "প্রথমে প্রজেক্ট ফোল্ডারে public নামে একটি ফোল্ডার বানান এবং তার ভেতরে কিছু ফাইল রাখুন। সাধারণ স্ট্রাকচারটা দেখতে এমন:",
      },
      {
        type: "code",
        language: "text",
        filename: "ফোল্ডার স্ট্রাকচার",
        code: `express-demo/
├── public/
│   ├── images/
│   │   └── cat.png
│   ├── css/
│   │   └── style.css
│   └── index.html
├── package.json
└── server.js`,
      },
      {
        type: "code",
        language: "js",
        filename: "server.js",
        code: `const express = require("express");
const path = require("path");
const app = express();

// public ফোল্ডারকে স্ট্যাটিক ফোল্ডার ঘোষণা করলাম
app.use(express.static(path.join(__dirname, "public")));

app.listen(3000);`,
      },
      {
        type: "text",
        content:
          "ব্যাস! এখন public ফোল্ডারের প্রতিটি ফাইল URL থেকে সরাসরি অ্যাক্সেস করা যাবে — ফোল্ডারের নাম public উল্লেখ করতেই হবে না:",
      },
      {
        type: "list",
        items: [
          "localhost:3000/css/style.css — স্টাইলশিট দেখাবে",
          "localhost:3000/images/cat.png — ছবিটি দেখাবে",
          "localhost:3000/index.html — HTML পেজটি দেখাবে",
        ],
      },
      {
        type: "heading",
        content: "__dirname কী?",
      },
      {
        type: "text",
        content:
          "__dirname হলো Node.js-এর বিল্ট-ইন ভেরিয়েবল — বর্তমান ফাইল (server.js) যে ফোল্ডারে আছে তার সম্পূর্ণ পাথ। path.join() দিয়ে তার সাথে public যোগ করা হয়। এভাবে লিখলে আপনার প্রজেক্ট কম্পিউটারের যেকোনো জায়গায় সরালেও কোড ভাঙে না — তাই এটিই ভালো অভ্যাস।",
      },
      {
        type: "heading",
        content: "ভার্চুয়াল পাথ প্রিফিক্স",
      },
      {
        type: "text",
        content:
          "চাইলে URL-এ প্রিফিক্স যোগ করা যায়, যেন ফাইলগুলো বাস্তবে যেখানে আছে তার চেয়ে ভিন্ন জায়গায় আছে বলে মনে হয়:",
      },
      {
        type: "code",
        language: "js",
        code: `// এখন ফাইলগুলো /assets/ প্রিফিক্সে পাওয়া যাবে
app.use("/assets", express.static("public"));

// localhost:3000/assets/images/cat.png
// অথচ আসল ফাইলটা public/images/cat.png এ!`,
      },
      {
        type: "tip",
        content:
          "public ফোল্ডারে index.html নামে ফাইল থাকলে express.static() সেটিকে হোমপেজ (\"/\") হিসেবে স্বয়ংক্রিয়ভাবে দেখায়। তাই হোমপেজের জন্য আলাদা রাউটও লিখতে হয় না!",
      },
      {
        type: "note",
        content:
          "স্ট্যাটিক ফাইল সার্ভ করা ছোট প্রজেক্টের জন্য চমৎকার, কিন্তু বড় ফ্রন্টএন্ড অ্যাপে (React/Vue) ফ্রন্টএন্ড আর ব্যাকএন্ড আলাদা হয়ে যায় — তখন ব্যাকএন্ড মূলত JSON API হিসেবে কাজ করে, যা আমরা REST API পাঠে শিখব।",
      },
    ],
  },
  {
    id: "forms",
    title: "ফর্ম ডেটা ও বডি পার্সিং",
    subtitle: "ইউজারের পাঠানো JSON ও ফর্ম ডেটা পড়া",
    duration: "১২ মিনিট",
    blocks: [
      {
        type: "text",
        content:
          "ইউজার লগইন করে, কমেন্ট লেখে, প্রোফাইল আপডেট করে — এসব কাজে ডেটা সার্ভারে পাঠাতে হয়, সাধারণত POST রিকোয়েস্টের বডিতে (body)। কিন্তু ডিফল্টে Express রিকোয়েস্টের বডি পড়ে না! বডিকে পড়ার যোগ্য অবজেক্টে রূপান্তর করাকে বলে বডি পার্সিং (body parsing) — এবং এটি করে মিডলওয়্যার।",
      },
      {
        type: "heading",
        content: "বডি পার্সিং মিডলওয়্যার",
      },
      {
        type: "text",
        content:
          "Express 4.16+ থেকে দুটি মিডলওয়্যার বিল্ট-ইন আছে: express.json() JSON ডেটার জন্য, আর express.urlencoded() HTML ফর্মের জন্য। দুটোই app.use() দিয়ে রাউটের উপরে বসাতে হবে:",
      },
      {
        type: "code",
        language: "js",
        filename: "server.js",
        code: `const express = require("express");
const app = express();

// বডি পার্সিং মিডলওয়্যার (রাউটের আগে রাখতে হবে!)
app.use(express.json());                    // JSON বডির জন্য
app.use(express.urlencoded({ extended: true })); // HTML ফর্মের জন্য

app.listen(3000);`,
      },
      {
        type: "heading",
        content: "JSON ডেটা গ্রহণ করা",
      },
      {
        type: "text",
        content:
          "এবার একটি POST রাউট লিখি যা ইউজারের নাম-ইমেইল নিয়ে স্বাগতম জানায়। req.body থেকে ডেটা পড়া হবে:",
      },
      {
        type: "code",
        language: "js",
        code: `app.post("/register", (req, res) => {
  const { name, email } = req.body;

  // ভ্যালিডেশন: জরুরি ফিল্ড খালি কিনা চেক
  if (!name || !email) {
    return res.status(400).json({
      error: "নাম ও ইমেইল দুটোই দিতে হবে!",
    });
  }

  console.log("নতুন ইউজার:", name, email);
  res.status(201).json({
    message: "ধন্যবাদ " + name + "! রেজিস্ট্রেশন সফল হয়েছে।",
    user: { name, email },
  });
});`,
      },
      {
        type: "heading",
        content: "HTML ফর্ম থেকে ডেটা",
      },
      {
        type: "text",
        content:
          "সাধারণ HTML ফর্ম ডেটা urlencoded ফরম্যাটে যায়। express.urlencoded() মিডলওয়্যার থাকলে ফর্মের ডেটাও req.body-তে একইভাবে পাওয়া যায়:",
      },
      {
        type: "code",
        language: "html",
        filename: "public/contact.html",
        code: `<form action="/contact" method="POST">
  <input type="text" name="name" placeholder="আপনার নাম" />
  <textarea name="message" placeholder="বার্তা লিখুন"></textarea>
  <button type="submit">পাঠিয়ে দিন</button>
</form>`,
      },
      {
        type: "code",
        language: "js",
        filename: "server.js",
        code: `app.post("/contact", (req, res) => {
  const { name, message } = req.body;
  console.log(name + " এর বার্তা: " + message);
  res.send("ধন্যবাদ " + name + ", আপনার বার্তা পেয়েছি!");
});`,
      },
      {
        type: "heading",
        content: "কীভাবে টেস্ট করবেন?",
      },
      {
        type: "text",
        content:
          "ব্রাউজারের অ্যাড্রেসবার সবসময় GET রিকোয়েস্ট পাঠায় — POST পাঠাতে টুল দরকার। জনপ্রিয় তিনটি উপায়:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Postman — API টেস্টিংয়ের সবচেয়ে জনপ্রিয় গ্রাফিক্যাল টুল, ব্যাকএন্ড ডেভেলপারের প্রতিদিনের সঙ্গী",
          "Thunder Client — VS Code-এর ভেতরেই চলে, হালকা ও সহজ",
          "curl — টার্মিনালের ক্লাসিক কমান্ড, সব OS-এই আছে",
        ],
      },
      {
        type: "code",
        language: "bash",
        code: `curl -X POST http://localhost:3000/register \\
  -H "Content-Type: application/json" \\
  -d "{\\"name\\":\\"রাফি\\",\\"email\\":\\"rafi@example.com\\"}"`,
        output: `{"message":"ধন্যবাদ রাফি! রেজিস্ট্রেশন সফল হয়েছে।","user":{"name":"রাফি","email":"rafi@example.com"}}`,
      },
      {
        type: "warning",
        content:
          "Content-Type হেডার সঠিক না হলে req.body খালি থাকবে! JSON পাঠালে হেডারে অবশ্যই Content-Type: application/json দিতে হবে। আর মিডলওয়্যার ডিফিনিশন রাউটের উপরে রাখতে ভুলবেন না।",
      },
      {
        type: "tip",
        content:
          "এই কোর্সের প্লেগ্রাউন্ড সেকশনে গিয়ে এখনই GET/POST/PUT/DELETE রিকোয়েস্ট নিজে পাঠিয়ে দেখুন — লাইভ সার্ভারের সাথে খেলে সব ঝকঝক করে বুঝে যাবেন!",
      },
    ],
  },
];
