"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    LayoutDashboard,
    ShoppingBag,
    Music,
    Users,
    Settings,
    LogOut,
    Menu,
    X,
    ExternalLink,
    Search
} from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
    { name: "Overview", href: "/admin", icon: LayoutDashboard },
    { name: "Products", href: "/admin/products", icon: ShoppingBag },
    { name: "Orders", href: "/admin/orders", icon: Users },
    { name: "Music", href: "/admin/music", icon: Music },
    { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    // Redirect to login if not authenticated
    useEffect(() => {
        if (status === "unauthenticated" && pathname !== "/admin/login") {
            router.push("/admin/login");
        }
    }, [status, pathname, router]);

    if (status === "loading") {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="h-12 w-12 rounded-full border-2 border-neon-red"
                />
            </div>
        );
    }

    // Don't show layout on login page
    if (pathname === "/admin/login") {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-black text-white font-sans flex">
            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-50 w-64 bg-background-elevated border-r border-white/5 transition-transform duration-300 lg:translate-x-0 lg:static",
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="flex flex-col h-full">
                    {/* Sidebar Header */}
                    <div className="p-6 border-b border-white/5 flex items-center justify-between">
                        <Link href="/" className="group flex items-center gap-3">
                            <div className="h-8 w-8 rounded-lg bg-neon-red flex items-center justify-center shadow-glow-red">
                                <span className="font-black text-white text-xs">B</span>
                            </div>
                            <span className="font-display font-bold tracking-tighter text-xl">ADMIN_OS</span>
                        </Link>
                        <button className="lg:hidden" onClick={() => setIsSidebarOpen(false)}>
                            <X size={20} />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-1">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-3 px-4 py-3 rounded-xl transition-all group",
                                        isActive
                                            ? "bg-neon-red/10 text-neon-red border border-neon-red/20"
                                            : "text-foreground-muted hover:text-white hover:bg-white/5"
                                    )}
                                >
                                    <item.icon size={20} className={cn(isActive ? "text-neon-red" : "group-hover:text-neon-red transition-colors")} />
                                    <span className="font-medium text-sm">{item.name}</span>
                                    {isActive && (
                                        <motion.div
                                            layoutId="active-pill"
                                            className="ml-auto w-1.5 h-1.5 rounded-full bg-neon-red shadow-glow-red"
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Bottom Actions */}
                    <div className="p-4 border-t border-white/5 space-y-2">
                        <div className="px-4 py-3 rounded-xl bg-white/5 flex items-center gap-3 mb-4">
                            <div className="h-8 w-8 rounded-full bg-neon-red/20 border border-neon-red/30 flex items-center justify-center">
                                <span className="text-xs font-bold text-neon-red">A</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-bold truncate">Beetrus Admin</p>
                                <p className="text-[10px] text-foreground-muted truncate">admin@beetrus.com</p>
                            </div>
                        </div>
                        <button
                            onClick={() => signOut({ callbackUrl: "/" })}
                            className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-foreground-muted hover:text-destructive hover:bg-destructive/5 transition-all"
                        >
                            <LogOut size={20} />
                            <span className="font-medium text-sm">Terminate Session</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 bg-black overflow-x-hidden">
                {/* Top Header */}
                <header className="h-16 border-b border-white/5 px-8 flex items-center justify-between bg-black/50 backdrop-blur-md sticky top-0 z-30">
                    <div className="flex items-center gap-4">
                        <button className="lg:hidden" onClick={() => setIsSidebarOpen(true)}>
                            <Menu size={20} />
                        </button>
                        <div className="relative hidden md:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-muted" size={16} />
                            <input
                                type="text"
                                placeholder="Search system logs..."
                                className="bg-white/5 border border-white/5 rounded-lg py-1.5 pl-9 pr-4 text-xs focus:outline-none focus:border-neon-red/30 transition-all w-64"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link href="/" target="_blank" className="text-xs font-mono text-foreground-muted hover:text-white flex items-center gap-2 transition-colors">
                            VIEW_SITE
                            <ExternalLink size={14} />
                        </Link>
                    </div>
                </header>

                {/* Page Content */}
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
