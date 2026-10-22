"use client";

import { useCallback, useMemo, useState, useSyncExternalStore } from "react";
import {
  BookOpen,
  Bookmark,
  CheckCircle2,
  FlaskConical,
  Home as HomeIcon,
  Menu,
  Moon,
  Sun,
  Trophy,
  X,
  Zap,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { lessons, quizQuestions } from "@/lib/course";
import type { SectionId } from "@/lib/course/types";
import { Home } from "./home";
import { LessonView } from "./lesson-view";
import { Quiz } from "./quiz";
import { Playground } from "./playground";

const STORAGE_KEY = "express-shikhi-progress";

/* ---------- External store for persisted progress (hydration-safe) ---------- */
const EMPTY_COMPLETED: string[] = [];
let completedCache: string[] = EMPTY_COMPLETED;

function readCompleted(): string[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    if (Array.isArray(parsed)) {
      const list = parsed.filter((x): x is string => typeof x === "string");
      if (JSON.stringify(list) !== JSON.stringify(completedCache)) {
        completedCache = list;
      }
    }
  } catch {
    if (completedCache !== EMPTY_COMPLETED) completedCache = EMPTY_COMPLETED;
  }
  return completedCache;
}

const progressListeners = new Set<() => void>();

function subscribeProgress(listener: () => void) {
  progressListeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    progressListeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function writeCompleted(next: string[]) {
  completedCache = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // storage unavailable — keep in-memory only
  }
  progressListeners.forEach((l) => l());
}

function useHydrated() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

const SPECIAL_SECTIONS: { id: SectionId; label: string; icon: typeof HomeIcon }[] = [
  { id: "cheatsheet", label: "Express চিটশিট", icon: Bookmark },
  { id: "playground", label: "লাইভ প্লেগ্রাউন্ড", icon: FlaskConical },
  { id: "quiz", label: "শেষ কুইজ", icon: Trophy },
];

export function CoursePlatform() {
  const [active, setActive] = useState<SectionId>("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useHydrated();
  const completed = useSyncExternalStore(subscribeProgress, readCompleted, () => EMPTY_COMPLETED);

  const toggleComplete = useCallback((id: string) => {
    const current = readCompleted();
    writeCompleted(
      current.includes(id) ? current.filter((x) => x !== id) : [...current, id]
    );
  }, []);

  const navigate = useCallback((section: SectionId) => {
    setActive(section);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const activeIndex = useMemo(() => lessons.findIndex((l) => l.id === active), [active]);
  const currentLesson = activeIndex >= 0 ? lessons[activeIndex] : null;
  const progressPct = Math.round((completed.length / lessons.length) * 100);

  const goPrev = () => activeIndex > 0 && navigate(lessons[activeIndex - 1].id);
  const goNext = () =>
    activeIndex >= 0 && activeIndex < lessons.length - 1 && navigate(lessons[activeIndex + 1].id);

  /* ---------- Sidebar content (shared between desktop & mobile) ---------- */
  const SidebarNav = (
    <nav className="flex flex-col gap-1" aria-label="কোর্স নেভিগেশন">
      <button
        onClick={() => navigate("home")}
        className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors min-h-[44px] ${
          active === "home"
            ? "bg-primary/10 text-primary"
            : "text-foreground/80 hover:bg-muted"
        }`}
      >
        <HomeIcon className="size-4 shrink-0" />
        কোর্স পরিচিতি
      </button>

      <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground px-3 pt-4 pb-1.5">
        পাঠসমূহ
      </p>
      {lessons.map((lesson, i) => {
        const isActive = active === lesson.id;
        const isDone = completed.includes(lesson.id);
        return (
          <button
            key={lesson.id}
            onClick={() => navigate(lesson.id as SectionId)}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors text-left min-h-[44px] ${
              isActive
                ? "bg-primary/10 text-primary font-semibold"
                : "text-foreground/80 hover:bg-muted"
            }`}
            aria-current={isActive ? "page" : undefined}
          >
            <span
              className={`shrink-0 size-6 rounded-md text-xs font-bold flex items-center justify-center ${
                isDone
                  ? "bg-primary text-primary-foreground"
                  : isActive
                    ? "bg-primary/20 text-primary"
                    : "bg-muted text-muted-foreground"
              }`}
            >
              {i + 1}
            </span>
            <span className="flex-1 leading-snug">{lesson.title}</span>
            {isDone && <CheckCircle2 className="size-4 text-primary shrink-0" />}
          </button>
        );
      })}

      <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground px-3 pt-4 pb-1.5">
        অভ্যাস ও যাচাই
      </p>
      {SPECIAL_SECTIONS.map((s) => (
        <button
          key={s.id}
          onClick={() => navigate(s.id)}
          className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors min-h-[44px] ${
            active === s.id
              ? "bg-primary/10 text-primary"
              : "text-foreground/80 hover:bg-muted"
          }`}
        >
          <s.icon className="size-4 shrink-0" />
          {s.label}
        </button>
      ))}
    </nav>
  );

  /* ---------- Content ---------- */
  const renderContent = () => {
    if (active === "home") {
      return (
        <Home
          lessons={lessons}
          onStart={() => navigate("intro")}
          onOpenPlayground={() => navigate("playground")}
          onSelectLesson={(id) => navigate(id as SectionId)}
        />
      );
    }

    if (active === "quiz") {
      return (
        <div className="max-w-3xl">
          <div className="mb-8 pb-6 border-b">
            <Badge variant="secondary" className="font-semibold mb-3">
              ফাইনাল কুইজ
            </Badge>
            <h1 className="text-2xl md:text-3xl font-extrabold mb-2">
              কতটা শিখলেন, যাচাই করুন!
            </h1>
            <p className="text-muted-foreground">
              ১০টি প্রশ্ন — পাঠগুলো পড়ে থাকলে সব উত্তর জানা থাকার কথা। প্রতিটি উত্তরের সাথে
              ব্যাখ্যা দেখতে পাবেন, তাই ভুলে ভয় নেই — ভুল থেকেই শেখা হয়!
            </p>
          </div>
          <Quiz questions={quizQuestions} />
        </div>
      );
    }

    if (active === "playground") {
      return (
        <div>
          <div className="mb-8 pb-6 border-b max-w-3xl">
            <Badge variant="secondary" className="font-semibold mb-3">
              ইন্টারেক্টিভ প্র্যাকটিস
            </Badge>
            <h1 className="text-2xl md:text-3xl font-extrabold mb-2">
              লাইভ REST API প্লেগ্রাউন্ড
            </h1>
            <p className="text-muted-foreground">
              আসল সার্ভারে রিকোয়েস্ট পাঠিয়ে Express শেখার সবচেয়ে মজার উপায়।
            </p>
          </div>
          <Playground />
        </div>
      );
    }

    if (currentLesson) {
      const isCheatsheet = currentLesson.id === "cheatsheet";
      return (
        <LessonView
          key={currentLesson.id}
          lesson={currentLesson}
          index={activeIndex}
          total={lessons.length}
          isCompleted={completed.includes(currentLesson.id)}
          showComplete={!isCheatsheet}
          prevTitle={activeIndex > 0 ? lessons[activeIndex - 1].title : undefined}
          nextTitle={
            activeIndex < lessons.length - 1 ? lessons[activeIndex + 1].title : undefined
          }
          onToggleComplete={() => toggleComplete(currentLesson.id)}
          onPrev={goPrev}
          onNext={goNext}
        />
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* ---------- Header ---------- */}
      <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center gap-3">
          {/* Mobile menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="মেনু খুলুন">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[300px] overflow-y-auto p-4"
              aria-describedby={undefined}
            >
              <SheetHeader className="p-0 pb-3 text-left">
                <SheetTitle className="flex items-center gap-2 text-base">
                  <span className="size-8 rounded-lg bg-primary flex items-center justify-center">
                    <Zap className="size-4.5 text-primary-foreground" />
                  </span>
                  এক্সপ্রেস শিখি
                </SheetTitle>
              </SheetHeader>
              {SidebarNav}
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <button
            onClick={() => navigate("home")}
            className="flex items-center gap-2.5 group"
            aria-label="হোমপেজে ফিরে যান"
          >
            <span className="size-9 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-sm group-hover:shadow transition-shadow">
              <Zap className="size-5 text-white" />
            </span>
            <span className="text-left leading-tight">
              <span className="block font-extrabold text-[15px]">এক্সপ্রেস শিখি</span>
              <span className="block text-[11px] text-muted-foreground">
                Express.js বাংলা কোর্স
              </span>
            </span>
          </button>

          <div className="flex-1" />

          {/* Progress + theme */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="w-36">
              <div className="flex items-center justify-between text-[11px] text-muted-foreground mb-1">
                <span>অগ্রগতি</span>
                <span className="font-bold text-primary">{progressPct}%</span>
              </div>
              <Progress value={progressPct} className="h-1.5" />
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            aria-label="থিম পরিবর্তন করুন"
            className="min-h-[44px] min-w-[44px]"
          >
            {mounted && resolvedTheme === "dark" ? (
              <Sun className="size-5" />
            ) : (
              <Moon className="size-5" />
            )}
          </Button>
        </div>
      </header>

      {/* ---------- Body ---------- */}
      <div className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8 flex gap-8">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-72 shrink-0">
          <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-2 pb-8">
            {SidebarNav}
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 min-w-0">{renderContent()}</main>
      </div>

      {/* ---------- Footer ---------- */}
      <footer className="mt-auto border-t bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          <p className="flex items-center gap-1.5">
            <Zap className="size-4 text-primary" />
            এক্সপ্রেস শিখি — বাংলায় Express.js শেখার জার্নি
          </p>
          <p className="text-xs">
            Node.js ইঞ্জিন, Express গাড়ি — আর চালক তো আপনিই!
          </p>
        </div>
      </footer>
    </div>
  );
}
