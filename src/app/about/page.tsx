"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin, ArrowUpRight, Play, Code, Music } from "lucide-react";
import { musicData, musicLinks } from "@/data/music";
import { projects } from "@/data/projects";

/* Timeline — fused engineer + artist history */
const journey = [
  { year: "2026", title: "TEN/TEN — The Lost Files", place: "10-track album · Kinfxlk Records", type: "music" },
  { year: "2025–26", title: "TrueWeb Solutions + AI Network", place: "Founder · SupportAI · ReplyAI · HarvestAI", type: "work" },
  { year: "2025", title: "Star Ranker · NaijaLingo", place: "Real-money markets + language platform", type: "work" },
  { year: "2025", title: "LIGHTS · BLUETOOTH (ft. Yôrkk)", place: "Singles · Spotify / Apple Music", type: "music" },
  { year: "2024", title: "Afro State Of Mind", place: "Debut EP", type: "music" },
  { year: "2024", title: "SME / Engineering Intern", place: "Miva Open University", type: "work" },
  { year: "2023", title: "AT THIS AGE — Box Session", place: "Live performance · Abuja", type: "music" },
  { year: "2022", title: "Web Developer", place: "JK Gadzama LLP", type: "work" },
  { year: "2021", title: "Music Career Launch", place: "Northside", type: "music" },
];

const techStack = ["TypeScript", "React", "Next.js", "Node.js", "Python", "Three.js", "Drizzle", "Postgres"];
const creativeTools = ["Logic Pro", "DaVinci", "Final Cut", "Figma"];

export default function AboutPage() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const liveCount = projects.filter((p) => p.status === "live").length;

  return (
    <div className="relative bg-ink">
      {/* ════════ HERO ════════ */}
      <section className="relative overflow-hidden pt-8 pb-20 md:pb-28 px-6">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-pulse/10 blur-[140px] rounded-full -translate-y-1/3" />
          <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-gold/10 blur-[130px] rounded-full" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--ink)_100%)]" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="editorial-kicker mb-8"
          >
            About — Engineer · Artist · Founder
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="font-display font-black uppercase tracking-[-0.02em] leading-[0.82] text-text-1"
            style={{ fontSize: "var(--type-mega)" }}
          >
            BEETRUS
          </motion.h1>

          <div className="grid md:grid-cols-2 gap-10 md:gap-16 mt-10 max-w-5xl">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="font-display text-2xl md:text-3xl font-bold leading-tight text-text-1"
            >
              I build at the boundary where <span className="text-gold">sound</span> meets{" "}
              <span className="text-pulse">systems</span>.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-4 font-mono text-xs tracking-widest text-text-2 uppercase">
                <span className="w-12 h-px bg-wire" />
                Status: Shipping
              </div>
              <p className="text-text-2 leading-relaxed">
                An Abuja-born artist and engineer. By day I take AI products from ₦0 to live and
                billing as the founder of TrueWeb Solutions. By night I&apos;m Beetrus — a deep,
                gritty voice over Afrosounds, R&amp;B and Drill. {liveCount} live products and a
                10-track album say I don&apos;t pick lanes.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════ AT THIS AGE — BOX SESSION ════════ */}
      <section className="px-6 pb-24 md:pb-32">
        <motion.div
          className="max-w-[1400px] mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="relative aspect-video rounded-3xl overflow-hidden border border-wire group">
            <iframe
              src="https://www.youtube.com/embed/x9qHK_doscU?si=mC9ob8Z8jR3wMHWT&autoplay=1&mute=1&controls=0&loop=1&playlist=x9qHK_doscU"
              title="AT THIS AGE - Box Session"
              className="absolute inset-0 w-full h-full grayscale group-hover:grayscale-0 transition-all duration-1000 opacity-40 group-hover:opacity-100 pointer-events-none"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent opacity-80" />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-void/60 border border-wire text-[10px] font-mono mb-6 backdrop-blur-md uppercase tracking-widest">
                <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
                Box Sessions · Vol 01
              </div>
              <h2 className="font-display text-4xl md:text-7xl font-black uppercase tracking-tight mb-4">
                At This <span className="text-gold">Age</span>
              </h2>
              <a
                href="https://www.youtube.com/watch?v=x9qHK_doscU"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold"
              >
                Watch the session <Play className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ════════ TWO DISCIPLINES ════════ */}
      <section className="border-y border-wire bg-surface">
        <div className="grid md:grid-cols-2">
          <div className="p-10 md:p-16 border-b md:border-b-0 md:border-r border-wire">
            <div className="flex items-center gap-3 mb-6">
              <Code className="text-pulse" size={20} />
              <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-pulse">The Engineer</h3>
            </div>
            <p className="text-text-2 leading-relaxed mb-8 max-w-md">
              I ship full products solo — frontend, backend, auth, payments, infra. The TrueWeb
              network runs on Next.js, Postgres and NextAuth with NGN + USD billing, auto-provisioning
              and real-time client messaging. Real users, real revenue.
            </p>
            <div className="flex flex-wrap gap-2">
              {techStack.map((t) => (
                <span
                  key={t}
                  className="font-mono text-[10px] uppercase bg-ink border border-wire px-3 py-1.5 rounded-full text-text-2"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="p-10 md:p-16">
            <div className="flex items-center gap-3 mb-6">
              <Music className="text-gold" size={20} />
              <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-gold">The Artist</h3>
            </div>
            <p className="text-text-2 leading-relaxed mb-8 max-w-md">
              {musicData.bio}
            </p>
            <div className="flex flex-wrap gap-2">
              {creativeTools.map((t) => (
                <span
                  key={t}
                  className="font-mono text-[10px] uppercase bg-ink border border-wire px-3 py-1.5 rounded-full text-text-2"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════ TIMELINE ════════ */}
      <section ref={timelineRef} className="py-24 md:py-32 relative">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-16 md:mb-24">
            <div className="editorial-kicker justify-center mb-5">Execution History</div>
            <h2
              className="font-display font-black uppercase tracking-tight leading-[0.9] text-text-1"
              style={{ fontSize: "var(--type-giant)" }}
            >
              The <span className="text-pulse">Timeline</span>
            </h2>
          </div>

          <div className="relative">
            {/* center rail */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-wire md:-translate-x-1/2" />
            <div className="space-y-10 md:space-y-16">
              {journey.map((item, i) => {
                const isMusic = item.type === "music";
                const accent = isMusic ? "text-gold" : "text-pulse";
                const dot = isMusic ? "bg-gold" : "bg-pulse";
                return (
                  <motion.div
                    key={i}
                    className={`relative pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-12 ${
                      i % 2 === 0 ? "" : "md:[direction:rtl]"
                    }`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* dot */}
                    <span
                      className={`absolute left-4 md:left-1/2 top-2 w-3 h-3 rounded-full ${dot} -translate-x-1/2 ring-4 ring-ink`}
                    />
                    <div
                      className={`md:[direction:ltr] ${
                        i % 2 === 0 ? "md:text-right md:pr-12" : "md:col-start-2 md:pl-12"
                      } p-6 rounded-2xl border border-wire bg-surface/50 hover:border-[currentColor] transition-colors group`}
                    >
                      <div
                        className={`flex items-center gap-3 mb-2 font-mono ${
                          i % 2 === 0 ? "md:justify-end" : ""
                        }`}
                      >
                        <span className={`text-xl font-black ${accent}`}>{item.year}</span>
                        <span className="font-mono text-[9px] uppercase tracking-widest text-text-3 border border-wire px-2 py-0.5 rounded">
                          {item.type}
                        </span>
                      </div>
                      <h4 className="font-display text-xl md:text-2xl font-bold text-text-1 uppercase tracking-tight mb-2">
                        {item.title}
                      </h4>
                      <div
                        className={`flex items-center gap-2 font-mono text-xs text-text-2 ${
                          i % 2 === 0 ? "md:justify-end" : ""
                        }`}
                      >
                        <MapPin size={12} className={accent} />
                        {item.place}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ════════ ARCHIVE STRIP ════════ */}
      <section className="py-20 bg-surface/30 border-y border-wire">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="editorial-kicker mb-10">Identity Archive</div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {["/archive/beetrus-1.jpg", "/archive/beetrus-2.jpg", "/archive/beetrus-3.jpg"].map(
              (img, i) => (
                <motion.div
                  key={i}
                  className="aspect-[3/4] relative rounded-2xl overflow-hidden border border-wire group"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img}
                    alt={`Archive ${i + 1}`}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                    onError={(e) => {
                      (e.currentTarget.parentElement as HTMLElement).style.background =
                        "linear-gradient(135deg, var(--surface), var(--raised))";
                      e.currentTarget.style.display = "none";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-void/70 via-transparent to-transparent" />
                  <span className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-widest text-text-1">
                    Archive_0{i + 1}
                  </span>
                </motion.div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ════════ FINAL CTA ════════ */}
      <section className="py-28 md:py-40 relative flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pulse/8 blur-[140px] rounded-full" />
        </div>
        <motion.div
          className="relative z-10 max-w-3xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2
            className="font-display font-black uppercase tracking-tight leading-[0.85] mb-8 text-text-1"
            style={{ fontSize: "var(--type-giant)" }}
          >
            Build with me.
            <br />
            <span className="text-gold">Or just listen.</span>
          </h2>
          <p className="text-text-2 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Open to engineering contracts and creative collaborations for 2026. Two worlds, one inbox.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/work" className="btn-solid">
              See the Work <ArrowUpRight className="w-4 h-4" />
            </Link>
            <a href={musicLinks.tenTenSmartLink} target="_blank" rel="noopener noreferrer" className="btn-gold">
              Stream TEN/TEN <Play className="w-4 h-4" />
            </a>
            <Link href="/contact" className="btn-glow">
              Get in touch
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
