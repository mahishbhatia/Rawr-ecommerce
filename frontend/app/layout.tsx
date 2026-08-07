import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { SiteLayout } from "@/components/layout/site-layout";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RAWR",
  description: "RAWR premium ecommerce experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}
