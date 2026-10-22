import type { Lesson } from "./types";

export const cheatsheet: Lesson = {
  id: "cheatsheet",
  title: "Express চিটশিট",
  subtitle: "সব গুরুত্বপূর্ণ কমান্ড ও কোড এক জায়গায়",
  duration: "রেফারেন্স",
  blocks: [
    {
      type: "text",
      content:
        "এই পাঠটি মুখস্থ করার জন্য নয় — বরং প্রজেক্ট করতে গিয়ে যখন কিছু মনে না আসবে তখন দ্রুত দেখে নেওয়ার জন্য। প্রতিটি টপিকের সবচেয়ে প্রয়োজনীয় সিনট্যাক্স এখানে গুছিয়ে রাখা হলো। বুকমার্ক করে রাখুন!",
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
npm install express

# ডেভ টুল
npm install --save-dev nodemon

# প্রায়ই লাগে
npm install cors morgan dotenv ejs`,
    },
    {
      type: "heading",
      content: "সার্ভার চালু করা",
    },
    {
      type: "code",
      language: "js",
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
      code: `app.get("/", handler);        // পড়া
app.post("/items", handler);  // তৈরি
app.put("/items/:id", handler);  // আপডেট
app.delete("/items/:id", handler); // মুছা

// রুট প্যারামিটার ও কোয়েরি
app.get("/users/:id", (req, res) => {
  req.params.id;   // /users/5 -> "5"
  req.query.sort;  // ?sort=price -> "price"
});`,
    },
    {
      type: "heading",
      content: "মিডলওয়্যার",
    },
    {
      type: "code",
      language: "js",
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
      code: `res.send("টেক্সট");
res.json({ ok: true });
res.status(201).json({ created: true });
res.status(404).json({ error: "পাওয়া যায়নি" });
res.redirect("/login");
res.sendFile(path.join(__dirname, "file.html"));
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
      content: "এরর হ্যান্ডলিং",
    },
    {
      type: "code",
      language: "js",
      code: `// ৪০৪ ক্যাচ-অল (সব রাউটের পরে)
app.use((req, res) => {
  res.status(404).json({ error: "রাউট নেই" });
});

// এরর হ্যান্ডলার (৪ প্যারামিটার, সবার শেষে)
app.use((err, req, res, next) => {
  res.status(500).json({ error: "সার্ভার এরর" });
});

// রাউট থেকে এরর পাঠানো: next(err)`,
    },
    {
      type: "heading",
      content: "রাউট আলাদা ফাইলে (Router)",
    },
    {
      type: "code",
      language: "js",
      code: `// routes/books.js
const router = require("express").Router();
router.get("/", (req, res) => res.json([]));
module.exports = router;

// app.js
const books = require("./routes/books");
app.use("/books", books); // প্রিফিক্স /books`,
    },
  ],
};
