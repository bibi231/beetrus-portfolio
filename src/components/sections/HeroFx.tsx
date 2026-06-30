"use client";

import { useEffect, useRef } from "react";

// Generative hero effect — drifting gold embers (software/energy) plus a faint
// reactive waveform along the base (sound). Renders on a canvas, blended over the
// TEN/TEN cover so the hero feels alive and studio-grade. Pure, no deps, GPU-light.
const GOLD = "217,178,62";   // #d9b23e
const AMBER = "201,162,39";  // #c9a227

export function HeroFx() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current; if (!c) return;
    const x = c.getContext("2d"); if (!x) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0;
    const resize = () => { W = c.width = c.offsetWidth * dpr; H = c.height = c.offsetHeight * dpr; };
    resize();
    window.addEventListener("resize", resize);

    type P = { x: number; y: number; vx: number; vy: number; r: number; a: number; tw: number };
    const N = reduce ? 28 : 64;
    const parts: P[] = Array.from({ length: N }, () => ({
      x: Math.random(), y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00018, vy: -0.0001 - Math.random() * 0.00022,
      r: (0.6 + Math.random() * 2.2) * dpr, a: 0.1 + Math.random() * 0.5, tw: Math.random() * 6.28,
    }));

    let raf = 0, t = 0;
    const draw = () => {
      t += reduce ? 0 : 0.016;
      x.clearRect(0, 0, W, H);

      // slow gold light wash that breathes
      const cx = W * (0.5 + 0.16 * Math.sin(t * 0.18));
      const cy = H * (0.28 + 0.1 * Math.cos(t * 0.15));
      const g = x.createRadialGradient(cx, cy, 0, cx, cy, W * 0.6);
      g.addColorStop(0, `rgba(${GOLD},0.10)`);
      g.addColorStop(1, `rgba(${GOLD},0)`);
      x.fillStyle = g; x.fillRect(0, 0, W, H);

      // drifting embers
      for (const p of parts) {
        p.x += p.vx; p.y += p.vy;
        if (p.y < -0.05) { p.y = 1.05; p.x = Math.random(); }
        if (p.x < -0.05) p.x = 1.05; if (p.x > 1.05) p.x = -0.05;
        const flick = 0.5 + 0.5 * Math.sin(t * 1.6 + p.tw);
        x.beginPath();
        x.arc(p.x * W, p.y * H, p.r, 0, 6.28);
        x.fillStyle = `rgba(${AMBER},${(p.a * flick * 0.7).toFixed(3)})`;
        x.fill();
      }

      // base waveform — the "sound" line
      const baseY = H * 0.965;
      x.beginPath();
      for (let i = 0; i <= 90; i++) {
        const px = (i / 90) * W;
        const amp = (Math.sin(i * 0.32 + t * 1.4) * Math.sin(i * 0.07 - t * 0.6)) * H * 0.012;
        const py = baseY + amp;
        if (i === 0) x.moveTo(px, py); else x.lineTo(px, py);
      }
      x.strokeStyle = `rgba(${GOLD},${reduce ? 0.18 : 0.32})`;
      x.lineWidth = 1.4 * dpr;
      x.stroke();

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", mixBlendMode: "screen", pointerEvents: "none" }}
    />
  );
}
