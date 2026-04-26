"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Github } from "lucide-react";
import { projects } from "@/data/projects";

type Filter = 'All' | 'SaaS' | 'Platform' | 'App' | 'Client Work';
const filters: Filter[] = ['All', 'SaaS', 'Platform', 'App', 'Client Work'];

// Helper image component mapping to the specific project accent color
function ProjectCard({ project, index }: { project: any, index: number }) {
  const isOdd = index % 2 !== 0;
  const hasImage = !!project.image;

  return (
    <motion.article 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="w-full flex flex-col md:flex-row gap-8 lg:gap-16 py-12 md:py-24 border-b border-wire last:border-b-0 group"
      style={{ '--accent': project.accentColor } as any}
    >
      
      {/* Image Side */}
      <div className={`w-full md:w-1/2 relative aspect-[16/10] rounded-xl overflow-hidden bg-surface border border-wire group-hover:border-[var(--accent)] transition-colors ${isOdd ? 'md:order-last' : ''}`}>
        {hasImage ? (
          <>
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url(${project.image})` }}
            />
            <div className="absolute inset-0 bg-ink/20 group-hover:bg-transparent transition-colors" />
          </>
        ) : (
          <div 
            className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
            style={{ background: `linear-gradient(135deg, ${project.accentColor}15, ${project.accentColor}30)` }}
          >
            <span className="font-display text-2xl font-bold md:text-3xl tracking-wide" style={{ color: project.accentColor }}>
              {project.title}
            </span>
            <span className="font-mono text-sm opacity-60 mt-4 text-text-1">System Preview Loading...</span>
          </div>
        )}
        
        {/* Glow border overlay */}
        <div className="absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)] rounded-xl pointer-events-none" />
      </div>

      {/* Content Side */}
      <div className="w-full md:w-1/2 flex flex-col justify-center">
        <div className="flex items-center gap-4 mb-4 font-mono text-sm">
          <span className="text-text-1 bg-surface px-3 py-1 rounded-md border border-wire">
            {project.year}
          </span>
          <span className={`status-${project.status} uppercase tracking-widest`}>
            {project.status === 'live' ? 'Live' : project.status}
          </span>
        </div>

        <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 tracking-tight" style={{ color: project.accentColor }}>
          {project.title}
        </h2>
        
        <p className="text-text-1 text-lg mb-4 leading-relaxed font-medium">
          {project.tagline}
        </p>
        
        <p className="text-text-2 mb-8 leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map((tag: string) => (
            <span key={tag} className="font-mono text-[11px] uppercase bg-ink border border-wire px-3 py-1.5 rounded-full text-text-2">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 mt-auto">
          {project.liveUrl && (
            <a 
              href={project.liveUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 rounded-md font-mono text-[13px] uppercase tracking-widest text-ink transition-opacity hover:opacity-90 font-semibold"
              style={{ backgroundColor: project.accentColor }}
            >
              View Live <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          )}
          {project.githubUrl && (
            <a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 rounded-md border border-wire hover:border-text-1 transition-colors font-mono text-[13px] uppercase tracking-widest text-text-1"
            >
              <Github className="mr-2 w-4 h-4" /> Code
            </a>
          )}
        </div>
      </div>

    </motion.article>
  );
}

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>('All');

  const filteredProjects = projects.filter(p => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Client Work') return p.category === 'portfolio';
    return p.category.toLowerCase() === activeFilter.toLowerCase();
  });

  return (
    <div className="min-h-screen bg-ink">
      
      {/* Header */}
      <section className="pt-12 pb-20 border-b border-wire bg-surface/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Work Archive.
          </h1>
          <p className="text-lg text-text-2 max-w-2xl font-mono">
            Selected SaaS products, platforms, and client work. Built to scale, designed to impress.
          </p>

          <div className="mt-12 flex flex-wrap gap-2">
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2 rounded-full font-mono text-xs uppercase tracking-widest transition-colors ${
                  activeFilter === filter 
                    ? 'bg-pulse text-ink font-semibold' 
                    : 'bg-surface border border-wire text-text-2 hover:text-text-1 hover:border-pulse/50'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Feed */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div layout className="flex flex-col">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </AnimatePresence>
            
            {filteredProjects.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="py-24 text-center text-text-2 font-mono"
              >
                No projects found for this category.
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

    </div>
  );
}
