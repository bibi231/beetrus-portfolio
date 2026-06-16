import { SITE_URL } from "@/lib/site";
import { musicData } from "@/data/music";
import { blogPosts, type BlogPost } from "@/data/blog";

const PERSON_ID = `${SITE_URL}/#person`;
const ORG_ID = "https://trueweb.com.ng/#organization";
const GROUP_ID = `${SITE_URL}/#musicgroup`;

const S = musicData.socials;
// Real, verified profile links (drop the bio aggregator + anything unset).
const ARTIST_SAME_AS = [
  S.spotify, S.appleMusic, S.youtube, S.instagram,
  S.tiktok, S.twitter, S.facebook, S.soundcloud, S.audiomack,
].filter(Boolean) as string[];

// Extra per-platform album links for TEN/TEN (verified from the smart link).
const TENTEN_EXTRA = [
  "https://tidal.com/album/530082050",
  "https://www.deezer.com/album/996541221",
  "https://music.amazon.com/albums/B0H3QBS8SG",
  "https://music.youtube.com/playlist?list=OLAK5uy_mDG_sYmek0Wi6jFGpW3HuqvPDxtS47omg",
];

function isLiveUrl(u: string | undefined): u is string {
  return !!u && !u.includes("PASTE_HERE") && !u.includes("/search/");
}

function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Site-wide Person + Organization + WebSite graph. Render once in the root layout. */
export function SiteJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Person",
            "@id": PERSON_ID,
            name: "Bitrus Sariki",
            alternateName: "Beetrus",
            url: SITE_URL,
            image: `${SITE_URL}/og-image.png`,
            jobTitle: "Software Engineer & SaaS Founder",
            description:
              "Fullstack engineer and SaaS founder in Abuja, Nigeria, building AI products under TrueWeb Solutions. Also records as Beetrus.",
            address: { "@type": "PostalAddress", addressLocality: "Abuja", addressCountry: "NG" },
            worksFor: { "@id": ORG_ID },
            knowsAbout: ["Fullstack engineering", "AI products", "Next.js", "React", "Music production"],
            sameAs: ARTIST_SAME_AS,
          },
          {
            "@type": "Organization",
            "@id": ORG_ID,
            name: "TrueWeb Solutions",
            url: "https://trueweb.com.ng",
            founder: { "@id": PERSON_ID },
            description: "Web & AI product studio behind SupportAI, ReplyAI, and HarvestAI.",
          },
          {
            "@type": "WebSite",
            "@id": `${SITE_URL}/#website`,
            url: SITE_URL,
            name: "Beetrus",
            publisher: { "@id": PERSON_ID },
            inLanguage: "en",
          },
        ],
      }}
    />
  );
}

/** MusicGroup + every release (album/EP/single) + recurring events. Render on /music. */
export function MusicJsonLd() {
  const releases = musicData.releases.map((r) => {
    const name = r.subtitle ? `${r.title}: ${r.subtitle}` : r.title;
    const sameAs = [
      r.spotifyUrl,
      r.appleMusicUrl,
      r.audiomackUrl,
      r.youtubeUrl,
      ...(r.id === "ten-ten" ? TENTEN_EXTRA : []),
    ].filter(isLiveUrl);

    const common = {
      name,
      byArtist: { "@id": GROUP_ID },
      datePublished: r.year,
      genre: ["Afrosounds", "R&B", "Drill"],
      inLanguage: "en",
      ...(r.coverImage ? { image: `${SITE_URL}${r.coverImage}` } : {}),
      ...(r.smartLink ? { url: r.smartLink } : sameAs[0] ? { url: sameAs[0] } : {}),
      ...(sameAs.length ? { sameAs } : {}),
    };

    return r.type === "Single"
      ? { "@type": "MusicRecording", ...common }
      : { "@type": "MusicAlbum", ...common, numTracks: r.trackList?.length ?? r.tracks?.length };
  });

  const events = musicData.events.map((e) => {
    const recurring = e.status === "recurring";
    return {
      "@type": "Event",
      name: e.name,
      description: e.description,
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      performer: { "@id": GROUP_ID },
      organizer: { "@id": PERSON_ID },
      location: {
        "@type": "Place",
        name: e.venue,
        address: { "@type": "PostalAddress", addressLocality: e.city, addressCountry: "NG" },
      },
      // Recurring weekly on Wednesdays. Schedule is anchored to a known Wednesday
      // (2026-01-07) so the series stays valid; startDate clears Google's warning.
      ...(recurring
        ? {
            startDate: "2026-01-07T21:00:00+01:00",
            eventSchedule: {
              "@type": "Schedule",
              repeatFrequency: "P1W",
              byDay: "https://schema.org/Wednesday",
              startDate: "2026-01-07",
              startTime: "21:00:00",
              endTime: "23:59:00",
              scheduleTimezone: "Africa/Lagos",
            },
          }
        : {}),
    };
  });

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "MusicGroup",
            "@id": GROUP_ID,
            name: musicData.artistName,
            description: musicData.bio,
            genre: ["Afrosounds", "R&B", "Drill"],
            url: `${SITE_URL}/music`,
            image: `${SITE_URL}/music/ten-ten-cover.jpg`,
            member: { "@id": PERSON_ID },
            foundingLocation: { "@type": "Place", name: "Abuja, Nigeria" },
            sameAs: [S.spotify, S.appleMusic, S.youtube, S.audiomack].filter(Boolean),
          },
          ...releases,
          ...events,
        ],
      }}
    />
  );
}

/** BlogPosting/Article schema for a single post. Render on /blog/[slug]. */
export function ArticleJsonLd({ post }: { post: BlogPost }) {
  const url = `${SITE_URL}/blog/${post.slug}`;
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: post.title,
        description: post.excerpt,
        image: `${SITE_URL}${post.cover}`,
        datePublished: post.date,
        dateModified: post.updated ?? post.date,
        author: { "@id": PERSON_ID },
        publisher: { "@id": ORG_ID },
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        articleSection: post.category,
        keywords: post.tags.join(", "),
        wordCount: post.readingMinutes * 200,
        inLanguage: "en",
        url,
      }}
    />
  );
}

/** BreadcrumbList for any page. */
export function BreadcrumbJsonLd({ items }: { items: { name: string; path: string }[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((it, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: it.name,
          item: `${SITE_URL}${it.path}`,
        })),
      }}
    />
  );
}

/** Blog collection schema for the /blog index. */
export function BlogIndexJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Blog",
        "@id": `${SITE_URL}/blog#blog`,
        name: "Beetrus — Journal",
        description: "Writeups on AI products, web engineering, and music.",
        url: `${SITE_URL}/blog`,
        publisher: { "@id": PERSON_ID },
        blogPost: blogPosts.map((p) => ({
          "@type": "BlogPosting",
          headline: p.title,
          url: `${SITE_URL}/blog/${p.slug}`,
          datePublished: p.date,
          dateModified: p.updated ?? p.date,
          image: `${SITE_URL}${p.cover}`,
          author: { "@id": PERSON_ID },
        })),
      }}
    />
  );
}
