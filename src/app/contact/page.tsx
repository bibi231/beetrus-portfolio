"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { fadeInUp, ambientFade, staggerContainer } from "@/lib/animations";
import { toast } from "sonner";
import {
    CheckCircle,
    Link2,
    Music,
    Video,
    Share2,
    Database,
    Mail,
    Send,
    MapPin,
    Phone,
    Instagram,
    Twitter,
    Youtube,
    Github,
} from "lucide-react";

const socials = [
    { name: "Instagram", handle: "@beetrus_gg", url: "https://instagram.com/beetrus_gg", icon: Instagram },
    { name: "Twitter", handle: "@beetrus_g", url: "https://twitter.com/beetrus_g", icon: Twitter },
    { name: "YouTube", handle: "@beetrus", url: "https://youtube.com/@beetrus", icon: Youtube },
    { name: "GitHub", handle: "@beetrus", url: "https://github.com/beetrus", icon: Github },
    { name: "Audiomack", handle: "@beetrus", url: "https://audiomack.com/beetrus", icon: Music },
];

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
        link: "", // Music/Video/Drive link
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSubmitted(true);
        toast.success("Message sent successfully! I'll get back to you soon.");

        // Reset form
        setFormData({ name: "", email: "", subject: "", message: "", link: "" });
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <div className="relative">
            {/* Hero Section */}
            <section className="min-h-[calc(100vh-var(--header-height))] relative flex flex-col justify-center pt-[var(--page-top-padding)]">
                <div className="container-custom">
                    <motion.div
                        className="mx-auto max-w-4xl text-center"
                        variants={fadeInUp}
                        initial="hidden"
                        animate="visible"
                    >
                        <span className="mb-4 inline-block text-xs font-mono uppercase tracking-[0.4em] text-neon-red animate-pulse">
                            INITIATE.CONNECTION()
                        </span>
                        <h1 className="mb-6 text-6xl md:text-7xl font-black tracking-tighter">
                            Let&apos;s <span className="text-neon-red drop-shadow-[0_0_15px_rgba(255,45,45,0.5)]">Sync</span>
                        </h1>
                        <motion.p className="text-body text-foreground-muted max-w-2xl mx-auto font-light leading-relaxed" variants={ambientFade}>
                            Share your vision, send your links, or initiate a collaboration.
                            <br />
                            The grid is open.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Main Content */}
            {/* Main Content */}
            <section className="py-24 pt-0">
                <div className="container-custom">
                    <div className="mx-auto max-w-3xl space-y-24">
                        {/* Contact Form */}
                        <motion.div
                            variants={fadeInUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <div className="rounded-2xl border border-white/5 bg-black/60 p-8 md:p-12 shadow-2xl relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-neon-red/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute top-0 right-0 h-24 w-px bg-gradient-to-b from-neon-red/50 to-transparent" />
                                <div className="absolute top-0 right-0 w-24 h-px bg-gradient-to-l from-neon-red/50 to-transparent" />

                                <h2 className="mb-10 text-3xl font-bold text-center">Send a Message</h2>

                                {isSubmitted ? (
                                    <motion.div
                                        className="flex flex-col items-center py-12 text-center"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                    >
                                        <CheckCircle className="h-16 w-16 text-neon-green" />
                                        <h3 className="mt-4 text-xl font-semibold">Message Sent!</h3>
                                        <p className="mt-2 text-foreground-muted">
                                            Thanks for reaching out. I&apos;ll get back to you as soon as possible.
                                        </p>
                                        <Button
                                            variant="secondary"
                                            className="mt-6"
                                            onClick={() => setIsSubmitted(false)}
                                        >
                                            Send Another Message
                                        </Button>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-8">
                                        <div className="grid gap-8 sm:grid-cols-2">
                                            <div className="space-y-3">
                                                <label htmlFor="name" className="text-[10px] font-mono uppercase tracking-[0.3em] text-foreground-muted pl-1">
                                                    User_Name
                                                </label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                    className="h-14 w-full rounded-lg border border-white/5 bg-black/60 px-5 text-foreground placeholder:text-foreground-muted/30 focus:border-neon-red/50 focus:outline-none focus:ring-1 focus:ring-neon-red/20 focus:shadow-glow-sm transition-all font-mono text-sm"
                                                    placeholder="ENTER_NAME"
                                                />
                                            </div>
                                            <div className="space-y-3">
                                                <label htmlFor="email" className="text-[10px] font-mono uppercase tracking-[0.3em] text-foreground-muted pl-1">
                                                    Access_Point
                                                </label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    className="h-14 w-full rounded-lg border border-white/5 bg-black/60 px-5 text-foreground placeholder:text-foreground-muted/30 focus:border-neon-red/50 focus:outline-none focus:ring-1 focus:ring-neon-red/20 focus:shadow-[0_0_15px_rgba(255,45,45,0.1)] transition-all font-mono text-sm"
                                                    placeholder="YOUR@EMAIL.COM"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <label htmlFor="subject" className="text-[10px] font-mono uppercase tracking-[0.3em] text-foreground-muted pl-1">
                                                Request_Protocol
                                            </label>
                                            <select
                                                id="subject"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                required
                                                className="h-14 w-full rounded-lg border border-white/5 bg-black/60 px-5 text-foreground focus:border-neon-red/50 focus:outline-none focus:ring-1 focus:ring-neon-red/20 focus:shadow-[0_0_15px_rgba(255,45,45,0.1)] transition-all font-mono text-sm appearance-none"
                                            >
                                                <option value="" disabled className="bg-black">SELECT_PROTOCOL</option>
                                                <option value="collaboration" className="bg-black">MUSIC_COLLAB</option>
                                                <option value="project" className="bg-black">DEV_PROJECT</option>
                                                <option value="booking" className="bg-black">BOOKING</option>
                                                <option value="press" className="bg-black">MEDIA_INQUIRY</option>
                                                <option value="other" className="bg-black">OTHER.SYS</option>
                                            </select>
                                        </div>

                                        <div className="space-y-3">
                                            <label htmlFor="link" className="text-[10px] font-mono uppercase tracking-[0.3em] text-foreground-muted pl-1">
                                                Media_Transmission [Drive / Video / Audio]
                                            </label>
                                            <div className="relative">
                                                <Link2 className="absolute left-5 top-1/2 -translate-y-1/2 text-neon-red/30" size={18} />
                                                <input
                                                    type="url"
                                                    id="link"
                                                    name="link"
                                                    value={formData.link}
                                                    onChange={handleChange}
                                                    className="h-14 w-full rounded-lg border border-white/5 bg-black/60 pl-14 pr-5 text-foreground placeholder:text-foreground-muted/30 focus:border-neon-red/50 focus:outline-none focus:ring-1 focus:ring-neon-red/20 focus:shadow-[0_0_15px_rgba(255,45,45,0.1)] transition-all font-mono text-sm"
                                                    placeholder="HTTPS://LINK..."
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <label htmlFor="message" className="text-[10px] font-mono uppercase tracking-[0.3em] text-foreground-muted pl-1">
                                                Data_Payload
                                            </label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                                rows={6}
                                                className="w-full rounded-lg border border-white/5 bg-black/60 px-5 py-4 text-foreground placeholder:text-foreground-muted/30 focus:border-neon-red/50 focus:outline-none focus:ring-1 focus:ring-neon-red/20 focus:shadow-[0_0_15px_rgba(255,45,45,0.1)] transition-all font-mono text-sm resize-none"
                                                placeholder="DESCRIBE_COLLAB..."
                                            />
                                        </div>

                                        <Button
                                            type="submit"
                                            size="lg"
                                            className="w-full h-16 bg-black border border-neon-red/50 text-white shadow-[0_0_20px_-10px_rgba(255,45,45,0.4)] hover:bg-neon-red hover:shadow-[0_0_30px_rgba(255,45,45,0.3)] transition-all duration-500 font-bold uppercase tracking-widest"
                                            isLoading={isSubmitting}
                                            rightIcon={<Send size={20} />}
                                        >
                                            SEND_PACKET
                                        </Button>
                                    </form>
                                )}
                            </div>
                        </motion.div>

                        {/* Contact Info & Socials */}
                        <motion.div
                            className="space-y-12"
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            {/* Direct Contact */}
                            <motion.div
                                variants={ambientFade}
                                className="rounded-2xl border border-white/5 bg-black/60 p-8 shadow-2xl"
                            >
                                <h2 className="mb-6 text-xl font-mono uppercase tracking-widest text-neon-red">Direct_Access</h2>
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-neon-red/10 border border-neon-red/20 shadow-[0_0_10px_rgba(255,45,45,0.1)]">
                                            <Mail className="h-5 w-5 text-neon-red" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-mono text-foreground-muted uppercase">Endpoint</p>
                                            <a
                                                href="mailto:bitrusgadzama02@gmail.com"
                                                className="font-medium hover:text-neon-red transition-colors"
                                            >
                                                bitrusgadzama02@gmail.com
                                            </a>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/5 border border-white/10">
                                            <MapPin className="h-5 w-5 text-foreground-muted" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-mono text-foreground-muted uppercase">Physical_Node</p>
                                            <p className="font-medium">Abuja, Nigeria</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Social Links */}
                            <motion.div
                                variants={ambientFade}
                                className="rounded-3xl border border-border bg-card p-8"
                            >
                                <h2 className="mb-6 text-2xl font-bold">Follow Me</h2>
                                <div className="space-y-3">
                                    {socials.map((social) => (
                                        <a
                                            key={social.name}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group flex items-center gap-4 rounded-xl p-3 transition-colors hover:bg-background"
                                        >
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-background transition-colors group-hover:bg-primary/10">
                                                <social.icon
                                                    size={20}
                                                    className="text-foreground-muted transition-colors group-hover:text-primary"
                                                />
                                            </div>
                                            <div>
                                                <p className="font-medium">{social.name}</p>
                                                <p className="text-sm text-foreground-muted">
                                                    {social.handle}
                                                </p>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Availability */}
                            <motion.div
                                variants={ambientFade}
                                className="rounded-3xl border border-neon-green/30 bg-neon-green/5 p-6"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="h-3 w-3 animate-pulse rounded-full bg-neon-green" />
                                    <span className="font-medium">
                                        Available for freelance projects
                                    </span>
                                </div>
                                <p className="mt-2 text-sm text-foreground-muted">
                                    Currently accepting new projects and collaborations.
                                    Let&apos;s create something amazing together.
                                </p>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}
