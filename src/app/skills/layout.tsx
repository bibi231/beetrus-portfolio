import type { Metadata } from "next";

const title = "Skills";
const description =
  "The stack behind the work — fullstack engineering, AI/LLM products, and the tools Bitrus Sariki ships with at TrueWeb Solutions.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/skills" },
  openGraph: {
    title: `${title} — Beetrus`,
    description,
    url: "/skills",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Beetrus — Skills" }],
  },
};

export default function SkillsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
