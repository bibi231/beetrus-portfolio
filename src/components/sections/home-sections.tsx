"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Play } from "lucide-react";
import { musicData, musicLinks } from "@/data/music";
import { projects } from "@/data/projects";

const TEN_TEN = musicData.releases.find((r) => r.featured) ?? musicData.releases[0];
const LIVE = projects.filter((p) => p.status === "live");

// Real TEN/TEN album cover (train photo) — self-hosted (signed CDN URLs rotate).
export const TENTEN_COVER = "/music/ten-ten-cover.jpg";

/* ============================== HERO ============================== */
export function HeroSection() {
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden">
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${TENTEN_COVER})`, filter: "saturate(0.92) contrast(1.05)" }}
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,10,11,0.5) 0%, rgba(10,10,11,0.32) 38%, rgba(10,10,11,0.92) 86%, #0a0a0b 100%)" }} />
        <div className="absolute inset-0 opacity-50" style={{ background: "radial-gradient(120% 80% at 50% 100%, rgba(201,162,39,0.12), transparent 60%)" }} />
      </div>

      <div className="absolute left-6 top-28 z-10 lg:left-8">
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-text-1" style={{ textShadow: "0 1px 10px rgba(0,0,0,0.7)" }}>
          Abuja, Nigeria <span className="mx-1 text-gold">/</span> Engineer · Artist
        </span>
      </div>

      <div className="relative z-10 px-6 pb-14 lg:px-8 lg:pb-20">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}>
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-gold">Engineer · Founder · Recording Artist</p>
          <h1 className="font-display uppercase text-text-1" style={{ fontSize: "var(--type-mega)", lineHeight: 0.86, letterSpacing: "0.005em" }}>
            Beetrus
          </h1>
          <p className="mt-5 max-w-xl font-body text-base leading-relaxed text-text-2 md:text-lg">
            I build AI products that ship and make money — and I make the music that plays while they run.
            One person, two worlds: <span className="text-pulse">software</span> &amp; <span className="text-gold">sound</span>.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link href="/music" className="group inline-flex items-center justify-center gap-2 rounded-none px-7 py-3.5 font-mono text-xs uppercase tracking-[0.16em] text-black transition-transform hover:-translate-y-0.5" style={{ background: "var(--gold)" }}>
              <Play size={15} fill="currentColor" /> Enter the Booth
            </Link>
            <Link href="/work" className="group inline-flex items-center justify-center gap-2 rounded-none border border-wire px-7 py-3.5 font-mono text-xs uppercase tracking-[0.16em] text-text-1 transition-colors hover:border-pulse">
              Enter the Lab <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="relative z-10 flex items-center gap-2 px-6 pb-6 font-mono text-[10px] uppercase tracking-[0.25em] text-text-3 lg:px-8">
        <span className="h-px w-8 bg-text-3" /> Scroll
      </div>
    </section>
  );
}

/* ============================== MARQUEES ============================== */
function Ticker({ text, accent }: { text: string; accent: string }) {
  return (
    <div className="flex overflow-hidden border-y border-wire py-4 select-none" style={{ background: "#0a0a0b" }}>
      <motion.div className="flex flex-shrink-0 whitespace-nowrap" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 22, ease: "linear", repeat: Infinity }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} className="font-display uppercase" style={{ fontSize: "clamp(2.2rem, 7vw, 5.5rem)", lineHeight: 1, color: accent }}>
            {text}&nbsp;&nbsp;—&nbsp;&nbsp;
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function MegaMarquee() {
  return <Ticker text="TEN / TEN — THE LOST FILES — OUT NOW" accent="var(--gold)" />;
}

export function TechMarquee() {
  return (
    <div className="flex overflow-hidden border-y border-wire py-3 select-none">
      <motion.div className="flex flex-shrink-0 whitespace-nowrap" animate={{ x: ["-50%", "0%"] }} transition={{ duration: 28, ease: "linear", repeat: Infinity }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} className="font-mono text-xs uppercase tracking-[0.25em] text-text-2">
            React&nbsp;◦&nbsp;Next.js&nbsp;◦&nbsp;TypeScript&nbsp;◦&nbsp;Neon&nbsp;◦&nbsp;Gemini&nbsp;◦&nbsp;Playwright&nbsp;◦&nbsp;Squad&nbsp;◦&nbsp;Afrosounds&nbsp;◦&nbsp;R&amp;B&nbsp;◦&nbsp;Drill&nbsp;◦&nbsp;
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ============================== FEATURED RELEASE ============================== */
export function FeaturedReleaseSection() {
  return (
    <section className="relative px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <motion.div className="relative" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7 }}>
          <div className="overflow-hidden rounded-sm border border-wire shadow-2xl">
            <img src={TENTEN_COVER} alt="TEN/TEN — The Lost Files" className="aspect-square w-full object-cover" loading="lazy" />
          </div>
          <span className="absolute -left-3 -top-3 rounded-none bg-gold px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-black">New Album</span>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, delay: 0.1 }}>
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-gold">Featured Release · {TEN_TEN.year}</p>
          <h2 className="mt-3 font-display uppercase text-text-1" style={{ fontSize: "var(--type-giant)", lineHeight: 0.9 }}>TEN/TEN</h2>
          <p className="mt-1 font-display text-2xl uppercase tracking-wide text-text-2">The Lost Files</p>
          <div className="mt-5 flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-text-2">
            <span className="rounded border border-wire px-2 py-1">{TEN_TEN.trackList?.length ?? 10} Tracks</span>
            <span className="rounded border border-wire px-2 py-1">{TEN_TEN.label}</span>
            <span className="rounded border border-wire px-2 py-1">Album</span>
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={musicLinks.tenTenSmartLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-none bg-gold px-6 py-3 font-mono text-xs uppercase tracking-[0.16em] text-black transition-transform hover:-translate-y-0.5">
              <Play size={14} fill="currentColor" /> Listen Everywhere
            </a>
            <Link href="/music" className="inline-flex items-center gap-2 rounded-none border border-wire px-6 py-3 font-mono text-xs uppercase tracking-[0.16em] text-text-1 transition-colors hover:border-gold">
              Full Tracklist <ArrowRight size={14} />
            </Link>
          </div>
          <div className="mt-8 overflow-hidden rounded-sm border border-wire">
            <iframe title="TEN/TEN on Spotify" src="https://open.spotify.com/embed/album/4wYvePhIgMGqAiekYBIcrb?theme=0" width="100%" height="152" frameBorder="0" loading="lazy" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" style={{ display: "block" }} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================== LIVE PRODUCTS ============================== */
export function LiveProductsSection() {
  return (
    <section className="relative px-6 py-24 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-pulse">The Lab · {LIVE.length} Live</p>
            <h2 className="mt-2 font-display uppercase text-text-1" style={{ fontSize: "clamp(2.6rem, 7vw, 5rem)", lineHeight: 0.9 }}>
              Real Products.<br /><span className="text-pulse">Real Revenue.</span>
            </h2>
          </div>
          <a href="https://trueweb.com.ng" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-text-2 transition-colors hover:text-text-1">
            Built at TrueWeb <ArrowUpRight size={14} />
          </a>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {LIVE.slice(0, 6).map((p) => {
            const inner = (
              <>
                <div className="flex items-start justify-between">
                  <span className="font-display text-3xl uppercase leading-none" style={{ color: p.accentColor }}>{p.title}</span>
                  <span className="badge-live shrink-0">Live</span>
                </div>
                <p className="mt-3 font-body text-sm leading-relaxed text-text-2">{p.tagline}</p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {p.tags.slice(0, 4).map((t) => (
                    <span key={t} className="rounded border border-wire px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-text-2">{t}</span>
                  ))}
                </div>
              </>
            );
            const cls = "group flex flex-col rounded-sm border border-wire bg-white/[0.015] p-6 transition-colors hover:bg-white/[0.04]";
            return p.liveUrl ? (
              <a key={p.id} href={p.liveUrl} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
            ) : (
              <div key={p.id} className={cls}>{inner}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================== DUAL WORLD ============================== */
export function DualWorldSection() {
  return (
    <section className="grid md:grid-cols-2">
      {/* THE ARTIST — durag portrait, dark + a touch opaque so the type still leads */}
      <Link href="/music" className="group relative flex min-h-[68vh] flex-col justify-end overflow-hidden p-8 lg:p-12" style={{ background: "#0a0a0b" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/archive/beetrus-1.jpg" alt="Beetrus in a durag" className="absolute inset-0 h-full w-full object-cover object-top opacity-40 grayscale transition-all duration-700 ease-out group-hover:opacity-55 group-hover:scale-[1.04]" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #0a0a0b 8%, rgba(10,10,11,0.58) 46%, rgba(10,10,11,0.2) 100%)" }} />
        <div className="absolute inset-0 opacity-30 transition-opacity group-hover:opacity-50" style={{ background: "radial-gradient(100% 80% at 50% 0%, rgba(217,178,62,0.22), transparent 70%)" }} />
        <p className="relative font-mono text-[11px] uppercase tracking-[0.28em] text-gold">The Artist</p>
        <h3 className="relative mt-3 font-display uppercase text-text-1" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", lineHeight: 0.9 }}>Beetrus</h3>
        <p className="relative mt-3 max-w-sm font-body text-sm text-text-1/80">Afrosounds · R&amp;B · Drill. Abuja late-night music, built for the speakers.</p>
        <span className="relative mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-gold">Hear it <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" /></span>
      </Link>
      {/* THE ENGINEER — agbada portrait on the light side, type anchored over the fabric */}
      <Link href="/work" className="group relative flex min-h-[68vh] flex-col justify-end overflow-hidden p-8 lg:p-12" style={{ background: "var(--paper)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/archive/beetrus-2.jpg" alt="Beetrus in agbada" className="absolute inset-0 h-full w-full object-cover object-top opacity-95 transition-all duration-700 ease-out group-hover:scale-[1.04]" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, var(--paper) 12%, rgba(239,230,212,0.5) 44%, transparent 100%)" }} />
        <p className="relative font-mono text-[11px] uppercase tracking-[0.28em]" style={{ color: "#7a5212" }}>The Engineer</p>
        <h3 className="relative mt-3 font-display uppercase" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", lineHeight: 0.9, color: "#0a0a0b" }}>Builder</h3>
        <p className="relative mt-3 max-w-sm font-body text-sm font-medium" style={{ color: "#2a241a" }}>Fullstack engineer &amp; founder. AI SaaS shipped under TrueWeb Solutions.</p>
        <span className="relative mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em]" style={{ color: "#7a5212" }}>See the work <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" /></span>
      </Link>
    </section>
  );
}

/* ============================== FOUNDER'S LETTER ============================== */
export function FoundersLetter() {
  return (
    <section className="px-6 py-28 lg:px-8" style={{ background: "var(--paper)", color: "#0a0a0b", borderTop: "1px solid rgba(10,10,11,0.14)" }}>
      <div className="mx-auto max-w-3xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em]" style={{ color: "#7a5212" }}>A Word</p>
        <h2 className="mt-4 font-display uppercase" style={{ fontSize: "clamp(2.4rem, 6vw, 4.5rem)", lineHeight: 0.92, color: "#0a0a0b" }}>Most people pick one lane<span style={{ color: "#a8742e" }}>.</span></h2>
        <div className="mt-7 space-y-5 font-body text-lg leading-relaxed" style={{ color: "#181410" }}>
          <p>I never could. By day I architect AI products — support bots, scrapers, payment engines — that real Nigerian businesses pay for. By night I&apos;m Beetrus, putting Abuja&apos;s late nights into sound.</p>
          <p>The same instinct drives both: take something messy and make it move. This site is that — two worlds, one person, no apologies. <span className="font-semibold" style={{ color: "#8a5a12" }}>TEN/TEN: The Lost Files</span> is out now. The products are live. Look around.</p>
          <p className="font-display text-2xl uppercase" style={{ letterSpacing: "0.02em", color: "#0a0a0b" }}>— Beetrus</p>
        </div>
      </div>
    </section>
  );
}

/* ============================== STATS ============================== */
export function StatsBelt() {
  const stats = [
    { n: `${LIVE.length}+`, l: "Live Products" },
    { n: `${TEN_TEN.trackList?.length ?? 10}`, l: "Tracks · TEN/TEN" },
    { n: "4", l: "Languages · SupportAI" },
    { n: "2AM", l: "Studio Hours" },
  ];
  return (
    <section className="border-t border-wire px-6 py-16 lg:px-8" style={{ background: "#0a0a0b" }}>
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.l}>
            <div className="font-display text-5xl uppercase text-text-1 md:text-6xl">{s.n}</div>
            <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-text-2">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
