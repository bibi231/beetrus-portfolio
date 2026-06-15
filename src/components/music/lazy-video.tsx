"use client";

/**
 * Lazy, autoplaying, muted, inline background video.
 * Only attaches the <source> (and starts loading/playing) once it
 * scrolls near the viewport, and pauses when fully offscreen — so heavy
 * promo clips never block first paint or burn battery in the background.
 */
import { useEffect, useRef, useState } from "react";

export function LazyVideo({
  src,
  poster,
  className,
  style,
  loop = true,
}: {
  src: string;
  poster?: string;
  className?: string;
  style?: React.CSSProperties;
  loop?: boolean;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = wrapRef.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.some((e) => e.isIntersecting);
        setActive((prev) => prev || visible);
        const v = videoRef.current;
        if (!v) return;
        if (visible) {
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { rootMargin: "200px", threshold: 0.05 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className={className} style={style}>
      <video
        ref={videoRef}
        muted
        loop={loop}
        playsInline
        preload="none"
        poster={poster}
        className="h-full w-full object-cover"
      >
        {active && <source src={src} type="video/mp4" />}
      </video>
    </div>
  );
}
