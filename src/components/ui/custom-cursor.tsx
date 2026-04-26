"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

type CursorVariant = "default" | "hover" | "text" | "hidden";

/**
 * Custom animated cursor with different states
 * Morphs based on what element is being hovered
 */
export function CustomCursor() {
    const [variant, setVariant] = useState<CursorVariant>("default");
    const [isVisible, setIsVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Raw mouse position
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring animation
    const springConfig = { damping: 30, stiffness: 400, mass: 0.5 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    // Slower follower
    const followerSpringConfig = { damping: 50, stiffness: 200, mass: 1 };
    const followerX = useSpring(mouseX, followerSpringConfig);
    const followerY = useSpring(mouseY, followerSpringConfig);

    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        },
        [mouseX, mouseY, isVisible]
    );

    const handleMouseEnter = useCallback(() => setIsVisible(true), []);
    const handleMouseLeave = useCallback(() => setIsVisible(false), []);

    useEffect(() => {
        // Check for mobile/touch device
        const checkMobile = () => {
            setIsMobile(window.matchMedia("(pointer: coarse)").matches);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);

        // Mouse events
        window.addEventListener("mousemove", handleMouseMove);
        document.body.addEventListener("mouseenter", handleMouseEnter);
        document.body.addEventListener("mouseleave", handleMouseLeave);

        // Detect hoverable elements
        const handleElementHover = () => {
            const hoverableSelectors = 'a, button, [role="button"], input, textarea, select, [data-cursor="pointer"]';
            const textSelectors = 'p, h1, h2, h3, h4, h5, h6, span, [data-cursor="text"]';

            document.querySelectorAll(hoverableSelectors).forEach((el) => {
                el.addEventListener("mouseenter", () => setVariant("hover"));
                el.addEventListener("mouseleave", () => setVariant("default"));
            });

            document.querySelectorAll(textSelectors).forEach((el) => {
                el.addEventListener("mouseenter", () => setVariant("text"));
                el.addEventListener("mouseleave", () => setVariant("default"));
            });
        };

        handleElementHover();

        // Re-run on DOM changes (for dynamic content)
        const observer = new MutationObserver(handleElementHover);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", checkMobile);
            document.body.removeEventListener("mouseenter", handleMouseEnter);
            document.body.removeEventListener("mouseleave", handleMouseLeave);
            observer.disconnect();
        };
    }, [handleMouseMove, handleMouseEnter, handleMouseLeave]);

    // Don't render on mobile devices
    if (isMobile) return null;

    const cursorVariants = {
        default: { width: 12, height: 12, backgroundColor: "var(--pulse)" },
        hover: { width: 50, height: 50, backgroundColor: "var(--pulse-dim)" },
        text: { width: 4, height: 24, backgroundColor: "var(--pulse)" },
        hidden: { width: 0, height: 0 },
    };

    return (
        <>
            {/* Hide default cursor */}
            <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>

            {/* Main cursor dot */}
            <motion.div
                className={cn(
                    "pointer-events-none fixed left-0 top-0 z-[9999] rounded-full mix-blend-screen",
                    !isVisible && "opacity-0"
                )}
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={variant}
                variants={cursorVariants}
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
            />

            {/* Follower ring */}
            <motion.div
                className={cn(
                    "pointer-events-none fixed left-0 top-0 z-[9998] rounded-full border border-pulse/50 shadow-[0_0_20px_rgba(255,0,60,0.2)]",
                    !isVisible && "opacity-0"
                )}
                style={{
                    x: followerX,
                    y: followerY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    width: variant === "hover" ? 70 : 40,
                    height: variant === "hover" ? 70 : 40,
                    opacity: variant === "hidden" ? 0 : 0.5,
                }}
                transition={{ type: "spring", damping: 50, stiffness: 200 }}
            />
        </>
    );
}
