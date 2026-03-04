"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * 21st.dev inspired Bento Card with mouse-following hover spotlight.
 * Best used for high-impact grid items (QuickLinks, Project Highlights).
 */
export const BentoCard = ({
    children,
    className,
    glowColor = "rgba(255, 45, 45, 0.15)",
    borderAccent = "rgba(255, 45, 45, 0.4)",
}: {
    children: React.ReactNode;
    className?: string;
    glowColor?: string;
    borderAccent?: string;
}) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current || isFocused) return;

        const div = divRef.current;
        const rect = div.getBoundingClientRect();

        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleFocus = () => {
        setIsFocused(true);
        setOpacity(1);
    };

    const handleBlur = () => {
        setIsFocused(false);
        setOpacity(0);
    };

    const handleMouseEnter = () => {
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={cn(
                "group relative flex flex-col overflow-hidden rounded-3xl border border-white/5 bg-black/60 shadow-2xl transition-all duration-500",
                className
            )}
        >
            {/* Outer border glow that follows mouse */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${borderAccent}, transparent 40%)`,
                }}
            />

            {/* Inner background glow that follows mouse */}
            <motion.div
                className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${glowColor}, transparent 40%)`,
                }}
            />

            <div className="relative z-10 flex h-full flex-col bg-black/80 backdrop-blur-xl transition-[background] duration-500 group-hover:bg-black/60">
                {children}
            </div>
        </div>
    );
};
