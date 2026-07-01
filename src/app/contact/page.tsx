"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MessageSquare, Send, CheckCircle, Github } from "lucide-react";

const GOLD = "#d9b23e";

// Ported from the TrueWeb contact page, recolored to the Beetrus gold palette.
export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: { preventDefault(): void }) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "beetrus-portfolio-contact" }),
      });
      if (!res.ok) throw new Error();
      setStatus("ok");
    } catch { setStatus("err"); }
  };

  const contacts = [
    { Icon: Mail, label: "General / Bookings", value: "peterjohn2343@gmail.com", href: "mailto:peterjohn2343@gmail.com" },
    { Icon: Github, label: "Code", value: "github.com/bibi231", href: "https://github.com/bibi231" },
  ];

  return (
    <div className="min-h-screen bg-ink">
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "88px 24px 100px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 80, alignItems: "start" }} className="bt-contact-grid">
          {/* Left — intro + contacts */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}>
            <span className="font-mono" style={{ fontSize: 12, letterSpacing: "0.26em", textTransform: "uppercase", color: GOLD }}>Get in touch</span>
            <div style={{ width: 46, height: 2, background: GOLD, margin: "14px 0 22px" }} />
            <h1 className="font-display uppercase" style={{ fontSize: "clamp(2rem, 5vw, 3.4rem)", lineHeight: 0.95, color: "var(--text-1, #f4f1ea)", marginBottom: 18 }}>
              Let&apos;s build<br />something together
            </h1>
            <p style={{ fontSize: 16, color: "var(--text-2, rgba(244,241,234,0.62))", lineHeight: 1.7, marginBottom: 34, maxWidth: 460 }}>
              Engineering contracts, SaaS collaborations, or bookings — fill the form or reach me directly. I respond within 24 hours.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {contacts.map((c) => (
                <a key={c.label} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", background: "var(--surface, rgba(255,255,255,0.03))", border: "1px solid var(--wire, rgba(255,255,255,0.1))", borderRadius: 12, textDecoration: "none" }}>
                  <span style={{ width: 36, height: 36, borderRadius: 9, background: `${GOLD}14`, border: `1px solid ${GOLD}26`, display: "grid", placeItems: "center", color: GOLD, flexShrink: 0 }}>
                    <c.Icon size={16} strokeWidth={1.8} />
                  </span>
                  <span>
                    <span style={{ display: "block", fontSize: 11, color: "var(--text-3, rgba(244,241,234,0.4))", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 1 }}>{c.label}</span>
                    <span style={{ fontSize: 14, color: GOLD, fontWeight: 600 }}>{c.value}</span>
                  </span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5, delay: 0.1 }}>
            {status === "ok" ? (
              <div style={{ padding: 40, background: `${GOLD}0a`, border: `1px solid ${GOLD}33`, borderRadius: 18, textAlign: "center" }}>
                <CheckCircle size={48} color={GOLD} style={{ margin: "0 auto 16px", display: "block" }} strokeWidth={1.5} />
                <h3 className="font-display uppercase" style={{ fontSize: 24, marginBottom: 8, color: "var(--text-1, #f4f1ea)" }}>Message sent</h3>
                <p style={{ fontSize: 14, color: "var(--text-2, rgba(244,241,234,0.62))" }}>I&apos;ll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} className="bt-contact-row">
                  {[{ key: "name", label: "Name", type: "text", placeholder: "Your name" }, { key: "email", label: "Email", type: "email", placeholder: "you@example.com" }].map((f) => (
                    <div key={f.key}>
                      <label style={{ display: "block", fontSize: 12, color: "var(--text-2, rgba(244,241,234,0.62))", marginBottom: 6, fontWeight: 600 }}>{f.label}</label>
                      <input type={f.type} required placeholder={f.placeholder} value={form[f.key as keyof typeof form]}
                        onChange={(e) => setForm((prev) => ({ ...prev, [f.key]: e.target.value }))} className="bt-input" />
                    </div>
                  ))}
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, color: "var(--text-2, rgba(244,241,234,0.62))", marginBottom: 6, fontWeight: 600 }}>Message</label>
                  <textarea required rows={5} placeholder="Tell me about your project..." value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))} className="bt-input" style={{ resize: "vertical", minHeight: 120 }} />
                </div>
                {status === "err" && <p style={{ fontSize: 12, color: "#fca5a5" }}>Something went wrong — email me directly.</p>}
                <button type="submit" disabled={status === "loading"}
                  style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, background: GOLD, color: "#0b0a08", border: "none", borderRadius: 10, padding: "13px 22px", fontFamily: "var(--font-mono, monospace)", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", cursor: "pointer", opacity: status === "loading" ? 0.7 : 1 }}>
                  <Send size={15} /> {status === "loading" ? "Sending…" : "Send message"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
        <style>{`
          .bt-input{ width:100%; box-sizing:border-box; background:var(--ink,#0b0a08); border:1px solid var(--wire,rgba(255,255,255,0.12)); border-radius:10px; color:var(--text-1,#f4f1ea); padding:12px 14px; font-size:15px; outline:none; transition:border-color .15s; }
          .bt-input:focus{ border-color:${GOLD}; }
          .bt-input::placeholder{ color:var(--text-3,rgba(244,241,234,0.4)); }
          @media (max-width:768px){ .bt-contact-grid{ grid-template-columns:1fr !important; gap:48px !important; } }
          @media (max-width:480px){ .bt-contact-row{ grid-template-columns:1fr !important; } }
        `}</style>
      </section>
    </div>
  );
}
