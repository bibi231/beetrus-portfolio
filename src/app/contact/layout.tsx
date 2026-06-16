import type { Metadata } from "next";

const title = "Contact";
const description =
  "Start a project or a collaboration. Engineering contracts via TrueWeb Solutions, plus music and creative inquiries for Beetrus. Based in Abuja, Nigeria.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `${title} — Beetrus`,
    description,
    url: "/contact",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Contact Beetrus" }],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
