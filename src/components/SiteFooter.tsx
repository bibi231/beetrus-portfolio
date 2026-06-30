"use client";

import { useState } from "react";

// Network-style footer for the Beetrus portfolio — matches the TrueWeb network
// footer, in Beetrus gold so the portfolio + studio read as one brand family.
// Self-contained inline styles (works alongside the portfolio's Tailwind).

const GOLD = "#d9b23e";
const NETWORK = [
  { name: "Beetrus Studio", desc: "AI lyric-video maker", link: "https://beetrus-studio.vercel.app", color: "#d9b23e" },
  { name: "TrueWeb", desc: "Web & software solutions", link: "https://trueweb.com.ng", color: "#00d4d4" },
  { name: "SupportAI", desc: "AI customer support", link: "https://supportai.com.ng", color: "#10b981" },
  { name: "ReplyAI", desc: "AI email replies", link: "https://replyai.com.ng", color: "#6366f1" },
  { name: "HarvestAI", desc: "AI data & lead gen", link: "https://harvestai.com.ng", color: "#f5a623" },
];
const SOCIALS = [
  { label: "X", href: "https://x.com", d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
  { label: "GitHub", href: "https://github.com/bibi231", d: "M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 016 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0024 12.5C24 5.87 18.63.5 12 .5z" },
  { label: "Instagram", href: "https://instagram.com", d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" },
];

export function SiteFooter() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [nl, setNl] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const year = new Date().getFullYear();

  async function subscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) { setNl("err"); return; }
    setNl("loading");
    try {
      await fetch("https://trueweb.com.ng/api/newsletter/subscribe", {
        method: "POST", mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "beetrus-portfolio-footer" }),
      });
      setNl("ok");
    } catch { setNl("ok"); }
  }

  const col: React.CSSProperties = { display: "flex", flexDirection: "column", gap: 8 };
  const h: React.CSSProperties = { fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", color: GOLD, fontWeight: 700, marginBottom: 4 };
  const a: React.CSSProperties = { color: "rgba(244,241,234,0.62)", textDecoration: "none", fontSize: 13.5 };

  return (
    <footer style={{ background: "linear-gradient(180deg,#0a0a0f,#050507)", borderTop: "1px solid rgba(255,255,255,0.07)", color: "#f4f1ea", fontFamily: "system-ui, sans-serif" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "56px 24px 28px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: 32 }} className="bf-grid">
          <div>
            <div style={{ fontWeight: 800, fontSize: 22, letterSpacing: "-.01em" }}>Bee<span style={{ color: GOLD }}>trus</span></div>
            <p style={{ color: "rgba(244,241,234,0.55)", fontSize: 13.5, lineHeight: 1.7, marginTop: 10, maxWidth: 290 }}>
              Bitrus Sariki — fullstack engineer, SaaS founder, and Afrosounds artist. Building the TrueWeb network from Abuja.
            </p>
            <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
              {SOCIALS.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  style={{ width: 34, height: 34, borderRadius: 8, border: "1px solid rgba(255,255,255,0.12)", display: "grid", placeItems: "center", color: "rgba(244,241,234,0.7)" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d={s.d} /></svg>
                </a>
              ))}
            </div>
          </div>
          <div style={col}>
            <span style={h}>Explore</span>
            <a style={a} href="/">Home</a>
            <a style={a} href="/#projects">Projects</a>
            <a style={a} href="/#music">Music</a>
            <a style={a} href="/#about">About</a>
          </div>
          <div style={col}>
            <span style={h}>Build</span>
            <a style={a} href="https://beetrus-studio.vercel.app" target="_blank" rel="noreferrer">Beetrus Studio ↗</a>
            <a style={a} href="https://trueweb.com.ng" target="_blank" rel="noreferrer">TrueWeb ↗</a>
            <button onClick={() => setOpen((o) => !o)} style={{ ...a, background: "none", border: "none", cursor: "pointer", textAlign: "left", padding: 0 }}>
              TrueWeb Network {open ? "▴" : "▾"}
            </button>
          </div>
          <div style={col}>
            <span style={h}>Connect</span>
            <a style={a} href="mailto:peterjohn2343@gmail.com">Email</a>
            <a style={a} href="https://github.com/bibi231" target="_blank" rel="noreferrer">GitHub ↗</a>
            <a style={a} href="/#contact">Contact</a>
          </div>
        </div>

        {open && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 10, marginTop: 28 }}>
            {NETWORK.map((p) => (
              <a key={p.name} href={p.link} target="_blank" rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, textDecoration: "none" }}>
                <span style={{ width: 22, height: 22, borderRadius: 6, background: p.color, display: "grid", placeItems: "center", color: "#0a0a0f", fontWeight: 800, fontSize: 11 }}>{p.name[0]}</span>
                <span style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ color: "#f4f1ea", fontSize: 13, fontWeight: 600 }}>{p.name}</span>
                  <span style={{ color: "rgba(244,241,234,0.45)", fontSize: 11 }}>{p.desc}</span>
                </span>
              </a>
            ))}
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap", marginTop: 28, padding: "20px 0 0", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ maxWidth: 320 }}>
            <div style={{ fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", color: GOLD, fontWeight: 700 }}>TrueWeb Network Newsletter</div>
            <div style={{ color: "rgba(244,241,234,0.5)", fontSize: 12.5, marginTop: 4 }}>Product updates across the network — one email a week.</div>
          </div>
          {nl === "ok" ? (
            <div style={{ color: GOLD, fontSize: 13 }}>✓ Subscribed — check your inbox.</div>
          ) : (
            <form onSubmit={subscribe} style={{ display: "flex", gap: 8 }}>
              <input type="email" required placeholder="your@email.com" value={email} onChange={(e) => { setEmail(e.target.value); if (nl === "err") setNl("idle"); }}
                style={{ background: "#0a0a0f", border: `1px solid ${nl === "err" ? "#ff6b6b" : "rgba(255,255,255,0.14)"}`, borderRadius: 8, color: "#f4f1ea", padding: "9px 12px", fontSize: 13, minWidth: 200 }} />
              <button type="submit" disabled={nl === "loading"} style={{ background: GOLD, color: "#0a0a0f", border: "none", borderRadius: 8, padding: "9px 16px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
                {nl === "loading" ? "…" : "Subscribe"}
              </button>
            </form>
          )}
        </div>

        <div style={{ marginTop: 24, color: "rgba(244,241,234,0.4)", fontSize: 12, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
          <span>© {year} Beetrus · part of the <a href="https://trueweb.com.ng" target="_blank" rel="noreferrer" style={{ color: "rgba(244,241,234,0.6)" }}>TrueWeb Network</a> 🇳🇬</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ade80", display: "inline-block" }} /> Available for work</span>
        </div>
      </div>
      <style>{`@media (max-width:760px){.bf-grid{grid-template-columns:1fr 1fr !important;}}`}</style>
    </footer>
  );
}
