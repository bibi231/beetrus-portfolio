"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { useScrollPosition } from "@/hooks/use-animations";
import { spring, ease } from "@/lib/animations";
import { Menu, X, Music, Code2, User, ShoppingBag, Mail, Home, Users, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/cart-context";

const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/about", label: "About", icon: User },
    { href: "/work", label: "Work", icon: Code2 },
    { href: "/music", label: "Music", icon: Music },
    { href: "/store", label: "Store", icon: ShoppingBag },
    { href: "/socials", label: "Socials", icon: Users },
    { href: "/contact", label: "Contact", icon: Mail },
];

/**
 * Main navigation header - Floating glass with scroll collapse
 * Features animated red underline tracker and smooth transitions
 */
export function Header() {
    const pathname = usePathname();
    const scrollY = useScrollPosition();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    // Find active nav index
    const activeIndex = navItems.findIndex((item) => item.href === pathname);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    // Header states based on scroll
    const isScrolled = scrollY > 50;
    const isCompact = scrollY > 150;

    return (
        <>
            <motion.header
                className={cn(
                    "fixed left-0 top-0 z-header w-full transition-all duration-500",
                    isScrolled
                        ? "bg-black/90 backdrop-blur-xl border-b border-white/10 h-[var(--header-height)]"
                        : "bg-transparent h-[calc(var(--header-height)+2rem)]"
                )}
                initial={{ y: -100, opacity: 0 }}
                animate={{
                    y: 0,
                    opacity: 1,
                }}
                transition={{ duration: 0.8, ease: ease.cinematic }}
            >
                <motion.div
                    className="flex items-center justify-between px-6"
                    animate={{
                        paddingTop: isCompact ? 8 : 12,
                        paddingBottom: isCompact ? 8 : 12,
                    }}
                    transition={{ duration: 0.3, ease: ease.smooth }}
                >
                    {/* Red Home Button / Logo */}
                    <div className="flex items-center gap-4">
                        <Link href="/" className="group relative z-50">
                            <motion.div
                                className="flex h-10 w-10 items-center justify-center rounded-xl bg-neon-red shadow-glow-red transition-all group-hover:scale-110"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Home size={20} className="text-white" />
                            </motion.div>
                        </Link>
                        <Link href="/" className="group relative z-10 hidden sm:block">
                            <motion.span
                                className="font-display text-xl font-bold tracking-tight md:text-2xl"
                                whileHover={{ scale: 1.05 }}
                                transition={spring.magnetic}
                            >
                                <span className="text-neon-red drop-shadow-[0_0_10px_rgba(255,45,45,0.8)]">BEETRUS</span>
                            </motion.span>
                        </Link>
                    </div>

                    {/* Desktop Navigation with Animated Underline */}
                    <nav
                        className="hidden items-center gap-2 rounded-full bg-white/5 p-1 px-4 md:flex"
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        {navItems.map((item, index) => (
                            <NavLink
                                key={item.href}
                                href={item.href}
                                isActive={pathname === item.href}
                                isHovered={hoveredIndex === index}
                                onHover={() => setHoveredIndex(index)}
                            >
                                {item.label}
                            </NavLink>
                        ))}
                    </nav>

                    {/* Cart Button (Desktop) */}
                    <motion.div
                        className="hidden md:block mr-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link href="/cart" className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-foreground-muted hover:bg-neon-red hover:text-white transition-colors">
                            <ShoppingCart size={18} />
                            <CartBadge />
                        </Link>
                    </motion.div>

                    {/* CTA Button (Desktop) */}
                    <motion.div
                        className="hidden md:block"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        transition={spring.magnetic}
                    >
                        <Link
                            href="/contact"
                            className="inline-flex h-10 items-center gap-2 rounded-full bg-neon-red/90 px-5 text-sm font-medium text-white transition-all hover:bg-neon-red hover:shadow-glow-red"
                        >
                            <Mail size={14} />
                            <span>Contact</span>
                        </Link>
                    </motion.div>

                    {/* Mobile Menu Toggle */}
                    <motion.button
                        className={cn(
                            "relative flex h-10 w-10 items-center justify-center rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm md:hidden",
                            isMobileMenuOpen ? "z-[210]" : "z-50"
                        )}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Toggle menu"
                    >
                        <AnimatePresence mode="wait">
                            {isMobileMenuOpen ? (
                                <motion.div
                                    key="close"
                                    initial={{ opacity: 0, rotate: -90 }}
                                    animate={{ opacity: 1, rotate: 0 }}
                                    exit={{ opacity: 0, rotate: 90 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <X size={18} className="text-neon-red" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="menu"
                                    initial={{ opacity: 0, rotate: 90 }}
                                    animate={{ opacity: 1, rotate: 0 }}
                                    exit={{ opacity: 0, rotate: -90 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Menu size={18} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.button>
                </motion.div>

                {/* Red glow accent line */}
                <motion.div
                    className="absolute bottom-0 left-6 right-6 h-px"
                    style={{
                        background: isScrolled
                            ? "linear-gradient(90deg, transparent, var(--neon-red-glow), transparent)"
                            : "transparent"
                    }}
                />
            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            className="fixed inset-0 z-overlay bg-background/80 backdrop-blur-md md:hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                        />

                        <motion.div
                            className="fixed inset-y-0 right-0 z-modal w-full max-w-[280px] border-l border-white/10 bg-black/95 p-6 backdrop-blur-3xl md:hidden shadow-[-10px_0_40px_rgba(0,0,0,0.8)]"
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 30, stiffness: 250 }}
                        >
                            <nav className="mt-20 flex flex-col gap-2">
                                {navItems.map((item, index) => (
                                    <motion.div
                                        key={item.href}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <Link
                                            href={item.href}
                                            className={cn(
                                                "flex items-center gap-4 rounded-xl p-4 text-lg font-medium transition-all active:scale-95",
                                                pathname === item.href
                                                    ? "bg-neon-red/10 text-neon-red"
                                                    : "text-foreground-muted hover:bg-white/5 hover:text-white"
                                            )}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            <item.icon size={20} className={pathname === item.href ? "text-neon-red" : "text-foreground-muted"} />
                                            {item.label}
                                            {pathname === item.href && (
                                                <motion.span
                                                    className="ml-auto h-2 w-2 rounded-full bg-neon-red"
                                                    layoutId="mobile-active-dot"
                                                />
                                            )}
                                        </Link>
                                    </motion.div>
                                ))}
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: navItems.length * 0.05 }}
                                >
                                    <Link
                                        href="/cart"
                                        className={cn(
                                            "flex items-center gap-4 rounded-xl p-4 text-lg font-medium transition-all active:scale-95",
                                            pathname === "/cart"
                                                ? "bg-neon-red/10 text-neon-red"
                                                : "text-foreground-muted hover:bg-white/5 hover:text-white"
                                        )}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <ShoppingCart size={20} className={pathname === "/cart" ? "text-neon-red" : "text-foreground-muted"} />
                                        Cart
                                        <div className="ml-auto">
                                            <CartBadgeMobile />
                                        </div>
                                    </Link>
                                </motion.div>
                            </nav>

                            {/* CTA in Mobile Menu */}
                            <motion.div
                                className="absolute bottom-8 left-6 right-6"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <Link
                                    href="/contact"
                                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-neon-red py-4 font-bold text-white shadow-glow-red transition-transform active:scale-95"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <Mail size={18} />
                                    <span>Get In Touch</span>
                                </Link>
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}

/**
 * Individual nav link with animated underline and hover state
 */
function NavLink({
    href,
    children,
    isActive,
    isHovered,
    onHover,
}: {
    href: string;
    children: React.ReactNode;
    isActive: boolean;
    isHovered: boolean;
    onHover: () => void;
}) {
    return (
        <Link
            href={href}
            className={cn(
                "relative flex h-10 items-center px-4 text-sm font-medium transition-colors",
                isActive
                    ? "text-white [text-shadow:0_0_10px_rgba(255,45,45,0.4)]"
                    : "text-foreground-muted hover:text-neon-red transition-all duration-300"
            )}
            onMouseEnter={onHover}
        >
            {/* Text */}
            <span className="relative z-10">{children}</span>

            {/* Hover/Active Underline Indicator */}
            {(isActive || isHovered) && (
                <motion.span
                    className="absolute -bottom-1 left-4 right-4 h-0.5 bg-neon-red shadow-[0_0_8px_rgba(255,45,45,0.5)]"
                    layoutId="nav-underline"
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    exit={{ opacity: 0, scaleX: 0 }}
                    transition={spring.magnetic}
                />
            )}
        </Link>
    );
}

function CartBadge() {
    const { itemCount } = useCart();

    if (itemCount === 0) return null;

    return (
        <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-neon-red text-[10px] font-bold text-white shadow-[0_0_8px_rgba(255,45,45,0.6)]"
        >
            {itemCount}
        </motion.span>
    );
}

function CartBadgeMobile() {
    const { itemCount } = useCart();

    if (itemCount === 0) return null;

    return (
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-neon-red text-xs font-bold text-white">
            {itemCount}
        </span>
    );
}
