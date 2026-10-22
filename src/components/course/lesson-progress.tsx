"use client";

import { CheckCircle2, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toggleCompleted, useCompletedLessons } from "@/lib/progress";

/** হেডারের "সম্পন্ন" ব্যাজ */
export function LessonStatusBadge({ lessonId }: { lessonId: string }) {
  const completed = useCompletedLessons();
  if (!completed.includes(lessonId)) return null;
  return (
    <Badge className="gap-1 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-0 hover:bg-emerald-500/15">
      <CheckCircle2 className="size-3" />
      সম্পন্ন
    </Badge>
  );
}

/** নিচের টগল বাটন */
export function CompleteButton({ lessonId }: { lessonId: string }) {
  const completed = useCompletedLessons();
  const isCompleted = completed.includes(lessonId);

  return (
    <div className="my-8 flex justify-center">
      <Button
        size="lg"
        variant={isCompleted ? "outline" : "default"}
        onClick={() => toggleCompleted(lessonId)}
        className={`gap-2 font-semibold min-h-[44px] px-8 ${
          isCompleted
            ? "border-emerald-500/50 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10"
            : ""
        }`}
      >
        {isCompleted ? (
          <>
            <CheckCircle2 className="size-5" />
            পাঠ সম্পন্ন করা হয়েছে
          </>
        ) : (
          <>
            <Circle className="size-5" />
            এই পাঠটি সম্পন্ন করেছি
          </>
        )}
      </Button>
    </div>
  );
}
