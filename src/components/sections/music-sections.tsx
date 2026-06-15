"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Play, MapPin, ArrowRight } from "lucide-react";
import { musicData, musicLinks, type Release } from "@/data/music";
import { LazyVideo } from "@/components/music/lazy-video";
import { SpotifyEmbed } from "@/components/music/spotify-embed";

const COVER = "/music/ten-ten-cover.jpg";
const TEN_TEN = musicData.releases.find((r) => r.featured) ?? musicData.releases[0];
const EP = musicData.releases.find((r) => r.type === "EP");
const SINGLES = musicData.releases.filter((r) => r.type === "Single");
const SPOTIFY_ALBUM = "4wYvePhIgMGqAiekYBIcrb";

/* ====================== HERO — cinematic cover-reveal video ====================== */
export function MusicHeroSection() {
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden">
      <video
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: "center 42%" }}
        autoPlay muted loop playsInline preload="metadata" poster={COVER}
      >
        <source src="/music/videos/ten-ten-cover-square.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,10,11,0.45) 0%, rgba(10,10,11,0.25) 45%, rgba(10,10,11,0.95) 90%, #0a0a0b 100%)" }} />

      <div className="relative z-10 px-6 pb-16 lg:px-8 lg:pb-24">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.3em] text-gold" style={{ textShadow: "0 1px 12px rgba(0,0,0,0.7)" }}>New Album · Out Now</p>
          <h1 className="font-display uppercase text-text-1" style={{ fontSize: "var(--type-mega)", lineHeight: 0.84 }}>TEN/TEN</h1>
          <p className="mt-2 font-display text-3xl uppercase tracking-wide text-text-2 md:text-4xl">The Lost Files</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={musicLinks.tenTenSmartLink} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-none bg-gold px-7 py-3.5 font-mono text-xs uppercase tracking-[0.16em] text-black transition-transform hover:-translate-y-0.5">
              <Play size={15} fill="currentColor" /> Listen Everywhere
            </a>
            <a href={TEN_TEN.spotifyUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-none border border-wire px-7 py-3.5 font-mono text-xs uppercase tracking-[0.16em] text-text-1 transition-colors hover:border-gold">
              Spotify <ArrowRight size={15} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ====================== FEATURED — scroll-pinned cover + tracklist ====================== */
export function FeaturedReleaseSection() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.06, 0.94]);
  const y = useTransform(scrollYProgress, [0, 1], ["-2%", "2%"]);

  return (
    <section ref={ref} className="relative px-6 py-24 lg:px-8 lg:py-32" style={{ background: "#0a0a0b" }}>
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Sticky cover */}
        <div className="lg:sticky lg:top-24 lg:h-fit">
          <motion.div
            className="overflow-hidden rounded-sm border border-wire shadow-2xl"
            style={reduce ? undefined : { scale, y }}
          >
            <img src={COVER} alt="TEN/TEN — The Lost Files" className="aspect-square w-full object-cover" />
          </motion.div>
          <div className="mt-5 flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-wider text-text-2">
            <span className="rounded border border-wire px-2 py-1">{TEN_TEN.trackList?.length ?? 10} Tracks</span>
            <span className="rounded border border-wire px-2 py-1">{TEN_TEN.label}</span>
            <span className="rounded border border-wire px-2 py-1">{TEN_TEN.year}</span>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <a href={musicLinks.tenTenSmartLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-none bg-gold px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-black"><Play size={13} fill="currentColor" /> Listen</a>
            <a href={TEN_TEN.audiomackUrl ?? "#"} target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-none border border-wire px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-text-1">Audiomack</a>
          </div>
        </div>

        {/* Tracklist */}
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-gold">Tracklist</p>
          <h2 className="mt-2 font-display uppercase text-text-1" style={{ fontSize: "clamp(2.4rem, 6vw, 4.5rem)", lineHeight: 0.9 }}>10 Tracks · No Skips</h2>

          <ol className="mt-8 divide-y divide-wire border-y border-wire">
            {TEN_TEN.trackList?.map((t) => (
              <li key={t.no} className="py-4">
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-xs text-text-3 w-6 shrink-0">{String(t.no).padStart(2, "0")}</span>
                  <div className="min-w-0 flex-1">
                    <span className="font-display text-2xl uppercase leading-none text-text-1">{t.title}</span>
                    {(t.feat || t.producer) && (
                      <span className="mt-1 block font-mono text-[10px] uppercase tracking-wider text-text-2">
                        {t.feat ? `feat. ${t.feat}` : ""}{t.feat && t.producer ? " · " : ""}{t.producer ? `prod. ${t.producer}` : ""}
                      </span>
                    )}
                  </div>
                </div>
                {t.spotifyId && (
                  <div className="mt-3 overflow-hidden rounded-sm">
                    <SpotifyEmbed type="track" id={t.spotifyId} compact height={80} title={t.title} />
                  </div>
                )}
              </li>
            ))}
          </ol>

          {/* Full album player */}
          <div className="mt-8 overflow-hidden rounded-sm border border-wire">
            <SpotifyEmbed type="album" id={SPOTIFY_ALBUM} height={352} title="TEN/TEN — The Lost Files" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ====================== LOST FILES — promo video graphic strip ====================== */
export function LostFilesStrip() {
  return (
    <section className="relative overflow-hidden border-y border-wire" style={{ background: "#050505" }}>
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-20 lg:grid-cols-2 lg:px-8">
        <div className="mx-auto w-full max-w-sm overflow-hidden rounded-sm border border-wire">
          <LazyVideo
            src="/music/videos/ten-ten-lostfiles-intro.mp4"
            poster={COVER}
            style={{ aspectRatio: "9 / 16", width: "100%" }}
          />
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-gold">The Lost Files</p>
          <h2 className="mt-3 font-display uppercase text-text-1" style={{ fontSize: "clamp(2.4rem, 6vw, 4.5rem)", lineHeight: 0.9 }}>
            Tracks that<br />never made it<br /><span className="text-gold">— until now.</span>
          </h2>
          <p className="mt-5 max-w-md font-body text-text-2">Ten cuts from the vault. KVV, York, Killian Stark, Wacko, TooColdBaby. Produced by Ove6ix, Wonderlust, Kaiso, Chie &amp; JiggyYb.</p>
          <a href={musicLinks.tenTenSmartLink} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2 rounded-none bg-gold px-6 py-3 font-mono text-xs uppercase tracking-[0.16em] text-black"><Play size={14} fill="currentColor" /> Stream the Album</a>
        </div>
      </div>
    </section>
  );
}

/* ====================== DISCOGRAPHY ====================== */
function ReleaseCard({ r }: { r: Release }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-sm border border-wire bg-white/[0.015] transition-colors hover:bg-white/[0.04]">
      <div className="overflow-hidden border-b border-wire">
        {r.coverImage ? (
          <img src={r.coverImage} alt={`${r.title} cover`} className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" loading="lazy" />
        ) : (
          <div className="grid aspect-square w-full place-items-center text-6xl" style={{ background: "rgba(255,255,255,0.04)" }}>{r.coverEmoji}</div>
        )}
      </div>
      <div className="flex items-center justify-between gap-2 p-4">
        <div className="min-w-0">
          <span className="block truncate font-display text-lg uppercase leading-none text-text-1">{r.title}</span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-text-2">{r.type} · {r.year}</span>
        </div>
        <div className="flex shrink-0 gap-2">
          <a href={r.spotifyUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] uppercase tracking-wider text-text-2 hover:text-gold">SP</a>
          <a href={r.appleMusicUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] uppercase tracking-wider text-text-2 hover:text-gold">AP</a>
        </div>
      </div>
    </div>
  );
}

export function DiscographySection() {
  return (
    <section className="px-6 py-24 lg:px-8" style={{ background: "#0a0a0b" }}>
      <div className="mx-auto max-w-7xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-text-2">Discography</p>
        <h2 className="mt-2 font-display uppercase text-text-1" style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", lineHeight: 0.9 }}>The Catalogue</h2>

        {EP && (
          <div className="mt-10 grid items-center gap-8 rounded-sm border border-wire bg-white/[0.015] p-6 lg:grid-cols-2">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-gold">{EP.type} · {EP.year}</span>
              <h3 className="mt-2 font-display text-4xl uppercase text-text-1">{EP.title}</h3>
              <p className="mt-3 font-body text-sm text-text-2">{EP.tracks?.join(" · ")}</p>
            </div>
            <div className="overflow-hidden rounded-sm border border-wire">
              <iframe title="Afro State Of Mind on Apple Music" src="https://embed.music.apple.com/us/album/1521721654" height="175" frameBorder="0" loading="lazy" allow="autoplay *; encrypted-media *;" style={{ width: "100%", overflow: "hidden", background: "transparent" }} />
            </div>
          </div>
        )}

        <h3 className="mt-14 mb-5 font-mono text-[11px] uppercase tracking-[0.18em] text-text-2">Singles</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {SINGLES.map((r) => <ReleaseCard key={r.id} r={r} />)}
        </div>
      </div>
    </section>
  );
}

/* ====================== EVENTS ====================== */
export function EventsSection() {
  const ev = musicData.events?.[0];
  if (!ev) return null;
  return (
    <section className="px-6 py-24 lg:px-8" style={{ background: "#050505" }}>
      <div className="mx-auto max-w-5xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-pulse">Always Outside</p>
        <h2 className="mt-2 font-display uppercase text-text-1" style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", lineHeight: 0.9 }}>Catch Me Live</h2>
        <div className="mt-8 flex flex-col gap-5 rounded-sm border border-wire bg-white/[0.015] p-8 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-display text-3xl uppercase text-gold">{ev.name}</span>
              <span className="rounded-none border border-wire px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-text-2">{ev.day}</span>
            </div>
            <p className="mt-2 inline-flex items-center gap-1.5 font-mono text-xs text-text-2"><MapPin size={13} /> {ev.venue}, {ev.city}</p>
            <p className="mt-3 max-w-md font-body text-sm text-text-2">{ev.description}</p>
          </div>
          <a href="https://instagram.com/beetrus_gg" target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center gap-2 rounded-none border border-pulse px-6 py-3 font-mono text-xs uppercase tracking-[0.16em] text-text-1">RSVP / Info <ArrowRight size={14} /></a>
        </div>
      </div>
    </section>
  );
}
