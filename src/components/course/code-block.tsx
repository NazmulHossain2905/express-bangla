"use client";

import { useState, useCallback } from "react";
import { Check, Copy, Terminal, FileCode2 } from "lucide-react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import js from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import bash from "react-syntax-highlighter/dist/esm/languages/prism/bash";
import json from "react-syntax-highlighter/dist/esm/languages/prism/json";
import markup from "react-syntax-highlighter/dist/esm/languages/prism/markup";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import type { CodeVariant } from "@/lib/course/types";

SyntaxHighlighter.registerLanguage("javascript", js);
SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("json", json);
SyntaxHighlighter.registerLanguage("markup", markup);

const LANG_MAP: Record<string, string> = {
  js: "javascript",
  ts: "typescript",
  typescript: "typescript",
  bash: "bash",
  sh: "bash",
  json: "json",
  html: "markup",
  text: "text",
};

const VARIANT_META: Record<CodeVariant, { label: string; title: string; cls: string }> = {
  cjs: {
    label: "CJS",
    title: "CommonJS উদাহরণ",
    cls: "bg-sky-500/15 text-sky-300 border-sky-400/30",
  },
  esm: {
    label: "ESM",
    title: "ES Modules উদাহরণ",
    cls: "bg-emerald-500/15 text-emerald-300 border-emerald-400/30",
  },
  ts: {
    label: "TS",
    title: "TypeScript উদাহরণ",
    cls: "bg-blue-500/15 text-blue-300 border-blue-400/30",
  },
};

interface CodeBlockProps {
  code: string;
  language: string;
  filename?: string;
  output?: string;
  variant?: CodeVariant;
}

export function CodeBlock({ code, language, filename, output, variant }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
    } catch {
      // Clipboard API অনুপলব্ধ (পারমিশন/পুরনো ব্রাউজার) — legacy fallback
      try {
        const ta = document.createElement("textarea");
        ta.value = code;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        setCopied(true);
      } catch {
        return; // কপি সম্ভব হলো না — চুপচাপ থাকুক
      }
    }
    setTimeout(() => setCopied(false), 1600);
  }, [code]);

  const lang = LANG_MAP[language.toLowerCase()] ?? "text";
  const meta = variant ? VARIANT_META[variant] : null;

  return (
    <div className="my-5 rounded-xl overflow-hidden border border-zinc-700/60 shadow-sm">
      {/* Header bar */}
      <div className="flex items-center justify-between bg-zinc-900 px-4 py-2 border-b border-zinc-700/60">
        <div className="flex items-center gap-2 min-w-0">
          {filename ? (
            <span className="flex items-center gap-1.5 text-xs text-zinc-300 font-mono truncate">
              {lang === "bash" ? (
                <Terminal className="size-3.5 text-emerald-400 shrink-0" />
              ) : (
                <FileCode2 className="size-3.5 text-emerald-400 shrink-0" />
              )}
              <span className="truncate">{filename}</span>
            </span>
          ) : (
            <span className="text-xs uppercase tracking-wide text-zinc-500">{language}</span>
          )}
          {meta && (
            <span
              title={meta.title}
              className={`shrink-0 rounded border px-1.5 py-0.5 text-[10px] font-bold leading-none tracking-wide ${meta.cls}`}
            >
              {meta.label}
            </span>
          )}
        </div>
        <button
          onClick={handleCopy}
          aria-label="কোড কপি করুন"
          className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors rounded-md px-2 py-1 hover:bg-zinc-800 min-h-[28px]"
        >
          {copied ? (
            <>
              <Check className="size-3.5 text-emerald-400" />
              <span className="text-emerald-400">কপি হয়েছে!</span>
            </>
          ) : (
            <>
              <Copy className="size-3.5" />
              <span>কপি</span>
            </>
          )}
        </button>
      </div>

      {/* Code */}
      <div className="bg-zinc-900">
        <SyntaxHighlighter
          language={lang === "typescript" ? "javascript" : lang}
          style={vscDarkPlus}
          customStyle={{
            background: "transparent",
            margin: 0,
            padding: "1rem 1.25rem",
            fontSize: "0.85rem",
            lineHeight: 1.75,
          }}
          codeTagProps={{
            style: {
              fontFamily: "var(--font-jetbrains), ui-monospace, monospace",
            },
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>

      {/* Output */}
      {output && (
        <div className="bg-zinc-800/60 border-t border-zinc-700/60 px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-400/90 mb-1.5">
            আউটপুট
          </p>
          <pre className="text-xs text-zinc-300 whitespace-pre-wrap font-[family-name:var(--font-jetbrains)] leading-relaxed">
            {output}
          </pre>
        </div>
      )}
    </div>
  );
}
