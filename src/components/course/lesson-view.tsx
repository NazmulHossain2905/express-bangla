import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Lesson } from "@/lib/course/types";
import { BlockRenderer } from "./blocks";
import { CompleteButton, LessonStatusBadge } from "./lesson-progress";

interface LessonViewProps {
  lesson: Lesson;
  index: number;
  total: number;
  prev?: { id: string; title: string };
  next?: { id: string; title: string };
}

export function LessonView({ lesson, index, total, prev, next }: LessonViewProps) {
  return (
    <article className="max-w-3xl">
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
          <LessonStatusBadge lessonId={lesson.id} />
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
      {!lesson.noProgress && <CompleteButton lessonId={lesson.id} />}

      {/* Prev / Next */}
      <div className="flex items-stretch justify-between gap-3 pb-4">
        {prev ? (
          <Button
            asChild
            variant="outline"
            className="gap-2 min-h-[48px] max-w-[48%] justify-start"
          >
            <Link href={`/docs/${prev.id}`} aria-label="আগের পাঠে যান">
              <ArrowLeft className="size-4 shrink-0" />
              <span className="flex flex-col items-start overflow-hidden text-left">
                <span className="text-[10px] text-muted-foreground leading-none">
                  আগের পাঠ
                </span>
                <span className="text-sm truncate max-w-full">{prev.title}</span>
              </span>
            </Link>
          </Button>
        ) : (
          <div className="flex-1" />
        )}
        {next ? (
          <Button asChild className="gap-2 min-h-[48px] max-w-[48%] justify-end">
            <Link href={`/docs/${next.id}`} aria-label="পরের পাঠে যান">
              <span className="flex flex-col items-end overflow-hidden text-right">
                <span className="text-[10px] text-primary-foreground/70 leading-none">
                  পরের পাঠ
                </span>
                <span className="text-sm truncate max-w-full">{next.title}</span>
              </span>
              <ArrowRight className="size-4 shrink-0" />
            </Link>
          </Button>
        ) : (
          <div className="flex-1" />
        )}
      </div>
    </article>
  );
}
