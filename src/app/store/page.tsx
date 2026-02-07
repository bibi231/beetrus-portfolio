"use client";

import { useCart } from "@/context/cart-context";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, X, Ticket, Terminal } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const products = [
    {
        id: "DROP_001",
        name: "NO_TIME_4_LUV_TEE",
        price: 45,
        description: "HEAVYWEIGHT COTTON. OVERSIZED FIT. SCREEN PRINT FRONT & BACK.",
        category: "01_APPAREL",
        sizes: ["S", "M", "L", "XL"],
        status: "LIVE",
        stock: 156,
        image: "/images/store/tee-black.jpg",
        color: "NOIR"
    },
    {
        id: "DROP_002",
        name: "SYSTEM_ERROR_HOODIE",
        price: 95,
        description: "FRENCH TERRY. 450GSM. DISTRESSED HEM. PUFF PRINT.",
        category: "01_APPAREL",
        sizes: ["S", "M", "L", "XL"],
        status: "LOW_STOCK",
        stock: 14,
        image: "/images/store/hoodie-red.jpg",
        color: "CRIMSON"
    },
    {
        id: "DROP_003",
        name: "ARCHIVE_POSTER_V1",
        price: 35,
        description: "A2 FORMAT. HOLOGRAPHIC FINISH. SIGNED.",
        category: "02_OBJECTS",
        status: "LIVE",
        stock: 50,
        image: "/images/store/poster.jpg",
        color: "SILVER"
    },
    {
        id: "DROP_004",
        name: "ACCESS_CAP_001",
        price: 40,
        description: "5-PANEL. EMBROIDERED LOGO. ADJUSTABLE.",
        category: "03_ACCESSORIES",
        status: "SOLD_OUT",
        stock: 0,
        image: "/images/store/cap.jpg",
        color: "STEALTH"
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
            alert("SELECT_SIZE");
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
                    <h1 className="text-2xl font-black tracking-tighter mb-8">INITIATING_DROP_PROTOCOL</h1>
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
            {/* Explicit Spacer for vertical hierarchy consistency - increased for extra dramatic black space */}
            <div className="h-64 w-full" />

            {/* Supreme-style Minimalist Header */}
            <div className="fixed top-8 left-0 w-full z-elevated px-8 flex justify-between items-start pointer-events-none">
                <div className="flex flex-col gap-1 pointer-events-auto">
                    <h1 className="text-lg font-black tracking-widest bg-black px-2 py-1">MERCH STORE</h1>
                    <span className="text-[10px] text-neon-red px-2">ABJ_NG_CORE_RESERVE</span>
                </div>
                <div className="text-right flex flex-col items-end gap-1 pointer-events-auto">
                    <button
                        onClick={() => setIsMobileInfoOpen(true)}
                        className="text-[10px] tracking-widest bg-white text-black font-bold px-2 py-1 hover:bg-neon-red hover:text-black transition-colors"
                    >
                        [ INFO ]
                    </button>
                    <span className="text-[10px] tracking-widest text-neutral-500 uppercase mt-1">Status: LIVE</span>
                </div>
            </div>

            {/* Mobile Info Modal */}
            <AnimatePresence>
                {isMobileInfoOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-8"
                    >
                        <div className="max-w-md w-full border border-white/20 bg-black p-12 text-center relative">
                            <button onClick={() => setIsMobileInfoOpen(false)} className="absolute top-4 right-4 text-neon-red">
                                <X size={24} />
                            </button>
                            <h2 className="text-3xl font-black mb-6 uppercase tracking-tight">Supply_Terms</h2>
                            <div className="space-y-6 text-[11px] tracking-widest text-neutral-400 uppercase leading-relaxed">
                                <p>All sales are final. No returns. No exchanges.</p>
                                <p>Standard shipping: 5-7 business days.</p>
                                <p>International duties not included.</p>
                                <div className="pt-8 border-t border-white/10">
                                    <p className="text-neon-red">Encrypted checkout via SHA-256</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="container-custom px-4 md:px-12 mt-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-32">
                    {products.map((product) => (
                        <div key={product.id} className="flex flex-col group">
                            {/* RAW Product Visual */}
                            <div className="relative aspect-[3/4] bg-[#0a0a0a] border border-white/5 overflow-hidden mb-8 p-8 flex items-center justify-center">
                                <div className="w-full h-full flex items-center justify-center opacity-40 group-hover:opacity-100 transition-opacity duration-700">
                                    <ShoppingBag size={80} strokeWidth={0.5} className="text-neutral-700 group-hover:text-neon-red transition-colors" />
                                </div>

                                <div className="absolute top-0 right-0 p-4">
                                    <span className="text-[10px] font-bold text-neutral-500">{product.id}</span>
                                </div>

                                {product.status === "SOLD_OUT" && (
                                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-10">
                                        <span className="text-xl font-black text-white border-2 border-white px-6 py-2 uppercase transform -rotate-12">Sold Out</span>
                                    </div>
                                )}
                            </div>

                            {/* Minimal Label System - No overlaps */}
                            <div className="space-y-6">
                                <div className="flex justify-between items-baseline border-b border-white/10 pb-4">
                                    <h3 className="text-xl font-black tracking-tight uppercase leading-none">
                                        {product.name}
                                    </h3>
                                    <span className="text-lg font-bold text-neon-red font-mono">${product.price}</span>
                                </div>

                                <div className="flex justify-between text-[10px] text-neutral-500 font-bold tracking-widest uppercase">
                                    <span>Col: {product.color}</span>
                                    <span>Cat: {product.category}</span>
                                </div>

                                <p className="text-[11px] text-neutral-400 uppercase leading-relaxed min-h-[3.5em]">
                                    {product.description}
                                </p>

                                {product.sizes && product.status !== "SOLD_OUT" && (
                                    <div className="flex gap-2 flex-wrap">
                                        {product.sizes.map(size => (
                                            <button
                                                key={size}
                                                onClick={() => setSelectedSize(prev => ({ ...prev, [product.id]: size }))}
                                                className={cn(
                                                    "h-10 w-10 flex items-center justify-center border text-xs font-bold transition-all",
                                                    selectedSize[product.id] === size
                                                        ? "bg-neon-red border-neon-red text-black"
                                                        : "border-white/10 hover:border-white text-neutral-500 hover:text-white"
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
                                    className="w-full py-4 bg-white text-black text-xs font-black uppercase tracking-[0.2em] hover:bg-neon-red transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
                                >
                                    {product.status === "SOLD_OUT" ? "Inventory_Empty" : "Add_to_Cart"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Spreadsheet-style Footer */}
                <div className="mt-64 border-t border-white/20 pt-12 grid grid-cols-1 md:grid-cols-3 gap-12 text-[10px] text-neutral-500 font-bold tracking-widest uppercase pb-20">
                    <div>
                        <p className="text-white mb-4">© BEETRUS_OS_SYSTEMS_2026</p>
                        <p className="leading-loose">
                            Design & Engineering by Beetrus.<br />
                            Abuja, Nigeria. High Performance Apparel.
                        </p>
                    </div>
                    <div>
                        <p className="text-white mb-4">Logistics</p>
                        <p className="leading-loose">
                            Worldwide shipping available.<br />
                            Taxes and duties calculated at exit.
                        </p>
                    </div>
                    <div className="md:text-right flex flex-col gap-2">
                        <span className="hover:text-neon-red cursor-pointer transition-colors">Shipping_Policy</span>
                        <span className="hover:text-neon-red cursor-pointer transition-colors">Terms_Usage</span>
                        <span className="hover:text-neon-red cursor-pointer transition-colors text-neon-red">SECURE_SSL_ACTIVE</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
