import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { DocsShell } from "@/components/course/docs-shell";
import { Quiz } from "@/components/course/quiz";
import { quizQuestions } from "@/lib/course";

export const metadata: Metadata = {
  title: "শেষ কুইজ",
  description:
    "Express.js শেখা যাচাই করুন — CommonJS/ESM, রাউটিং, মিডলওয়্যার, REST API ও TypeScript বিষয়ে ব্যাখ্যাসহ প্রশ্ন।",
  alternates: { canonical: "/quiz" },
};

export default function QuizPage() {
  return (
    <DocsShell>
      <div className="max-w-3xl">
        <div className="mb-8 pb-6 border-b">
          <Badge variant="secondary" className="font-semibold mb-3">
            ফাইনাল কুইজ
          </Badge>
          <h1 className="text-2xl md:text-3xl font-extrabold mb-2">
            কতটা শিখলেন, যাচাই করুন!
          </h1>
          <p className="text-muted-foreground">
            {quizQuestions.length}টি প্রশ্ন — পাঠগুলো পড়ে থাকলে সব উত্তর জানা থাকার কথা। প্রতিটি উত্তরের সাথে
            ব্যাখ্যা দেখতে পাবেন, তাই ভুলে ভয় নেই — ভুল থেকেই শেখা হয়!
          </p>
        </div>
        <Quiz questions={quizQuestions} />
      </div>
    </DocsShell>
  );
}
