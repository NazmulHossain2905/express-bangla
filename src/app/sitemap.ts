import type { MetadataRoute } from "next";
import { lessons } from "@/lib/course";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://express-bangla.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/playground`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/quiz`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];

  const docPages: MetadataRoute.Sitemap = lessons.map((l) => ({
    url: `${SITE_URL}/docs/${l.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticPages, ...docPages];
}
