import type { Lesson } from "./types";

export const guides: Lesson[] = [
  {
    id: "express5-migration",
    title: "Express 4 থেকে 5-এ মাইগ্রেশন",
    subtitle: "অফিসিয়াল মাইগ্রেশন গাইডের বাংলা রূপ — কী বদলাল, কীভাবে সামলাবেন",
    duration: "১৬ মিনিট",
    keywords: ["express 5 migration", "express 4 to 5", "upgrade express", "breaking changes"],
    blocks: [
      {
        type: "text",
        content:
          "Express 5 (2024-এ প্রকাশিত, 2025-এর সেপ্টেম্বর থেকে npm-এর ডিফল্ট latest) মূলত একই Express — কিন্তু কিছু বছরের পুরনো, ঝুঁকিপূর্ণ বা বিভ্রান্তিকর API সরিয়ে পরিষ্কার করা হয়েছে। এই পাঠটা expressjs.com-এর অফিসিয়াল \"Moving to Express 5\" গাইড অনুসরণ করে লেখা — যা যা ভাঙতে পারে, ধরে-ধরে সাজানো।",
      },
      {
        type: "heading",
        content: "আপগ্রেডের রাস্তা",
      },
      {
        type: "code",
        language: "bash",
        code: `# Node.js 18+ নিশ্চিত করুন (LTS 24 হলে সবচেয়ে ভালো)
node -v

# তারপর Express 5 বসান
npm install express@5

# টেস্ট চালান — যা ভাঙবে নিচের তালিকায় মিলবে
npm test

# বড় কোডবেস? অফিসিয়াল codemod ট্রাই করুন
npx codemod@latest @expressjs/v5-migration-recipe`,
      },
      {
        type: "heading",
        content: "সরিয়ে ফেলা API — ব্যবহার করলেই ক্র্যাশ",
      },
      {
        type: "table",
        headers: ["পুরনো (Express 4)", "নতুন (Express 5)"],
        rows: [
          ["app.del(\"/x\", h)", "app.delete(\"/x\", h) — delete এখন আইনত ব্যবহারযোগ্য কীওয়ার্ড-প্রপার্টি"],
          ["req.param(\"name\")", "req.params.name / req.body.name / req.query.name — উৎস স্পষ্ট করে"],
          ["res.send(200)", "res.sendStatus(200) — সংখ্যা পাঠাতে হলে স্ট্রিং করে: res.send(\"200\")"],
          ["res.send(body, status)", "res.status(status).send(body)"],
          ["res.json(obj, status)", "res.status(status).json(obj)"],
          ["res.jsonp(obj, status)", "res.status(status).jsonp(obj)"],
          ["res.redirect(url, status)", "res.redirect(status, url) — ক্রম উল্টে গেছে!"],
          ["res.sendfile(path)", "res.sendFile(path) — ক্যামেল-কেস"],
          ["req.acceptsCharset() / Encoding() / Language()", "বহুবচন: acceptsCharsets() / acceptsEncodings() / acceptsLanguages()"],
          ["express.static.mime.lookup()", "mime-types প্যাকেজ ব্যবহার করুন"],
          ["app.param(fn) / router.param(fn)", "সাপোর্ট বন্ধ — প্রতি-নাম সিগনেচার ব্যবহার করুন"],
          ["res.redirect(\"back\") / res.location(\"back\")", "req.get(\"Referrer\") || \"/\" — নিজে হিসাব করুন"],
        ],
      },
      {
        type: "heading",
        content: "আচরণে বদল — চুপচাপে ফলাফল বদলায়",
      },
      {
        type: "text",
        content:
          "নিচেরগুলো এরর দেয় না, কিন্তু আউটপুট আগের মতো নয় — টেস্টেই ধরা পড়ে:",
      },
      {
        type: "table",
        headers: ["বিষয়", "Express 4", "Express 5"],
        rows: [
          ["async হ্যান্ডলারে এরর", "নিজে try/catch → next(err)", "স্বয়ংক্রিয় — rejected promise এরর হ্যান্ডলারে যায়"],
          ["req.body (পার্সার নেই)", "{} (খালি অবজেক্ট)", "undefined"],
          ["req.query-তে লেখা", "পারত", "read-only — পারে না"],
          ["কোয়েরি পার্সার", "extended", "simple (নেস্টেড সিনট্যাক্স দরকার হলে app.set(\"query parser\", \"extended\"))"],
          ["urlencoded-এর extended", "true ডিফল্ট", "false ডিফল্ট"],
          ["static/sendFile-এর dotfiles", "চলত", "ডিফল্ট \"ignore\" — .well-known লাগলে dotfiles: \"allow\""],
          ["sendFile-এর hidden/from অপশন", "চলত", "dotfiles/root দিয়ে বদলুন"],
          ["req.host", "পোর্ট ছিঁড়ে ফেলত", "পোর্ট রাখে — বিশুদ্ধ হোস্ট"],
          ["wildcard-এর ভ্যালু", "স্ট্রিং", "অ্যারে (/*splat → [\"foo\", \"bar\"])"],
          ["app.listen-এর cb", "এররে throw", "cb-তে error আর্গুমেন্ট পাঠায় — নিজে হ্যান্ডল করুন"],
        ],
      },
      {
        type: "heading",
        content: "পাথ-ম্যাচিংয়ের নতুন ব্যাকরণ",
      },
      {
        type: "text",
        content:
          "এটাই সবচেয়ে বেশি ভাঙে এমন জায়গা — পুরনো রেগেক্স-ঘেঁষা পাথগুলো আর চলে না:",
      },
      {
        type: "code",
        language: "js",
        variant: "esm",
        filename: "পুরনো → নতুন পাথ",
        code: `// ১. নাম-হীন wildcard নিষিদ্ধ
app.get("/*", h);          // ❌
app.get("/*splat", h);     // ✅ নাম দিতে হবে; রুট "/" নয়
app.get("/{*splat}", h);   // ✅ রুটসহ সব

// ২. ? দিয়ে ঐচ্ছিক অংশ নিষিদ্ধ
app.get("/:file.:ext?", h);    // ❌
app.get("/:file{.:ext}", h);   // ✅ ব্রেস সিনট্যাক্স

// ৩. রেগেক্স ক্যারেক্টার নিষিদ্ধ
app.get("/[discussion|page]/:slug", h);          // ❌
app.get(["/discussion/:slug", "/page/:slug"], h); // ✅ অ্যারেতে একাধিক পাথ

// ৪. রিজার্ভড ক্যারেক্টার লাগলে এস্কেপ
// ()[]?+! — দরকার হলে \\ দিয়ে`,
      },
      {
        type: "heading",
        content: "এর-পরের কাজ: প্র্যাকটিক্যাল চেকলিস্ট",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Node ভার্সন 18+ কিনা দেখুন — CI, ডিপ্লয়-প্ল্যাটফর্ম, Dockerfile সব জায়গায়",
          "package.json-এ express@^5.3.0 বসান, লক-ফাইল আপডেট করুন",
          "grep করে খুঁজুন: app.del(, res.sendfile, req.param(, , 200) জাতীয় পুরনো প্যাটার্ন",
          "সব /* wildcard পাথ /*splat বা /{*splat}-এ বদলান, ব্যবহার-জায়গায় অ্যারে-আচরণ মিলিয়ে নিন",
          "req.body-র উপর যত ভরসা — পার্সার আগে বসানো আছে কি না পুনঃযাচাই করুন (undefined ভূমিকা)",
          ".well-known বা ডট-ফোল্ডার স্ট্যাটিক সার্ভিং করে কিনা দেখুন — দিলে dotfiles: \"allow\"",
          "পুরো টেস্ট-স্যুট চালান; না থাকলে আগে মূল রাউটগুলোর স্মোক-টেস্ট লিখে নিন",
          "ডিপ্লয়ের আগে staging-এ এক রাত রাখুন — চুপচাপ-বদলগুলো প্রোডাকশনেই বেশি স্পষ্ট হয়",
        ],
      },
      {
        type: "note",
        content:
          "সতর্কতার কথা: এই সাইটের সব উদাহরণ একটি সত্যিকারের Express 5.3.0 + Node 24 পরিবেশে চালিয়ে যাচাই করা (যেমন — req.body-র undefined আচরণ, /*splat-এর অ্যারে ভ্যালু, async এররের স্বয়ংক্রিয় ফরওয়ার্ডিং, urlencoded-এর simple পার্সার)। অফিসিয়াল গাইড: expressjs.com/en/guide/migrating-5.html।",
      },
    ],
  },
  {
    id: "common-errors",
    title: "কমন এরর ও সমাধান",
    subtitle: "যে এররগুলো সবার-ই হয় — বারবার জিজ্ঞেস-করা প্রশ্নোত্তর",
    duration: "১২ মিনিট",
    keywords: ["common errors", "cannot set headers", "cors error", "req.body undefined", "eaddrinuse", "fix"],
    blocks: [
      {
        type: "text",
        content:
          "প্রতিটি Express-শিক্ষার্থী একই এররে একই রাত্রে জাগে। ভালো খবর — এগুলোর প্রায় সবগুলোরই সমাধান এক-দুই লাইনের। নিচে বাংলা Express-কমিউনিটিতে সর্বাধিক জিজ্ঞেস-করা এররগুলো কারণসহ সাজানো, বর্ণানুক্রমে নয় — যতটা ঘন ঘন হয় সেই ক্রমে।",
      },
      {
        type: "heading",
        content: "Cannot set headers after they are sent to the client",
      },
      {
        type: "text",
        content:
          "এক হ্যান্ডলারে রেসপন্স দুইবার পাঠানোর চেষ্টা। প্রায় সবসময় একটা ভুল: if-এর ভেতরে res.json() করে return লিখতে ভুলে যাওয়া, তারপর নিচে আরেকটা res.json() চলে আসা।",
      },
      {
        type: "code",
        language: "js",
        variant: "esm",
        code: `// ❌ ভাঙা: 404 পাঠিয়েও ফাংশন থামেনি
app.get("/books/:id", (req, res) => {
  const book = find(req.params.id);
  if (!book) res.status(404).json({ error: "নেই" }); // পাঠালাম...
  res.json(book); // আবারও পাঠাচ্ছি! 💥
});

// ✅ ঠিক: return দিয়ে প্রবাহ থামান
app.get("/books/:id", (req, res) => {
  const book = find(req.params.id);
  if (!book) {
    return res.status(404).json({ error: "নেই" });
  }
  res.json(book);
});`,
      },
      {
        type: "heading",
        content: "req.body undefined / খালি",
      },
      {
        type: "list",
        items: [
          "express.json() মিডলওয়্যারই বসাননি — app.use(express.json()) রাউটের আগে",
          "মিডলওয়্যার রাউটের নিচে বসানো — উপরে তুলুন",
          "ক্লায়েন্টের Content-Type হেডার ভুল (JSON পাঠিয়ে text/plain লিখেছে)",
          "Express 5-এ পার্সার না চললে {} নয় undefined — তাই খালি বলে ধরে নেবেন না, চেক করুন",
        ],
      },
      {
        type: "heading",
        content: "CORS এরর (blocked by CORS policy)",
      },
      {
        type: "text",
        content:
          "ব্রাউজার অন্য ডোমেইনের রিকোয়েস্ট আটকে দিচ্ছে — সার্ভার থেকেই অনুমতির হেডার পাঠাতে হবে। মনে রাখুন: এররটা ব্রাউজারের কনসোলে দেখালেও সমাধানটা সার্ভারে।",
      },
      {
        type: "code",
        language: "js",
        variant: "esm",
        code: `import cors from "cors";
app.use(cors({ origin: "http://localhost:5173" })); // ফ্রন্টএন্ডের ঠিকানা

// প্রি-ফ্লাইট OPTIONS নিজে সামলাতে হয় না — cors() করে`,
      },
      {
        type: "heading",
        content: "EADDRINUSE — পোর্ট দখলে",
      },
      {
        type: "code",
        language: "bash",
        code: `Error: listen EADDRINUSE: address already in use :::3000

# কে ধরে আছে খুঁজুন:
lsof -ti :3000          # প্রসেস আইডি দেবে

# ছাড়িয়ে দিন:
kill -9 $(lsof -ti :3000)

# অথবা সহজ পথ: অন্য পোর্ট নিন — PORT=4000 node server.js`,
      },
      {
        type: "heading",
        content: "SyntaxError: Cannot use import statement outside a module",
      },
      {
        type: "text",
        content:
          ".js ফাইলে import লেখা কিন্তু Node ফাইলটাকে CommonJS ভাবছে। সমাধান দুটো রাস্তায়: package.json-এ \"type\": \"module\" যোগ, অথবা ফাইলের নাম .mjs। উল্টো সমস্যায় (require লিখেছেন কিন্তু type module) — .cjs করে ফাইলটাকে CommonJS ঘোষণা করে দিন।",
      },
      {
        type: "heading",
        content: "ERR_MODULE_NOT_FOUND",
      },
      {
        type: "text",
        content:
          "ES Modules-এ লোকাল ফাইলের ইমপোর্টে এক্সটেনশন বাধ্যতামূলক: import \"./routes/books.js\" — .js বাদ দিলেই এই এরর। (node_modules-এর প্যাকেজে লাগে না, শুধু নিজের ফাইলে।)",
      },
      {
        type: "heading",
        content: "404 সবসময় — রাউট মিলছে না",
      },
      {
        type: "list",
        items: [
          "মেথড মিলছে না — POST-এর জন্য GET পাঠাচ্ছেন (Postman-এ ভুল)",
          "ক্রম ভুল — /users/:id উপরে, /users/new নিচে (\"new\" id হয়ে যাচ্ছে)",
          "মাউন্ট-প্রিফিক্স হারিয়েছে — app.use(\"/api\")-এর ভেতরের রাউটে /api লাগে",
          "টাইপো — /books/:id লিখেছেন, /boooks/:id ডাকছেন",
          "Express 5 wildcard — /* আর চলে না, /*splat লাগবে",
        ],
      },
      {
        type: "heading",
        content: "Mongoose/Prisma-জাতীয় এররে সাধারণ প্রথম সোপ",
      },
      {
        type: "text",
        content:
          "ডেটাবেস-সংশ্লিষ্ট যেকোনো অজানা এররে প্রথমে তিনটা জিজ্ঞেস: সংযোগ string ঠিক কি (.env লোড হয়েছে?), মডেল/স্কিমার ফিল্ড-নাম বানান ডেটার সাথে মিলছে কি, আর আসল এরর-মেসেজটা লগে পুরোটা পড়া হয়েছে কি — ৮০% ক্ষেত্রে উত্তর এই তিনেরই একটায়।",
      },
      {
        type: "tip",
        content:
          "এরর পড়ার শৃঙ্খলা: উপর থেকে নিচে পুরো স্ট্যাক ট্রেস পড়ুন — প্রথম লাইনে যে ফাইল:লাইন, সেটা আপনার কোড কি না দেখুন। লাইব্রেরির ভেতরের ফ্রেম ঘাঁটার আগে নিজের লাইনটা দেখুন। আর DEBUG=express:* node server.js দিয়ে Express-এর নিজের ডিবাগ-লগ খুলে দেখা যায় রাউট-ম্যাচিং ঠিক কোথায় আটকাচ্ছে (Express 5-এ router-ও আলাদা নেমস্পেস: DEBUG=express:*,router)।",
      },
    ],
  },
  {
    id: "best-practices",
    title: "সেরা অভ্যাস (Best Practices)",
    subtitle: "প্রোডাকশন-গ্রেড Express অ্যাপের অভ্যাস-তালিকা",
    duration: "১২ মিনিট",
    keywords: ["best practices", "production tips", "express tips", "clean code", "checklist"],
    blocks: [
      {
        type: "text",
        content:
          "কোর্স জুড়ে যে অভ্যাসগুলোর কথা ছড়িয়ে ছড়িয়ে বলা হয়েছে, সেগুলোই এখানে এক জায়গায় — কোড রিভিউয়ের চেকলিস্ট হিসেবেও ব্যবহার করার মতো।",
      },
      {
        type: "heading",
        content: "কাঠামো ও কোড",
      },
      {
        type: "list",
        items: [
          "app আর server আলাদা করুন — app.js এক্সপোর্ট করে অ্যাপ, server.js শুধু শোনে; টেস্ট ও স্কেলিং দুটোতেই সুবিধা",
          "এক ফাইল = এক দায়িত্ব — রাউট পাতলা, লজিক সার্ভিসে, মিডলওয়্যার নিজের ফোল্ডারে",
          "express.Router() দিয়ে রিসোর্স-ভিত্তিক ভাগ — /books, /users আলাদা ফাইল",
          "মিডলওয়্যারের ক্রম সচেতনভাবে: helmet/CORS → parsers → রাউট → 404 → এরর হ্যান্ডলার (শেষ দুটো নিচে, সবসময়)",
          "নতুন প্রজেক্টে ES Modules (\"type\": \"module\") + আধুনিক Node LTS — ইকোসিস্টেম যেদিকে যাচ্ছে",
          "async/await সোজা লিখুন (Express 5 এরর সামলায়), আর Express 4 কোডে ছুঁলে express-async-errors-এর কথা মনে রাখুন",
          "প্রতিটি এররের জন্য সচেতন স্ট্যাটাস কোড — 400 ক্লায়েন্টের দোষ, 500 আমার; 401 পরিচয় নেই, 403 অনুমতি নেই",
        ],
      },
      {
        type: "heading",
        content: "নিরাপত্তা",
      },
      {
        type: "list",
        items: [
          "helmet ডিফল্টভাবে, CORS-এ নির্দিষ্ট origin-এর তালিকা, সংবেদনশীল রাউটে rate limit",
          "প্রতিটি ইনপুট যাচাই — বডি, params, query; Zod বা সমতুল্য, আর ব্যাকএন্ডে সর্বদা (ফ্রন্টএন্ড নয়)",
          "সিক্রেট শুধু .env-তে; কমিট হয়ে গেলে সাথে সাথে rotate",
          "প্রোডাকশনে এররের বিস্তারিত বাইরে নয়, লগে হ্যাঁ; লগ নিয়মিত দেখুন",
          "প্যাকেজ ব্যবস্থাপনা: npm audit, নির্ভরতা হালনাগাদ, অব্যবহৃত প্যাকেজ বাদ",
        ],
      },
      {
        type: "heading",
        content: "পারফরম্যান্স ও পরিচালনা",
      },
      {
        type: "list",
        items: [
          "স্ট্যাটিক ফাইলে ক্যাশ হেডার — express.static(\"public\", { maxAge: \"1d\" })",
          "বডির সীমা — express.json({ limit: \"100kb\" })",
          "DB কোয়েরিতে পেজিনেশন বাধ্যতামূলক — চিরকালের সব-ডেটা রেসপন্স নয়",
          "হেলথ-চেক রাউট (/health) + গ্রেসফুল শাটডাউন (SIGTERM হ্যান্ডল) রাখুন",
          "প্রোডাকশনে NODE_ENV=production — অনেক লাইব্রেরির আচরণ এতে দ্রুত হয়",
        ],
      },
      {
        type: "heading",
        content: "প্রক্রিয়া",
      },
      {
        type: "list",
        items: [
          "মূল ফ্লো-র টেস্ট আগে, রিফ্যাক্টর পরে — উল্টো ক্রম আত্মহত্যা",
          "typecheck + test + build — তিন দরজার CI গেট",
          "বড় বদল ছোট পুল-রিকোয়েস্টে; মাইগ্রেশন আলাদা ব্রাঞ্চে, staging-এ প্রমাণ শেষে প্রোডাকশনে",
          "README-তে লোকাল চালানোর সোজা নির্দেশনা রাখুন — ভবিষ্যতের নিজেকে ধন্যবাদ দেবেন",
        ],
      },
      {
        type: "note",
        content:
          "এই তালিকা মুখস্থ করার জন্য নয় — প্রতিটি পয়েন্টের ব্যাখ্যা কোর্সের নিজ নিজ পাঠে আছে (নিরাপত্তা-পাঠে helmet, ডিপ্লয়মেন্ট-পাঠে health/SIGTERM, ইত্যাদি)। ব্যবহার করুন প্রতি প্রজেক্ট শেষে ঝালাই করতে: কোন পয়েন্ট বাদ গেলে সেই পাঠে ফিরে যান।",
      },
    ],
  },
  {
    id: "glossary",
    title: "গ্লসারি (শব্দকোষ)",
    subtitle: "Express দুনিয়ার চেনা-নামা — বাংলা ব্যাখ্যায়",
    duration: "৬ মিনিট",
    keywords: ["glossary", "terms", "definitions", "api meaning", "middleware meaning"],
    blocks: [
      {
        type: "text",
        content:
          "টার্ম মুখস্থ নয়, চেনা জরুরি — ডকুমেন্টেশন, ইন্টারভিউ কিংবা টিম-আলোচনায় যে শব্দগুলো ঘুরেফিরে আসে। বাংলা ব্যাখ্যায়, বর্ণানুক্রমিক নয় — শেখার ক্রমে, যেন একটার পরে একটা মানা সহজ হয়।",
      },
      {
        type: "table",
        headers: ["শব্দ", "বাংলায় যা বোঝায়"],
        rows: [
          ["HTTP Request/Response", "ক্লায়েন্টের চিঠি আর সার্ভারের উত্তর — ওয়েবের মৌলিক কথোপকথন"],
          ["Route / Routing", "কোন ঠিকানায় কোন হ্যান্ডলার — ডাক-বিতরণ তালিকা"],
          ["Handler", "রাউট ম্যাচ হলে চলা ফাংশন — চিঠি খোলার লোক"],
          ["Middleware", "রিকোয়েস্ট-রেসপন্সের মাঝপথের ফাংশন — নিরাপত্তা-চেকপয়েন্টের সারি"],
          ["next()", "মাঝপথের সিঁড়ি — পরের মিডলওয়্যারে হাত বাড়ানো"],
          ["req / res", "Request ও Response অবজেক্টের প্রচলিত সংক্ষেপ"],
          ["API", "প্রোগ্রাম থেকে প্রোগ্রামে কথা বলার নিয়ম-নকশা"],
          ["REST", "API সাজানোর ধারা — রিসোর্স + HTTP মেথড + স্ট্যাটাস কোডের সম্মতি"],
          ["Resource", "API-র বিষয়বস্তু — বই, ইউজার, অর্ডার; প্রতিটির URL থাকে"],
          ["CRUD", "তৈরি-পড়া-আপডেট-মোছা — POST/GET/PUT(PATCH)/DELETE-এর ম্যাপিং"],
          ["JSON", "ডেটার টেক্সট-আকার — { \"key\": \"value\" } — API-র লিঙ্গুয়া ফ্রাঙ্কা"],
          ["Status Code", "রেসপন্সের তিন-অঙ্কের মুড — 200 ঠিক, 404 নেই, 500 আমার দোষ"],
          ["Query String", "URL-এর ?-পরবর্তী ঐচ্ছিক তথ্য — ?q=express&page=2"],
          ["Route Parameter", "পাথের ভেতরের ভেরিয়েবল অংশ — /users/:id"],
          ["Body Parsing", "রিকোয়েস্টের বডি পড়ার উপযোগী করা — express.json()-এর কাজ"],
          ["Static Files", "যেমন-আছে-তেমন পাঠানো ফাইল — ছবি, CSS, HTML"],
          ["Template Engine", "টেমপ্লেট + ডেটা → HTML — EJS-জাতীয় রাঁধুনি"],
          ["SSR", "সার্ভার-সাইড রেন্ডারিং — HTML সার্ভারেই বানানো"],
          ["CORS", "ক্রস-অরিজিন নীতি — অন্য ডোমেইনের অনুমতি-পত্র"],
          ["Authentication / Authorization", "পরিচয় যাচাই / অনুমতি যাচাই — কে আপনি / কী পারবেন"],
          ["JWT", "স্বাক্ষরিত পরিচয়পত্র-টোকেন — লগইনের পরের পাস"],
          ["Hashing (bcrypt)", "একমুখী ঘষা — পাসওয়ার্ডের ফেরানো-যায়-না ছাপ"],
          ["Rate Limiting", "প্রতি-IP রিকোয়েস্টের সীমা — দরজার বাউন্সার"],
          ["Helmet", "নিরাপত্তা-হেডারের এক-লাইনের প্যাক"],
          ["Validation", "ইনপুট যাচাই — ভালো ডেটা ঢোকার গেটকিপার"],
          ["Sanitization", "ইনপুট পরিষ্কারকরণ — ক্ষতিকর অংশ ধুয়ে ফেলা"],
          ["ORM / ODM", "ডেটাবেসের সাথে অবজেক্ট-ভাষায় কথা — Prisma/Mongoose"],
          ["Migration (DB)", "স্কিমার সংস্করণ-পরিবর্তনের ইতিহাস-নথি"],
          ["ESM / CommonJS", "জাভাস্ক্রিপ্টের দুই মডিউল-সংস্কৃতি — import বনাম require"],
          ["TypeScript", "জাভাস্ক্রিপ্ট + কম্পাইল-টাইম টাইপ-লেবেল"],
          ["Type Inference", "টাইপ না-লিখলেও কম্পাইলারের নিজে-বুঝে-নেওয়া"],
          ["Dev Dependency", "শুধু ডেভেলপমেন্টের প্যাকেজ — প্রোডাকশনে যায় না"],
          ["Environment Variables", "পরিবেশ-কনফিগ — .env-র বাসিন্দা, সিক্রেটের ঠিকানা"],
          ["Graceful Shutdown", "ধীরে-বন্ধ — চলমান কাজ শেষ করে তারপর ঘুম (SIGTERM)"],
          ["Health Check", "/health-জাতীয় পালস-রাউট — লাইভ কি না এক নজরে"],
          ["Hot Reload (--watch)", "সেভ করা মাত্র নিজে-থেকে রিস্টার্ট"],
          ["Logging", "ঘটনার হিসাব — morgan, console, প্রোডাকশনে pino/winston"],
        ],
      },
      {
        type: "tip",
        content:
          "শব্দ ভুলে গেলে ফিরে আসুন — এই কোর্সের সার্চে যেকোনো টার্ম লিখলেই সংশ্লিষ্ট পাঠের গভীর ব্যাখ্যা পাবেন (Ctrl+K চেপে দেখুন!)। আর নতুন কোনো শব্দ মিললে যোগ করার প্রস্তাব দিন — গ্লসারি বাঁচে সবার যোগে।",
      },
    ],
  },
];
