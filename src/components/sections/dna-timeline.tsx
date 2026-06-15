"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { MapPin } from "lucide-react";

export type TimelineItem = {
  year: string;
  title: string;
  place: string;
  type: "music" | "work";
};

/**
 * DNA-helix timeline.
 * Two sine strands form a double helix down the spine and "unravel" (draw top->bottom)
 * as the section scrolls through the viewport. Base-pair rungs + nodes sit at each entry,
 * cards alternate left/right. Reduced-motion: helix is fully drawn, no scroll animation.
 */
export function DnaTimeline({ items }: { items: TimelineItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.45"],
  });
  const draw = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const pathLength = prefersReduced ? 1 : draw;

  // ── Build the helix geometry in a normalized viewBox (120 wide, 120 units tall per entry)
  const N = items.length;
  const UNIT = 120;
  const VBH = N * UNIT;
  const cx = 60;
  const amp = 44;
  const omega = Math.PI / UNIT; // one half-twist (one crossover) per entry
  const step = 6;

  let strandA = "";
  let strandB = "";
  for (let y = 0; y <= VBH; y += step) {
    const dx = amp * Math.sin(y * omega);
    strandA += `${y === 0 ? "M" : "L"} ${(cx + dx).toFixed(2)} ${y} `;
    strandB += `${y === 0 ? "M" : "L"} ${(cx - dx).toFixed(2)} ${y} `;
  }

  // Base-pair rungs at each entry center
  const rungs = items.map((_, i) => {
    const y = (i + 0.5) * UNIT;
    const dx = amp * Math.sin(y * omega);
    return { y, x1: cx + dx, x2: cx - dx };
  });

  return (
    <div ref={ref} className="relative mx-auto max-w-[1100px]">
      {/* mobile spine (helix is desktop-only so dots stay aligned) */}
      <div className="absolute bottom-0 left-5 top-0 w-px -translate-x-1/2 bg-wire md:hidden" />

      {/* ── Helix backdrop (desktop) ── */}
      <svg
        className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
        viewBox={`0 0 120 ${VBH}`}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {/* base pairs */}
        {rungs.map((r, i) => (
          <motion.line
            key={i}
            x1={r.x1}
            y1={r.y}
            x2={r.x2}
            y2={r.y}
            stroke={items[i].type === "music" ? "var(--gold)" : "var(--ember)"}
            strokeWidth={1.4}
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.5 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          />
        ))}
        {/* strands */}
        <motion.path d={strandA} fill="none" stroke="var(--gold)" strokeWidth={2} strokeLinecap="round" style={{ pathLength }} />
        <motion.path d={strandB} fill="none" stroke="var(--ember)" strokeWidth={2} strokeLinecap="round" style={{ pathLength }} opacity={0.85} />
      </svg>

      {/* ── Entries ── */}
      <div className="relative space-y-12 md:space-y-16">
        {items.map((item, i) => {
          const isMusic = item.type === "music";
          const accent = isMusic ? "text-gold" : "text-[color:var(--ember)]";
          const dotBg = isMusic ? "bg-gold" : "bg-[color:var(--ember)]";
          const rightSide = i % 2 === 0;
          return (
            <motion.div
              key={i}
              className={`relative pl-14 md:grid md:grid-cols-2 md:gap-16 md:pl-0 ${rightSide ? "" : "md:[direction:rtl]"}`}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
            >
              {/* node on the spine */}
              <span className={`absolute left-5 top-3 z-10 h-3.5 w-3.5 -translate-x-1/2 ${dotBg} ring-4 ring-ink md:left-1/2`} style={{ borderRadius: 2 }} />
              <span className={`absolute left-5 top-3 z-0 h-3.5 w-3.5 -translate-x-1/2 ${dotBg} opacity-40 blur-[3px] md:left-1/2`} style={{ borderRadius: 2 }} />

              <div
                className={`group border border-wire bg-surface/60 p-6 backdrop-blur-sm transition-colors hover:border-[currentColor] md:[direction:ltr] ${
                  rightSide ? "md:col-start-2 md:ml-2" : "md:mr-2 md:text-right"
                }`}
                style={{ borderRadius: 2 }}
              >
                <div className={`mb-2 flex items-center gap-3 font-mono ${rightSide ? "" : "md:justify-end"}`}>
                  <span className={`font-display text-xl ${accent}`}>{item.year}</span>
                  <span className="border border-wire px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-text-3" style={{ borderRadius: 2 }}>
                    {item.type}
                  </span>
                </div>
                <h4 className="mb-2 font-display text-xl uppercase tracking-tight text-text-1 md:text-2xl">
                  {item.title}
                </h4>
                <div className={`flex items-center gap-2 font-mono text-xs text-text-2 ${rightSide ? "" : "md:justify-end"}`}>
                  <MapPin size={12} className={accent} />
                  {item.place}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
