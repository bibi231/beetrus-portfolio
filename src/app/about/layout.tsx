import type { Metadata } from "next";

const title = "About";
const description =
  "Two lanes, one person: Bitrus Sariki is a fullstack engineer and SaaS founder in Abuja who also records as Beetrus. The timeline, the stack, the story.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    title: `${title} — Beetrus`,
    description,
    url: "/about",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "About Beetrus" }],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
