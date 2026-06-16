"use client";

import { useState } from "react";
import Link from "next/link";
import { Instagram, Youtube, Github, Music2 } from "lucide-react";

const NETWORK = [
  { name: "TrueWeb", url: "https://trueweb.com.ng", note: "The studio" },
  { name: "SupportAI", url: "https://supportai.com.ng", note: "AI support bots" },
  { name: "ReplyAI", url: "https://replyai.com.ng", note: "AI email replies" },
  { name: "HarvestAI", url: "https://harvestai.com.ng", note: "AI lead scraping" },
];

const EXPLORE = [
  { label: "Music", href: "/music" },
  { label: "Work", href: "/work" },
  { label: "Journal", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Store", href: "/store" },
  { label: "Contact", href: "/contact" },
];

const LISTEN = [
  { label: "TEN/TEN — The Lost Files", href: "https://ffm.to/tenten-lost-files" },
  { label: "Spotify", href: "https://open.spotify.com/artist/3QxHGPz8Adv32yy4SG9moG" },
  { label: "Apple Music", href: "https://music.apple.com/us/artist/beetrus/1486745458" },
  { label: "Audiomack", href: "https://audiomack.com/beetrus" },
];

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com/beetrus_gg", icon: Instagram },
  { label: "YouTube", href: "https://www.youtube.com/@beetrus", icon: Youtube },
  { label: "GitHub", href: "https://github.com/bibi231", icon: Github },
];

export function Footer() {
  const year = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");

  const subscribe = async (e: { preventDefault(): void }) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setStatus("err"); return; }
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? "ok" : "err");
    } catch {
      setStatus("err");
    }
  };

  return (
    <footer className="relative mt-32 border-t border-wire" style={{ background: "linear-gradient(180deg, #0b0a08 0%, #060504 100%)" }}>
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg, transparent, var(--gold), var(--ember), transparent)" }} />

      <div className="mx-auto max-w-7xl px-6 pb-10 pt-20 lg:px-8">
        {/* TEN/TEN promo + newsletter */}
        <div className="mb-16 grid items-center gap-8 border border-wire bg-white/[0.02] p-8 md:grid-cols-2 md:p-10">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold">Out Now · All Platforms</p>
            <h3 className="mt-2 font-display text-5xl uppercase leading-none text-text-1">TEN/TEN</h3>
            <p className="font-display text-xl uppercase tracking-wide text-text-2">The Lost Files</p>
            <a href="https://ffm.to/tenten-lost-files" target="_blank" rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 bg-gold px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-black">
              <Music2 size={13} /> Listen Everywhere
            </a>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-text-2">The Newsletter</p>
            <p className="mt-1 font-body text-sm text-text-2">New drops, shows &amp; behind-the-booth. No spam.</p>
            {status === "ok" ? (
              <div className="mt-4 inline-flex items-center gap-2 border border-gold/40 bg-gold/[0.08] px-4 py-2.5 font-mono text-[12px] uppercase tracking-wide text-gold">
                ✓ You&apos;re in. Check your inbox.
              </div>
            ) : (
              <form onSubmit={subscribe} className="mt-4 flex gap-0">
                <input
                  type="email" required placeholder="your@email.com" value={email}
                  onChange={(e) => { setEmail(e.target.value); if (status === "err") setStatus("idle"); }}
                  disabled={status === "loading"}
                  className="min-w-0 flex-1 border border-wire bg-white/[0.03] px-4 py-3 font-body text-sm text-text-1 outline-none focus:border-gold"
                  style={{ borderColor: status === "err" ? "rgba(168,116,46,0.6)" : undefined }}
                />
                <button type="submit" disabled={status === "loading"}
                  className="shrink-0 bg-gold px-5 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-black disabled:opacity-60">
                  {status === "loading" ? "…" : "Join"}
                </button>
              </form>
            )}
            {status === "err" && <p className="mt-2 font-mono text-[10px] uppercase tracking-wide text-ember">Enter a valid email.</p>}
          </div>
        </div>

        {/* Columns */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr]">
          <div>
            <Link href="/" className="inline-flex items-baseline">
              <span className="font-display text-5xl uppercase leading-none text-text-1">Beetrus</span>
              <span className="text-gold">.</span>
            </Link>
            <p className="mt-5 max-w-sm font-body text-sm leading-relaxed text-text-2">
              Software engineer &amp; recording artist in Abuja. AI products at TrueWeb — music as Beetrus.
            </p>
            <div className="mt-6 flex gap-2">
              {SOCIALS.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  className="grid h-9 w-9 place-items-center border border-wire bg-white/[0.03] text-text-2 transition-colors hover:border-gold hover:text-text-1">
                  <s.icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-text-1">Explore</h4>
            <ul className="space-y-2.5">
              {EXPLORE.map((l) => (
                <li key={l.href}><Link href={l.href} className="font-body text-sm text-text-2 transition-colors hover:text-text-1">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-text-1">Listen</h4>
            <ul className="space-y-2.5">
              {LISTEN.map((l) => (
                <li key={l.label}><a href={l.href} target="_blank" rel="noopener noreferrer" className="font-body text-sm text-text-2 transition-colors hover:text-gold">{l.label}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-text-1">TrueWeb Network</h4>
            <ul className="space-y-2">
              {NETWORK.map((p) => (
                <li key={p.name}>
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 border border-wire bg-white/[0.02] px-3 py-2 transition-colors hover:border-gold/40 hover:bg-white/[0.04]">
                    <span className="grid h-7 w-7 shrink-0 place-items-center bg-gold font-display text-xs uppercase text-black">{p.name[0]}</span>
                    <span className="min-w-0">
                      <span className="block font-body text-[13px] font-semibold text-text-1">{p.name}</span>
                      <span className="block font-mono text-[9px] uppercase tracking-wider text-text-2">{p.note}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-wire pt-7 font-mono text-[11px] text-text-2 md:flex-row">
          <p>© {year} <span className="text-text-1">Beetrus</span> · part of the <a href="https://trueweb.com.ng" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">TrueWeb Network</a></p>
          <p className="inline-flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5" style={{ background: "var(--gold)", boxShadow: "0 0 6px var(--gold)" }} />
            All systems operational
          </p>
        </div>
      </div>
    </footer>
  );
}
