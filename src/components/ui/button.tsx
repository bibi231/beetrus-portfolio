"use client";

import { forwardRef, ButtonHTMLAttributes, ReactNode, useState } from "react";
import { motion, HTMLMotionProps, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { spring } from "@/lib/animations";

const buttonVariants = cva(
    // Base styles - enhanced for cyber-noir aesthetic
    "relative inline-flex items-center justify-center gap-2 font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-red focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 overflow-hidden",
    {
        variants: {
            variant: {
                primary:
                    "bg-gradient-to-r from-neon-red via-neon-crimson to-neon-orange text-white shadow-lg hover:shadow-glow-red",
                secondary:
                    "bg-card/80 border border-border text-foreground hover:bg-card hover:border-neon-red/40 hover:shadow-glow-sm",
                ghost:
                    "bg-transparent text-foreground hover:bg-white/5 hover:text-neon-red",
                outline:
                    "bg-transparent border border-border text-foreground hover:border-neon-red/50 hover:bg-neon-red/5",
                glass:
                    "glass text-foreground hover:bg-card/60 hover:border-neon-red/20",
                destructive:
                    "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                link:
                    "bg-transparent text-neon-red underline-offset-4 hover:underline",
                neon:
                    "bg-transparent border-2 border-neon-red text-neon-red hover:bg-neon-red/10 hover:shadow-glow-red",
            },
            size: {
                sm: "h-9 px-4 text-sm rounded-lg",
                md: "h-11 px-6 text-sm rounded-xl",
                lg: "h-14 px-8 text-base rounded-xl",
                xl: "h-16 px-10 text-lg rounded-2xl",
                icon: "h-10 w-10 rounded-lg",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "md",
        },
    }
);

export interface ButtonProps
    extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onAnimationStart" | "onDrag" | "onDragEnd" | "onDragStart">,
    VariantProps<typeof buttonVariants> {
    children: ReactNode;
    isLoading?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    magnetic?: boolean;
}

/**
 * Premium button component with variants, loading state, and magnetic effect
 * Features stretch/squash on press and red neon glow
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant,
            size,
            children,
            isLoading,
            leftIcon,
            rightIcon,
            magnetic = false,
            disabled,
            ...props
        },
        ref
    ) => {
        const buttonContent = (
            <>
                {/* Glow overlay on hover */}
                <span className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                {/* Loading spinner */}
                {isLoading && (
                    <svg
                        className="mr-2 h-4 w-4 animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                )}
                {!isLoading && leftIcon}
                <span className="relative z-10">{children}</span>
                {rightIcon}
            </>
        );

        if (magnetic) {
            return (
                <MagneticButton
                    ref={ref}
                    className={cn("group", buttonVariants({ variant, size, className }))}
                    disabled={disabled || isLoading}
                    {...props}
                >
                    {buttonContent}
                </MagneticButton>
            );
        }

        return (
            <motion.button
                ref={ref}
                className={cn("group", buttonVariants({ variant, size, className }))}
                disabled={disabled || isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{
                    scale: 0.98,
                    scaleX: 1.02,
                    scaleY: 0.98,
                }}
                transition={spring.snappy}
                {...props}
            >
                {buttonContent}
            </motion.button>
        );
    }
);

Button.displayName = "Button";

/**
 * Magnetic button wrapper - pulls toward cursor with elastic physics
 */
interface MagneticButtonProps extends HTMLMotionProps<"button"> {
    children: ReactNode;
}

const MagneticButton = forwardRef<HTMLButtonElement, MagneticButtonProps>(
    ({ children, className, ...props }, ref) => {
        const [isHovered, setIsHovered] = useState(false);

        // Motion values for magnetic effect
        const x = useMotionValue(0);
        const y = useMotionValue(0);

        // Springy response
        const springConfig = { stiffness: 150, damping: 15, mass: 0.5 };
        const springX = useSpring(x, springConfig);
        const springY = useSpring(y, springConfig);

        const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            // Calculate distance from center
            const distX = e.clientX - centerX;
            const distY = e.clientY - centerY;

            // Magnetic pull (stronger when closer)
            x.set(distX * 0.15);
            y.set(distY * 0.15);
        };

        const handleMouseLeave = () => {
            setIsHovered(false);
            x.set(0);
            y.set(0);
        };

        return (
            <motion.button
                ref={ref}
                className={className}
                style={{ x: springX, y: springY }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                whileHover={{ scale: 1.03 }}
                whileTap={{
                    scale: 0.97,
                    scaleX: 1.03,
                    scaleY: 0.97,
                }}
                transition={spring.magnetic}
                {...props}
            >
                <motion.span
                    className="flex items-center justify-center gap-2"
                    animate={{ y: isHovered ? -1 : 0 }}
                    transition={spring.snappy}
                >
                    {children}
                </motion.span>
            </motion.button>
        );
    }
);

MagneticButton.displayName = "MagneticButton";

export { buttonVariants };
