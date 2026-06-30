"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, X, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { projects, Project, ProjectScreenshot } from "@/data/projects";

const GOLD = "#d9b23e";

/* ─── Filter ─── */
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
    <motion.div key="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[800] flex items-center justify-center bg-void/90 backdrop-blur-xl p-4" onClick={onClose}>
      <motion.div initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }} className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute -top-12 right-0 flex items-center gap-2 font-mono text-[11px] uppercase text-text-2 hover:text-text-1 transition-colors">
          <X size={14} /> Close
        </button>
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border" style={{ borderColor: `${accent}30` }}>
          <img src={screenshots[idx].src} alt={screenshots[idx].caption} className="w-full h-full object-cover"
            onError={(e) => { const t = e.target as HTMLImageElement; t.style.display = "none"; t.parentElement!.style.background = `linear-gradient(135deg, ${accent}18, ${accent}35)`; }} />
          <div className="absolute inset-0 bg-gradient-to-t from-void/70 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <p className="font-mono text-[11px] uppercase tracking-widest text-text-2 mb-1">{idx + 1} / {screenshots.length}</p>
            <p className="font-body text-sm text-text-1">{screenshots[idx].caption}</p>
          </div>
          {screenshots.length > 1 && (
            <>
              <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-ink/70 border border-wire hover:border-gold flex items-center justify-center transition-all"><ChevronLeft size={18} /></button>
              <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-ink/70 border border-wire hover:border-gold flex items-center justify-center transition-all"><ChevronRight size={18} /></button>
            </>
          )}
        </div>
        {screenshots.length > 1 && (
          <div className="flex gap-3 mt-4 justify-center flex-wrap">
            {screenshots.map((s, i) => (
              <button key={i} onClick={() => setIdx(i)} className="relative w-20 aspect-[16/9] rounded-lg overflow-hidden border-2 transition-all" style={{ borderColor: i === idx ? accent : "rgba(255,255,255,0.1)" }}>
                <img src={s.src} alt="" className="w-full h-full object-cover opacity-70" />
              </button>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

/* ─── Status pill ─── */
function StatusPill({ status }: { status: Project["status"] }) {
  const map: Record<string, { label: string; color: string }> = {
    live: { label: "Live", color: "#4ade80" },
    building: { label: "Building", color: GOLD },
    concept: { label: "Concept", color: "#9b8e72" },
  };
  const s = map[status] ?? map.concept;
  return (
    <span className="font-mono text-[11px] font-semibold px-2.5 py-1 rounded-md whitespace-nowrap"
      style={{ color: s.color, background: `${s.color}14`, border: `1px solid ${s.color}33` }}>
      {s.label}
    </span>
  );
}

/* ─── Expandable row ─── */
function ProjectRow({ project, index, isOpen, onToggle, onOpenLightbox }: {
  project: Project; index: number; isOpen: boolean; onToggle: () => void;
  onOpenLightbox: (s: ProjectScreenshot[], idx: number, accent: string) => void;
}) {
  const accent = project.accentColor;
  const shots = project.screenshots ?? [];
  // Fall back to the single hero image as a one-item gallery.
  const gallery: ProjectScreenshot[] = shots.length
    ? shots
    : project.image ? [{ src: project.image, caption: project.title }] : [];

  return (
    <motion.div layout initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.4, delay: (index % 6) * 0.04 }}
      className="rounded-2xl overflow-hidden cursor-pointer transition-colors"
      style={{ background: isOpen ? `${accent}08` : "var(--surface)", border: `1px solid ${isOpen ? `${accent}45` : "var(--wire)"}` }}
      onClick={onToggle}>
      {/* Always-visible row */}
      <div className="flex items-center gap-4 p-5 md:px-6 flex-wrap">
        <span className="w-10 h-10 rounded-xl shrink-0 grid place-items-center font-display font-black text-lg"
          style={{ background: `${accent}1a`, border: `1px solid ${accent}33`, color: accent }}>
          {project.title[0]}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-0.5">
            <h3 className="font-display text-base md:text-lg uppercase tracking-wide text-text-1">{project.title}</h3>
            <span className="font-mono text-[10px] uppercase tracking-widest text-text-3">{project.year} · {project.category}</span>
          </div>
          <p className="text-text-2 text-[13.5px] leading-snug line-clamp-1">{project.tagline}</p>
        </div>
        <div className="flex items-center gap-2.5 shrink-0">
          <StatusPill status={project.status} />
          {gallery.length > 0 && (
            <span className="font-mono text-[10px] text-text-3 hidden sm:inline">{gallery.length} shot{gallery.length > 1 ? "s" : ""}</span>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} aria-label="Open live site"
              className="w-8 h-8 rounded-lg grid place-items-center border border-wire text-text-2 hover:text-gold hover:border-gold/50 transition-colors">
              <ExternalLink size={13} />
            </a>
          )}
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }} className="text-text-3 flex">
            <ChevronDown size={17} />
          </motion.div>
        </div>
      </div>

      {/* Expanded */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div key="d" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }} className="overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="px-5 md:px-6 pb-6 pt-1" style={{ borderTop: `1px solid ${accent}1f` }}>

              {/* Screenshot gallery */}
              {gallery.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-5">
                  {gallery.map((s, i) => (
                    <button key={i} onClick={() => onOpenLightbox(gallery, i, accent)}
                      className="group relative aspect-[16/10] rounded-xl overflow-hidden border border-wire hover:border-[var(--c)] transition-all"
                      style={{ ["--c" as string]: accent } as React.CSSProperties}>
                      <img src={s.src} alt={s.caption} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => { const t = e.currentTarget; t.style.display = "none"; (t.parentElement as HTMLElement).style.background = `linear-gradient(135deg, ${accent}18, ${accent}38)`; }} />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              )}

              {/* Copy + capabilities + stack */}
              <div className="grid md:grid-cols-3 gap-7 mt-6">
                <div className="md:col-span-1">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] mb-3" style={{ color: accent }}>Overview</p>
                  <p className="text-text-2 text-[13.5px] leading-[1.75]">{project.longDescription || project.description}</p>
                  <div className="flex flex-wrap gap-2 mt-5">
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-mono text-[11px] font-bold uppercase tracking-widest text-ink transition-transform hover:-translate-y-0.5"
                        style={{ background: accent }}>
                        View Live <ExternalLink size={12} />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-wire hover:border-gold/50 font-mono text-[11px] uppercase tracking-widest text-text-1 transition-colors">
                        <Github size={13} /> Code
                      </a>
                    )}
                  </div>
                </div>

                {project.capabilities && project.capabilities.length > 0 && (
                  <div className="md:col-span-1">
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] mb-3" style={{ color: accent }}>Key capabilities</p>
                    <div className="flex flex-col gap-2.5">
                      {project.capabilities.map((cap) => (
                        <div key={cap.label} className="flex items-start gap-2.5">
                          <span className="text-base leading-none mt-0.5">{cap.icon}</span>
                          <div>
                            <span className="font-mono text-[11px] font-bold uppercase tracking-wide" style={{ color: accent }}>{cap.label}</span>
                            <p className="text-text-3 text-[12px] leading-relaxed">{cap.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="md:col-span-1">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] mb-3" style={{ color: accent }}>Stack</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((t) => (
                      <span key={t} className="font-mono text-[10px] uppercase px-2.5 py-1 rounded-full bg-ink border border-wire text-text-2">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Page ─── */
export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [openId, setOpenId] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<{ screenshots: ProjectScreenshot[]; idx: number; accent: string } | null>(null);

  const openLightbox = useCallback((screenshots: ProjectScreenshot[], idx: number, accent: string) => {
    setLightbox({ screenshots, idx, accent });
  }, []);

  const liveCount = projects.filter((p) => p.status === "live").length;
  const filtered = projects.filter((p) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Client Work") return p.category === "portfolio";
    return p.category.toLowerCase() === activeFilter.toLowerCase();
  });

  return (
    <div className="min-h-screen bg-ink">
      {/* Hero */}
      <section className="relative pt-16 pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-gold/[0.08] blur-[140px] rounded-full -translate-y-1/2" />
        </div>
        <div className="relative max-w-5xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="font-mono text-[12px] uppercase tracking-[0.26em] text-gold mb-7">
            Selected work — {liveCount} live
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
            className="font-display font-black uppercase tracking-[-0.02em] leading-[0.86] text-text-1"
            style={{ fontSize: "var(--type-mega, clamp(3rem,12vw,9rem))" }}>
            Real<br /><span className="text-gold">products.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.12 }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-text-2">
            AI SaaS, platforms, and a four-product network — built solo, from ₦0 to live and billing.
            Not mockups: real users, real revenue. <span className="text-gold">Tap any project to open its gallery.</span>
          </motion.p>

          {/* Filters */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.16 }} className="flex flex-wrap gap-2 mt-9">
            {FILTERS.map((f) => (
              <button key={f} onClick={() => setActiveFilter(f)}
                className="px-5 py-2 rounded-full font-mono text-[11px] uppercase tracking-widest transition-all duration-200"
                style={activeFilter === f
                  ? { background: GOLD, color: "#0b0a08", fontWeight: 700 }
                  : { background: "var(--surface)", border: "1px solid var(--wire)", color: "var(--text-2)" }}>
                {f}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* List */}
      <section className="pb-28">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <motion.div layout className="flex flex-col gap-3.5">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <ProjectRow key={project.id} project={project} index={i}
                  isOpen={openId === project.id}
                  onToggle={() => setOpenId(openId === project.id ? null : project.id)}
                  onOpenLightbox={openLightbox} />
              ))}
            </AnimatePresence>
            {filtered.length === 0 && (
              <p className="py-28 text-center text-text-3 font-mono text-sm">No projects in this category yet.</p>
            )}
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {lightbox && (
          <Lightbox screenshots={lightbox.screenshots} initial={lightbox.idx} accent={lightbox.accent} onClose={() => setLightbox(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
