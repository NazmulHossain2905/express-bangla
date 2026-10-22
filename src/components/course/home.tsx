import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Clock,
  FlaskConical,
  Layers,
  MousePointerClick,
  Search,
  Server,
  Sparkles,
  Trophy,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { sections, trackableLessons, quizQuestions } from "@/lib/course";

const BN_DIGITS = "০১২৩৪৫৬৭৮৯";

function toBn(n: number): string {
  return String(n).replace(/\d/g, (d) => BN_DIGITS[Number(d)]);
}

const FEATURES = [
  {
    icon: BookOpen,
    title: "সহজ বাংলায় ব্যাখ্যা",
    desc: "প্রতিটি ধারণা বাংলা উদাহরণ ও তুলনা দিয়ে — টার্ম মুখস্থ নয়, বোঝা হবে।",
  },
  {
    icon: Layers,
    title: "৪০+ গোছানো পাঠ",
    desc: "সেটআপ থেকে TypeScript, নিরাপত্তা আর ডিপ্লয়মেন্ট পর্যন্ত — কোনো জাম্প নেই।",
  },
  {
    icon: Search,
    title: "দ্রুত সার্চ",
    desc: "Ctrl+K চাপুন — বাংলা-ইংরেজি যেকোনো টার্মে সরাসরি সংশ্লিষ্ট অংশে পৌঁছে যান।",
  },
  {
    icon: FlaskConical,
    title: "লাইভ API প্লেগ্রাউন্ড",
    desc: "আসল সার্ভারে GET/POST/PUT/DELETE রিকোয়েস্ট পাঠিয়ে রেসপন্স দেখুন।",
  },
];

function bnToAscii(s: string): string {
  return s.replace(/[০-৯]/g, (d) => String(BN_DIGITS.indexOf(d)));
}

export function Home() {
  const totalMinutes = trackableLessons.reduce((acc, l) => {
    const m = bnToAscii(l.duration).match(/\d+/);
    return acc + (m ? Number(m[0]) : 0);
  }, 0);

  const hours = Math.round(totalMinutes / 60);

  return (
    <div>
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-emerald-950 via-zinc-900 to-zinc-950 text-white mb-8">
        <div
          className="absolute inset-0 opacity-20"
          aria-hidden
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 20%, rgba(16,185,129,0.45) 0%, transparent 45%), radial-gradient(circle at 85% 75%, rgba(16,185,129,0.3) 0%, transparent 40%)",
          }}
        />
        <div className="relative px-6 py-12 md:px-12 md:py-16">
          <Badge className="mb-5 bg-emerald-500/20 text-emerald-300 border-emerald-400/30 hover:bg-emerald-500/20 gap-1.5 py-1.5 px-3">
            <Sparkles className="size-3.5" />
            Express 5.3 · Node.js 24 LTS · TypeScript 7 — সম্পূর্ণ আপডেটেড
          </Badge>
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4 max-w-3xl">
            Express.js শিখুন{" "}
            <span className="bg-gradient-to-r from-emerald-300 to-emerald-500 bg-clip-text text-transparent">
              সম্পূর্ণ বাংলায়
            </span>
          </h1>
          <p className="text-base md:text-lg text-zinc-300 leading-relaxed max-w-2xl mb-8">
            একদম শূন্য থেকে আপনার প্রথম ওয়েব সার্ভার, তারপর REST API, ES Modules আর
            TypeScript পর্যন্ত। কোনো ইংরেজি ডকুমেন্টেশনে হারিয়ে যেতে হবে না — প্রতিটি
            লাইন বাংলায় ব্যাখ্যা করা, হাতে-কলমে অভ্যাসের জন্য লাইভ প্লেগ্রাউন্ড সহ।
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              className="bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold gap-2 min-h-[44px] px-6"
            >
              <Link href="/docs/intro">
                শেখা শুরু করুন
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-emerald-400/40 bg-white/5 text-emerald-100 hover:bg-emerald-500/15 hover:text-white gap-2 min-h-[44px] px-6"
            >
              <Link href="/playground">
                <FlaskConical className="size-4" />
                প্লেগ্রাউন্ড দেখুন
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-10 max-w-2xl">
            {[
              { icon: BookOpen, value: `${toBn(trackableLessons.length)}+`, label: "বিস্তারিত পাঠ" },
              { icon: Clock, value: `${toBn(hours)} ঘণ্টা+`, label: "মোট পড়ার সময়" },
              { icon: MousePointerClick, value: "লাইভ", label: "API প্র্যাকটিস" },
              { icon: Trophy, value: `${toBn(quizQuestions.length)}টি`, label: "কুইজ প্রশ্ন" },
            ].map((s, i) => (
              <div key={i} className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 backdrop-blur-sm">
                <s.icon className="size-4 text-emerald-400 mb-1.5" />
                <p className="text-lg font-bold text-white leading-none">{s.value}</p>
                <p className="text-xs text-zinc-400 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Features ---------- */}
      <h2 className="text-2xl font-bold mb-1 flex items-center gap-2">
        <Zap className="size-5 text-primary" />
        কেন এই কোর্স?
      </h2>
      <p className="text-muted-foreground text-sm mb-5">এই কোর্সে যা যা পাচ্ছেন</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {FEATURES.map((f, i) => (
          <Card key={i} className="border hover:border-primary/40 hover:shadow-md transition-all">
            <CardContent className="p-5">
              <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                <f.icon className="size-5 text-primary" />
              </div>
              <h3 className="font-bold mb-1.5">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ---------- Curriculum ---------- */}
      <h2 className="text-2xl font-bold mb-1 flex items-center gap-2">
        <Server className="size-5 text-primary" />
        পূর্ণ পাঠ্যক্রম
      </h2>
      <p className="text-muted-foreground text-sm mb-5">
        যেকোনো পাঠে ক্লিক করে শুরু করুন — ক্রম অনুযায়ী পড়লে সবচেয়ে ভালো ফল
      </p>
      <div className="space-y-6 mb-10">
        {sections.map((section) => (
          <div key={section.id}>
            <h3 className="text-sm font-bold uppercase tracking-wide text-muted-foreground mb-2.5">
              {section.title}
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {section.lessons.map((lesson) => (
                <Link
                  key={lesson.id}
                  href={`/docs/${lesson.id}`}
                  className="group rounded-xl border bg-card p-4 hover:border-primary/50 hover:shadow-md transition-all flex items-start gap-4 min-h-[44px]"
                  aria-label={lesson.title + " পাঠ শুরু করুন"}
                >
                  <span className="flex-1 min-w-0">
                    <span className="block font-semibold text-[15px] leading-snug group-hover:text-primary transition-colors">
                      {lesson.title}
                    </span>
                    <span className="block text-sm text-muted-foreground mt-0.5 line-clamp-1">
                      {lesson.subtitle}
                    </span>
                  </span>
                  <span className="shrink-0 text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <Clock className="size-3" />
                    {lesson.duration}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ---------- Prerequisites ---------- */}
      <Card className="border-primary/25 bg-primary/5">
        <CardContent className="p-6">
          <h3 className="font-bold text-lg mb-2">কারা এই কোর্স করতে পারবেন?</h3>
          <p className="text-sm text-foreground/80 leading-relaxed max-w-3xl">
            যে কেউ! একটু বেশি ভালো ফলের জন্য JavaScript-এর বেসিক জানা থাকলে ভালো — যেমন
            ভেরিয়েবল (var/let/const), ফাংশন, অ্যারে-অবজেক্ট আর কন্ডিশন। বাকি সবকিছু — Node.js
            ইনস্টল করা থেকে শুরু করে API বানানো পর্যন্ত — আমরা একদম শুরু থেকে দেখাব। টার্মিনাল
            আগে কখনো খুলেননি? চিন্তা নেই, এখানেই খুলবেন!
          </p>
          <div className="mt-4">
            <Button asChild className="gap-2 font-semibold min-h-[44px]">
              <Link href="/docs/intro">
                চলুন, প্রথম পাঠ থেকে শুরু করি
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
