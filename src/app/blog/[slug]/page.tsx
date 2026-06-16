import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { blogPosts, blogPostsByDate, getPost, type Block } from "@/data/blog";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: ["Bitrus Sariki"],
      tags: post.tags,
      images: [{ url: post.cover, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.cover],
    },
  };
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function renderBlock(b: Block, i: number) {
  switch (b.type) {
    case "h2":
      return (
        <h2 key={i} className="mt-12 mb-4 font-display text-2xl uppercase tracking-tight text-text-1 md:text-3xl">
          {b.text}
        </h2>
      );
    case "p":
      return (
        <p key={i} className="mb-5 font-body text-lg leading-relaxed text-text-2">
          {b.text}
        </p>
      );
    case "ul":
      return (
        <ul key={i} className="mb-6 space-y-2.5">
          {b.items.map((it, j) => (
            <li key={j} className="flex gap-3 font-body text-text-2">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-gold" style={{ borderRadius: 2 }} />
              <span>{it}</span>
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote key={i} className="my-8 border-l-2 border-gold pl-5 font-display text-xl uppercase leading-snug tracking-tight text-text-1">
          {b.text}
        </blockquote>
      );
    case "cta":
      return (
        <Link key={i} href={b.href} target="_blank" rel="noopener noreferrer" className="btn-gold my-6 inline-flex items-center gap-2">
          {b.label}
        </Link>
      );
  }
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const more = blogPostsByDate.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-ink">
      <ArticleJsonLd post={post} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Journal", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
      />

      {/* Hero */}
      <header className="border-b border-wire bg-surface/30">
        <div className="mx-auto max-w-3xl px-6 pt-10 pb-12 lg:px-8">
          <Link href="/blog" className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-text-3 transition-colors hover:text-gold">
            <ArrowLeft size={13} /> Journal
          </Link>
          <div className="mt-7 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-text-3">
            <span className="text-gold">{post.category}</span>
            <span>·</span>
            <span>{fmtDate(post.date)}</span>
            <span>·</span>
            <span>{post.readingMinutes} min read</span>
          </div>
          <h1 className="mt-4 font-display text-4xl uppercase leading-[0.98] tracking-tight text-text-1 md:text-5xl">
            {post.title}
          </h1>
          <p className="mt-5 font-body text-lg text-text-2">{post.excerpt}</p>
        </div>
      </header>

      {/* Cover */}
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="relative -mt-px aspect-[1200/630] overflow-hidden border-x border-b border-wire bg-surface">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.cover} alt={post.title} className="h-full w-full object-cover" />
        </div>
      </div>

      {/* Body */}
      <article className="mx-auto max-w-3xl px-6 py-14 lg:px-8">
        {post.body.map((b, i) => renderBlock(b, i))}

        <div className="mt-12 flex flex-wrap gap-2 border-t border-wire pt-8">
          {post.tags.map((t) => (
            <span key={t} className="border border-wire px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-text-3" style={{ borderRadius: 2 }}>
              {t}
            </span>
          ))}
        </div>
      </article>

      {/* More */}
      <section className="border-t border-wire bg-surface/30 py-14">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="mb-8 font-mono text-[11px] uppercase tracking-[0.24em] text-gold">More from the journal</p>
          <div className="grid gap-8 md:grid-cols-3">
            {more.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="group flex flex-col border border-wire bg-ink transition-colors hover:border-gold/50">
                <div className="relative aspect-[1200/630] overflow-hidden border-b border-wire">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.cover} alt={p.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">{p.category}</span>
                  <h3 className="mt-2 font-display text-lg uppercase leading-tight tracking-tight text-text-1">{p.title}</h3>
                  <span className="mt-auto inline-flex items-center gap-2 pt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-text-3 group-hover:text-gold">
                    Read <ArrowRight size={12} />
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
