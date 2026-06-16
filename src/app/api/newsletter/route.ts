import { NextResponse } from "next/server";

export const runtime = "nodejs";

// In-memory per-IP rate limit (fixed window). Per-instance on Vercel, but enough
// to blunt scripted abuse of an unauthenticated send endpoint (email-bombing).
const buckets = new Map<string, { count: number; resetAt: number }>();
function rateLimited(ip: string, limit = 3, windowMs = 60_000): boolean {
  const now = Date.now();
  const b = buckets.get(ip);
  if (!b || b.resetAt <= now) { buckets.set(ip, { count: 1, resetAt: now + windowMs }); return false; }
  b.count += 1;
  return b.count > limit;
}
function clientIp(req: Request): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0].trim() || req.headers.get("x-real-ip") || "unknown";
}

// Newsletter signup with automation:
//  1. Adds the subscriber to a Resend Audience (if RESEND_AUDIENCE_ID is set)
//  2. Fires an automated TEN/TEN welcome email
// Gracefully degrades — if Resend isn't configured it still returns success so
// the form never hard-fails in front of a fan.
export async function POST(req: Request) {
  try {
    // Throttle hard — 3 signups per IP per minute — to kill the email-bomb vector.
    if (rateLimited(clientIp(req))) {
      return NextResponse.json({ error: "Too many requests. Try again shortly." }, { status: 429 });
    }

    const { email } = await req.json();
    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
    }
    const clean = email.trim().toLowerCase();

    const key = process.env.RESEND_API_KEY;
    if (key) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(key);

        // 1. Add to audience (automation list). Prefer an explicit env override,
        //    otherwise auto-discover the account's default audience so no manual
        //    audience ID is ever needed (Resend's new UI hides it anyway).
        let audienceId = process.env.RESEND_AUDIENCE_ID;
        if (!audienceId) {
          const audiences = await resend.audiences.list().catch(() => null);
          audienceId = audiences?.data?.data?.[0]?.id;
        }
        if (audienceId) {
          await resend.contacts.create({ email: clean, audienceId, unsubscribed: false }).catch(() => {});
        }

        // 2. Automated TEN/TEN welcome — ONLY from an explicitly configured
        //    (Resend-verified) sender. No hardcoded fallback, so we never try to
        //    send from an unverified domain (which would silently fail/spam-flag).
        const from = process.env.EMAIL_FROM;
        if (from) await resend.emails.send({
          from,
          to: clean,
          subject: "You're in — TEN/TEN: The Lost Files",
          html: `<div style="font-family:'Space Grotesk',system-ui,sans-serif;max-width:480px;margin:0 auto;background:#0b0a08;color:#f2ece0;padding:32px;border-radius:2px">
            <div style="font-family:Anton,Arial Narrow,sans-serif;font-size:40px;letter-spacing:.02em;color:#f2ece0;line-height:1">TEN/TEN</div>
            <div style="font-family:Anton,sans-serif;font-size:18px;color:#c9a227;margin-bottom:18px">THE LOST FILES</div>
            <p style="line-height:1.7;color:#cfc7b6">You're on the list. New drops, shows, and behind-the-booth — straight to you.</p>
            <p style="margin:22px 0"><a href="https://ffm.to/tenten-lost-files" style="display:inline-block;background:#c9a227;color:#0b0a08;font-weight:700;padding:12px 22px;border-radius:2px;text-decoration:none;font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:.12em;text-transform:uppercase">Listen to TEN/TEN</a></p>
            <p style="color:#7a7264;font-size:12px">— Beetrus · part of the TrueWeb Network</p>
          </div>`,
        }).catch(() => {});
      } catch (e) {
        console.error("[newsletter] resend error:", e);
        // fall through to success — don't fail the fan's signup
      }
    } else {
      console.log(`[newsletter] (no RESEND_API_KEY) would subscribe: ${clean}`);
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
