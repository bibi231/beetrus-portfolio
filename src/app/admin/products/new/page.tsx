"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    Save,
    Package,
    Image as ImageIcon,
    Type,
    Hash,
    Tag,
    Layers,
    Activity,
    Code,
    X,
    Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { createProduct } from "./actions";
import { toast } from "sonner";
import Link from "next/link";

export default function NewProductPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        description: "",
        price: 0,
        category: "Apparel",
        stock: 0,
        status: "AVAILABLE" as const,
        images: "", // Comma separated URLs
        metadata: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const result = await createProduct({
                ...formData,
                price: Number(formData.price),
                stock: Number(formData.stock),
            });

            if (result.success) {
                toast.success("Entity Registered: System inventory updated");
                router.push("/admin/products");
            } else {
                toast.error(result.error || "System Error: Failed to register entity");
            }
        } catch (error) {
            toast.error("Critical System Failure: Encryption error");
        } finally {
            setIsLoading(false);
        }
    };

    const handleNameChange = (name: string) => {
        const slug = name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
        setFormData({ ...formData, name, slug });
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/admin/products">
                        <Button variant="outline" size="icon" className="h-10 w-10 border-white/5 bg-background-elevated hover:bg-white/5">
                            <ArrowLeft size={18} />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-black tracking-tight uppercase mb-1">
                            New <span className="gradient-text">Entity</span>
                        </h1>
                        <p className="text-foreground-muted text-xs font-mono uppercase tracking-widest">
                            inventory.register() // type: product
                        </p>
                    </div>
                </div>
                <Button
                    onClick={handleSubmit}
                    className="bg-neon-red hover:bg-neon-red/90 text-white font-bold h-12 px-6 rounded-xl shadow-glow-red flex items-center gap-2"
                    disabled={isLoading}
                >
                    <Save size={18} />
                    {isLoading ? "EXEC_PUSH..." : "SAVE_TO_GRID"}
                </Button>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
                {/* Left Column: Basic Info */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="p-8 rounded-2xl border border-white/5 bg-background-elevated space-y-6">
                        <div className="flex items-center gap-3 mb-2">
                            <Type size={18} className="text-neon-red" />
                            <h3 className="font-bold uppercase tracking-widest text-sm font-mono">Core_Description</h3>
                        </div>

                        {/* Name */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-foreground-muted ml-1">Entity_Name</label>
                            <input
                                type="text"
                                required
                                className="w-full bg-black border border-white/5 rounded-xl py-4 px-4 text-white placeholder:text-foreground-muted/30 focus:outline-none focus:border-neon-red/30 transition-all"
                                placeholder="BEETRUS LOGO TEE"
                                value={formData.name}
                                onChange={(e) => handleNameChange(e.target.value)}
                            />
                        </div>

                        {/* Slug */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-foreground-muted ml-1">System_Slug (Auto-Generated)</label>
                            <input
                                type="text"
                                required
                                readOnly
                                className="w-full bg-black/40 border border-white/5 rounded-xl py-4 px-4 text-foreground-muted font-mono text-sm cursor-not-allowed"
                                value={formData.slug}
                            />
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-foreground-muted ml-1">Narrative_Data</label>
                            <textarea
                                required
                                rows={5}
                                className="w-full bg-black border border-white/5 rounded-xl py-4 px-4 text-white placeholder:text-foreground-muted/30 focus:outline-none focus:border-neon-red/30 transition-all resize-none"
                                placeholder="Describe the entity specs..."
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Image Management */}
                    <div className="p-8 rounded-2xl border border-white/5 bg-background-elevated space-y-6">
                        <div className="flex items-center gap-3 mb-2">
                            <ImageIcon size={18} className="text-neon-red" />
                            <h3 className="font-bold uppercase tracking-widest text-sm font-mono">Visual_Uplink</h3>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-foreground-muted ml-1">Image_URLs (Separate by comma)</label>
                            <input
                                type="text"
                                className="w-full bg-black border border-white/5 rounded-xl py-4 px-4 text-white placeholder:text-foreground-muted/30 focus:outline-none focus:border-neon-red/30 transition-all font-mono text-sm"
                                placeholder="https://cdn.beetrus.com/merch/image.jpg"
                                value={formData.images}
                                onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                            />
                        </div>

                        <div className="grid grid-cols-4 gap-4 pt-4">
                            <div className="aspect-square rounded-xl border border-dashed border-white/10 flex flex-col items-center justify-center gap-2 group hover:border-neon-red/30 cursor-pointer transition-all">
                                <Plus size={24} className="text-foreground-muted group-hover:text-neon-red" />
                                <span className="text-[10px] font-mono uppercase text-foreground-muted group-hover:text-white">Uplink</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Registry Details */}
                <div className="space-y-6">
                    <div className="p-8 rounded-2xl border border-white/5 bg-background-elevated space-y-6">
                        <div className="flex items-center gap-3 mb-2">
                            <Hash size={18} className="text-neon-red" />
                            <h3 className="font-bold uppercase tracking-widest text-sm font-mono">Registry_Data</h3>
                        </div>

                        {/* Price */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-foreground-muted ml-1">Execution_Cost ($)</label>
                            <input
                                type="number"
                                required
                                className="w-full bg-black border border-white/5 rounded-xl py-4 px-4 text-white placeholder:text-foreground-muted/30 focus:outline-none focus:border-neon-red/30 transition-all font-mono"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                            />
                        </div>

                        {/* Stock */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-foreground-muted ml-1">Infinite_Stock_Count</label>
                            <input
                                type="number"
                                required
                                className="w-full bg-black border border-white/5 rounded-xl py-4 px-4 text-white placeholder:text-foreground-muted/30 focus:outline-none focus:border-neon-red/30 transition-all font-mono"
                                value={formData.stock}
                                onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                            />
                        </div>

                        {/* Category */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-foreground-muted ml-1">System_Class</label>
                            <select
                                className="w-full bg-black border border-white/5 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-neon-red/30 transition-all appearance-none cursor-pointer"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            >
                                <option value="Apparel">Apparel</option>
                                <option value="Accessories">Accessories</option>
                                <option value="Music">Music</option>
                                <option value="Collectibles">Collectibles</option>
                            </select>
                        </div>

                        {/* Status */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-foreground-muted ml-1">Grid_Status</label>
                            <select
                                className="w-full bg-black border border-white/5 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-neon-red/30 transition-all appearance-none cursor-pointer"
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                            >
                                <option value="AVAILABLE">ONLINE</option>
                                <option value="OUT_OF_STOCK">OFFLINE (OUT_OF_STOCK)</option>
                                <option value="HIDDEN">HIDDEN</option>
                            </select>
                        </div>
                    </div>

                    <div className="p-8 rounded-2xl border border-white/5 bg-background-elevated space-y-6">
                        <div className="flex items-center gap-3 mb-2">
                            <Code size={18} className="text-neon-red" />
                            <h3 className="font-bold uppercase tracking-widest text-sm font-mono">System_Metadata</h3>
                        </div>

                        <p className="text-[10px] text-foreground-muted font-mono leading-relaxed uppercase tracking-tighter">
                            Enter any specific system metadata for this entity (JSON formatted).
                            Used for high-fidelity rendering on the store page.
                        </p>

                        <textarea
                            rows={3}
                            className="w-full bg-black border border-white/5 rounded-xl py-4 px-4 text-white font-mono text-xs placeholder:text-foreground-muted/30 focus:outline-none focus:border-neon-red/30 transition-all resize-none"
                            placeholder='{"firmware": "v1.0", "system_id": "BT-X"}'
                            value={formData.metadata}
                            onChange={(e) => setFormData({ ...formData, metadata: e.target.value })}
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}
