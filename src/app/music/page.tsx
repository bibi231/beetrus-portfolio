"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { fadeInUp, ambientFade, staggerContainer } from "@/lib/animations";
import { Play, Disc3, Headphones, Youtube, ArrowUpRight, Music2, Share2, Volume2, ExternalLink } from "lucide-react";
import Link from "next/link";

const discography = [
    {
        title: "GOJO",
        year: "2026",
        type: "Single / Afrosounds",
        description: "The latest evolution in the Beetrus sonic ecosystem. Hard-hitting rhythms meets melodic precision.",
        links: { spotify: "#", apple: "#", audiomack: "https://audiomack.com/beetrus/song/gojo" },
        featured: true,
        embed: "https://audiomack.com/embed/beetrus/song/gojo?background=1"
    },
    {
        title: "Lights",
        year: "2025",
        type: "Single",
        description: "A cinematic exploration of light and shadow.",
        links: { spotify: "#", audiomack: "https://audiomack.com/beetrus/song/lights" }
    },
    {
        title: "Bluetooth",
        year: "2025",
        type: "Single ft. Yorkk",
        description: "Collaboration exploring the digital connection architecture.",
        links: { spotify: "#", audiomack: "https://audiomack.com/beetrus/song/bluetooth" }
    },
    {
        title: "Afro State Of Mind",
        year: "2024",
        type: "EP / 5 Tracks",
        description: "The debut EP defining the core Beetrus sound signature.",
        links: { spotify: "#", apple: "#", audiomack: "https://audiomack.com/beetrus/album/afro-state-of-mind" }
    },
    {
        title: "AT THIS AGE",
        year: "2023",
        type: "Live / Box Sessions",
        description: "Raw performance captured in the heart of the capital.",
        links: { youtube: "https://www.youtube.com/watch?v=Fj-yWpY00tM" }, // Placeholder for actual ID if known, user said Box Session
        videoEmbed: "https://www.youtube.com/embed/Fj-yWpY00tM"
    }
];

export default function MusicPage() {
    return (
        <div className="relative min-h-screen pt-[var(--page-top-padding)] pb-32 overflow-hidden bg-black">
            {/* Explicit Spacer */}
            <div className="h-24 w-full" />

            {/* Audio Wave Decor */}
            <div className="pointer-events-none fixed inset-0 -z-10 opacity-10">
                <div className="absolute top-1/2 left-0 w-full h-px bg-white/20" />
                <div className="absolute top-[45%] left-0 w-full h-px bg-white/5" />
                <div className="absolute top-[55%] left-0 w-full h-px bg-white/5" />
            </div>

            <div className="container-custom px-6">
                {/* Hero / Statement */}
                <motion.div
                    className="mb-40"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.2 }}
                >
                    <div className="flex items-center gap-4 mb-8">
                        <Volume2 size={16} className="text-neon-red" />
                        <span className="text-xs font-mono font-bold uppercase tracking-[0.5em] text-neon-red">Frequency_Uplink</span>
                    </div>
                    <h1 className="text-8xl md:text-[12rem] font-black tracking-tighter uppercase leading-[0.75] mb-12">
                        Sound <br />
                        <span className="gradient-text">Engine</span>
                    </h1>
                    <p className="max-w-xl text-lg text-foreground-muted font-mono uppercase tracking-widest leading-relaxed">
                        // afrosounds // rhythm_design // vocal_synthesis
                    </p>
                </motion.div>

                {/* Featured Release */}
                <section className="mb-48">
                    <motion.div
                        className="relative group rounded-[3rem] border border-white/10 bg-white/[0.02] p-8 md:p-20 overflow-hidden"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="absolute -right-20 -top-20 h-96 w-96 bg-neon-red/10 blur-[120px] group-hover:bg-neon-red/20 transition-all duration-1000" />

                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div className="order-2 lg:order-1">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-red/10 border border-neon-red/20 text-neon-red text-[10px] font-mono mb-8">
                                    <span className="h-1.5 w-1.5 rounded-full bg-neon-red animate-ping" />
                                    LATEST_DROP.GOJO
                                </div>
                                <h2 className="text-6xl md:text-8xl font-black mb-8 uppercase tracking-tighter">
                                    GOJO
                                </h2>
                                <p className="text-xl text-foreground-muted mb-12 leading-relaxed">
                                    A fusion of industrial synthesis and organic African rhythms. This release marks a new epoch in the Afrosounds landscape.
                                </p>

                                <div className="mb-12 rounded-2xl overflow-hidden border border-white/5 bg-black">
                                    <iframe
                                        src={discography[0].embed}
                                        width="100%"
                                        height="252"
                                        frameBorder="0"
                                        scrolling="no"
                                        allowTransparency={true}
                                        className="opacity-80 hover:opacity-100 transition-opacity"
                                    />
                                </div>

                                <div className="flex flex-wrap gap-4">
                                    <a href={discography[0].links.audiomack} target="_blank" rel="noopener noreferrer">
                                        <Button size="lg" leftIcon={<Play size={18} />}>AUDIOMACK_GLOBAL</Button>
                                    </a>
                                    <Button variant="outline" size="lg" leftIcon={<Share2 size={18} />}>SHARE_PROTOCOL</Button>
                                </div>
                            </div>

                            <div className="relative order-1 lg:order-2">
                                <div className="aspect-square rounded-2xl bg-black border border-white/5 overflow-hidden flex items-center justify-center relative shadow-2xl group-hover:border-neon-red/20 transition-colors duration-700">
                                    <Disc3 size={120} className="text-white/5 animate-spin-slow group-hover:text-neon-red/10 transition-colors duration-700" />
                                    <div className="absolute inset-0 bg-gradient-to-br from-neon-red/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black to-transparent">
                                        <div className="text-[10px] font-mono text-white/40 uppercase tracking-[0.3em]">Catalog_Ref: 0x2026_GOJO</div>
                                    </div>
                                </div>
                                {/* Technical HUD Overlays */}
                                <div className="absolute -right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2">
                                    {[1, 2, 3].map(i => <div key={i} className="h-12 w-1 bg-white/10 rounded-full" />)}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* Box Sessions / Video Section */}
                <section className="mb-48">
                    <motion.div
                        className="mb-12 flex items-center justify-between"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Box <span className="text-neon-red">Sessions</span></h2>
                        <span className="text-xs font-mono text-foreground-muted uppercase tracking-[0.3em]">Live_Performance_VOD</span>
                    </motion.div>

                    <motion.div
                        className="relative rounded-3xl overflow-hidden border border-white/10 bg-black aspect-video shadow-glow-red/20 group"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <iframe
                            src={discography[4].videoEmbed}
                            title="AT THIS AGE - Box Session"
                            className="absolute inset-0 w-full h-full opacity-60 group-hover:opacity-100 transition-opacity duration-700"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                        <div className="absolute inset-0 pointer-events-none border-[12px] border-black" />
                    </motion.div>
                </section>

                {/* Discography Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
                    {discography.slice(1, 4).map((track, index) => (
                        <motion.div
                            key={track.title}
                            className="group p-8 md:p-10 rounded-3xl border border-white/10 bg-white/[0.01] hover:bg-white/[0.03] transition-all hover:border-white/20"
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="flex justify-between items-start mb-12">
                                <div className="p-4 rounded-xl bg-white/5 border border-white/10 group-hover:border-neon-red/30 transition-colors">
                                    <Music2 size={24} className="text-white group-hover:text-neon-red transition-all" />
                                </div>
                                <span className="text-[10px] font-mono text-foreground-muted uppercase tracking-[0.3em] font-bold">
                                    {track.year}
                                </span>
                            </div>

                            <h3 className="text-3xl font-black uppercase tracking-tight text-white mb-4 group-hover:text-neon-red transition-colors">
                                {track.title}
                            </h3>
                            <p className="text-sm text-foreground-muted mb-8 leading-relaxed h-16">
                                {track.description}
                            </p>

                            <div className="flex items-center gap-6">
                                <a href={track.links.audiomack} target="_blank" rel="noopener noreferrer" className="text-xs font-mono font-bold uppercase tracking-widest text-white/40 hover:text-neon-red transition-colors flex items-center gap-2">
                                    AUDIOMACK <ExternalLink size={14} />
                                </a>
                                <a href="#" className="text-xs font-mono font-bold uppercase tracking-widest text-white/40 hover:text-neon-red transition-colors flex items-center gap-2">
                                    SPOTIFY <ArrowUpRight size={14} />
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Archive Visual CTA */}
                <motion.div
                    className="text-center py-24 border-t border-white/5"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                >
                    <Headphones size={48} className="mx-auto mb-8 text-white/5 group-hover:text-neon-red transition-colors duration-700" />
                    <h2 className="text-4xl font-black uppercase tracking-tight mb-8">Access Complete Archives?</h2>
                    <div className="flex justify-center flex-wrap gap-4">
                        <Button variant="neon" size="lg">APPLE_MUSIC</Button>
                        <Button variant="neon" size="lg">SPOTIFY_GLOBAL</Button>
                        <a href="https://youtube.com/@beetrus" target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" size="lg">YOUTUBE_VOD</Button>
                        </a>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
