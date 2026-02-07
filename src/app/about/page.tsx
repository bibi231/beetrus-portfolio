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
    { year: "2024", title: "Software Engineering Student", place: "Nile University", type: "edu" },
    { year: "2024", title: "SME / Engineering Intern", place: "Miva Open University", type: "work" },
    { year: "2023", title: "At This Age EP Released", place: "Independent", type: "music" },
    { year: "2022", title: "Web Developer", place: "JK Gadzama LLP", type: "work" },
    { year: "2021", title: "Music Career Launch", place: "NORTHSIDE", type: "music" },
    { year: "2020", title: "Embassy Liaison", place: "South Korean Embassy", type: "work" },
    { year: "2018", title: "Foundation Year", place: "University of Birmingham", type: "edu" },
];

// Skills organized for display
const techStack = ["TypeScript", "React", "Next.js", "Node.js", "Python", "Three.js"];
const creativeTools = ["Logic Pro", "DaVinci", "Final Cut", "Figma"];

export default function AboutPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

    return (
        <div ref={containerRef} className="relative">

            {/* ======================================== */}
            {/* SECTION 1: Hero - Dramatic Entry */}
            {/* ======================================== */}
            <section className="relative min-h-[calc(100vh-var(--header-height))] flex flex-col items-center justify-center pt-[var(--page-top-padding)]">
                {/* Grid background */}
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute inset-0 opacity-[0.03]" style={{
                        backgroundImage: `linear-gradient(var(--neon-red-glow) 1px, transparent 1px),
                                            linear-gradient(90deg, var(--neon-red-glow) 1px, transparent 1px)`,
                        backgroundSize: '80px 80px',
                    }} />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
                </div>

                {/* Gradient orbs */}
                <div className="pointer-events-none absolute left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-neon-red/10 blur-[200px]" />
                <div className="pointer-events-none absolute right-1/4 bottom-1/4 h-[400px] w-[400px] rounded-full bg-neon-crimson/10 blur-[150px]" />

                {/* Content */}
                <motion.div
                    className="container-custom relative z-10 text-center"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div
                        className="mb-8 inline-flex items-center gap-3 rounded-full border border-neon-red/30 bg-neon-red/5 px-6 py-2"
                        variants={fadeInUp}
                    >
                        <Code2 size={14} className="text-neon-red" />
                        <span className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-neon-red">
                            System_Entity: Beetrus
                        </span>
                    </motion.div>
                    <motion.h1
                        className="mb-8 font-black text-hero tracking-tighter uppercase leading-[0.8]"
                        variants={fadeInUp}
                    >
                        <GlitchText text="BEETRUS" />
                    </motion.h1>
                    <motion.p
                        className="text-xl text-foreground-muted font-mono uppercase tracking-[0.3em] lg:tracking-[0.6em]"
                        variants={ambientFade}
                    >
                        // creative_engineer // sonic_architect
                    </motion.p>
                </motion.div>
            </section>


            {/* ======================================== */}
            {/* SECTION 2: Bio - Clean Centered */}
            {/* ======================================== */}
            <section className="py-48 relative overflow-hidden">
                <div className="container-custom">
                    <motion.div
                        className="mx-auto max-w-4xl text-center"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="mb-12 flex flex-col items-center">
                            <span className="h-px w-24 bg-gradient-to-r from-transparent via-neon-red to-transparent" />
                            <span className="mt-4 font-mono text-[10px] tracking-[0.5em] text-neon-red/60 uppercase">System_Philosophy</span>
                        </div>

                        <p className="text-3xl md:text-4xl font-light leading-tight text-foreground-muted px-8">
                            Music has been my language since childhood.
                            <span className="text-white font-medium"> Code became my second voice </span>
                            through years of curiosity and building. I create at the intersection of
                            <span className="text-neon-red font-semibold"> rhythm </span> and
                            <span className="text-neon-red font-semibold"> algorithms</span>.
                        </p>

                        <div className="my-16 flex justify-center gap-4">
                            <div className="h-1 w-1 rounded-full bg-neon-red/40" />
                            <div className="h-1 w-1 rounded-full bg-neon-red/40" />
                            <div className="h-1 w-1 rounded-full bg-neon-red/40" />
                        </div>

                        <div className="grid grid-cols-3 gap-8 md:gap-24">
                            <div className="text-center group">
                                <div className="text-4xl md:text-5xl font-black text-neon-red group-hover:scale-110 transition-transform">7+</div>
                                <div className="mt-2 text-[10px] text-foreground-muted font-mono tracking-widest uppercase">TRACKS</div>
                            </div>
                            <div className="text-center group">
                                <div className="text-4xl md:text-5xl font-black text-white group-hover:scale-110 transition-transform">3+</div>
                                <div className="mt-2 text-[10px] text-foreground-muted font-mono tracking-widest uppercase">YEARS_DEV</div>
                            </div>
                            <div className="text-center group">
                                <div className="text-4xl md:text-5xl font-black text-neon-red group-hover:scale-110 transition-transform">∞</div>
                                <div className="mt-2 text-[10px] text-foreground-muted font-mono tracking-widest uppercase">IDEAS</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ======================================== */}
            {/* SECTION 2.5: Photo Gallery Placeholders */}
            {/* ======================================== */}
            <section className="py-48 relative overflow-hidden">
                <div className="container-custom">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-neon-red font-mono text-xs uppercase tracking-widest mb-4 block">Visual Archive</span>
                        <h2 className="text-4xl md:text-5xl font-black">Gallery</h2>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <motion.div
                                key={i}
                                className="group relative aspect-[3/4] overflow-hidden rounded-xl border border-white/5 bg-black/40"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ y: -5 }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                                <div className="absolute bottom-4 left-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-white font-mono text-[10px] tracking-tighter">PHOTO_0{i}.JPG</span>
                                </div>

                                {/* Shimmer Placeholder */}
                                <div className="absolute inset-0">
                                    <div className="absolute inset-0 bg-gradient-to-br from-neon-red/5 via-transparent to-neon-crimson/5" />
                                    <motion.div
                                        className="absolute inset-x-[-100%] inset-y-0 bg-gradient-to-r from-transparent via-white/5 to-transparent w-[200%]"
                                        animate={{ x: ["0%", "100%"] }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center opacity-10">
                                        <Code2 size={48} className="text-neon-red" />
                                    </div>
                                </div>

                                {/* Sharp red border on hover */}
                                <div className="absolute inset-0 border border-neon-red/0 group-hover:border-neon-red/40 transition-colors z-30" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ======================================== */}
            {/* SECTION 3: Dual Identity */}
            {/* ======================================== */}
            <section className="py-56 bg-background-secondary/30 relative">
                <div className="container-custom">
                    <motion.div
                        className="grid md:grid-cols-2 gap-8"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Artist Card */}
                        <motion.div
                            className="group relative rounded-2xl border border-white/5 bg-black/60 p-8 md:p-10 overflow-hidden shadow-2xl"
                            whileHover={{ scale: 1.02, y: -5 }}
                            transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-neon-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="relative z-10">
                                <Code2 size={40} className="text-neon-red mb-6" />
                                <h3 className="text-3xl font-black mb-4">The Artist</h3>
                                <p className="text-foreground-muted leading-relaxed">
                                    Writer and artist blending Rap, R&B, Drill, and Afro sounds.
                                    I mix contemporary sounds to create something uniquely mine — from lyrical storytelling to hard-hitting beats.
                                </p>

                                <div className="mt-6 flex flex-wrap gap-2">
                                    {["Rap", "R&B", "Drill", "Afro", "Writer"].map((genre) => (
                                        <span key={genre} className="px-3 py-1 rounded-full border border-neon-red/30 bg-black text-xs font-mono text-neon-red">
                                            {genre}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Sharp red border on hover */}
                            <div className="absolute inset-0 border border-neon-red/0 group-hover:border-neon-red/40 transition-colors pointer-events-none" />
                        </motion.div>

                        {/* Engineer Card */}
                        <motion.div
                            className="group relative rounded-2xl border border-white/10 bg-black/40 p-8 md:p-10 overflow-hidden shadow-2xl"
                            whileHover={{ scale: 1.02, y: -5 }}
                            transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="relative z-10">
                                <Code2 size={40} className="text-white/80 mb-6" />
                                <h3 className="text-3xl font-black mb-4">The Engineer</h3>
                                <p className="text-foreground-muted leading-relaxed">
                                    Full-stack developer specializing in modern web technologies.
                                    Building interactive experiences, from portfolio sites to complex web apps.
                                </p>

                                <div className="mt-6 flex flex-wrap gap-2">
                                    {techStack.map((tech) => (
                                        <span key={tech} className="px-3 py-1 rounded-full border border-white/10 bg-black text-xs font-mono text-foreground-muted">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* White edge border on hover */}
                            <div className="absolute inset-0 border border-white/0 group-hover:border-white/20 transition-colors pointer-events-none" />
                        </motion.div>
                    </motion.div>
                </div>
            </section>


            {/* ======================================== */}
            {/* SECTION 4: Timeline - Vertical Scroll */}
            {/* ======================================== */}
            <section className="py-32 relative">
                {/* Side accent line */}
                <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-neon-red/20 to-transparent" />

                <div className="container-custom">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-black">The Journey</h2>
                        <div className="mt-4 mx-auto h-px w-24 bg-gradient-to-r from-transparent via-neon-red to-transparent" />
                    </motion.div>

                    {/* Timeline */}
                    <div className="relative mx-auto max-w-2xl">
                        {/* Center line */}
                        <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-border/50" />

                        {journey.map((item, index) => (
                            <motion.div
                                key={index}
                                className="relative flex items-center gap-8 py-6"
                                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                {/* Year - Left side */}
                                <div className="w-1/2 text-right pr-8">
                                    {index % 2 === 0 && (
                                        <>
                                            <span className="font-mono text-sm text-neon-red">{item.year}</span>
                                            <h4 className="font-semibold text-white">{item.title}</h4>
                                            <p className="text-sm text-foreground-muted">{item.place}</p>
                                        </>
                                    )}
                                </div>

                                {/* Center dot */}
                                <div className="absolute left-1/2 -translate-x-1/2 h-3 w-3 rounded-full border-2 border-neon-red bg-background" />

                                {/* Content - Right side */}
                                <div className="w-1/2 pl-8">
                                    {index % 2 !== 0 && (
                                        <>
                                            <span className="font-mono text-sm text-neon-red">{item.year}</span>
                                            <h4 className="font-semibold text-white">{item.title}</h4>
                                            <p className="text-sm text-foreground-muted">{item.place}</p>
                                        </>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>


            {/* ======================================== */}
            {/* SECTION 5: CTA - Clean */}
            {/* ======================================== */}
            <section className="py-32 bg-background-secondary/30">
                <div className="container-custom text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <Sparkles size={32} className="mx-auto text-neon-red mb-6" />
                        <h2 className="text-4xl md:text-5xl font-black mb-6">
                            Let's Create <span className="gradient-text">Together</span>
                        </h2>
                        <p className="mx-auto max-w-lg text-foreground-muted mb-10">
                            Whether it's a track, a website, or something entirely new —
                            I'm always open to collaboration.
                        </p>
                        <Link href="/contact">
                            <Button size="lg" magnetic rightIcon={<ArrowRight size={18} />}>
                                Get in Touch
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </section>

        </div>
    );
}
