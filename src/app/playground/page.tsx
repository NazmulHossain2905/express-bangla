import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { DocsShell } from "@/components/course/docs-shell";
import { Playground } from "@/components/course/playground";

export const metadata: Metadata = {
  title: "লাইভ REST API প্লেগ্রাউন্ড",
  description:
    "আসল সার্ভারে GET/POST/PUT/DELETE রিকোয়েস্ট পাঠিয়ে Express শেখার সবচেয়ে মজার উপায় — ব্রাউজার থেকেই।",
  alternates: { canonical: "/playground" },
};

export default function PlaygroundPage() {
  return (
    <DocsShell>
      <div>
        <div className="mb-8 pb-6 border-b max-w-3xl">
          <Badge variant="secondary" className="font-semibold mb-3">
            ইন্টারঅ্যাক্টিভ প্র্যাকটিস
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
    </DocsShell>
  );
}
