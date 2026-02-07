"use client";

import { AdminLayout } from "@/components/admin/admin-layout";
import { motion } from "framer-motion";
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash, Eye, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

const mockProducts = [
    { id: "PROD-001", name: "Corteiz Rules The World Tee", category: "Apparel", price: 45.00, stock: 124, status: "In Stock", image: "/images/store/tee-black.jpg" },
    { id: "PROD-002", name: "Beetrus 'System' Hoodie", category: "Apparel", price: 85.00, stock: 42, status: "Low Stock", image: "/images/store/hoodie-red.jpg" },
    { id: "PROD-003", name: "Sonic Architecture Vinyl", category: "Music", price: 35.00, stock: 0, status: "Out of Stock", image: "/images/store/vinyl.jpg" },
    { id: "PROD-004", name: "Digital Stem Pack_01", category: "Digital", price: 25.00, stock: 999, status: "Active", image: "/images/store/digital.jpg" },
    { id: "PROD-005", name: "Tour Poster 2025", category: "Merch", price: 15.00, stock: 200, status: "In Stock", image: "/images/store/poster.jpg" },
];

export default function AdminProductsPage() {
    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header Actions */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-black uppercase tracking-tighter mb-1">Inventory Management</h1>
                        <p className="font-mono text-xs text-foreground-muted uppercase tracking-widest">// database_write_access: granted</p>
                    </div>
                    <Button className="bg-neon-red hover:bg-neon-red/90 text-white font-bold uppercase tracking-widest gap-2">
                        <Plus size={16} />
                        New_Item
                    </Button>
                </div>

                {/* Filters & Search */}
                <div className="bg-[#080808] border border-white/5 p-4 rounded-xl flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                        <input
                            type="text"
                            placeholder="SEARCH_SKU_OR_NAME..."
                            className="w-full bg-white/5 border border-white/5 rounded-lg py-2 pl-10 pr-4 text-xs font-mono focus:outline-none focus:border-neon-red/30 transition-all text-white"
                        />
                    </div>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 bg-white/5 border border-white/5 rounded-lg text-xs font-mono uppercase hover:bg-white/10 flex items-center gap-2 transition-all">
                            <Filter size={14} />
                            Filter
                        </button>
                        <button className="px-4 py-2 bg-white/5 border border-white/5 rounded-lg text-xs font-mono uppercase hover:bg-white/10 transition-all">
                            Export.csv
                        </button>
                    </div>
                </div>

                {/* Products Table */}
                <div className="bg-[#080808] border border-white/5 rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-white/[0.02] border-b border-white/5">
                                <tr>
                                    <th className="p-4 font-mono text-[10px] uppercase tracking-widest text-foreground-muted">Item_Details</th>
                                    <th className="p-4 font-mono text-[10px] uppercase tracking-widest text-foreground-muted">Category</th>
                                    <th className="p-4 font-mono text-[10px] uppercase tracking-widest text-foreground-muted">Price</th>
                                    <th className="p-4 font-mono text-[10px] uppercase tracking-widest text-foreground-muted">Stock_Level</th>
                                    <th className="p-4 font-mono text-[10px] uppercase tracking-widest text-foreground-muted">Status</th>
                                    <th className="p-4 font-mono text-[10px] uppercase tracking-widest text-foreground-muted text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {mockProducts.map((product, i) => (
                                    <motion.tr
                                        key={product.id}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="group hover:bg-white/[0.02] transition-colors"
                                    >
                                        <td className="p-4">
                                            <div className="flex items-center gap-4">
                                                <div className="h-10 w-10 rounded bg-white/5 border border-white/10 flex items-center justify-center">
                                                    <ShoppingBag size={16} className="text-white/20" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-sm text-white group-hover:text-neon-red transition-colors">{product.name}</p>
                                                    <p className="font-mono text-[10px] text-foreground-muted">{product.id}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 font-mono text-xs text-white/70">{product.category}</td>
                                        <td className="p-4 font-mono text-xs font-bold">${product.price.toFixed(2)}</td>
                                        <td className="p-4 font-mono text-xs">
                                            <div className="flex items-center gap-2">
                                                <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full ${product.stock < 50 ? 'bg-orange-500' : 'bg-green-500'} ${product.stock === 0 ? 'bg-red-500' : ''}`}
                                                        style={{ width: `${Math.min((product.stock / 200) * 100, 100)}%` }}
                                                    />
                                                </div>
                                                <span className="text-white/50">{product.stock}</span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className={`inline-flex items-center px-2 py-1 rounded text-[10px] font-mono font-bold uppercase tracking-wide border ${product.status === "In Stock" ? "bg-green-500/10 text-green-500 border-green-500/20" :
                                                    product.status === "Low Stock" ? "bg-orange-500/10 text-orange-500 border-orange-500/20" :
                                                        product.status === "Out of Stock" ? "bg-red-500/10 text-red-500 border-red-500/20" :
                                                            "bg-blue-500/10 text-blue-500 border-blue-500/20"
                                                }`}>
                                                {product.status}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-2 hover:bg-white/10 rounded-lg text-white/60 hover:text-white transition-colors">
                                                    <Eye size={16} />
                                                </button>
                                                <button className="p-2 hover:bg-white/10 rounded-lg text-white/60 hover:text-white transition-colors">
                                                    <Edit size={16} />
                                                </button>
                                                <button className="p-2 hover:bg-red-500/10 rounded-lg text-white/60 hover:text-red-500 transition-colors">
                                                    <Trash size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
