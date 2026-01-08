import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={inter.className}>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9132117639313977"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1 pt-28 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl py-8">{children}</div>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
