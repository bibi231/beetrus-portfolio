import type { Metadata, Viewport } from "next";
import { Providers } from "@/components/providers";
import { Toaster } from "sonner";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { cn } from "@/lib/utils";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "Bitrus Sariki — Engineer & Artist",
    template: "%s | Bitrus Sariki",
  },
  description: "Fullstack software engineer and SaaS founder based in Abuja, Nigeria. Building AI-powered products. Also records as Beetrus — Afrosounds, R&B, Drill.",
  keywords: [
    "fullstack engineer",
    "Nigerian developer",
    "SaaS founder",
    "Abuja",
    "React",
    "Next.js",
    "TrueWeb Solutions",
    "Beetrus"
  ],
  authors: [{ name: "Bitrus Sariki" }],
  creator: "Bitrus Sariki",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://beetrus-portfolio.vercel.app",
    siteName: "Bitrus Sariki Portfolio",
    title: "Bitrus Sariki — Engineer & Artist",
    description: "Fullstack engineer building AI-powered SaaS. Music artist Beetrus — Afro State Of Mind EP.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Bitrus Sariki - Engineer & Artist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bitrus Sariki — Engineer & Artist",
    description: "Fullstack engineer · SaaS founder · Recording artist. Based in Abuja, Nigeria.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#080d12" }, // var(--ink)
  ],
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
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&f[]=general-sans@400,500,600&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("min-h-screen bg-ink text-text-1 font-body antialiased selection:bg-pulse selection:text-ink flex flex-col")}>
        <Providers>
          <Header />
          <main className="relative z-content flex-1 pt-20">
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
