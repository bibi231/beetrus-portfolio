/** Canonical site origin — used by metadata, sitemap, robots, JSON-LD. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://beetrus-portfolio.vercel.app"
).replace(/\/$/, "");

export const SITE_NAME = "Beetrus — Engineer & Artist";
