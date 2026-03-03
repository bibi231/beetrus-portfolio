"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
    Github,
    Twitter,
    Instagram,
    Youtube,
    Music2,
    Mail,
    ArrowUpRight,
    Terminal,
    ChevronRight
} from "lucide-react";
import { spring } from "@/lib/animations";

const footerLinks = {
    navigation: [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Work", href: "/work" },
        { label: "Music", href: "/music" },
        { label: "Store", href: "/store" },
        { label: "Socials", href: "/socials" },
        { label: "Contact", href: "/contact" },
    ],
    socials: [
        { label: "Instagram", href: "https://instagram.com/beetrus_gg", icon: Instagram, color: "#E4405F" },
        { label: "TikTok", href: "https://www.tiktok.com/@beetrus_gg", icon: Music2, color: "#00F2EA" },
        { label: "YouTube", href: "https://youtube.com/@beetrus", icon: Youtube, color: "#FF0000" },
        { label: "GitHub", href: "https://github.com/bibi231", icon: Github, color: "#FFFFFF" },
    ],
    legal: [
        { label: "Privacy", href: "/privacy" },
        { label: "Terms", href: "/terms" },
    ],
};

/**
 * Site footer - Terminal/Studio aesthetic
 * Features scanlines, red accents, and command prompt style
 */
export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative border-t border-border/30 bg-background">
            {/* Scanline overlay */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `repeating-linear-gradient(
                            0deg,
                            transparent,
                            transparent 2px,
                            var(--border-subtle) 2px,
                            var(--border-subtle) 4px
                        )`
                    }}
                />
            </div>

            {/* Background gradient accent */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -bottom-40 left-1/4 h-80 w-80 rounded-full bg-neon-red/5 blur-[150px]" />
            </div>

            <div className="container-custom relative py-16">
                {/* Terminal-style header */}
                <div className="mb-12 flex items-center gap-3 font-mono text-xs text-foreground-muted">
                    <Terminal size={14} className="text-neon-red" />
                    <span className="text-neon-red">beetrus</span>
                    <span>~</span>
                    <span>portfolio</span>
                    <span className="animate-pulse">_</span>
                </div>

                {/* Main Footer Grid */}
                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
                    {/* Brand Column */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="inline-block">
                            <span className="font-display text-3xl font-black text-neon-red drop-shadow-[0_0_15px_rgba(255,45,45,0.5)]">
                                BEETRUS
                            </span>
                        </Link>
                        <p className="mt-4 max-w-md text-foreground-muted leading-relaxed">
                            Afrosounds artist & full-stack engineer based in Abuja, Nigeria.
                            Creating at the intersection of music, code, and visual art.
                        </p>

                        {/* Newsletter Signup - Terminal Style */}
                        <div className="mt-8">
                            <p className="mb-3 flex items-center gap-2 text-sm font-medium">
                                <span className="text-neon-red">&gt;</span>
                                Stay in the loop
                            </p>
                            <form className="flex gap-2">
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    className="h-11 flex-1 rounded-lg border border-border/50 bg-card/30 px-4 font-mono text-sm text-foreground placeholder:text-foreground-muted/50 focus:border-neon-red/50 focus:outline-none focus:ring-1 focus:ring-neon-red/30 focus:shadow-glow-sm transition-all"
                                />
                                <motion.button
                                    type="submit"
                                    className="inline-flex h-11 items-center gap-2 rounded-lg bg-neon-red px-5 text-sm font-semibold text-white transition-shadow hover:shadow-glow-red"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    transition={spring.snappy}
                                >
                                    <Mail size={14} />
                                    Subscribe
                                </motion.button>
                            </form>
                            <p className="mt-3 font-mono text-[10px] text-foreground-muted/50 uppercase tracking-wider">
                                // no spam, unsubscribe anytime
                            </p>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div>
                        <h4 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-neon-red">
                            Navigate
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.navigation.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="group inline-flex items-center gap-2 text-foreground-muted transition-colors hover:text-white"
                                    >
                                        <ChevronRight
                                            size={12}
                                            className="text-neon-red/50 transition-transform group-hover:translate-x-0.5"
                                        />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div>
                        <h4 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-neon-red">
                            Connect
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.socials.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group inline-flex items-center gap-3 text-foreground-muted transition-colors hover:text-white"
                                    >
                                        <link.icon
                                            size={16}
                                            className="transition-colors"
                                            style={{ color: link.color }}
                                        />
                                        {link.label}
                                        <ArrowUpRight
                                            size={12}
                                            className="opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 text-neon-red"
                                        />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar - Status Line */}
                <div className="mt-16 border-t border-border/30 pt-8">
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                        {/* Status indicators */}
                        <div className="flex items-center gap-4 font-mono text-xs text-foreground-muted/70">
                            <span className="flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-neon-red/50 animate-pulse" />
                                ONLINE
                            </span>
                            <span className="text-border">|</span>
                            <span>v2.0.0</span>
                            <span className="text-border">|</span>
                            <span>© {currentYear} Beetrus</span>
                            <span className="text-border">|</span>
                            <Link
                                href="/admin"
                                className="flex items-center gap-2 text-neon-red/70 hover:text-neon-red transition-all group"
                            >
                                <Terminal size={12} className="group-hover:animate-pulse" />
                                <span>TERMINAL_ACCESS</span>
                            </Link>
                        </div>

                        {/* Legal links */}
                        <div className="flex items-center gap-6">
                            {footerLinks.legal.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="font-mono text-xs text-foreground-muted/50 transition-colors hover:text-neon-red"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Terminal signature */}
                    <p className="mt-6 text-center font-mono text-[10px] text-foreground-muted/30">
                        Crafted with <span className="text-neon-red">♥</span> in Abuja, Nigeria
                    </p>
                </div>
            </div>
        </footer>
    );
}
