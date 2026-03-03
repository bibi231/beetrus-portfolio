import {
  HeroSection,
  QuickLinksSection,
  AboutPreviewSection,
  MusicPreviewSection,
  WorkPreviewSection,
  RequestCTA
} from "@/components/sections/home-sections";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <QuickLinksSection />
      <WorkPreviewSection />
      <MusicPreviewSection />
      <AboutPreviewSection />
      <RequestCTA />
    </>
  );
}
