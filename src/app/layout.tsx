import type { Metadata, Viewport } from "next";
import { Providers } from "@/components/providers";
import { Toaster } from "sonner";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { cn } from "@/lib/utils";
import { SITE_URL } from "@/lib/site";
import { SiteJsonLd } from "@/components/seo/json-ld";

import "./globals.css";

const OG = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "Beetrus — Engineer & Artist",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Bitrus Sariki (Beetrus) — Engineer & Artist",
    template: "%s — Beetrus",
  },
  description:
    "Fullstack software engineer and SaaS founder based in Abuja, Nigeria, building AI-powered products under TrueWeb Solutions. Also records as Beetrus — Afrosounds, R&B, Drill.",
  applicationName: "Beetrus",
  keywords: [
    "Beetrus",
    "Bitrus Sariki",
    "fullstack engineer",
    "Nigerian developer",
    "Abuja developer",
    "SaaS founder",
    "AI products",
    "React",
    "Next.js",
    "TrueWeb Solutions",
    "Afrosounds artist",
    "TEN/TEN The Lost Files",
  ],
  authors: [{ name: "Bitrus Sariki", url: SITE_URL }],
  creator: "Bitrus Sariki",
  publisher: "Beetrus",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Beetrus",
    title: "Bitrus Sariki (Beetrus) — Engineer & Artist",
    description:
      "Fullstack engineer building AI-powered SaaS under TrueWeb Solutions. Recording artist Beetrus — TEN/TEN: The Lost Files out now.",
    images: [OG],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bitrus Sariki (Beetrus) — Engineer & Artist",
    description: "Fullstack engineer · SaaS founder · recording artist. Abuja, Nigeria.",
    images: [OG.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION }
    : undefined,
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: [{ color: "#060504" }], // var(--void)
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Anton&family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
        {/* LCP: hero cover is the most important pixel — discover it early */}
        <link rel="preload" as="image" href="/music/ten-ten-cover.jpg" />
        <SiteJsonLd />
      </head>
      <body className={cn("min-h-screen bg-ink text-text-1 font-body antialiased selection:bg-pulse selection:text-ink flex flex-col")}>
        <Providers>
          <Header />
          <main className="relative z-content flex-1">
            {children}
          </main>
          <Footer />

          <Toaster
            position="top-right"
            theme="dark"
            closeButton
            toastOptions={{
              style: {
                background: "var(--surface)",
                border: "1px solid var(--wire)",
                color: "var(--text-1)",
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
