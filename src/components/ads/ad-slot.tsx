"use client";

import { useEffect, useRef, type RefObject } from "react";
import { ADS, activeNetwork, type AdNetwork } from "@/lib/ads";

type Props = {
  /** AdSense ad-unit slot id (falls back to NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE). */
  slot?: string;
  /** Force a network; otherwise the first configured one is used. */
  network?: AdNetwork;
  className?: string;
  /** Accessible label shown above the unit. */
  label?: string;
};

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

/**
 * Env-gated ad slot. Renders nothing in production until a network is configured
 * (see src/lib/ads.ts). In development it shows a labelled placeholder so slot
 * positions are visible while authoring.
 */
export function AdSlot({ slot, network, className, label = "Advertisement" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const net = network ?? activeNetwork();
  const isDev = process.env.NODE_ENV !== "production";

  useEffect(() => {
    if (!net || !ref.current) return;

    if (net === "adsense") {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch {
        /* AdSense not ready yet — it will retry on next navigation */
      }
      return;
    }

    // Adsterra / Monetag: inject the zone loader script into this slot once.
    const container = ref.current;
    if (container.dataset.loaded === "1") return;
    container.dataset.loaded = "1";

    const s = document.createElement("script");
    s.async = true;
    if (net === "adsterra") {
      s.src = ADS.adsterraSrc.startsWith("http") ? ADS.adsterraSrc : `https:${ADS.adsterraSrc}`;
      if (ADS.adsterraKey) s.dataset.key = ADS.adsterraKey;
    } else {
      s.src = ADS.monetagSrc.startsWith("http") ? ADS.monetagSrc : `https:${ADS.monetagSrc}`;
      if (ADS.monetagZone) s.dataset.zone = ADS.monetagZone;
    }
    container.appendChild(s);
  }, [net]);

  // Not configured → invisible in prod, labelled placeholder in dev.
  if (!net) {
    if (!isDev) return null;
    return (
      <div
        className={`my-8 flex h-24 items-center justify-center border border-dashed border-wire bg-surface/30 font-mono text-[10px] uppercase tracking-[0.2em] text-text-3 ${className ?? ""}`}
        style={{ borderRadius: 2 }}
        aria-hidden="true"
      >
        Ad slot · inert (set an ad env var)
      </div>
    );
  }

  return (
    <div className={`my-8 ${className ?? ""}`}>
      <p className="mb-1 text-center font-mono text-[9px] uppercase tracking-[0.24em] text-text-3">{label}</p>
      {net === "adsense" ? (
        <ins
          ref={ref as unknown as RefObject<HTMLModElement>}
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={ADS.adsenseClient}
          data-ad-slot={slot || ADS.adsenseSlotArticle}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      ) : (
        <div ref={ref} className="flex min-h-[90px] justify-center" />
      )}
    </div>
  );
}
