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

export const metadata: Metadata = {
  title: "এক্সপ্রেস শিখি — Express.js শেখার সম্পূর্ণ বাংলা কোর্স",
  description:
    "একদম শুরু থেকে Express.js শিখুন সম্পূর্ণ বাংলায়। বিগিনার-ফ্রেন্ডলি পাঠ, হাতে-কলমে কোড উদাহরণ, লাইভ API প্লেগ্রাউন্ড আর কুইজ — সব এক জায়গায়।",
  keywords: [
    "Express.js",
    "বাংলা টিউটোরিয়াল",
    "Node.js শেখা",
    "ব্যাকএন্ড ডেভেলপমেন্ট",
    "Express bangla tutorial",
    "REST API",
  ],
  authors: [{ name: "এক্সপ্রেস শিখি" }],
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
        className={`${notoBengali.variable} ${jetbrains.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
