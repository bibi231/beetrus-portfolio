"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail, MessageSquare, Send, Github, ArrowRight,
  CheckCircle2, AlertCircle, Clock, MapPin
} from "lucide-react";
import { toast } from "sonner";
import { MUSIC_IDS } from "@/data/musicIds";
import { cn } from "@/lib/utils";

/* ─── Availability badge ── */
function AvailabilityPulse() {
  return (
    <div className="inline-flex items-center gap-2.5 border border-gold/30 bg-gold/[0.06] px-4 py-2 rounded-none">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full bg-gold opacity-75" />
        <span className="relative inline-flex h-2 w-2 bg-gold" />
      </span>
      <span className="font-mono text-[11px] uppercase tracking-widest text-gold">Available for work</span>
    </div>
  );
}

/* ─── Contact card ── */
function ContactCard({
  href, icon: Icon, label, handle, response, color,
}: {
  href: string; icon: React.ComponentType<{ size?: number; style?: React.CSSProperties; className?: string }>;
  label: string; handle: string; response: string; color: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      className="group flex items-start gap-4 rounded-none border border-wire bg-surface/40 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--c)]"
      style={{ ["--c" as string]: color } as React.CSSProperties}
    >
      <div
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-none transition-colors"
        style={{ background: `${color}15`, border: `1px solid ${color}25` }}
      >
        <Icon size={20} style={{ color }} />
      </div>
      <div className="min-w-0">
        <div className="mb-0.5 font-display text-base text-text-1">{label}</div>
        <div className="mb-2 truncate font-mono text-[11px] text-text-3">{handle}</div>
        <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-text-3">
          <Clock size={10} /> {response}
        </div>
      </div>
      <ArrowRight
        size={16}
        className="ml-auto shrink-0 translate-x-0 text-text-3 transition-colors duration-200 group-hover:translate-x-1 group-hover:text-[var(--c)]"
      />
    </a>
  );
}

/* ─── Form field ── */
function Field({
  label, icon: Icon, children,
}: {
  label: string; icon: React.ComponentType<{ size?: number }>; children: React.ReactNode;
}) {
  return (
    <div className="group/field space-y-2">
      <label className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-text-3 transition-colors group-focus-within/field:text-gold">
        <Icon size={10} />
        {label}
      </label>
      {children}
    </div>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "", budget: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.message) {
      toast.error("Email and message are required");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("ok");
        setForm({ name: "", email: "", subject: "", message: "", budget: "" });
        toast.success("Message sent! I'll be in touch soon.");
      } else {
        setStatus("err");
        toast.error("Something went wrong — try emailing me directly.");
      }
    } catch {
      setStatus("err");
      toast.error("Could not connect — try emailing me directly.");
    }
  };

  const inputBase =
    "w-full rounded-none border border-wire bg-ink/60 px-5 py-4 font-body text-[15px] text-text-1 placeholder:text-text-3 transition-all focus:border-gold focus:bg-surface/40 focus:outline-none";

  return (
    <div className="min-h-screen bg-ink">
      {/* Atmospheric bg — warm */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute right-0 top-0 h-[700px] w-[700px] translate-x-1/3 -translate-y-1/3 rounded-full bg-gold/[0.05] blur-[160px]" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] -translate-x-1/3 translate-y-1/3 rounded-full bg-ember/[0.05] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 pb-32 pt-16 lg:px-8">
        {/* Portal intake header */}
        <div className="mb-20">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 flex flex-wrap items-center gap-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-text-3">TrueWeb · Project Intake</span>
            <AvailabilityPulse />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mb-6 font-display uppercase tracking-tight text-text-1"
            style={{ fontSize: "clamp(2.8rem, 9vw, 7rem)", lineHeight: 0.88 }}
          >
            Let&apos;s build<br /><span className="text-gold">something</span><br />great.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="max-w-lg text-lg leading-relaxed text-text-2"
          >
            Freelance projects, SaaS collaborations, and product builds through TrueWeb Solutions.
            Based in Abuja — working with clients worldwide.
          </motion.p>
        </div>

        <div className="grid items-start gap-16 lg:grid-cols-[1fr_420px]">
          {/* Form */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="relative">
            <AnimatePresence mode="wait">
              {status === "ok" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center gap-6 py-24 text-center"
                >
                  <div className="flex h-20 w-20 items-center justify-center rounded-none border border-gold/25 bg-gold/10">
                    <CheckCircle2 size={36} className="text-gold" />
                  </div>
                  <div>
                    <h3 className="mb-2 font-display text-3xl uppercase text-text-1">Message received.</h3>
                    <p className="text-text-2">I&apos;ll get back to you within 24 hours.</p>
                  </div>
                  <button
                    onClick={() => setStatus("idle")}
                    className="font-mono text-[11px] uppercase tracking-widest text-text-3 transition-colors hover:text-text-1"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Your Name" icon={MessageSquare}>
                      <input type="text" placeholder="Alex Johnson" value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputBase} />
                    </Field>
                    <Field label="Email Address" icon={Mail}>
                      <input type="email" required placeholder="alex@company.com" value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputBase} />
                    </Field>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Subject" icon={MessageSquare}>
                      <input type="text" placeholder="Project inquiry" value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })} className={inputBase} />
                    </Field>
                    <Field label="Budget (optional)" icon={Clock}>
                      <select value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })}
                        className={cn(inputBase, "cursor-pointer")}>
                        <option value="">Select range</option>
                        <option value="<500">Under $500</option>
                        <option value="500-2k">$500 – $2,000</option>
                        <option value="2k-5k">$2,000 – $5,000</option>
                        <option value="5k+">$5,000+</option>
                        <option value="fulltime">Full-time role</option>
                      </select>
                    </Field>
                  </div>

                  <Field label="Your Message" icon={Send}>
                    <textarea required rows={6}
                      placeholder="Tell me about your project — what you're building, your timeline, and any specific requirements..."
                      value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className={cn(inputBase, "resize-none leading-relaxed")} />
                  </Field>

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className={cn(
                      "flex w-full items-center justify-center gap-3 rounded-none py-5 font-mono text-sm font-semibold uppercase tracking-[0.16em] transition-all duration-300",
                      status === "sending"
                        ? "cursor-wait bg-surface text-text-3"
                        : "bg-gold text-ink hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(217,178,62,0.25)] active:translate-y-0"
                    )}
                  >
                    {status === "sending" ? (<>Sending<span className="animate-pulse">...</span></>) : (<>Send Message <Send size={18} /></>)}
                  </button>

                  {status === "err" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 font-mono text-sm text-red-400">
                      <AlertCircle size={14} /> Failed to send. Try emailing me directly.
                    </motion.div>
                  )}
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Contact info */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-6">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-text-3">
              <MapPin size={12} /> Abuja, Nigeria · Available globally
            </div>

            <div className="space-y-3">
              <ContactCard href="mailto:bitrusgadzama02@gmail.com" icon={Mail} label="Email"
                handle="bitrusgadzama02@gmail.com" response="Response within 24h" color="#d9b23e" />
              <ContactCard href="mailto:peterjohn2343@gmail.com" icon={Mail} label="Secondary Email"
                handle="peterjohn2343@gmail.com" response="Response within 24h" color="#a8742e" />
              <ContactCard href={`https://instagram.com/${MUSIC_IDS.instagramHandle || "beetrus"}`} icon={MessageSquare}
                label="Instagram DM" handle={`@${MUSIC_IDS.instagramHandle || "beetrus"}`} response="Usually responds in 4h" color="#e0b84a" />
              <ContactCard href="https://github.com/bibi231" icon={Github} label="GitHub"
                handle="github.com/bibi231" response="See my open source work" color="#cfc7b6" />
            </div>

            <div className="rounded-none border border-wire bg-surface/40 p-6">
              <h3 className="mb-4 font-mono text-[10px] uppercase tracking-widest text-text-3">What I build</h3>
              <div className="space-y-3">
                {[
                  { label: "SaaS Products", desc: "Full-stack web apps with auth, billing, and AI" },
                  { label: "AI Integrations", desc: "Gemini, GPT, ElevenLabs, custom LLM pipelines" },
                  { label: "Chrome Extensions", desc: "MV3 extensions with backend integrations" },
                  { label: "Client Sites", desc: "Premium marketing + portfolio sites" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-gold" />
                    <div>
                      <span className="font-mono text-[12px] font-bold text-text-1">{item.label}</span>
                      <span className="font-mono text-[11px] text-text-3"> — {item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
