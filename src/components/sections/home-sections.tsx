"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowDown, Play, Github, Music2, ChevronRight, ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroFallback } from "@/components/three/hero-scene";
import { BentoCard } from "@/components/ui-21st/bento-card";
import { usePrefersReducedMotion } from "@/hooks/use-animations";
import {
    heroRevealContainer,
    heroLetter,
    fadeInUp,
    ambientFade,
    staggerContainer,
    subtitleReveal,
    revealLetter,
    glitch,
    interactiveHover,
    spring,
    ease,
    duration
} from "@/lib/animations";

// Dynamically import 3D scene (no SSR, lazy loaded)
const Hero3DScene = dynamic(
    () => import("@/components/three/hero-scene").then((mod) => mod.Hero3DScene),
    {
        ssr: false,
        loading: () => <HeroFallback />,
    }
);

/**
 * Hero Section - Cinematic intro with 3D text
 * Uses 2D fallback on mobile for reliable centering, 3D on larger screens
 */
export function HeroSection() {
    const prefersReducedMotion = usePrefersReducedMotion();
    const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });

    React.useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Use 3D scene whenever motion is allowed
    const show3D = !prefersReducedMotion;

    return (
        <section className="relative flex min-h-screen pt-[var(--header-offset)] flex-col items-center justify-end pb-24">
            {/* Interactive Mouse Glow */}
            {!prefersReducedMotion && (
                <motion.div
                    className="pointer-events-none fixed z-0 h-[600px] w-[600px] rounded-full"
                    animate={{
                        x: mousePos.x - 300,
                        y: mousePos.y - 300,
                    }}
                    transition={{ type: "spring", damping: 30, stiffness: 150 }}
                    style={{
                        background: "var(--neon-red-glow)",
                        filter: "blur(60px)",
                    }}
                />
            )}

            {/* Gradient drift background */}
            <div className="absolute inset-0 gradient-drift opacity-30" />

            {/* 3D or 2D fallback based on reduced motion */}
            {show3D ? <Hero3DScene /> : <HeroFallback />}

            {/* Gradient overlays - softer to not obscure 3D */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-background/40" />

            {/* Content - positioned at bottom below the 3D text */}
            <div className="container-custom relative z-10 flex flex-col items-center text-center">
                {/* Pre-title badge */}
                <motion.div
                    className="mb-8 inline-flex items-center gap-3 rounded-full border border-neon-red/40 bg-black/60 backdrop-blur-md px-5 py-2 shadow-glow-sm"
                    initial="hidden"
                    animate="visible"
                    variants={ambientFade}
                    whileHover="hover"
                >
                    <span className="h-2 w-2 rounded-full bg-neon-red animate-pulse" />
                    <span className="text-xs font-medium uppercase tracking-widest text-neon-red">
                        Writer × Artist × Engineer
                    </span>
                </motion.div>

                {/* Subtitle with kinetic reveal */}
                <motion.div
                    className="mb-6 flex flex-wrap justify-center gap-x-2 text-lg text-foreground-muted md:text-xl"
                    initial="hidden"
                    animate="visible"
                >
                    {["Rapper", "/", "R&B", "/", "Drill", "×", "Developer"].map((word, i) => (
                        <motion.span
                            key={i}
                            variants={revealLetter}
                            custom={i}
                            className={cn(
                                "font-medium transition-colors hover:text-neon-red",
                                ["/", "×"].includes(word) ? "text-foreground-muted/40" : "text-white"
                            )}
                        >
                            {word}
                        </motion.span>
                    ))}
                </motion.div>

                {/* Location */}
                <motion.p
                    className="mb-8 text-sm text-foreground-muted/60"
                    variants={ambientFade}
                >
                    Based in Abuja, Nigeria
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    className="flex flex-wrap items-center justify-center gap-4"
                    variants={ambientFade}
                >
                    <Link href="/music">
                        <Button
                            size="lg"
                            magnetic
                            leftIcon={<Music2 size={18} />}
                        >
                            Listen Now
                        </Button>
                    </Link>

                    <Link href="/work">
                        <Button
                            variant="ghost"
                            size="lg"
                            magnetic
                            leftIcon={<Github size={18} />}
                            className="hover:bg-white/10"
                        >
                            View Projects
                        </Button>
                    </Link>
                </motion.div>
            </div>

            {/* Background glow effects - standardized via tokens */}
            <div className="pointer-events-none absolute left-1/4 top-1/3 h-[400px] w-[400px] rounded-full bg-neon-red-glow/20 blur-[150px]" />
            <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-[300px] w-[300px] rounded-full bg-neon-red-glow/20 blur-[120px]" />

            {/* Corner accents */}
            <div className="pointer-events-none absolute left-0 top-0 h-px w-32 bg-gradient-to-r from-neon-red/30 to-transparent" />
            <div className="pointer-events-none absolute left-0 top-0 h-32 w-px bg-gradient-to-b from-neon-red/30 to-transparent" />
            <div className="pointer-events-none absolute bottom-0 right-0 h-px w-32 bg-gradient-to-l from-neon-red/30 to-transparent" />
            <div className="pointer-events-none absolute bottom-0 right-0 h-32 w-px bg-gradient-to-t from-neon-red/30 to-transparent" />
        </section>
    );
}

/**
 * Quick Links Section - Bento-style grid with depth effects
 */
export function QuickLinksSection() {
    const links = [
        {
            title: "Latest Release",
            subtitle: "GOJO - 2026",
            description: "Stream now on all platforms",
            href: "/music",
            icon: Play,
            gradient: "from-neon-red to-neon-crimson",
        },
        {
            title: "Featured Project",
            subtitle: "Engineering_Core",
            description: "Full-stack architecture",
            href: "/work",
            icon: Github,
            gradient: "from-neon-red/40 to-transparent",
        },
    ];

    return (
        <section className="section">
            <div className="container-custom">
                <motion.div
                    className="grid gap-6 md:grid-cols-2"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {links.map((link, index) => (
                        <motion.div key={index} variants={ambientFade} className="h-full">
                            <Link href={link.href} className="group block h-full">
                                <BentoCard className="h-full p-8 transition-transform duration-500 hover:scale-[1.02]">
                                    {/* Background glow accent specific to card */}
                                    <div
                                        className={`absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br ${link.gradient} opacity-20 blur-3xl transition-all duration-500 group-hover:opacity-40 group-hover:scale-150 pointer-events-none`}
                                    />

                                    <div className="relative z-10 flex flex-col h-full justify-between">
                                        <div>
                                            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-neon-red/10 border border-neon-red/20 transition-all group-hover:scale-110 shadow-glow-sm">
                                                <link.icon className="h-6 w-6 text-neon-red" />
                                            </div>
                                            <h3 className="text-2xl font-bold">{link.title}</h3>
                                            <p className="mt-1 font-medium text-white">{link.subtitle}</p>
                                            <p className="mt-4 text-sm text-foreground-muted">{link.description}</p>
                                        </div>

                                        {/* Hover arrow */}
                                        <div className="mt-8 self-end">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all group-hover:border-neon-red group-hover:bg-neon-red/20 group-hover:translate-x-2">
                                                <ChevronRight className="h-5 w-5 text-neon-red transition-all" />
                                            </div>
                                        </div>
                                    </div>
                                </BentoCard>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

/**
 * About Preview Section
 */
export function AboutPreviewSection() {
    return (
        <section className="section bg-background-secondary/50">
            <div className="container-custom">
                <div className="grid items-center gap-16 lg:grid-cols-2">
                    {/* Text content */}
                    <motion.div
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        <span className="mb-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-neon-red">
                            <span className="h-px w-8 bg-neon-red" />
                            About Me
                        </span>
                        <h2 className="mb-6 text-h2 font-bold">
                            Where <span className="text-neon-red drop-shadow-[0_0_15px_rgba(255,45,45,0.5)]">Sound</span> Meets{" "}
                            <span className="text-neon-red drop-shadow-[0_0_15px_rgba(255,45,45,0.5)]">System</span>
                        </h2>
                        <p className="mb-6 text-body leading-relaxed text-foreground-muted">
                            I&apos;m Bitrus Joe-Kyari Gadzama, known as <span className="text-white font-semibold">Beetrus</span> —
                            an Afrosounds artist and full-stack engineer based in Abuja, Nigeria.
                        </p>
                        <p className="mb-8 text-foreground-muted leading-relaxed">
                            My work exists at the intersection of creativity and technology.
                            Whether producing a track or architecting a web platform,
                            I bring the same precision and passion to every project.
                        </p>
                        <Link href="/about">
                            <Button variant="neon" magnetic>
                                Learn More
                                <ChevronRight size={16} />
                            </Button>
                        </Link>
                    </motion.div>

                    {/* Visual element */}
                    <motion.div
                        className="relative"
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="aspect-square overflow-hidden rounded-2xl border border-neon-red/30 bg-black relative shadow-2xl">
                            {/* Portrait Image */}
                            <div
                                className="absolute inset-0 bg-cover bg-center grayscale contrast-125 opacity-60"
                                style={{ backgroundImage: "url('/images/portrait.png')" }}
                            />

                            {/* Scanline overlay */}
                            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%]" />

                            <div className="flex h-full items-center justify-center relative z-20">
                                {/* Terminal-style display with neon overlay */}
                                <div className="absolute inset-6 rounded-xl border border-neon-red/40 bg-black/40 backdrop-blur-md p-6 font-mono text-sm shadow-[0_0_30px_rgba(255,45,45,0.15)]">
                                    <div className="flex gap-2 mb-4">
                                        <div className="h-3 w-3 rounded-full bg-neon-red/60 shadow-[0_0_8px_rgba(255,45,45,0.5)]" />
                                        <div className="h-3 w-3 rounded-full bg-white/10" />
                                        <div className="h-3 w-3 rounded-full bg-white/10" />
                                    </div>
                                    <div className="space-y-2 select-none">
                                        <p className="[text-shadow:0_0_8px_rgba(255,45,45,0.8)]"><span className="text-neon-red brightness-125">const</span> <span className="text-white">beetrus</span> = {"{"}</p>
                                        <p className="pl-4 [text-shadow:0_0_8px_rgba(255,45,45,0.8)]"><span className="text-white">role</span>: <span className="text-neon-red brightness-110">&quot;Artist × Engineer&quot;</span>,</p>
                                        <p className="pl-4 [text-shadow:0_0_8px_rgba(255,45,45,0.8)]"><span className="text-white">stack</span>: [<span className="text-neon-red brightness-110">&quot;React&quot;</span>, <span className="text-neon-red brightness-110">&quot;Node&quot;</span>, <span className="text-neon-red brightness-110">&quot;Music&quot;</span>],</p>
                                        <p className="pl-4 [text-shadow:0_0_8px_rgba(255,45,45,0.8)]"><span className="text-white">location</span>: <span className="text-neon-red brightness-110">&quot;Abuja, NG&quot;</span></p>
                                        <p className="[text-shadow:0_0_8px_rgba(255,45,45,0.8)]">{"}"};</p>
                                        <p className="pt-2 [text-shadow:0_0_8px_rgba(255,45,45,0.8)]"><span className="text-neon-red brightness-150">_</span><span className="animate-pulse text-neon-red">|</span></p>
                                    </div>

                                    {/* Additional technical overlay info */}
                                    <div className="absolute bottom-4 right-4 text-[10px] font-mono text-neon-red/40 uppercase tracking-tighter">
                                        system_id: 0xBEETRUS
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Decorative elements */}
                        <div className="absolute -right-4 -top-4 h-20 w-20 rounded-xl border border-neon-red/20" />
                        <div className="absolute -bottom-4 -left-4 h-28 w-28 rounded-xl border border-neon-red/20" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

/**
 * Music Preview Section - Track list with stretch effects
 */
export function MusicPreviewSection() {
    const [expandedTrack, setExpandedTrack] = React.useState<number | null>(null);
    const [hoveredTrack, setHoveredTrack] = React.useState<number | null>(null);

    const tracks = [
        {
            title: "GOJO",
            year: "2026",
            type: "Single",
            spotify: "#",
            audiomack: "#"
        },
        {
            title: "Lights",
            year: "2025",
            type: "Single",
            spotify: "#"
        },
        {
            title: "Bluetooth",
            year: "2025",
            type: "Single",
            feat: "Yôrkk",
            spotify: "#",
            audiomack: "#"
        },
        {
            title: "Afro State Of Mind",
            year: "2024",
            type: "EP",
            spotify: "#"
        },
    ];

    return (
        <section className="section">
            <div className="container-custom">
                {/* Section header */}
                <motion.div
                    className="mb-16 text-center"
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <span className="mb-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-neon-red">
                        <span className="h-px w-8 bg-neon-red" />
                        Discography
                        <span className="h-px w-8 bg-neon-red" />
                    </span>
                    <h2 className="text-4xl font-bold md:text-5xl">Latest Releases</h2>
                </motion.div>

                {/* Track list with centralized vertical stacking */}
                <div className="mx-auto max-w-4xl space-y-4">
                    {tracks.map((track, index) => (
                        <motion.div
                            key={index}
                            className={cn(
                                "group relative overflow-hidden rounded-2xl border transition-all duration-500",
                                expandedTrack === index
                                    ? "border-neon-red/50 bg-neon-red/[0.03] shadow-[0_0_50px_rgba(255,45,45,0.05)]"
                                    : "border-white/5 bg-white/[0.02] hover:border-white/20"
                            )}
                            variants={ambientFade}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => setExpandedTrack(expandedTrack === index ? null : index)}
                        >
                            <div className="flex flex-col md:flex-row items-center justify-between gap-6 px-8 py-6 cursor-pointer text-center md:text-left">
                                <div className="flex flex-col md:flex-row items-center gap-6">
                                    <div className={cn(
                                        "flex h-16 w-16 items-center justify-center rounded-full border transition-all duration-500",
                                        expandedTrack === index || hoveredTrack === index
                                            ? "border-neon-red bg-neon-red/10 shadow-glow-red"
                                            : "border-white/10 bg-white/5"
                                    )}>
                                        <Play
                                            size={20}
                                            className={cn(
                                                "transition-colors",
                                                expandedTrack === index || hoveredTrack === index ? "text-neon-red" : "text-white/40"
                                            )}
                                        />
                                    </div>
                                    <div>
                                        <h4 className={cn(
                                            "text-2xl font-black uppercase tracking-tight transition-colors",
                                            expandedTrack === index || hoveredTrack === index ? "text-neon-red" : "text-white"
                                        )}>
                                            {track.title}
                                            {track.feat && (
                                                <span className="ml-3 text-sm font-mono font-medium text-foreground-muted">
                                                    ft. {track.feat}
                                                </span>
                                            )}
                                        </h4>
                                        <p className="text-sm font-mono uppercase tracking-widest text-foreground-muted mt-1">
                                            {track.type} // {track.year}
                                        </p>
                                    </div>
                                </div>
                                <motion.div
                                    animate={{ rotate: expandedTrack === index ? 180 : 0 }}
                                    className={cn(
                                        "h-10 w-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 group-hover:border-neon-red group-hover:text-neon-red transition-colors",
                                        expandedTrack === index && "border-neon-red text-neon-red"
                                    )}
                                >
                                    <ChevronRight size={20} />
                                </motion.div>
                            </div>

                            {/* Pop-out Platform Links */}
                            <AnimatePresence>
                                {expandedTrack === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.4, ease: ease.cinematic }}
                                        className="border-t border-white/5 bg-black/40"
                                    >
                                        <div className="p-8 flex flex-wrap gap-4 justify-center">
                                            {track.spotify && (
                                                <Button
                                                    variant="neon"
                                                    size="lg"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        window.open(track.spotify, '_blank');
                                                    }}
                                                >
                                                    Spotify
                                                </Button>
                                            )}
                                            {track.audiomack && (
                                                <Button
                                                    variant="outline"
                                                    size="lg"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        window.open(track.audiomack, '_blank');
                                                    }}
                                                >
                                                    Audiomack
                                                </Button>
                                            )}
                                            <Button
                                                variant="ghost"
                                                size="lg"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                Apple Music
                                            </Button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {/* View all button - Left aligned under track list */}
                <motion.div
                    className="mt-12 mx-auto max-w-4xl"
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <Link href="/music">
                        <Button variant="neon" size="lg" magnetic>
                            View All Music
                            <ChevronRight size={18} />
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}

/**
 * Work Preview Section - Horizontal showcase of top projects
 */
export function WorkPreviewSection() {
    const featuredProjects = [
        {
            title: "Naijamation",
            desc: "Full-stack Nollywood streaming platform.",
            tech: ["Next.js", "HLS"],
            image: "/images/work/naijamation.png",
            href: "/work"
        },
        {
            title: "MVMNT",
            desc: "Social fitness tracking architecture.",
            tech: ["React", "PostgreSQL"],
            image: "/images/work/mvmnt.png",
            href: "/work"
        },
        {
            title: "Beetrus Portfolio",
            desc: "This current Tron-inspired OS environment.",
            tech: ["Next.js", "Framer", "Tailwind"],
            image: "/images/work/beetrus-portfolio.png",
            href: "/work"
        }
    ];

    return (
        <section className="section bg-black overflow-hidden">
            <div className="container-custom">
                <motion.div
                    className="mb-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div>
                        <span className="mb-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-neon-red">
                            <span className="h-px w-8 bg-neon-red" />
                            Project Showcase
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Work <span className="gradient-text">Preview</span></h2>
                    </div>
                    <Link href="/work" className="group flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-foreground-muted hover:text-white transition-colors">
                        V_ALL_SYSTEMS <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {featuredProjects.map((project, i) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="h-full"
                        >
                            <Link href={project.href} className="block h-full">
                                <BentoCard className="h-full border-white/5 bg-white/[0.02] overflow-hidden p-0 group">
                                    <div className="aspect-[16/10] relative overflow-hidden w-full">
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                                        <div className="absolute bottom-6 left-6 right-6 z-20 transition-transform duration-500 group-hover:-translate-y-2">
                                            <div className="flex flex-wrap gap-2 mb-3">
                                                {project.tech.map(t => (
                                                    <span key={t} className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-white">
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                            <h3 className="text-2xl font-black text-white group-hover:text-neon-red transition-colors uppercase tracking-tight">{project.title}</h3>
                                            <p className="mt-2 text-sm text-foreground-muted opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                                                {project.desc}
                                            </p>
                                        </div>
                                    </div>
                                </BentoCard>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/**
 * Request CTA Section - High impact banner
 */
export function RequestCTA() {
    return (
        <section className="py-24 md:py-48 relative overflow-hidden">
            {/* Animated background highlights */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-64 bg-neon-red/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container-custom">
                <motion.div
                    className="relative rounded-3xl md:rounded-[4rem] border border-neon-red/20 bg-black/40 p-10 md:p-24 text-center overflow-hidden"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                >
                    {/* Decorative grid */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
                        backgroundImage: `linear-gradient(var(--neon-red-glow) 1px, transparent 1px),
                                            linear-gradient(90deg, var(--neon-red-glow) 1px, transparent 1px)`,
                        backgroundSize: '40px 40px',
                    }} />

                    <div className="relative z-10 max-w-2xl mx-auto">
                        <motion.div className="flex items-center justify-center gap-3 mb-8" variants={fadeInUp}>
                            <Zap size={16} className="text-neon-red" />
                            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.5em] text-neon-red animate-pulse">
                                INITIATE_PROTOCOL
                            </span>
                        </motion.div>
                        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-8">
                            Architect <br />
                            <span className="gradient-text">Your Vision</span>
                        </h2>
                        <p className="text-foreground-muted text-lg md:text-xl mb-12 max-w-lg mx-auto leading-relaxed">
                            Select a blueprint and build a premium digital experience. Request your custom architected site today.
                        </p>
                        <Link href="/request">
                            <Button size="lg" magnetic className="h-16 px-12 text-lg shadow-glow-red" rightIcon={<ArrowRight size={20} />}>
                                START_PROJECT
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

const Image = ({ src, alt, fill, className }: any) => (
    // Simple helper since Image is from next/image but we're in a client component
    // In next.js 13+ it's fine as long as imported
    <img src={src} alt={alt} className={className} style={fill ? { position: 'absolute', height: '100%', width: '100%', left: 0, top: 0, objectFit: 'cover' } : {}} />
);
