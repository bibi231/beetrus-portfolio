/**
 * Ad configuration — entirely env-driven so the site ships with NO ad markup
 * until you provide real IDs. Set any one of these in Vercel and the matching
 * network goes live everywhere AdSlot is placed; leave them empty and AdSlot
 * renders nothing in production (no blank boxes, no layout shift).
 *
 *   Google AdSense:   NEXT_PUBLIC_ADSENSE_CLIENT = ca-pub-XXXXXXXXXXXXXXXX
 *                     NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE = 1234567890   (in-article unit id)
 *   Adsterra:         NEXT_PUBLIC_ADSTERRA_SRC = //pl000000.../invoke.js
 *                     NEXT_PUBLIC_ADSTERRA_KEY = your-zone-key
 *   Monetag:          NEXT_PUBLIC_MONETAG_SRC = //phbq.com/sdk.js (or your loader)
 *                     NEXT_PUBLIC_MONETAG_ZONE = 0000000
 */
export const ADS = {
  adsenseClient: process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "",
  adsenseSlotArticle: process.env.NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE ?? "",
  adsterraSrc: process.env.NEXT_PUBLIC_ADSTERRA_SRC ?? "",
  adsterraKey: process.env.NEXT_PUBLIC_ADSTERRA_KEY ?? "",
  monetagSrc: process.env.NEXT_PUBLIC_MONETAG_SRC ?? "",
  monetagZone: process.env.NEXT_PUBLIC_MONETAG_ZONE ?? "",
} as const;

export type AdNetwork = "adsense" | "adsterra" | "monetag";

/** The first configured network (priority: AdSense → Adsterra → Monetag), or null. */
export function activeNetwork(): AdNetwork | null {
  if (ADS.adsenseClient) return "adsense";
  if (ADS.adsterraSrc) return "adsterra";
  if (ADS.monetagSrc) return "monetag";
  return null;
}

export const adsEnabled = Boolean(ADS.adsenseClient || ADS.adsterraSrc || ADS.monetagSrc);
