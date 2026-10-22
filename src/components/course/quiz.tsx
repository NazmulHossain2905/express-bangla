"use client";

import { useState } from "react";
import {
  ArrowRight,
  Award,
  Check,
  PartyPopper,
  RotateCcw,
  Trophy,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { QuizQuestion } from "@/lib/course/types";

interface QuizProps {
  questions: QuizQuestion[];
}

const BANGLA_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

function toBanglaNumber(n: number): string {
  return String(n)
    .split("")
    .map((d) => BANGLA_DIGITS[Number(d)])
    .join("");
}

export function Quiz({ questions }: QuizProps) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answered, setAnswered] = useState(false);

  const question = questions[current];

  const handleSelect = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    if (idx === question.answerIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setAnswered(false);
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setAnswered(false);
  };

  /* ---------- Result screen ---------- */
  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    const message =
      pct >= 90
        ? { icon: PartyPopper, title: "অসাধারণ! আপনি মাস্টার!", desc: "Express-এর মূল ধারণাগুলো আপনি চমৎকারভাবে আয়ত্ত করেছেন। এবার নিজের প্রজেক্ট বানানো শুরু করুন!" }
        : pct >= 70
          ? { icon: Trophy, title: "দুর্দান্ত পারফরম্যান্স!", desc: "বেশিরভাগ প্রশ্নের উত্তর ঠিক করেছেন। ভুলগুলোর ব্যাখ্যা আরেকবার পড়ে নিলেই পূর্ণ নম্বর নিশ্চিত!" }
          : pct >= 40
            ? { icon: Award, title: "ভালো শুরু! আরেকবার চেষ্টা করুন", desc: "বেসিক কিছু জায়গায় ঝাড়পোঁছ দরকার। মিডলওয়্যার আর req/res পাঠগুলো আবার পড়ে কুইজটি দ্বিতীয়বার দিন।" }
            : { icon: RotateCcw, title: "সমস্যা নেই — শেখা এভাবেই হয়!", desc: "পাঠগুলো আবার ধীরে ধীরে পড়ুন, কোডগুলো নিজে চালিয়ে দেখুন। তারপর কুইজে ফিরে আসবেন — এবার নম্বর বাড়বেই!" };

    const ResultIcon = message.icon;

    return (
      <div className="max-w-xl mx-auto text-center py-10">
        <div className="size-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <ResultIcon className="size-10 text-primary" />
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold mb-2">{message.title}</h2>
        <p className="text-muted-foreground mb-6 leading-relaxed">{message.desc}</p>

        <div className="rounded-2xl border bg-card p-6 mb-6">
          <p className="text-sm text-muted-foreground mb-1">আপনার স্কোর</p>
          <p className="text-5xl font-extrabold text-primary">
            {toBanglaNumber(score)}
            <span className="text-2xl text-muted-foreground"> / {toBanglaNumber(questions.length)}</span>
          </p>
          <div className="mt-4">
            <Progress value={pct} className="h-2.5" />
          </div>
          <p className="text-xs text-muted-foreground mt-2">{toBanglaNumber(pct)}% সঠিক</p>
        </div>

        <Button size="lg" onClick={handleRestart} className="gap-2 font-semibold min-h-[44px] px-8">
          <RotateCcw className="size-4" />
          আবার চেষ্টা করুন
        </Button>
      </div>
    );
  }

  /* ---------- Question screen ---------- */
  const isCorrect = selected === question.answerIndex;

  return (
    <div className="max-w-2xl">
      {/* Progress */}
      <div className="flex items-center justify-between mb-4">
        <Badge variant="secondary" className="font-semibold">
          প্রশ্ন {toBanglaNumber(current + 1)} / {toBanglaNumber(questions.length)}
        </Badge>
        <Badge variant="outline" className="text-muted-foreground">
          বর্তমান স্কোর: {toBanglaNumber(score)}
        </Badge>
      </div>
      <Progress value={((current + 1) / questions.length) * 100} className="h-2 mb-8" />

      {/* Question */}
      <h2 className="text-xl md:text-2xl font-bold leading-relaxed mb-6">{question.question}</h2>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {question.options.map((option, idx) => {
          const isThisSelected = selected === idx;
          const isAnswer = idx === question.answerIndex;

          let cls =
            "border bg-card hover:border-primary/60 hover:bg-primary/5 transition-all text-left";
          if (answered) {
            if (isAnswer) {
              cls = "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300";
            } else if (isThisSelected) {
              cls = "border-red-500 bg-red-500/10 text-red-700 dark:text-red-300";
            } else {
              cls = "border bg-card opacity-60";
            }
          } else if (isThisSelected) {
            cls = "border-primary bg-primary/5";
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={answered}
              className={`w-full rounded-xl border px-4 py-3.5 flex items-center gap-3 min-h-[48px] transition-all ${cls}`}
              aria-label={option}
            >
              <span className="shrink-0 size-7 rounded-full border flex items-center justify-center text-xs font-bold">
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="flex-1 text-[15px] font-medium">{option}</span>
              {answered && isAnswer && <Check className="size-5 text-emerald-500 shrink-0" />}
              {answered && isThisSelected && !isAnswer && (
                <X className="size-5 text-red-500 shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {answered && (
        <div
          className={`rounded-xl border p-4 mb-6 ${
            isCorrect
              ? "border-emerald-500/30 bg-emerald-500/10"
              : "border-amber-500/30 bg-amber-500/10"
          }`}
        >
          <p className="font-bold mb-1 flex items-center gap-2">
            {isCorrect ? (
              <>
                <Check className="size-4 text-emerald-500" />
                ঠিক উত্তর!
              </>
            ) : (
              <>
                <X className="size-4 text-amber-500" />
                একটু ভুল হয়েছে
              </>
            )}
          </p>
          <p className="text-sm leading-relaxed text-foreground/85">{question.explanation}</p>
        </div>
      )}

      {/* Next button */}
      <div className="flex justify-end">
        <Button
          onClick={handleNext}
          disabled={!answered}
          className="gap-2 font-semibold min-h-[44px] px-6"
        >
          {current + 1 >= questions.length ? "ফলাফল দেখুন" : "পরের প্রশ্ন"}
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
