import type { Lesson, Section } from "./types";
import { gettingStarted } from "./getting-started";
import { moduleSystems } from "./module-systems";
import { fundamentals } from "./fundamentals";
import { buildingApps } from "./building-apps";
import { production } from "./production";
import { typescriptLessons } from "./typescript";
import { apiReference } from "./api-reference";
import { guides } from "./guides";
import { cheatsheet } from "./cheatsheet";
import { quizQuestions } from "./quiz";

/** ডকুমেন্টেশনের সব সেকশন — সাইডবারের ও পাঠের ক্রম এখানেই তৈরি হয় */
export const sections: Section[] = [
  {
    id: "getting-started",
    title: "শুরু করা",
    lessons: gettingStarted,
  },
  {
    id: "module-systems",
    title: "জাভাস্ক্রিপ্ট মডিউল সিস্টেম",
    lessons: moduleSystems,
  },
  {
    id: "fundamentals",
    title: "Express.js মূল ধারণা",
    lessons: fundamentals,
  },
  {
    id: "building-apps",
    title: "অ্যাপ্লিকেশন তৈরি",
    lessons: buildingApps,
  },
  {
    id: "production",
    title: "প্রোডাকশন প্রস্তুতি",
    lessons: production,
  },
  {
    id: "typescript",
    title: "TypeScript",
    lessons: typescriptLessons,
  },
  {
    id: "api-reference",
    title: "API রেফারেন্স",
    lessons: apiReference,
  },
  {
    id: "guides",
    title: "গাইড ও রিসোর্স",
    lessons: guides,
  },
];

/** সব পাঠ ক্রম ধরে সমতল তালিকায় — প্রগ্রেস, prev/next ও সার্চের জন্য
 * (চিটশিট শেষে — নিজস্ব রুট আছে, প্রগ্রেসে গণনা হয় না) */
export const lessons: Lesson[] = [...sections.flatMap((s) => s.lessons), cheatsheet];

/** প্রগ্রেস ট্র্যাকিংয়ে গণনায় আসা পাঠগুলো (চিটশিট বাদ) */
export const trackableLessons: Lesson[] = lessons.filter((l) => !l.noProgress);

export function getLesson(id: string): Lesson | undefined {
  return lessons.find((l) => l.id === id);
}

export function getSectionOf(lessonId: string): Section | undefined {
  return sections.find((s) => s.lessons.some((l) => l.id === lessonId));
}

export { quizQuestions };
export type * from "./types";
