"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { 
    Mail, 
    MessageSquare, 
    Send, 
    Terminal, 
    Activity, 
    Zap, 
    Lock, 
    Wifi, 
    Cpu,
    ShieldCheck
} from "lucide-react";
import { toast } from "sonner";
import { MUSIC_IDS } from "@/data/musicIds";
import { cn } from "@/lib/utils";

// --- Components ---

/**
 * Animated terminal feed simulating live signals 
 */
function SignalFeed() {
    const [logs, setLogs] = useState<{ id: number; text: string; type: 'info' | 'warn' | 'success' }[]>([]);
    const [counter, setCounter] = useState(0);

    const logMessages = [
        { text: "ESTABLISHING_ENCRYPTED_CHANNEL...", type: 'info' as const },
        { text: "SIGNAL_STRENGTH: 88%", type: 'info' as const },
        { text: "UPLINK_SECURE", type: 'success' as const },
        { text: "POLLING_DATA_PACKETS...", type: 'info' as const },
        { text: "INCOMING_ENQUIRY_STREAM_ACTIVE", type: 'info' as const },
        { text: "FIREWALL_BYPASS_AUTHORIZED", type: 'warn' as const },
        { text: "SESSION_TOKEN_SYNCED", type: 'success' as const },
        { text: "PULSE_RHYTHM_LOCKED", type: 'success' as const },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setLogs(prev => {
                const newLog = {
                    id: Date.now(),
                    text: logMessages[Math.floor(Math.random() * logMessages.length)].text,
                    type: logMessages[Math.floor(Math.random() * logMessages.length)].type
                };
                return [newLog, ...prev.slice(0, 10)];
            });
            setCounter(c => c + 1);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-ink/50 border border-wire rounded-xl p-6 font-mono text-[10px] h-[300px] overflow-hidden relative shadow-2xl">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <Wifi className="animate-pulse text-pulse" size={48} />
            </div>
            <div className="space-y-2">
                <div className="flex items-center gap-2 text-text-3 border-b border-wire pb-2 mb-4">
                    <Terminal size={12} /> <span>TRANSMISSION_FEED.log</span>
                </div>
                <AnimatePresence initial={false}>
                    {logs.map((log) => (
                        <motion.div
                            key={log.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, height: 0 }}
                            className={cn(
                                "flex gap-2",
                                log.type === 'success' ? "text-lime" : 
                                log.type === 'warn' ? "text-pulse" : "text-text-2"
                            )}
                        >
                            <span className="opacity-30">[{new Date(log.id).toLocaleTimeString([], { hour12: false })}]</span>
                            <span className="font-bold">{log.text}</span>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
            
            {/* Visual scan line */}
            <div className="absolute inset-x-0 top-0 h-1 bg-pulse/20 blur-sm animate-[scan_4s_linear_infinite]" />
        </div>
    );
}

/**
 * Signal Strength Meter based on form completeness
 */
function SignalMeter({ percent }: { percent: number }) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between font-mono text-[10px] text-text-3 uppercase tracking-tighter">
                <span>Signal Reliability</span>
                <span>{percent}%</span>
            </div>
            <div className="h-1 w-full bg-raised rounded-full overflow-hidden flex gap-0.5">
                {[...Array(20)].map((_, i) => (
                    <div 
                        key={i}
                        className={cn(
                            "flex-1 transition-all duration-500",
                            (i / 20) * 100 < percent 
                                ? (percent > 80 ? "bg-lime" : percent > 40 ? "bg-pulse" : "bg-pulse/40") 
                                : "bg-transparent"
                        )}
                    />
                ))}
            </div>
        </div>
    );
}

export default function ContactPage() {
    const [formData, setFormData] = useState({ email: "", subject: "", message: "" });
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
    const [completeness, setCompleteness] = useState(0);

    useEffect(() => {
        let count = 0;
        if (formData.email.includes("@")) count += 30;
        if (formData.subject.length > 5) count += 20;
        if (formData.message.length > 10) count += 50;
        setCompleteness(count);
    }, [formData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.email || !formData.message) {
            toast.error("MISSING_DATA_PACKETS");
            return;
        }

        setStatus("sending");
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setStatus("success");
                setFormData({ email: "", subject: "", message: "" });
                toast.success("TRANSMISSION_COMPLETE");
            } else {
                setStatus("error");
                toast.error("TRANSMISSION_FAILED_UPLINK_DOWN");
            }
        } catch (err) {
            setStatus("error");
            toast.error("CARRIER_SIGNAL_LOST");
        }
    };

    return (
        <div className="min-h-screen bg-void relative overflow-hidden flex flex-col items-center">
            
            {/* Background Atmosphere - Page Specific */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-pulse/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/3" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-ember/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/3" />
                
                {/* Grid Overlay */}
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] bg-repeat" />
            </div>

            {/* Main Interactive Hub */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-12 pb-32">
                
                {/* Header: Signal Status */}
                <div className="mb-20">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-3 font-mono text-[10px] text-pulse mb-8 uppercase tracking-[0.3em]"
                    >
                        <Activity size={14} className="animate-pulse" />
                        <span>Establish_Communication_Link // 00:44:22</span>
                    </motion.div>
                    
                    <h1 className="font-display text-7xl md:text-[9rem] font-black leading-[0.8] tracking-tighter uppercase mb-2">
                        Send a <br />
                        <span className="text-pulse drop-shadow-[0_0_30px_rgba(255,0,60,0.3)]">Signal.</span>
                    </h1>
                </div>

                <div className="grid lg:grid-cols-[1fr,400px] gap-12 items-start">
                    
                    {/* Left: THE CONSOLE (The Form) */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative"
                    >
                        {/* Interactive HUD Layer */}
                        <div className="absolute -inset-8 pointer-events-none border border-wire/20 rounded-[2rem] hidden xl:block">
                            <div className="absolute top-0 left-10 -translate-y-1/2 bg-ink px-4 py-1 text-[10px] font-mono text-text-3 uppercase tracking-widest border border-wire">
                                SYSTEM_NODE_01
                            </div>
                            <div className="absolute bottom-0 right-10 translate-y-1/2 bg-ink px-4 py-1 text-[10px] font-mono text-text-3 uppercase tracking-widest border border-wire">
                                SEC_PROTOCOL_V4
                            </div>
                        </div>

                        <div className="bg-ink/80 backdrop-blur-md border border-wire rounded-2xl overflow-hidden shadow-2xl relative z-10">
                            {/* Form Header */}
                            <div className="px-8 py-4 border-b border-wire flex items-center justify-between bg-surface/30">
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-pulse shadow-[0_0_8px_rgba(255,0,60,0.5)]" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-ember/30" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-lime/30" />
                                </div>
                                <div className="font-mono text-[10px] uppercase tracking-widest text-text-3">
                                    Packet_Inbound_Stream
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-10">
                                {/* Field: Sender Hash */}
                                <div className="space-y-3">
                                    <label className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-text-2">
                                        <Lock size={10} /> <span>Sender_Identifier (Email)</span>
                                    </label>
                                    <input 
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full bg-void/50 border-b border-wire px-0 py-4 font-mono text-lg focus:outline-none focus:border-pulse text-text-1 placeholder:text-text-3 transition-all"
                                        placeholder="INPUT_IDENTITY_HERE..."
                                    />
                                </div>

                                {/* Field: Directive */}
                                <div className="space-y-3">
                                    <label className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-text-2">
                                        <Zap size={10} /> <span>Signal_Subject</span>
                                    </label>
                                    <input 
                                        type="text"
                                        value={formData.subject}
                                        onChange={e => setFormData({ ...formData, subject: e.target.value })}
                                        className="w-full bg-void/50 border-b border-wire px-0 py-4 font-mono text-lg focus:outline-none focus:border-pulse text-text-1 placeholder:text-text-3 transition-all"
                                        placeholder="WHAT_IS_THE_GOAL??"
                                    />
                                </div>

                                {/* Field: Payload */}
                                <div className="space-y-3">
                                    <label className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-text-2">
                                        <Cpu size={10} /> <span>Message_Payload</span>
                                    </label>
                                    <textarea 
                                        required
                                        rows={4}
                                        value={formData.message}
                                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full bg-void/50 border-wire border p-6 rounded-lg font-mono text-sm focus:outline-none focus:border-pulse text-text-1 placeholder:text-text-3 transition-all resize-none leading-relaxed"
                                        placeholder="DESCRIBE_YOUR_VIBE_IN_DETAIL..."
                                    />
                                </div>

                                {/* Meter & Submit */}
                                <div className="space-y-8 pt-4">
                                    <SignalMeter percent={completeness} />
                                    
                                    <button 
                                        type="submit"
                                        disabled={status === "sending"}
                                        className={cn(
                                            "w-full py-6 rounded-xl font-black uppercase tracking-[0.4em] transition-all relative overflow-hidden group",
                                            status === "sending" ? "bg-raised text-text-3" : "bg-pulse text-white shadow-[0_10px_40px_rgba(255,0,60,0.3)] hover:-translate-y-1 active:translate-y-0"
                                        )}
                                    >
                                        <span className="relative z-10 flex items-center justify-center gap-3">
                                            {status === "sending" ? "TRANSMITTING..." : "BroadCast_Signal"}
                                            <Send size={18} />
                                        </span>
                                        <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>

                    {/* Right: SYSTEM METRICS & CONTACTS */}
                    <div className="space-y-8">
                        
                        {/* Module 1: Live Feed */}
                        <SignalFeed />

                        {/* Module 2: Direct Uplinks */}
                        <div className="space-y-4">
                            <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-3 flex items-center gap-2">
                                <ShieldCheck size={12} /> Direct_Uplinks
                            </h3>
                            
                            <a 
                                href="mailto:bitrusgadzama02@gmail.com"
                                className="group block bg-ink/30 border border-wire p-6 rounded-xl hover:bg-pulse/5 hover:border-pulse transition-all"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-raised rounded-lg text-text-3 group-hover:text-pulse transition-colors">
                                        <Mail size={20} />
                                    </div>
                                    <div className="font-mono text-[10px] text-lime">ONLINE</div>
                                </div>
                                <div className="font-display text-xl font-bold mb-1">Direct Email</div>
                                <div className="font-mono text-[10px] text-text-3 uppercase">EST_RESPONSE: 24_HOURS</div>
                            </a>

                            <a 
                                href={`https://instagram.com/${MUSIC_IDS.instagramHandle}`}
                                target="_blank" rel="noopener noreferrer"
                                className="group block bg-ink/30 border border-wire p-6 rounded-xl hover:bg-ember/5 hover:border-ember transition-all"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-raised rounded-lg text-text-3 group-hover:text-ember transition-colors">
                                        <MessageSquare size={20} />
                                    </div>
                                    <div className="font-mono text-[10px] text-lime">ONLINE</div>
                                </div>
                                <div className="font-display text-xl font-bold mb-1">Instagram DM</div>
                                <div className="font-mono text-[10px] text-text-3 uppercase">EST_RESPONSE: 4_HOURS</div>
                            </a>
                        </div>

                    </div>

                </div>
            </div>

            {/* Bottom Visualizer */}
            <div className="absolute bottom-0 inset-x-0 h-32 pointer-events-none opacity-20">
                <div className="absolute inset-0 bg-gradient-to-t from-pulse/20 to-transparent" />
                <svg className="w-full h-full" preserveAspectRatio="none">
                    <path 
                        d="M0,100 C150,100 350,50 500,50 C650,50 850,150 1000,150 L1000,200 L0,200 Z" 
                        fill="currentColor"
                        className="text-pulse animate-[pulse_3s_ease-in-out_infinite]"
                    />
                </svg>
            </div>

            <style jsx>{`
                @keyframes scan {
                    0% { top: 0; opacity: 0; }
                    5% { opacity: 1; }
                    95% { opacity: 1; }
                    100% { top: 100%; opacity: 0; }
                }
            `}</style>
        </div>
    );
}
