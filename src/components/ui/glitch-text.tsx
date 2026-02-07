"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface GlitchTextProps {
    text: string;
    className?: string;
    interval?: number;
}

export function GlitchText({ text, className, interval = 3000 }: GlitchTextProps) {
    const [isGlitching, setIsGlitching] = useState(false);

    useEffect(() => {
        const triggerGlitch = () => {
            setIsGlitching(true);
            setTimeout(() => setIsGlitching(false), 200);
        };

        const timer = setInterval(triggerGlitch, interval);
        return () => clearInterval(timer);
    }, [interval]);

    return (
        <span className={cn("relative inline-block", className)}>
            <span className="relative z-10">{text}</span>
            {isGlitching && (
                <>
                    <motion.span
                        className="absolute inset-0 z-0 text-neon-red opacity-70"
                        initial={{ x: 0 }}
                        animate={{ x: [-2, 2, -1, 0] }}
                        transition={{ duration: 0.2 }}
                        style={{ clipPath: "inset(20% 0 50% 0)" }}
                    >
                        {text}
                    </motion.span>
                    <motion.span
                        className="absolute inset-0 z-0 text-cyan-400 opacity-70"
                        initial={{ x: 0 }}
                        animate={{ x: [2, -2, 1, 0] }}
                        transition={{ duration: 0.2 }}
                        style={{ clipPath: "inset(60% 0 10% 0)" }}
                    >
                        {text}
                    </motion.span>
                </>
            )}
        </span>
    );
}
