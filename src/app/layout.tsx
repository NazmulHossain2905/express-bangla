import type { Metadata, Viewport } from "next";
import { Noto_Sans_Bengali, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/course/theme-provider";

const notoBengali = Noto_Sans_Bengali({
  variable: "--font-bengali",
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://express-bangla.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "এক্সপ্রেস শিখি — Express.js শেখার সম্পূর্ণ বাংলা ডকুমেন্টেশন",
    template: "%s | এক্সপ্রেস শিখি",
  },
  description:
    "Express.js 5.3, Node.js 24 LTS ও TypeScript 7 অনুযায়ী সম্পূর্ণ বাংলা ডকুমেন্টেশন — CommonJS, ES Modules ও TypeScript উদাহরণসহ, লাইভ API প্লেগ্রাউন্ড, সার্চ আর কুইজ এক জায়গায়।",
  keywords: [
    "Express.js",
    "বাংলা টিউটোরিয়াল",
    "Express.js বাংলা ডকুমেন্টেশন",
    "Node.js শেখা",
    "ব্যাকএন্ড ডেভেলপমেন্ট",
    "Express bangla tutorial",
    "REST API",
    "TypeScript Express",
    "ES Modules",
  ],
  authors: [{ name: "এক্সপ্রেস শিখি" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "bn_BD",
    siteName: "এক্সপ্রেস শিখি",
    title: "এক্সপ্রেস শিখি — Express.js শেখার সম্পূর্ণ বাংলা ডকুমেন্টেশন",
    description:
      "একদম শুরু থেকে Express.js শিখুন সম্পূর্ণ বাংলায় — বিগিনার-ফ্রেন্ডলি পাঠ, হাতে-কলমে কোড উদাহরণ (CommonJS, ESM, TypeScript), লাইভ API প্লেগ্রাউন্ড আর কুইজ — সব এক জায়গায়।",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "এক্সপ্রেস শিখি — Express.js বাংলা ডকুমেন্টেশন",
    description:
      "Express 5.3, Node 24 LTS, TypeScript — সম্পূর্ণ বাংলায়, লাইভ প্লেগ্রাউন্ড ও সার্চসহ।",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <body
        className={`${notoBengali.className} ${jetbrains.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
