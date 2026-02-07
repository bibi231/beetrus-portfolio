"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { fadeInUp, ambientFade, staggerContainer } from "@/lib/animations";
import {
    Instagram,
    Twitter,
    Youtube,
    Github,
    Music,
    ArrowUpRight,
    MessageCircle,
    Zap,
    Linkedin,
    Share2
} from "lucide-react";
import Link from "next/link";

const mainSocials = [
    {
        name: "Instagram",
        handle: "beetrus_gg",
        url: "https://instagram.com/beetrus_gg",
        icon: Instagram,
        color: "var(--neon-red)",
        description: "Studio logs & aesthetic captures.",
        count: "2.5K+"
    },
    {
        name: "Twitter",
        handle: "beetrus_g",
        url: "https://twitter.com/beetrus_g",
        icon: Twitter,
        color: "var(--neon-cyan)",
        description: "Hot takes & tech thoughts.",
        count: "1.2K+"
    },
    {
        name: "YouTube",
        handle: "Beetrus",
        url: "https://youtube.com/@beetrus",
        icon: Youtube,
        color: "var(--neon-red)",
        description: "Box Sessions & Music Videos.",
        count: "1K+"
    },
];

const subSocials = [
    { name: "GitHub", url: "https://github.com/beetrus", icon: Github },
    { name: "Audiomack", url: "https://audiomack.com/beetrus", icon: Music },
    { name: "LinkedIn", url: "https://linkedin.com/in/bitrus-gadzama", icon: Linkedin },
    { name: "Discord", url: "#", icon: MessageCircle },
];

export default function SocialsPage() {
    return (
        <div className="relative min-h-screen pt-[var(--page-top-padding)] pb-24 overflow-hidden">
            {/* Explicit Spacer for vertical hierarchy consistency */}
            <div className="h-24 w-full" />
            {/* Background Narrative */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-red/50 to-transparent" />
                <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-neon-red/20 to-transparent" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-red/5 rounded-full blur-[120px]" />
            </div>

            <div className="container-custom relative px-6">
                {/* Section Title */}
                <motion.div
                    className="mb-20"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-neon-red font-mono text-xs uppercase tracking-[0.5em] mb-4 block animate-pulse">
                        UPLINK.ESTABLISH()
                    </span>
                    <h1 className="text-7xl md:text-9xl font-black tracking-tighter uppercase leading-[0.8]">
                        Digital <br />
                        <span className="gradient-text">Pulse</span>
                    </h1>
                </motion.div>

                {/* Primary Social Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {mainSocials.map((social, index) => (
                        <motion.a
                            key={social.name}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative h-[400px] overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-8 transition-all hover:border-white/30"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 + 0.5 }}
                        >
                            {/* Hover Reveal Cover */}
                            <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                            </div>

                            <div className="relative z-10 flex h-full flex-col justify-between">
                                <div className="flex items-start justify-between">
                                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:border-neon-red/50 transition-colors">
                                        <social.icon size={28} className="text-white group-hover:text-neon-red transition-all" />
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-black text-white">{social.count}</div>
                                        <div className="text-[10px] font-mono text-foreground-muted uppercase tracking-widest">Global_Reach</div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-3xl font-black uppercase tracking-tight text-white mb-1">
                                        {social.name}
                                    </h3>
                                    <p className="text-foreground-muted text-sm font-mono mb-6 group-hover:text-white transition-colors">
                                        @{social.handle}
                                    </p>
                                    <p className="text-foreground-muted text-xs uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity leading-loose">
                                        {social.description}
                                    </p>
                                </div>
                            </div>

                            {/* Corner Scan Line */}
                            <div className="absolute top-0 right-0 h-32 w-px bg-gradient-to-b from-neon-red/50 to-transparent opacity-0 group-hover:opacity-100 transition-all" />
                        </motion.a>
                    ))}
                </div>

                {/* Secondary Network Hub */}
                <motion.div
                    className="rounded-3xl border border-white/5 bg-white/[0.01] p-12 mb-32"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="max-w-md">
                            <h2 className="text-3xl font-black tracking-tight mb-4 uppercase text-white">
                                Extended <span className="text-neon-red">Network</span>
                            </h2>
                            <p className="text-foreground-muted text-sm leading-relaxed mb-8">
                                Connect across developer tools, streaming platforms, and professional networks to see the full scope of my work.
                            </p>
                            <Button variant="neon" size="lg" className="w-full md:w-auto" rightIcon={<Share2 size={16} />}>
                                COPY_UNIVERSAL_LINK
                            </Button>
                        </div>

                        <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
                            {subSocials.map((sub) => (
                                <a
                                    key={sub.name}
                                    href={sub.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-all group"
                                >
                                    <sub.icon size={20} className="text-foreground-muted group-hover:text-neon-red transition-colors" />
                                    <span className="font-mono text-xs uppercase tracking-widest font-bold">
                                        {sub.name}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
