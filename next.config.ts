import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  typescript: {
    // টাইপ-এরর থাকলে বিল্ড থামবে — ডকুমেন্টেশন প্রজেক্টের জন্য শৃঙ্খলা
    ignoreBuildErrors: false,
  },
  reactStrictMode: true,
};

export default nextConfig;
