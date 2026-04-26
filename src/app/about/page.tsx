"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { fadeInUp, ambientFade, staggerContainer } from "@/lib/animations";
import { MapPin, ArrowUpRight, Github, Twitter, Instagram, Mail, ExternalLink, Code2, Sparkles, ArrowRight } from "lucide-react";
import { GlitchText } from "@/components/ui/glitch-text";

// Timeline data
const journey = [
    { year: "2026", title: "GOJO Release", place: "Spotify / Apple Music", type: "music" },
    { year: "2025", title: "LIGHTS Release", place: "Spotify / Apple Music", type: "music" },
    { year: "2025", title: "BLUETOOTH Release", place: "with Yôrkk", type: "music" },
    { year: "2024", title: "SME / Engineering Intern", place: "Miva Open University", type: "work" },
    { year: "2024", title: "AFRO STATE OF MIND", place: "Major EP", type: "music" },
    { year: "2023", title: "AT THIS AGE EP", place: "Box Session Performance", type: "music" },
    { year: "2022", title: "Web Developer", place: "JK Gadzama LLP", type: "work" },
    { year: "2021", title: "Music Career Launch", place: "Northside", type: "music" },
    { year: "2019", title: "Career Shift: Alpha Phase", place: "Nigeria", type: "work" },
];

// Skills organized for display
const techStack = ["TypeScript", "React", "Next.js", "Node.js", "Python", "Three.js"];
const creativeTools = ["Logic Pro", "DaVinci", "Final Cut", "Figma"];

export default function AboutPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: timelineRef,
        offset: ["start end", "end start"]
    });

    return (
        <div ref={containerRef} className="relative bg-black">

            {/* ======================================== */}
            {/* SECTION 1: High-Fidelity Hero */}
            {/* ======================================== */}
            <section className="relative w-full flex flex-col items-center pt-12 pb-24 px-6">
                {/* Background Atmosphere */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-pulse/10 blur-[150px] animate-pulse rounded-full" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] opacity-80" />

                    {/* Floating Tech Streamers */}
                    <div className="absolute inset-0 opacity-20">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute h-[1px] bg-gradient-to-r from-transparent via-pulse to-transparent w-full"
                                style={{ top: `${15 * (i + 1)}%` }}
                                animate={{
                                    x: ["-100%", "100%"],
                                    opacity: [0, 1, 0]
                                }}
                                transition={{
                                    duration: 10 + i * 2,
                                    repeat: Infinity,
                                    ease: "linear",
                                    delay: i * 1.5
                                }}
                            />
                        ))}
                    </div>
                </div>

                <div className="container-custom relative z-10">
                    <motion.div
                        className="flex flex-col items-center"
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div
                            className="mb-8 px-4 py-1.5 rounded-full border border-pulse/30 bg-pulse/5 flex items-center gap-2"
                            variants={fadeInUp}
                        >
                            <Sparkles size={14} className="text-pulse" />
                            <span className="text-[10px] font-mono font-bold tracking-[0.4em] text-pulse uppercase">Architect_Profile_v2</span>
                        </motion.div>

                        <motion.h1
                            className="text-[15vw] md:text-[12vw] font-[900] tracking-tighter leading-[0.75] uppercase mb-8"
                            variants={fadeInUp}
                        >
                            <span className="block text-white">Beetrus</span>
                            <span className="block gradient-text brightness-125 px-2">Creative</span>
                        </motion.h1>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center w-full max-w-5xl mt-8">
                            <motion.div variants={fadeInUp} className="text-left">
                                <p className="text-2xl md:text-3xl font-light text-foreground-muted leading-tight">
                                    I build at the boundary where <span className="text-white font-bold">sonic vibration</span> meets <span className="text-pulse font-bold">computational logic</span>.
                                </p>
                            </motion.div>
                            <motion.div variants={fadeInUp} className="space-y-4">
                                <div className="flex items-center gap-4 text-xs font-mono tracking-widest text-foreground-muted uppercase">
                                    <span className="w-12 h-px bg-white/20" />
                                    Current_Status: Evolving
                                </div>
                                <p className="text-foreground-muted text-sm leading-relaxed">
                                    A 20-year-old artist and engineer born in Abuja. My journey is a continuous synthesis of Afrobeats rhythms and high-performance system architecture.
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                {/* ======================================== */}
                {/* NEW: AT THIS AGE BOX SESSION SEGMENT */}
                {/* ======================================== */}
                <motion.div
                    className="w-full max-w-6xl mt-24 px-6"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="relative aspect-video rounded-[2.5rem] overflow-hidden border border-white/10 shadow-glow-red/10 group">
                        <iframe
                            src="https://www.youtube.com/embed/x9qHK_doscU?si=mC9ob8Z8jR3wMHWT&autoplay=1&mute=1&controls=0&loop=1&playlist=x9qHK_doscU"
                            title="AT THIS AGE - Box Session"
                            className="absolute inset-0 w-full h-full grayscale hover:grayscale-0 transition-all duration-1000 opacity-40 group-hover:opacity-100 pointer-events-none"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                        <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[10px] font-mono mb-6 backdrop-blur-md">
                                    <span className="h-1.5 w-1.5 rounded-full bg-pulse animate-pulse" />
                                    LIVE_VOL_01: BOX_SESSIONS
                                </div>
                                <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-4">
                                    At This <span className="text-pulse">Age</span>
                                </h2>
                                <p className="text-foreground-muted max-w-lg mx-auto mb-8 font-mono text-xs uppercase tracking-widest">
                                    // raw_performance // neural_sync // abuja_vibrations
                                </p>
                                <a
                                    href="https://www.youtube.com/watch?v=x9qHK_doscU"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Button variant="neon" size="lg" className="shadow-glow-red">
                                        VIEW_FULL_SESSION
                                    </Button>
                                </a>
                            </motion.div>
                        </div>

                        {/* HUD Decoration */}
                        <div className="absolute top-8 left-8 flex gap-4 pointer-events-none">
                            <div className="h-1 w-12 bg-pulse animate-pulse" />
                            <div className="h-1 w-6 bg-white/20" />
                        </div>
                    </div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <span className="text-[10px] uppercase tracking-[0.4em] text-foreground-muted font-bold">Initiate_Scroll</span>
                    <div className="w-px h-16 bg-gradient-to-b from-pulse to-transparent" />
                </motion.div>
            </section>

            {/* ======================================== */}
            {/* SECTION 2: DNA Journey Timeline */}
            {/* ======================================== */}
            <section ref={timelineRef} className="py-60 relative">
                <div className="container-custom">
                    <motion.div
                        className="text-center mb-40"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-4">
                            DNA <span className="text-pulse">Journey</span>
                        </h2>
                        <p className="text-sm font-mono tracking-[0.5em] text-foreground-muted uppercase">Execution_History // Timeline</p>
                    </motion.div>

                    <div className="relative min-h-[1500px]">
                        {/* DNA HELIX VISUALIZER */}
                        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-32 md:w-48 overflow-visible flex justify-center">
                            {/* Helix Strands */}
                            <svg className="h-full w-full overflow-visible opacity-30" viewBox="0 0 100 1000" preserveAspectRatio="none">
                                <DNAStrand color="var(--pulse)" offset={0} />
                                <DNAStrand color="white" offset={Math.PI} />
                            </svg>
                        </div>

                        {/* Timeline Items */}
                        <div className="space-y-40 relative z-10">
                            {journey.map((item, index) => (
                                <motion.div
                                    key={index}
                                    className={cn(
                                        "flex flex-col md:flex-row items-center w-full",
                                        index % 2 === 0 ? "md:justify-start" : "md:justify-end"
                                    )}
                                    initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                >
                                    <div className={cn(
                                        "w-full md:w-[42%] group",
                                        index % 2 === 0 ? "md:text-right" : "md:text-left"
                                    )}>
                                        <div className="relative p-10 rounded-[2rem] border border-white/5 bg-black/60 backdrop-blur-3xl hover:border-neon-red/40 transition-all duration-500 shadow-2xl">
                                            {/* Glow Accent */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-neon-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[2rem]" />

                                            <div className="relative z-10">
                                                <div className={cn(
                                                    "flex items-center gap-4 mb-4",
                                                    index % 2 === 0 ? "md:justify-end" : "md:justify-start"
                                                )}>
                                                    <span className="text-3xl font-black text-pulse font-mono">{item.year}</span>
                                                    <div className="h-px w-10 bg-white/20" />
                                                </div>
                                                <h4 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter mb-2 group-hover:text-neon-red transition-colors">
                                                    {item.title}
                                                </h4>
                                                <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-foreground-muted uppercase">
                                                    <MapPin size={12} className="text-pulse" />
                                                    {item.place}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ======================================== */}
            {/* SECTION 3: Visual Archive / Bio */}
            {/* ======================================== */}
            <section className="py-40 bg-white/[0.02] border-y border-white/5 relative">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-2 gap-24 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex items-center gap-3 mb-8">
                                <span className="h-px w-12 bg-neon-red" />
                                <span className="text-xs font-mono font-bold uppercase tracking-[0.5em] text-neon-red px-2">Identity_Archive</span>
                            </div>
                            <h3 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-8 leading-[0.9]">
                                Sonic <br />
                                <span className="gradient-text">Philosophies</span>
                            </h3>
                            <div className="space-y-6 text-xl text-foreground-muted leading-relaxed font-light">
                                <p>
                                    Originally interested in becoming a YouTuber, I returned to Nigeria from the UK and found my heartbeat in the rhythm of Afrobeats and the structure of Hip-Hop.
                                </p>
                                <p>
                                    Characterized by a <span className="text-white font-medium">"deep and gritty voice"</span>, I experiment with versatile sounds as a core member of the creative collective <span className="text-pulse font-bold">Kinfxlk</span>.
                                </p>
                            </div>
                        </motion.div>

                        <div className="grid grid-cols-2 gap-6">
                            {[
                                "/archive/beetrus-1.jpg",
                                "/archive/beetrus-2.jpg",
                                "/archive/beetrus-3.jpg",
                                "/archive/beetrus-1.jpg"
                            ].map((img, i) => (
                                <motion.div
                                    key={i}
                                    className="aspect-square relative rounded-3xl overflow-hidden border border-white/10 group"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <div className="absolute inset-0 z-0">
                                        <img 
                                            src={img} 
                                            alt={`Archive ${i + 1}`} 
                                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-60" />
                                    <div className="absolute inset-0 bg-neon-red/5 group-hover:bg-neon-red/10 transition-colors z-10" />
                                    <div className="absolute bottom-6 left-6 z-20">
                                        <span className="text-[10px] font-mono text-white/40 group-hover:text-white uppercase tracking-widest transition-colors">Archive_00{i + 1}</span>
                                    </div>
                                    <div className="absolute inset-0 border-2 border-neon-red/0 group-hover:border-neon-red/40 transition-colors rounded-3xl z-30" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ======================================== */}
            {/* SECTION 4: Final CTA */}
            {/* ======================================== */}
            <section className="py-60 relative flex flex-col items-center justify-center">
                <motion.div
                    className="text-center max-w-4xl px-6"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-5xl md:text-8xl font-[900] uppercase tracking-tighter mb-12 leading-[0.8]">
                        Ready to <br />
                        <span className="gradient-text tracking-[-0.05em]">Initialize?</span>
                    </h2>
                    <p className="text-xl text-foreground-muted mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                        I am currently accepting select creative collaborations and engineering contracts for 2026. Let&apos;s build something that matters.
                    </p>
                    <div className="flex justify-center flex-wrap gap-6">
                        <a href="https://open.spotify.com/artist/4X9yd45w0s1lYvExD4EEDh" target="_blank" rel="noopener noreferrer">
                            <Button size="lg" className="h-16 px-10 shadow-glow-red">SPOTIFY_PROFILE</Button>
                        </a>
                        <a href="https://music.apple.com/us/artist/beetrus/1536767746" target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" size="lg" className="h-16 px-10 border-white/10">APPLE_MUSIC</Button>
                        </a>
                    </div>
                </motion.div>
            </section>
        </div>
    );
}

function DNAStrand({ color, offset }: { color: string; offset: number }) {
    const points = Array.from({ length: 50 }).map((_, i) => {
        const y = i * 20;
        const x = 50 + Math.sin(i * 0.5 + offset) * 40;
        return `${x},${y}`;
    }).join(" L ");

    return (
        <path
            d={`M ${points}`}
            fill="none"
            stroke={color}
            strokeWidth="1.5"
            strokeDasharray="4 4"
        />
    );
}

