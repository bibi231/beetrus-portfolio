"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail, MessageSquare, Send, Github, Linkedin,
  Twitter, ArrowRight, CheckCircle2, AlertCircle,
  Sparkles, Clock, MapPin
} from "lucide-react";
import { toast } from "sonner";
import { MUSIC_IDS } from "@/data/musicIds";
import { cn } from "@/lib/utils";

/* ─── Availability Badge ── */
function AvailabilityPulse() {
  return (
    <div className="inline-flex items-center gap-2.5 bg-lime/8 border border-lime/20 px-4 py-2 rounded-full">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-lime" />
      </span>
      <span className="font-mono text-[11px] uppercase tracking-widest text-lime">Available for work</span>
    </div>
  );
}

/* ─── Contact Card ── */
function ContactCard({
  href, icon: Icon, label, handle, response, color
}: {
  href: string; icon: any; label: string; handle: string; response: string; color: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      className="group flex items-start gap-4 p-5 rounded-2xl bg-surface/40 border border-wire hover:border-[var(--c)] transition-all duration-300 hover:-translate-y-0.5"
      style={{ ["--c" as any]: color }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors"
        style={{ background: `${color}15`, border: `1px solid ${color}25` }}
      >
        <Icon size={20} style={{ color }} />
      </div>
      <div className="min-w-0">
        <div className="font-display text-base font-bold text-text-1 mb-0.5">{label}</div>
        <div className="font-mono text-[11px] text-text-3 mb-2 truncate">{handle}</div>
        <div className="flex items-center gap-1.5 font-mono text-[10px] text-text-3 uppercase tracking-widest">
          <Clock size={10} /> {response}
        </div>
      </div>
      <ArrowRight
        size={16}
        className="ml-auto shrink-0 text-text-3 group-hover:text-[var(--c)] transition-colors translate-x-0 group-hover:translate-x-1 duration-200"
      />
    </a>
  );
}

/* ─── Form Field ── */
function Field({
  label, icon: Icon, children
}: {
  label: string; icon: any; children: React.ReactNode;
}) {
  return (
    <div className="group/field space-y-2">
      <label className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-text-3 group-focus-within/field:text-pulse transition-colors">
        <Icon size={10} />
        {label}
      </label>
      {children}
    </div>
  );
}

/* ─── Page ── */
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
        toast.success("Message sent! I\'ll be in touch soon.");
      } else {
        setStatus("err");
        toast.error("Something went wrong — try emailing me directly.");
      }
    } catch {
      setStatus("err");
      toast.error("Could not connect — try emailing me directly.");
    }
  };

  const inputBase = "w-full bg-ink/60 border border-wire rounded-xl px-5 py-4 text-text-1 placeholder:text-text-3 font-body text-[15px] focus:outline-none focus:border-pulse transition-all focus:bg-surface/40";

  return (
    <div className="min-h-screen bg-ink">

      {/* ── Atmospheric bg ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-pulse/4 blur-[160px] rounded-full translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-ember/4 blur-[120px] rounded-full -translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-32">

        {/* ── Header ── */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <AvailabilityPulse />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="font-display text-6xl md:text-8xl lg:text-[9rem] font-black tracking-tight leading-[0.88] mb-6"
          >
            Let&apos;s build
            <br />
            <span className="text-pulse">something</span>
            <br />
            great.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-text-2 text-lg max-w-lg leading-relaxed"
          >
            Open to freelance projects, SaaS collaborations, and full-time opportunities.
            Based in Nigeria — working with clients worldwide.
          </motion.p>
        </div>

        {/* ── Two-column layout ── */}
        <div className="grid lg:grid-cols-[1fr,420px] gap-16 items-start">

          {/* Left: Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative"
          >
            <AnimatePresence mode="wait">
              {status === "ok" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-24 gap-6"
                >
                  <div className="w-20 h-20 rounded-full bg-lime/10 border border-lime/20 flex items-center justify-center">
                    <CheckCircle2 size={36} className="text-lime" />
                  </div>
                  <div>
                    <h3 className="font-display text-3xl font-bold text-text-1 mb-2">Message received.</h3>
                    <p className="text-text-2">I\'ll get back to you within 24 hours.</p>
                  </div>
                  <button
                    onClick={() => setStatus("idle")}
                    className="font-mono text-[11px] uppercase tracking-widest text-text-3 hover:text-text-1 transition-colors"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  {/* Row: Name + Email */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Your Name" icon={Sparkles}>
                      <input
                        type="text"
                        placeholder="Alex Johnson"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        className={inputBase}
                      />
                    </Field>
                    <Field label="Email Address" icon={Mail}>
                      <input
                        type="email"
                        required
                        placeholder="alex@company.com"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        className={inputBase}
                      />
                    </Field>
                  </div>

                  {/* Row: Subject + Budget */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Subject" icon={MessageSquare}>
                      <input
                        type="text"
                        placeholder="Project inquiry"
                        value={form.subject}
                        onChange={e => setForm({ ...form, subject: e.target.value })}
                        className={inputBase}
                      />
                    </Field>
                    <Field label="Budget (optional)" icon={Sparkles}>
                      <select
                        value={form.budget}
                        onChange={e => setForm({ ...form, budget: e.target.value })}
                        className={cn(inputBase, "cursor-pointer")}
                      >
                        <option value="">Select range</option>
                        <option value="<500">Under $500</option>
                        <option value="500-2k">$500 – $2,000</option>
                        <option value="2k-5k">$2,000 – $5,000</option>
                        <option value="5k+">$5,000+</option>
                        <option value="fulltime">Full-time role</option>
                      </select>
                    </Field>
                  </div>

                  {/* Message */}
                  <Field label="Your Message" icon={Send}>
                    <textarea
                      required
                      rows={6}
                      placeholder="Tell me about your project — what you\'re building, your timeline, and any specific requirements..."
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      className={cn(inputBase, "resize-none leading-relaxed")}
                    />
                  </Field>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className={cn(
                      "w-full py-5 rounded-2xl font-display font-bold text-lg tracking-wide transition-all duration-300 flex items-center justify-center gap-3",
                      status === "sending"
                        ? "bg-surface text-text-3 cursor-wait"
                        : "bg-pulse text-ink hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(0,229,255,0.25)] active:translate-y-0"
                    )}
                  >
                    {status === "sending" ? (
                      <>Sending<span className="animate-pulse">...</span></>
                    ) : (
                      <>Send Message <Send size={18} /></>
                    )}
                  </button>

                  {status === "err" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-2 text-sm text-red-400 font-mono"
                    >
                      <AlertCircle size={14} /> Failed to send. Try emailing me directly.
                    </motion.div>
                  )}
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Right: Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Location */}
            <div className="flex items-center gap-2 font-mono text-[11px] text-text-3 uppercase tracking-widest">
              <MapPin size={12} />
              Abuja, Nigeria · Available globally
            </div>

            {/* Contact cards */}
            <div className="space-y-3">
              <ContactCard
                href="mailto:bitrusgadzama02@gmail.com"
                icon={Mail}
                label="Email"
                handle="bitrusgadzama02@gmail.com"
                response="Response within 24h"
                color="#00e5ff"
              />
              <ContactCard
                href="mailto:peterjohn2343@gmail.com"
                icon={Mail}
                label="Secondary Email"
                handle="peterjohn2343@gmail.com"
                response="Response within 24h"
                color="#6c63ff"
              />
              <ContactCard
                href={`https://instagram.com/${MUSIC_IDS.instagramHandle || "beetrus"}`}
                icon={MessageSquare}
                label="Instagram DM"
                handle={`@${MUSIC_IDS.instagramHandle || "beetrus"}`}
                response="Usually responds in 4h"
                color="#E1306C"
              />
              <ContactCard
                href="https://github.com/bibi231"
                icon={Github}
                label="GitHub"
                handle="github.com/bibi231"
                response="See my open source work"
                color="#e2e8f0"
              />
            </div>

            {/* What I work on */}
            <div className="p-6 rounded-2xl bg-surface/40 border border-wire">
              <h3 className="font-mono text-[10px] uppercase tracking-widest text-text-3 mb-4">What I build</h3>
              <div className="space-y-3">
                {[
                  { label: "SaaS Products", desc: "Full-stack web apps with auth, billing, and AI" },
                  { label: "AI Integrations", desc: "Gemini, GPT, ElevenLabs, custom LLM pipelines" },
                  { label: "Chrome Extensions", desc: "MV3 extensions with backend integrations" },
                  { label: "Client Sites", desc: "Premium marketing + portfolio sites" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-pulse mt-2 shrink-0" />
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
