"use client";

import { useCart } from "@/context/cart-context";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, X, Ticket, Terminal, ArrowUpRight, Box, ShieldCheck, Truck, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const products = [
    {
        id: "DROP_26_001",
        name: "GOJO_ULTRA_HOODIE",
        price: 120,
        description: "500GSM HEAVYWEIGHT COTTON. FEATURES THE 'GOJO' (2026) COLLAB COVER ART. ARCHIVAL QUALITY SCREEN PRINT.",
        category: "01_APPAREL",
        sizes: ["S", "M", "L", "XL"],
        status: "SOLD_OUT",
        stock: 0,
        image: "/images/store/gojo-hoodie.jpg",
        color: "PHANTOM_BLACK",
        details: ["Pre-shrunk organic cotton", "Ribbed cuffs and hem", "Limited to 100 units"]
    },
    {
        id: "DROP_25_002",
        name: "LIGHTS_NEON_TEE",
        price: 55,
        description: "OVERSIZED LUXURY FIT. FEATURING THE 'LIGHTS' (2025) CINEMATIC ARTWORK. NEON RED ACCENT STITCHING.",
        category: "01_APPAREL",
        sizes: ["S", "M", "L", "XL"],
        status: "SOLD_OUT",
        stock: 0,
        image: "/images/store/lights-tee.jpg",
        color: "OBSIDIAN",
        details: ["Heavyweight jersey", "Screen printed artwork", "Relaxed fit"]
    },
    {
        id: "DROP_25_003",
        name: "BLUETOOTH_TECH_CAP",
        price: 45,
        description: "5-PANEL TECH NYLON. EMBROIDERED 'BLUETOOTH' LOGISTICS SYMBOL. ADJUSTABLE PARACORD.",
        category: "03_ACCESSORIES",
        status: "SOLD_OUT",
        stock: 0,
        image: "/images/store/bluetooth-cap.jpg",
        color: "CYBER_RED",
        details: ["Water-resistant nylon", "Custom embroidery", "Adjustable strap"]
    },
    {
        id: "DROP_20_004",
        name: "AFRO_STATE_VINYL",
        price: 85,
        description: "LIMITED EDITION 12\" TRANSPARENT RED VINYL. INCLUDES TRACKS 'DO ME' & 'YOUR LOVIN'. SIGNED BY BEETRUS.",
        category: "02_OBJECTS",
        status: "SOLD_OUT",
        stock: 0,
        image: "/images/store/vinyl-red.jpg",
        color: "CRIMSON",
        details: ["180g heavyweight vinyl", "Gatefold sleeve", "Exclusive liner notes"]
    },
    {
        id: "DROP_24_005",
        name: "KINFXLK_ESSENTIAL_TEE",
        price: 50,
        description: "OFFICIAL KINFXLK COLLECTIVE APPAREL. EMBROIDERED CHEST LOGO. PREMIUM CARDED COTTON.",
        category: "01_APPAREL",
        sizes: ["S", "M", "L", "XL"],
        status: "SOLD_OUT",
        stock: 0,
        image: "/images/store/kinfxlk-tee.jpg",
        color: "CORE_WHITE",
        details: ["Premium carded cotton", "Reinforced seams", "Standard fit"]
    },
    {
        id: "DROP_25_006",
        name: "STEADY_GRAPED_HOODIE",
        price: 110,
        description: "RELAXED FIT. 'STEADY' ARTWORK SCREEN PRINTED ON BACK. DISTRESSED EDGES.",
        category: "01_APPAREL",
        sizes: ["S", "M", "L", "XL", "XXL"],
        status: "SOLD_OUT",
        stock: 0,
        image: "/images/store/steady-hoodie.jpg",
        color: "DEEP_GRAPE",
        details: ["Acid wash finish", "Hand-distressed detailing", "Soft fleece lining"]
    },
];

export default function StorePage() {
    const { addToCart } = useCart();
    const [selectedSize, setSelectedSize] = useState<{ [key: string]: string }>({});
    const [activeTab, setActiveTab] = useState("ALL");

    const handleAddToCart = (product: typeof products[0]) => {
        const size = selectedSize[product.id];
        if (!size && product.sizes) {
            alert("PROTOCOL_ERROR: SELECT_SIZE_REQUIRED");
            return;
        }

        addToCart({
            productId: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            size: size || undefined,
            image: product.image
        });
    };

    const categories = ["ALL", "01_APPAREL", "02_OBJECTS", "03_ACCESSORIES"];
    const filteredProducts = activeTab === "ALL"
        ? products
        : products.filter(p => p.category === activeTab);

    return (
        <div className="min-h-screen bg-black text-white pb-32 pt-[var(--page-top-padding)]">
            <div className="h-24 w-full" />

            {/* Header / Intro */}
            <div className="container-custom px-6 mb-32">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-12"
                >
                    <div>
                        <div className="flex items-center gap-3 mb-6 font-mono text-xs text-neon-red">
                            <Box size={14} />
                            <span className="tracking-[0.4em] uppercase">Logistics_System_v4.2</span>
                        </div>
                        <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-[0.8]">
                            Merch <br />
                            <span className="text-neon-red drop-shadow-[0_0_15px_rgba(255,45,45,0.4)]">Registry</span>
                        </h1>
                    </div>
                    <div className="max-w-xs text-right">
                        <p className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest leading-loose">
                            // All assets are archival grade. <br />
                            // Limited run deployment. <br />
                            // Abuja // Global Distribution.
                        </p>
                    </div>
                </motion.div>

                {/* Category Navigation */}
                <div className="flex flex-wrap gap-4 mt-12">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveTab(cat)}
                            className={cn(
                                "px-6 py-2 rounded-full border font-mono text-[10px] tracking-[0.2em] uppercase transition-all",
                                activeTab === cat
                                    ? "bg-neon-red border-neon-red text-white shadow-glow-sm"
                                    : "border-white/10 text-neutral-500 hover:border-white/30 hover:text-white"
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Product Grid - Premium Cards */}
            <div className="container-custom px-6">
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-32"
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                >
                    {filteredProducts.map((product) => (
                        <motion.div
                            key={product.id}
                            variants={fadeInUp}
                            className="group flex flex-col"
                        >
                            {/* Visual Engine */}
                            <div className="relative aspect-square mb-8 overflow-hidden rounded-[2rem] border border-white/5 bg-[#080808] p-12 transition-all duration-700 group-hover:border-neon-red/30">
                                {/* HUD Corner Accents */}
                                <div className="absolute top-8 left-8 h-4 w-4 border-l border-t border-neon-red/30" />
                                <div className="absolute bottom-8 right-8 h-4 w-4 border-r border-b border-neon-red/30" />

                                <div className="absolute top-8 right-8 font-mono text-[9px] text-neutral-600 tracking-widest">
                                    {product.id}
                                </div>

                                <div className="relative h-full w-full flex items-center justify-center">
                                    <ShoppingBag size={120} strokeWidth={0.5} className="text-neutral-900 group-hover:text-neon-red/10 transition-colors duration-700" />
                                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center overflow-hidden pointer-events-none">
                                        <span className="text-[10rem] md:text-[14rem] font-black text-white/[0.015] tracking-tighter uppercase group-hover:text-white/[0.03] transition-colors">
                                            {product.id.split('_')[2]}
                                        </span>
                                    </div>
                                </div>

                                {product.status === "SOLD_OUT" && (
                                    <div className="absolute inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-20">
                                        <span className="text-2xl font-black text-neon-red uppercase tracking-[0.4em] border border-neon-red px-8 py-3 rotate-[-12deg]">
                                            ARCHIVE_ONLY
                                        </span>
                                    </div>
                                )}

                                {product.status === "LOW_STOCK" && (
                                    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 px-6 py-2 bg-neon-red text-white font-mono text-[10px] font-black uppercase tracking-widest shadow-glow-red animate-pulse">
                                        CRITICAL_STOCK: {product.stock}
                                    </div>
                                )}
                            </div>

                            {/* Label System */}
                            <div className="flex flex-col gap-6 px-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-3xl font-black tracking-tighter uppercase mb-2 group-hover:text-neon-red transition-colors">
                                            {product.name}
                                        </h3>
                                        <div className="text-[10px] font-mono text-neutral-500 tracking-[0.3em] uppercase">
                                            {product.category} // {product.color}
                                        </div>
                                    </div>
                                    <div className="text-3xl font-black font-mono">${product.price}</div>
                                </div>

                                <p className="text-sm text-neutral-400 leading-relaxed max-w-md">
                                    {product.description}
                                </p>

                                {/* Size Matrix */}
                                {product.sizes && product.status !== "SOLD_OUT" && (
                                    <div className="flex gap-4">
                                        {product.sizes.map(size => (
                                            <button
                                                key={size}
                                                onClick={() => setSelectedSize(prev => ({ ...prev, [product.id]: size }))}
                                                className={cn(
                                                    "h-12 w-12 flex items-center justify-center border font-mono text-xs transition-all",
                                                    selectedSize[product.id] === size
                                                        ? "bg-white text-black border-white shadow-glow-white"
                                                        : "border-white/10 text-neutral-500 hover:border-white hover:text-white"
                                                )}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {/* Technical Specs */}
                                <ul className="grid grid-cols-1 gap-2 border-t border-white/5 pt-6">
                                    {product.details.map((detail, idx) => (
                                        <li key={idx} className="flex items-center gap-3 text-[10px] font-mono text-neutral-600 uppercase tracking-widest">
                                            <div className="h-1 w-1 rounded-full bg-neon-red/40" />
                                            {detail}
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    onClick={() => handleAddToCart(product)}
                                    disabled={product.status === "SOLD_OUT"}
                                    className="w-full mt-4 h-16 bg-white text-black font-black uppercase tracking-[0.4em] hover:bg-neon-red hover:text-white hover:shadow-glow-red transition-all active:scale-[0.98] disabled:opacity-5 disabled:grayscale"
                                >
                                    {product.status === "SOLD_OUT" ? "SYSTEM_OFFLINE" : "INITIATE_ORDER"}
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Logistics Infrastructure */}
            <section className="container-custom px-6 mt-64 border-t border-white/10 pt-32">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="md:col-span-2">
                        <h2 className="text-4xl font-black uppercase tracking-tighter mb-8">Shipping. <br /> <span className="text-neon-red">Logistics.</span></h2>
                        <p className="text-neutral-500 font-mono text-xs leading-loose tracking-widest uppercase max-w-md">
                            BEETRUS OS UTILIZES A DECENTRALIZED FULFILLMENT NETWORK. GLOBAL TRANSIT PROTOCOLS COMMENCE WITHIN 48 HOURS OF ORDER COMMITMENT.
                        </p>
                    </div>

                    <div className="space-y-12">
                        <div className="flex gap-4">
                            <Truck className="text-neon-red mt-1" size={20} />
                            <div>
                                <h4 className="font-black text-sm uppercase mb-2">Global Transit</h4>
                                <p className="text-[10px] text-neutral-600 font-mono leading-relaxed">International shipping via DHL/UPS priority protocols.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <ShieldCheck className="text-neon-red mt-1" size={20} />
                            <div>
                                <h4 className="font-black text-sm uppercase mb-2">Authenticated</h4>
                                <p className="text-[10px] text-neutral-600 font-mono leading-relaxed">Each item features a unique QR fingerprint for origin verification.</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-12">
                        <div className="flex gap-4">
                            <Clock className="text-neon-red mt-1" size={20} />
                            <div>
                                <h4 className="font-black text-sm uppercase mb-2">Drop Cycle</h4>
                                <p className="text-[10px] text-neutral-600 font-mono leading-relaxed">Stock is replenished on archival cycles only. No reprints.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <ShoppingBag className="text-neon-red mt-1" size={20} />
                            <div>
                                <h4 className="font-black text-sm uppercase mb-2">Support</h4>
                                <p className="text-[10px] text-neutral-600 font-mono leading-relaxed">Direct uplink via contact portal for order status.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <motion.div
                className="container-custom px-6 mt-64"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                <div className="relative rounded-[3rem] bg-neon-red p-12 md:p-32 text-center text-white overflow-hidden shadow-glow-red">
                    <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-10 mix-blend-overlay" />
                    <h3 className="relative z-10 text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-12">
                        JOIN_THE_KINFxLK <br /> COLLECTIVE?
                    </h3>
                    <Link href="/socials">
                        <Button size="lg" variant="secondary" className="relative z-10 bg-white text-black font-black uppercase tracking-[0.4em] px-16 h-20 hover:scale-105 transition-all">
                            SYNC_FREQUENCY
                        </Button>
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
