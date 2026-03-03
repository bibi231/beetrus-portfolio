"use client";

import { useCart } from "@/context/cart-context";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, X, Ticket, Terminal, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const products = [
    {
        id: "DROP_26_001",
        name: "GOJO_ULTRA_HOODIE",
        price: 120,
        description: "500GSM HEAVYWEIGHT COTTON. FEATURES THE 'GOJO' (2026) COLLAB COVER ART. ARCHIVAL QUALITY SCREEN PRINT.",
        category: "01_APPAREL",
        sizes: ["S", "M", "L", "XL"],
        status: "LIVE",
        stock: 50,
        image: "/images/store/gojo-hoodie.jpg",
        color: "PHANTOM_BLACK"
    },
    {
        id: "DROP_25_002",
        name: "LIGHTS_NEON_TEE",
        price: 55,
        description: "OVERSIZED LUXURY FIT. FEATURING THE 'LIGHTS' (2025) CINEMATIC ARTWORK. NEON RED ACCENT STITCHING.",
        category: "01_APPAREL",
        sizes: ["S", "M", "L", "XL"],
        status: "LIVE",
        stock: 120,
        image: "/images/store/lights-tee.jpg",
        color: "OBSIDIAN"
    },
    {
        id: "DROP_25_003",
        name: "BLUETOOTH_TECH_CAP",
        price: 45,
        description: "5-PANEL TECH NYLON. EMBROIDERED 'BLUETOOTH' LOGISTICS SYMBOL. ADJUSTABLE PARACORD.",
        category: "03_ACCESSORIES",
        status: "LOW_STOCK",
        stock: 12,
        image: "/images/store/bluetooth-cap.jpg",
        color: "CYBER_RED"
    },
    {
        id: "DROP_20_004",
        name: "AFRO_STATE_VINYL",
        price: 85,
        description: "LIMITED EDITION 12\" TRANSPARENT RED VINYL. INCLUDES TRACKS 'DO ME' & 'YOUR LOVIN'. SIGNED BY BEETRUS.",
        category: "02_OBJECTS",
        status: "LIVE",
        stock: 25,
        image: "/images/store/vinyl-red.jpg",
        color: "CRIMSON"
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
        color: "CORE_WHITE"
    },
    {
        id: "DROP_25_006",
        name: "STEADY_GRAPED_HOODIE",
        price: 110,
        description: "RELAXED FIT. 'STEADY' ARTWORK SCREEN PRINTED ON BACK. DISTRESSED EDGES.",
        category: "01_APPAREL",
        sizes: ["S", "M", "L", "XL", "XXL"],
        status: "LIVE",
        stock: 38,
        image: "/images/store/steady-hoodie.jpg",
        color: "DEEP_GRAPE"
    },
];

export default function StorePage() {
    const { addToCart } = useCart();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [selectedSize, setSelectedSize] = useState<{ [key: string]: string }>({});
    const [isMobileInfoOpen, setIsMobileInfoOpen] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsAuthenticated(true);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

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

    if (!isAuthenticated) {
        return (
            <div className="h-screen w-full bg-black flex flex-col items-center justify-center font-mono text-neon-red p-4">
                <Terminal size={48} className="mb-6 animate-pulse" />
                <div className="w-full max-w-sm space-y-4 text-center">
                    <h1 className="text-2xl font-black tracking-tighter mb-8">SYNCING_MERCH_PROTOCOLS</h1>
                    <div className="h-[2px] w-full bg-white/10 overflow-hidden">
                        <motion.div
                            className="h-full bg-neon-red"
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 0.8, ease: "linear" }}
                        />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white pb-32 font-mono selection:bg-neon-red selection:text-black pt-[var(--page-top-padding)]">
            <div className="h-48 w-full" />

            {/* Supreme-style Minimalist Header */}
            <div className="fixed top-24 left-0 w-full z-elevated px-8 flex justify-between items-start pointer-events-none md:top-32">
                <div className="flex flex-col gap-1 pointer-events-auto">
                    <h1 className="text-xl md:text-3xl font-black tracking-widest bg-black px-4 py-2 border border-white/10 uppercase">
                        Beetrus <span className="text-neon-red">Collection</span>
                    </h1>
                    <span className="text-[10px] text-neon-red px-4 font-bold tracking-[0.4em]">SEASON_2026_DROP_01</span>
                </div>
                <div className="text-right flex flex-col items-end gap-2 pointer-events-auto">
                    <button
                        onClick={() => setIsMobileInfoOpen(true)}
                        className="text-[10px] tracking-[0.5em] bg-white text-black font-black px-4 py-2 hover:bg-neon-red transition-all"
                    >
                        [ LOGISTICS ]
                    </button>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[10px] tracking-widest text-neutral-500 uppercase">Status: ONLINE</span>
                    </div>
                </div>
            </div>

            <div className="container-custom px-4 md:px-12 mt-40 md:mt-64">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-32">
                    {products.map((product) => (
                        <div key={product.id} className="flex flex-col group">
                            {/* RAW Product Visual */}
                            <div className="relative aspect-[3/4] bg-[#050505] border border-white/5 overflow-hidden mb-10 p-4 transition-all duration-700 group-hover:border-neon-red/30">
                                <div className="absolute inset-0 bg-gradient-to-t from-neon-red/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                <div className="w-full h-full relative z-10 flex flex-col items-center justify-center">
                                    <div className="relative w-full h-full flex items-center justify-center opacity-40 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110">
                                        <ShoppingBag size={100} strokeWidth={0.3} className="text-neutral-800 group-hover:text-neon-red" />
                                        <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 border-y border-white/5 py-4 flex items-center justify-center text-[10px] text-white/10 font-black tracking-[1em] uppercase">
                                            BEETRUS
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute top-6 left-6 z-20">
                                    <span className="text-[10px] font-black text-neutral-600 font-mono tracking-widest bg-black/40 px-2 py-1">{product.id}</span>
                                </div>

                                {product.status === "SOLD_OUT" && (
                                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-30">
                                        <div className="border-2 border-neon-red px-10 py-3 transform -rotate-6">
                                            <span className="text-2xl font-black text-neon-red uppercase tracking-widest">OUT_OF_STOCK</span>
                                        </div>
                                    </div>
                                )}

                                {product.status === "LOW_STOCK" && (
                                    <div className="absolute bottom-6 right-6 z-20">
                                        <span className="text-[9px] font-black text-white bg-neon-red px-3 py-1 animate-pulse">LOW_SUPPLY: {product.stock}</span>
                                    </div>
                                )}
                            </div>

                            {/* Minimal Label System */}
                            <div className="space-y-8 px-2">
                                <div className="flex justify-between items-start gap-4">
                                    <h3 className="text-2xl font-[900] tracking-tighter uppercase leading-none group-hover:text-neon-red transition-colors">
                                        {product.name}
                                    </h3>
                                    <div className="text-right">
                                        <span className="text-2xl font-black text-white font-mono leading-none">${product.price}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6 text-[10px] text-neutral-500 font-black tracking-[0.3em] uppercase">
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full border border-white/20" style={{ backgroundColor: product.color.includes('PHANTOM') ? '#0a0a0a' : product.color.includes('CRIMSON') ? '#ff1744' : '#222' }} />
                                        {product.color}
                                    </div>
                                    <span className="h-1 w-1 bg-white/10 rounded-full" />
                                    <span>CAT: {product.category}</span>
                                </div>

                                <p className="text-[12px] text-neutral-400 uppercase leading-relaxed font-light tracking-wide border-l border-neon-red/20 pl-4">
                                    {product.description}
                                </p>

                                {product.sizes && product.status !== "SOLD_OUT" && (
                                    <div className="flex gap-3 flex-wrap pt-4">
                                        {product.sizes.map(size => (
                                            <button
                                                key={size}
                                                onClick={() => setSelectedSize(prev => ({ ...prev, [product.id]: size }))}
                                                className={cn(
                                                    "h-12 w-12 flex items-center justify-center border font-black transition-all text-[11px]",
                                                    selectedSize[product.id] === size
                                                        ? "bg-neon-red border-neon-red text-black shadow-glow-red"
                                                        : "border-white/5 hover:border-white text-neutral-500 hover:text-white"
                                                )}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                )}

                                <button
                                    onClick={() => handleAddToCart(product)}
                                    disabled={product.status === "SOLD_OUT"}
                                    className="w-full mt-4 py-5 bg-white text-black text-xs font-[900] uppercase tracking-[0.4em] hover:bg-neon-red hover:shadow-glow-red transition-all transform active:scale-95 disabled:opacity-10 disabled:grayscale"
                                >
                                    {product.status === "SOLD_OUT" ? "SYSTEM_EMPTY" : "COMMIT_ORDER"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Custom Site Request CTA */}
                <motion.div
                    className="mt-64 border border-neon-red/20 bg-neon-red/5 p-8 md:p-16 text-center rounded-2xl relative overflow-hidden"
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                >
                    <div className="absolute top-0 left-0 w-24 h-px bg-neon-red/50" />
                    <div className="absolute top-0 left-0 h-24 w-px bg-neon-red/50" />

                    <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-6 leading-none">
                        WANT_A_<span className="text-neon-red">SITE</span>_LIKE_THIS?
                    </h3>
                    <p className="text-neutral-400 max-w-xl mx-auto mb-10 text-sm leading-relaxed tracking-wide">
                        I ARCHITECT PREMIUM DIGITAL ECOSYSTEMS FROM THE GROUND UP. SELECT YOUR BLUEPRINT AND INITIATE YOUR CUSTOM BUILD PROTOCOL TODAY.
                    </p>
                    <Link href="/request">
                        <Button size="lg" className="bg-white text-black font-black uppercase tracking-[0.4em] px-12 h-16 hover:bg-neon-red hover:shadow-glow-red transition-all">
                            REQUEST_BUILD
                        </Button>
                    </Link>
                </motion.div>

                {/* Industrial Grid Footer */}
                <div className="mt-40 border-t border-white/10 pt-20 grid grid-cols-1 md:grid-cols-4 gap-12 text-[10px] text-neutral-500 font-bold tracking-[0.3em] uppercase pb-32">
                    <div className="md:col-span-2">
                        <p className="text-white text-xl font-black mb-6 tracking-tighter">© BEETRUS_OS_SYSTEMS_2026</p>
                        <p className="leading-loose max-w-sm">
                            High-Integrity apparel engineered for the creative collective. Designed and deployed in Abuja, Nigeria. All assets authenticated via Beetrus OS Core.
                        </p>
                    </div>
                    <div>
                        <p className="text-white mb-6 font-black tracking-widest">Network</p>
                        <nav className="flex flex-col gap-3">
                            <span className="hover:text-neon-red cursor-pointer transition-colors flex items-center gap-2">
                                <ArrowUpRight size={10} /> Instagram
                            </span>
                            <span className="hover:text-neon-red cursor-pointer transition-colors flex items-center gap-2">
                                <ArrowUpRight size={10} /> Twitter
                            </span>
                            <span className="hover:text-neon-red cursor-pointer transition-colors flex items-center gap-2 text-neon-red">
                                <ArrowUpRight size={10} /> Soundcloud
                            </span>
                        </nav>
                    </div>
                    <div>
                        <p className="text-white mb-6 font-black tracking-widest">Compliance</p>
                        <nav className="flex flex-col gap-3">
                            <span className="hover:text-neon-red cursor-pointer transition-colors">T_O_S</span>
                            <span className="hover:text-neon-red cursor-pointer transition-colors">Privacy_Protocol</span>
                            <span className="hover:text-neon-red cursor-pointer transition-colors">Shipping_Logistics</span>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
}
