"use client";

import {
  Lightbulb,
  AlertTriangle,
  Info,
} from "lucide-react";
import type { ContentBlock } from "@/lib/course/types";
import { CodeBlock } from "./code-block";

function Callout({
  type,
  content,
}: {
  type: "tip" | "warning" | "note";
  content: string;
}) {
  const config = {
    tip: {
      icon: Lightbulb,
      label: "টিপস",
      wrap: "border-emerald-500/30 bg-emerald-500/10",
      iconColor: "text-emerald-600 dark:text-emerald-400",
      labelColor: "text-emerald-700 dark:text-emerald-300",
    },
    warning: {
      icon: AlertTriangle,
      label: "সতর্কতা",
      wrap: "border-amber-500/30 bg-amber-500/10",
      iconColor: "text-amber-600 dark:text-amber-400",
      labelColor: "text-amber-700 dark:text-amber-300",
    },
    note: {
      icon: Info,
      label: "মনে রাখুন",
      wrap: "border-sky-500/25 bg-sky-500/10",
      iconColor: "text-sky-600 dark:text-sky-400",
      labelColor: "text-sky-700 dark:text-sky-300",
    },
  }[type];

  const Icon = config.icon;
  return (
    <div className={`my-5 rounded-xl border ${config.wrap} p-4`}>
      <div className="flex items-center gap-2 mb-1.5">
        <Icon className={`size-4 ${config.iconColor}`} />
        <span className={`text-sm font-bold ${config.labelColor}`}>{config.label}</span>
      </div>
      <p className="text-[15px] leading-relaxed text-foreground/90">{content}</p>
    </div>
  );
}

export function BlockRenderer({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "heading":
      return (
        <h2 className="text-xl md:text-2xl font-bold mt-9 mb-3 text-foreground flex items-start gap-2.5">
          <span className="mt-1.5 h-5 w-1.5 rounded-full bg-primary shrink-0" aria-hidden />
          <span>{block.content}</span>
        </h2>
      );

    case "text":
      return (
        <p className="text-[16px] leading-[1.9] text-foreground/85 my-4">{block.content}</p>
      );

    case "list":
      if (block.ordered) {
        return (
          <ol className="my-4 space-y-2.5">
            {block.items.map((item, i) => (
              <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-foreground/85">
                <span className="shrink-0 size-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        );
      }
      return (
        <ul className="my-4 space-y-2.5">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-foreground/85">
              <span className="shrink-0 size-1.5 rounded-full bg-primary mt-[10px]" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );

    case "code":
      return (
        <CodeBlock
          code={block.code}
          language={block.language}
          filename={block.filename}
          output={block.output}
        />
      );

    case "tip":
      return <Callout type="tip" content={block.content} />;

    case "warning":
      return <Callout type="warning" content={block.content} />;

    case "note":
      return <Callout type="note" content={block.content} />;

    case "table":
      return (
        <div className="my-5 overflow-x-auto rounded-xl border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-primary/10">
                {block.headers.map((h, i) => (
                  <th key={i} className="text-left px-4 py-3 font-bold text-foreground whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr
                  key={ri}
                  className={`border-t ${ri % 2 === 0 ? "bg-background" : "bg-muted/40"}`}
                >
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className={`px-4 py-2.5 align-top ${
                        ci === 0 ? "font-semibold text-foreground" : "text-foreground/80"
                      }`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    default:
      return null;
  }
}
