"use client";

import { motion } from "framer-motion";
import {
    LayoutDashboard,
    ShoppingBag,
    Music2,
    Users,
    Settings,
    LogOut,
    ChevronRight,
    Search,
    Bell,
    Terminal
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";

const sidebarLinks = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Products", href: "/admin/products", icon: ShoppingBag },
    { label: "Music", href: "/admin/music", icon: Music2 },
    { label: "Orders", href: "/admin/orders", icon: ShoppingBag },
    { label: "Service Leads", href: "/admin/leads", icon: Users },
    { label: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <div className="flex min-h-screen bg-[#020202] text-white">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/5 bg-[#050505] flex flex-col fixed inset-y-0">
                <div className="p-6 border-b border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded bg-neon-red flex items-center justify-center">
                            <Terminal size={18} className="text-white" />
                        </div>
                        <span className="font-black tracking-tighter text-xl uppercase">Admin Panel</span>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-2 mt-4">
                    {sidebarLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "flex items-center justify-between px-4 py-3 rounded-lg transition-all group relative",
                                    isActive
                                        ? "text-white"
                                        : "text-white/40 hover:text-white hover:bg-white/5 border border-transparent"
                                )}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="sidebar-active"
                                        className="absolute inset-0 bg-neon-red/10 border border-neon-red/20 shadow-[0_0_15px_rgba(255,45,45,0.05)] rounded-lg"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                    />
                                )}
                                <div className="flex items-center gap-3 relative z-10">
                                    <link.icon size={18} className={isActive ? "text-neon-red" : ""} />
                                    <span className="text-sm font-bold uppercase tracking-widest">{link.label}</span>
                                </div>
                                {isActive && <div className="h-1.5 w-1.5 rounded-full bg-neon-red shadow-[0_0_8px_rgba(255,45,45,0.6)] relative z-10" />}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-white/5">
                    <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="flex items-center gap-3 w-full px-4 py-3 text-white/40 hover:text-red-500 hover:bg-red-500/5 rounded-lg transition-all group font-bold uppercase tracking-widest text-sm"
                    >
                        <LogOut size={18} />
                        <span>Terminate Session</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 flex flex-col">
                {/* Header */}
                <header className="h-20 border-b border-white/5 bg-[#050505]/50 backdrop-blur-xl flex items-center justify-between px-8 sticky top-0 z-40">
                    <div className="relative w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                        <input
                            type="text"
                            placeholder="SEARCH_DATA..."
                            className="w-full bg-white/5 border border-white/5 rounded-full py-2 pl-10 pr-4 text-xs font-mono focus:outline-none focus:border-neon-red/30 transition-all"
                        />
                    </div>

                    <div className="flex items-center gap-6">
                        <button className="relative text-white/40 hover:text-neon-red transition-all">
                            <Bell size={20} />
                            <span className="absolute -top-1 -right-1 h-3 w-3 bg-neon-red border-2 border-[#050505] rounded-full" />
                        </button>
                        <div className="h-8 w-px bg-white/5" />
                        <div className="flex items-center gap-3">
                            <div className="text-right">
                                <p className="text-xs font-black uppercase">Administrator</p>
                                <p className="text-[10px] font-mono text-neon-red uppercase">Root_Level</p>
                            </div>
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-neon-red to-neon-crimson border border-white/10" />
                        </div>
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
