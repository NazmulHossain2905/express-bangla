/**
 * ডকুমেন্টেশন সার্চ — সব পাঠ থেকে স্বয়ংক্রিয়ভাবে ইনডেক্স তৈরি হয়,
 * তাই নতুন পাঠ যোগ করলে আলাদা করে কিছু করতে হয় না।
 *
 * কাঠামো: প্রতিটি পাঠের জন্য একটি "মূল ডকুমেন্ট" (টাইটেল+সাবটাইটেল+সম্পূর্ণ টেক্সট)
 * এবং প্রতিটি heading-অংশের জন্য একটি করে আলাদা ডকুমেন্ট —
 * যাতে সার্চ থেকে সরাসরি ওই heading-এর anchor-এ নেমে যাওয়া যায়।
 */

import MiniSearch, { type SearchResult } from "minisearch";
import { lessons, sections } from "@/lib/course";
import type { ContentBlock, Lesson } from "@/lib/course/types";

export interface SearchDoc {
  id: string; // "lesson:slug" বা "lesson:slug#heading-slug"
  lessonId: string;
  title: string; // heading-ডকুমেন্টের ক্ষেত্রে heading টেক্সট
  subtitle: string;
  sectionTitle: string;
  body: string;
  keywords: string;
  headingId: string; // "" হলে পাতার শুরুতে
}

export interface SearchHit {
  id: string;
  lessonId: string;
  title: string;
  subtitle: string;
  sectionTitle: string;
  headingId: string;
  snippet: string;
  score: number;
}

/** বাংলা + ইংরেজি উভয়ের জন্য anchor-বান্নোয়া slug */
export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "") // বর্ণ ও সংখ্যা ছাড়া বাদ
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);
}

function blockText(block: ContentBlock): string {
  switch (block.type) {
    case "text":
    case "heading":
      return block.content;
    case "code":
      return block.filename ? `${block.filename}\n${block.code}` : block.code;
    case "list":
      return block.items.join(" ");
    case "tip":
    case "warning":
    case "note":
      return block.content;
    case "table":
      return [...block.headers, ...block.rows.flat()].join(" ");
    default:
      return "";
  }
}

function lessonToDocs(lesson: Lesson, sectionTitle: string): SearchDoc[] {
  const docs: SearchDoc[] = [];
  const kw = lesson.keywords?.join(" ") ?? "";

  // ১. মূল ডকুমেন্ট — টাইটেল/সাবটাইটেল/কীওয়ার্ড + পাঠের শুরুর অংশ;
  // পুরো বডি heading-ডকুমেন্টগুলোতেই আছে, ডুপ্লিকেট রোধে এখানে ছোট অংশ
  const opening = lesson.blocks
    .filter((b) => b.type === "text")
    .slice(0, 2)
    .map(blockText)
    .join(" ")
    .slice(0, 300);

  docs.push({
    id: `lesson:${lesson.id}`,
    lessonId: lesson.id,
    title: lesson.title,
    subtitle: lesson.subtitle,
    sectionTitle,
    body: opening,
    keywords: kw,
    headingId: "",
  });

  // ২. heading ধরে ভাগ করা উপ-ডকুমেন্ট — মূল টেক্সট-সার্চ এখানেই
  let currentHeading = "";
  let currentHeadingId = "";
  let buffer: string[] = [];
  let size = 0;
  const HEADING_CAP = 2000;

  const flush = () => {
    if (currentHeading && buffer.length) {
      docs.push({
        id: `lesson:${lesson.id}#${currentHeadingId}`,
        lessonId: lesson.id,
        title: currentHeading,
        subtitle: lesson.title,
        sectionTitle,
        body: buffer.join("\n").slice(0, HEADING_CAP),
        // কীওয়ার্ড শুধু মূল-পাঠ ডকুমেন্টে — নইলে এক পাঠের সব heading
        // একই কীওয়ার্ডে উপচে পড়ে র‍্যাংকিং নষ্ট করে
        keywords: "",
        headingId: currentHeadingId,
      });
    }
    buffer = [];
    size = 0;
  };

  for (const block of lesson.blocks) {
    if (block.type === "heading") {
      flush();
      currentHeading = block.content;
      currentHeadingId = slugifyHeading(block.content);
    } else {
      let text = blockText(block);
      // কোড ব্লকের শুরুর অংশই যথেষ্ট — সবচেয়ে দরকারি টোকেন সেখানেই
      if (block.type === "code") text = text.slice(0, 400);
      if (size < HEADING_CAP) {
        buffer.push(text);
        size += text.length;
      }
    }
  }
  flush();

  return docs;
}

const STOP = new Set([
  "কি", "কী", "এবং", "ও", "আর", "থেকে", "জন্য", "হয়", "হবে", "হয়েছে", "করে",
  "করা", "করব", "কোনো", "কিভাবে", "সেটি", "এই", "একটি", "আপনি", "আমরা", "তাই",
  "নয়", "যে", "সাথে", "সব", "আছে", "নেই", "দিয়ে", "মতো",
  "the", "a", "an", "of", "in", "is", "to", "how", "what", "and", "or",
  "for", "with", "you", "your", "this", "that", "it",
]);

let cached: { index: MiniSearch<SearchDoc>; docs: SearchDoc[] } | null = null;

export function getSearchIndex() {
  if (cached) return cached;

  const sectionByLesson = new Map<string, string>();
  for (const s of sections) {
    for (const l of s.lessons) sectionByLesson.set(l.id, s.title);
  }
  sectionByLesson.set("cheatsheet", "রেফারেন্স");

  const docs = lessons.flatMap((l) =>
    lessonToDocs(l, sectionByLesson.get(l.id) ?? "")
  );

  const index = new MiniSearch<SearchDoc>({
    fields: ["title", "subtitle", "body", "keywords", "sectionTitle"],
    storeFields: ["title", "subtitle", "sectionTitle", "lessonId", "headingId"],
    // স্টপওয়ার্ড ইনডেক্সেই ঢুকতে দিই না — সাইজ অনেক কমে
    processTerm: (term) => (STOP.has(term.toLowerCase()) ? null : term),
    searchOptions: {
      boost: { title: 5, keywords: 4, subtitle: 2, sectionTitle: 2, body: 1 },
      prefix: true,
      fuzzy: 0.2, // বাংলায় বানান-ভুলও ধরা পড়ে
      combineWith: "AND",
    },
  });

  index.addAll(docs);
  cached = { index, docs };
  return cached;
}

/** ম্যাচ-ঘিরে সংক্ষিপ্ত উদ্ধৃতি — হাইলাইটের জন্য অংশ চিহ্নিত */
function makeSnippet(body: string, terms: string[]): string {
  const clean = body.replace(/\n+/g, " ").replace(/\s+/g, " ").trim();
  if (!clean) return "";

  const lower = clean.toLowerCase();
  let pos = -1;
  for (const t of terms) {
    if (t.length < 2) continue;
    const p = lower.indexOf(t.toLowerCase());
    if (p !== -1 && (pos === -1 || p < pos)) pos = p;
  }

  const start = Math.max(0, pos === -1 ? 0 : pos - 60);
  const end = Math.min(clean.length, start + 200);
  let snippet =
    start > 0 ? "…" + clean.slice(start, end) : clean.slice(start, end);
  if (end < clean.length) snippet += "…";
  return snippet;
}

export function runSearch(query: string, limit = 12): SearchHit[] {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const { index, docs } = getSearchIndex();
  const docById = new Map(docs.map((d) => [d.id, d]));

  let raw: SearchResult[];
  try {
    raw = index.search(trimmed);
  } catch {
    raw = [];
  }

  // AND-এ শূন্য হলে OR দিয়ে আরেকবার — কম-শব্দের জিজ্ঞেসও ফল দেবে
  if (raw.length === 0 && trimmed.includes(" ")) {
    try {
      raw = index.search(trimmed, { combineWith: "OR" });
    } catch {
      raw = [];
    }
  }

  const terms = trimmed
    .split(/[\s,;:?().!]+/u)
    .filter((t) => t.length > 1 && !STOP.has(t.toLowerCase()));

  return raw.slice(0, limit).map((r) => {
    const doc = docById.get(r.id);
    return {
      id: r.id,
      lessonId: doc?.lessonId ?? (r as { lessonId?: string }).lessonId ?? "",
      title: doc?.title ?? r.title,
      subtitle: doc?.subtitle ?? "",
      sectionTitle: doc?.sectionTitle ?? "",
      headingId: doc?.headingId ?? "",
      snippet: makeSnippet(doc?.body ?? "", terms),
      score: r.score,
    };
  });
}
