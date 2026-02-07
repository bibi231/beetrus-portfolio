"use client";

import { AdminLayout } from "@/components/admin/admin-layout";
import { motion } from "framer-motion";
import { Plus, Play, Pause, BarChart3, Upload, Music2, Disc } from "lucide-react";
import { Button } from "@/components/ui/button";

const mockTracks = [
    { id: "TRK-001", title: "At This Age (Intro)", album: "At This Age", plays: "124,592", duration: "2:45", status: "Published" },
    { id: "TRK-002", title: "System Failure", album: "Unreleased", plays: "42,102", duration: "3:12", status: "Private" },
    { id: "TRK-003", title: "Neon Nights", album: "Single", plays: "12,402", duration: "2:58", status: "Published" },
    { id: "TRK-004", title: "Code & Rythm", album: "Concept", plays: "8,921", duration: "4:01", status: "Draft" },
    { id: "TRK-005", title: "Abuja Flow", album: "Single", plays: "256,192", duration: "3:30", status: "Published" },
];

export default function AdminMusicPage() {
    return (
        <AdminLayout>
            <div className="space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-black uppercase tracking-tighter mb-1">Sonic Database</h1>
                        <p className="font-mono text-xs text-foreground-muted uppercase tracking-widest">// audio_assets_registry</p>
                    </div>
                    <Button className="bg-neon-red hover:bg-neon-red/90 text-white font-bold uppercase tracking-widest gap-2">
                        <Upload size={16} />
                        Upload_Track
                    </Button>
                </div>

                {/* Upload Zone / Quick Stats */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-[#080808] border border-white/5 rounded-2xl p-6 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-r from-neon-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                        <div className="relative z-10 flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-bold uppercase tracking-tight mb-2">Total Streams</h3>
                                <p className="text-4xl font-black text-white">458,291</p>
                            </div>
                            <div className="h-16 w-16 rounded-full bg-neon-red/10 flex items-center justify-center">
                                <BarChart3 size={32} className="text-neon-red" />
                            </div>
                        </div>
                        <div className="mt-8 h-24 flex items-end gap-1">
                            {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 50, 95].map((h, i) => (
                                <div
                                    key={i}
                                    className="flex-1 bg-white/10 hover:bg-neon-red transition-colors rounded-t-sm"
                                    style={{ height: `${h}%` }}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="bg-[#080808] border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center text-center border-dashed border-white/10 hover:border-neon-red/50 hover:bg-neon-red/5 transition-all cursor-pointer group">
                        <div className="h-16 w-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Upload size={24} className="text-white/50 group-hover:text-neon-red" />
                        </div>
                        <h3 className="font-bold text-sm uppercase tracking-widest mb-1">Drop Asset Here</h3>
                        <p className="text-[10px] font-mono text-foreground-muted">.WAV .MP3 .FLAC supported</p>
                    </div>
                </div>

                {/* Track List */}
                <div className="space-y-4">
                    <h3 className="text-xs font-black uppercase tracking-widest pl-2 border-l-2 border-neon-red">Catalogue Index</h3>
                    <div className="space-y-2">
                        {mockTracks.map((track, i) => (
                            <motion.div
                                key={track.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="bg-[#080808] border border-white/5 rounded-xl p-4 flex items-center gap-4 group hover:bg-white/[0.02] transition-all"
                            >
                                <div className="h-12 w-12 rounded bg-black border border-white/10 flex items-center justify-center relative overflow-hidden">
                                    {/* Rotating vinyl effect on hover */}
                                    <Disc size={24} className="text-white/20 group-hover:text-neon-red group-hover:animate-spin-slow transition-all duration-700" />
                                </div>

                                <div className="flex-1">
                                    <h4 className="font-bold text-sm text-white group-hover:text-neon-red transition-colors">{track.title}</h4>
                                    <div className="flex items-center gap-3">
                                        <span className="text-[10px] font-mono text-foreground-muted uppercase">{track.album}</span>
                                        <span className="text-[10px] font-mono text-white/30">•</span>
                                        <span className="text-[10px] font-mono text-foreground-muted">{track.duration}</span>
                                    </div>
                                </div>

                                <div className="hidden md:block text-right px-4">
                                    <p className="text-[10px] font-mono text-foreground-muted uppercase mb-0.5">Plays</p>
                                    <p className="font-mono text-xs font-bold">{track.plays}</p>
                                </div>

                                <div className="px-4">
                                    <span className={`inline-block px-2 py-1 rounded text-[9px] font-mono uppercase tracking-wide border ${track.status === "Published" ? "bg-green-500/10 text-green-500 border-green-500/20" :
                                            track.status === "Private" ? "bg-purple-500/10 text-purple-500 border-purple-500/20" :
                                                "bg-white/5 text-white/50 border-white/10"
                                        }`}>
                                        {track.status}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button className="h-8 w-8 rounded-full border border-white/10 flex items-center justify-center hover:border-neon-red hover:text-neon-red transition-all">
                                        <Play size={14} className="fill-current" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
