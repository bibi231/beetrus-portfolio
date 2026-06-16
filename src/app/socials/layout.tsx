import type { Metadata } from "next";

const title = "Socials";
const description =
  "Every link in one place — stream Beetrus on Spotify and Apple Music, follow on Instagram, and reach TrueWeb Solutions.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/socials" },
  openGraph: {
    title: `${title} — Beetrus`,
    description,
    url: "/socials",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Beetrus — Socials" }],
  },
};

export default function SocialsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
