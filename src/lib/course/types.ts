export type ContentBlock =
  | { type: "text"; content: string }
  | { type: "heading"; content: string }
  | { type: "code"; code: string; language: string; filename?: string; output?: string }
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
}

export interface QuizQuestion {
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export type SectionId =
  | "home"
  | "intro"
  | "setup"
  | "hello-world"
  | "routing"
  | "middleware"
  | "req-res"
  | "static-files"
  | "forms"
  | "rest-api"
  | "error-handling"
  | "template-engine"
  | "structure"
  | "cheatsheet"
  | "playground"
  | "quiz";
