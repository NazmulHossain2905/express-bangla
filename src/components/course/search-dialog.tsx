"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { FileText, Hash, Loader2, Search, SearchX } from "lucide-react";
import MiniSearch from "minisearch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import type { SearchHit } from "@/lib/search";

interface SerializedIndexDoc {
  id: string;
  lessonId: string;
  title: string;
  subtitle: string;
  sectionTitle: string;
  headingId: string;
  body: string;
}

interface SerializedIndex {
  index: ReturnType<MiniSearch["toJSON"]>;
  docs: SerializedIndexDoc[];
}

type SearchEngine = ReturnType<typeof MiniSearch.loadJSON>;

/** সার্চ ইনডেক্স ক্যাশ — প্রথম খোলার পর আর নেটওয়ার্ক ছোঁয় না */
let serializedCache: SerializedIndex | null = null;
let inflight: Promise<SerializedIndex> | null = null;

async function loadIndex(): Promise<SerializedIndex> {
  if (serializedCache) return serializedCache;
  if (!inflight) {
    inflight = fetch("/api/search-index")
      .then((r) => {
        if (!r.ok) throw new Error(`সার্চ ইনডেক্স লোড ব্যর্থ (${r.status})`);
        return r.json();
      })
      .then((data: SerializedIndex) => {
        serializedCache = data;
        return data;
      })
      .finally(() => {
        inflight = null;
      });
  }
  return inflight;
}

const STOP = new Set([
  "কি", "কী", "এবং", "ও", "আর", "থেকে", "জন্য", "হয়", "হবে", "করে",
  "the", "a", "an", "of", "in", "is", "to", "how", "what", "and", "or",
]);

function makeSnippet(body: string, terms: string[]): string {
  const clean = body.replace(/\n+/g, " ").replace(/\s+/g, " ").trim();
  if (!clean) return "";
  const lower = clean.toLowerCase();
  let pos = -1;
  for (const t of terms) {
    if (t.length < 2) continue;
    const p = lower.indexOf(t.toLowerCase());
    if (p !== -1 && (pos === -1 || p < pos)) pos = p;
  }
  const start = Math.max(0, pos === -1 ? 0 : pos - 60);
  const end = Math.min(clean.length, start + 180);
  let s = start > 0 ? "…" + clean.slice(start, end) : clean.slice(start, end);
  if (end < clean.length) s += "…";
  return s;
}

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function Highlight({ text, terms }: { text: string; terms: string[] }) {
  const pattern = terms
    .filter((t) => t.length > 1)
    .map((t) => escapeRegExp(t.trim()))
    .filter(Boolean);
  if (!pattern.length) return <>{text}</>;
  const re = new RegExp(`(${pattern.join("|")})`, "gi");
  const parts = text.split(re);
  return (
    <>
      {parts.map((part, i) =>
        re.test(part) && part ? (
          <mark key={i} className="bg-primary/20 text-primary rounded-sm px-0.5">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

export function SearchDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const [engine, setEngine] = useState<SearchEngine | null>(null);
  const [docMap, setDocMap] = useState<Map<string, SerializedIndexDoc> | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // প্রথম খোলার সময় ইনডেক্স লোড
  useEffect(() => {
    if (!open || engine) return;
    let cancelled = false;
    loadIndex()
      .then((data) => {
        if (cancelled) return;
        setEngine(
          MiniSearch.loadJSON(JSON.stringify(data.index), {
            fields: ["title", "subtitle", "body", "keywords", "sectionTitle"],
          })
        );
        setDocMap(new Map(data.docs.map((d) => [d.id, d])));
      })
      .catch(() => {
        if (!cancelled) setLoadError(true);
      });
    return () => {
      cancelled = true;
    };
  }, [open, engine]);

  useEffect(() => {
    if (open) {
      // cmdk-র autofocus একটু দেরিতে কাজ করে কখনো কখনো
      const t = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
  }, [open]);

  const terms = useMemo(
    () =>
      query
        .split(/[\s,;:?().!]+/u)
        .filter((t) => t.length > 1 && !STOP.has(t.toLowerCase())),
    [query]
  );

  const hits: SearchHit[] = useMemo(() => {
    if (!engine || !docMap || !query.trim()) return [];
    let raw;
    try {
      raw = engine.search(query, {
        boost: { title: 5, keywords: 3, subtitle: 2, sectionTitle: 2, body: 1 },
        prefix: true,
        fuzzy: 0.2,
        combineWith: "AND",
      });
      if (raw.length === 0 && query.includes(" ")) {
        raw = engine.search(query, {
          boost: { title: 5, keywords: 3, subtitle: 2, sectionTitle: 2, body: 1 },
          prefix: true,
          fuzzy: 0.2,
          combineWith: "OR",
        });
      }
    } catch {
      return [];
    }
    return raw.slice(0, 12).map((r) => {
      const doc = docMap.get(String(r.id));
      return {
        id: String(r.id),
        lessonId: doc?.lessonId ?? "",
        title: doc?.title ?? "",
        subtitle: doc?.subtitle ?? "",
        sectionTitle: doc?.sectionTitle ?? "",
        headingId: doc?.headingId ?? "",
        snippet: makeSnippet(doc?.body ?? "", terms),
        score: r.score,
      };
    });
  }, [engine, docMap, query, terms]);

  const goto = useCallback(
    (hit: SearchHit) => {
      const hash = hit.headingId ? `#${hit.headingId}` : "";
      router.push(`/docs/${hit.lessonId}${hash}`);
      onOpenChange(false);
    },
    [router, onOpenChange]
  );

  const isLoading = open && !engine && !loadError;

  const handleOpenChange = (next: boolean) => {
    if (next) setQuery("");
    onOpenChange(next);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        aria-describedby={undefined}
        className="max-w-xl top-[15%] translate-y-0 p-0 gap-0 overflow-hidden rounded-xl border shadow-2xl"
        showCloseButton={false}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>ডকুমেন্টেশন খুঁজুন</DialogTitle>
        </DialogHeader>
        <Command shouldFilter={false} className="rounded-xl">
          <div className="flex items-center gap-2 border-b px-3">
            <Search className="size-4 shrink-0 text-muted-foreground" />
            <CommandInput
              ref={inputRef}
              value={query}
              onValueChange={setQuery}
              placeholder="পাঠ, টপিক বা কীওয়ার্ড লিখুন - (যেমন: middleware, esm, টাইপস্ক্রিপ্ট)"
              className="flex h-12 w-full truncate border-0 bg-transparent text-[15px] placeholder:text-muted-foreground/70 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground sm:flex">
              ESC
            </kbd>
          </div>

          <CommandList className="max-h-[55vh] p-2">
            {loadError && (
              <div className="flex flex-col items-center gap-2 py-10 text-center text-sm text-muted-foreground">
                <SearchX className="size-8 opacity-50" />
                সার্চ ইনডেক্স লোড করা যায়নি — ইন্টারনেট সংযোগ দেখে আবার চেষ্টা করুন।
              </div>
            )}

            {isLoading && (
              <div className="flex items-center justify-center gap-2 py-10 text-sm text-muted-foreground">
                <Loader2 className="size-4 animate-spin" />
                সার্চ প্রস্তুত হচ্ছে…
              </div>
            )}

            {engine && !query.trim() && (
              <div className="px-2 py-8 text-center text-sm text-muted-foreground">
                <p className="mb-1 font-medium text-foreground/70">সার্চ শুরু করুন</p>
                <p className="text-xs leading-relaxed">
                  বাংলা বা ইংরেজি — দুই ভাষাতেই খুঁজা যায়।<br />
                  যেমন: <button className="text-primary underline underline-offset-2" onClick={() => setQuery("middleware")}>middleware</button>,{" "}
                  <button className="text-primary underline underline-offset-2" onClick={() => setQuery("esm")}>esm</button>,{" "}
                  <button className="text-primary underline underline-offset-2" onClick={() => setQuery("ভ্যালিডেশন")}>ভ্যালিডেশন</button>
                </p>
              </div>
            )}

            {engine && query.trim() && hits.length === 0 && (
              <CommandEmpty className="py-10 text-center">
                <SearchX className="mx-auto mb-2 size-8 opacity-50" />
                <p className="text-sm font-medium">কিছু পাওয়া গেল না</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  অন্য শব্দে চেষ্টা করুন — ইংরেজি টার্মে বেশি ভাগ্য (যেমন routing, zod)
                </p>
              </CommandEmpty>
            )}

            {hits.length > 0 && (
              <CommandGroup
                heading={`${hits.length} টি ফলাফল`}
                className="[&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold"
              >
                {hits.map((hit) => (
                  <CommandItem
                    key={hit.id}
                    value={hit.id}
                    onSelect={() => goto(hit)}
                    className="gap-3 rounded-lg px-2 py-2.5 cursor-pointer"
                  >
                    <span
                      className={cn(
                        "shrink-0 size-7 rounded-md flex items-center justify-center",
                        hit.headingId
                          ? "bg-muted text-muted-foreground"
                          : "bg-primary/15 text-primary"
                      )}
                    >
                      {hit.headingId ? <Hash className="size-3.5" /> : <FileText className="size-3.5" />}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-baseline gap-x-2">
                        <span className="truncate text-sm font-semibold">
                          <Highlight text={hit.title} terms={terms} />
                        </span>
                        <span className="shrink-0 rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                          {hit.sectionTitle}
                        </span>
                      </span>
                      {hit.snippet && (
                        <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground line-clamp-2">
                          <Highlight text={hit.snippet} terms={terms} />
                        </span>
                      )}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>

          <div className="border-t bg-muted/30 px-3 py-2 text-[11px] text-muted-foreground flex items-center justify-between">
            <span>↑↓ বৈষম্য • Enter খোলা • Esc বন্ধ</span>
            <span className="font-mono">Ctrl+K</span>
          </div>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
