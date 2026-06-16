import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Beetrus — Engineer & Artist",
    short_name: "Beetrus",
    description:
      "Fullstack engineer & SaaS founder in Abuja. AI products under TrueWeb Solutions. Also records as Beetrus — Afrosounds, R&B, Drill.",
    start_url: "/",
    display: "standalone",
    background_color: "#060504",
    theme_color: "#060504",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png", purpose: "any" },
    ],
  };
}
