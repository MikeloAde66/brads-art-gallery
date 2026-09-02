import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { getSiteConfig } from "@/lib/siteConfig";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Brad's Art Gallery",
  description: "Original fine art, printed on demand — fine art paper and stretched canvas.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const config = await getSiteConfig();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-neutral-950 text-neutral-100">
        <Header navConfig={config.nav} />
        <div className="flex flex-1 flex-col">{children}</div>
        <footer className="border-t border-neutral-900 px-6 py-8 text-center text-xs text-neutral-600">
          © {new Date().getFullYear()} Brad&apos;s Art Gallery. Prints fulfilled by FinerWorks.
        </footer>
      </body>
    </html>
  );
}
