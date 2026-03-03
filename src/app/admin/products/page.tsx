"use client";

import { AdminLayout } from "@/components/admin/admin-layout";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Filter, Edit, Trash, Eye, ShoppingBag, Loader2, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Product {
    id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    images: string;
    category: string;
    stock: number;
    status: string;
}

export default function AdminProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    // Edit State
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const fetchProducts = async () => {
        try {
            const res = await fetch("/api/admin/products");
            if (!res.ok) throw new Error("FETCH_FAILED");
            const data = await res.json();
            setProducts(data);
        } catch (error) {
            console.error(error);
            toast.error("PROTOCOL_ERROR: DATA_FETCH_FAILED");
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateStock = async (id: string, newStock: number) => {
        try {
            const res = await fetch(`/api/admin/products/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ stock: newStock }),
            });
            if (!res.ok) throw new Error("UPDATE_FAILED");
            toast.success("STOCK_SYNC_SUCCESSFUL");
            fetchProducts();
        } catch (error) {
            console.error(error);
            toast.error("STOCK_SYNC_ERROR");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("CONFIRM_DATA_PURGE: DELETE_PRODUCT?")) return;
        try {
            const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("DELETE_FAILED");
            toast.success("ITEM_PURGED_FROM_REGISTRY");
            fetchProducts();
        } catch (error) {
            console.error(error);
            toast.error("PURGE_PROTOCOL_FAILED");
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header Actions */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-black uppercase tracking-tighter mb-1">Inventory Management</h1>
                        <p className="font-mono text-xs text-foreground-muted uppercase tracking-widest">// database_write_access: granted</p>
                    </div>
                    <Button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="bg-neon-red hover:bg-neon-red/90 text-white font-bold uppercase tracking-widest gap-2"
                    >
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
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/5 border border-white/5 rounded-lg py-2 pl-10 pr-4 text-xs font-mono focus:outline-none focus:border-neon-red/30 transition-all text-white"
                        />
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
                                    <th className="p-4 font-mono text-[10px] uppercase tracking-widest text-foreground-muted text-center">Stock_Level</th>
                                    <th className="p-4 font-mono text-[10px] uppercase tracking-widest text-foreground-muted text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {isLoading ? (
                                    <tr>
                                        <td colSpan={5} className="p-12 text-center font-mono text-xs text-neon-red animate-pulse">
                                            SCANNING_REGISTRY...
                                        </td>
                                    </tr>
                                ) : filteredProducts.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="p-12 text-center font-mono text-xs text-neutral-600">
                                            NO_ENTRIES_FOUND
                                        </td>
                                    </tr>
                                ) : (
                                    filteredProducts.map((product, i) => (
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
                                                        <p className="font-mono text-[10px] text-foreground-muted">{product.slug.toUpperCase()}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4 font-mono text-xs text-white/70">{product.category}</td>
                                            <td className="p-4 font-mono text-xs font-bold">${product.price.toFixed(2)}</td>
                                            <td className="p-4 font-mono text-xs">
                                                <div className="flex items-center justify-center gap-4">
                                                    <button
                                                        onClick={() => handleUpdateStock(product.id, Math.max(0, product.stock - 1))}
                                                        className="h-6 w-6 border border-white/10 rounded flex items-center justify-center hover:bg-white/5"
                                                    >-</button>
                                                    <span className={cn(
                                                        "w-12 text-center font-black",
                                                        product.stock === 0 ? "text-neon-red shadow-glow-red" : "text-white"
                                                    )}>{product.stock}</span>
                                                    <button
                                                        onClick={() => handleUpdateStock(product.id, product.stock + 1)}
                                                        className="h-6 w-6 border border-white/10 rounded flex items-center justify-center hover:bg-white/5"
                                                    >+</button>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => handleDelete(product.id)}
                                                        className="p-2 hover:bg-red-500/10 rounded-lg text-white/40 hover:text-red-500 transition-colors"
                                                    >
                                                        <Trash size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Simple Create Modal (Overlay) */}
            <AnimatePresence>
                {isCreateModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            className="bg-[#080808] border border-white/10 rounded-3xl p-8 max-w-lg w-full shadow-2xl"
                        >
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-2xl font-black uppercase tracking-tight">Register_New_Item</h2>
                                <button onClick={() => setIsCreateModalOpen(false)}><X size={20} /></button>
                            </div>

                            <form className="space-y-4" onSubmit={async (e) => {
                                e.preventDefault();
                                setIsSaving(true);
                                const formData = new FormData(e.currentTarget);
                                const data = Object.fromEntries(formData.entries());
                                try {
                                    const res = await fetch("/api/admin/products", {
                                        method: "POST",
                                        headers: { "Content-Type": "application/json" },
                                        body: JSON.stringify(data),
                                    });
                                    if (!res.ok) throw new Error("CREATE_FAILED");
                                    toast.success("OBJECT_REGISTERED_TO_GRID");
                                    setIsCreateModalOpen(false);
                                    fetchProducts();
                                } catch (error) {
                                    toast.error("REGISTRATION_PROTOCOL_ERROR");
                                } finally {
                                    setIsSaving(false);
                                }
                            }}>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-2 space-y-1">
                                        <label className="text-[10px] font-mono text-neutral-500 uppercase">Name</label>
                                        <input name="name" required className="w-full bg-white/5 border border-white/5 rounded-lg p-3 text-sm font-mono focus:border-neon-red/50 focus:outline-none" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-mono text-neutral-500 uppercase">Slug_SKU</label>
                                        <input name="slug" required className="w-full bg-white/5 border border-white/5 rounded-lg p-3 text-sm font-mono focus:border-neon-red/50 focus:outline-none" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-mono text-neutral-500 uppercase">Category</label>
                                        <input name="category" required className="w-full bg-white/5 border border-white/5 rounded-lg p-3 text-sm font-mono focus:border-neon-red/50 focus:outline-none" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-mono text-neutral-500 uppercase">Price_USD</label>
                                        <input name="price" type="number" step="0.01" required className="w-full bg-white/5 border border-white/5 rounded-lg p-3 text-sm font-mono focus:border-neon-red/50 focus:outline-none" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-mono text-neutral-500 uppercase">Initial_Stock</label>
                                        <input name="stock" type="number" required className="w-full bg-white/5 border border-white/5 rounded-lg p-3 text-sm font-mono focus:border-neon-red/50 focus:outline-none" />
                                    </div>
                                    <div className="col-span-2 space-y-1">
                                        <label className="text-[10px] font-mono text-neutral-500 uppercase">Description</label>
                                        <textarea name="description" required rows={3} className="w-full bg-white/5 border border-white/5 rounded-lg p-3 text-sm font-mono focus:border-neon-red/50 focus:outline-none resize-none" />
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isSaving}
                                    className="w-full mt-6 bg-neon-red h-14 font-black uppercase tracking-widest gap-2"
                                >
                                    {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                                    Commit_to_Database
                                </Button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </AdminLayout>
    );
}
