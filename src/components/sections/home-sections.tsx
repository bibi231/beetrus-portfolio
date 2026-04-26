"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight, Code, Music, Play } from "lucide-react";
import { HeroFallback } from "@/components/three/hero-scene";
import { projects } from "@/data/projects";

const Hero3DScene = dynamic(
  () => import("@/components/three/hero-scene").then((mod) => mod.Hero3DScene),
  { ssr: false, loading: () => <HeroFallback /> }
);

const taglines = [
  "Building SaaS that actually ships.",
  "Writing code that scales. Making music that hits.",
  "From Abuja to everywhere.",
  "Fullstack engineer. Recording artist. One person."
];

export function HeroSection() {
  const [taglineIndex, setTaglineIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % taglines.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-20 pb-12 overflow-hidden">
      <div className="absolute inset-0 scanline-bg opacity-30 z-10 pointer-events-none" />
      
      {/* 3D Scene - Keeping it intact */}
      <div className="absolute inset-0 z-0 opacity-80">
        <Hero3DScene />
      </div>

      <div className="relative z-20 flex flex-col items-center text-center mt-auto">
        <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-wire bg-surface/80 backdrop-blur-md px-5 py-2 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
          <span className="h-2 w-2 rounded-full bg-pulse shadow-[0_0_8px_rgba(0,229,255,0.8)] animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-widest text-text-1">
            Engineer · Artist · Founder
          </span>
        </div>

        <p className="font-mono text-sm text-text-2 mb-8 tracking-widest uppercase">
          Abuja, Nigeria <span className="mx-2 text-pulse">◦</span> Open to Remote
        </p>

        {/* Typewriter Taglines */}
        <div className="h-8 mb-10 overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.p
              key={taglineIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="font-mono text-pulse text-sm md:text-base cursor"
            >
              {taglines[taglineIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-6">
          <Link href="/work" className="btn-glow">
            View My Work <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
          <Link href="/music" className="inline-flex items-center justify-center px-7 py-3 transition-colors hover:text-pulse font-mono text-[13px] uppercase tracking-widest border border-transparent hover:border-pulse/30 rounded-md">
            Hear My Music <Play className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function CapabilitiesSection() {
  const marquee1 = "REACT ◦ NEXT.JS ◦ TYPESCRIPT ◦ NODE.JS ◦ SUPABASE ◦ AI APIs ◦ PLAYWRIGHT ◦ DRIZZLE ORM ◦ PAYSTACK ◦ THREE.JS ◦ FRAMER MOTION ◦ AFROSOUNDS ◦ R&B ◦ DRILL ◦ ";
  const marquee2 = "DRILL ◦ R&B ◦ AFROSOUNDS ◦ FRAMER MOTION ◦ THREE.JS ◦ PAYSTACK ◦ DRIZZLE ORM ◦ PLAYWRIGHT ◦ AI APIs ◦ SUPABASE ◦ NODE.JS ◦ TYPESCRIPT ◦ NEXT.JS ◦ REACT ◦ ";

  return (
    <section className="py-12 border-y border-wire bg-ink overflow-hidden">
      <div className="flex w-[200%] gap-4">
        <motion.div 
          className="flex whitespace-nowrap font-mono text-[10px] sm:text-xs text-pulse uppercase tracking-[0.2em]"
          animate={{ x: [0, -1035] }}
          transition={{ ease: "linear", duration: 20, repeat: Infinity }}
        >
          <span>{marquee1}</span>
          <span>{marquee1}</span>
          <span>{marquee1}</span>
          <span>{marquee1}</span>
        </motion.div>
      </div>
      <div className="flex w-[200%] gap-4 mt-2">
        <motion.div 
          className="flex whitespace-nowrap font-mono text-[10px] sm:text-xs text-pulse/60 uppercase tracking-[0.2em]"
          animate={{ x: [-1035, 0] }}
          transition={{ ease: "linear", duration: 20, repeat: Infinity }}
        >
          <span>{marquee2}</span>
          <span>{marquee2}</span>
          <span>{marquee2}</span>
          <span>{marquee2}</span>
        </motion.div>
      </div>
    </section>
  );
}

export function WorkPreviewSection() {
  const showcase = projects.filter(p => p.featured).slice(0, 3);

  return (
    <section className="py-24 border-b border-wire bg-ink relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="font-display text-3xl font-bold tracking-wide">Featured Work</h2>
            <p className="font-mono text-sm text-text-2 mt-2">Selected platforms and products</p>
          </div>
          <Link href="/work" className="group font-mono text-sm text-pulse flex items-center mt-6 md:mt-0">
            See all work <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {showcase.map((project, i) => (
            <Link 
              key={project.id} 
              href="/work" 
              className={`card-premium p-6 group ${i === 0 ? 'md:col-span-2' : ''}`}
            >
              <div 
                className="w-full h-48 md:h-64 mb-6 rounded-lg bg-surface/50 border border-wire flex items-center justify-center group-hover:border-pulse/50 transition-colors bg-cover bg-center overflow-hidden relative"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${project.image})` }} 
                />
                <div className="absolute inset-0 bg-ink/30" />
              </div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-display text-xl font-semibold">{project.title}</h3>
                <span className="font-mono text-xs text-text-2">{project.year}</span>
              </div>
              <p className="text-text-2 text-sm">{project.tagline}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function DualIdentitySection() {
  return (
    <section className="py-24 border-b border-wire bg-surface relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 md:gap-8">
          
          {/* Engineer Column */}
          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <Code className="text-pulse" size={24} />
              <h2 className="font-display text-2xl font-bold tracking-widest uppercase">Engineer</h2>
            </div>
            <div className="h-px bg-wire w-full mb-6 relative">
              <div className="absolute left-0 top-0 h-full w-1/3 bg-pulse/50 blur-[2px]" />
            </div>
            <ul className="space-y-4 font-mono text-sm text-text-2 mb-10">
              <li>AI-powered SaaS</li>
              <li>Web3 Platforms</li>
              <li>Chrome Extensions</li>
              <li>Data Tools</li>
              <li className="mt-6 pt-4 border-t border-wire border-dashed text-text-1">₦0 to live product, solo.</li>
            </ul>
            <Link href="/work" className="btn-glow inline-flex">
              View Projects <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>

          {/* Divider on desktop */}
          <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-px bg-wire -translate-x-1/2">
            <div className="absolute top-1/2 -translate-y-1/2 -left-[1px] w-[3px] h-32 bg-gradient-to-b from-transparent via-pulse to-transparent blur-[2px] opacity-50" />
            <div className="absolute top-[30%] -translate-y-1/2 -left-[1px] w-[3px] h-20 bg-gradient-to-b from-transparent via-ember to-transparent blur-[2px] opacity-40" />
          </div>

          {/* Artist Column */}
          <div className="relative md:pl-8">
            <div className="flex items-center gap-3 mb-6">
              <Music className="text-ember" size={24} />
              <h2 className="font-display text-2xl font-bold tracking-widest uppercase">Beetrus</h2>
            </div>
            <div className="h-px bg-wire w-full mb-6 relative">
              <div className="absolute left-0 top-0 h-full w-1/3 bg-ember/50 blur-[2px]" />
            </div>
            <ul className="space-y-4 font-mono text-sm text-text-2 mb-10">
              <li>Afrosounds</li>
              <li>R&B</li>
              <li>Drill</li>
              <li>Abuja's underground sound</li>
              <li className="mt-6 pt-4 border-t border-wire border-dashed text-text-1">Latest: Afro State Of Mind EP</li>
            </ul>
            <Link href="/music" className="inline-flex items-center justify-center px-6 py-3 transition-colors text-ember border border-ember hover:bg-ember/10 rounded-md font-mono text-[13px] uppercase tracking-widest">
              Stream Now <Play className="ml-2 w-4 h-4" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}

export function StatsBelt() {
  return (
    <section className="py-16 bg-ink border-b border-wire">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-wire/50">
          <div className="text-center px-4">
            <div className="font-display text-4xl font-bold text-pulse mb-2">4+</div>
            <div className="font-mono text-xs uppercase tracking-widest text-text-2">Products Shipped</div>
          </div>
          <div className="text-center px-4">
            <div className="font-display text-4xl font-bold text-text-1 mb-2">5+</div>
            <div className="font-mono text-xs uppercase tracking-widest text-text-2">SaaS Tools Built</div>
          </div>
          <div className="text-center px-4">
            <div className="font-display text-4xl font-bold text-text-1 mb-2">3</div>
            <div className="font-mono text-xs uppercase tracking-widest text-text-2">Core Languages</div>
          </div>
          <div className="text-center px-4">
            <div className="font-display text-4xl font-bold text-ember mb-2">2K+</div>
            <div className="font-mono text-xs uppercase tracking-widest text-text-2">Monthly Listeners</div>
          </div>
        </div>

        {/* Latest from Instagram snippet */}
        <div className="mt-20 text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-text-3 mb-6">Latest from Instagram</p>
          <div className="w-full max-w-3xl mx-auto h-[120px] rounded-lg border border-wire bg-surface flex items-center justify-center">
            <div className="font-mono text-xs text-text-3 opacity-50">Intializing Behold.so Feed...</div>
          </div>
        </div>
      </div>
    </section>
  );
}
