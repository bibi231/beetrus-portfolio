import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "class",
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            // Custom color palette - dark mode first, neon accents
            colors: {
                background: {
                    DEFAULT: "hsl(var(--bg-deep))",
                    surface: "hsl(var(--bg-surface))",
                    elevated: "hsl(var(--bg-elevated))",
                },
                foreground: {
                    DEFAULT: "hsl(var(--foreground))",
                    muted: "hsl(var(--foreground-muted))",
                },
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                },
                neon: {
                    red: {
                        DEFAULT: "var(--neon-red)",
                        glow: "var(--neon-red-glow)",
                        bright: "var(--neon-red-bright)",
                    },
                    cyan: {
                        DEFAULT: "var(--neon-cyan)",
                        glow: "var(--neon-cyan-glow)",
                        bright: "var(--neon-cyan-bright)",
                    },
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    hover: "hsl(var(--card-hover))",
                },
                border: {
                    DEFAULT: "hsl(var(--border))",
                    subtle: "hsl(var(--border-subtle))",
                },
            },
            fontSize: {
                hero: "var(--text-hero)",
                h1: "var(--text-h1)",
                h2: "var(--text-h2)",
                h3: "var(--text-h3)",
                body: "var(--text-body)",
                mono: "var(--text-mono)",
            },
            // Premium typography
            fontFamily: {
                sans: ["var(--font-inter)", "system-ui", "sans-serif"],
                display: ["var(--font-outfit)", "var(--font-inter)", "sans-serif"],
                mono: ["var(--font-jetbrains)", "Menlo", "monospace"],
            },
            // Spacing for rhythm
            spacing: {
                "18": "4.5rem",
                "88": "22rem",
                "128": "32rem",
            },
            // Border radius tokens
            borderRadius: {
                "4xl": "2rem",
                "5xl": "2.5rem",
            },
            // Animation timings
            transitionDuration: {
                "400": "400ms",
                "600": "600ms",
                "800": "800ms",
            },
            // Custom animations
            animation: {
                "fade-in": "fadeIn 0.5s ease-out forwards",
                "fade-in-up": "fadeInUp 0.6s ease-out forwards",
                "fade-in-down": "fadeInDown 0.6s ease-out forwards",
                "scale-in": "scaleIn 0.4s ease-out forwards",
                "slide-in-right": "slideInRight 0.5s ease-out forwards",
                "slide-in-left": "slideInLeft 0.5s ease-out forwards",
                "float": "float 6s ease-in-out infinite",
                "pulse-glow": "pulseGlow 2s ease-in-out infinite",
                "gradient-shift": "gradientShift 8s ease-in-out infinite",
                "spin-slow": "spin 20s linear infinite",
                "bounce-subtle": "bounceSubtle 2s ease-in-out infinite",
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                fadeInUp: {
                    "0%": { opacity: "0", transform: "translateY(20px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                fadeInDown: {
                    "0%": { opacity: "0", transform: "translateY(-20px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                scaleIn: {
                    "0%": { opacity: "0", transform: "scale(0.9)" },
                    "100%": { opacity: "1", transform: "scale(1)" },
                },
                slideInRight: {
                    "0%": { opacity: "0", transform: "translateX(50px)" },
                    "100%": { opacity: "1", transform: "translateX(0)" },
                },
                slideInLeft: {
                    "0%": { opacity: "0", transform: "translateX(-50px)" },
                    "100%": { opacity: "1", transform: "translateX(0)" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-20px)" },
                },
                pulseGlow: {
                    "0%, 100%": { opacity: "0.5", filter: "blur(20px)" },
                    "50%": { opacity: "0.8", filter: "blur(30px)" },
                },
                gradientShift: {
                    "0%, 100%": { backgroundPosition: "0% 50%" },
                    "50%": { backgroundPosition: "100% 50%" },
                },
                bounceSubtle: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-5px)" },
                },
            },
            // Box shadows with glow effects
            boxShadow: {
                "glow-sm": "0 0 10px -3px hsl(var(--accent-glow))",
                "glow": "0 0 20px -5px hsl(var(--accent-glow))",
                "glow-lg": "0 0 40px -10px hsl(var(--accent-glow))",
                "glow-cyan": "0 0 30px -5px #00f0ff",
                "glow-purple": "0 0 30px -5px #bf00ff",
                "glow-red": "0 0 30px -5px #ff3333",
                "glow-crimson": "0 0 40px -5px #ff1744",
                "glow-orange": "0 0 30px -5px #ff6622",
                "glass": "inset 0 1px 1px 0 rgba(255,255,255,0.1)",
            },
            // Backdrop blur
            backdropBlur: {
                xs: "2px",
            },
            backgroundSize: {
                "300%": "300%",
            },
            zIndex: {
                'negative': '-1',
                'base': '0',
                'elevated': '10',
                'sticky': '40',
                'header': '200',
                'overlay': '300',
                'modal': '400',
                'toast': '500',
                'cursor': '9999',
            },
        },
    },
    plugins: [],
};

export default config;
