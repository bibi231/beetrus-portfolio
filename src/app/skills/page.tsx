"use client";

import { motion } from "framer-motion";
import { Code2, Server, Database, Brain, Cpu, Blocks } from "lucide-react";
import { skillDomains } from "@/data/skills";

// Helper components
function SkillBar({ skill, color }: { skill: any, color: string }) {
  return (
    <div className="mb-4 group relative">
      <div className="flex justify-between items-end mb-2">
        <span className="font-mono text-sm text-text-1 group-hover:text-pulse transition-colors cursor-help" title={skill.note}>
          {skill.name}
          <span className="opacity-0 group-hover:opacity-100 transition-opacity ml-2 text-[10px] text-text-2 bg-surface px-2 py-0.5 rounded absolute -top-1 left-24 whitespace-nowrap z-10 border border-wire">
            {skill.note}
          </span>
        </span>
        <span className="font-mono text-xs text-text-2">{skill.level}%</span>
      </div>
      <div className="h-2 w-full bg-surface rounded-full overflow-hidden border border-wire">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
}

export default function SkillsPage() {
  return (
    <div className="min-h-screen bg-ink">
      {/* Hero */}
      <section className="pt-12 pb-20 border-b border-wire bg-surface/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight mb-4">
            What I <br />
            <span className="text-pulse">build with<span className="cursor"></span></span>
          </h1>
          <p className="text-lg text-text-2 max-w-xl font-mono mt-8">
            My technical stack spans from visceral frontends to resilient backends, with a heavy focus on AI integration.
          </p>
        </div>
      </section>

      {/* Skills Matrix */}
      <section className="py-24 border-b border-wire">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {skillDomains.map((domain, i) => (
              <motion.div
                key={domain.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-8 pb-4 border-b border-wire">
                  <span className="text-2xl">{domain.icon}</span>
                  <h3 className="font-display text-xl font-semibold tracking-wide text-text-1">
                    {domain.label}
                  </h3>
                </div>
                <div>
                  {domain.skills.map((skill) => (
                    <SkillBar key={skill.name} skill={skill} color={domain.color} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications and Open Source */}
      <section className="py-24 bg-surface text-center md:text-left relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid md:grid-cols-2 gap-12 relative z-10">
          
          <div className="card-premium p-8">
            <h3 className="font-display text-2xl font-bold mb-6 flex items-center justify-center md:justify-start gap-3">
              <Blocks className="text-pulse" size={24} /> 
              Open Source
            </h3>
            <div className="space-y-4 font-mono text-sm text-text-2 text-left">
              <p className="mb-6">Contributing back to the ecosystems that power my work.</p>
              
              <div className="p-4 bg-ink border border-wire rounded-lg hover:border-pulse/50 transition-colors">
                <div className="text-text-1 font-semibold mb-1">Notable PRs</div>
                <p className="text-xs">Active contributor to emerging Next.js libraries and AI ecosystem tools.</p>
              </div>
            </div>
          </div>

          <div className="card-premium p-8">
            <h3 className="font-display text-2xl font-bold mb-6 flex items-center justify-center md:justify-start gap-3">
              <Brain className="text-lime" size={24} /> 
              Certifications
            </h3>
            <div className="space-y-4 font-mono text-sm text-text-2 text-left">
              <div className="flex justify-between items-center p-4 bg-ink border border-wire rounded-lg hover:border-lime/50 transition-colors">
                <div>
                  <div className="text-text-1 font-semibold mb-1">freeCodeCamp</div>
                  <p className="text-xs">Responsive Web Design</p>
                </div>
                <div className="text-lime font-bold">Verified</div>
              </div>
              <div className="flex justify-between items-center p-4 bg-ink border border-wire rounded-lg hover:border-lime/50 transition-colors">
                <div>
                  <div className="text-text-1 font-semibold mb-1">Nile University</div>
                  <p className="text-xs">BSc Software Engineering</p>
                </div>
                <div className="text-pulse font-bold">In Progress</div>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
