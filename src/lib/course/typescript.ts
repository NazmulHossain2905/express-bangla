import type { Lesson } from "./types";

export const typescriptLessons: Lesson[] = [
  {
    id: "ts-intro",
    title: "TypeScript + Express: শুরু করা",
    subtitle: "কেন TypeScript, কী লাগে, প্রথম টাইপড সার্ভার",
    duration: "১২ মিনিট",
    keywords: ["typescript express", "ts setup", "install typescript", "first ts server", "@types/express"],
    blocks: [
      {
        type: "text",
        content:
          "জাভাস্ক্রিপ্টে req.body.title লিখলে আপনি নিশ্চিত হতে পারেন না title আসলেই আছে — চলবে, তারপর প্রোডাকশনে মাঝরাতে ক্র্যাশ। TypeScript এই অনিশ্চয়তা কমায়: কোড লেখার সময়ই বলে দেয় কোথায় কী টাইপের ডেটা থাকবে, আর ভুল হলে চালানোর আগেই ধরে ফেলে। Express-এর সাথে TypeScript জুটি এত জনপ্রিয় কারণ ব্যাকএন্ডে ডেটার আকৃতি (shape) নিয়েই মূল খেলা — আর টাইপ সেই আকৃতির নকশা কাগজ।",
      },
      {
        type: "heading",
        content: "একটা ছোট্ট স্বাদ",
      },
      {
        type: "code",
        language: "ts",
        variant: "ts",
        filename: "টাইপ ছাড়া বনাম টাইপ সহ",
        code: `// JavaScript — চলে, কিন্তু ভরসা কম
app.get("/books/:id", (req, res) => {
  const book = books.find(req.params.id); // find কি স্ট্রিং নেয়? কে জানে!
  res.json(book.titel);                    // বানান ভুল — রানটাইমে ফাটবে
});

// TypeScript — লেখার সময়েই লাল দাগ
app.get("/books/:id", (req, res) => {
  const book = books.find((b) => b.id === Number(req.params.id));
  // res.json(book.titel);
  //      ~~~~~ Property 'titel' does not exist. Did you mean 'title'?
  res.json(book.title); // ✅ সম্পাদক নিজেই বলে দিলো!
});`,
      },
      {
        type: "heading",
        content: "TypeScript কী জিনিস — এক লাইনে",
      },
      {
        type: "text",
        content:
          "TypeScript = JavaScript + টাইপ সিস্টেম। ব্যাস। যা জাভাস্ক্রিপ্টে চলে তা TypeScript-এও চলে; উপরে টাইপ-লেবেল যোগ হয় যা কম্পাইলার (tsc) যাচাই করে। শেষে সাধারণ জাভাস্ক্রিপ্টেই কম্পাইল হয়ে বের হয় — Node.js TypeScript চালায় না, চালায় কম্পাইল-হওয়া জাভাস্ক্রিপ্ট। এই বিভাজনটা (কম্পাইল টাইম বনাম রানটাইম) মাথায় গেঁথে গেলে TypeScript-এর অর্ধেক বিভ্রান্তি আর থাকবে না।",
      },
      {
        type: "note",
        content:
          "2026-এর খবর: TypeScript-এর সর্বশেষ স্টেবল ভার্সন 7.0 — মাইক্রোসফটের Go-তে লেখা নেটিভ কম্পাইলার, আগের জাভাস্ক্রিপ্ট-ভিত্তিক সংস্করণের চেয়ে প্রায় ১০ গুণ দ্রুত (6.0 ছিল JS-ভিত্তিক শেষ মেজর)। ভালো খবর: আপনার tsconfig আর কোড একই থাকে — দ্রুততা বদলেছে, ভাষা নয়। এই কোর্সের সব কনফিগ TS 5.9+ এবং 7.x দুই লাইনেই চলে।",
      },
      {
        type: "heading",
        content: "প্রজেক্ট সেটআপ — ধাপে ধাপে",
      },
      {
        type: "code",
        language: "bash",
        code: `mkdir express-ts-demo && cd express-ts-demo
npm init -y

# মূল প্যাকেজগুলো
npm install express@5.3.0

# টাইপ-লেবেল: TypeScript নিজে + Express-এর টাইপ
npm install --save-dev typescript tsx @types/express @types/node`,
      },
      {
        type: "text",
        content:
          "@types/express কীসের জন্য তাড়াতাড়ি বুঝে নিন: Express প্যাকেজটা নিজে জাভাস্ক্রিপ্টে লেখা — টাইপের খবর রাখে না। DefinitelyTyped প্রজেক্টের @types/express প্যাকেজটা Express-এর প্রতিটি ফাংশনের টাইপ-বিবরণী আলাদা করে জোগায়। এটা ছাড়া req আর res-কে TypeScript অচেনা ভাবে। এখানে সংস্করণ-মিল গুরুত্বপূর্ণ: Express 5-এর সাথে @types/express-এর 5.x লাগবে (আমরা দিয়েছি সর্বশেষ 5.0.6)।",
      },
      {
        type: "code",
        language: "json",
        filename: "package.json (আংশিক)",
        code: `{
  "name": "express-ts-demo",
  "type": "module",
  "scripts": {
    "dev": "tsx watch --env-file=.env src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js"
  }
}`,
      },
      {
        type: "heading",
        content: "প্রথম TypeScript Express সার্ভার",
      },
      {
        type: "code",
        language: "ts",
        variant: "ts",
        filename: "src/server.ts",
        code: `import express, { type Request, type Response } from "express";

const app = express();
app.use(express.json());

interface Book {
  id: number;
  title: string;
  author: string;
}

const books: Book[] = [
  { id: 1, title: "পথের পাঁচালী", author: "বিভূতিভূষণ বন্দ্যোপাধ্যায়" },
];

// Request আর Response-এর টাইপ দিয়ে দিলাম —
// এখন req.params, res.json সব সম্পাদক চেনে!
app.get("/books/:id", (req: Request, res: Response) => {
  const book = books.find((b) => b.id === Number(req.params.id));

  if (!book) {
    res.status(404).json({ error: "বইটি নেই!" });
    return;
  }
  res.json(book);
});

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(\`TypeScript সার্ভার চলছে http://localhost:\${PORT}-এ\`);
});`,
      },
      {
        type: "code",
        language: "bash",
        code: `# ডেভেলপমেন্ট — কম্পাইল না করেই সরাসরি .ts চালায়, সেভ করলে রিস্টার্ট
npm run dev

# প্রোডাকশন — পরিষ্কার JavaScript-এ কম্পাইল
npm run build
npm start`,
      },
      {
        type: "heading",
        content: "দুই প্রশ্নের সোজা উত্তর",
      },
      {
        type: "text",
        content:
          "tsx কী করে? এটা একটা ডেভেলপমেন্ট টুল যা .ts ফাইল সরাসরি চালায় — ভেতরে দ্রুত ট্রান্সপাইল করে নোডে চালায়, কোনো .js ফাইল প্রজেক্টে জমা হয় না। প্রোডাকশনে tsx নয় — সেখানে tsc দিয়ে কম্পাইল করে dist/-এর জাভাস্ক্রিপ্ট চালানোই স্বাভাবিক (আরও জোর দিয়ে ts-production পাঠে)। Node.js-এর নিজস্ব --experimental-strip-typesও এখন টাইপ ছাড়া .ts চালাতে পারে, কিন্তু এনাম/ডেকোরেটর-সহ পূর্ণ TypeScript-এর জন্য tsx/tsc-ই নির্ভরযোগ্য — নতুনদের জন্য tsx-ই সুপারিশ।",
      },
      {
        type: "warning",
        content:
          "সবচেয়ে বিপজ্জনক ভুল ধারণা: \"TypeScript টাইপ দিলে তো রিকোয়েস্টের ডেটা যাচাই হয়ে যায়\"। হয় না! টাইপ মরে যায় কম্পাইলের পর — রানটাইমে বাইরের HTTP রিকোয়েস্টে যাচাই হয় না। ইউজার যা চায় তাই পাঠাতে পারে; interface-এর নাম দেখে সে লজ্জা পাবে না। তাই Zod-এর মতো রানটাইম ভ্যালিডেশন আলাদা করেই লাগে — টাইপ + ভ্যালিডেশন দুই হাত, এক হাতে তবলা বাজে না (ts-validation পাঠে দেখব দুটো কীভাবে একসাথে বাজায়)।",
      },
      {
        type: "tip",
        content:
          "শেখার ক্রম রাখুন: আগে জাভাস্ক্রিপ্ট+Express ভালো করে (এই কোর্সের আগের সেকশনগুলো), তারপর TypeScript। টাইপ শেখার জন্য প্রয়োজন নয় কঠিন কিছু — interface, type, জেনেরিক্স-এর সাধারণ পটু, আর union (string | null)। প্রয়োজন হলে TypeScript-এর নিজের ডক (typescriptlang.org/docs) আর Node.js-এর TypeScript গাইড সঙ্গী রাখুন।",
      },
    ],
  },
  {
    id: "ts-config",
    title: "tsconfig.json ও ডেভ-প্রোডাকশন ফ্লো",
    subtitle: "প্রতিটি অপশনের মানে জেনে, কম্পাইল-রানটাইম বিভাজন বুঝে",
    duration: "১৫ মিনিট",
    keywords: ["tsconfig", "strict mode", "module nodenext", "outDir", "tsx", "build", "watch"],
    blocks: [
      {
        type: "text",
        content:
          "tsconfig.json হলো TypeScript কম্পাইলারের নিয়মাবলি — কোথা থেকে কোড নেবে, কতটা কড়া যাচাই করবে, আউটপুট কোথায় রাখবে। এই পাতাটা একবার ঠিকমতো বুঝে সাজিয়ে রাখলে পরে রহস্যের জায়গা থাকে না। নিচে Express-এর জন্য সুপারিশকৃত কনফিগ, তারপর লাইনে-লাইনে ব্যাখ্যা:",
      },
      {
        type: "code",
        language: "json",
        filename: "tsconfig.json — Express 5 + Node 24",
        code: `{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "rootDir": "src",
    "outDir": "dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": false,
    "sourceMap": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}`,
      },
      {
        type: "heading",
        content: "প্রতিটি অপশন কেন",
      },
      {
        type: "table",
        headers: ["অপশন", "মানে ও কারণ"],
        rows: [
          ["target: ES2022", "কোন জাভাস্ক্রিপ্ট সংস্করণে কম্পাইল হবে। Node 24 আধুনিক সব ফিচার বোঝে, ES2022 নিরাপদ ও পরিচ্ছন্ন"],
          ["module: NodeNext", "আউটপুট ESM হবে (package.json-এর \"type\": \"module\"-এর সাথে মিলে)। CommonJS প্রজেক্ট হলেও NodeNext চলে — সেটাই Node-এর আসল আচরণ অনুকরণ করে"],
          ["moduleResolution: NodeNext", "import \"./x.js\" ঠিক যেভাবে Node খোঁজে সেভাবে খোঁজে — ফাইল এক্সটেনশনের বাস্তবতা কম্পাইলেও বহাল"],
          ["rootDir / outDir", "src/-এর .ts → dist/-এ .js। প্রজেক্ট গোছানো, ডিপ্লয়ে শুধু dist যায়"],
          ["strict: true", "সব কড়া যাচাই একসাথে চালু — null চেক, noImplicitAny, ইত্যাদি। ব্যথা এখন, নিশ্চিন্তি চিরদিন"],
          ["esModuleInterop: true", "CommonJS প্যাকেজ (যেমন Express) ESM-এ import করার নিয়ম মসৃণ করে"],
          ["skipLibCheck: true", "node_modules-এর ভেতরের টাইপ যাচাই বাদ — দ্রুত বিল্ড, আমাদের কোডের সুরক্ষা অটুট"],
          ["sourceMap: true", "ক্র্যাশের স্ট্যাক ট্রেস dist-এর .js নয়, আসল src/*.ts লাইন দেখায় — ডিবাগিংয়ের রক্ষাকবচ"],
        ],
      },
      {
        type: "heading",
        content: "module বাছাই: NodeNext কেন, আর বিকল্প কী",
      },
      {
        type: "text",
        content:
          "পুরনো টিউটোরিয়ালে module: \"commonjs\" + moduleResolution: \"node\" (পুরনো নাম Node10) দেখবেন — সেগুলো তখনই ঠিক ছিল যখন প্রজেক্ট CommonJS ছিল। ES Modules-প্রজেক্টে NodeNext-ই সঠিক, কারণ NodeNext-ই একমাত্র সমাধান যেটা Node-এর প্রকৃত module resolution (এক্সটেনশনসহ import, exports ফিল্ড) হুবহু মানে। একটাই মনে রাখার নিয়ম: package.json-এর \"type\" আর tsconfig-এর \"module\" একই জগতের কথা বলবে — \"module\" + \"type\": \"module\" কিংবা commonjs+commonjs।",
      },
      {
        type: "heading",
        content: "কম্পাইল টাইম বনাম রানটাইম — শেষ বারের মতো পরিষ্কার",
      },
      {
        type: "list",
        items: [
          "টাইপ যাচাই হয় শুধু কম্পাইলের সময় (tsc) — চলার সময় (node) কোডে টাইপের অস্তিত্বই থাকে না",
          "তাই interface-চেক দিয়ে রিকোয়েস্ট-বডি আটকানো যায় না — সে কাজ Zod-এর (রানটাইম ভ্যালিডেশন)",
          "tsx দিয়ে চালালেও ভেতরে ট্রান্সপাইল হয়েই চলে — টাইপ মুছে যায়, যাচাই লাগে আগে আগে",
          "type-ও import-এ যায় না রানটাইমে — তাই import { type Request } লেখা নিরাপদ (অথবা verbatimModuleSyntax অপশন জোর করে এই শৃঙ্খলা আনে)",
        ],
      },
      {
        type: "heading",
        content: "ডেভেলপমেন্ট লুপ",
      },
      {
        type: "code",
        language: "bash",
        code: `# সবচেয়ে সহজ: tsx watch — .ts সরাসরি চালায়, সেভে রিস্টার্ট
npm run dev    # tsx watch --env-file=.env src/server.ts

# শুধু টাইপ যাচাই (আউটপুট নয়) — এডিটর ছাড়া নিশ্চিত হতে:
npx tsc --noEmit`,
      },
      {
        type: "code",
        language: "bash",
        filename: "প্রোডাকশন ফ্লো",
        code: `# ১. টাইপ যাচাই করে কম্পাইল
npm run build          # tsc → dist/ ফোল্ডারে .js + .map

# ২. এখন এটা সাধারণ জাভাস্ক্রিপ্ট — যেকোনো জায়গায় চলবে
node dist/server.js

# ডিপ্লয়ে dist + package.json + node_modules-ই যথেষ্ট;
# src/ বা tsconfig লাগে না প্রোডাকশনে`,
      },
      {
        type: "text",
        content:
          "তাহলে পুরো ছবিটা: ডেভে চক্র হলো এডিট → tsx চালায় → ব্রাউজারে দেখুন (এডিটর লাল দাগ দেখালেই ঠিক করুন)। শিপিং-এর আগে tsc দিয়ে পুরো প্রজেক্ট যাচাই + কম্পাইল, dist উড়িয়ে নিন। একটাই টুলচেইন, দুই মুড।",
      },
      {
        type: "heading",
        content: "কমন tsconfig বিভ্রান্তি",
      },
      {
        type: "table",
        headers: ["উপসর্গ", "কারণ", "সমাধান"],
        rows: [
          ["TS2307: Cannot find module './routes/books.js'", "ফাইল আছে কিন্তু এক্সটেনশন .ts-তে লেখা ছিল", "NodeNext-তে import-এ .js এক্সটেনশনই লিখতে হয় (সোর্স .ts হলেও!)"],
          ["TS7016: No types for module", "প্যাকেজে টাইপ নেই ও @types প্যাকেজও নেই", "npm i -D @types/<pkg>, বা নিজে .d.ts ডিক্লেয়ার করুন"],
          ["verbatimModuleSyntax এরর", "টাইপ-কে ভ্যালুর মতো import করা হয়েছে", "import { type Request } — টাইপ হলে type কীওয়ার্ড দিন"],
          ["esModuleInterop ছাড়া default import এরর", "CJS প্যাকেজ ESM শৈলীতে import হচ্ছে", "esModuleInterop: true রাখুন"],
        ],
      },
      {
        type: "note",
        content:
          "\"import-এ .js লিখি অথচ ফাইল .ts — এ কেমন পাগলামি?\" — এটা প্রশ্ন করেছে প্রত্যেক TypeScript-শিক্ষার্থী। যুক্তি এই: কম্পাইলার আউটপুট .js ফাইলের নাম জানে না আগে থেকে, আর Node-এর ESM নিয়মে এক্সটেনশন বাধ্যতামূলক — তাই আপনি লেখেন রানটাইমের চূড়ান্ত নাম (.js), কম্পাইলার বুঝে নেয় আসল সোর্স কোনটা। অভ্যাস হয়ে গেলে হাত নিজে থেকেই .js লিখে ফেলে।",
      },
    ],
  },
  {
    id: "ts-types",
    title: "req, res ও রাউট-ডেটার টাইপ",
    subtitle: "Request, Response, NextFunction — প্যারামিটার থেকে বডি পর্যন্ত",
    duration: "১৬ মিনিট",
    keywords: ["request response types", "@types/express", "req.params type", "interface", "generics"],
    blocks: [
      {
        type: "text",
        content:
          "Express-এর হ্যান্ডলারে টাইপ দেওয়ার মূল চাবিকাঠি তিনটি নাম: Request, Response, NextFunction — সব @types/express থেকে আসে। এবার দেখি কোন জায়গায় কীভাবে সেগুলো বসে, আর প্যারামিটার/কোয়েরি/বডির ডেটা কীভাবে নিজের টাইপে বাঁধা যায়।",
      },
      {
        type: "heading",
        content: "মৌলিক সেটআপ",
      },
      {
        type: "code",
        language: "ts",
        variant: "ts",
        filename: "src/server.ts (আংশিক)",
        code: `import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";

const app = express();
app.use(express.json());

app.get("/hello", (req: Request, res: Response) => {
  res.json({ message: "হ্যালো!" });
});

// মিডলওয়্যারে তিনটাই: req, res, next
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(\`\${req.method} \${req.url}\`);
  next();
});`,
      },
      {
        type: "text",
        content:
          "একটা সুবিধা মনে রাখুন: অধিকাংশ সময় এই টাইপগুলো আপনাকে হাতে লিখতেই হয় না — req/res এমনিতেই এডিটর বসিয়ে দেয় (inference), কারণ app.get-এর সিগনেচারে @types/express টাইপ দিয়ে রাখে। স্পষ্ট লেখা দরকার হয় যখন জেনেরিক দিয়ে ডেটার আকৃতি বাঁধতে চান — সেটাই এই পাঠের মূল খেলা।",
      },
      {
        type: "heading",
        content: "নিজের ডেটার টাইপ: interface ও type",
      },
      {
        type: "code",
        language: "ts",
        variant: "ts",
        filename: "src/types/book.ts",
        code: `// ডোমেইন টাইপ — পুরো প্রজেক্টে শেয়ার হবে
export interface Book {
  id: number;
  title: string;
  author: string;
  year?: number; // ঐচ্ছিক
}

// তৈরি-করার সময়ের ইনপুট — id সার্ভার দেয়, ইউজার দেয় না
export interface CreateBookInput {
  title: string;
  author: string;
  year?: number;
}

// API-র জেনেরিক রেসপন্ড খাম
export interface ApiResponse<T> {
  data: T;
  meta?: { page: number; total: number };
}`,
      },
      {
        type: "heading",
        content: "Request-এর জেনেরিক: params, body, res বাঁধা",
      },
      {
        type: "text",
        content:
          "Request আসলে জেনেরিক টাইপ: Request<Params, ResBody, ReqBody, Query>-এর চারটা স্লট আপনার ডেটার আকৃতি ধরে। সাধারণত দুটোই লাগে — প্যারামিটার আর বডি। দেখুন:",
      },
      {
        type: "code",
        language: "ts",
        variant: "ts",
        filename: "src/routes/books.ts",
        code: `import type { Request, Response } from "express";
import type { Book, CreateBookInput } from "../types/book.js";

// প্যারামিটারের আকৃতি বলে দিলাম
interface IdParam {
  id: string; // URL থেকে সবসময় স্ট্রিং!
}

app.get(
  "/books/:id",
  (req: Request<IdParam>, res: Response) => {
    // req.params এখন IdParam — id: string নিশ্চিত
    const id = Number(req.params.id);
    const book = findBook(id);
    if (!book) {
      return res.status(404).json({ error: "নেই" });
    }
    res.json(book);
  }
);

// বডির আকৃতিও বাঁধা যায় — তৃতীয় স্লটে
app.post(
  "/books",
  (req: Request<{}, {}, CreateBookInput>, res: Response) => {
    // req.body এখন CreateBookInput হিসেবে পড়া হবে
    const { title, author } = req.body;
    if (!title || !author) {
      return res.status(400).json({ error: "দুটোই দরকার" });
    }
    const book: Book = createBook({ title, author });
    res.status(201).json(book);
  }
);

// রেসপন্স বডির টাইপ — দ্বিতীয় স্লট (কম দরকার হলেও জেনে রাখুন)
app.get(
  "/books",
  (req: Request<{}, Book[]>, res: Response<Book[]>) => {
    const books = allBooks();
    res.json(books);
  }
);`,
      },
      {
        type: "warning",
        content:
          "জেনেরিক দিয়ে বডি বাঁধাটা \"বিশ্বাসের অঙ্গীকার\" — আসল রিকোয়েস্ট অন্যরকম হলে রানটাইম অবাধ। টাইপ বলে \"title স্ট্রিং\", ইউজার পাঠাল খালি — সার্ভার জানবেও না! তাই বডির ক্ষেত্রে জেনেরিক + Zod-ভ্যালিডেশন জুটি লাগে — জেনেরিক দেয় অটোকমপ্লিট আর ভেতরের কোডের নিশ্চয়তা, Zod দেয় সীমান্তের পাহারা।",
      },
      {
        type: "heading",
        content: "সব একসাথে: ছোট্ট বাস্তব হ্যান্ডলার",
      },
      {
        type: "code",
        language: "ts",
        variant: "ts",
        filename: "প্যারামিটার + কোয়েরি + বডি এক রাউটে",
        code: `interface UserIdParam { userId: string }
interface UpdateUserBody { name?: string; email?: string }
interface SearchQuery { q?: string; page?: string }

app.put(
  "/users/:userId",
  async (
    req: Request<UserIdParam, {}, UpdateUserBody, SearchQuery>,
    res: Response
  ) => {
    const userId = Number(req.params.userId);
    const { name, email } = req.body;
    const page = req.query.page ? Number(req.query.page) : 1;

    const updated = await updateUser(userId, { name, email });
    if (!updated) {
      return res.status(404).json({ error: "ইউজার নেই" });
    }
    res.json({ data: updated, meta: { page, total: 1 } });
  }
);`,
      },
      {
        type: "tip",
        content:
          "চার-স্লটের ক্রম মুখস্থ হয় না — এডিটরে Request< লিখে কার্সর রাখলেই hint দেখায়: Params, ResBody, ReqBody, Query। নাম দেখে চেনার চেষ্টা করুন — \"কোথা থেকে আসছে\" সেটাই টাইপের ঠিকানা। আর req.query-র ভ্যালু সবসময় string | string[] | undefined — সংখ্যা লাগলে Number() বা ParsedQs-এর সাথে যাচাই, এই ভূমিকা অনড়।",
      },
    ],
  },
  {
    id: "ts-middleware",
    title: "টাইপড মিডলওয়্যার ও Request এক্সটেনশন",
    subtitle: "নিজের মিডলওয়্যার, লগইন-ইউজার যোগ, এরর হ্যান্ডলারের টাইপ",
    duration: "১৪ মিনিট",
    keywords: ["typed middleware", "declare global namespace express", "request user type", "error handler types"],
    blocks: [
      {
        type: "text",
        content:
          "মিডলওয়্যার যখন নিজে লেখেন, দুই জায়গায় TypeScript বাড়তি মূল্য দেয়: সিগনেচার ঠিক রাখায় (req, res, next-র টাইপ), আর মিডলওয়্যার যখন req-এ নতুন কিছু যোগ করে (যেমন লগইন-করা ইউজার) সেটা পরের হ্যান্ডলারে চেনাতে। দ্বিতীয় কাজটার জন্য আছে একটা নির্দিষ্ট, প্রায় জাদুকরী সিনট্যাক্স — declaration merging। একবার শিখলে আজীবন।",
      },
      {
        type: "heading",
        content: "সাধারণ টাইপড মিডলওয়্যার",
      },
      {
        type: "code",
        language: "ts",
        variant: "ts",
        filename: "src/middleware/logger.ts",
        code: `import type { NextFunction, Request, Response } from "express";

// সিগনেচার টাইপ দিলে ভুল আর্গুমেন্ট-ক্রম ধরা পড়ে
export function logger(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(\`\${new Date().toISOString()} \${req.method} \${req.path}\`);
  next();
}

// async মিডলওয়্যারের নিরাপদ প্যাটার্ন
export async function dbHealth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await checkDbConnection();
    next();
  } catch (err) {
    next(err); // Express 5-এ async হলে ছুড়ে দিলেও হতো —
  }            // sync-এর মতো নিয়ম জেনে রাখা ভালো
}`,
      },
      {
        type: "heading",
        content: "req.user যোগ করা: Express-এর নেমস্পেস",
      },
      {
        type: "text",
        content:
          "requireAuth মিডলওয়্যার টোকেন যাচাই করে req.user = { id, role } বসায়। কিন্তু Request টাইপে user নামে কিছু নেই — এডিটর লাল দাগ দেবে। সমাধান: Express-এর Request ইন্টারফেসটাকে নিজের ফিল্ড দিয়ে বাড়িয়ে (merge করে) দিতে হয় — এই কৌশলটার নাম declaration merging, আর জায়গাটা হলো গ্লোবাল Express নেমস্পেস:",
      },
      {
        type: "code",
        language: "ts",
        variant: "ts",
        filename: "src/types/express.d.ts — নাম যা-ই হোক, .d.ts হতে হবে",
        code: `import type { Request as ExpressRequest } from "express";

// লগইন-করা ইউজারের আকৃতি
export interface AuthUser {
  id: number;
  email: string;
  role: "admin" | "editor" | "reader";
}

declare module "express-serve-static-core" {
  interface Request {
    // যাচাই-হওয়া অবস্থায় বসবে — তাই | undefined
    user?: AuthUser;
  }
}`,
      },
      {
        type: "code",
        language: "ts",
        variant: "ts",
        filename: "src/middleware/auth.ts — এখন সব জায়গায় চেনা",
        code: `import type { NextFunction, Request, Response } from "express";
import { verifyToken } from "../auth.js";
import type { AuthUser } from "../types/express.js";

export function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const header = req.headers.authorization ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: "লগইন করুন" });
  }

  try {
    req.user = verifyToken(token) as AuthUser; // ✅ লাল দাগ নেই!
    next();
  } catch {
    res.status(401).json({ error: "টোকেন অবৈধ" });
  }
}

// নিচের যেকোনো হ্যান্ডলারে:
app.get("/me", requireAuth, (req, res) => {
  // req.user এখন টাইপড — অটোকমপ্লিট পাচ্ছে id, email, role!
  if (!req.user) return res.sendStatus(401);
  res.json({ id: req.user.id, role: req.user.role });
});`,
      },
      {
        type: "note",
        content:
          "কেন \"express-serve-static-core\"? @types/express নিজে Request টাইপ সেখান থেকে রিএক্সপোর্ট করে — মূল ইন্টারফেসটা ওই প্যাকেজের ভেতরে। একবার এই সামান্য অগোছালো দেখতে লাইনটা লিখে ফেললে বাকিটা মসৃণ। user-এর পাশাপাশি একইভাবে requestId, traceId-র মতো জিনিসও যোগ করা যায় — তবে সংযম রাখুন, Request-কে ভুড়া-বাক্স বানানো আর ভালো ডিজাইন নয়।",
      },
      {
        type: "heading",
        content: "এরর-হ্যান্ডলিং মিডলওয়্যারের টাইপ",
      },
      {
        type: "code",
        language: "ts",
        variant: "ts",
        filename: "src/middleware/errors.ts",
        code: `import type { NextFunction, Request, Response } from "express";

// নিজস্ব এরর ক্লাস — status সহ
export class AppError extends Error {
  constructor(
    message: string,
    public readonly status: number = 500
  ) {
    super(message);
    this.name = "AppError";
  }
}

// Express-এর এরর হ্যান্ডলারের চার আর্গুমেন্ট —
// err সবার আগে, আর টাইপ Errback সিগনেচার মেনে
export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status = err instanceof AppError ? err.status : 500;
  const message =
    err instanceof AppError ? err.message : "সার্ভারে সমস্যা হয়েছে";

  console.error(\`[\${req.method} \${req.path}] \${err.message}\`);

  res.status(status).json({ error: message });
}`,
      },
      {
        type: "warning",
        content:
          "চার আর্গুমেন্টের নাম-ক্রম থেকে শুরু করে টাইপ পর্যন্ত ঠিক রাখুন — Express চার-প্যারামিটার দেখেই বুঝে এটা এরর হ্যান্ডলার। TypeScript-এ একটা ফাঁদ আছে: টাইপ যদি (req, res, next)-এর মতো তিনটা দেয়, Express ভাববে সাধারণ মিডলওয়্যার — চারটা আর্গুমেন্টের টাইপ স্পষ্ট লিখুন। আর errorHandler-কে কখনো সরাসরি রাউটে দেবেন না, app.use(errorHandler) — সবার শেষে।",
      },
      {
        type: "tip",
        content:
          "TypeScript-এ async হ্যান্ডলার লেখা Express 5-এ বিশেষ সুখকর: rejected promise স্বয়ংক্রিয়ভাবে errorHandler-এ যায়, তাই express-async-handler-জাতীয় র‍্যাপারের দরকার নেই — throw করুন, ভরসা রাখুন। একমাত্র সতর্কতা: টাইপ-লেভেলে Error না-হওয়া জিনিস throw করলে (যেমন স্ট্রিং) errorHandler-এর err টাইপ Error অনুমান করবে — সবসময় new Error()/new AppError() ছুড়ুন।",
      },
    ],
  },
  {
    id: "ts-validation",
    title: "TypeScript + Zod ভ্যালিডেশন",
    subtitle: "এক schema থেকে রানটাইম পাহারা আর কম্পাইল-টাইম টাইপ",
    duration: "১২ মিনিট",
    keywords: ["zod typescript", "z.infer", "schema validation", "type safe express", "parse body"],
    blocks: [
      {
        type: "text",
        content:
          "আগের পাঠে দেখেছি — টাইপ কম্পাইলের পর মুছে যায়, তাই রিকোয়েস্টের ডেটা রানটাইমে আলাদাভাবে যাচাই লাগে। Zod-এর জাদু এখানেই: একটাই schema লিখবেন — Zod সেটা দিয়ে রানটাইমে পাহারা দেবে, আর z.infer সেটা থেকে TypeScript টাইপও বানিয়ে দেবে। দুই দুনিয়ায় এক সত্য — ডকুমেন্টেশন কখনো সাথে নিয়ে হাঁটে না বিপদে।",
      },
      {
        type: "code",
        language: "bash",
        code: `npm install zod`,
      },
      {
        type: "heading",
        content: "schema → parse → টাইপ: পূর্ণ চক্র",
      },
      {
        type: "code",
        language: "ts",
        variant: "ts",
        filename: "src/schemas/book.schema.ts",
        code: `import { z } from "zod";

export const createBookSchema = z.object({
  title: z.string().min(1, "title খালি হতে পারে না").max(200),
  author: z.string().min(1, "author খালি হতে পারে না"),
  year: z.coerce.number().int().min(1000).max(2026).optional(),
});

// এই এক লাইনেই আগের interface-এর কাজ — সবসময় schema-ই সত্যের উৎস!
export type CreateBookInput = z.infer<typeof createBookSchema>;
// CreateBookInput = { title: string; author: string; year?: number }

export const idParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});`,
      },
      {
        type: "code",
        language: "ts",
        variant: "ts",
        filename: "src/routes/books.ts",
        code: `import type { Request, Response } from "express";
import { createBookSchema, idParamSchema } from "../schemas/book.schema.js";
import type { CreateBookInput } from "../schemas/book.schema.js";

// টাইপড ভ্যালিডেটর মিডলওয়্যার (একবার লিখে সর্বত্র)
import { validate } from "../middleware/validate.js";

app.post(
  "/books",
  validate({ body: createBookSchema }),
  (req, res) => {
    // req.body এখন CreateBookInput — যাচাই-ও হয়েছে, টাইপও বাঁধা!
    const input: CreateBookInput = req.body;
    const book = createBook(input);
    res.status(201).json(book);
  }
);

app.get(
  "/books/:id",
  validate({ params: idParamSchema }),
  (req, res) => {
    // req.params.id এখন সংখ্যা — coerce করে দিয়েছে schema
    const book = findBook(req.params.id);
    if (!book) return res.status(404).json({ error: "নেই" });
    res.json(book);
  }
);`,
      },
      {
        type: "code",
        language: "ts",
        variant: "ts",
        filename: "src/middleware/validate.ts — জেনেরিক সংস্করণ",
        code: `import type { NextFunction, Request, Response } from "express";
import type { z } from "zod";

interface Schemas {
  body?: z.ZodTypeAny;
  params?: z.ZodTypeAny;
  query?: z.ZodTypeAny;
}

export function validate(schemas: Schemas) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schemas.body) req.body = schemas.body.parse(req.body);
      if (schemas.params) req.params = schemas.params.parse(req.params);
      if (schemas.query) req.query = schemas.query.parse(req.query);
      next();
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          error: "ডেটা সঠিক নয়",
          issues: err.issues.map((i) => ({
            field: i.path.join("."),
            message: i.message,
          })),
        });
      }
      next(err);
    }
  };
}`,
      },
      {
        type: "heading",
        content: "z.infer-এর সৌন্দর্য: ড্রিফট অসম্ভব",
      },
      {
        type: "text",
        content:
          "আলাদা interface আর আলাদা Zod schema লিখলে একদিন নিশ্চিত বিবদমান হয় — একটা বদলালে আরেকটায় ভুলে যায়। z.infer দিয়ে টাইপ schema থেকেই জন্মানোয় সেই বিপদ অসম্ভব: schema-তে year যোগ করলে টাইপেও যাবে, বাদ দিলে দুই জায়গাতেই বাদ। একক সত্যের উৎস (single source of truth) — বড় প্রজেক্টে এর মূল্য মাসে মাসে বোঝা যায়।",
      },
      {
        type: "code",
        language: "ts",
        variant: "ts",
        filename: "সার্ভিস লেয়ারেও সেই টাইপ",
        code: `// সার্ভিস — একই টাইপ, কোনো ডুপ্লিকেশন নেই
export function createBook(input: CreateBookInput): Book {
  return db.insert({ ...input, id: nextId++ });
}

// এডিটরে createBook( লিখলেই প্যারামিটার হিন্ট:
// { title: string; author: string; year?: number }`,
      },
      {
        type: "heading",
        content: "async হ্যান্ডলারে এরর — Express 5 + TS একসাথে",
      },
      {
        type: "code",
        language: "ts",
        variant: "ts",
        code: `import { AppError } from "../middleware/errors.js";

app.get("/books/:id", validate({ params: idParamSchema }), async (req, res) => {
  const book = await findBookAsync(req.params.id); // DB কল
  if (!book) {
    // এরর হ্যান্ডলারে চলে যাবে স্বয়ংক্রিয়ভাবে (Express 5)
    throw new AppError("বইটি পাওয়া যায়নি!", 404);
  }
  res.json(book); // ভেতরে await ব্যর্থ হলেও errorHandler-ই দায়িত্বে
});`,
      },
      {
        type: "warning",
        content:
          "দুটো জিনিস গুলিয়ে ফেলবেন না: parse() ব্যর্থ হলে ZodError throw করে (আপনার validate-মিডলওয়্যার সেটা 400-এ বদলায়), আর ডেটা না পাওয়া মানে AppError(404) — একটা ইনপুটের সমস্যা, আরেকটা বিজনেসের। দুটোর রেসপন্স গঠনও আলাদা রাখা ভালো অভ্যাস: 400-এ issues-অ্যারে, 404-এ সরল বার্তা।",
      },
      {
        type: "tip",
        content:
          "z.coerce টাইপ-নিরাপত্তার নয়, সুবিধার জিনিস — URL/কোয়েরির স্ট্রিং সংখ্যায় বদলে দেয় (\"5\" → 5)। বদলাতে না পারলে (যেমন \"abc\") ভ্যালিডেশন ব্যর্থ হয় — তাই এটাও রানটাইম পাহারারই অংশ। কৌশল: জেনেরিক Request<...> দিয়ে বডি বাঁধার বদলে Zod validate-মিডলওয়্যারকেই বডির একমাত্র দরজা বানান — তখন কোডের কোথাও যাচাই-না-হওয়া বডি ছুঁতেই পারবে না।",
      },
    ],
  },
  {
    id: "ts-architecture",
    title: "TypeScript প্রজেক্ট আর্কিটেকচার",
    subtitle: "routes, controllers, services, shared types — আর env-এর নিরাপদ পথ",
    duration: "১৪ মিনিট",
    keywords: ["typescript project structure", "controllers", "services", "types folder", "process env type safe"],
    blocks: [
      {
        type: "text",
        content:
          "ছোট প্রজেক্টে সব এক ফাইলে গেলেও চলে, কিন্তু TypeScript-এর আসল আনন্দ তখনই যখন লেয়ারগুলো পরিষ্কার — কারণ টাইপ লেয়ারের মধ্যে চুক্তিপত্র হয়ে দাঁড়ায়: রাউট জানে কন্ট্রোলার কী নেবে, কন্ট্রোলার জানে সার্ভিস কী ফেরাবে। চলুন একটা বাস্তব কাঠামো দেখি যেটা বড় হলেও টেকে।",
      },
      {
        type: "code",
        language: "text",
        filename: "ফোল্ডার মানচিত্র",
        code: `express-ts-app/
├── src/
│   ├── server.ts            # শুধু চালু — listen
│   ├── app.ts               # express() + গ্লোবাল মিডলওয়্যার
│   ├── routes/
│   │   └── book.routes.ts   # URL ↔ হ্যান্ডলার ম্যাপ
│   ├── controllers/
│   │   └── book.controller.ts # req/res সামলানো, স্ট্যাটাস কোড
│   ├── services/
│   │   └── book.service.ts   # বিজনেস লজিক + ডেটা
│   ├── schemas/
│   │   └── book.schema.ts   # Zod schema + inferred টাইপ
│   ├── middleware/
│   │   ├── validate.ts
│   │   ├── auth.ts
│   │   └── errors.ts        # AppError + errorHandler
│   └── types/
│       ├── express.d.ts     # Request.user এক্সটেনশন
│       └── book.ts          # ডোমেইন টাইপ (Book ...)
├── tsconfig.json
└── package.json             # "type": "module"`,
      },
      {
        type: "heading",
        content: "প্রতিটি লেয়ারের চুক্তি",
      },
      {
        type: "code",
        language: "ts",
        variant: "ts",
        filename: "src/services/book.service.ts — ডেটা+লজিক, req/res অজানা",
        code: `import type { Book } from "../types/book.js";
import type { CreateBookInput } from "../schemas/book.schema.js";
import { prisma } from "../db.js";

// সার্ভিস HTTP-এর কিছু জানে না — বিশুদ্ধ বিজনেস
export async function getBook(id: number): Promise<Book | null> {
  return prisma.book.findUnique({ where: { id } });
}

export async function createBook(input: CreateBookInput): Promise<Book> {
  return prisma.book.create({ data: input });
}

export async function deleteBook(id: number): Promise<Book | null> {
  try {
    return await prisma.book.delete({ where: { id } });
  } catch {
    return null; // নেই — কন্ট্রোলার ঠিক করবে কী বলতে হবে
  }
}`,
      },
      {
        type: "code",
        language: "ts",
        variant: "ts",
        filename: "src/controllers/book.controller.ts — অনুবাদক",
        code: `import type { Request, Response } from "express";
import * as service from "../services/book.service.js";
import { AppError } from "../middleware/errors.js";

// কন্ট্রোলার: HTTP ভাষা ↔ সার্ভিস ভাষা
export async function getBook(
  req: Request,
  res: Response
) {
  const id = Number(req.params.id);
  const book = await service.getBook(id);
  if (!book) throw new AppError("বইটি নেই!", 404);
  res.json(book);
}

export async function createBook(
  req: Request,
  res: Response
) {
  // req.body এর আগেই validate-মিডলওয়্যার যাচাই করেছে
  const book = await service.createBook(req.body);
  res.status(201).json(book);
}

export async function deleteBook(
  req: Request,
  res: Response
) {
  const ok = await service.deleteBook(Number(req.params.id));
  if (!ok) throw new AppError("বইটি নেই!", 404);
  res.sendStatus(204);
}`,
      },
      {
        type: "code",
        language: "ts",
        variant: "ts",
        filename: "src/routes/book.routes.ts + src/app.ts + src/server.ts",
        code: `// routes — শুধু তালিকা, যত পাতলা তত ভালো
import { Router } from "express";
import * as ctrl from "../controllers/book.controller.js";
import { validate } from "../middleware/validate.js";
import { createBookSchema } from "../schemas/book.schema.js";
import { requireAuth } from "../middleware/auth.js";

export const bookRoutes = Router();

bookRoutes.get("/", ctrl.getBooks);
bookRoutes.get("/:id", ctrl.getBook);
bookRoutes.post("/", requireAuth, validate({ body: createBookSchema }), ctrl.createBook);
bookRoutes.delete("/:id", requireAuth, ctrl.deleteBook);

// app.ts
import express from "express";
import helmet from "helmet";
import { bookRoutes } from "./routes/book.routes.js";
import { errorHandler } from "./middleware/errors.js";

export const app = express();
app.use(helmet());
app.use(express.json());
app.use("/books", bookRoutes);
app.use(errorHandler); // সবার শেষে

// server.ts
import { app } from "./app.js";
const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => console.log(\`চলছে \${PORT}-এ\`));`,
      },
      {
        type: "heading",
        content: "process.env-এর টাইপ-নিরাপদ ব্যবহার",
      },
      {
        type: "text",
        content:
          "process.env.DATABASE_URL-এর টাইপ string | undefined — সব জায়গায় চেক করতে না গিয়ে বুটের সময়েই সব env যাচাই করে নিন, তারপর টাইপ-নিরাপদ অবজেক্ট বানিয়ে ফেলুন — Zod এখানেও তারকা:",
      },
      {
        type: "code",
        language: "ts",
        variant: "ts",
        filename: "src/config.ts",
        code: `import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().url("DATABASE_URL অবশ্যই সঠিক URL হতে হবে"),
  JWT_SECRET: z.string().min(32, "JWT_SECRET অন্তত ৩২ অক্ষরের হতে হবে"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  // বুটেই জোরে ফেইল — ভাঙা env নিয়ে চলতে দেব না
  console.error("❌ পরিবেশ ভেরিয়েবল সমস্যা:", parsed.error.issues);
  process.exit(1);
}

// এখন পুরো অ্যাপে env.PORT-এর টাইপ নিশ্চিত number!
export const env = parsed.data;`,
      },
      {
        type: "code",
        language: "ts",
        variant: "ts",
        filename: "server.ts এখন এতটুকুই",
        code: `import { app } from "./app.js";
import { env } from "./config.js";

app.listen(env.PORT, () => {
  console.log(\`\${env.NODE_ENV} মোডে চলছে \${env.PORT} পোর্টে\`);
});`,
      },
      {
        type: "tip",
        content:
          "লেয়ারের নিয়ম তিন লাইনে: রাউট চালাক HTTP নাম-ম্যাপিং, কন্ট্রোলার অনুবাদক (req→আর্গুমেন্ট, ফলাফল→res), সার্ভিস বিশুদ্ধ লজিক — req/res স্পর্শ করবে না। এই শৃঙ্খলার ফল: সার্ভিস লেয়ার বিনা Express-ই টেস্ট করা যায়, আর Swagger-জাতীয় ডক বা GraphQL-এ পাল্টাতে হলে রাউট ছাড়া কিছু বদলাতে হয় না।",
      },
    ],
  },
  {
    id: "ts-testing",
    title: "TypeScript API টেস্ট",
    subtitle: "node:test + Supertest — টাইপ যাচাই করা টেস্ট, ভরসাযোগ্য রিফ্যাক্টর",
    duration: "১০ মিনিট",
    keywords: ["typescript test", "supertest ts", "node test typescript", "api testing"],
    blocks: [
      {
        type: "text",
        content:
          "টেস্টও কোড — তাই টাইপ পাওয়ার উচিত। জাভাস্ক্রিপ্ট-পাঠে যে সেটআপ শিখেছি (app/server আলাদা + Supertest), TypeScript-এ সেটাই সামান্য মসৃণ: tsx টেস্ট ফাইলও চালিয়ে দেয়, আর অ্যাসারশনগুলো টাইপড — টেস্ট নিজেই ভুল হলে কম্পাইলার আগেই ধরে।",
      },
      {
        type: "code",
        language: "bash",
        code: `npm install --save-dev supertest @types/supertest`,
      },
      {
        type: "code",
        language: "ts",
        variant: "ts",
        filename: "test/books.test.ts",
        code: `import test from "node:test";
import assert from "node:assert/strict";
import request from "supertest";

import { app } from "../src/app.js";

test("GET /books তালিকা দেয়", async () => {
  const res = await request(app).get("/books");

  assert.equal(res.status, 200);
  assert.ok(Array.isArray(res.body));
});

test("POST /books — Zod ভ্যালিডেশন 400 দেয়", async () => {
  const res = await request(app)
    .post("/books")
    .send({ title: "" }); // খালি title!

  assert.equal(res.status, 400);
  assert.ok(Array.isArray(res.body.issues));
});

test("GET /books/:id — সংখ্যা না হলে 400", async () => {
  const res = await request(app).get("/books/abc");
  assert.equal(res.status, 400); // coerce ব্যর্থ → ভ্যালিডেশন ব্যর্থ
});

test("DELETE লগইন ছাড়া 401", async () => {
  const res = await request(app).delete("/books/1");
  assert.equal(res.status, 401);
});`,
      },
      {
        type: "code",
        language: "json",
        filename: "package.json (scripts)",
        code: `"scripts": {
  "test": "tsx --test test/*.test.ts",
  "typecheck": "tsc --noEmit",
  "build": "tsc"
}`,
      },
      {
        type: "text",
        content:
          "মনে আছে, জাভাস্ক্রিপ্ট-পাঠে node --test চালিয়েছিলাম? TypeScript-এ সেটা হয় tsx --test — tsx নিজেই টেস্ট রানার চালিয়ে দেয় .ts ফাইলগুলো ট্রান্সপাইল করে করে। এডিটরে ফাইলটা খুললে সব import-ও টাইপ-চেক হতে থাকে — ভুল URL-টাইপ বা মিসিং অ্যাসার্ট ধরা পড়ে লেখার সময়েই।",
      },
      {
        type: "heading",
        content: "টাইপড টেস্ট-ডেটা: বানানো সহজ, ভাঙা কঠিন",
      },
      {
        type: "code",
        language: "ts",
        variant: "ts",
        filename: "test/helpers.ts",
        code: `import type { CreateBookInput } from "../src/schemas/book.schema.js";

// ফ্যাক্টরি — বদলাতে হলে এক জায়গায়
export function makeBookInput(
  overrides: Partial<CreateBookInput> = {}
): CreateBookInput {
  return {
    title: "পরীর সংসার",
    author: "হুমায়ুন আহমেদ",
    ...overrides, // যেটা টেস্ট চায় শুধু সেটা বদলায়
  };
}

// ব্যবহার:
// .send(makeBookInput({ title: "" })) — খালি টাইটেল টেস্ট
// .send(makeBookInput({ year: 1992 }))`,
      },
      {
        type: "warning",
        content:
          "টেস্টে যা ধরা যায় না: এডিটর যদি res.body.items-এ লাল দাগ না দেয় তবে রেসপন্স-টাইপ unknown/any-ই আসছে — চাইলে নিজের ApiResponse<T> খামের সাথে মিলিয়ে নিন। Supertest-এর res.body টাইপ any — তাই অ্যাসারশনে টাইপ বিশ্বাস নয়, assert-এর যুক্তিই আসল রক্ষী। typecheck আর test দুটো স্ক্রিপ্টই সবসময় CI-তে চালান।",
      },
      {
        type: "tip",
        content:
          "সার্ভিস লেয়ার বিশুদ্ধ রাখলে (আগের পাঠের নিয়ম) ইউনিট টেস্টও সহজ — কোনো mock-ই লাগে না, সত্যিকার টেস্ট-ডেটাবেসে সরাসরি সার্ভিস ফাংশন ডাকুন। লাইব্রেরি-নির্ভরতা যদি বাইরের হয় (ইমেইল পাঠায়, পেমেন্ট নেয়), node:test-এর t.mock দিয়ে ভান করানো যায় — দরকার না পড়া পর্যন্ত জটিল mock-এ যাবেন না।",
      },
    ],
  },
  {
    id: "ts-production",
    title: "TypeScript প্রোডাকশন বিল্ড ও ডিপ্লয়",
    subtitle: "কম্পাইল, প্যাকেজিং, ডিপ্লয় — আর কমন পিটফল",
    duration: "১২ মিনিট",
    keywords: ["typescript production", "build", "deploy ts", "dist", "common ts errors"],
    blocks: [
      {
        type: "text",
        content:
          "প্রোডাকশনে TypeScript-এর নিজের কোনো অস্তিত্ব থাকে না — থাকে dist/-এর কম্পাইল-হওয়া জাভাস্ক্রিপ্ট। তাই শেষ পাঠের এজেন্ডা: বিল্ড-স্টেপ ঠিকভাবে সাজানো, ডিপ্লয়ে কী কী ফাইল যাবে, আর প্রোডাকশনে না-গিয়ে যে ভুলগুলো আগেই ধরা যায়।",
      },
      {
        type: "heading",
        content: "বিল্ড ও শিপিং চেকলিস্ট",
      },
      {
        type: "code",
        language: "bash",
        code: `# ১. টাইপ যাচাই — একটাও এরর হলে থামুন
npm run typecheck      # tsc --noEmit

# ২. টেস্ট
npm test

# ৩. কম্পাইল — dist/-এ পরিষ্কার .js
npm run build          # tsc

# ৪. স্মোক টেস্ট — লোকালেই প্রোডাকশন মুড চালিয়ে দেখুন
NODE_ENV=production node dist/server.js`,
      },
      {
        type: "code",
        language: "text",
        filename: "ডিপ্লয়ে যা যাবে",
        code: `dist/            # কম্পাইল-হওয়া কোড (+ .map গুলোও রাখুন)
package.json     # dependencies সহ
package-lock.json

যাবে না: src/, tsconfig.json, test/, .env, node_modules
(প্ল্যাটফর্মে npm ci --omit=dev চালিয়ে নিজেরাই বানায়)`,
      },
      {
        type: "code",
        language: "json",
        filename: "package.json (scripts) — পূর্ণ ছবি",
        code: `{
  "type": "module",
  "scripts": {
    "dev": "tsx watch --env-file=.env src/server.ts",
    "typecheck": "tsc --noEmit",
    "test": "tsx --test test/*.test.ts",
    "build": "tsc",
    "start": "node dist/server.js"
  }
}`,
      },
      {
        type: "note",
        content:
          "env লোডের দায়িত্ব প্রোডাকশনে সাধারণত প্ল্যাটফর্মের (Railway/Render-এর environment variables সরাসরি process.env-এ বসে) — তাই dist-এর স্টার্ট কমান্ডে --env-file নেই। নিজের VPS হলে systemd/pm2-এর env ফাইল ব্যবহার করুন। dotenv-প্যাকেজের প্রয়োজন এখানেও শেষ প্রায় — Node-এর নিজস্ব ক্ষমতাই যথেষ্ট।",
      },
      {
        type: "heading",
        content: "sourceMap-এর প্রোডাকশন কথা",
      },
      {
        type: "text",
        content:
          "tsconfig-এ sourceMap: true রেখেছিলাম — dist/-এ .js.map ফাইল জন্মায়। এর গুপ্ত সম্পদ: প্রোডাকশন ক্র্যাশের স্ট্যাক ট্রেস dist/server.js-এর লাইন নয়, src/server.ts-এর আসল লাইন দেখায় (মনিটরিং টুল Sentry ইত্যাদি ম্যাপ বুঝে নেয়)। ছোট প্রজেক্টে খরচ নেই, দুঃখ নেই — রাখাই ভালো। শুধু .map ফাইল পাবলিক static-ফোল্ডারে পড়ে না গেলেই হলো (সেগুলো ভেতরের কোড-নকশা ফাঁস করতে পারে)।",
      },
      {
        type: "heading",
        content: "কমন প্রোডাকশন পিটফল",
      },
      {
        type: "table",
        headers: ["লক্ষণ", "কারণ", "প্রতিষেধ"],
        rows: [
          ["Cannot find module '.../dist/...'", "dist পুরনো — নতুন ফাইল কম্পাইল হয়নি", "বিল্ড-স্ক্রিপ্টে আগে পুরনো dist মুছুন: tsc && (এ কাজে rimraf বা সরাসরি rm -rf dist)"],
          ["devDependencies-এর প্যাকেজ প্রোডাকশনে নেই", "tsx/tsc শুধু dev-এ, কিন্তু রানটাইম-কোড ভুলে সেগুলো টানছে", "import-এর তালিকা দেখুন; tsx কখনো src ছাড়া যাবে না"],
          ["ELIFECYCLE এরর বিল্ডে", "tsc এরর পেয়ে থেমে গেছে", "ঠিক আচরণ! এরর ঠিক করে আবার; --noEmit-এ আগে দেখে নিন"],
          ["শুরুতেই undefined env এ ক্র্যাশ", "প্ল্যাটফর্মে env সেট করা হয়নি", "config.ts-র বুট-টাইম যাচাই ঠিকই আছে — মিসিং ভেরিয়েবলের নাম লগে দেখুন"],
        ],
      },
      {
        type: "heading",
        content: "Dockerfile — TS-অ্যাপের বহু-স্টেজ বিল্ড",
      },
      {
        type: "code",
        language: "text",
        filename: "Dockerfile",
        code: `# ধাপ ১: বিল্ড — টুলচেইনসহ
FROM node:24-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY tsconfig.json ./
COPY src/ src/
RUN npx tsc

# ধাপ ২: চালানো — শুধু প্রয়োজনীয়, হালকা
FROM node:24-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=build /app/dist dist/
EXPOSE 3000
CMD ["node", "dist/server.js"]`,
      },
      {
        type: "text",
        content:
          "বহু-স্টেজের লাভ: চূড়ান্ত ইমেজে TypeScript, devDependencies, সোর্স — কিছুই থাকে না; থাকে শুধু জাভাস্ক্রিপ্ট আর প্রোডাকশন-নির্ভরতা। ছোট ইমেজ = দ্রুত ডিপ্লয় = কম অ্যাটাক-সারফেস।",
      },
      {
        type: "tip",
        content:
          "CI-তে তিনটা কমান্ড গেঁথে দিন: typecheck → test → build — একটাও লাল হলে deploy হবে না। এটাই TypeScript-প্রজেক্টের ন্যূনতম মেধাবী অভিভাবক, আর বাস্তবে এই তিন দরজা পেরোলে ৯৫% \"আমার লোকালে তো চলছিল\" ঘটনা বিদায় নেয়।",
      },
    ],
  },
];
