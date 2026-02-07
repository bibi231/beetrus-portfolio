"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { fadeInUp, ambientFade, staggerContainer } from "@/lib/animations";
import { ExternalLink, Github, ArrowUpRight, Code2, Cpu, Globe, Layers } from "lucide-react";
import Link from "next/link";

const projects = [
    {
        id: "01",
        title: "SAFEnet Platform",
        scope: "Full-Stack / Geolocation",
        description: "A community safety infrastructure leveraging real-time incident tracking and automated alert protocols.",
        tech: ["React", "PostgreSQL", "Node.js", "Redis"],
        link: "https://safenet.ng",
        github: "https://github.com/beetrus/safenet-core",
        type: "Engineering"
    },
    {
        id: "02",
        title: "Ulidili Multimedia",
        scope: "Web Architecture / CMS",
        description: "Enterprise-grade digital hub for high-end multimedia production, optimized for visual performance.",
        tech: ["Next.js", "Tailwind", "Sanity.io", "Framer"],
        link: "https://ulidili.com",
        type: "Engineering"
    },
    {
        id: "03",
        title: "Afro State Of Mind",
        scope: "Visual Identity / Vinyl",
        description: "Creative direction and physical product design for the debut EP, blending traditional motifs with neon-minimalism.",
        tech: ["Creative Suite", "Brand Strategy", "Cinematography"],
        link: "/music",
        type: "Creative"
    },
    {
        id: "04",
        title: "Beetrus OS v2",
        scope: "Interactive Environment",
        description: "The current portfolio design system. A custom-built 'Tron: Ares' inspired digital workspace.",
        tech: ["Three.js", "React Three Fiber", "GLSL"],
        github: "https://github.com/beetrus/portfolio-v2",
        type: "Engineering"
    }
];

export default function WorkPage() {
    return (
        <div className="relative min-h-screen pt-[var(--page-top-padding)] pb-32">
            {/* Explicit Spacer as requested by user */}
            <div className="h-24 w-full" />

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
                    className="mb-32 flex flex-col md:flex-row items-end justify-between gap-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="max-w-2xl">
                        <div className="mb-6 flex items-center gap-3">
                            <span className="h-px w-12 bg-neon-red" />
                            <span className="text-xs font-mono font-bold uppercase tracking-[0.5em] text-neon-red">System_Inventory</span>
                        </div>
                        <h1 className="text-7xl md:text-9xl font-black tracking-tighter uppercase leading-[0.8] mb-8">
                            Build <br />
                            <span className="gradient-text">& Logic</span>
                        </h1>
                    </div>
                    <div className="text-right hidden md:block">
                        <div className="font-mono text-[10px] text-foreground-muted uppercase tracking-[0.3em] mb-2 font-bold">Current_Index</div>
                        <div className="text-4xl font-black text-white">0{projects.length}</div>
                    </div>
                </motion.div>

                {/* Vertical Project Flow */}
                <div className="space-y-40">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            className="group relative grid grid-cols-1 lg:grid-cols-12 gap-12"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                        >
                            {/* Project Meta (Industrial Sidebar) */}
                            <div className="lg:col-span-3">
                                <div className="sticky top-40">
                                    <div className="mb-4 text-5xl font-black text-white/5 font-mono">{project.id}</div>
                                    <div className="h-px w-full bg-white/10 mb-8" />
                                    <div className="space-y-6">
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
                            <div className="lg:col-span-9">
                                <div className="relative mb-12 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] aspect-[16/8] p-1">
                                    <div className="absolute inset-0 bg-gradient-to-br from-neon-red/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                                    {/* Blueprint Details */}
                                    <div className="absolute bottom-6 left-6 flex gap-4">
                                        {project.tech.map((t) => (
                                            <span key={t} className="px-3 py-1 rounded-sm border border-white/10 bg-black/40 text-[10px] font-mono text-foreground-muted uppercase tracking-widest">
                                                {t}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Visual Placeholder (Conceptual) */}
                                    <div className="flex h-full w-full items-center justify-center border border-white/5 rounded-[1.4rem] bg-black/40 backdrop-blur-sm">
                                        <div className="p-8 border-2 border-dashed border-white/5 rounded-2xl group-hover:border-neon-red/20 transition-colors">
                                            {project.type === 'Engineering' ? <Cpu size={48} className="text-white/10 group-hover:text-neon-red/40 transition-colors" /> : <Layers size={48} className="text-white/10 group-hover:text-neon-red/40 transition-colors" />}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col md:flex-row items-top justify-between gap-8">
                                    <div className="max-w-xl">
                                        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mb-6 group-hover:text-neon-red transition-colors">
                                            {project.title}
                                        </h2>
                                        <p className="text-lg text-foreground-muted leading-relaxed mb-8">
                                            {project.description}
                                        </p>
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        {project.link && (
                                            <a href={project.link} target="_blank" rel="noopener noreferrer">
                                                <Button size="lg" className="w-full md:w-auto" rightIcon={<ArrowUpRight size={16} />}>
                                                    PROTO_LINK
                                                </Button>
                                            </a>
                                        )}
                                        {project.github && (
                                            <a href={project.github} target="_blank" rel="noopener noreferrer">
                                                <Button variant="outline" size="lg" className="w-full md:w-auto" leftIcon={<Github size={16} />}>
                                                    SOURCE_CONTROL
                                                </Button>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Footer Section */}
                <motion.div
                    className="mt-64 text-center border-t border-white/5 pt-24"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                >
                    <h3 className="text-3xl font-black uppercase tracking-tight text-white mb-8">Request Systems Access?</h3>
                    <div className="flex justify-center gap-6">
                        <Link href="/contact">
                            <Button size="lg" magnetic>INITIATE_CONTACT</Button>
                        </Link>
                        <a href="https://github.com/beetrus" target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" size="lg">VIEW_NETWORK</Button>
                        </a>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
