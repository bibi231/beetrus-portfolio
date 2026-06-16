import Script from "next/script";
import { ADS } from "@/lib/ads";

/**
 * Loads the AdSense library once, site-wide — but ONLY when a publisher id is
 * configured. No env var → nothing is injected, so the site stays script-clean.
 */
export function AdsenseScript() {
  if (!ADS.adsenseClient) return null;
  return (
    <Script
      id="adsbygoogle-init"
      async
      strategy="afterInteractive"
      crossOrigin="anonymous"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADS.adsenseClient}`}
    />
  );
}
