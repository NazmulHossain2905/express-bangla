import type { Lesson } from "./types";

export const apiReference: Lesson[] = [
  {
    id: "api-app",
    title: "Application API রেফারেন্স",
    subtitle: "express() দিয়ে তৈরি app অবজেক্টের সব গুরুত্বপূর্ণ মেথড",
    duration: "১০ মিনিট",
    keywords: ["app api", "app.use", "app.set", "app.get", "app.listen", "app.param", "app.route", "express reference"],
    blocks: [
      {
        type: "text",
        content:
          "express() কল করার পর যে app অবজেক্ট পাওয়া যায়, তার উপরই Express-এর পুরো অ্যাপ্লিকেশন দাঁড়িয়ে থাকে। এই রেফারেন্সটা Express 5-এর অফিসিয়াল API ডক (expressjs.com/en/5x/api.html#app) ঘেঁটে সাজানো — ঘন ঘন ব্যবহৃত মেথডগুলো এক জায়গায়। প্রতিটি সারির কোড কমেন্টে ব্যবহার দেখানো।",
      },
      {
        type: "heading",
        content: "তৈরি ও চালু",
      },
      {
        type: "table",
        headers: ["মেথড/প্রপার্টি", "কাজ"],
        rows: [
          ["express()", "অ্যাপ্লিকেশন তৈরি — const app = express()"],
          ["app.listen(port, cb)", "HTTP সার্ভার চালু; cb-তে (Express 5 থেকে) error আর্গুমেন্টও আসতে পারে"],
          ["app.set(name, value)", "কনফিগ সেট — app.set(\"json spaces\", 2)"],
          ["app.get(name)", "কনফিগ পড়া — app.get(\"env\")। নাম রাউট না হলে কনফিগ ভাবে!"],
          ["app.disable/enable(name)", "false/true কনফিগের শর্টকাট"],
          ["app.enabled/disabled(name)", "কনফিগের বুলিয়ান জিজ্ঞেস"],
          ["app.locals", "অ্যাপ-জীবনের ভ্যারিয়েবল, টেমপ্লেটে দেখা যায়"],
        ],
      },
      {
        type: "heading",
        content: "রাউটিং",
      },
      {
        type: "table",
        headers: ["মেথড", "কাজ"],
        rows: [
          ["app.METHOD(path, ...handlers)", "GET/POST/PUT/DELETE/PATCH/HEAD/OPTIONS — প্রতিটি HTTP মেথডের নিজের ফাংশন"],
          ["app.all(path, ...handlers)", "সব মেথডের জন্য এক হ্যান্ডলার"],
          ["app.use([path], ...mw)", "মিডলওয়্যার মাউন্ট; পাথ বাদ দিলে সব রিকোয়েস্টে চলে"],
          ["app.param(name, fn)", "নির্দিষ্ট প্যারামিটার পাওয়ামাত্র চলে — app.param(\"id\", validateId)"],
          ["app.route(path)", "এক পাথের চেইন — app.route(\"/b\").get(h1).post(h2)"],
          ["app.path()", "অ্যাপের মাউন্ট-পাথ (sub-app হলে কাজে লাগে)"],
        ],
      },
      {
        type: "heading",
        content: "রেন্ডারিং ও ভিউ",
      },
      {
        type: "table",
        headers: ["মেথড", "কাজ"],
        rows: [
          ["app.engine(ext, fn)", "টেমপ্লেট ইঞ্জিন নিবন্ধন"],
          ["app.render(view, data, cb)", "টেম্পলেট রেন্ডার করে স্ট্রিং ফেরায় (ইমেইল HTML বানাতে দারুণ)"],
        ],
      },
      {
        type: "heading",
        content: "বিল্ট-ইন মিডলওয়্যার (app.use দিয়ে)",
      },
      {
        type: "table",
        headers: ["মিডলওয়্যার", "কাজ"],
        rows: [
          ["express.json(opts?)", "JSON বডি → req.body; limit অপশন দিন"],
          ["express.urlencoded(opts?)", "ফর্ম ডেটা → req.body; Express 5-এ extended ডিফল্ট false"],
          ["express.static(root, opts?)", "স্ট্যাটিক ফাইল; Express 5-এ dotfiles ডিফল্ট \"ignore\""],
          ["express.text() / express.raw()", "টেক্সট/বাইনারি বডি → req.body"],
        ],
      },
      {
        type: "code",
        language: "js",
        variant: "esm",
        filename: "এক নজরে সব একসাথে",
        code: `import express from "express";
const app = express();

// কনফিগ
app.set("json spaces", 2);        // pretty JSON
app.set("query parser", "simple"); // Express 5-এর ডিফল্ট

// মিডলওয়্যার
app.use(express.json({ limit: "100kb" }));
app.use(express.static("public"));

// রাউটিং
app.use("/api", apiRouter);        // Router মাউন্ট
app.all("/ping", (req, res) => res.sendStatus(200));

app.listen(3000);`,
      },
      {
        type: "note",
        content:
          "Express 5-এ মুছে ফেলা হয়েছে: app.del() (এখন app.delete), app.param(fn) সিগনেচার। req.param(name)-ও যায়গায় যায়গায় — বিস্তারিত Express 5 মাইগ্রেশন গাইডে। নতুন কিছু: app.router অবজেক্ট ফিরে এসেছে (বেস রাউটারের সরাসরি রেফারেন্স)।",
      },
    ],
  },
  {
    id: "api-request",
    title: "Request API রেফারেন্স",
    subtitle: "req অবজেক্টের প্রপার্টি ও মেথড — ক্লায়েন্টের খাম",
    duration: "১০ মিনিট",
    keywords: ["req api", "req.params", "req.query", "req.body", "req.get", "req.ip", "request reference"],
    blocks: [
      {
        type: "text",
        content:
          "প্রতিটি হ্যান্ডলারের প্রথম আর্গুমেন্ট req — ক্লায়েন্টের পাঠানো সবকিছুর খাম। Express 5-এর অফিসিয়াল ডক অনুযায়ী ঘন ব্যবহারের প্রপার্টি-মেথডগুলোর সারণি:",
      },
      {
        type: "heading",
        content: "ডেটা প্রপার্টি",
      },
      {
        type: "table",
        headers: ["প্রপার্টি", "কী দেয়", "নোট"],
        rows: [
          ["req.params", "রুট প্যারামিটার (/users/:id → id)", "Express 5: null-prototype; wildcard ভ্যালু অ্যারে"],
          ["req.query", "কোয়েরি স্ট্রিং (?page=2)", "Express 5: read-only getter, simple parser ডিফল্ট"],
          ["req.body", "পার্স-হওয়া বডি (JSON/ফর্ম)", "পার্সার না চললে Express 5-এ undefined"],
          ["req.headers", "সব রিকোয়েস্ট হেডারের অবজেক্ট", "ছোট-হাতের কী (content-type)"],
          ["req.cookies", "কুকি (cookie-parser লাগবে)", "সাইনডের জন্য req.signedCookies"],
        ],
      },
      {
        type: "heading",
        content: "তথ্য-প্রপার্টি",
      },
      {
        type: "table",
        headers: ["প্রপার্টি", "কী দেয়"],
        rows: [
          ["req.method", "HTTP মেথড (GET, POST...)"],
          ["req.url / req.originalUrl", "পাথ; originalUrl-এ কোয়েরিসহ পুরো URL"],
          ["req.path", "শুধু পাথ অংশ"],
          ["req.hostname", "হোস্টনেম (পোর্ট ছাড়া)"],
          ["req.host", "Express 5-এ hostname-ই, তবে পোর্ট রেখে দেয় যেখানে সেটা স্পষ্ট"],
          ["req.ip", "ক্লায়েন্টের IP (trust proxy সেটিং-নির্ভর)"],
          ["req.protocol", "http বা https"],
          ["req.secure", "TLS কি না — Boolean"],
          ["req.xhr", "X-Requested-With: XMLHttpRequest কি না"],
          ["req.route", "ম্যাচ-হওয়া রাউটের তথ্য"],
        ],
      },
      {
        type: "heading",
        content: "মেথড",
      },
      {
        type: "table",
        headers: ["মেথড", "কাজ"],
        rows: [
          ["req.get(name)", "একটি হেডার পড়া — req.get(\"content-type\")"],
          ["req.accepts(type)", "ক্লায়েন্ট কী নিতে রাজি — req.accepts(\"json\")"],
          ["req.acceptsCharsets() / Encodings() / Languages()", "Accept হেডার পার্স — Express 5-এ বহুবচন রূপই আছে"],
          ["req.is(type)", "বডির Content-Type কী — req.is(\"json\")"],
          ["req.range(size)", "Range হেডার পার্স (ভিডিও স্ট্রিমিংয়ে)"],
        ],
      },
      {
        type: "code",
        language: "js",
        variant: "esm",
        filename: "হাতে-কলমে",
        code: `app.post("/orders", (req, res) => {
  console.log(req.get("user-agent"));  // কোন ব্রাউজার?
  console.log(req.ip);                 // কোথা থেকে?
  console.log(req.secure ? "https" : "http"); // নিরাপদ সংযোগ?

  if (req.is("json")) {
    // JSON বডির নির্দিষ্ট প্রসেসিং
  }
  res.json({ ok: true });
});`,
      },
      {
        type: "warning",
        content:
          "Express 5-এর দুটো আচরণ-বদল বারবার মানুষ ধরতে পারে না: (১) req.query আর সেট করা যায় না — বদলে নতুন অবজেক্ট বানিয়ে ব্যবহার করুন। (২) req.body-র জন্য পার্সার না থাকলে {} নয়, undefined পাবেন — typeof চেক করে এগোন।",
      },
    ],
  },
  {
    id: "api-response",
    title: "Response API রেফারেন্স",
    subtitle: "res অবজেক্টের মেথড — উত্তর পাঠানোর সব রাস্তা",
    duration: "১০ মিনিট",
    keywords: ["res api", "res.json", "res.send", "res.status", "res.sendFile", "res.cookie", "response reference"],
    blocks: [
      {
        type: "text",
        content:
          "উত্তর পাঠানোর প্রতিটি রাস্তা res-এর মেথডগুলোর পেছনে। মনে রাখার সূত্র একটাই: এক হ্যান্ডলারে একবারই রেসপন্স শেষ করা যায় — send না json না sendFile, যেটাই প্রথম ডাকা হোক।",
      },
      {
        type: "heading",
        content: "বডি পাঠানো",
      },
      {
        type: "table",
        headers: ["মেথড", "কাজ", "নোট"],
        rows: [
          ["res.send(body)", "স্ট্রিং/বাফার/অবজেক্ট পাঠায়", "অবজেক্ট দিলে JSON হয়ে যায়"],
          ["res.json(obj)", "JSON পাঠায়", "null/undefined-ও বৈধ JSON বডি"],
          ["res.jsonp(obj)", "JSONP (callback=?)", "নির্দিষ্ট legacy ক্লায়েন্টের জন্য"],
          ["res.sendFile(path, opts?, cb?)", "ফাইল স্ট্রিম করে পাঠায়", "absolute path বা root অপশন লাগে"],
          ["res.download(path, name?)", "ব্রাউজারে \"সেভ করুন\" ডায়ালগ", "নাম বদলে দেওয়া যায়"],
          ["res.sendStatus(code)", "কোড + সেটির টেক্সট", "res.sendStatus(204)"],
          ["res.end()", "হেডার ছাড়া খালি শেষ", "res.status(204).end()"],
          ["res.render(view, data?, cb?)", "টেমপ্লেট রেন্ডার করে পাঠায়", "cb দিলে ইমেইল-HTML বানাতেও"],
        ],
      },
      {
        type: "heading",
        content: "স্ট্যাটাস, হেডার, কুকি",
      },
      {
        type: "table",
        headers: ["মেথড", "কাজ"],
        rows: [
          ["res.status(code)", "স্ট্যাটাস সেট — চেইনযোগ্য: res.status(201).json(obj)"],
          ["res.set(field, value)", "হেডার সেট — res.set(\"X-Custom\", \"hi\")"],
          ["res.get(field)", "রেসপন্স-হেডার পড়া"],
          ["res.append(field, value)", "হেডারে যোগ (পুরনোটা না মুছে)"],
          ["res.type(type)", "Content-Type সেট — res.type(\"json\")"],
          ["res.cookie(name, value, opts)", "কুকি সেট — httpOnly, secure, maxAge অপশন"],
          ["res.clearCookie(name, opts?)", "কুকি মুছে দেয়"],
          ["res.location(path)", "Location হেডার সেট (redirect ছাড়া)"],
          ["res.redirect(status?, path)", "রিডাইরেক্ট — Express 5-এ স্বাক্ষর (status, path)"],
          ["res.attachment(filename?)", "Content-Disposition সেট (ডাউনলোডের জন্য)"],
          ["res.vary(field)", "Vary হেডার"],
          ["res.links(links)", "Link হেডার (pagination API-তে)"],
        ],
      },
      {
        type: "code",
        language: "js",
        variant: "esm",
        filename: "চেইনের শক্তি",
        code: `app.get("/report", (req, res) => {
  res
    .status(200)
    .set("Cache-Control", "no-store")
    .cookie("seen", "1", { httpOnly: true, sameSite: "strict" })
    .json({ generatedAt: new Date().toISOString() });
});

app.post("/login", (req, res) => {
  // ... যাচাই শেষ
  res
    .status(302)
    .cookie("token", token, { httpOnly: true, secure: true })
    .redirect("/dashboard");
});`,
      },
      {
        type: "warning",
        content:
          "Express 5-এ মুছে-ফেলা পুরনো স্বাক্ষরগুলো আর কাজ করে না: res.send(status), res.json(obj, status), res.sendfile() — সব বদলে res.status(...).json(...) ধাঁচ আর ক্যামেল-কেস sendFile। পুরনো কোড মাইগ্রেট করলে এগুলোই আগে ধরা পড়বে। আর res.clearCookie-এ Express 5 থেকে maxAge/expires অপশন উপেক্ষিত।",
      },
    ],
  },
  {
    id: "api-router",
    title: "Router API রেফারেন্স",
    subtitle: "express.Router() — মিনি-অ্যাপ, যাকে মাউন্ট করা যায়",
    duration: "৮ মিনিট",
    keywords: ["router api", "express.Router", "router.use", "router.route", "modular routes"],
    blocks: [
      {
        type: "text",
        content:
          "express.Router() হলো একটা ছোট, স্বয়ংসম্পূর্ণ রাউটিং-সিস্টেম — মিনি app ভাবুন, রাউট-সংক্রান্ত যা যা app পারে (use, METHOD, param, route) তার সবই পারে, শুধু listen করতে পারে না। প্রজেক্ট বড় হলেই এর আসল মূল্য বোঝা যায় — প্রতি রিসোর্সে (books, users, orders) একটা করে Router ফাইল।",
      },
      {
        type: "code",
        language: "js",
        variant: "esm",
        filename: "সম্পূর্ণ প্যাটার্ন",
        code: `import express from "express";

const router = express.Router();

// ১. মাউন্ট-লেভেল মিডলওয়্যার — শুধু এই রাউটারের রিকোয়েস্টে
router.use((req, res, next) => {
  console.log("books router-এ ঢুকল:", req.method);
  next();
});

// ২. প্যারাম-হ্যান্ডলার — :id এলেই আগে চলবে
router.param("id", (req, res, next, id) => {
  const n = Number(id);
  if (Number.isNaN(n) || n <= 0) {
    return res.status(400).json({ error: "id সংখ্যা হতে হবে" });
  }
  req.bookId = n; // পরের হ্যান্ডলারে তৈরি-তৈরি ভ্যালু
  next();
});

// ৩. app.route-এর মতোই চেইন — এক পাথের সব মেথড পাশাপাশি
router
  .route("/")
  .get((req, res) => res.json({ all: true }))
  .post((req, res) => res.sendStatus(201));

router
  .route("/:id")
  .get((req, res) => res.json({ id: req.bookId }))
  .put((req, res) => res.sendStatus(200))
  .delete((req, res) => res.sendStatus(204));

export default router;

// app-এ মাউন্ট:
// app.use("/books", router);`,
      },
      {
        type: "table",
        headers: ["মেথড", "কাজ"],
        rows: [
          ["router.use([path], ...mw)", "রাউটার-স্তরের মিডলওয়্যার"],
          ["router.METHOD(path, ...h)", "HTTP মেথডভিত্তিক রাউট"],
          ["router.all(path, ...h)", "সব মেথড এক হ্যান্ডলারে"],
          ["router.param(name, fn)", "প্যারামিটার-ম্যাচ হলে প্রি-লোড লজিক (name একটাই স্ট্রিং — Express 5-এ অ্যারে নয়)"],
          ["router.route(path)", "চেইনেবল এক-পাথ বান্ডল"],
        ],
      },
      {
        type: "note",
        content:
          "Router-এর পাথ সবসময় \"শেষ-অংশ\" — মাউন্ট-পাথ app.use-এ বলে দেওয়া হয়। মাউন্ট-পাথে নিজেই প্যারামিটার দেওয়া যায়: app.use(\"/users/:userId\", userRouter) — তখন ভেতরের হ্যান্ডলারগুলো req.params.userId পায়। নেস্টিং করেও বড় রাউটার ভাঙা যায়: Router-এর ভেতরে আরেক Router।",
      },
      {
        type: "tip",
        content:
          "একটা মেলা-প্র্যাকটিস: /api/v1 ধাঁচের ভার্সন-প্রিফিক্স Router দিয়েই হয় — app.use(\"/api/v1\", v1Router); আর সুইচের দিন নতুন v2Router পাশে বসান। পুরনো ক্লায়েন্ট ভাঙে না, নতুন সুবিধা যোগ হয় — প্রোডাকশন API-র সবচেয়ে দামি সৌজন্য।",
      },
    ],
  },
];
