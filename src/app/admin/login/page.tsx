"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Terminal, Lock, User, ArrowRight, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Header } from "@/components/layout/header";

export default function AdminLoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const result = await signIn("credentials", {
                username: formData.username,
                password: formData.password,
                redirect: false,
            });

            if (result?.error) {
                toast.error("Access Denied: Invalid System Credentials");
            } else {
                toast.success("Security Clearance Granted. Redirecting...");
                router.push("/admin");
            }
        } catch (error) {
            toast.error("System Error: Critical authentication failure");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Header />
            <main className="min-h-screen flex items-center justify-center pt-24 pb-12 relative overflow-hidden bg-black">
                {/* Animated grid background */}
                <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `linear-gradient(rgba(255,45,45,0.5) 1px, transparent 1px),
                                            linear-gradient(90deg, rgba(255,45,45,0.5) 1px, transparent 1px)`,
                            backgroundSize: '60px 60px',
                        }}
                    />
                </div>

                {/* Ambient glows */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-red/5 blur-[120px] pointer-events-none" />

                <div className="container-custom relative z-10 w-full max-w-md">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-2xl border border-neon-red/20 bg-black/80 backdrop-blur-xl p-8 shadow-2xl shadow-neon-red/10"
                    >
                        {/* Header */}
                        <div className="text-center mb-10">
                            <div className="inline-flex items-center justify-center p-3 rounded-xl bg-neon-red/10 border border-neon-red/30 mb-6">
                                <ShieldAlert size={32} className="text-neon-red" />
                            </div>
                            <h1 className="text-3xl font-black tracking-tighter uppercase mb-2">
                                Admin <span className="gradient-text">Portal</span>
                            </h1>
                            <p className="text-sm font-mono text-foreground-muted uppercase tracking-widest">
                                protocol_v2.0 // secure_login
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Username */}
                            <div className="space-y-2">
                                <label className="text-xs font-mono uppercase tracking-widest text-foreground-muted ml-1">
                                    Operator_ID
                                </label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground-muted group-focus-within:text-neon-red transition-colors" size={18} />
                                    <input
                                        type="text"
                                        required
                                        placeholder="Enter ID..."
                                        className="w-full bg-background-secondary border border-white/5 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-foreground-muted/30 focus:outline-none focus:border-neon-red/50 transition-all font-mono"
                                        value={formData.username}
                                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <label className="text-xs font-mono uppercase tracking-widest text-foreground-muted ml-1">
                                    Security_Key
                                </label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground-muted group-focus-within:text-neon-red transition-colors" size={18} />
                                    <input
                                        type="password"
                                        required
                                        placeholder="••••••••"
                                        className="w-full bg-background-secondary border border-white/5 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-foreground-muted/30 focus:outline-none focus:border-neon-red/50 transition-all font-mono"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                size="lg"
                                className="w-full bg-neon-red hover:bg-neon-red/90 text-white font-bold h-14 rounded-xl shadow-glow-red mt-4"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <motion.span
                                        animate={{ opacity: [1, 0.5, 1] }}
                                        transition={{ repeat: Infinity, duration: 1.5 }}
                                    >
                                        AUTHORIZING...
                                    </motion.span>
                                ) : (
                                    <>
                                        ACCESS SYSTEM
                                        <ArrowRight className="ml-2" size={18} />
                                    </>
                                )}
                            </Button>
                        </form>

                        {/* Footer Info */}
                        <div className="mt-10 pt-6 border-t border-white/5 text-center">
                            <p className="text-[10px] font-mono text-foreground-muted/50 uppercase tracking-tighter">
                                Warning: Unauthorized access attempts are monitored and logged.
                                <br />By entering, you confirm your administrative clearance level.
                            </p>
                        </div>
                    </motion.div>

                    {/* Decorative bits */}
                    <div className="absolute -bottom-12 -right-12 text-[120px] font-black text-white/[0.02] select-none pointer-events-none uppercase italic">
                        SECURE
                    </div>
                </div>
            </main>
        </>
    );
}
