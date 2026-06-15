"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const navItems = [
  { href: "/music", label: "Music" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/store", label: "Store" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Route-aware accent: gold in the artist world (Music), teal everywhere else.
  const artist = pathname.startsWith("/music");
  const accent = artist ? "var(--gold)" : "var(--pulse)";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    handleScroll(); // sync on mount (mid-page refresh shouldn't start transparent)
    window.addEventListener("scroll", handleScroll, { passive: true });
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
            ? "bg-[rgba(10,10,11,0.82)] backdrop-blur-[18px] border-b border-wire py-3"
            : "bg-transparent py-5"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
          {/* Wordmark — big Anton */}
          <Link href="/" className="relative z-50 flex items-baseline leading-none">
            <span className="font-display text-[28px] uppercase tracking-tight text-text-1 md:text-[32px]">
              Beetrus
            </span>
            <span className="ml-0.5 text-[28px] leading-none md:text-[32px]" style={{ color: accent }}>.</span>
          </Link>

          {/* Desktop nav — small wide mono */}
          <nav className="hidden items-center gap-9 md:flex">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative font-mono text-[11px] uppercase tracking-[0.22em] transition-colors duration-200",
                    isActive ? "text-text-1" : "text-text-2 hover:text-text-1"
                  )}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute -bottom-2 left-0 right-0 h-px"
                      style={{ background: accent }}
                      transition={{ type: "spring", stiffness: 320, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA + mobile toggle */}
          <div className="relative z-50 flex items-center gap-4">
            <Link
              href={artist ? "https://ffm.to/tenten-lost-files" : "/contact"}
              target={artist ? "_blank" : undefined}
              rel={artist ? "noopener noreferrer" : undefined}
              className="hidden items-center rounded-full border border-wire bg-surface px-4 py-1.5 transition-colors hover:border-[color:var(--accent)] sm:inline-flex"
              style={{ "--accent": accent } as React.CSSProperties}
            >
              <span className="mr-2 h-2 w-2 rounded-full" style={{ background: accent, boxShadow: `0 0 6px ${accent}` }} />
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-1">
                {artist ? "Stream TEN/TEN" : "Available for hire"}
              </span>
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menu"
              className="p-2 text-text-2 transition-colors hover:text-text-1 md:hidden"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Subpage clearance */}
      {pathname !== "/" && <div className="h-20 md:h-24" />}

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-sticky flex flex-col bg-ink px-6 pb-8 pt-28"
          >
            <nav className="mt-8 flex flex-col gap-5">
              {navItems.map((item, i) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i }}
                  >
                    <Link
                      href={item.href}
                      className="font-display text-5xl uppercase leading-none tracking-tight"
                      style={{ color: isActive ? accent : "var(--text-1)" }}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
            <Link
              href={artist ? "https://ffm.to/tenten-lost-files" : "/contact"}
              target={artist ? "_blank" : undefined}
              rel={artist ? "noopener noreferrer" : undefined}
              className="mt-auto inline-flex items-center justify-center rounded-full border px-6 py-3.5 font-mono text-xs uppercase tracking-[0.18em] text-text-1"
              style={{ borderColor: accent }}
            >
              <span className="mr-3 h-2.5 w-2.5 rounded-full" style={{ background: accent }} />
              {artist ? "Stream TEN/TEN" : "Available for hire"}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
