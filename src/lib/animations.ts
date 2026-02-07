/**
 * BEETRUS PORTFOLIO - MOTION SYSTEM
 * ===================================
 * Premium motion tokens for Tron/cyber-noir aesthetic
 * Elastic springs, stretch/squash, magnetic interactions
 */

import { Variants, Transition } from "framer-motion";

// ============================================
// MOTION TOKENS
// ============================================

/**
 * Easing curves for different interaction types
 */
export const ease = {
    // Smooth default
    smooth: [0.4, 0, 0.2, 1] as const,
    // Quick snap with slight overshoot
    snap: [0.68, 0, 0.27, 1.2] as const,
    // Elastic overshoot (for stretch/squash)
    elastic: [0.68, -0.6, 0.32, 1.6] as const,
    // Cinematic entrance
    cinematic: [0.22, 1, 0.36, 1] as const,
    // Exit (faster)
    exit: [0.4, 0, 1, 1] as const,
};

/**
 * Spring configurations for physics-based motion
 */
export const spring = {
    // Bouncy for buttons/interactive
    bounce: { type: "spring", stiffness: 400, damping: 10, mass: 1 } as const,
    // Magnetic pull effect
    magnetic: { type: "spring", stiffness: 150, damping: 15, mass: 0.5 } as const,
    // Snappy response
    snappy: { type: "spring", stiffness: 500, damping: 30 } as const,
    // Gentle float
    gentle: { type: "spring", stiffness: 100, damping: 20 } as const,
    // Elastic return
    elastic: { type: "spring", stiffness: 300, damping: 10, mass: 0.8 } as const,
};

/**
 * Duration scale (in seconds)
 */
export const duration = {
    micro: 0.15,
    fast: 0.3,
    normal: 0.5,
    slow: 0.8,
    cinematic: 1.2,
};

// ============================================
// STRETCH & SQUASH UTILITIES
// ============================================

export const stretchSquash = {
    press: {
        scaleX: 1.05,
        scaleY: 0.95,
    },
    release: {
        scaleX: 0.95,
        scaleY: 1.05,
    },
    neutral: {
        scaleX: 1,
        scaleY: 1,
    },
};

// ============================================
// TIER 1: AMBIENT (Subtle, Informational)
// ============================================

/**
 * Standard subtle entry for body text
 */
export const ambientFade: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: duration.normal,
            ease: ease.smooth,
        },
    },
};

/**
 * Fade in from bottom with cinematic ease (Headers)
 */
export const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: duration.normal,
            ease: ease.cinematic,
        },
    },
};

export const staggerContainer: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1,
        },
    },
};

// ============================================
// TIER 2: INTERACTIVE (Feedback, Micro-motion)
// ============================================

/**
 * Magnetic button interaction with micro-scale
 */
export const interactiveHover = {
    rest: { scale: 1 },
    hover: {
        scale: 1.02,
        transition: spring.magnetic
    },
    tap: {
        scale: 0.98,
        transition: spring.snappy
    },
};

/**
 * Navigation link underline
 */
export const navUnderline: Variants = {
    rest: { scaleX: 0, originX: 0 },
    hover: {
        scaleX: 1,
        transition: {
            duration: duration.fast,
            ease: ease.snap,
        },
    },
};

// ============================================
// TIER 3: HERO ONLY (Cinematic, High-impact)
// ============================================

/**
 * Cinematic hero text reveal with stagger
 */
export const heroRevealContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.06,
            delayChildren: 0.5,
        },
    },
};

/**
 * Character reveal with 3D rotation (HERO ONLY)
 */
export const heroLetter: Variants = {
    hidden: {
        opacity: 0,
        y: 80,
        rotateX: -90,
        scale: 0.9,
    },
    visible: {
        opacity: 1,
        y: 0,
        rotateX: 0,
        scale: 1,
        transition: {
            duration: duration.cinematic,
            ease: ease.cinematic,
        },
    },
};

/**
 * Subtitle line reveal with stagger
 */
export const subtitleReveal: Variants = {
    hidden: {
        opacity: 0,
        y: 20,
        filter: "blur(10px)",
    },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            duration: duration.slow,
            ease: ease.smooth,
        },
    },
};

/**
 * Text reveal character by character
 */
export const textReveal: Variants = {
    hidden: {
        opacity: 0,
        y: 50,
        rotateX: -90,
    },
    visible: {
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: {
            duration: duration.slow,
            ease: ease.cinematic,
        },
    },
};

/**
 * Glitch effect variants
 */
export const glitch: Variants = {
    rest: {
        x: 0,
        y: 0,
        skewX: 0,
    },
    hover: {
        x: [2, -2, 2, 0],
        y: [1, -1, 1, 0],
        skewX: [1, -1, 1, 0],
        transition: {
            duration: 0.2,
            repeat: 1,
        },
    },
};

/**
 * Character reveal with overshoot
 */
export const revealLetter: Variants = {
    hidden: {
        opacity: 0,
        y: 20,
        scale: 0.8,
    },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            delay: i * 0.03,
            duration: duration.normal,
            ease: ease.snap,
        },
    }),
};

// ============================================
// INTERACTIVE VARIANTS
// ============================================

/**
 * Magnetic button with stretch/squash
 */
export const magneticButton = {
    rest: {
        scale: 1,
        scaleX: 1,
        scaleY: 1,
    },
    hover: {
        scale: 1.02,
        transition: spring.magnetic,
    },
    tap: {
        scale: 0.98,
        scaleX: 1.03,
        scaleY: 0.97,
        transition: spring.snappy,
    },
};

/**
 * Red neon glow pulse
 */
export const glowPulse: Variants = {
    initial: {
        boxShadow: "0 0 20px -5px rgba(255, 45, 45, 0.3)",
    },
    animate: {
        boxShadow: [
            "0 0 20px -5px rgba(255, 45, 45, 0.3)",
            "0 0 40px -5px rgba(255, 45, 45, 0.6)",
            "0 0 20px -5px rgba(255, 45, 45, 0.3)",
        ],
        transition: {
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
        },
    },
};

/**
 * Card with 3D tilt and depth
 */
export const cardTilt = {
    rest: {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)",
    },
    hover: {
        scale: 1.02,
        boxShadow: "0 20px 40px -10px rgba(0,0,0,0.6), 0 0 30px -5px rgba(255, 45, 45, 0.2)",
        transition: spring.magnetic,
    },
};

/**
 * Track row stretch on hover (music page)
 */
export const trackRowStretch = {
    rest: {
        scaleX: 1,
        backgroundColor: "rgba(255, 255, 255, 0)",
    },
    hover: {
        scaleX: 1.01,
        backgroundColor: "rgba(255, 45, 45, 0.05)",
        transition: spring.snappy,
    },
};


/**
 * Navbar scroll collapse
 */
export const navbarCollapse: Variants = {
    expanded: {
        height: "auto",
        paddingTop: 20,
        paddingBottom: 20,
    },
    collapsed: {
        height: "auto",
        paddingTop: 12,
        paddingBottom: 12,
        transition: {
            duration: duration.fast,
            ease: ease.smooth,
        },
    },
};

// ============================================
// CHAPTER / SCROLL REVEALS
// ============================================

/**
 * Chapter reveal for about page storytelling
 */
export const chapterReveal: Variants = {
    hidden: {
        opacity: 0,
        y: 100,
        scale: 0.95,
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: duration.cinematic,
            ease: ease.cinematic,
        },
    },
};

/**
 * Timeline item reveal
 */
export const timelineItem: Variants = {
    hidden: {
        opacity: 0,
        x: -50,
        scale: 0.9,
    },
    visible: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
            duration: duration.slow,
            ease: ease.cinematic,
        },
    },
};

// ============================================
// AMBIENT / DECORATIVE
// ============================================

/**
 * Gradient drift animation
 */
export const gradientDrift: Variants = {
    animate: {
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        transition: {
            duration: 15,
            repeat: Infinity,
            ease: "linear",
        },
    },
};

/**
 * Scanline flicker
 */
export const scanlineFlicker: Variants = {
    animate: {
        opacity: [0.03, 0.06, 0.03],
        transition: {
            duration: 0.1,
            repeat: Infinity,
            ease: "linear",
        },
    },
};

/**
 * Float ambient motion
 */
export const floatAmbient: Variants = {
    animate: {
        y: [0, -10, 0],
        transition: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
        },
    },
};
