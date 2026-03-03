"use client";

import { AdminLayout } from "@/components/admin/admin-layout";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Filter, ArrowUpRight, Clock, CheckCircle, XCircle, Truck, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const statusStyles = {
    "PENDING": "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    "PROCESSING": "bg-blue-500/10 text-blue-400 border-blue-500/20",
    "SHIPPED": "bg-orange-500/10 text-orange-400 border-orange-500/20",
    "DELIVERED": "bg-green-500/10 text-green-400 border-green-500/20",
    "CANCELLED": "bg-red-500/10 text-red-400 border-red-500/20",
};

const StatusIcon = ({ status }: { status: string }) => {
    switch (status) {
        case "PENDING": return <Clock size={12} />;
        case "PROCESSING": return <Clock size={12} />;
        case "SHIPPED": return <Truck size={12} />;
        case "DELIVERED": return <CheckCircle size={12} />;
        case "CANCELLED": return <XCircle size={12} />;
        default: return <Clock size={12} />;
    }
};

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchOrders = async () => {
        try {
            const res = await fetch("/api/admin/orders");
            if (!res.ok) throw new Error("FETCH_FAILED");
            const data = await res.json();
            setOrders(data);
        } catch (error) {
            console.error(error);
            toast.error("PROTOCOL_ERROR: ORDER_FETCH_FAILED");
        } finally {
            setIsLoading(false);
        }
    };

    const updateStatus = async (id: string, status: string) => {
        try {
            const res = await fetch("/api/admin/orders", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, status }),
            });
            if (!res.ok) throw new Error("UPDATE_FAILED");
            toast.success(`STATUS_UPDATED: ${status}`);
            fetchOrders();
        } catch (error) {
            console.error(error);
            toast.error("UPDATE_PROTOCOL_ERROR");
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const filteredOrders = orders.filter(order =>
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-black uppercase tracking-tighter mb-1">Global Transaction Log</h1>
                        <p className="font-mono text-xs text-foreground-muted uppercase tracking-widest">// sales_telemetry.02</p>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex items-center gap-4 bg-[#080808] border border-white/5 p-2 rounded-lg w-full md:w-fit">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={14} />
                        <input
                            type="text"
                            placeholder="SEARCH_ORDER_ID..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-transparent border-none py-2 pl-9 pr-4 text-xs font-mono focus:outline-none text-white focus:ring-0"
                        />
                    </div>
                </div>

                {/* Orders List */}
                <div className="space-y-2">
                    {isLoading ? (
                        <div className="text-center font-mono text-xs text-neon-red animate-pulse py-20">DECRYPTING_TRANSACTION_HISTORY...</div>
                    ) : filteredOrders.length === 0 ? (
                        <div className="text-center font-mono text-xs text-neutral-600 py-20">NO_TRANSACTIONS_RECORDED</div>
                    ) : filteredOrders.map((order, i) => (
                        <motion.div
                            key={order.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="bg-[#080808] border border-white/5 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group hover:border-white/10 transition-all"
                        >
                            <div className="flex items-center gap-4 min-w-[200px]">
                                <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center font-mono text-[10px] text-white/40 group-hover:text-neon-red transition-all">
                                    #{i + 1}
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm text-white group-hover:text-neon-red transition-colors">{order.id.split('-').pop()}</h3>
                                    <p className="font-mono text-[10px] text-foreground-muted uppercase">
                                        {new Date(order.createdAt).toLocaleDateString()} // {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </div>
                            </div>

                            <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                                <div>
                                    <p className="text-[10px] font-mono text-foreground-muted uppercase">Customer</p>
                                    <p className="text-xs font-medium text-white truncate max-w-[120px]">{order.customerName}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-mono text-foreground-muted uppercase">Email</p>
                                    <p className="text-xs font-medium text-white/60 truncate max-w-[150px]">{order.customerEmail}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-mono text-foreground-muted uppercase">Amount</p>
                                    <p className="text-xs font-medium text-white font-mono font-black">${order.totalAmount.toFixed(2)}</p>
                                </div>
                                <div className="relative group/status">
                                    <p className="text-[10px] font-mono text-foreground-muted uppercase">Status</p>
                                    <select
                                        value={order.status}
                                        onChange={(e) => updateStatus(order.id, e.target.value)}
                                        className={cn(
                                            "mt-1 bg-transparent border-none p-0 text-[10px] font-mono font-black uppercase tracking-tight focus:ring-0 cursor-pointer hover:text-white transition-colors",
                                            statusStyles[order.status as keyof typeof statusStyles] || "text-white"
                                        )}
                                    >
                                        <option value="PENDING" className="bg-black text-white">Pending</option>
                                        <option value="PROCESSING" className="bg-black text-white">Processing</option>
                                        <option value="SHIPPED" className="bg-black text-white">Shipped</option>
                                        <option value="DELIVERED" className="bg-black text-white">Delivered</option>
                                        <option value="CANCELLED" className="bg-black text-white">Cancelled</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <button className="p-2 hover:bg-white/10 rounded-lg text-white/40 hover:text-white transition-colors">
                                    <MoreHorizontal size={16} />
                                </button>
                                <button className="p-2 hover:bg-white/10 rounded-lg text-white/40 hover:text-neon-red transition-colors">
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
