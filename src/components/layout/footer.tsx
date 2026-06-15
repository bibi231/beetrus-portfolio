"use client";

import Link from "next/link";
import { Github, Instagram, Youtube, Mail } from "lucide-react";
import { MUSIC_IDS } from "@/data/musicIds";

const NETWORK = [
  { name: "TrueWeb", url: "https://trueweb.com.ng", color: "#00d4d4", note: "The studio" },
  { name: "SupportAI", url: "https://supportai.com.ng", color: "#0ea5e9", note: "AI support bots" },
  { name: "ReplyAI", url: "https://replyai.com.ng", color: "#6366f1", note: "AI email replies" },
  { name: "HarvestAI", url: "https://harvestai.com.ng", color: "#f5a623", note: "AI lead scraping" },
];

const NAV = [
  { label: "Home", href: "/" },
  { label: "Music", href: "/music" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Store", href: "/store" },
  { label: "Contact", href: "/contact" },
];

const SOCIALS = [
  { label: "Instagram", href: `https://instagram.com/${MUSIC_IDS.instagramHandle}`, icon: Instagram },
  { label: "YouTube", href: "https://www.youtube.com/@beetrus", icon: Youtube },
  { label: "GitHub", href: "https://github.com/bibi231", icon: Github },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-32 border-t border-wire" style={{ background: "linear-gradient(180deg, #0a0a0b 0%, #050505 100%)" }}>
      {/* Top accent line */}
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(201,162,39,0.5), rgba(0,212,212,0.4), transparent)" }} />

      <div className="mx-auto max-w-7xl px-6 pb-10 pt-20 lg:px-8">
        {/* Top grid */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-baseline gap-1">
              <span className="font-display text-5xl uppercase leading-none tracking-tight text-text-1">Beetrus</span>
              <span className="text-gold">.</span>
            </Link>
            <p className="mt-5 max-w-sm font-body text-sm leading-relaxed text-text-2">
              Software engineer &amp; recording artist in Abuja, Nigeria. Building AI products at TrueWeb — and dropping music as Beetrus.
            </p>
            <div className="mt-6 flex gap-2">
              {SOCIALS.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  className="grid h-9 w-9 place-items-center rounded-lg border border-wire bg-white/[0.03] text-text-2 transition-colors hover:border-gold/40 hover:text-text-1">
                  <s.icon size={15} />
                </a>
              ))}
              <Link href="/contact" aria-label="Email"
                className="grid h-9 w-9 place-items-center rounded-lg border border-wire bg-white/[0.03] text-text-2 transition-colors hover:border-gold/40 hover:text-text-1">
                <Mail size={15} />
              </Link>
            </div>
          </div>

          {/* Index */}
          <div>
            <h4 className="mb-5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-text-1">Index</h4>
            <ul className="space-y-2.5">
              {NAV.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="font-body text-sm text-text-2 transition-colors hover:text-text-1">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Listen */}
          <div>
            <h4 className="mb-5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-text-1">Listen</h4>
            <ul className="space-y-2.5">
              <li><a href="https://ffm.to/tenten-lost-files" target="_blank" rel="noopener noreferrer" className="font-body text-sm text-text-2 transition-colors hover:text-gold">TEN/TEN · The Lost Files</a></li>
              <li><a href="https://open.spotify.com/artist/3QxHGPz8Adv32yy4SG9moG" target="_blank" rel="noopener noreferrer" className="font-body text-sm text-text-2 transition-colors hover:text-text-1">Spotify</a></li>
              <li><a href="https://music.apple.com/us/artist/beetrus/1486745458" target="_blank" rel="noopener noreferrer" className="font-body text-sm text-text-2 transition-colors hover:text-text-1">Apple Music</a></li>
              <li><a href="https://audiomack.com/beetrus" target="_blank" rel="noopener noreferrer" className="font-body text-sm text-text-2 transition-colors hover:text-text-1">Audiomack</a></li>
            </ul>
          </div>
        </div>

        {/* TrueWeb Network */}
        <div className="mt-14">
          <h4 className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-text-2">The TrueWeb Network</h4>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {NETWORK.map((p) => (
              <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-xl border border-wire bg-white/[0.02] px-4 py-3 transition-colors hover:bg-white/[0.04]"
                style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                <span className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-md font-display text-sm uppercase text-black" style={{ background: p.color }}>
                  {p.name[0]}
                </span>
                <span>
                  <span className="block font-body text-sm font-semibold text-text-1">{p.name}</span>
                  <span className="block font-mono text-[10px] uppercase tracking-wider text-text-2">{p.note}</span>
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-wire pt-7 font-mono text-[11px] text-text-2 md:flex-row">
          <p>© {year} <span className="text-text-1">Beetrus</span> · part of the <a href="https://trueweb.com.ng" target="_blank" rel="noopener noreferrer" className="text-pulse hover:underline">TrueWeb Network</a></p>
          <p className="inline-flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: "#4ade80", boxShadow: "0 0 6px #4ade80" }} />
            All systems operational
          </p>
        </div>
      </div>
    </footer>
  );
}
