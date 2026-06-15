"use client";

import { motion } from "framer-motion";
import { Play, MapPin } from "lucide-react";
import Image from "next/image";
import { musicData, type Release } from "@/data/music";
import { MUSIC_IDS } from "@/data/musicIds";
import { LazyVideo } from "@/components/music/lazy-video";
import { SpotifyEmbed } from "@/components/music/spotify-embed";

/* ------------------------------------------------------------------ */
/*  MUSIC HERO — artist-level editorial intro                          */
/* ------------------------------------------------------------------ */
export function MusicHeroSection() {
  return (
    <section className="relative min-h-[88vh] flex flex-col justify-end pb-20 md:pb-28 overflow-hidden border-b border-wire bg-void">
      {/* B&W editorial portrait video */}
      <div className="absolute inset-0 z-0">
        <LazyVideo
          src="/music/videos/beetrus-bw-editorial.mp4"
          poster="/images/artist/beetrus-hero-bw.jpg"
          className="absolute inset-0 h-full w-full"
          style={{ filter: "grayscale(1) contrast(1.06) brightness(0.6)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-void/85 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_60%,rgba(0,112,255,0.16),transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-7 rounded-full border border-ember/30 bg-ember/10 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-ember animate-pulse" />
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-ember">
              Recording Artist · Abuja
            </span>
          </div>

          <h1
            className="font-display text-7xl md:text-9xl font-black tracking-tighter uppercase mb-6"
            style={{ color: "transparent", WebkitTextStroke: "2px #00e5ff" }}
          >
            BEETRUS
          </h1>

          <p className="max-w-xl text-base md:text-lg text-text-1/80 leading-relaxed font-body">
            {musicData.bio}
          </p>

          <div className="flex flex-wrap gap-4 mt-9">
            <a
              href={musicData.socials.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-ember text-ink font-mono text-sm uppercase tracking-widest font-bold rounded-md hover:bg-ember/90 transition-colors"
            >
              Listen on Spotify
            </a>
            <a
              href={musicData.socials.appleMusic}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-surface border border-wire text-text-1 font-mono text-sm uppercase tracking-widest font-bold rounded-md hover:border-text-1 transition-colors"
            >
              Apple Music
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  FEATURED RELEASE — TEN/TEN: The Lost Files                         */
/* ------------------------------------------------------------------ */
export function FeaturedReleaseSection() {
  const release = musicData.releases.find((r) => r.featured) as Release | undefined;
  if (!release) return null;

  const tracks = release.trackList ?? [];

  return (
    <section className="relative py-24 md:py-32 bg-void border-b border-wire overflow-hidden">
      {/* Ambient cover glow */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute -top-1/3 left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] max-w-[900px] max-h-[900px] rounded-full bg-[radial-gradient(circle,rgba(0,112,255,0.18),transparent_62%)] blur-3xl" />
      </div>
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section eyebrow */}
        <div className="flex items-center gap-4 mb-14">
          <span className="font-mono text-[11px] uppercase tracking-[0.4em] text-ember">
            Featured Release
          </span>
          <div className="h-px bg-wire flex-1" />
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-text-2">
            {release.type} · {release.year}
          </span>
        </div>

        <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] gap-12 lg:gap-16 items-start">
          {/* LEFT — Cover + reveal video + title block */}
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
              className="group relative aspect-square w-full rounded-2xl overflow-hidden border border-wire shadow-[0_0_60px_rgba(0,112,255,0.12)]"
            >
              {/* Static cover */}
              {release.coverImage && (
                <Image
                  src={release.coverImage}
                  alt={`${release.title} — ${release.subtitle ?? ""} album cover`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-opacity duration-700 group-hover:opacity-0"
                />
              )}
              {/* Cover-reveal video, fades in on hover */}
              {release.coverVideo && (
                <LazyVideo
                  src={release.coverVideo}
                  poster={release.coverImage}
                  className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                />
              )}
              <div className="absolute inset-0 ring-1 ring-inset ring-white/5 rounded-2xl pointer-events-none" />
              <div className="absolute bottom-3 right-3 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-void/70 backdrop-blur-sm border border-wire opacity-0 group-hover:opacity-100 transition-opacity">
                <Play className="w-3 h-3 text-pulse" />
                <span className="font-mono text-[9px] uppercase tracking-widest text-text-1">
                  Hover for reveal
                </span>
              </div>
            </motion.div>

            {/* Title block */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-8"
            >
              <h2 className="font-display text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.85]">
                {release.title}
              </h2>
              {release.subtitle && (
                <p className="mt-2 font-display text-2xl md:text-3xl font-semibold text-pulse italic tracking-tight">
                  {release.subtitle}
                </p>
              )}
              <div className="mt-4 flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-text-2">
                <span className="px-3 py-1 rounded-full border border-wire">{tracks.length} Tracks</span>
                {release.label && (
                  <span className="px-3 py-1 rounded-full border border-ember/30 text-ember">
                    {release.label}
                  </span>
                )}
                <span>{release.year}</span>
              </div>

              {/* Streaming buttons */}
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={release.spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-[#1DB954] text-black font-mono text-[12px] uppercase tracking-widest font-bold hover:bg-[#1DB954]/90 transition-colors"
                >
                  <Play className="w-3.5 h-3.5" /> Spotify
                </a>
                <a
                  href={release.appleMusicUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-[#FA243C] text-white font-mono text-[12px] uppercase tracking-widest font-bold hover:bg-[#FA243C]/90 transition-colors"
                >
                  Apple Music
                </a>
                {release.audiomackUrl && (
                  <a
                    href={release.audiomackUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-[#FFA200] text-black font-mono text-[12px] uppercase tracking-widest font-bold hover:bg-[#FFA200]/90 transition-colors"
                  >
                    Audiomack
                  </a>
                )}
              </div>

              {/* ALBUM EMBED.
                  The exact TEN/TEN album share URL is not known yet.
                  Once you have it, set spotifyTenTenAlbumId in src/data/musicIds.ts
                  (the id from open.spotify.com/album/<ID>) and this block renders
                  a full album player automatically. Until then we show known
                  single-track embeds below. */}
              {MUSIC_IDS.spotifyTenTenAlbumId &&
              MUSIC_IDS.spotifyTenTenAlbumId !== "PASTE_HERE" ? (
                <div className="mt-8">
                  <SpotifyEmbed
                    type="album"
                    id={MUSIC_IDS.spotifyTenTenAlbumId}
                    height={380}
                    title="TEN/TEN: The Lost Files — full album"
                  />
                </div>
              ) : (
                <div className="mt-8 space-y-3">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-text-2">
                    Preview tracks
                  </p>
                  {tracks
                    .filter((t) => t.spotifyId)
                    .map((t) => (
                      <SpotifyEmbed
                        key={t.spotifyId}
                        type="track"
                        id={t.spotifyId as string}
                        height={80}
                        compact
                        title={t.title}
                      />
                    ))}
                </div>
              )}
            </motion.div>
          </div>

          {/* RIGHT — Full tracklist */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:sticky lg:top-28"
          >
            <div className="flex items-baseline justify-between mb-6">
              <h3 className="font-display text-2xl font-bold uppercase tracking-widest">
                Tracklist
              </h3>
              <span className="font-mono text-[10px] uppercase tracking-widest text-text-2">
                {release.label}
              </span>
            </div>

            <ol className="divide-y divide-wire/60 border-y border-wire/60">
              {tracks.map((t) => (
                <li
                  key={t.no}
                  className="group flex items-center gap-4 py-3.5 transition-colors hover:bg-surface/40 -mx-2 px-2 rounded"
                >
                  <span className="font-mono text-sm text-text-2 tabular-nums w-7 shrink-0 group-hover:text-pulse transition-colors">
                    {String(t.no).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-body text-[15px] font-medium text-text-1 truncate">
                      {t.title}
                      {t.feat && (
                        <span className="text-text-2 font-normal"> · feat. {t.feat}</span>
                      )}
                    </p>
                    {t.producer && (
                      <p className="font-mono text-[10px] uppercase tracking-widest text-text-2 mt-0.5">
                        Prod. {t.producer}
                      </p>
                    )}
                  </div>
                  {t.spotifyId && (
                    <a
                      href={`https://open.spotify.com/track/${t.spotifyId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Play ${t.title} on Spotify`}
                      className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-[#1DB954]"
                    >
                      <Play className="w-4 h-4" />
                    </a>
                  )}
                </li>
              ))}
            </ol>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  DISCOGRAPHY — everything except the featured release               */
/* ------------------------------------------------------------------ */
export function DiscographySection() {
  const rest = musicData.releases.filter((r) => !r.featured);
  const ep = rest.find((r) => r.type === "EP");
  const singles = rest.filter((r) => r.type === "Single");

  return (
    <section className="relative py-24 bg-ink border-b border-wire overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-16">
          <div className="h-px bg-wire flex-1" />
          <h2 className="font-display text-3xl font-bold uppercase tracking-widest">Discography</h2>
          <div className="h-px bg-wire flex-1" />
        </div>

        {/* EP */}
        {ep && (
          <div className="mb-20">
            <h3 className="font-mono text-sm uppercase tracking-widest text-ember mb-8">
              {ep.type} // {ep.year}
            </h3>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="aspect-square bg-gradient-to-br from-surface to-ink border border-ember/30 rounded-2xl flex items-center justify-center text-9xl overflow-hidden shadow-[0_0_50px_rgba(0,112,255,0.1)] hover:border-ember transition-colors">
                {ep.coverEmoji}
              </div>
              <div>
                <h4 className="font-display text-4xl md:text-5xl font-bold mb-4">{ep.title}</h4>
                <div className="flex flex-wrap gap-2 mb-8">
                  {ep.tracks?.map((track: string) => (
                    <span
                      key={track}
                      className="px-3 py-1 bg-surface border border-wire text-text-2 font-mono text-[10px] uppercase rounded-full"
                    >
                      {track}
                    </span>
                  ))}
                </div>

                {/* Apple Music album embed */}
                <iframe
                  allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
                  frameBorder="0"
                  height="450"
                  style={{
                    width: "100%",
                    overflow: "hidden",
                    background: "transparent",
                    borderRadius: "12px",
                  }}
                  loading="lazy"
                  sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
                  src={`https://embed.music.apple.com/ng/album/afro-state-of-mind-ep/${MUSIC_IDS.appleMusicId}`}
                ></iframe>
              </div>
            </div>
          </div>
        )}

        {/* Singles */}
        <h3 className="font-mono text-sm uppercase tracking-widest text-text-2 mb-8 mt-24">Singles</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {singles.map((single) => (
            <div key={single.id} className="card-premium p-6 flex flex-col">
              <div className="w-full aspect-square bg-surface mb-6 rounded-lg flex items-center justify-center text-6xl">
                {single.coverEmoji}
              </div>
              <h4 className="font-display text-xl font-bold mb-1">{single.title}</h4>
              <p className="font-mono text-xs text-text-2 mb-5">{single.year}</p>

              {/* Inline Spotify embed when we have the track id */}
              {(() => {
                const sid =
                  single.id === "gojo"
                    ? MUSIC_IDS.spotifyGojoId
                    : single.id === "lights"
                    ? MUSIC_IDS.spotifyLightsId
                    : single.id === "bluetooth"
                    ? MUSIC_IDS.spotifyBtId
                    : null;
                return sid ? (
                  <div className="mb-4 mt-auto">
                    <SpotifyEmbed type="track" id={sid} height={80} compact title={single.title} />
                  </div>
                ) : null;
              })()}

              <div className="mt-auto flex gap-3">
                <a
                  href={single.spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center py-2 bg-[#1DB954]/10 text-[#1DB954] hover:bg-[#1DB954]/20 rounded font-mono text-[10px] uppercase tracking-wider transition-colors border border-[#1DB954]/30"
                >
                  Spotify
                </a>
                <a
                  href={single.appleMusicUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center py-2 bg-[#FA243C]/10 text-[#FA243C] hover:bg-[#FA243C]/20 rounded font-mono text-[10px] uppercase tracking-wider transition-colors border border-[#FA243C]/30"
                >
                  Apple
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Back-compat alias — older imports referenced ReleasesSection. */
export function ReleasesSection() {
  return (
    <>
      <FeaturedReleaseSection />
      <DiscographySection />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  EVENTS                                                             */
/* ------------------------------------------------------------------ */
export function EventsSection() {
  return (
    <section className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="font-display text-4xl font-bold mb-4 uppercase tracking-wider">Always Outside.</h2>
        <p className="font-mono text-text-2 mb-16 max-w-2xl text-sm">
          Find me here next. Curating and promoting Abuja&apos;s premium nightlife experiences.
        </p>

        <div className="space-y-6">
          {musicData.events.map((event) => (
            <div
              key={event.id}
              className="card-premium p-6 md:p-10 flex flex-col md:flex-row items-center gap-8 justify-between hover:border-pulse/50 transition-colors"
            >
              <div className="flex-1 flex flex-col md:flex-row gap-6 md:gap-12 w-full">
                <div className="w-full md:w-32 text-center md:text-left">
                  <div className="font-display font-bold text-3xl text-ember">
                    {event.id === "pressure" ? "WED" : ""}
                  </div>
                  <div className="font-mono text-[10px] text-text-2 uppercase tracking-widest">{event.day}</div>
                </div>

                <div>
                  <h3 className="font-display text-2xl font-bold md:text-3xl mb-2">{event.name}</h3>
                  <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-text-2">
                    <span className="flex items-center gap-1">
                      <MapPin size={14} className="text-pulse" /> {event.venue}, {event.city}
                    </span>
                    <span className="px-2 py-0.5 border border-wire rounded text-[10px]">{event.type}</span>
                  </div>
                  <p className="mt-4 text-sm text-text-1/80 max-w-lg">{event.description}</p>
                </div>
              </div>

              <a
                href="https://instagram.com/beetrus_gg"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-auto px-8 py-3 bg-white text-black font-semibold font-mono text-[11px] uppercase tracking-widest text-center hover:bg-white/80 transition-colors rounded-sm"
              >
                RSVP / Info
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
