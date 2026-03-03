import type { Metadata, Viewport } from "next";
import { Inter, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Toaster } from "sonner";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { MouseGlow } from "@/components/ui/mouse-glow";
import { cn } from "@/lib/utils";

// Primary sans-serif font
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Display font for headings
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

// Monospace for code snippets
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "Beetrus | Artist & Software Engineer",
    template: "%s | Beetrus",
  },
  description:
    "Bitrus Joe-Kyari Gadzama — Afrosounds artist, software engineer, and creative technologist based in Abuja, Nigeria. Music, code, and everything in between.",
  keywords: [
    "Beetrus",
    "Bitrus Gadzama",
    "Afrosounds",
    "Nigerian artist",
    "software engineer",
    "web developer",
    "music producer",
    "Abuja",
    "Nile University",
  ],
  authors: [{ name: "Bitrus Joe-Kyari Gadzama", url: "https://beetrus.com" }],
  creator: "Beetrus",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Beetrus",
    title: "Beetrus | Artist & Software Engineer",
    description:
      "Afrosounds artist, software engineer, and creative technologist based in Abuja, Nigeria.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Beetrus - Artist & Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Beetrus | Artist & Software Engineer",
    description: "Afrosounds artist, software engineer, and creative technologist.",
    images: ["/og-image.png"],
    creator: "@beetrus_gg",
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
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0c" },
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
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased selection:bg-neon-red selection:text-white flex flex-col",
          inter.variable,
          outfit.variable,
          jetbrains.variable
        )}
      >
        <Providers>
          <Header />
          <main className="relative z-base flex-1">
            {children}
          </main>
          <Footer />

          <CustomCursor />
          <MouseGlow />

          <Toaster
            position="top-right"
            theme="dark"
            closeButton
            toastOptions={{
              style: {
                background: "var(--bg-surface)",
                border: "1px solid var(--border)",
                color: "var(--foreground)",
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
