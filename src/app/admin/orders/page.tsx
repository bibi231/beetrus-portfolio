"use client";

import { AdminLayout } from "@/components/admin/admin-layout";
import { motion } from "framer-motion";
import { Search, Filter, ArrowUpRight, Clock, CheckCircle, XCircle, Truck, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

const mockOrders = [
    { id: "ORD-7782-X", customer: "Alex Mercer", items: 3, total: 145.00, status: "Processing", date: "2 mins ago", location: "Lagos, NG" },
    { id: "ORD-9921-A", customer: "Sarah Kerrigan", items: 1, total: 85.00, status: "Shipped", date: "4 hours ago", location: "London, UK" },
    { id: "ORD-3321-C", customer: "Jim Raynor", items: 2, total: 60.00, status: "Delivered", date: "1 day ago", location: "Austin, TX" },
    { id: "ORD-1102-B", customer: "Tychus Findlay", items: 5, total: 210.00, status: "Cancelled", date: "2 days ago", location: "New York, NY" },
    { id: "ORD-5543-D", customer: "Ellen Ripley", items: 1, total: 45.00, status: "Processing", date: "3 days ago", location: "Nostromo, Space" },
];

const statusStyles = {
    "Processing": "bg-blue-500/10 text-blue-400 border-blue-500/20",
    "Shipped": "bg-orange-500/10 text-orange-400 border-orange-500/20",
    "Delivered": "bg-green-500/10 text-green-400 border-green-500/20",
    "Cancelled": "bg-red-500/10 text-red-400 border-red-500/20",
};

const StatusIcon = ({ status }: { status: string }) => {
    switch (status) {
        case "Processing": return <Clock size={12} />;
        case "Shipped": return <Truck size={12} />;
        case "Delivered": return <CheckCircle size={12} />;
        case "Cancelled": return <XCircle size={12} />;
        default: return <Clock size={12} />;
    }
};

export default function AdminOrdersPage() {
    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-black uppercase tracking-tighter mb-1">Global Transaction Log</h1>
                        <p className="font-mono text-xs text-foreground-muted uppercase tracking-widest">// sales_telemetry.02</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" className="border-white/10 hover:bg-white/5 text-xs font-mono uppercase">
                            Export_Log
                        </Button>
                        <Button className="bg-white text-black hover:bg-white/90 font-bold uppercase text-xs tracking-widest">
                            Sync_Stripe
                        </Button>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex items-center gap-4 bg-[#080808] border border-white/5 p-2 rounded-lg w-full md:w-fit">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={14} />
                        <input
                            type="text"
                            placeholder="SEARCH_ORDER_ID..."
                            className="w-full bg-transparent border-none py-2 pl-9 pr-4 text-xs font-mono focus:outline-none text-white focus:ring-0"
                        />
                    </div>
                    <div className="h-4 w-px bg-white/10" />
                    <button className="px-3 py-1 hover:bg-white/5 rounded text-[10px] font-mono uppercase text-foreground-muted hover:text-white transition-all flex items-center gap-2">
                        <Filter size={12} />
                        Filter_View
                    </button>
                </div>

                {/* Orders List */}
                <div className="space-y-2">
                    {mockOrders.map((order, i) => (
                        <motion.div
                            key={order.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="bg-[#080808] border border-white/5 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group hover:border-white/10 transition-all"
                        >
                            <div className="flex items-center gap-4 min-w-[200px]">
                                <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center font-mono text-[10px] text-white/40">
                                    #{i + 1}
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm text-white group-hover:text-neon-red transition-colors">{order.id}</h3>
                                    <p className="font-mono text-[10px] text-foreground-muted uppercase">{order.date}</p>
                                </div>
                            </div>

                            <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                                <div>
                                    <p className="text-[10px] font-mono text-foreground-muted uppercase">Customer</p>
                                    <p className="text-xs font-medium text-white">{order.customer}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-mono text-foreground-muted uppercase">Location</p>
                                    <p className="text-xs font-medium text-white">{order.location}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-mono text-foreground-muted uppercase">Amount</p>
                                    <p className="text-xs font-medium text-white">${order.total.toFixed(2)}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-mono text-foreground-muted uppercase">Status</p>
                                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wide border ${statusStyles[order.status as keyof typeof statusStyles]}`}>
                                        <StatusIcon status={order.status} />
                                        {order.status}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                                <button className="p-2 hover:bg-white/10 rounded-lg text-white/60 hover:text-white transition-colors">
                                    <MoreHorizontal size={16} />
                                </button>
                                <button className="p-2 hover:bg-white/10 rounded-lg text-white/60 hover:text-neon-red transition-colors">
                                    <ArrowUpRight size={16} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
}
