import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocsShell } from "@/components/course/docs-shell";
import { LessonView } from "@/components/course/lesson-view";
import { getLesson, getSectionOf, lessons, trackableLessons } from "@/lib/course";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return lessons.map((l) => ({ slug: l.id }));
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://express-bangla.vercel.app";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) return {};

  const url = `/docs/${lesson.id}`;
  return {
    title: lesson.title,
    description: `${lesson.subtitle} — সম্পূর্ণ বাংলায় Express.js ডকুমেন্টেশন`,
    keywords: lesson.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      locale: "bn_BD",
      title: `${lesson.title} | এক্সপ্রেস শিখি`,
      description: lesson.subtitle,
      url,
    },
    twitter: {
      card: "summary",
      title: lesson.title,
      description: lesson.subtitle,
    },
  };
}

export default async function LessonPage({ params }: PageProps) {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) notFound();

  const index = lessons.findIndex((l) => l.id === lesson.id);
  const trackIndex = trackableLessons.findIndex((l) => l.id === lesson.id);
  const prev = lessons[index - 1];
  const next = lessons[index + 1];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: lesson.title,
    description: lesson.subtitle,
    inLanguage: "bn",
    url: `${SITE_URL}/docs/${lesson.id}`,
    isPartOf: {
      "@type": "WebSite",
      name: "এক্সপ্রেস শিখি",
      url: SITE_URL,
    },
    about: {
      "@type": "SoftwareApplication",
      name: "Express.js",
      applicationCategory: "WebApplication",
    },
  };

  return (
    <DocsShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LessonView
        lesson={lesson}
        index={trackIndex >= 0 ? trackIndex : index}
        total={trackableLessons.length}
        prev={prev ? { id: prev.id, title: prev.title } : undefined}
        next={next ? { id: next.id, title: next.title } : undefined}
      />
    </DocsShell>
  );
}
