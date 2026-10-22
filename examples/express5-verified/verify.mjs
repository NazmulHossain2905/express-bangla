// Express 5 আচরণ যাচাই — ডকুমেন্টেশনের দাবিগুলো টেস্ট করার স্ক্রিপ্ট
// চালান: node verify.mjs
import express from "express";

const results = [];
function check(name, fn) {
  try {
    const v = fn();
    results.push(`PASS: ${name}${v !== undefined ? " => " + JSON.stringify(v) : ""}`);
  } catch (err) {
    results.push(`FAIL: ${name} => ${err.message}`);
  }
}

// ১. app.del সরানো হয়েছে
check("app.del removed", () => {
  if (typeof express().del === "function") throw new Error("del still exists");
  return "app.del is gone";
});

const app = express();

// ২. req.body আনপার্সড হলে undefined
check("req.body undefined when unparsed", () => {
  let seen;
  app.post("/t-body", (req, res) => { seen = req.body; res.json({ body: req.body ?? null }); });
  return "route registered";
});

// ৩. async হ্যান্ডলারে rejected promise অটো-ফরওয়ার্ড হয়
app.get("/t-async", async (req, res) => {
  throw new Error("async বোমা");
});

// ৪. {  } ব্রেস সিনট্যাক্স — ঐচ্ছিক প্যারামিটার
app.get("/:file{.:ext}", (req, res) => {
  res.json({ file: req.params.file, ext: req.params.ext ?? null });
});

// ৫. wildcard সবার শেষে — নির্দিষ্ট রাউটগুলো আগে ম্যাচ করার সুযোগ পায়
app.get("/*splat", (req, res) => {
  res.json({ splat: req.params.splat, isArray: Array.isArray(req.params.splat) });
});

app.use((err, req, res, next) => {
  res.status(500).json({ caught: err.message });
});

const server = app.listen(0, async () => {
  const port = server.address().port;
  const base = `http://127.0.0.1:${port}`;

  async function hit(path, opts = {}) {
    const r = await fetch(base + path, opts);
    let body = null;
    try { body = await r.json(); } catch { body = "<non-json>"; }
    return { status: r.status, body };
  }

  // req.body undefined যাচাই (JSON পার্সার ছাড়া POST)
  const r1 = await hit("/t-body", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ a: 1 }) });
  results.push(`${r1.body.body === null ? "PASS" : "FAIL"}: req.body undefined (no parser) => body=${JSON.stringify(r1.body)}`);

  // wildcard
  const r2 = await hit("/foo/bar");
  results.push(`${Array.isArray(r2.body.splat) && r2.body.splat.join("/") === "foo/bar" ? "PASS" : "FAIL"}: /*splat array param => ${JSON.stringify(r2.body)}`);

  // ঐচ্ছিক ext
  const r3 = await hit("/image.png");
  results.push(`${r3.body.file === "image" && r3.body.ext === "png" ? "PASS" : "FAIL"}: /:file{.:ext} matched => ${JSON.stringify(r3.body)}`);
  const r3b = await hit("/image");
  results.push(`${r3b.body.file === "image" && r3b.body.ext === null ? "PASS" : "FAIL"}: optional ext omitted => ${JSON.stringify(r3b.body)}`);

  // async rejected promise অটো এরর হ্যান্ডলারে
  const r4 = await hit("/t-async");
  results.push(`${r4.status === 500 && r4.body.caught === "async বোমা" ? "PASS" : "FAIL"}: async rejection auto-forwarded => ${JSON.stringify(r4.body)}`);

  // ৬. express.urlencoded extended ডিফল্ট false
  const app2 = express();
  app2.use(express.urlencoded({ extended: false }));
  app2.post("/u", (req, res) => res.json({ body: req.body }));
  const s2 = app2.listen(0, async () => {
    const r5 = await fetch(`http://127.0.0.1:${s2.address().port}/u`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: "name=রাফি&age=22",
    });
    const b5 = await r5.json();
    results.push(`${b5.body.name === "রাফি" && b5.body.age === "22" ? "PASS" : "FAIL"}: urlencoded simple parser => ${JSON.stringify(b5.body)}`);
    s2.close();

    console.log(results.join("\n"));
    const fails = results.filter((r) => r.startsWith("FAIL")).length;
    console.log(`\n${results.length - fails}/${results.length} checks passed`);
    server.close();
    process.exit(fails ? 1 : 0);
  });
});
