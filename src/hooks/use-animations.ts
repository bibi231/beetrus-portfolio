"use client";

import { useEffect, useRef, useState, RefObject } from "react";

/**
 * Custom hook for detecting when an element enters the viewport
 */
export function useInView(
    options?: IntersectionObserverInit
): [RefObject<HTMLElement | null>, boolean] {
    const ref = useRef<HTMLElement>(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsInView(true);
                observer.unobserve(element); // Only trigger once
            }
        }, options);

        observer.observe(element);

        return () => observer.disconnect();
    }, [options]);

    return [ref, isInView];
}

/**
 * Hook for window size
 */
export function useWindowSize() {
    const [size, setSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        function handleResize() {
            setSize({ width: window.innerWidth, height: window.innerHeight });
        }

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return size;
}

/**
 * Hook for mouse position
 */
export function useMousePosition() {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        function handleMouseMove(e: MouseEvent) {
            setPosition({ x: e.clientX, y: e.clientY });
        }

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return position;
}

/**
 * Hook for reduced motion preference
 */
export function usePrefersReducedMotion() {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        setPrefersReducedMotion(mediaQuery.matches);

        function handleChange(e: MediaQueryListEvent) {
            setPrefersReducedMotion(e.matches);
        }

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    return prefersReducedMotion;
}

/**
 * Hook for scroll position
 */
export function useScrollPosition() {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        function handleScroll() {
            setScrollY(window.scrollY);
        }

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return scrollY;
}
