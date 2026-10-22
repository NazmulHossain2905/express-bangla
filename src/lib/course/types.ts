export type CodeVariant = "cjs" | "esm" | "ts";

export type ContentBlock =
  | { type: "text"; content: string }
  | { type: "heading"; content: string }
  | {
      type: "code";
      code: string;
      language: string;
      filename?: string;
      output?: string;
      /** কোন মডিউল সিস্টেমের উদাহরণ — কোড ব্লকের হেডারে ব্যাজ হিসেবে দেখানো হয় */
      variant?: CodeVariant;
    }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "tip"; content: string }
  | { type: "warning"; content: string }
  | { type: "note"; content: string }
  | { type: "table"; headers: string[]; rows: string[][] };

export interface Lesson {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  blocks: ContentBlock[];
  /** সার্চ র‍্যাংকিং উন্নত করার জন্য অতিরিক্ত ইংরেজি/বাংলা কীওয়ার্ড */
  keywords?: string[];
  /** প্রগ্রেস ট্র্যাকিং থেকে বাদ দিতে হবে কি না (যেমন চিটশিট) */
  noProgress?: boolean;
}

export interface Section {
  id: string;
  /** সাইডবারে দেখানো সেকশনের নাম */
  title: string;
  lessons: Lesson[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}
