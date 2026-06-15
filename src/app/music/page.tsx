import { Metadata } from "next";
import { MusicHeroSection, FeaturedReleaseSection, DiscographySection, EventsSection } from "@/components/sections/music-sections";

export const metadata: Metadata = {
  title: "Music",
  description: "Releases and events from Beetrus — Afrosounds, R&B, and Drill.",
};

export default function MusicPage() {
  return (
    <div className="min-h-screen bg-void">
      <MusicHeroSection />
      <FeaturedReleaseSection />
      <DiscographySection />
      <EventsSection />
    </div>
  );
}
