import type { Metadata } from "next";

const title = "Work";
const description =
  "Engineering work by Bitrus Sariki — AI-powered SaaS products built under TrueWeb Solutions: SupportAI, ReplyAI, HarvestAI, and more. Fullstack, Abuja, Nigeria.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/work" },
  openGraph: {
    title: `${title} — Beetrus`,
    description,
    url: "/work",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Beetrus — Work" }],
  },
};

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return children;
}
