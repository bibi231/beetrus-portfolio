import {
  HeroSection,
  MegaMarquee,
  FeaturedReleaseSection,
  LiveProductsSection,
  DualWorldSection,
  FoundersLetter,
  StatsBelt,
  TechMarquee,
} from "@/components/sections/home-sections";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MegaMarquee />
      <LiveProductsSection />
      <FeaturedReleaseSection />
      <DualWorldSection />
      <FoundersLetter />
      <TechMarquee />
      <StatsBelt />
    </>
  );
}
