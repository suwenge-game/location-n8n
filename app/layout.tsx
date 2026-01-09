import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { WebSiteJsonLd, OrganizationJsonLd } from "@/components/seo/json-ld";
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from "@/lib/constants";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: SITE_URL,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <WebSiteJsonLd url={SITE_URL} name={SITE_NAME} description={SITE_DESCRIPTION} />
        <OrganizationJsonLd
          url={SITE_URL}
          logo={`${SITE_URL}/logo.png`}
          name={SITE_NAME}
          description={SITE_DESCRIPTION}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
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
        </ThemeProvider>
      </body>
    </html>
  );
}
