"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const mockupStyles = [
    {
        id: "cyber-industrial",
        name: "Cyber Industrial",
        description: "High-contrast, technical aesthetic with dark foundations and neon accents.",
        image: "/images/work/safenet.png",
        tags: ["Dark Mode", "Technical", "Security"]
    },
    {
        id: "futuristic-minimal",
        name: "Futuristic Minimal",
        description: "Sleek, avant-garde layout with bold typography and cinematic spacing.",
        image: "/images/work/mvmnt.png",
        tags: ["Clean", "Premium", "Modern"]
    },
    {
        id: "neon-retro",
        name: "Neon Retro",
        description: "Vibrant, energized design inspired by 80s arcade and digital nostalgia.",
        image: "/images/work/starranker.png",
        tags: ["Vibrant", "Creative", "Playful"]
    },
    {
        id: "high-gloss",
        name: "High-Gloss Ecosystem",
        description: "Polished, interconnected interface designed for complex data and service layers.",
        image: "/images/work/onestop.png",
        tags: ["SaaS", "Dashboard", "Ecosystem"]
    }
];

interface MockupGalleryProps {
    selectedStyle: string;
    onSelect: (id: string) => void;
}

export function MockupGallery({ selectedStyle, onSelect }: MockupGalleryProps) {
    return (
        <section className="mb-24">
            <div className="flex items-center justify-between mb-12">
                <div>
                    <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">
                        Architectural <span className="text-neon-red">Blueprints</span>
                    </h2>
                    <p className="text-foreground-muted text-sm font-mono uppercase tracking-widest">
                        // Select an inspiration style for your project
                    </p>
                </div>
                <div className="hidden md:block h-px flex-1 bg-white/5 mx-12" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {mockupStyles.map((style) => (
                    <motion.div
                        key={style.id}
                        onClick={() => onSelect(style.id)}
                        className={cn(
                            "group cursor-pointer relative rounded-2xl border transition-all duration-500 overflow-hidden",
                            selectedStyle === style.id
                                ? "border-neon-red ring-1 ring-neon-red/50 bg-neon-red/5"
                                : "border-white/5 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                        )}
                        whileHover={{ y: -5 }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        {/* Selected Indicator */}
                        {selectedStyle === style.id && (
                            <div className="absolute top-4 right-4 z-20 bg-neon-red rounded-full p-1 shadow-glow-red">
                                <Check size={14} className="text-white" />
                            </div>
                        )}

                        {/* Image Preview */}
                        <div className="aspect-[4/3] relative overflow-hidden">
                            <Image
                                src={style.image}
                                alt={style.name}
                                fill
                                className={cn(
                                    "object-cover transition-transform duration-700",
                                    selectedStyle === style.id ? "scale-110" : "group-hover:scale-110"
                                )}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60" />
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            <h3 className="text-lg font-black uppercase tracking-tight mb-2 group-hover:text-neon-red transition-colors">
                                {style.name}
                            </h3>
                            <p className="text-xs text-foreground-muted line-clamp-2 leading-relaxed mb-4">
                                {style.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {style.tags.map(tag => (
                                    <span key={tag} className="text-[9px] font-mono uppercase tracking-widest px-2 py-1 rounded bg-white/5 border border-white/10 text-white/40">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
