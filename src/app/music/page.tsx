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
        type: "Single ft. Kinfxlk",
        description: "The latest evolution in the Beetrus sonic ecosystem. A gritty blend of afrobeats and industrial synthesis.",
        links: { spotify: "https://open.spotify.com/artist/4X9y... ", audiomack: "https://audiomack.com/beetrus/song/gojo" },
        featured: true,
        embed: "https://audiomack.com/embed/beetrus/song/gojo?background=1"
    },
    {
        title: "Lights",
        year: "2025",
        type: "Single",
        description: "A cinematic exploration of light and shadow, merging surreal visuals with rhythmic precision.",
        links: { spotify: "#", audiomack: "https://audiomack.com/beetrus/song/lights" },
        embed: "https://audiomack.com/embed/beetrus/song/lights?background=1"
    },
    {
        title: "Bluetooth",
        year: "2025",
        type: "Single ft. Yôrkk",
        description: "Cyber-sonic collaboration exploring digital connection architecture and modern afrosounds.",
        links: { spotify: "#", audiomack: "https://audiomack.com/beetrus/song/bluetooth" },
        embed: "https://audiomack.com/embed/beetrus/song/bluetooth?background=1"
    },
    {
        title: "Afro State Of Mind",
        year: "2024",
        type: "Album / EP",
        description: "The definitive defining project defining the core Beetrus sound signature across the continent.",
        links: { audiomack: "https://audiomack.com/beetrus/album/afro-state-of-mind" }
    },
    {
        title: "DMPA (DANCE MY PAIN AWAY)",
        year: "2023",
        type: "Single ft. Kinfxlk",
        description: "Emotional resonance meets club-shaking rhythm. A core anthem of the Kinfxlk collective.",
        links: { spotify: "#", audiomack: "https://audiomack.com/beetrus/song/dmpa" }
    },
    {
        title: "AT THIS AGE",
        year: "2023",
        type: "EP / Live Session",
        description: "Box Sessions performance. Raw, unfiltered, and deeply personal storytelling.",
        links: { youtube: "https://www.youtube.com/watch?v=x9qHK_doscU" },
        videoEmbed: "https://www.youtube.com/embed/x9qHK_doscU?si=mC9ob8Z8jR3wMHWT"
    },
    {
        title: "Steady",
        year: "2023",
        type: "Single",
        description: "Rhythmic stability in a chaotic soundscape. Characterized by deep, gritty vocals.",
        links: { audiomack: "https://audiomack.com/beetrus/song/steady" }
    },
    {
        title: "Do Me",
        year: "2022",
        type: "Single",
        description: "Vibrant afrobeats energy exploring attraction and sonic movement.",
        links: { audiomack: "https://audiomack.com/beetrus/song/do-me" }
    }
];

const externalEmbeds = {
    soundcloud: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/users/426093554&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true",
    instagramReel: "https://www.instagram.com/reel/C72GPVcIv8g/embed"
};

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

                {/* Discography Grid - Expanded */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-48">
                    {discography.slice(1).map((track, index) => (
                        <motion.div
                            key={track.title}
                            className="group p-8 rounded-3xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all hover:border-neon-red/20 shadow-xl"
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <div className="flex justify-between items-start mb-12">
                                <div className="p-4 rounded-2xl bg-black border border-white/10 group-hover:border-neon-red/30 transition-colors">
                                    <Music2 size={24} className="text-white group-hover:text-neon-red transition-all" />
                                </div>
                                <span className="text-[10px] font-mono text-foreground-muted uppercase tracking-[0.3em] font-bold">
                                    {track.year}
                                </span>
                            </div>

                            <h3 className="text-2xl font-black uppercase tracking-tighter text-white mb-2 group-hover:text-neon-red transition-colors">
                                {track.title}
                            </h3>
                            <div className="text-[10px] font-mono text-neon-red/60 mb-4 tracking-widest uppercase">{track.type}</div>

                            <p className="text-sm text-foreground-muted mb-8 leading-relaxed line-clamp-2 h-10">
                                {track.description}
                            </p>

                            <div className="flex items-center gap-6 pt-6 border-t border-white/5">
                                <a href={track.links.audiomack} target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors flex items-center gap-2">
                                    AUDIOMACK
                                </a>
                                <a href="#" className="text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors flex items-center gap-2">
                                    SPOTIFY
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Master Registry / Global Embeds */}
                <section className="py-32 border-t border-white/5">
                    <div className="grid lg:grid-cols-2 gap-16">
                        {/* SoundCloud Ecosystem */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex items-center gap-3 mb-8">
                                <span className="h-px w-8 bg-neon-red" />
                                <h3 className="text-2xl font-black uppercase tracking-tighter">SoundCloud <span className="text-neon-red">Profile</span></h3>
                            </div>
                            <div className="rounded-3xl overflow-hidden border border-white/10 bg-black shadow-2xl">
                                <iframe
                                    width="100%"
                                    height="450"
                                    scrolling="no"
                                    frameBorder="no"
                                    allow="autoplay"
                                    src={externalEmbeds.soundcloud}
                                    className="opacity-90 hover:opacity-100 transition-opacity"
                                />
                            </div>
                        </motion.div>

                        {/* Social Impact / Instagram */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex items-center gap-3 mb-8">
                                <span className="h-px w-8 bg-neon-red" />
                                <h3 className="text-2xl font-black uppercase tracking-tighter">Social <span className="text-neon-red">Frequency</span></h3>
                            </div>
                            <div className="rounded-3xl overflow-hidden border border-white/10 bg-black aspect-[9/16] max-h-[450px] flex items-center justify-center">
                                <iframe
                                    src={externalEmbeds.instagramReel}
                                    className="w-full h-full border-none"
                                    scrolling="no"
                                    allowTransparency={true}
                                />
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Archive Visual CTA */}
                <motion.div
                    className="text-center py-40 mt-32 border-t border-white/5"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <Headphones size={64} className="mx-auto mb-12 text-neon-red/20" />
                    <h2 className="text-5xl md:text-7xl font-[900] uppercase tracking-tighter mb-12">
                        Initialize Full <span className="gradient-text">Stream?</span>
                    </h2>
                    <div className="flex justify-center flex-wrap gap-6">
                        <Button size="lg" className="h-16 px-10 shadow-glow-red">SPOTIFY_LINK</Button>
                        <Button variant="outline" size="lg" className="h-16 px-10 border-white/10">APPLE_MUSIC</Button>
                        <a href="https://audiomack.com/beetrus" target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" size="lg" className="h-16 px-10 border-white/10">AUDIOMACK_ARCHIVE</Button>
                        </a>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

