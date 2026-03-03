"use client";

import { AdminLayout } from "@/components/admin/admin-layout";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Users,
    Mail,
    Globe,
    Clock,
    MoreHorizontal,
    CheckCircle,
    Archive,
    ExternalLink,
    Search,
    Filter,
    ArrowUpRight
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Lead {
    id: string;
    name: string;
    email: string;
    projectType: string;
    budget: string;
    description: string;
    referenceUrls?: string;
    features: string;
    selectedStyle?: string;
    status: string;
    createdAt: string;
}

export default function LeadsPage() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchLeads = async () => {
        try {
            const res = await fetch("/api/admin/leads");
            if (!res.ok) throw new Error("FAILED_TO_FETCH_LEADS");
            const data = await res.json();
            setLeads(data);
        } catch (error) {
            console.error(error);
            toast.error("PROTOCOL_ERROR: DATA_FETCH_FAILED");
        } finally {
            setIsLoading(false);
        }
    };

    const updateStatus = async (id: string, status: string) => {
        try {
            const res = await fetch("/api/admin/leads", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, status }),
            });
            if (!res.ok) throw new Error("UPDATE_FAILED");
            toast.success(`STATUS_UPDATED: ${status}`);
            fetchLeads();
        } catch (error) {
            console.error(error);
            toast.error("UPDATE_PROTOCOL_ERROR");
        }
    };

    useEffect(() => {
        fetchLeads();
    }, []);

    const filteredLeads = leads.filter(lead =>
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.projectType.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-black uppercase tracking-tighter mb-1">Service Intake Archive</h1>
                        <p className="font-mono text-xs text-foreground-muted uppercase tracking-widest">// project_briefs.03</p>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-[#080808] border border-white/5 p-4 rounded-xl flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                        <input
                            type="text"
                            placeholder="SEARCH_BY_NAME_OR_EMAIL..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/5 border border-white/5 rounded-lg py-2 pl-10 pr-4 text-xs font-mono focus:outline-none focus:border-neon-red/30 transition-all text-white"
                        />
                    </div>
                </div>

                {/* Leads List */}
                <div className="space-y-4">
                    {isLoading ? (
                        <div className="flex items-center justify-center p-20 font-mono text-xs text-neon-red animate-pulse">
                            CALCULATING_TRAJECTORIES...
                        </div>
                    ) : filteredLeads.length === 0 ? (
                        <div className="flex items-center justify-center p-20 font-mono text-xs text-neutral-600">
                            NO_DATA_RECOVERED
                        </div>
                    ) : (
                        filteredLeads.map((lead, i) => (
                            <motion.div
                                key={lead.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="bg-[#080808] border border-white/5 rounded-xl p-6 group hover:border-neon-red/30 transition-all duration-500"
                            >
                                <div className="grid md:grid-cols-4 gap-6">
                                    <div className="md:col-span-1 border-r border-white/5 pr-6">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center text-neon-red">
                                                <Users size={16} />
                                            </div>
                                            <h3 className="font-black uppercase text-sm tracking-tight truncate">{lead.name}</h3>
                                        </div>
                                        <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-500 mb-4 truncate">
                                            <Mail size={10} />
                                            {lead.email}
                                        </div>
                                        <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-neutral-600">
                                            <Clock size={10} />
                                            {new Date(lead.createdAt).toLocaleDateString()} // {new Date(lead.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </div>

                                    <div className="md:col-span-2 space-y-4">
                                        <div className="flex flex-wrap gap-2">
                                            <span className="px-2 py-0.5 bg-neon-red/10 border border-neon-red/20 rounded text-[9px] font-mono font-black text-neon-red uppercase">
                                                {lead.projectType}
                                            </span>
                                            <span className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[9px] font-mono font-black text-white/50 uppercase">
                                                BUDGET: {lead.budget}
                                            </span>
                                            {lead.selectedStyle && (
                                                <span className="px-2 py-0.5 bg-purple-500/10 border border-purple-500/20 rounded text-[9px] font-mono font-black text-purple-400 uppercase">
                                                    STYLE: {lead.selectedStyle}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-xs text-neutral-400 leading-relaxed italic">
                                            &quot;{lead.description}&quot;
                                        </p>
                                        <div className="flex flex-wrap gap-2 pt-2">
                                            {JSON.parse(lead.features).map((f: string) => (
                                                <span key={f} className="text-[9px] font-mono text-neutral-600 border-l border-neon-red/20 pl-2">
                                                    {f.toUpperCase()}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="md:col-span-1 flex flex-col justify-between items-end">
                                        <div className="flex items-center gap-2">
                                            <span className={cn(
                                                "px-2 py-0.5 rounded text-[9px] font-mono font-black uppercase border",
                                                lead.status === "NEW" ? "bg-neon-red/10 text-neon-red border-neon-red/20" :
                                                    lead.status === "CONTACTED" ? "bg-blue-500/10 text-blue-400 border-blue-500/20" :
                                                        "bg-neutral-800 text-neutral-500 border-neutral-700"
                                            )}>
                                                {lead.status}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            {lead.status === "NEW" && (
                                                <button
                                                    onClick={() => updateStatus(lead.id, "CONTACTED")}
                                                    className="p-2 bg-white/5 hover:bg-neon-red/20 rounded-lg text-white/40 hover:text-neon-red transition-all"
                                                    title="Mark as Contacted"
                                                >
                                                    <CheckCircle size={16} />
                                                </button>
                                            )}
                                            <button
                                                onClick={() => updateStatus(lead.id, "ARCHIVED")}
                                                className="p-2 bg-white/5 hover:bg-neutral-800 rounded-lg text-white/40 hover:text-white transition-all"
                                                title="Archive"
                                            >
                                                <Archive size={16} />
                                            </button>
                                            {lead.referenceUrls && (
                                                <a
                                                    href={lead.referenceUrls}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-white/40 hover:text-white transition-all"
                                                >
                                                    <ExternalLink size={16} />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
