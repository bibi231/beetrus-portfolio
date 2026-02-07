"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";
import { CartProvider } from "@/context/cart-context";
import { SessionProvider } from "next-auth/react";

interface ProvidersProps {
    children: ReactNode;
}

/**
 * Global providers wrapper
 * - Lenis smooth scroll
 * - Session context for next-auth
 */
export function Providers({ children }: ProvidersProps) {
    useEffect(() => {
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (prefersReducedMotion) {
            return; // Skip smooth scroll if user prefers reduced motion
        }

        // Initialize Lenis smooth scroll
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            touchMultiplier: 2,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Cleanup on unmount
        return () => {
            lenis.destroy();
        };
    }, []);

    return (
        <SessionProvider>
            <CartProvider>
                {children}
            </CartProvider>
        </SessionProvider>
    );
}
