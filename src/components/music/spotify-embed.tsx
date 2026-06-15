"use client";

/**
 * Lazy Spotify embed. Renders an iframe for a Spotify entity
 * (track / album / artist) only once it scrolls near the viewport,
 * keeping the page fast. Uses the official open.spotify.com/embed URL.
 */
import { useEffect, useRef, useState } from "react";

type SpotifyType = "track" | "album" | "artist" | "playlist";

export function SpotifyEmbed({
  type,
  id,
  height = 152,
  compact = false,
  title,
}: {
  type: SpotifyType;
  id: string;
  height?: number;
  compact?: boolean;
  title?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || show) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px" }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [show]);

  const src = `https://open.spotify.com/embed/${type}/${id}${compact ? "?theme=0" : "?theme=0"}`;

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-xl border border-wire bg-surface/40"
      style={{ minHeight: height }}
    >
      {show ? (
        <iframe
          title={title ?? `Spotify ${type}`}
          src={src}
          width="100%"
          height={height}
          frameBorder="0"
          loading="lazy"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          style={{ borderRadius: 12, display: "block" }}
        />
      ) : (
        <div
          className="flex items-center justify-center font-mono text-[10px] uppercase tracking-widest text-text-2"
          style={{ height }}
        >
          Loading player…
        </div>
      )}
    </div>
  );
}
