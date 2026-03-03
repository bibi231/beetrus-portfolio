"use client";

import { AdminLayout } from "@/components/admin/admin-layout";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Users,
    ShoppingBag,
    Music2,
    ArrowUpRight,
    TrendingUp,
    Activity,
    Database,
    Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminDashboard() {
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch("/api/admin/stats");
                if (!res.ok) throw new Error("FETCH_FAILED");
                const result = await res.json();
                setData(result);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchStats();
    }, []);

    const stats = data?.stats || {
        totalOrders: 0,
        activeLeads: 0,
        totalProducts: 0,
        totalRevenue: 0
    };

    const dashboardStats = [
        { label: "Active Project Leads", value: stats.activeLeads, icon: Users, trend: "Live", color: "text-neon-red" },
        { label: "Total Orders", value: stats.totalOrders, icon: ShoppingBag, trend: "Capture", color: "text-cyan-400" },
        { label: "Inventory SKUs", value: stats.totalProducts, icon: Database, trend: "Sync", color: "text-purple-500" },
        { label: "Gross Revenue", value: `$${stats.totalRevenue.toFixed(2)}`, icon: TrendingUp, trend: "Est.", color: "text-green-500" },
    ];

    return (
        <AdminLayout>
            <div className="space-y-8">
                {/* Header Section */}
                <div>
                    <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">System Overview</h1>
                    <p className="font-mono text-xs text-foreground-muted uppercase tracking-[0.2em]">// telemetry_capture.01</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {dashboardStats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-[#080808] border border-white/5 p-6 rounded-2xl relative overflow-hidden group hover:border-neon-red/30 transition-all duration-500"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-[0.05] group-hover:opacity-10 transition-opacity">
                                <stat.icon size={64} />
                            </div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className={cn("p-2 rounded-lg bg-white/[0.02]", stat.color)}>
                                    <stat.icon size={18} />
                                </div>
                                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-foreground-muted">{stat.label}</span>
                            </div>
                            <div className="flex items-end justify-between">
                                <h3 className="text-3xl font-black tabular-nums">{isLoading ? "..." : stat.value}</h3>
                                <div className="flex items-center gap-1 text-[10px] font-mono text-green-500 pb-1">
                                    <span>{stat.trend}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Secondary Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Activity Feed */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-[#080808] border border-white/5 rounded-2xl overflow-hidden">
                            <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
                                <span className="text-xs font-black uppercase tracking-widest">Global Activity</span>
                                <button className="text-[10px] font-mono text-neon-red hover:underline">ACCESS_LOGS</button>
                            </div>
                            <div className="p-6 space-y-6">
                                {isLoading ? (
                                    <div className="text-center font-mono text-xs text-neon-red animate-pulse py-12">DECRYPTING_ACTIVITY_LOGS...</div>
                                ) : (data?.recentLeads || []).length === 0 ? (
                                    <div className="text-center font-mono text-xs text-neutral-600 py-12">NO_RECENT_COMMUNICATIONS</div>
                                ) : (data.recentLeads).map((activity: any, i: number) => (
                                    <div key={activity.id} className="flex items-center gap-4 group">
                                        <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center font-mono text-[10px] text-white/40 group-hover:text-neon-red transition-all">
                                            0{i + 1}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-bold uppercase tracking-tight">{activity.title}</p>
                                            <p className="text-[10px] font-mono text-foreground-muted">{activity.description}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] font-mono text-white/60">
                                                {new Date(activity.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Quick Controls */}
                    <div className="space-y-6">
                        <div className="bg-[#080808] border border-white/5 rounded-2xl p-6">
                            <h4 className="text-xs font-black uppercase tracking-widest mb-6">Quick Directives</h4>
                            <div className="space-y-3">
                                <button className="w-full bg-neon-red py-3 rounded-lg font-black text-xs uppercase tracking-[0.2em] hover:shadow-glow-red transition-all">Emergency_Kill</button>
                                <button className="w-full bg-white/5 border border-white/5 py-3 rounded-lg font-black text-xs uppercase tracking-[0.2em] hover:bg-white/10 transition-all">System_Purge</button>
                                <button className="w-full bg-white/5 border border-white/5 py-3 rounded-lg font-black text-xs uppercase tracking-[0.2em] hover:bg-white/10 transition-all">Sync_Database</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
