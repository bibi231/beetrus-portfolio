"use client";

import Link from "next/link";
import { ArrowUpRight, ArrowRight, Play } from "lucide-react";
import { projects } from "@/data/projects";
import { musicData, musicLinks } from "@/data/music";
import { skillDomains } from "@/data/skills";
import { HeroFx } from "./HeroFx";

const GOLD = "#d9b23e";
const TEN_TEN = musicData.releases.find((r) => r.featured) ?? musicData.releases[0];
const TENTEN_COVER = TEN_TEN?.coverImage || "/music/ten-ten-cover.jpg";

// The AI SaaS network (curated, in order) + the sibling Beetrus Studio app.
const NETWORK_IDS = ["trueweb", "support-ai", "reply-ai", "harvest-ai"];
const network = NETWORK_IDS.map((id) => projects.find((p) => p.id === id)).filter(Boolean) as typeof projects;
const STUDIO = { title: "Beetrus Studio", tagline: "AI lyric-video maker for independent artists.", liveUrl: "https://beetrus-studio.vercel.app", accentColor: GOLD, status: "live" as const };
const work = projects.filter((p) => p.featured).slice(0, 4);
const otherLive = projects.filter((p) => p.status === "live" && !NETWORK_IDS.includes(p.id) && !p.featured);

const kicker: React.CSSProperties = { fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: ".26em", textTransform: "uppercase", color: GOLD };
const h2: React.CSSProperties = { fontFamily: "var(--font-display)", textTransform: "uppercase", color: "var(--text-1)", lineHeight: 0.92, fontSize: "clamp(2rem,6vw,4rem)", marginTop: 14 };
const sub: React.CSSProperties = { color: "var(--text-2)", fontSize: 16, lineHeight: 1.65, marginTop: 14, maxWidth: 620 };
const wrap: React.CSSProperties = { maxWidth: 1120, margin: "0 auto", padding: "0 24px" };

function StatusTag({ status }: { status: string }) {
  const c = status === "live" ? "#7CFFB2" : status === "building" ? "#f5b73c" : "var(--text-3)";
  return <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: c, display: "inline-flex", alignItems: "center", gap: 6 }}><span style={{ width: 6, height: 6, borderRadius: "50%", background: c }} /> {status}</span>;
}

export function HomeV2() {
  return (
    <div style={{ background: "var(--ink)", color: "var(--text-1)" }}>
      <style>{`
        @keyframes hv-marq { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        .hv-card { transition: transform .2s ease, border-color .2s ease, background .2s ease; }
        .hv-card:hover { transform: translateY(-4px); border-color: ${GOLD}66 !important; }
        .hv-arrow { transition: transform .2s ease; }
        .hv-card:hover .hv-arrow { transform: translate(3px,-3px); }
        @media (max-width:780px){ .hv-2col{grid-template-columns:1fr !important} .hv-grid3{grid-template-columns:1fr !important} }
      `}</style>

      {/* ── HERO ── */}
      <section style={{ position: "relative", minHeight: "100svh", display: "flex", flexDirection: "column", justifyContent: "flex-end", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${TENTEN_COVER})`, backgroundSize: "cover", backgroundPosition: "center", filter: "saturate(0.9) contrast(1.05)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(11,10,8,0.55) 0%, rgba(11,10,8,0.35) 36%, rgba(11,10,8,0.93) 86%, var(--ink) 100%)" }} />
          <HeroFx />
        </div>
        <div style={{ position: "absolute", top: 92, left: 24 }}>
          <span style={{ ...kicker, color: "var(--text-1)", textShadow: "0 1px 10px rgba(0,0,0,.7)" }}>Abuja, Nigeria <span style={{ color: GOLD }}>/</span> Engineer · Artist</span>
        </div>
        <div style={{ ...wrap, position: "relative", paddingBottom: 64, width: "100%" }}>
          <p style={{ ...kicker, marginBottom: 10 }}>Engineer · Founder · Recording Artist</p>
          <h1 style={{ fontFamily: "var(--font-display)", textTransform: "uppercase", lineHeight: 0.84, fontSize: "var(--type-mega)", letterSpacing: ".005em" }}>Beetrus</h1>
          <p style={{ ...sub, fontSize: 18, color: "var(--text-1)" }}>
            I build AI products that ship and make money — and I make the music that plays while they run.
            One person, two worlds: <span style={{ color: GOLD }}>software</span> &amp; <span style={{ color: GOLD }}>sound</span>.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 30 }}>
            <a href="#work" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: GOLD, color: "#0b0a08", padding: "13px 26px", fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", textDecoration: "none", fontWeight: 700 }}>
              Enter the Lab <ArrowRight size={15} />
            </a>
            <a href="#music" style={{ display: "inline-flex", alignItems: "center", gap: 8, border: "1px solid var(--wire)", color: "var(--text-1)", padding: "13px 26px", fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", textDecoration: "none" }}>
              <Play size={14} fill="currentColor" /> Enter the Booth
            </a>
          </div>
        </div>
        <div style={{ ...wrap, position: "relative", paddingBottom: 22, display: "flex", alignItems: "center", gap: 10, fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: ".25em", textTransform: "uppercase", color: "var(--text-3)" }}>
          <span style={{ width: 32, height: 1, background: "var(--text-3)" }} /> Scroll
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div style={{ borderTop: "1px solid var(--wire)", borderBottom: "1px solid var(--wire)", padding: "16px 0", overflow: "hidden", WebkitMaskImage: "linear-gradient(90deg,transparent,#000 10%,#000 90%,transparent)" }}>
        <div style={{ display: "inline-flex", gap: 36, whiteSpace: "nowrap", animation: "hv-marq 28s linear infinite" }}>
          {[...Array(2)].flatMap((_, k) =>
            ["AFROSOUNDS", "DRILL", "R&B", "NEXT.JS", "AI PRODUCTS", "SAAS", "REACT", "POSTGRES", "PRODUCER", "FOUNDER"].map((t, i) => (
              <span key={`${k}-${i}`} style={{ fontFamily: "var(--font-display)", fontSize: 24, color: i % 2 ? "var(--text-3)" : GOLD }}>{t} <span style={{ color: "var(--wire)" }}>✦</span></span>
            ))
          )}
        </div>
      </div>

      {/* ── THE NETWORK ── */}
      <section style={{ ...wrap, padding: "80px 24px" }}>
        <p style={kicker}>The Network</p>
        <h2 style={h2}>An AI network<br />that ships &amp; earns.</h2>
        <p style={sub}>A four-product AI network plus a lyric-video studio — all built, deployed, and billed in NGN, run from one studio: TrueWeb Solutions.</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginTop: 32 }} className="hv-grid3">
          {[...network, STUDIO].map((p) => (
            <a key={p.title} href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="hv-card"
              style={{ display: "block", padding: 22, border: "1px solid var(--wire)", borderRadius: 4, textDecoration: "none", background: "rgba(255,255,255,0.012)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ width: 30, height: 30, borderRadius: 8, background: p.accentColor, display: "grid", placeItems: "center", color: "#0b0a08", fontWeight: 800, fontFamily: "var(--font-display)", fontSize: 15 }}>{p.title[0]}</span>
                <ArrowUpRight className="hv-arrow" size={16} color="var(--text-3)" />
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 19, textTransform: "uppercase", marginTop: 16, color: "var(--text-1)" }}>{p.title}</div>
              <p style={{ color: "var(--text-2)", fontSize: 13, lineHeight: 1.55, marginTop: 8, minHeight: 54 }}>{p.tagline}</p>
              <div style={{ marginTop: 6 }}><StatusTag status={p.status} /></div>
            </a>
          ))}
        </div>
      </section>

      {/* ── SELECTED WORK ── */}
      <section id="work" style={{ borderTop: "1px solid var(--wire)", padding: "80px 0" }}>
        <div style={wrap}>
          <p style={kicker}>Selected Work</p>
          <h2 style={h2}>Things I&apos;ve<br />designed &amp; built.</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 32 }} className="hv-2col">
            {work.map((p) => (
              <a key={p.id} href={p.liveUrl || "#"} target={p.liveUrl ? "_blank" : undefined} rel="noopener noreferrer" className="hv-card"
                style={{ display: "block", padding: 26, border: "1px solid var(--wire)", borderRadius: 4, textDecoration: "none", background: `linear-gradient(180deg, ${p.accentColor}0c, transparent)` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: 26, textTransform: "uppercase", color: "var(--text-1)" }}>{p.title}</div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-3)", marginTop: 4 }}>{p.year} · {p.category}</div>
                  </div>
                  <ArrowUpRight className="hv-arrow" size={18} color={p.accentColor} />
                </div>
                <p style={{ color: "var(--text-2)", fontSize: 14.5, lineHeight: 1.6, marginTop: 14 }}>{p.tagline}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 16 }}>
                  {p.tags.slice(0, 5).map((t) => (
                    <span key={t} style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-2)", border: "1px solid var(--wire)", borderRadius: 999, padding: "3px 9px" }}>{t}</span>
                  ))}
                </div>
              </a>
            ))}
          </div>
          {otherLive.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 18 }}>
              {otherLive.map((p) => (
                <a key={p.id} href={p.liveUrl || "#"} target={p.liveUrl ? "_blank" : undefined} rel="noopener noreferrer"
                  style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-2)", border: "1px solid var(--wire)", borderRadius: 999, padding: "7px 14px", textDecoration: "none" }}>
                  {p.title} <span style={{ color: p.accentColor }}>↗</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── TWO WORLDS ── */}
      <section style={{ borderTop: "1px solid var(--wire)", padding: "80px 0" }}>
        <div style={{ ...wrap, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="hv-2col">
          <div style={{ padding: 32, border: "1px solid var(--wire)", borderRadius: 4 }}>
            <p style={kicker}>World I — Software</p>
            <h3 style={{ ...h2, fontSize: "clamp(1.6rem,4vw,2.4rem)" }}>The Lab</h3>
            <p style={{ ...sub, fontSize: 15 }}>Fullstack engineer &amp; SaaS founder. React/Next, Node, Postgres. I take products from idea to deployed, paid, and monitored — and I run the studio that ships them.</p>
            <a href="#work" style={{ ...kicker, color: GOLD, display: "inline-block", marginTop: 18, textDecoration: "none" }}>See the work →</a>
          </div>
          <div style={{ padding: 32, border: "1px solid var(--wire)", borderRadius: 4, background: `linear-gradient(180deg, ${GOLD}10, transparent)` }}>
            <p style={kicker}>World II — Sound</p>
            <h3 style={{ ...h2, fontSize: "clamp(1.6rem,4vw,2.4rem)" }}>The Booth</h3>
            <p style={{ ...sub, fontSize: 15 }}>{musicData.bio}</p>
            <a href="#music" style={{ ...kicker, color: GOLD, display: "inline-block", marginTop: 18, textDecoration: "none" }}>Hear the music →</a>
          </div>
        </div>
      </section>

      {/* ── MUSIC: TEN/TEN ── */}
      <section id="music" style={{ borderTop: "1px solid var(--wire)", padding: "80px 0" }}>
        <div style={{ ...wrap, display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: 32, alignItems: "center" }} className="hv-2col">
          <div style={{ aspectRatio: "1/1", borderRadius: 6, overflow: "hidden", border: "1px solid var(--wire)", backgroundImage: `url(${TENTEN_COVER})`, backgroundSize: "cover", backgroundPosition: "center", boxShadow: `0 30px 80px -30px ${GOLD}55` }} />
          <div>
            <p style={kicker}>Featured Release</p>
            <h2 style={h2}>{TEN_TEN?.title ?? "TEN/TEN"}</h2>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-3)", marginTop: 8 }}>{TEN_TEN?.type} · {TEN_TEN?.year}{TEN_TEN?.subtitle ? ` · ${TEN_TEN.subtitle}` : ""}</p>
            <p style={sub}>Afrosounds, R&amp;B and Drill folded into a distinctly Nigerian, late-night sound. Listen everywhere:</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 20 }}>
              {[
                { label: "Listen Everywhere", href: musicLinks.tenTenSmartLink, primary: true },
                { label: "Spotify", href: musicLinks.tenTenSpotify },
                { label: "Audiomack", href: musicLinks.tenTenAudiomack },
                { label: "YouTube", href: musicLinks.tenTenYoutube },
              ].map((l) => (
                <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                  style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: ".08em", textDecoration: "none", padding: "10px 18px", borderRadius: 999,
                    background: l.primary ? GOLD : "transparent", color: l.primary ? "#0b0a08" : "var(--text-1)", border: l.primary ? "none" : "1px solid var(--wire)", fontWeight: l.primary ? 700 : 400 }}>
                  {l.label}{l.primary ? "" : " ↗"}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── STACK ── */}
      <section style={{ borderTop: "1px solid var(--wire)", padding: "80px 0" }}>
        <div style={wrap}>
          <p style={kicker}>The Stack</p>
          <h2 style={h2}>What I build with.</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 14, marginTop: 32 }}>
            {skillDomains.map((d) => (
              <div key={d.id} style={{ padding: 20, border: "1px solid var(--wire)", borderRadius: 4 }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase", color: GOLD }}>{d.label}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 12 }}>
                  {d.skills.slice(0, 7).map((s) => (
                    <span key={s.name} style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-2)", border: "1px solid var(--wire)", borderRadius: 999, padding: "4px 10px" }}>{s.name}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS + CTA ── */}
      <section id="contact" style={{ borderTop: "1px solid var(--wire)", padding: "84px 0 96px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(60% 100% at 50% 0%, ${GOLD}18, transparent 65%)` }} />
        <div style={{ ...wrap, position: "relative" }}>
          <div style={{ display: "flex", justifyContent: "center", gap: 40, flexWrap: "wrap", marginBottom: 48 }}>
            {[
              { n: `${projects.filter((p) => p.status === "live").length}+`, l: "Live products" },
              { n: "4", l: "AI network apps" },
              { n: "1", l: "Recording artist" },
              { n: "NGN", l: "Billed locally" },
            ].map((s) => (
              <div key={s.l}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 44, color: GOLD }}>{s.n}</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--text-3)", marginTop: 4 }}>{s.l}</div>
              </div>
            ))}
          </div>
          <h2 style={{ ...h2, fontSize: "clamp(2rem,6vw,3.6rem)" }}>Build with me, or<br />book the booth.</h2>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginTop: 28 }}>
            <a href="mailto:peterjohn2343@gmail.com" style={{ background: GOLD, color: "#0b0a08", padding: "14px 30px", fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", textDecoration: "none", fontWeight: 700 }}>Get in touch</a>
            <a href="https://trueweb.com.ng" target="_blank" rel="noreferrer" style={{ border: "1px solid var(--wire)", color: "var(--text-1)", padding: "14px 30px", fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", textDecoration: "none" }}>Hire TrueWeb ↗</a>
          </div>
        </div>
      </section>
    </div>
  );
}
