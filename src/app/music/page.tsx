import { Metadata } from "next";
import { MusicHeroSection, FeaturedReleaseSection, LostFilesStrip, DiscographySection, EventsSection } from "@/components/sections/music-sections";
import { MusicJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Music",
  description:
    "Stream TEN/TEN: The Lost Files and the full Beetrus discography — Afrosounds, R&B, and Drill out of Abuja. Releases, videos, and events.",
  alternates: { canonical: "/music" },
  openGraph: {
    title: "Music — Beetrus",
    description: "TEN/TEN: The Lost Files — out now. The full Beetrus discography, videos, and events.",
    url: "/music",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Beetrus — Music" }],
  },
};

export default function MusicPage() {
  return (
    <div className="min-h-screen bg-void">
      <MusicJsonLd />
      <MusicHeroSection />
      <FeaturedReleaseSection />
      <LostFilesStrip />
      <DiscographySection />
      <EventsSection />
    </div>
  );
}
