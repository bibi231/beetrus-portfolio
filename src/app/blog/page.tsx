import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { blogPostsByDate } from "@/data/blog";
import { BlogIndexJsonLd } from "@/components/seo/json-ld";

const title = "Journal";
const description =
  "Writeups on building AI products, shipping websites for Nigerian businesses, and the music — from Bitrus Sariki (Beetrus) and TrueWeb Solutions.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/blog",
    types: { "application/rss+xml": [{ url: "/blog/rss.xml", title: "Beetrus — Journal" }] },
  },
  openGraph: {
    title: `${title} — Beetrus`,
    description,
    url: "/blog",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Beetrus — Journal" }],
  },
};

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export default function BlogIndexPage() {
  const [lead, ...rest] = blogPostsByDate;
  return (
    <div className="min-h-screen bg-ink">
      <BlogIndexJsonLd />

      {/* Header */}
      <section className="border-b border-wire bg-surface/30 pt-12 pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-gold">The Journal</p>
          <h1 className="mt-4 font-display text-5xl uppercase tracking-tight text-text-1 md:text-7xl">
            Writing<span className="text-gold">.</span>
          </h1>
          <p className="mt-4 max-w-2xl font-body text-text-2">{description}</p>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Lead post */}
          <Link href={`/blog/${lead.slug}`} className="group grid gap-8 border border-wire bg-surface/40 p-5 transition-colors hover:border-gold/50 md:grid-cols-2 md:p-6">
            <div className="relative aspect-[1200/630] overflow-hidden border border-wire bg-ink">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={lead.cover} alt={lead.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-text-3">
                <span className="text-gold">{lead.category}</span>
                <span>·</span>
                <span>{fmtDate(lead.date)}</span>
                <span>·</span>
                <span>{lead.readingMinutes} min</span>
              </div>
              <h2 className="mt-3 font-display text-3xl uppercase leading-[0.98] tracking-tight text-text-1 md:text-4xl">
                {lead.title}
              </h2>
              <p className="mt-4 font-body text-text-2">{lead.excerpt}</p>
              <span className="mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-gold">
                Read <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>

          {/* Rest grid */}
          <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex flex-col border border-wire bg-surface/40 transition-colors hover:border-gold/50">
                <div className="relative aspect-[1200/630] overflow-hidden border-b border-wire bg-ink">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={post.cover} alt={post.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-text-3">
                    <span className="text-gold">{post.category}</span>
                    <span>·</span>
                    <span>{post.readingMinutes} min</span>
                  </div>
                  <h3 className="mt-3 font-display text-xl uppercase leading-tight tracking-tight text-text-1">
                    {post.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 font-body text-sm text-text-2">{post.excerpt}</p>
                  <span className="mt-auto pt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-text-3">
                    {fmtDate(post.date)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
