"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bookmark,
  CheckCircle2,
  FlaskConical,
  Home as HomeIcon,
  Menu,
  Moon,
  Search,
  Sun,
  Trophy,
  Zap,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { sections, trackableLessons } from "@/lib/course";
import { useCompletedLessons, useHydrated } from "@/lib/progress";
import { SearchDialog } from "./search-dialog";

const SPECIAL = [
  { href: "/docs/cheatsheet", label: "Express চিটশিট", icon: Bookmark },
  { href: "/playground", label: "লাইভ প্লেগ্রাউন্ড", icon: FlaskConical },
  { href: "/quiz", label: "শেষ কুইজ", icon: Trophy },
];

function SidebarNav({ active, completed }: { active: string; completed: string[] }) {
  return (
    <nav className="flex flex-col gap-1" aria-label="ডকুমেন্টেশন নেভিগেশন">
      <Link
        href="/"
        className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors min-h-[44px] ${
          active === "/" || active.startsWith("/docs") === false
            ? active === "/"
              ? "bg-primary/10 text-primary"
              : "text-foreground/80 hover:bg-muted"
            : "text-foreground/80 hover:bg-muted"
        }`}
      >
        <HomeIcon className="size-4 shrink-0" />
        হোম
      </Link>

      {sections.map((section) => (
        <div key={section.id}>
          <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground px-3 pt-4 pb-1.5">
            {section.title}
          </p>
          {section.lessons.map((lesson) => {
            const href = `/docs/${lesson.id}`;
            const isActive = active === href;
            const isDone = completed.includes(lesson.id);
            const globalIndex = trackableLessons.findIndex((l) => l.id === lesson.id);
            return (
              <Link
                key={lesson.id}
                href={href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors text-left min-h-[44px] ${
                  isActive
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-foreground/80 hover:bg-muted"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                <span
                  className={`shrink-0 size-6 rounded-md text-xs font-bold flex items-center justify-center ${
                    lesson.noProgress
                      ? "bg-muted text-muted-foreground"
                      : isDone
                        ? "bg-primary text-primary-foreground"
                        : isActive
                          ? "bg-primary/20 text-primary"
                          : "bg-muted text-muted-foreground"
                  }`}
                >
                  {globalIndex >= 0 && !lesson.noProgress ? globalIndex + 1 : "★"}
                </span>
                <span className="flex-1 leading-snug">{lesson.title}</span>
                {isDone && <CheckCircle2 className="size-4 text-primary shrink-0" />}
              </Link>
            );
          })}
        </div>
      ))}

      <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground px-3 pt-4 pb-1.5">
        অভ্যাস ও যাচাই
      </p>
      {SPECIAL.map((s) => (
        <Link
          key={s.href}
          href={s.href}
          className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors min-h-[44px] ${
            active === s.href
              ? "bg-primary/10 text-primary"
              : "text-foreground/80 hover:bg-muted"
          }`}
        >
          <s.icon className="size-4 shrink-0" />
          {s.label}
        </Link>
      ))}
    </nav>
  );
}

export function DocsShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useHydrated();
  const completed = useCompletedLessons();

  const progressPct = Math.round((completed.length / trackableLessons.length) * 100);

  /* কীবোর্ড শর্টকাট: Ctrl+K / Cmd+K — আর ইনপুটে না থাকলে "/" */
  const onKey = useCallback(
    (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen((v) => !v);
        return;
      }
      if (e.key === "/" && !searchOpen) {
        const t = e.target as HTMLElement | null;
        const tag = t?.tagName?.toLowerCase();
        if (tag === "input" || tag === "textarea" || t?.isContentEditable) return;
        e.preventDefault();
        setSearchOpen(true);
      }
    },
    [searchOpen]
  );

  useEffect(() => {
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onKey]);

  // মোবাইল মেনু খোলা অবস্থায় স্ক্রল আটকে রাখার দরকার নেই — Sheet নিজেই সামলায়
  const sidebarNav = <SidebarNav active={pathname} completed={completed} />;

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
              {sidebarNav}
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group"
            aria-label="হোমপেজে ফিরে যান"
          >
            <span className="size-9 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-sm group-hover:shadow transition-shadow">
              <Zap className="size-5 text-white" />
            </span>
            <span className="text-left leading-tight">
              <span className="block font-extrabold text-[15px]">এক্সপ্রেস শিখি</span>
              <span className="block text-[11px] text-muted-foreground">
                Express.js বাংলা ডকুমেন্টেশন
              </span>
            </span>
          </Link>

          <div className="flex-1" />

          {/* Search */}
          <button
            onClick={() => setSearchOpen(true)}
            className="hidden sm:flex items-center gap-2 h-9 w-64 rounded-lg border bg-muted/50 px-3 text-sm text-muted-foreground transition-colors hover:bg-muted"
            aria-label="ডকুমেন্টেশন সার্চ খুলুন"
          >
            <Search className="size-4 shrink-0" />
            <span className="flex-1 text-left truncate">পাঠ খুঁজুন…</span>
            <kbd className="pointer-events-none h-5 select-none items-center gap-0.5 rounded border bg-background px-1.5 font-mono text-[10px] font-medium flex">
              Ctrl K
            </kbd>
          </button>
          <Button
            variant="ghost"
            size="icon"
            className="sm:hidden min-h-[44px] min-w-[44px]"
            onClick={() => setSearchOpen(true)}
            aria-label="সার্চ করুন"
          >
            <Search className="size-5" />
          </Button>

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
            {sidebarNav}
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 min-w-0">{children}</main>
      </div>

      {/* ---------- Footer ---------- */}
      <footer className="mt-auto border-t bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          <p className="flex items-center gap-1.5">
            <Zap className="size-4 text-primary" />
            এক্সপ্রেস শিখি — Node.js LTS 24 + Express 5.3 + TypeScript 7 অনুযায়ী
          </p>
          <p className="text-xs">
            Node.js ইঞ্জিন, Express গাড়ি — আর চালক তো আপনিই!
          </p>
        </div>
      </footer>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </div>
  );
}
