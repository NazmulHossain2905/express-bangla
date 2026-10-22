"use client";

import { useState, useCallback } from "react";
import { Check, Copy, Terminal, FileCode2 } from "lucide-react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import js from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import bash from "react-syntax-highlighter/dist/esm/languages/prism/bash";
import json from "react-syntax-highlighter/dist/esm/languages/prism/json";
import markup from "react-syntax-highlighter/dist/esm/languages/prism/markup";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

SyntaxHighlighter.registerLanguage("javascript", js);
SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("json", json);
SyntaxHighlighter.registerLanguage("markup", markup);

const LANG_MAP: Record<string, string> = {
  js: "javascript",
  bash: "bash",
  json: "json",
  html: "markup",
  text: "text",
};

interface CodeBlockProps {
  code: string;
  language: string;
  filename?: string;
  output?: string;
}

export function CodeBlock({ code, language, filename, output }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // clipboard unavailable — silently ignore
    }
  }, [code]);

  const lang = LANG_MAP[language] ?? "text";

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
          language={lang}
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
