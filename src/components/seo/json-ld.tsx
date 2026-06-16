import { SITE_URL } from "@/lib/site";
import { musicData } from "@/data/music";

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

  const events = musicData.events.map((e) => ({
    "@type": "Event",
    name: e.name,
    description: e.description,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    performer: { "@id": GROUP_ID },
    location: {
      "@type": "Place",
      name: e.venue,
      address: { "@type": "PostalAddress", addressLocality: e.city, addressCountry: "NG" },
    },
    ...(e.status === "recurring"
      ? { eventSchedule: { "@type": "Schedule", byDay: "https://schema.org/Wednesday", repeatFrequency: "P1W" } }
      : {}),
  }));

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
