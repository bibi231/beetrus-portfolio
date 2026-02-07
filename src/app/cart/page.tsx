"use client";

import { useCart } from "@/context/cart-context";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Plus, Minus, Trash2, ArrowRight, ShoppingBag, CreditCard, Lock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, cartTotal, itemCount } = useCart();

    if (itemCount === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-6"
                >
                    <div className="h-24 w-24 rounded-full bg-white/5 flex items-center justify-center mx-auto border border-white/10">
                        <ShoppingBag size={32} className="text-white/20" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black uppercase tracking-tighter mb-2">Cart Empty</h1>
                        <p className="font-mono text-sm text-foreground-muted uppercase tracking-widest">// waiting_for_input</p>
                    </div>
                    <Link href="/store">
                        <Button className="bg-neon-red hover:bg-neon-red/90 text-white font-bold uppercase tracking-widest px-8">
                            Return_To_Store
                        </Button>
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 pb-24">
            <div className="container-custom max-w-6xl">
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-2">Your Cart</h1>
                    <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-neon-red uppercase tracking-widest">// review_order_items</span>
                        <div className="h-px w-24 bg-white/10" />
                        <span className="font-mono text-xs text-foreground-muted">{itemCount} ITEMS</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Cart Items List */}
                    <div className="lg:col-span-2 space-y-6">
                        <AnimatePresence mode="popLayout">
                            {cart.map((item) => (
                                <motion.div
                                    key={`${item.productId}-${item.size}`}
                                    layout
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    className="flex gap-6 bg-[#080808] border border-white/5 p-4 rounded-2xl group hover:border-white/10 transition-all"
                                >
                                    {/* Product Image Placeholder */}
                                    <div className="h-32 w-24 bg-white/5 rounded-lg flex-shrink-0 relative overflow-hidden">
                                        {item.image ? (
                                            <div className="w-full h-full bg-neutral-900" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-neutral-900 text-white/10">
                                                <ShoppingBag size={24} />
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex-1 flex flex-col justify-between py-1">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-lg font-bold uppercase tracking-tight mb-1">{item.name}</h3>
                                                <div className="flex items-center gap-3 text-xs font-mono text-foreground-muted uppercase">
                                                    {item.size && <span>Size: {item.size}</span>}
                                                    <span>Ref: {item.productId}</span>
                                                </div>
                                            </div>
                                            <p className="font-mono font-bold text-lg">${item.price * item.quantity}</p>
                                        </div>

                                        <div className="flex justify-between items-end">
                                            <div className="flex items-center gap-3 bg-white/5 rounded-lg p-1">
                                                <button
                                                    onClick={() => updateQuantity(item.productId, item.size, -1)}
                                                    className="h-8 w-8 flex items-center justify-center hover:bg-white/10 rounded transition-colors"
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="font-mono w-4 text-center text-sm">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.productId, item.size, 1)}
                                                    className="h-8 w-8 flex items-center justify-center hover:bg-white/10 rounded transition-colors"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>

                                            <button
                                                onClick={() => removeFromCart(item.productId, item.size)}
                                                className="text-xs font-mono text-red-500/50 hover:text-red-500 uppercase flex items-center gap-2 px-3 py-2 hover:bg-red-500/10 rounded-lg transition-all"
                                            >
                                                <Trash2 size={14} />
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Order Summary */}
                    <div className="space-y-6">
                        <div className="bg-[#080808] border border-white/5 rounded-2xl p-8 sticky top-32">
                            <h3 className="text-xl font-black uppercase tracking-tight mb-6">Order Summary</h3>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-sm">
                                    <span className="text-foreground-muted">Subtotal</span>
                                    <span className="font-mono">${cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-foreground-muted">Shipping</span>
                                    <span className="font-mono text-neon-red">CALCULATED_AT_CHECKOUT</span>
                                </div>
                                <div className="h-px bg-white/10 my-4" />
                                <div className="flex justify-between items-end">
                                    <span className="font-bold uppercase tracking-widest text-sm">Total</span>
                                    <span className="text-2xl font-black font-mono">${cartTotal.toFixed(2)}</span>
                                </div>
                            </div>

                            <Button className="w-full bg-neon-red hover:bg-neon-red/90 text-white font-bold h-12 uppercase tracking-widest text-sm mb-4">
                                Proceed to Checkout <ArrowRight size={16} className="ml-2" />
                            </Button>

                            <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-foreground-muted uppercase">
                                <Lock size={10} />
                                <span>Secure Encrypted Payment</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
