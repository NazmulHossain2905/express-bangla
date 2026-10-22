# Project Worklog

---

Task: Create an Express.js learning website in native Bangla for beginners

Work Log:

- Initialized fullstack environment (Next.js 16 + TypeScript + Tailwind 4 + shadcn/ui)
- Loaded fullstack-dev and agent-browser skills; installed @types/react-syntax-highlighter
- Created course data layer in src/lib/course/: types.ts, lessons-part1.ts (intro, setup, hello-world, routing), lessons-part2.ts (middleware, req-res, static-files, forms), lessons-part3.ts (rest-api, error-handling, template-engine, structure), cheatsheet.ts, quiz.ts (10 questions), index.ts — all content written in Bangla with Bengali-friendly code examples
- Created playground REST API backend at src/app/api/playground/route.ts — in-memory /books CRUD mirroring the Express lesson code with proper status codes (200/201/204/400/404)
- Built components in src/components/course/: code-block.tsx (Prism syntax highlighting, copy button, output panel), blocks.tsx (callouts, tables, lists), home.tsx (hero, features, curriculum), lesson-view.tsx (prev/next, completion toggle), quiz.tsx (score, explanations, Bangla numerals), playground.tsx (method selector, request builder, response viewer, request history, Express code mapping), theme-provider.tsx, platform.tsx (header, sidebar with progress, section routing, sticky footer)
- Updated layout.tsx: Noto Sans Bengali + JetBrains Mono fonts, lang="bn", Bangla metadata, next-themes provider
- Updated globals.css: Node-green primary palette (oklch hue 148) for light/dark, custom scrollbar, selection color
- Fixed issues found during verification: Bangla-numeral duration parsing (hero showed "০ ঘণ্টা+"), hero outline button contrast, Radix SheetContent aria-describedby warning
- Refactored progress storage to useSyncExternalStore pattern to satisfy react-hooks/set-state-in-effect lint rule; hydration-safe
- Verified end-to-end with agent-browser: home render, lesson content, code highlighting, copy button, completion + localStorage persistence (8% progress), playground GET 200 / POST 201 with real API, quiz answer feedback, dark mode, iPhone 14 viewport, mobile sheet menu, sticky footer; zero console errors; lint passes

Stage Summary:

- Deliverable: single-page interactive Bangla Express.js course at src/app/page.tsx (route /), API at /api/playground
- Features: 13 sections (12 lessons + cheatsheet), live REST playground, 10-question quiz, progress tracking via localStorage, light/dark theme, fully responsive, sticky footer
- Key decisions: Node-green branding; technical terms kept in Latin within Bangla prose (standard Bangla tech writing); content files split under src/lib/course/ to keep files manageable
