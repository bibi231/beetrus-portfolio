"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, X, ChevronLeft, ChevronRight } from "lucide-react";
import { projects, Project, ProjectScreenshot } from "@/data/projects";

const GOLD = "#d9b23e";

type Filter = "All" | "SaaS" | "Platform" | "App" | "Client Work";
const FILTERS: Filter[] = ["All", "SaaS", "Platform", "App", "Client Work"];

/* ─── Lightbox ─── */
function Lightbox({ screenshots, initial, onClose, accent }: {
  screenshots: ProjectScreenshot[]; initial: number; onClose: () => void; accent: string;
}) {
  const [idx, setIdx] = useState(initial);
  const prev = () => setIdx((i) => (i - 1 + screenshots.length) % screenshots.length);
  const next = () => setIdx((i) => (i + 1) % screenshots.length);
  return (
    <motion.div key="lb" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[800] flex items-center justify-center bg-void/90 backdrop-blur-xl p-4" onClick={onClose}>
      <motion.div initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }} className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute -top-12 right-0 flex items-center gap-2 font-mono text-[11px] uppercase text-text-2 hover:text-text-1">
          <X size={14} /> Close
        </button>
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border" style={{ borderColor: `${accent}30` }}>
          <img src={screenshots[idx].src} alt={screenshots[idx].caption} className="w-full h-full object-cover"
            onError={(e) => { const t = e.target as HTMLImageElement; t.style.display = "none"; t.parentElement!.style.background = `linear-gradient(135deg, ${accent}18, ${accent}35)`; }} />
          <div className="absolute inset-0 bg-gradient-to-t from-void/70 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <p className="font-mono text-[11px] uppercase tracking-widest text-text-2 mb-1">{idx + 1} / {screenshots.length}</p>
            <p className="font-body text-sm text-text-1">{screenshots[idx].caption}</p>
          </div>
          {screenshots.length > 1 && (
            <>
              <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-ink/70 border border-wire hover:border-gold flex items-center justify-center"><ChevronLeft size={18} /></button>
              <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-ink/70 border border-wire hover:border-gold flex items-center justify-center"><ChevronRight size={18} /></button>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [openId, setOpenId] = useState<string | null>(null);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [lightbox, setLightbox] = useState<{ screenshots: ProjectScreenshot[]; idx: number; accent: string } | null>(null);

  const openLightbox = useCallback((s: ProjectScreenshot[], idx: number, accent: string) => setLightbox({ screenshots: s, idx, accent }), []);
  const liveCount = projects.filter((p) => p.status === "live").length;
  const filtered = projects.filter((p) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Client Work") return p.category === "portfolio";
    return p.category.toLowerCase() === activeFilter.toLowerCase();
  });
  const hovered = filtered.find((p) => p.id === hoverId);

  return (
    <div className="min-h-screen bg-ink" onMouseMove={(e) => setMouse({ x: e.clientX, y: e.clientY })}>
      {/* Cursor-trailing preview (desktop) */}
      <AnimatePresence>
        {hovered?.image && openId === null && (
          <motion.div
            key="cursor-preview"
            className="hidden md:block fixed top-0 left-0 z-[60] pointer-events-none"
            initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1, x: mouse.x - 175, y: mouse.y - 110 }} exit={{ opacity: 0, scale: 0.85 }}
            transition={{ x: { type: "spring", stiffness: 420, damping: 38, mass: 0.5 }, y: { type: "spring", stiffness: 420, damping: 38, mass: 0.5 }, opacity: { duration: 0.18 }, scale: { duration: 0.18 } }}
          >
            <div className="w-[350px] h-[220px] rounded-2xl overflow-hidden" style={{ border: `1px solid ${hovered.accentColor}66`, boxShadow: `0 30px 80px rgba(0,0,0,0.6), 0 0 60px ${hovered.accentColor}22` }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={hovered.image} alt="" className="w-full h-full object-cover"
                onError={(e) => { const t = e.currentTarget; t.style.display = "none"; (t.parentElement as HTMLElement).style.background = `linear-gradient(135deg, ${hovered.accentColor}25, ${hovered.accentColor}55)`; }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero */}
      <section className="relative pt-16 pb-12 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-[520px] h-[520px] bg-gold/[0.08] blur-[150px] rounded-full -translate-y-1/2" />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="font-mono text-[12px] uppercase tracking-[0.26em] text-gold mb-6">
            The index — {liveCount} live · hover to preview, tap to open
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
            className="font-display font-black uppercase tracking-[-0.02em] leading-[0.84] text-text-1" style={{ fontSize: "var(--type-mega, clamp(3rem,12vw,9rem))" }}>
            Real<br /><span className="text-gold">products.</span>
          </motion.h1>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.14 }} className="flex flex-wrap gap-2 mt-9">
            {FILTERS.map((f) => (
              <button key={f} onClick={() => { setActiveFilter(f); setOpenId(null); }}
                className="px-5 py-2 rounded-full font-mono text-[11px] uppercase tracking-widest transition-all duration-200"
                style={activeFilter === f ? { background: GOLD, color: "#0b0a08", fontWeight: 700 } : { background: "var(--surface)", border: "1px solid var(--wire)", color: "var(--text-2)" }}>
                {f}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Big-type index */}
      <section className="pb-28">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 border-t border-wire">
          {filtered.map((p, i) => {
            const open = openId === p.id;
            const dim = hoverId !== null && hoverId !== p.id && !open;
            const gallery: ProjectScreenshot[] = (p.screenshots?.length ? p.screenshots : p.image ? [{ src: p.image, caption: p.title }] : []);
            return (
              <div key={p.id} className="border-b border-wire">
                {/* Row */}
                <button
                  onMouseEnter={() => setHoverId(p.id)} onMouseLeave={() => setHoverId(null)}
                  onClick={() => { setOpenId(open ? null : p.id); setHoverId(null); }}
                  className="w-full text-left flex items-center justify-between gap-6 py-7 md:py-9 group transition-opacity duration-300"
                  style={{ opacity: dim ? 0.32 : 1 }}
                >
                  <div className="flex items-baseline gap-4 md:gap-7 min-w-0">
                    <span className="font-mono text-[11px] text-text-3 tabular-nums shrink-0 hidden sm:block">{String(i + 1).padStart(2, "0")}</span>
                    <h2
                      className="font-display font-black uppercase tracking-[-0.01em] leading-[0.95] truncate transition-all duration-200"
                      style={{
                        fontSize: "clamp(1.9rem, 6.5vw, 5.2rem)",
                        color: hoverId === p.id || open ? p.accentColor : "transparent",
                        WebkitTextStroke: hoverId === p.id || open ? "0px" : "1px rgba(244,241,234,0.32)",
                      }}
                    >
                      {p.title}
                    </h2>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-text-3 hidden md:block">{p.category} · {p.year}</span>
                    <span className="font-mono text-[10px] font-semibold px-2.5 py-1 rounded-md whitespace-nowrap"
                      style={{ color: p.status === "live" ? "#4ade80" : p.status === "building" ? GOLD : "#9b8e72", border: `1px solid ${p.status === "live" ? "#4ade8033" : p.status === "building" ? GOLD + "33" : "var(--wire)"}` }}>
                      {p.status === "live" ? "Live" : p.status === "building" ? "Building" : "Concept"}
                    </span>
                    <motion.span animate={{ rotate: open ? 45 : 0 }} className="text-text-2 text-2xl leading-none w-6 text-center">+</motion.span>
                  </div>
                </button>

                {/* Expanded */}
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div key="x" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }} className="overflow-hidden">
                      <div className="pb-12 pt-1 grid lg:grid-cols-[1.3fr_1fr] gap-10">
                        {/* Gallery */}
                        <div>
                          {gallery.length > 0 ? (
                            <div className="grid grid-cols-2 gap-3">
                              {gallery.slice(0, 4).map((s, k) => (
                                <button key={k} onClick={() => openLightbox(gallery, k, p.accentColor)}
                                  className={`group/i relative ${k === 0 && gallery.length > 1 ? "col-span-2 aspect-[16/9]" : "aspect-[16/10]"} rounded-xl overflow-hidden border border-wire hover:border-[var(--c)]`}
                                  style={{ ["--c" as string]: p.accentColor } as React.CSSProperties}>
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img src={s.src} alt={s.caption} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover/i:scale-105"
                                    onError={(e) => { const t = e.currentTarget; t.style.display = "none"; (t.parentElement as HTMLElement).style.background = `linear-gradient(135deg, ${p.accentColor}18, ${p.accentColor}45)`; }} />
                                </button>
                              ))}
                            </div>
                          ) : (
                            <div className="aspect-[16/9] rounded-xl border border-wire grid place-items-center" style={{ background: `linear-gradient(135deg, ${p.accentColor}12, transparent)` }}>
                              <span className="font-display text-3xl uppercase" style={{ color: p.accentColor }}>{p.title}</span>
                            </div>
                          )}
                        </div>
                        {/* Detail */}
                        <div>
                          <p className="text-text-1 text-lg font-medium mb-3 leading-snug">{p.tagline}</p>
                          <p className="text-text-2 leading-relaxed mb-6">{p.longDescription || p.description}</p>
                          <div className="flex flex-wrap gap-2 mb-7">
                            {p.tags.map((t) => (
                              <span key={t} className="font-mono text-[10px] uppercase bg-surface border border-wire px-3 py-1.5 rounded-full text-text-2">{t}</span>
                            ))}
                          </div>
                          <div className="flex flex-wrap gap-3">
                            {p.liveUrl && (
                              <a href={p.liveUrl} target="_blank" rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-mono text-[11px] font-bold uppercase tracking-widest text-ink transition-transform hover:-translate-y-0.5" style={{ background: p.accentColor }}>
                                View Live <ExternalLink size={12} />
                              </a>
                            )}
                            {p.githubUrl && (
                              <a href={p.githubUrl} target="_blank" rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-wire hover:border-gold/50 font-mono text-[11px] uppercase tracking-widest text-text-1">
                                <Github size={13} /> Code
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
          {filtered.length === 0 && <p className="py-28 text-center text-text-3 font-mono text-sm">No projects in this category yet.</p>}
        </div>
      </section>

      <AnimatePresence>
        {lightbox && <Lightbox screenshots={lightbox.screenshots} initial={lightbox.idx} accent={lightbox.accent} onClose={() => setLightbox(null)} />}
      </AnimatePresence>
    </div>
  );
}
