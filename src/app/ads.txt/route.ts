import { ADS } from "@/lib/ads";

export const dynamic = "force-static";

/**
 * Dynamic ads.txt — emits a line only for each ad network you've configured.
 * Empty (and harmless) until you set the env vars, then it auto-populates so
 * the networks can verify ownership for monetization.
 */
export function GET() {
  const lines: string[] = [];

  if (ADS.adsenseClient) {
    // ca-pub-XXXX -> pub-XXXX
    const pub = ADS.adsenseClient.replace(/^ca-/, "");
    lines.push(`google.com, ${pub}, DIRECT, f08c47fec0942fa0`);
  }
  // Adsterra / Monetag ads.txt lines are account-specific — paste the exact line
  // your dashboard gives you into these env vars and it appears here automatically.
  if (process.env.NEXT_PUBLIC_ADSTERRA_ADSTXT) lines.push(process.env.NEXT_PUBLIC_ADSTERRA_ADSTXT);
  if (process.env.NEXT_PUBLIC_MONETAG_ADSTXT) lines.push(process.env.NEXT_PUBLIC_MONETAG_ADSTXT);

  const body = lines.length ? lines.join("\n") + "\n" : "";
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
