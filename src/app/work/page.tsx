"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Github, X, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { projects, Project, ProjectScreenshot } from "@/data/projects";

/* ─── Filter Bar ─────────────────────────────────────────────────── */
type Filter = "All" | "SaaS" | "Platform" | "App" | "Client Work";
const FILTERS: Filter[] = ["All", "SaaS", "Platform", "App", "Client Work"];

/* ─── Screenshot Lightbox ────────────────────────────────────────── */
function Lightbox({
  screenshots,
  initial,
  onClose,
  accent,
}: {
  screenshots: ProjectScreenshot[];
  initial: number;
  onClose: () => void;
  accent: string;
}) {
  const [idx, setIdx] = useState(initial);
  const prev = () => setIdx((i) => (i - 1 + screenshots.length) % screenshots.length);
  const next = () => setIdx((i) => (i + 1) % screenshots.length);

  return (
    <motion.div
      key="lightbox"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[800] flex items-center justify-center bg-void/90 backdrop-blur-xl p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        className="relative w-full max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 flex items-center gap-2 font-mono text-[11px] uppercase text-text-2 hover:text-text-1 transition-colors"
        >
          <X size={14} /> Close
        </button>

        {/* Image */}
        <div
          className="relative aspect-[16/9] rounded-2xl overflow-hidden border"
          style={{ borderColor: `${accent}30` }}
        >
          <img
            src={screenshots[idx].src}
            alt={screenshots[idx].caption}
            className="w-full h-full object-cover"
            onError={(e) => {
              const t = e.target as HTMLImageElement;
              t.style.display = "none";
              t.parentElement!.style.background = `linear-gradient(135deg, ${accent}18, ${accent}35)`;
            }}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-void/70 via-transparent to-transparent" />

          {/* Caption */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <p className="font-mono text-[11px] uppercase tracking-widest text-text-2 mb-1">
              {idx + 1} / {screenshots.length}
            </p>
            <p className="font-body text-sm text-text-1">{screenshots[idx].caption}</p>
          </div>

          {/* Nav arrows */}
          {screenshots.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-ink/70 border border-wire hover:border-[var(--accent)] flex items-center justify-center transition-all"
                style={{ ["--accent" as any]: accent }}
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-ink/70 border border-wire hover:border-[var(--accent)] flex items-center justify-center transition-all"
                style={{ ["--accent" as any]: accent }}
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}
        </div>

        {/* Thumbnail strip */}
        {screenshots.length > 1 && (
          <div className="flex gap-3 mt-4 justify-center">
            {screenshots.map((s, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className="relative w-20 aspect-[16/9] rounded-lg overflow-hidden border-2 transition-all"
                style={{ borderColor: i === idx ? accent : "rgba(255,255,255,0.1)" }}
              >
                <img src={s.src} alt="" className="w-full h-full object-cover opacity-70" />
              </button>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

/* ─── Project Card ───────────────────────────────────────────────── */
function ProjectCard({
  project,
  index,
  onOpenLightbox,
}: {
  project: Project;
  index: number;
  onOpenLightbox: (screenshots: ProjectScreenshot[], idx: number, accent: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const isOdd = index % 2 !== 0;
  const screenshots = project.screenshots ?? [];

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      className="w-full border-b border-wire last:border-b-0 py-16 md:py-28 group"
      style={{ ["--accent" as any]: project.accentColor }}
    >
      {/* ── Top Row: Image + Meta ── */}
      <div className={`flex flex-col md:flex-row gap-10 lg:gap-20 items-start`}>

        {/* Image / Gallery Preview */}
        <div className={`w-full md:w-1/2 shrink-0 ${isOdd ? "md:order-last" : ""}`}>
          <div
            className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-surface border border-wire group-hover:border-[var(--accent)] transition-all duration-500 cursor-pointer"
            onClick={() => screenshots.length && onOpenLightbox(screenshots, 0, project.accentColor)}
          >
            {project.image ? (
              <>
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    const t = e.currentTarget;
                    t.style.display = "none";
                    const parent = t.parentElement as HTMLElement;
                    parent.style.background = `linear-gradient(135deg, ${project.accentColor}18, ${project.accentColor}38)`;
                    if (!parent.querySelector(".img-fallback")) {
                      const span = document.createElement("span");
                      span.className =
                        "img-fallback absolute inset-0 flex items-center justify-center font-display text-2xl md:text-4xl font-black tracking-tight px-4 text-center";
                      span.style.color = project.accentColor;
                      span.textContent = project.title;
                      parent.appendChild(span);
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
              </>
            ) : (
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${project.accentColor}15, ${project.accentColor}30)` }}
              >
                <span className="font-display text-3xl font-bold tracking-tight" style={{ color: project.accentColor }}>
                  {project.title}
                </span>
              </div>
            )}

            {/* Screenshot count badge */}
            {screenshots.length > 1 && (
              <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-ink/80 backdrop-blur-sm border border-wire px-3 py-1.5 rounded-full font-mono text-[10px] text-text-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                {screenshots.length} screenshots
              </div>
            )}

            {/* Expand icon */}
            {screenshots.length > 0 && (
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-ink/70 backdrop-blur-md border border-wire px-4 py-2 rounded-full font-mono text-[11px] uppercase text-text-1 tracking-widest">
                  View Gallery
                </div>
              </div>
            )}
          </div>

          {/* Thumbnail row */}
          {screenshots.length > 1 && (
            <div className="flex gap-2 mt-3">
              {screenshots.slice(0, 4).map((s, i) => (
                <button
                  key={i}
                  onClick={() => onOpenLightbox(screenshots, i, project.accentColor)}
                  className="relative flex-1 aspect-[16/9] rounded-lg overflow-hidden border border-wire hover:border-[var(--accent)] transition-all"
                >
                  <img src={s.src} alt="" className="w-full h-full object-cover opacity-60 hover:opacity-90 transition-opacity" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          {/* Badge row */}
          <div className="flex flex-wrap items-center gap-3 mb-5 font-mono text-[10px]">
            <span className="bg-surface border border-wire px-3 py-1 rounded-full text-text-2">
              {project.year}
            </span>
            {project.status === "live" ? (
              <span className="badge-live">Live</span>
            ) : project.status === "building" ? (
              <span className="badge-building">Building</span>
            ) : (
              <span className="uppercase tracking-widest px-3 py-1 rounded-full border text-text-2 border-wire">
                Concept
              </span>
            )}
            <span className="text-text-3 uppercase tracking-widest">{project.category}</span>
          </div>

          <h2
            className="font-display text-4xl md:text-5xl xl:text-6xl uppercase tracking-tight mb-4 leading-[0.95]"
            style={{ color: project.accentColor }}
          >
            {project.title}
          </h2>

          <p className="text-text-1 text-lg font-medium mb-4 leading-relaxed">{project.tagline}</p>

          <p className="text-text-2 leading-relaxed mb-6">{project.description}</p>

          {/* Tag pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] uppercase bg-ink border border-wire px-3 py-1.5 rounded-full text-text-2 hover:border-[var(--accent)] transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-mono text-[12px] uppercase tracking-widest font-bold text-ink transition-all hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0"
                style={{ backgroundColor: project.accentColor }}
              >
                View Live <ExternalLink size={13} />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-wire hover:border-text-1 transition-colors font-mono text-[12px] uppercase tracking-widest text-text-1"
              >
                <Github size={14} /> Code
              </a>
            )}
            {(project.longDescription || project.capabilities) && (
              <button
                onClick={() => setExpanded((x) => !x)}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-wire hover:border-[var(--accent)] text-text-2 hover:text-text-1 transition-all font-mono text-[11px] uppercase tracking-widest"
              >
                {expanded ? "Less" : "Full breakdown"}
                <motion.span animate={{ rotate: expanded ? 90 : 0 }} transition={{ duration: 0.2 }}>
                  <ArrowRight size={12} />
                </motion.span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Expanded Details Panel ── */}
      <AnimatePresence>
        {expanded && (project.longDescription || project.capabilities) && (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div
              className="mt-12 pt-12 border-t"
              style={{ borderColor: `${project.accentColor}25` }}
            >
              <div className="grid md:grid-cols-2 gap-12">
                {/* Long description */}
                {project.longDescription && (
                  <div>
                    <h3
                      className="font-mono text-[10px] uppercase tracking-[0.25em] mb-4"
                      style={{ color: project.accentColor }}
                    >
                      // Overview
                    </h3>
                    <p className="text-text-2 leading-[1.8] text-[15px]">{project.longDescription}</p>
                  </div>
                )}

                {/* Capabilities grid */}
                {project.capabilities && (
                  <div>
                    <h3
                      className="font-mono text-[10px] uppercase tracking-[0.25em] mb-4"
                      style={{ color: project.accentColor }}
                    >
                      // Key Capabilities
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {project.capabilities.map((cap) => (
                        <div
                          key={cap.label}
                          className="p-4 rounded-xl border border-wire bg-surface/40 hover:border-[var(--accent)] transition-colors group/cap"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-lg">{cap.icon}</span>
                            <span
                              className="font-mono text-[11px] font-bold uppercase tracking-wider"
                              style={{ color: project.accentColor }}
                            >
                              {cap.label}
                            </span>
                          </div>
                          <p className="text-text-2 text-[12px] leading-relaxed">{cap.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

/* ─── Page ───────────────────────────────────────────────────────── */
export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [lightbox, setLightbox] = useState<{
    screenshots: ProjectScreenshot[];
    idx: number;
    accent: string;
  } | null>(null);

  const openLightbox = useCallback(
    (screenshots: ProjectScreenshot[], idx: number, accent: string) => {
      setLightbox({ screenshots, idx, accent });
    },
    []
  );

  const liveCount = projects.filter((p) => p.status === "live").length;

  const filteredProjects = projects.filter((p) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Client Work") return p.category === "portfolio";
    return p.category.toLowerCase() === activeFilter.toLowerCase();
  });

  return (
    <div className="min-h-screen bg-ink">

      {/* ── Hero Header ── */}
      <section className="relative pt-16 pb-24 overflow-hidden">
        {/* Atmospheric bg */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-pulse/5 blur-[120px] rounded-full -translate-y-1/2" />
          <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-ember/5 blur-[100px] rounded-full -translate-y-1/3" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="editorial-kicker mb-8"
          >
            Built at TrueWeb Solutions · {liveCount} live
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="font-display uppercase tracking-[-0.01em] leading-[0.84] mb-6 text-text-1"
            style={{ fontSize: "var(--type-mega)" }}
          >
            REAL
            <br />
            <span className="text-pulse">PRODUCTS.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-text-1 text-lg md:text-xl max-w-2xl mb-3 leading-relaxed"
          >
            AI SaaS, platforms, and a four-product network — built solo, from ₦0 to live and billing.
            <span className="text-lime font-mono text-sm"> {liveCount} shipped and in production.</span>
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.12 }}
            className="text-text-2 font-mono text-sm max-w-xl mb-8"
          >
            Not case-study mockups. Real users, real revenue, NGN + USD.
          </motion.p>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.13 }} className="mb-12">
            <a href="https://trueweb.com.ng" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-black transition-transform hover:-translate-y-0.5"
              style={{ background: "var(--pulse)" }}>
              Visit TrueWeb Solutions <ExternalLink size={13} />
            </a>
          </motion.div>

          {/* Filter chips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="flex flex-wrap gap-2"
          >
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-5 py-2 rounded-full font-mono text-[11px] uppercase tracking-widest transition-all duration-200 ${
                  activeFilter === f
                    ? "bg-pulse text-ink font-bold shadow-[0_0_20px_rgba(0,229,255,0.2)]"
                    : "bg-surface border border-wire text-text-2 hover:text-text-1 hover:border-pulse/40"
                }`}
              >
                {f}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Project Feed ── */}
      <section className="border-t border-wire">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div layout>
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={i}
                  onOpenLightbox={openLightbox}
                />
              ))}
            </AnimatePresence>

            {filteredProjects.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-32 text-center text-text-3 font-mono text-sm"
              >
                No projects in this category yet.
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox && (
          <Lightbox
            screenshots={lightbox.screenshots}
            initial={lightbox.idx}
            accent={lightbox.accent}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
