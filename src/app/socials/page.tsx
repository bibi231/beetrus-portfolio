"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Instagram, Youtube, Github, Mail, Code2, ArrowRight, ArrowUpRight } from "lucide-react";
import { MUSIC_IDS } from "@/data/musicIds";
import { musicData } from "@/data/music";

export default function SocialsPage() {
  const latestRelease = musicData.releases[0];

  return (
    <div className="min-h-screen bg-ink pt-12 pb-28">
      {/* atmospheric wash */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute right-0 top-0 h-[600px] w-[600px] translate-x-1/3 -translate-y-1/3 rounded-full bg-gold/[0.06] blur-[150px]" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 lg:px-8">
        {/* ═══ HEADER ═══ */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-surface border border-gold/30 mb-6 overflow-hidden shadow-[0_0_50px_rgba(217,178,62,0.15)]">
            <span className="font-display text-4xl text-gold font-bold">B</span>
          </div>
          <div className="font-mono text-[12px] uppercase tracking-[0.26em] text-gold mb-4">
            Find me everywhere
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-black uppercase tracking-tight text-text-1 mb-3">
            @beetrus_gg
          </h1>
          <p className="font-mono text-sm text-text-2">Engineer ◦ Artist ◦ Founder</p>
        </div>

        {/* ═══ BENTO GRID ═══ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-[210px]">
          {/* Instagram — wide */}
          <motion.a
            href={`https://instagram.com/${MUSIC_IDS.instagramHandle}`}
            target="_blank" rel="noopener noreferrer"
            className="md:col-span-2 group relative overflow-hidden rounded-2xl border border-wire bg-surface/40 p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-[#E4405F]/60"
          >
            <div className="absolute top-0 right-0 p-6 opacity-[0.07] group-hover:opacity-20 transition-opacity">
              <Instagram size={130} />
            </div>
            <div>
              <div className="w-12 h-12 bg-[#E4405F]/12 rounded-xl flex items-center justify-center mb-4">
                <Instagram className="text-[#E4405F]" size={24} />
              </div>
              <h3 className="font-display text-2xl font-bold uppercase text-text-1">Instagram</h3>
              <p className="font-mono text-xs text-text-2 mt-2">Latest lifestyle & studio updates</p>
            </div>
            <div className="flex items-center gap-2 font-mono text-[12px] uppercase tracking-widest text-gold opacity-0 group-hover:opacity-100 transition-opacity">
              Follow <ArrowRight size={15} />
            </div>
          </motion.a>

          {/* YouTube */}
          <motion.a
            href={`https://youtube.com/@${MUSIC_IDS.youtubeChannelId}`}
            target="_blank" rel="noopener noreferrer"
            className="group rounded-2xl border border-wire bg-surface/40 p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-[#FF0000]/60"
          >
            <div className="w-12 h-12 bg-[#FF0000]/12 rounded-xl flex items-center justify-center mb-4">
              <Youtube className="text-[#FF0000]" size={24} />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold uppercase text-text-1">YouTube</h3>
              <p className="font-mono text-xs text-text-2 mt-2">Music videos & sessions</p>
            </div>
          </motion.a>

          {/* Latest release */}
          <motion.a
            href={latestRelease?.spotifyUrl || "#"}
            target="_blank" rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-2xl border border-gold/30 bg-surface/40 p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-gold"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gold/[0.07] to-transparent pointer-events-none" />
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-md overflow-hidden border border-wire bg-ink flex items-center justify-center">
                {latestRelease?.coverImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={latestRelease.coverImage} alt="" className="h-full w-full object-cover" />
                ) : (
                  <span className="font-display text-sm text-gold">B</span>
                )}
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-gold border border-gold/40 px-2 py-1 rounded">
                Latest
              </span>
            </div>
            <div>
              <h3 className="font-display text-lg font-bold uppercase text-text-1">{latestRelease?.title}</h3>
              <p className="font-mono text-xs text-text-2 mt-1">Stream now</p>
            </div>
          </motion.a>

          {/* GitHub */}
          <motion.a
            href="https://github.com/bibi231"
            target="_blank" rel="noopener noreferrer"
            className="group rounded-2xl border border-wire bg-surface/40 p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-white/40"
          >
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4">
              <Github className="text-white" size={24} />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold uppercase text-text-1">GitHub</h3>
              <p className="font-mono text-xs text-text-2 mt-1">Open source & builds</p>
            </div>
          </motion.a>

          {/* Hire TrueWeb — tall */}
          <motion.div
            className="group relative overflow-hidden rounded-2xl border border-wire bg-surface/40 p-7 flex flex-col justify-between md:row-span-2 transition-all duration-300 hover:-translate-y-1 hover:border-gold/60"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gold/[0.06] to-transparent pointer-events-none" />
            <div>
              <div className="w-12 h-12 bg-gold/12 rounded-xl flex items-center justify-center mb-4">
                <Code2 className="text-gold" size={24} />
              </div>
              <h3 className="font-display text-2xl font-bold uppercase text-text-1">Hire TrueWeb</h3>
              <p className="font-mono text-sm text-text-2 mt-2">A SaaS idea? Need a full-stack build?</p>
              <ul className="mt-6 space-y-2 font-mono text-xs text-text-3">
                <li>◦ MVP & product development</li>
                <li>◦ AI integration</li>
                <li>◦ UI/UX + technical consulting</li>
              </ul>
            </div>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-gold py-3 font-mono text-[12px] font-bold uppercase tracking-widest text-ink transition-transform hover:-translate-y-0.5"
            >
              Let&apos;s talk <ArrowUpRight size={15} />
            </Link>
          </motion.div>

          {/* Email — wide */}
          <motion.div
            className="md:col-span-2 group rounded-2xl border border-wire bg-surface/40 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-gold/50"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between h-full w-full gap-6">
              <div>
                <div className="w-12 h-12 bg-ink border border-wire rounded-xl flex items-center justify-center mb-4">
                  <Mail className="text-text-1" size={24} />
                </div>
                <h3 className="font-display text-2xl font-bold uppercase text-text-1">General Contact</h3>
                <p className="font-mono text-xs text-text-2 mt-2">Bookings, press, or just saying hi.</p>
              </div>
              <Link
                href="/contact"
                className="shrink-0 inline-flex items-center gap-2 rounded-full border border-wire px-6 py-3 font-mono text-[11px] uppercase tracking-widest text-text-1 transition-colors hover:border-gold/60 hover:text-gold"
              >
                Send a signal <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
