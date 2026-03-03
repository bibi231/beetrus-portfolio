"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { fadeInUp, ambientFade, staggerContainer } from "@/lib/animations";
import { ExternalLink, Github, ArrowUpRight, Code2, Cpu, Globe, Layers, Sparkles, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const projects = [
    {
        id: "01",
        title: "Naijamation",
        scope: "Full-Stack / Streaming",
        description: "A high-performance Nollywood streaming platform featuring adaptive HLS video, personalized collections, and a cinematic dark-mode UI. Engineered for the next generation of African media consumption.",
        tech: ["Next.js", "TypeScript", "Prisma", "HLS"],
        link: "https://naijamation.vercel.app",
        github: "https://github.com/bibi231/nollywood-media-main",
        type: "Engineering",
        image: "/images/work/naijamation.png"
    },
    {
        id: "02",
        title: "MVMNT",
        scope: "Social Platform / Fitness",
        description: "A social fitness platform connecting athletes and gym-goers through workout tracking, progress sharing, and community challenges.",
        tech: ["React", "TypeScript", "Node.js", "PostgreSQL"],
        github: "https://github.com/bibi231/mvmnt",
        type: "Engineering",
        image: "/images/work/mvmnt.png"
    },
    {
        id: "03",
        title: "SAFEnet",
        scope: "Community Safety / Civic Tech",
        description: "Anonymous crime reporting infrastructure for Abuja, Nigeria. Real-time incident tracking with geolocation mapping and automated alert protocols.",
        tech: ["HTML", "CSS", "JavaScript", "Maps API"],
        github: "https://github.com/bibi231/safenet",
        type: "Engineering",
        image: "/images/work/safenet.png"
    },
    {
        id: "04",
        title: "Star Ranker",
        scope: "Consensus Market / Gamification",
        description: "An algorithm-driven reputation and ranking platform. Features server-authoritative scoring protected by specialized velocity detection, ensuring high-integrity leaderboards.",
        tech: ["JavaScript", "CSS", "Node.js"],
        link: "https://star-ranker.web.app",
        github: "https://github.com/bibi231/star-ranker",
        type: "Engineering",
        image: "/images/work/star-ranker.png"
    },
    {
        id: "05",
        title: "Beetrus OS v2",
        scope: "Portfolio / Design System",
        description: "The current portfolio operating system. Custom-built 'Tron: Ares' inspired digital workspace with Three.js, smooth scroll, and neon aesthetics.",
        tech: ["Next.js", "Three.js", "Tailwind", "Framer"],
        link: "https://beetrus-portfolio.vercel.app",
        github: "https://github.com/bibi231/beetrus-portfolio",
        type: "Engineering",
        image: "/images/work/beetrus-portfolio.png"
    },
    {
        id: "06",
        title: "Regal Portfolio",
        scope: "Law Firm / Portfolio",
        description: "A professional, high-authority digital presence for JK Gadzama LLP. Showcases top-tier legal expertise with a focus on trust, tradition, and global reach in the legal landscape.",
        tech: ["React", "Custom CSS", "Framer"],
        link: "https://regalportfoliocms.web.app/",
        github: "https://github.com/bibi231/regal-portfolio",
        type: "Engineering",
        image: "/images/work/regal-portfolio.png"
    },
    {
        id: "07",
        title: "Onestop",
        scope: "E-commerce / Boutique",
        description: "Modern fashion e-commerce platform with dynamic product grids, cart management, and a premium shopping experience.",
        tech: ["Next.js", "Tailwind", "Stripe"],
        github: "https://github.com/bibi231/onestop",
        type: "Engineering",
        image: "/images/work/onestop.png"
    },
];

// Floating particle component
function FloatingParticles() {
    return (
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
            {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute h-1 w-1 rounded-full bg-neon-red/20"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        opacity: [0.1, 0.4, 0.1],
                        scale: [1, 1.5, 1],
                    }}
                    transition={{
                        duration: 4 + Math.random() * 4,
                        repeat: Infinity,
                        delay: Math.random() * 3,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
}

export default function WorkPage() {
    return (
        <div className="relative min-h-screen pt-[var(--page-top-padding)] pb-32">
            {/* Explicit Spacer */}
            <div className="h-24 w-full" />

            <FloatingParticles />

            {/* Design Grid Background */}
            <div className="pointer-events-none fixed inset-0 -z-10 opacity-20">
                <div className="absolute inset-x-0 h-px bg-white/10 top-[20%]" />
                <div className="absolute inset-x-0 h-px bg-white/10 top-[40%]" />
                <div className="absolute inset-x-0 h-px bg-white/10 top-[60%]" />
                <div className="absolute inset-x-0 h-px bg-white/10 top-[80%]" />
                <div className="absolute inset-y-0 w-px bg-white/10 left-[25%]" />
                <div className="absolute inset-y-0 w-px bg-white/10 left-[50%]" />
                <div className="absolute inset-y-0 w-px bg-white/10 left-[75%]" />
            </div>

            <div className="container-custom px-6">
                {/* Header */}
                <motion.div
                    className="mb-20 md:mb-32 flex flex-col md:flex-row items-start md:items-end justify-between gap-6 md:gap-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="max-w-2xl">
                        <div className="mb-6 flex items-center gap-3">
                            <span className="h-px w-12 bg-neon-red" />
                            <span className="text-xs font-mono font-bold uppercase tracking-[0.5em] text-neon-red">System_Inventory</span>
                        </div>
                        <h1 className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter uppercase leading-[0.8] mb-8">
                            Build <br />
                            <span className="gradient-text">& Logic</span>
                        </h1>
                        <p className="text-foreground-muted text-sm md:text-base font-mono uppercase tracking-wider max-w-md">
                            // full-stack_systems // creative_engineering // deployed_infrastructure
                        </p>
                    </div>
                    <div className="text-left md:text-right">
                        <div className="font-mono text-[10px] text-foreground-muted uppercase tracking-[0.3em] mb-2 font-bold">Current_Index</div>
                        <div className="text-4xl font-black text-white">0{projects.length}</div>
                    </div>
                </motion.div>

                {/* Vertical Project Flow */}
                <div className="space-y-24 md:space-y-40">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            className="group relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                        >
                            {/* Project Meta (Industrial Sidebar) */}
                            <div className="lg:col-span-3 order-2 lg:order-1">
                                <div className="lg:sticky lg:top-40">
                                    <div className="mb-4 text-5xl font-black text-white/5 font-mono">{project.id}</div>
                                    <div className="h-px w-full bg-white/10 mb-8" />
                                    <div className="flex flex-row lg:flex-col gap-6">
                                        <div>
                                            <div className="text-[10px] font-mono text-neon-red uppercase tracking-widest font-bold mb-1">Architecture</div>
                                            <div className="text-sm text-white uppercase tracking-tight">{project.type}</div>
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-mono text-neon-red uppercase tracking-widest font-bold mb-1">Scope</div>
                                            <div className="text-sm text-white uppercase tracking-tight">{project.scope}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Project Content */}
                            <div className="lg:col-span-9 order-1 lg:order-2">
                                <div className="relative mb-8 md:mb-12 overflow-hidden rounded-2xl md:rounded-3xl border border-white/10 bg-white/[0.02] aspect-[16/9] md:aspect-[16/8] p-1">
                                    <div className="absolute inset-0 bg-gradient-to-br from-neon-red/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />

                                    {/* Blueprint Details */}
                                    <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 flex flex-wrap gap-2 md:gap-4 z-20">
                                        {project.tech.map((t) => (
                                            <span key={t} className="px-2 md:px-3 py-1 rounded-sm border border-white/10 bg-black/60 text-[8px] md:text-[10px] font-mono text-foreground-muted uppercase tracking-widest backdrop-blur-sm">
                                                {t}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Project Screenshot or Placeholder */}
                                    {project.link ? (
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="relative block h-full w-full rounded-[1rem] md:rounded-[1.4rem] overflow-hidden group/img-link"
                                        >
                                            <Image
                                                src={project.image}
                                                alt={`${project.title} screenshot`}
                                                fill
                                                className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-700"
                                                sizes="(max-width: 768px) 100vw, 75vw"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                            {/* Hover View Indicator */}
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img-link:opacity-100 transition-opacity duration-300">
                                                <div className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-mono text-xs tracking-widest flex items-center gap-2">
                                                    <Globe size={14} className="text-neon-red" />
                                                    VIEW_LIVE
                                                </div>
                                            </div>
                                        </a>
                                    ) : project.image ? (
                                        <div className="relative h-full w-full rounded-[1rem] md:rounded-[1.4rem] overflow-hidden">
                                            <Image
                                                src={project.image}
                                                alt={`${project.title} screenshot`}
                                                fill
                                                className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-700"
                                                sizes="(max-width: 768px) 100vw, 75vw"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                        </div>
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center border border-white/5 rounded-[1rem] md:rounded-[1.4rem] bg-black/40 backdrop-blur-sm">
                                            <div className="p-8 border-2 border-dashed border-white/5 rounded-2xl group-hover:border-neon-red/20 transition-colors">
                                                {project.type === 'Engineering' ? <Cpu size={48} className="text-white/10 group-hover:text-neon-red/40 transition-colors" /> : <Layers size={48} className="text-white/10 group-hover:text-neon-red/40 transition-colors" />}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-col md:flex-row items-top justify-between gap-6 md:gap-8">
                                    <div className="max-w-xl">
                                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter text-white mb-4 md:mb-6 group-hover:text-neon-red transition-colors">
                                            {project.title}
                                        </h2>
                                        <p className="text-base md:text-lg text-foreground-muted leading-relaxed mb-6 md:mb-8">
                                            {project.description}
                                        </p>
                                    </div>
                                    <div className="flex flex-row md:flex-col gap-3 md:gap-4">
                                        {project.link && (
                                            <a href={project.link} target={project.link.startsWith("http") ? "_blank" : undefined} rel={project.link.startsWith("http") ? "noopener noreferrer" : undefined}>
                                                <Button size="lg" className="w-full" rightIcon={<ArrowUpRight size={16} />}>
                                                    PROTO_LINK
                                                </Button>
                                            </a>
                                        )}
                                        {project.github && (
                                            <a href={project.github} target="_blank" rel="noopener noreferrer">
                                                <Button variant="outline" size="lg" className="w-full" leftIcon={<Github size={16} />}>
                                                    SOURCE
                                                </Button>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* ================================= */}
                {/* TECH STACK - Categorized */}
                {/* ================================= */}
                <section className="mt-40 mb-40 border-t border-white/5 pt-24">
                    <motion.div
                        className="mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <Cpu size={16} className="text-neon-red" />
                            <span className="text-xs font-mono font-bold uppercase tracking-[0.5em] text-neon-red">Tech_Core_Stack</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">Logic <span className="gradient-text">Systems</span></h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {[
                            {
                                cat: "Languages",
                                items: ["Java", "JavaScript", "TypeScript", "Python", "C", "C++", "PowerShell", "Bash", "Kotlin", "PHP", "HTML5"]
                            },
                            {
                                cat: "Cloud & Ops",
                                items: ["AWS", "Google Cloud", "Oracle Cloud", "OpenStack", "Kubernetes", "Firebase", "Supabase", "Git", "GitHub Actions", "Apache"]
                            },
                            {
                                cat: "Frameworks & Logic",
                                items: ["React", "Next JS", "Vue.js", "Angular", "NodeJS", "Quarkus", "Socket.io", "MongoDB", "MySQL", "Prisma"]
                            },
                            {
                                cat: "Design & UX",
                                items: ["Adobe Photoshop", "Adobe Premiere Pro", "Affinity Photo", "Figma", "Canva", "Tailwind CSS", "Framer Motion"]
                            },
                            {
                                cat: "OS & Hardware",
                                items: ["Windows Terminal", "nVIDIA", "Xbox"]
                            }
                        ].map((category, i) => (
                            <motion.div
                                key={category.cat}
                                className="p-8 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-neon-red/20 transition-all group"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <h4 className="text-xs font-mono text-neon-red uppercase tracking-widest font-bold mb-6 flex items-center gap-2">
                                    <span className="h-1 w-1 bg-neon-red" />
                                    {category.cat}
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {category.items.map(skill => (
                                        <span key={skill} className="px-3 py-1.5 rounded-sm border border-white/5 bg-white/[0.02] text-[10px] text-foreground-muted font-mono group-hover:text-white transition-colors">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* ================================= */}
                {/* REQUEST A SITE - CTA Section */}
                {/* ================================= */}
                <motion.div
                    className="mt-32 md:mt-64 relative overflow-hidden rounded-3xl border border-neon-red/20 bg-gradient-to-br from-neon-red/5 via-black to-black p-8 md:p-16"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    {/* Animated glow orb */}
                    <div className="absolute -right-20 -top-20 h-64 w-64 bg-neon-red/10 blur-[100px] animate-pulse" />
                    <div className="absolute -left-20 -bottom-20 h-48 w-48 bg-neon-red/5 blur-[80px]" />

                    <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <Zap size={16} className="text-neon-red" />
                                <span className="text-xs font-mono font-bold uppercase tracking-[0.5em] text-neon-red animate-pulse">Request.Build()</span>
                            </div>
                            <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white mb-4">
                                Need a <span className="gradient-text">Website</span>?
                            </h3>
                            <p className="text-foreground-muted max-w-md leading-relaxed">
                                From landing pages to full-stack platforms — I build premium, high-performance digital experiences. Let&apos;s bring your vision to life.
                            </p>
                        </div>
                        <Link href="/request">
                            <Button size="lg" magnetic className="whitespace-nowrap shadow-glow-red" rightIcon={<ArrowUpRight size={18} />}>
                                REQUEST_BUILD
                            </Button>
                        </Link>
                    </div>
                </motion.div>

                {/* Footer Section */}
                <motion.div
                    className="mt-24 md:mt-32 text-center border-t border-white/5 pt-16 md:pt-24"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                >
                    <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white mb-8">Request Systems Access?</h3>
                    <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6">
                        <Link href="/contact">
                            <Button size="lg" magnetic>INITIATE_CONTACT</Button>
                        </Link>
                        <a href="https://github.com/bibi231" target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" size="lg">VIEW_NETWORK</Button>
                        </a>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
