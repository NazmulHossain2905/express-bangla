"use client";

import { useEffect, useRef } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Circle,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Lesson } from "@/lib/course/types";
import { BlockRenderer } from "./blocks";

interface LessonViewProps {
  lesson: Lesson;
  index: number;
  total: number;
  isCompleted: boolean;
  showComplete?: boolean;
  prevTitle?: string;
  nextTitle?: string;
  onToggleComplete: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function LessonView({
  lesson,
  index,
  total,
  isCompleted,
  showComplete = true,
  prevTitle,
  nextTitle,
  onToggleComplete,
  onPrev,
  onNext,
}: LessonViewProps) {
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [lesson.id]);

  return (
    <article className="max-w-3xl">
      <div ref={topRef} className="scroll-mt-28" />

      {/* Header */}
      <div className="mb-8 pb-6 border-b">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Badge variant="secondary" className="font-semibold">
            পাঠ {index + 1} / {total}
          </Badge>
          <Badge variant="outline" className="gap-1 text-muted-foreground">
            <Clock className="size-3" />
            {lesson.duration}
          </Badge>
          {isCompleted && (
            <Badge className="gap-1 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-0 hover:bg-emerald-500/15">
              <CheckCircle2 className="size-3" />
              সম্পন্ন
            </Badge>
          )}
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold leading-snug mb-2">
          {lesson.title}
        </h1>
        <p className="text-muted-foreground">{lesson.subtitle}</p>
      </div>

      {/* Content */}
      <div>
        {lesson.blocks.map((block, i) => (
          <BlockRenderer key={i} block={block} />
        ))}
      </div>

      {/* Complete button */}
      {showComplete && (
        <div className="my-8 flex justify-center">
        <Button
          size="lg"
          variant={isCompleted ? "outline" : "default"}
          onClick={onToggleComplete}
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
      )}

      {/* Prev / Next */}
      <div className="flex items-stretch justify-between gap-3 pb-4">
        {prevTitle ? (
          <Button
            variant="outline"
            onClick={onPrev}
            className="gap-2 min-h-[48px] max-w-[48%] justify-start"
            aria-label="আগের পাঠে যান"
          >
            <ArrowLeft className="size-4 shrink-0" />
            <span className="flex flex-col items-start overflow-hidden text-left">
              <span className="text-[10px] text-muted-foreground leading-none">আগের পাঠ</span>
              <span className="text-sm truncate max-w-full">{prevTitle}</span>
            </span>
          </Button>
        ) : (
          <div className="flex-1" />
        )}
        {nextTitle ? (
          <Button
            onClick={onNext}
            className="gap-2 min-h-[48px] max-w-[48%] justify-end"
            aria-label="পরের পাঠে যান"
          >
            <span className="flex flex-col items-end overflow-hidden text-right">
              <span className="text-[10px] text-primary-foreground/70 leading-none">পরের পাঠ</span>
              <span className="text-sm truncate max-w-full">{nextTitle}</span>
            </span>
            <ArrowRight className="size-4 shrink-0" />
          </Button>
        ) : (
          <div className="flex-1" />
        )}
      </div>
    </article>
  );
}
