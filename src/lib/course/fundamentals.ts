import type { Lesson } from "./types";

export const fundamentals: Lesson[] = [
  {
    id: "routing",
    title: "রাউটিং: রিকোয়েস্ট হ্যান্ডল করা",
    subtitle: "পেজ ও ডেটার রাস্তা তৈরি — মেথড, প্যারামিটার ও কোয়েরি",
    duration: "১৫ মিনিট",
    keywords: ["routing", "routes", "route parameters", "query string", "app.get", "app.post", "wildcard"],
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
          "প্রতিটি রাউটের তিনটি অংশ থাকে: HTTP মেথড (GET, POST, PUT, DELETE), পাথ (\"/\", \"/about\" ইত্যাদি) এবং হ্যান্ডলার ফাংশন (রিকোয়েস্ট এলে কী করবে)। নিচে একটি ওয়েবসাইটের একাধিক পেজের রাউট দেখুন (ES Modules সংস্করণ — আগের পাঠগুলোতে \"type\": \"module\" সেট করেছি মনে আছে?):",
      },
      {
        type: "code",
        language: "js",
        variant: "esm",
        filename: "server.js",
        code: `import express from "express";

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
        variant: "esm",
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
        variant: "esm",
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
        variant: "esm",
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
        type: "note",
        content:
          "Express 5-এ req.query-র ডিফল্ট পার্সার বদলেছে — \"extended\" থেকে \"simple\" হয়েছে, আর req.query এখন শুধু পড়া যায় (ওয়াইটেবল না)। সাধারণ ?a=1&b=2 টাইপের কোয়েরির জন্য কিছুই বদলায়নি — জটিল নেস্টেড সিনট্যাক্স (?a[b]=1) দরকার হলে app.set(\"query parser\", \"extended\") দিতে হবে।",
      },
      {
        type: "heading",
        content: "Express 5-এ পাথ ম্যাচিংয়ের নতুন নিয়ম",
      },
      {
        type: "text",
        content:
          "Express 5-এ রাউট পাথ লেখার নিয়ম কিছুটা বদলেছে — নতুন প্রজেক্টে শুরু থেকেই নতুন সিনট্যাক্স শিখে নিন, পুরনো কোড দেখলে চিনবেন:",
      },
      {
        type: "table",
        headers: ["কাজ", "Express 4 (পুরনো)", "Express 5 (নতুন)"],
        rows: [
          ["সব পাথ ধরা", "app.get(\"/*\", ...)", "app.get(\"/*splat\", ...) — wildcard-এর নাম দিতে হয়"],
          ["রুটসহ সব পাথ", "app.get(\"/*\", ...)", "app.get(\"/{*splat}\", ...) — ব্রেসে মুড়ে"],
          ["ঐচ্ছিক অংশ", "app.get(\"/:file.:ext?\", ...)", "app.get(\"/:file{.:ext}\", ...) — ব্রেস সিনট্যাক্স"],
          ["রেগেক্স ক্যারেক্টার", "app.get(\"/[a-z]+/x\", ...) চলত", "চলে না — অ্যারে দিয়ে একাধিক পাথ দিন"],
        ],
      },
      {
        type: "code",
        language: "js",
        variant: "esm",
        filename: "Express 5 wildcard উদাহরণ",
        code: `// Express 5-এ wildcard-এ নাম দিতে হয় — "splat" নামটা প্রচলিত
app.get("/*splat", (req, res) => {
  // /foo/bar হলে req.params.splat = ["foo", "bar"] — অ্যারে!
  res.send("আপনি চাইলে: " + req.params.splat.join("/"));
});

// একাধিক নির্দিষ্ট পাথ — রেগেক্সের বদলে অ্যারে
app.get(["/discussion/:slug", "/page/:slug"], (req, res) => {
  res.send("slug: " + req.params.slug);
});`,
      },
      {
        type: "warning",
        content:
          "Express 5-এ req.params-এ wildcard-এর ভ্যালু এখন অ্যারে আকারে আসে (আগে স্ট্রিং ছিল), আর নাল-প্রোটোটাইপ অবজেক্ট। এছাড়া পুরনো ঐচ্ছিক সিনট্যাক্স :name? আর কাজ করে না — দরকার হলে ব্রেস সিনট্যাক্স { } ব্যবহার করুন। বিস্তারিত \"Express 4 থেকে 5\" মাইগ্রেশন গাইডে পাবেন।",
      },
      {
        type: "warning",
        content:
          "রাউটের ক্রম (order) গুরুত্বপূর্ণ! Express উপর থেকে নিচে মিলিয়ে দেখে, প্রথম মিলে যাওয়া রাউটই চলে। তাই /users/new এর মতো নির্দিষ্ট রাউট সবসময় /users/:id এর আগে রাখুন — নাহলে \"new\" শব্দটিই id হয়ে যাবে!",
      },
      {
        type: "tip",
        content:
          "রাউট অনেক হয়ে গেলে সেগুলো আলাদা ফাইলে সাজানোর জন্য Express দেয় express.Router() — সেটা আমরা বিস্তারিত শিখেছি প্রজেক্ট স্ট্রাকচারের পাঠে, আর API রেফারেন্সে Router-এর সব মেথডের তালিকা আছে।",
      },
    ],
  },
  {
    id: "middleware",
    title: "মিডলওয়্যার: Express-এর প্রাণ",
    subtitle: "প্রতিটি রিকোয়েস্টের মাঝপথে নিজের লজিক বসানো",
    duration: "১৫ মিনিট",
    keywords: ["middleware", "app.use", "next function", "cors", "morgan", "helmet"],
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
        variant: "esm",
        filename: "server.js",
        code: `import express from "express";

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
          "next() কল করতে ভুলে গেলে রিকোয়েস্ট সেখানেই আটকে যাবে — ব্রাউজার বারবার লোড হতে থাকবে, কোনো রেসপন্স আসবে না! নতুনদের সবচেয়ে প্রচলিত ভুল এটিই। একমাত্র ব্যতিক্রম: মিডলওয়্যার নিজেই res.send() দিয়ে রেসপন্স পাঠিয়ে দিলে next() লাগে না।",
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
        variant: "esm",
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
        variant: "esm",
        code: `import cors from "cors";
import morgan from "morgan";

app.use(cors());       // CORS সমস্যার সমাধান
app.use(morgan("dev")); // রঙিন লগ: GET / 200 5.234 ms - 12`,
      },
      {
        type: "warning",
        content:
          "মিডলওয়্যারের ক্রম খুব গুরুত্বপূর্ণ — উপর থেকে নিচে ক্রমানুসারে চলে। express.json() রাউটের উপরে না রাখলে req.body খালি থাকবে! নিয়ম হলো: সাধারণ মিডলওয়্যার আগে, রাউট পরে, এরর হ্যান্ডলার সবার শেষে।",
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
    keywords: ["request object", "response object", "req params", "req query", "req body", "res json", "status code"],
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
          ["req.ip", "ক্লায়েন্টের IP", "203.0.113.10"],
        ],
      },
      {
        type: "code",
        language: "js",
        variant: "esm",
        code: `app.post("/users/:id/posts", (req, res) => {
  console.log(req.params.id);   // পাথ থেকে id
  console.log(req.body.title);  // বডি থেকে টাইটেল
  console.log(req.query.lang);  // ?lang=bn
  console.log(req.headers);     // সব হেডার
  res.send("চেক করুন টার্মিনাল");
});`,
      },
      {
        type: "note",
        content:
          "Express 5-এ req.body-র একটা সূক্ষ্ম বদল আছে: কোনো বডি-পার্সিং মিডলওয়্যার না চললে req.body এখন undefined (Express 4-এ খালি অবজেক্ট {} ছিল)। তাই express.json() বসাতে ভুললে \"Cannot read properties of undefined\" দেখে অবাক হবেন না — এটাই ইঙ্গিত যে পার্সার নেই!",
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
          ["res.sendStatus()", "কোড + টেক্সট বার্তা", "res.sendStatus(204)"],
          ["res.redirect()", "অন্য URL-এ পাঠিয়ে দেয়", "res.redirect(\"/login\")"],
          ["res.sendFile()", "ফাইল পাঠায়", "res.sendFile(path)"],
          ["res.set()", "রেসপন্স হেডার সেট করে", "res.set(\"X-Key\", \"abc\")"],
          ["res.cookie()", "কুকি সেট করে", "res.cookie(\"token\", \"abc\")"],
        ],
      },
      {
        type: "code",
        language: "js",
        variant: "esm",
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
          ["204", "No Content — সফল, বডি নেই", "DELETE সফল হলে"],
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
        variant: "esm",
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
        type: "warning",
        content:
          "res.send() বনাম res.json(): অবজেক্ট পাঠালে send() নিজে থেকেই JSON বানিয়ে দেয়, তবু পরিষ্কার উদ্দেশ্য জানাতে API-তে res.json() ব্যবহার করাই ভালো অভ্যাস। আর মনে রাখবেন — একটি হ্যান্ডলারে res.send()/res.json() একবারই কল করা যায়, দুইবার করলে Error: Cannot set headers after they are sent to the client এরর আসবে!",
      },
      {
        type: "tip",
        content:
          "প্রতিটি প্রপার্টি আর মেথডের পূর্ণ তালিকা — কোনটা কী কাজ করে, কোন ভার্সনে কী বদলেছে — API রেফারেন্স সেকশনে আলাদা দুটি পাতায় সাজিয়ে রাখা আছে: Request API আর Response API।",
      },
    ],
  },
  {
    id: "static-files",
    title: "স্ট্যাটিক ফাইল সার্ভ করা",
    subtitle: "CSS, ছবি আর HTML ফাইল সরাসরি ব্রাউজারে দেখানো",
    duration: "৮ মিনিট",
    keywords: ["static files", "express.static", "public folder", "serve images", "dirname"],
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
        variant: "esm",
        filename: "server.js",
        code: `import express from "express";
import path from "node:path";

const app = express();

// public ফোল্ডারকে স্ট্যাটিক ফোল্ডার ঘোষণা করলাম
// import.meta.dirname = বর্তমান ফাইলের ফোল্ডার (Node 20.11+)
app.use(express.static(path.join(import.meta.dirname, "public")));

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
        type: "note",
        content:
          "CommonJS প্রজেক্টে __dirname বিল্ট-ইন ভেরিয়েবল হিসেবে পাওয়া যেত: path.join(__dirname, \"public\")। ES Modules-এ সেটির বদলে import.meta.dirname (Node 20.11+) — কাজ একই: বর্তমান ফাইল যে ফোল্ডারে আছে তার সম্পূর্ণ পাথ। এভাবে লিখলে আপনার প্রজেক্ট কম্পিউটারের যেকোনো জায়গায় সরালেও কোড ভাঙে না।",
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
        variant: "esm",
        code: `// এখন ফাইলগুলো /assets/ প্রিফিক্সে পাওয়া যাবে
app.use("/assets", express.static("public"));

// localhost:3000/assets/images/cat.png
// অথচ আসল ফাইলটা public/images/cat.png এ!`,
      },
      {
        type: "heading",
        content: "Express 5-এ ডটফাইল (hidden files) নিয়ে সতর্কতা",
      },
      {
        type: "text",
        content:
          "Express 5-এ express.static()-এর dotfiles অপশনের ডিফল্ট \"ignore\" — মানে ডট দিয়ে শুরু হওয়া ফাইল বা ফোল্ডার (যেমন .well-known) এখন ডিফল্টভাবে 404 দেবে (Express 4-এ চলত)। SSL সার্টিফিকেটের ACME চ্যালেঞ্জের মতো কাজে .well-known ফোল্ডার দরকার হলে স্পষ্টভাবে অনুমতি দিতে হবে:",
      },
      {
        type: "code",
        language: "js",
        variant: "esm",
        code: `// .well-known-এর মতো ডট-ফোল্ডার দরকার হলে:
app.use(
  "/.well-known",
  express.static("public/.well-known", { dotfiles: "allow" })
);

// বাকি সব আগের মতোই
app.use(express.static("public"));`,
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
    keywords: ["body parsing", "express.json", "urlencoded", "form data", "req.body", "multipart"],
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
        variant: "esm",
        filename: "server.js",
        code: `import express from "express";

const app = express();

// বডি পার্সিং মিডলওয়্যার (রাউটের আগে রাখতে হবে!)
app.use(express.json());                     // JSON বডির জন্য
app.use(express.urlencoded({ extended: true })); // HTML ফর্মের জন্য

app.listen(3000);`,
      },
      {
        type: "note",
        content:
          "Express 5-এ express.urlencoded()-এর extended অপশনের ডিফল্ট false হয়ে গেছে (Express 4-এ ছিল true)। সাধারণ ফর্মের জন্য extended: false-ই যথেষ্ট এবং নিরাপদ; পুরনো কোডে qs লাইব্রেরির নেস্টেড অবজেক্ট সিনট্যাক্স (user[name]=x) দরকার হলে স্পষ্টভাবে true দিন। উপরে আমরা true দিয়েছি যাতে Express 4-এর পুরনো উদাহরণগুলোর সাথে আচরণ মিলে যায়।",
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
        variant: "esm",
        code: `app.post("/register", (req, res) => {
  const { name, email } = req.body ?? {};

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
        type: "text",
        content:
          "req.body ?? {} কেন লিখলাম? Express 5-এ পার্সার না চললে req.body undefined হয় — তাই ডিস্ট্রাকচার করার আগে খালি অবজেক্টে fallback করা একটা নিরাপদ অভ্যাস, যাতে পার্সার ভুলে গেলেও পুরো হ্যান্ডলার ক্র্যাশ না করে 400 রেসপন্স দিতে পারে।",
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
        variant: "esm",
        filename: "server.js",
        code: `app.post("/contact", (req, res) => {
  const { name, message } = req.body ?? {};
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
        type: "note",
        content:
          "ফাইল আপলোড (multipart/form-data) এই দুই পার্সারে ধরা পড়ে না — সেজন্য multer-এর মতো আলাদা মিডলওয়্যার লাগে, যা শিখবেন \"ফাইল আপলোড\" পাঠে। Express নিজে ফাইল আপলোড সামলায় না — এটা জেনে রাখা জরুরি।",
      },
      {
        type: "tip",
        content:
          "এই কোর্সের প্লেগ্রাউন্ড সেকশনে গিয়ে এখনই GET/POST/PUT/DELETE রিকোয়েস্ট নিজে পাঠিয়ে দেখুন — লাইভ সার্ভারের সাথে খেলে সব ঝকঝক করে বুঝে যাবেন!",
      },
    ],
  },
  {
    id: "error-handling",
    title: "এরর হ্যান্ডলিং",
    subtitle: "ভাঙা জায়গা ধরা ও ইউজারকে সুন্দর রেসপন্স দেওয়া",
    duration: "১২ মিনিট",
    keywords: ["error handling", "error middleware", "next error", "404 handler", "async error"],
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
        variant: "esm",
        filename: "server.js (সব রাউটের একদম শেষে)",
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
        variant: "esm",
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
        content: "Express 5-এ async এরর এখন স্বয়ংক্রিয়",
      },
      {
        type: "text",
        content:
          "এটা Express 5-এর সবচেয়ে আরামদায়ক উন্নতি: async হ্যান্ডলার বা মিডলওয়্যারের ভেতরে কোনো Promise reject হলে বা throw হলে, Express নিজেই সেই এররটা এরর-হ্যান্ডলিং মিডলওয়্যারে পাঠিয়ে দেয় — next(err) লেখার দরকারই নেই!",
      },
      {
        type: "code",
        language: "js",
        variant: "esm",
        filename: "Express 5 — সরাসরি async লিখুন",
        code: `// Express 5-এ এটাই সঠিক প্যাটার্ন — try/catch ছাড়াই!
app.get("/users/:id", async (req, res) => {
  // ভেতরে এরর হলে (যেমন ডেটাবেস কানেকশন ছিঁড়ে গেলে)
  // Express নিজেই এরর হ্যান্ডলারে পাঠিয়ে দেবে
  const user = await getUserById(req.params.id);
  if (!user) {
    return res.status(404).json({ error: "ইউজার পাওয়া যায়নি" });
  }
  res.json(user);
});

// যদি getUserById throw করে বা rejected promise ফেরায় —
// নিচের হ্যান্ডলারে স্বয়ংক্রিয়ভাবে চলে আসবে:
app.use((err, req, res, next) => {
  console.error("এরর ধরা পড়েছে:", err.message);
  res.status(err.status ?? 500).json({
    error: "সার্ভারে কিছু একটা ভুল হয়েছে!",
  });
});`,
      },
      {
        type: "text",
        content:
          "তুলনা করে দেখুন — Express 4-তে একই কোড লিখতে হতো try/catch মুড়ে প্রতিটি এরর next(err) দিয়ে ঠেলে দিয়ে। Express 5-এ সেই বোঝা চলে গেছে, তবে পুরনো কোড পড়তে গেলে ওই প্যাটার্নটা চিনতে হবেই:",
      },
      {
        type: "code",
        language: "js",
        variant: "esm",
        filename: "Express 4-এর পুরনো প্যাটার্ন (শুধু চেনার জন্য)",
        code: `// Express 4-এ async রাউটের নিরাপদ প্যাটার্ন —
// এখন আর লাগে না, কিন্তু পুরনো কোডে সর্বত্র দেখবেন
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
        type: "heading",
        content: "নিজে এরর পাঠানো: next(err)",
      },
      {
        type: "text",
        content:
          "যেকোনো মিডলওয়্যার বা রাউট থেকে next(err) কল করলে সাথে সাথে এরর হ্যান্ডলারে চলে যায় — মাঝের কোনো রাউট আর চলে না। sync কোডে বা নিজের লজিকে ইচ্ছে করে এরর তুলতে এটা এখনও কাজে লাগে:",
      },
      {
        type: "code",
        language: "js",
        variant: "esm",
        code: `// নিজস্ব এরর ক্লাস — বড় প্রজেক্টের দামি অভ্যাস
class AppError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

app.get("/admin", (req, res, next) => {
  if (!req.headers.authorization) {
    // স্ট্যাটাস সহ সাজানো এরর — হ্যান্ডলারে status পাওয়া যাবে
    return next(new AppError("লগইন করা হয়নি!", 401));
  }
  res.send("অ্যাডমিন প্যানেল");
});

// হ্যান্ডলারে err.status ব্যবহার করুন:
app.use((err, req, res, next) => {
  console.error("এরর:", err.message);
  res.status(err.status ?? 500).json({
    error: err.expose ? err.message : "সার্ভারে কিছু একটা ভুল হয়েছে!",
  });
});`,
      },
      {
        type: "tip",
        content:
          "স্ট্যাটাস কোড বুদ্ধিমানের মতো পাঠান: err.status থাকলে সেটি, নাহলে 500। এতে ক্লায়েন্ট বুঝতে পারে সমস্যা তার নাকি সার্ভারের। আর err.expose প্রপার্টি (true হলে ক্লায়েন্টকে দেখানো নিরাপদ) ব্যবহার করে মেসেজ দেখানোর সিদ্ধান্ত নেওয়া একটা পরিচ্ছন্ন প্যাটার্ন।",
      },
      {
        type: "note",
        content:
          "প্রোডাকশনে এররের বিস্তারিত তথ্য (স্ট্যাক ট্রেস ইত্যাদি) ক্লায়েন্টকে ফাঁস করা বিপজ্জনক — ডেভেলপার দেখবে লগে (console.error), ক্লায়েন্ট পাবে শুধু সাধারণ বার্তা। নিরাপত্তা ও পেশাদারিত্বের দুটোই কথা! আরেকটা জরুরি কথা: express-async-errors-এর মতো প্যাচ প্যাকেজ Express 4-এর জন্য ছিল — Express 5-এ এগুলোর সর্বোচ্চ দরকার শেষ।",
      },
    ],
  },
  {
    id: "template-engine",
    title: "টেমপ্লেট ইঞ্জিন (EJS)",
    subtitle: "সার্ভারে HTML পেজ বানিয়ে ডায়নামিক ডেটা দেখানো",
    duration: "১০ মিনিট",
    keywords: ["template engine", "ejs", "res.render", "views", "ssr", "server side rendering"],
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
        variant: "esm",
        filename: "server.js",
        code: `import express from "express";
import path from "node:path";

const app = express();

// ভিউ ফাইলগুলো কোথায় আর কোন ইঞ্জিন ব্যবহার হবে
app.set("view engine", "ejs");
app.set("views", path.join(import.meta.dirname, "views"));

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
        variant: "esm",
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
];
