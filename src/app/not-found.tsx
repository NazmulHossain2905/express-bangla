import Link from "next/link";
import { ArrowRight, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DocsShell } from "@/components/course/docs-shell";

export default function NotFound() {
  return (
    <DocsShell>
      <div className="max-w-xl py-16 text-center mx-auto">
        <div className="mx-auto mb-6 size-16 rounded-2xl bg-muted flex items-center justify-center">
          <SearchX className="size-8 text-muted-foreground" />
        </div>
        <h1 className="text-3xl font-extrabold mb-3">পাতাটি খুঁজে পাওয়া গেল না</h1>
        <p className="text-muted-foreground leading-relaxed mb-8">
          আপনি যে ঠিকানায় এসেছেন সেখানে কোনো পাঠ নেই — ঠিক যেমন কোনো না-লেখা রাউটে
          404 আসে! চাইলে হোমে ফিরে যান, কিংবা Ctrl+K চেপে যা খুঁজছিলেন সেটাই সার্চ করুন।
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button asChild className="gap-2 font-semibold min-h-11">
            <Link href="/">
              হোমে ফিরে যান
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="min-h-11">
            <Link href="/docs/intro">প্রথম পাঠ দেখুন</Link>
          </Button>
        </div>
      </div>
    </DocsShell>
  );
}
