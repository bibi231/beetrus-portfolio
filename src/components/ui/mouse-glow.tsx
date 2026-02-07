"use client";

import { motion, useSpring, useMotionValue } from "framer-motion";
import { useEffect } from "react";
import { useMousePosition } from "@/hooks/use-mouse";

export function MouseGlow() {
    const { x, y } = useMousePosition();

    const mouseX = useSpring(useMotionValue(0), { stiffness: 50, damping: 20 });
    const mouseY = useSpring(useMotionValue(0), { stiffness: 50, damping: 20 });

    useEffect(() => {
        mouseX.set(x);
        mouseY.set(y);
    }, [x, y, mouseX, mouseY]);

    return (
        <motion.div
            className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
            style={{
                background: `radial-gradient(600px circle at ${x}px ${y}px, rgba(255, 45, 45, 0.08), transparent 80%)`,
            }}
        />
    );
}
