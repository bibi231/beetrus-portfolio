"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const navItems = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/skills", label: "Skills" },
  { href: "/music", label: "Music" },
  { href: "/store", label: "Store" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed left-0 top-0 z-header w-full transition-all duration-300",
          isScrolled || pathname !== "/"
            ? "bg-[rgba(8,13,18,0.88)] backdrop-blur-[16px] border-b border-wire py-3"
            : "bg-transparent py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="relative z-50 flex items-baseline">
            <span className="font-display font-bold text-2xl tracking-wide text-text-1">
              beetrus<span className="text-pulse">.</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative font-mono text-sm tracking-wide transition-all duration-300 hover:tracking-[0.05em]",
                    isActive ? "text-text-1" : "text-text-2 hover:text-text-1"
                  )}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute -bottom-2 left-0 right-0 h-0.5 bg-pulse"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4 relative z-50">
            <Link 
              href="/contact" 
              className="hidden sm:inline-flex items-center rounded-full border border-wire bg-surface px-4 py-1.5 transition-colors hover:border-pulse"
            >
              <div className="w-2 h-2 rounded-full bg-lime mr-2 animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-widest text-text-1">
                Available for hire
              </span>
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-text-2 hover:text-text-1 transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Header Clearance Spacer for Subpages */}
      {pathname !== "/" && <div className="h-24 md:h-28" />}

      {/* Full-screen Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-sticky bg-ink pt-28 px-6 pb-6 flex flex-col"
          >
            <nav className="flex flex-col gap-6 items-center mt-10">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "font-display text-3xl font-semibold tracking-wide",
                    pathname === item.href ? "text-pulse" : "text-text-1"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <Link 
                href="/contact" 
                className="mt-8 inline-flex items-center rounded-full border border-pulse bg-pulse-dim px-6 py-3 transition-colors"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-lime mr-3 animate-pulse" />
                <span className="font-mono text-sm uppercase tracking-widest text-text-1">
                  Available for hire
                </span>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
