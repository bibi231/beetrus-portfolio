"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const AnimatedInput = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
    ({ className, ...props }, ref) => {
        const [focused, setFocused] = useState(false);
        return (
            <div className="relative group w-full">
                <motion.div
                    className="absolute -inset-[1px] rounded-lg bg-neon-red/40 transition-opacity duration-300 blur-md pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: focused ? 1 : 0 }}
                />
                <input
                    ref={ref}
                    onFocus={(e) => { setFocused(true); props.onFocus?.(e); }}
                    onBlur={(e) => { setFocused(false); props.onBlur?.(e); }}
                    className={cn(
                        "h-14 w-full rounded-lg border border-white/5 bg-[#050505] px-5 text-foreground placeholder:text-foreground-muted/30 focus:border-neon-red/50 focus:outline-none transition-all font-mono text-sm relative z-10",
                        className
                    )}
                    {...props}
                />
            </div>
        );
    }
);
AnimatedInput.displayName = "AnimatedInput";

export const AnimatedTextarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
    ({ className, ...props }, ref) => {
        const [focused, setFocused] = useState(false);
        return (
            <div className="relative group w-full h-full">
                <motion.div
                    className="absolute -inset-[1px] rounded-lg bg-neon-red/40 transition-opacity duration-300 blur-md pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: focused ? 1 : 0 }}
                />
                <textarea
                    ref={ref}
                    onFocus={(e) => { setFocused(true); props.onFocus?.(e); }}
                    onBlur={(e) => { setFocused(false); props.onBlur?.(e); }}
                    className={cn(
                        "w-full rounded-lg border border-white/5 bg-[#050505] px-5 py-4 text-foreground placeholder:text-foreground-muted/30 focus:border-neon-red/50 focus:outline-none transition-all font-mono text-sm resize-none relative z-10",
                        className
                    )}
                    {...props}
                />
            </div>
        );
    }
);
AnimatedTextarea.displayName = "AnimatedTextarea";
