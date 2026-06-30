"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, GitBranch, GraduationCap } from "lucide-react";
import { skillDomains } from "@/data/skills";

/* Thin gold-accented proficiency bar */
function SkillRow({ skill, color }: { skill: any; color: string }) {
  return (
    <div className="group/skill py-2.5 border-b border-wire/60 last:border-0">
      <div className="flex items-end justify-between mb-2">
        <span
          className="font-mono text-[13px] text-text-1 group-hover/skill:text-gold transition-colors"
          title={skill.note}
        >
          {skill.name}
        </span>
        <span className="font-mono text-[11px] tabular-nums text-text-3">{skill.level}%</span>
      </div>
      <div className="h-[3px] w-full bg-wire/50 overflow-hidden rounded-full">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}, #d9b23e)` }}
        />
      </div>
      {skill.note && (
        <p className="mt-1.5 font-mono text-[10px] leading-relaxed text-text-3 opacity-0 group-hover/skill:opacity-100 transition-opacity">
          {skill.note}
        </p>
      )}
    </div>
  );
}

export default function SkillsPage() {
  return (
    <div className="min-h-screen bg-ink">
      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pb-28 px-6">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-[480px] h-[480px] bg-gold/[0.08] blur-[150px] rounded-full -translate-y-1/3" />
        </div>
        <div className="relative z-10 max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono text-[12px] uppercase tracking-[0.26em] text-gold mb-7"
          >
            The Stack — what I build with
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="font-display font-black uppercase tracking-[-0.02em] leading-[0.86] text-text-1"
            style={{ fontSize: "var(--type-mega, clamp(3rem,12vw,9rem))" }}
          >
            Tools of<br /><span className="text-gold">the trade</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.12 }}
            className="mt-8 max-w-xl text-lg leading-relaxed text-text-2"
          >
            A full-stack toolkit that spans visceral frontends, resilient backends, and a heavy
            focus on shipping AI products end to end — from ₦0 to live and billing.
          </motion.p>
        </div>
      </section>

      {/* ═══ DOMAIN CARDS ═══ */}
      <section className="px-6 pb-24 border-t border-wire">
        <div className="max-w-[1200px] mx-auto pt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {skillDomains.map((domain, i) => (
            <motion.div
              key={domain.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="group rounded-2xl border border-wire bg-surface/40 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-gold/50"
            >
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-wire">
                <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-text-1">
                  {domain.label}
                </h3>
                <span
                  className="font-mono text-xs tabular-nums px-2 py-1 rounded-md"
                  style={{ background: `${domain.color}18`, color: domain.color }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              {domain.skills.map((skill) => (
                <SkillRow key={skill.name} skill={skill} color={domain.color} />
              ))}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══ OPEN SOURCE + EDUCATION ═══ */}
      <section className="px-6 py-24 border-t border-wire bg-surface/30">
        <div className="max-w-[1200px] mx-auto">
          <div className="font-mono text-[12px] uppercase tracking-[0.26em] text-gold mb-10">
            Beyond the stack
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <div className="group rounded-2xl border border-wire bg-ink/60 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-pulse/50">
              <div className="flex items-center gap-3 mb-5">
                <GitBranch className="text-pulse" size={22} />
                <h3 className="font-display text-2xl font-bold uppercase text-text-1">Open Source</h3>
              </div>
              <p className="text-text-2 leading-relaxed mb-6">
                Contributing back to the ecosystems that power the work — active in emerging Next.js
                libraries and the AI tooling space.
              </p>
              <div className="rounded-xl border border-wire bg-surface/50 p-5">
                <div className="font-mono text-[11px] uppercase tracking-widest text-pulse mb-1">
                  Notable work
                </div>
                <p className="font-mono text-[12px] text-text-3 leading-relaxed">
                  Patches and tooling for Next.js + AI ecosystem projects, plus the open TrueWeb
                  network stack.
                </p>
              </div>
            </div>

            <div className="group rounded-2xl border border-wire bg-ink/60 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-gold/50">
              <div className="flex items-center gap-3 mb-5">
                <GraduationCap className="text-gold" size={22} />
                <h3 className="font-display text-2xl font-bold uppercase text-text-1">Education</h3>
              </div>
              <div className="space-y-3">
                {[
                  { school: "Nile University", line: "BSc Software Engineering", tag: "In Progress", tagColor: "#d9b23e" },
                  { school: "freeCodeCamp", line: "Responsive Web Design", tag: "Verified", tagColor: "#4ade80" },
                ].map((c) => (
                  <div
                    key={c.school}
                    className="flex items-center justify-between rounded-xl border border-wire bg-surface/50 p-5 transition-colors hover:border-gold/40"
                  >
                    <div>
                      <div className="font-mono text-[13px] font-bold text-text-1 mb-0.5">{c.school}</div>
                      <p className="font-mono text-[11px] text-text-3">{c.line}</p>
                    </div>
                    <span className="font-mono text-[11px] font-bold" style={{ color: c.tagColor }}>
                      {c.tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 font-mono text-[12px] font-bold uppercase tracking-widest text-ink transition-transform hover:-translate-y-0.5"
            >
              See it in production <ArrowUpRight size={15} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-wire px-6 py-3 font-mono text-[12px] uppercase tracking-widest text-text-1 transition-colors hover:border-gold/50"
            >
              Work with me
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
