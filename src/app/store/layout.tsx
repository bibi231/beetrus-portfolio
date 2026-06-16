import type { Metadata } from "next";

const title = "Store";
const description =
  "Official Beetrus store — merch, digital assets, and TEN/TEN drops. Plus build services through TrueWeb Solutions.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/store" },
  openGraph: {
    title: `${title} — Beetrus`,
    description,
    url: "/store",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Beetrus — Store" }],
  },
};

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return children;
}
