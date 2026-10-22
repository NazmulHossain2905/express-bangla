import type { Lesson, QuizQuestion } from "./types";
import { lessonsPart1 } from "./lessons-part1";
import { lessonsPart2 } from "./lessons-part2";
import { lessonsPart3 } from "./lessons-part3";
import { cheatsheet } from "./cheatsheet";
import { quizQuestions } from "./quiz";

export const lessons: Lesson[] = [
  ...lessonsPart1,
  ...lessonsPart2,
  ...lessonsPart3,
  cheatsheet,
];

export { quizQuestions };
export type * from "./types";
