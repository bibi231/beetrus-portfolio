export interface ProjectScreenshot {
  src: string;
  caption: string;
}

export interface ProjectCapability {
  icon: string;
  label: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  longDescription?: string;
  capabilities?: ProjectCapability[];
  screenshots?: ProjectScreenshot[];
  tags: string[];
  category: 'saas' | 'platform' | 'tool' | 'portfolio' | 'app';
  status: 'live' | 'building' | 'concept';
  liveUrl?: string;
  githubUrl?: string;
  image: string;
  accentColor: string;
  year: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: 'trueweb',
    title: 'TrueWeb Solutions',
    tagline: 'The studio behind the network. AI products, web builds, and a client engine.',
    description: 'My software studio and the umbrella for a four-product AI network (SupportAI, ReplyAI, HarvestAI). Ships client websites and runs a full business engine: client portal, real-time admin↔client messaging, an affiliate system, auto-provisioned accounts on payment, and Squad (NGN) billing — all on Next.js 15, Neon Postgres, and NextAuth.',
    longDescription: 'TrueWeb Solutions is the parent studio that designs, builds, and operates the entire network. Beyond client web builds, it runs the infrastructure every product shares: a self-serve client portal with project tracking and invoices, Upwork-style two-way messaging between admins and clients, a referral/affiliate system paying 3–5% commission, automatic account provisioning the moment a client pays, and a daily health-check + instant build-failure alerting layer across all four sites. Hardened with per-IP rate limiting, email verification, IDOR-safe APIs, and HMAC-verified Squad webhooks.',
    capabilities: [
      { icon: '🛰️', label: 'Four-Product AI Network', description: 'Operates SupportAI, ReplyAI & HarvestAI under one studio brand' },
      { icon: '💬', label: 'Real-Time Client Messaging', description: 'Two-way admin↔client inbox with file upload, Zoom, and payment requests' },
      { icon: '🤝', label: 'Affiliate Engine', description: 'Referral codes, conversion tracking, and 3–5% commission payouts' },
      { icon: '⚡', label: 'Auto-Provisioning', description: 'Squad webhook auto-creates the client account + emails credentials on payment' },
      { icon: '🛡️', label: 'Security Hardened', description: 'Rate limiting, email verification, IDOR-safe routes, HMAC webhooks' },
      { icon: '📈', label: 'Health Monitoring', description: 'Daily cross-site health cron + instant build-failure email alerts' },
    ],
    tags: ['Next.js 15', 'Neon Postgres', 'Drizzle ORM', 'NextAuth v5', 'Squad', 'Resend', 'Vercel'],
    category: 'platform',
    status: 'live',
    liveUrl: 'https://trueweb.com.ng',
    image: '/projects/trueweb.jpg',
    accentColor: '#d9b23e',
    year: '2025–2026',
    featured: true,
  },
  {
    id: 'support-ai',
    title: 'SupportAI',
    tagline: 'A 24/7 AI support chatbot that speaks Pidgin, Yoruba & Hausa.',
    description: 'An embeddable AI customer-support widget for Nigerian businesses. One script tag drops a multilingual chatbot onto any site — trained on the business\'s own knowledge base, streaming answers over WebSockets, with human escalation, analytics, and Squad (NGN) billing.',
    longDescription: 'SupportAI lets any business deploy a customer-support bot in minutes. A single embed loads a widget that connects straight to the backend over socket.io for real-time streamed replies, answers in English, Nigerian Pidgin, Yoruba, or Hausa, and pulls from a per-business knowledge base with vector retrieval. Enterprise controls cover custom branding, plan-gated features, visitor memory, and human handoff. Runs as an Express/MongoDB backend on Render behind a Vercel-fronted SPA, billed in NGN via Squad.',
    capabilities: [
      { icon: '🌍', label: '4-Language Support', description: 'English, Nigerian Pidgin, Yoruba & Hausa out of the box' },
      { icon: '🔌', label: 'One-Tag Embed', description: 'A single <script> drops the live chat widget onto any website' },
      { icon: '⚡', label: 'Streaming over WebSockets', description: 'socket.io streams answers token-by-token in real time' },
      { icon: '📚', label: 'Custom Knowledge Base', description: 'Vector retrieval over each business\'s own docs and FAQs' },
      { icon: '🙋', label: 'Human Escalation', description: 'Seamless hand-off to a live agent when the bot reaches its limits' },
      { icon: '📊', label: 'Analytics + Plans', description: 'Conversation analytics with plan-gated branding and limits' },
    ],
    tags: ['React', 'Vite', 'Express', 'MongoDB', 'socket.io', 'Gemini', 'Squad', 'Render'],
    category: 'saas',
    status: 'live',
    liveUrl: 'https://supportai.com.ng',
    image: '/projects/support-ai.jpg',
    accentColor: '#a8742e',
    year: '2025–2026',
    featured: true,
  },
  {
    id: 'reply-ai',
    title: 'ReplyAI',
    tagline: 'AI email replies for Nigerian professionals. Three drafts in 3 seconds.',
    description: 'A SaaS Chrome Extension + web dashboard that generates professional email reply drafts using Gemini AI. Built for Nigerian professionals who send a lot of emails. Freemium with Paystack NGN credit packs.',
    longDescription: 'ReplyAI solves the biggest productivity drain for Nigerian professionals — composing the perfect reply. Paste any email, get three tailored drafts in seconds powered by Gemini AI. The Chrome Extension integrates directly into Gmail. A full web dashboard tracks usage, manages credit packs, and provides account settings. Paystack handles NGN payments natively.',
    capabilities: [
      { icon: '⚡', label: '3-Draft Generation', description: 'Three tone variants — formal, casual, assertive — every single time' },
      { icon: '🔌', label: 'Gmail Chrome Extension', description: 'MV3 extension injects directly into Gmail compose flow' },
      { icon: '💳', label: 'Freemium Credit Packs', description: 'Paystack NGN billing with tiered credit bundles' },
      { icon: '📊', label: 'Usage Dashboard', description: 'Track generations, credits remaining, and account history' },
      { icon: '🤖', label: 'Gemini AI Backend', description: 'Google Gemini 2.5 Flash with custom prompt engineering' },
      { icon: '🔐', label: 'Firebase Auth', description: 'Secure Google OAuth + email sign-in across web and extension' },
    ],
    screenshots: [
      { src: '/projects/reply-ai.png', caption: 'Dashboard — Credit overview and generation history' },
      { src: '/projects/reply-ai-ext.png', caption: 'Chrome Extension — Inline reply suggestions in Gmail' },
      { src: '/projects/reply-ai-pricing.png', caption: 'Pricing — NGN credit packs via Paystack' },
    ],
    tags: ['React 19', 'Chrome Extension MV3', 'Express', 'Firebase Auth', 'Gemini AI', 'Paystack', 'Vercel'],
    category: 'saas',
    status: 'live',
    liveUrl: 'https://replyai.com.ng',
    image: '/projects/reply-ai.png',
    accentColor: '#c9a227',
    year: '2025',
    featured: true,
  },
  {
    id: 'harvest-ai',
    title: 'HarvestAI',
    tagline: 'AI web scraper and lead generation platform. Describe it, harvest it.',
    description: 'Multi-mode data extraction SaaS — Lead Finder, Data Extractor, Sitemap Crawler, Email Finder, Price Monitor, and Enrichment. Playwright-powered scraping with Gemini AI extraction. Dual-currency payments (NGN + USD).',
    longDescription: 'HarvestAI turns any URL or keyword into structured data. Six extraction modes cover every use case: Lead Finder scrapes directories and LinkedIn, Data Extractor pulls tables and text, Email Finder maps contact info, Price Monitor tracks competitor pricing, Sitemap Crawler indexes entire domains, and Enrichment appends context to raw lists. Everything runs through Playwright in a headless cluster, with Gemini AI parsing the unstructured output into clean JSON.',
    capabilities: [
      { icon: '🔍', label: 'Lead Finder', description: 'Scrape directories, LinkedIn, and business listings into clean CRM-ready lists' },
      { icon: '📧', label: 'Email Finder', description: 'Extract and verify contact emails at scale from any domain' },
      { icon: '💰', label: 'Price Monitor', description: 'Track competitor pricing across e-commerce sites automatically' },
      { icon: '🗺️', label: 'Sitemap Crawler', description: 'Full-domain crawl with page structure and link mapping' },
      { icon: '🤖', label: 'AI Data Extraction', description: 'Gemini 2.5 parses unstructured HTML into structured JSON schemas' },
      { icon: '🌍', label: 'Dual-Currency Billing', description: 'NGN via Paystack + USD via Stripe, with credit-based metering' },
    ],
    screenshots: [
      { src: '/projects/harvest-ai.png', caption: 'Main dashboard — Mode selector and job queue' },
      { src: '/projects/harvest-ai-results.png', caption: 'Results view — Structured extracted data with export options' },
      { src: '/projects/harvest-ai-pricing.png', caption: 'Pricing — Dual-currency credit packs' },
    ],
    tags: ['React 19', 'Next.js', 'Playwright', 'Gemini 2.5', 'Groq', 'Paystack', 'Stripe', 'Render'],
    category: 'saas',
    status: 'live',
    liveUrl: 'https://harvestai.com.ng',
    image: '/projects/harvest-ai.png',
    accentColor: '#e0b84a',
    year: '2025',
    featured: true,
  },
  {
    id: 'star-ranker',
    title: 'Star Ranker',
    tagline: 'Real-money cultural prediction markets for African audiences.',
    description: 'A Polymarket-style staking and ranking platform for Nigerian cultural events — music, sports, entertainment. Features a custom DMAO odds engine, Bloomberg Terminal-inspired UI, Paystack NGN payments, and a full tier/loyalty system.',
    longDescription: 'Star Ranker is the first real-money prediction market built for African cultural events. Users stake NGN on outcomes across music, sports, and entertainment — who will win the headliner slot, which artist drops the biggest album, which athlete gets signed. A custom DMAO odds engine calculates dynamic payouts in real-time. The Bloomberg Terminal-inspired dark UI emphasizes data density and speed. A full tier and loyalty system rewards top predictors.',
    capabilities: [
      { icon: '📈', label: 'DMAO Odds Engine', description: 'Custom dynamic market-adjusted odds with real-time recalculation' },
      { icon: '🏆', label: 'Tier & Loyalty System', description: 'Multi-tier ranking with rewards and streak bonuses' },
      { icon: '💵', label: 'NGN Real-Money Staking', description: 'Live Paystack integration for real monetary predictions' },
      { icon: '📊', label: 'Bloomberg-Style UI', description: 'Data-dense terminal interface with live market feeds' },
      { icon: '🗃️', label: 'Neon Postgres + Drizzle', description: 'Serverless Postgres with type-safe ORM for low-latency queries' },
      { icon: '🔥', label: 'Firebase Auth', description: 'Multi-provider auth with session persistence' },
    ],
    screenshots: [
      { src: '/projects/star-ranker.png', caption: 'Market feed — Live cultural prediction markets' },
      { src: '/projects/star-ranker-stake.png', caption: 'Staking interface — Place and track predictions' },
    ],
    tags: ['React 19', 'Vite', 'TypeScript', 'Express', 'Neon Postgres', 'Drizzle ORM', 'Firebase Auth', 'Paystack', 'Real-money'],
    category: 'platform',
    status: 'live',
    liveUrl: 'https://star-ranker-beryl.vercel.app',
    image: '/projects/star-ranker.png',
    accentColor: '#e6c463',
    year: '2025',
    featured: true,
  },
  {
    id: 'naijamation',
    title: 'NaijaMation',
    tagline: 'Afro-centric streaming platform for animated content.',
    description: `A dedicated streaming platform for African animation, showcasing "The Fisherman's Daughter" and other local stories. Built with a cinema-first UI, categories for Anime, Series, and Music, and a robust content hub for creators.`,
    longDescription: `NaijaMation is the first streaming platform built exclusively for African animation. It surfaces stories like The Fisherman's Daughter that would never make it onto Netflix. A cinema-first design language — cinematic headers, dark theatre mode, immersive episode pages — puts the content front and center. Creator tools let animators submit work and track viewership. The platform also includes a Music section for animated music videos.`,
    capabilities: [
      { icon: '🎬', label: 'Cinema-First UI', description: 'Immersive full-screen layouts inspired by modern streaming platforms' },
      { icon: '🌍', label: 'African-Only Content', description: 'Curated catalogue of African animation, series, and music videos' },
      { icon: '📺', label: 'Video-on-Demand', description: 'HLS streaming with adaptive bitrate for low-bandwidth connections' },
      { icon: '✍️', label: 'Creator Submissions', description: 'Animator portal for content upload, review, and distribution' },
    ],
    screenshots: [
      { src: '/projects/naijamation.png', caption: 'Home — Featured African animation catalogue' },
      { src: '/projects/naijamation-watch.png', caption: 'Watch page — Cinema-mode player with episode navigation' },
    ],
    tags: ['Next.js', 'Vercel', 'Video-on-Demand', 'TypeScript', 'Tailwind CSS'],
    category: 'platform',
    status: 'live',
    image: '/projects/naijamation.png',
    accentColor: '#b8902f',
    year: '2024',
    featured: true,
  },
  {
    id: 'naijalingo',
    title: 'NaijaLingo',
    tagline: 'Learn Yoruba, Hausa, Pidgin, and Igbo. The African Duolingo.',
    description: 'Full-stack African language learning platform with gamified lessons, AI tutor personas, ElevenLabs TTS, spaced repetition, PvP multiplayer, 8 game modes, certification, and a community forum. Built for the diaspora and curious learners worldwide.',
    longDescription: 'NaijaLingo brings African language learning into the 21st century. Eight game modes — from vocabulary sprints to PvP battles — make learning addictive. AI tutor personas adapt to your level and speak in your target language using ElevenLabs TTS. Spaced repetition algorithms surface the right words at the right time. Earn certifications. Join a community forum. Pay in NGN or USD.',
    capabilities: [
      { icon: '🎮', label: '8 Game Modes', description: 'Vocabulary sprint, listening, PvP battle, spelling, story mode, and more' },
      { icon: '🗣️', label: 'AI Tutor + TTS', description: 'ElevenLabs voice synthesis with Gemini AI for real conversational practice' },
      { icon: '🧠', label: 'Spaced Repetition', description: 'SM-2 algorithm surfaces forgotten words at optimal review intervals' },
      { icon: '🏅', label: 'Certifications', description: 'Verifiable language certificates across 4 proficiency levels' },
      { icon: '⚔️', label: 'PvP Multiplayer', description: 'Real-time vocabulary battles against other learners worldwide' },
      { icon: '💬', label: 'Community Forum', description: 'Language exchange and cultural discussion built into the platform' },
    ],
    screenshots: [
      { src: '/projects/naijalingo.png', caption: 'Home — Language selection and course catalogue' },
    ],
    tags: ['Next.js 15', 'Supabase', 'Gemini 2.5', 'ElevenLabs', 'Drizzle ORM', 'Framer Motion', 'Paystack'],
    category: 'app',
    status: 'building',
    image: '/projects/naijalingo.png',
    accentColor: '#caa84c',
    year: '2025–2026',
    featured: true,
  },
  {
    id: 'regal-portfolio',
    title: 'Regal Portfolio',
    tagline: 'A luxury real estate portfolio site with dynamic 3D animations.',
    description: 'Contracted client project — premium real estate portfolio site with immersive scroll animations, Three.js backgrounds, and a clean editorial design language for a high-net-worth property client.',
    capabilities: [
      { icon: '🏠', label: 'Luxury Real Estate UI', description: 'Editorial design system built for high-net-worth property clients' },
      { icon: '✨', label: 'Three.js Backgrounds', description: 'WebGL particle and environment animations tied to scroll position' },
      { icon: '📜', label: 'Scroll Storytelling', description: 'Framer Motion sequences that reveal content as the user explores' },
    ],
    screenshots: [
      { src: '/projects/regal-portfolio.png', caption: 'Homepage — Luxury real estate hero with 3D background' },
    ],
    tags: ['Next.js', 'Three.js', 'Framer Motion', 'Tailwind CSS', 'Client Work'],
    category: 'portfolio',
    status: 'live',
    image: '/projects/regal-portfolio.png',
    accentColor: '#c9a84c',
    year: '2024',
    featured: false,
  },
  {
    id: 'safent',
    title: 'Safent',
    tagline: 'A security-focused SaaS product.',
    description: 'Details available on request. Built with the full TrueWeb Solutions stack.',
    capabilities: [
      { icon: '🔒', label: 'Security-First Architecture', description: 'End-to-end encrypted workflows with zero-trust principles' },
    ],
    screenshots: [
      { src: '/projects/safent.jpg', caption: 'Product preview — available under NDA' },
    ],
    tags: ['TypeScript', 'Next.js', 'Security', 'SaaS'],
    category: 'saas',
    status: 'live',
    image: '/projects/safent.jpg',
    accentColor: '#d9a13e',
    year: '2025',
    featured: false,
  },
];
