// Blog content — SEO-optimised marketing writeups for the TrueWeb network + music.
// Bodies are structured blocks (no markdown dep) so styling stays on-brand and typed.

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "cta"; label: string; href: string };

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO published
  updated?: string; // ISO modified
  readingMinutes: number;
  category: string;
  tags: string[];
  cover: string; // /blog/<slug>.jpg
  body: Block[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "supportai-24-7-customer-support-nigeria",
    title: "SupportAI: 24/7 Customer Support for Nigerian Businesses",
    excerpt:
      "Most Nigerian businesses lose sales after 6pm and on weekends — simply because nobody is there to reply. SupportAI answers every customer instantly, in plain English and Pidgin, around the clock.",
    date: "2026-04-20",
    updated: "2026-06-16",
    readingMinutes: 5,
    category: "AI Products",
    tags: ["SupportAI", "customer support", "AI chatbot", "Nigeria", "small business"],
    cover: "/blog/supportai-24-7-customer-support-nigeria.jpg",
    body: [
      { type: "p", text: "A customer lands on your page at 11pm. They have one question before they pay. Nobody answers. By morning, they have moved on. This happens to Nigerian businesses every single day — and it is the cheapest sale you will ever lose." },
      { type: "p", text: "SupportAI fixes that. It is an AI support agent that lives on your website, WhatsApp, and social pages, answers customers instantly at any hour, and only escalates to a human when it genuinely needs to." },
      { type: "h2", text: "Why round-the-clock support matters here" },
      { type: "p", text: "Nigerian buyers move fast and trust slowly. The business that replies first usually wins the order. But you cannot keep a human online 24 hours a day, and you should not have to. SupportAI handles the repetitive 80% — prices, delivery, availability, how-to — so your team only touches the conversations that actually need a person." },
      { type: "ul", items: [
        "Replies in seconds, day or night, including weekends and public holidays",
        "Understands plain English and Nigerian Pidgin",
        "Trained on your own catalogue, prices, and FAQs — not generic answers",
        "Hands off to a human with full context when the question is complex",
      ] },
      { type: "h2", text: "Trained on your business, not the internet" },
      { type: "p", text: "Generic chatbots guess. SupportAI is grounded in your real knowledge base — your products, your policies, your tone — so every answer is accurate and on-brand. You upload what you know once, and it answers consistently forever." },
      { type: "quote", text: "The first reply is the sale. SupportAI makes sure you are always first." },
      { type: "h2", text: "What it costs you to wait" },
      { type: "p", text: "Every unanswered message is a customer handed to a competitor who replied. SupportAI typically pays for itself in recovered sales within the first month — and it never calls in sick, never sleeps, and never forgets a price." },
      { type: "cta", label: "See SupportAI live →", href: "https://supportai.com.ng" },
    ],
  },
  {
    slug: "replyai-turn-comments-into-customers",
    title: "ReplyAI: Turn Social Comments Into Customers",
    excerpt:
      "Your comments and DMs are full of buyers asking 'how much?' and 'is this available?'. ReplyAI replies to every one in your voice, instantly — so attention turns into orders instead of dead leads.",
    date: "2026-05-08",
    updated: "2026-06-16",
    readingMinutes: 4,
    category: "AI Products",
    tags: ["ReplyAI", "social media", "Instagram", "lead response", "automation"],
    cover: "/blog/replyai-turn-comments-into-customers.jpg",
    body: [
      { type: "p", text: "You posted. It performed. Forty people commented 'price?' and dropped into your DMs. Three hours later you finally reply — and most of them are gone. Attention is the hard part, and you already won it. The leak is the follow-up." },
      { type: "p", text: "ReplyAI closes that leak. It watches your comments and DMs, replies in your voice within seconds, answers the obvious questions, and pushes warm buyers toward the sale before they cool off." },
      { type: "h2", text: "Speed is the whole game" },
      { type: "p", text: "On social media, a lead is hottest in the first few minutes. ReplyAI is built for exactly that window — it engages instantly, so the buyer is still in buying mode when they hear from you." },
      { type: "ul", items: [
        "Auto-replies to comments and DMs in your brand voice",
        "Answers price, availability, and delivery without you lifting a finger",
        "Flags and routes high-intent buyers so you close them personally",
        "Works while you sleep, perform, or run the rest of the business",
      ] },
      { type: "h2", text: "Built for creators and sellers" },
      { type: "p", text: "Whether you sell products, run events, or build a brand, ReplyAI treats every comment as a potential customer — because it is. It turns a noisy comment section into an organised pipeline." },
      { type: "quote", text: "You already earned the attention. ReplyAI makes sure it becomes revenue." },
      { type: "cta", label: "Try ReplyAI →", href: "https://replyai.com.ng" },
    ],
  },
  {
    slug: "harvestai-lead-generation-for-nigerian-smes",
    title: "HarvestAI: Find Your Next 100 Customers on Autopilot",
    excerpt:
      "Stop guessing where your customers are. HarvestAI gathers verified, targeted business leads across Nigeria so your sales team spends time closing, not scraping.",
    date: "2026-05-28",
    updated: "2026-06-16",
    readingMinutes: 5,
    category: "AI Products",
    tags: ["HarvestAI", "lead generation", "B2B", "sales", "data scraping", "Nigeria"],
    cover: "/blog/harvestai-lead-generation-for-nigerian-smes.jpg",
    body: [
      { type: "p", text: "Most sales teams in Nigeria spend more time finding people to call than actually calling them. They copy numbers from Instagram bios, scroll directories, and build messy spreadsheets that are half wrong by the time anyone uses them." },
      { type: "p", text: "HarvestAI does that work for you. Tell it who you want — industry, city, business type — and it returns a clean, targeted list of real leads, so your team starts every day with people to reach instead of a blank sheet." },
      { type: "h2", text: "Targeted, not random" },
      { type: "p", text: "A big list of strangers is noise. HarvestAI focuses on fit: the right businesses, in the right places, with the details you need to start a real conversation. Quality leads mean higher reply rates and less wasted outreach." },
      { type: "ul", items: [
        "Filter by industry, location, and business type",
        "Verified, structured data — ready to import and use",
        "Built for the Nigerian market, not a foreign directory",
        "Frees your team to sell instead of search",
      ] },
      { type: "h2", text: "From list to revenue" },
      { type: "p", text: "Pair HarvestAI with SupportAI and ReplyAI and you have a full loop: find the lead, reach the lead, and answer the lead the instant they respond. That is a sales engine, not a spreadsheet." },
      { type: "quote", text: "Your team should be closing deals, not building lists. HarvestAI builds the list." },
      { type: "cta", label: "Explore HarvestAI →", href: "https://harvestai.com.ng" },
    ],
  },
  {
    slug: "why-your-abuja-business-needs-a-website-2026",
    title: "Why Your Abuja Business Needs a Website in 2026",
    excerpt:
      "An Instagram page is a rented room. A website is property you own. Here is why a real site is the highest-leverage move a Nigerian business can make in 2026 — and how TrueWeb ships one fast.",
    date: "2026-04-02",
    updated: "2026-06-16",
    readingMinutes: 6,
    category: "Engineering",
    tags: ["web design", "Abuja", "TrueWeb", "small business", "SEO", "Nigeria"],
    cover: "/blog/why-your-abuja-business-needs-a-website-2026.jpg",
    body: [
      { type: "p", text: "Ask most Nigerian business owners where they live online and they will point to Instagram or WhatsApp. Those are powerful — but you do not own them. The algorithm decides who sees you, the platform can lock you out overnight, and your whole brand sits on someone else's land." },
      { type: "p", text: "A website is different. It is property you own, found on Google, open 24/7, and built to convert. In 2026, it is the single highest-leverage asset a serious business can have." },
      { type: "h2", text: "Three things a website does that a page cannot" },
      { type: "ul", items: [
        "Gets found on Google when people search for what you sell — traffic you do not pay per click for",
        "Builds instant trust: a clean site signals a real, credible business",
        "Sells and books while you sleep — payments, bookings, and enquiries on autopilot",
      ] },
      { type: "h2", text: "But isn't a website expensive and slow to build?" },
      { type: "p", text: "It used to be. That is exactly the problem TrueWeb Solutions was built to solve. We ship fast, modern, mobile-first sites — and where it makes sense, we wire in AI so your site does more than sit there looking nice. It answers customers, captures leads, and takes payments." },
      { type: "quote", text: "An Instagram page is a rented room. A website is property you own." },
      { type: "h2", text: "What you actually get" },
      { type: "p", text: "A fast site that loads well on Nigerian networks, ranks on Google, works perfectly on phones, and is built to turn visitors into customers — not just impress them. And because it is yours, no algorithm can take it away." },
      { type: "cta", label: "Build your site with TrueWeb →", href: "https://trueweb.com.ng" },
    ],
  },
  {
    slug: "ten-ten-the-lost-files-story",
    title: "TEN/TEN: The Lost Files — The Story Behind the Project",
    excerpt:
      "Ten tracks, recorded in Abuja's late nights, pulled from the cutting-room floor. The story behind Beetrus's TEN/TEN: The Lost Files — and where to stream it.",
    date: "2026-02-14",
    updated: "2026-06-16",
    readingMinutes: 4,
    category: "Music",
    tags: ["Beetrus", "TEN/TEN", "The Lost Files", "Afrosounds", "Abuja", "new music"],
    cover: "/blog/ten-ten-the-lost-files-story.jpg",
    body: [
      { type: "p", text: "Every artist has a folder of songs that never made the official cut — the takes that were too honest, too rough, or just too early. TEN/TEN: The Lost Files is that folder, opened on purpose." },
      { type: "p", text: "Ten tracks, built in Abuja's late nights, blending Afrosounds, R&B, and Drill into something that only makes sense after midnight. This is not a polished single-chasing the radio. It is a body of work." },
      { type: "h2", text: "The sound" },
      { type: "p", text: "From the opener 'Ten' with KVV to the close of 'Ex-Stacy', the project moves between introspection and energy — produced with Ove6ix, Wonderlust, Kaiso, Chie, and others who shaped the Abuja late-night sound." },
      { type: "ul", items: [
        "10 tracks, one cohesive late-night world",
        "Features from KVV, TooColdBaby, York, Killian Stark and more",
        "Released under Kinfxlk Records",
        "Out now on Spotify, TIDAL, Deezer, Amazon Music, and YouTube Music",
      ] },
      { type: "quote", text: "The Lost Files aren't leftovers. They're the songs that were too real to throw away." },
      { type: "h2", text: "Where to listen" },
      { type: "p", text: "Stream the full project everywhere through one link, or jump straight to your platform of choice. Play it loud, play it late." },
      { type: "cta", label: "Stream TEN/TEN: The Lost Files →", href: "https://ffm.to/tenten-lost-files" },
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export const blogPostsByDate = [...blogPosts].sort(
  (a, b) => +new Date(b.date) - +new Date(a.date),
);
