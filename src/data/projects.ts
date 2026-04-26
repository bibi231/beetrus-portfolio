export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
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
    id: 'star-ranker',
    title: 'Star Ranker',
    tagline: 'Real-money cultural prediction markets for African audiences.',
    description: 'A Polymarket-style staking and ranking platform for Nigerian cultural events — music, sports, entertainment. Features a custom DMAO odds engine, Bloomberg Terminal-inspired UI, Paystack NGN payments, and a full tier/loyalty system.',
    tags: ['React 19', 'Vite', 'TypeScript', 'Express', 'Neon Postgres', 'Drizzle ORM', 'Firebase Auth', 'Paystack', 'Real-money'],
    category: 'platform',
    status: 'live',
    liveUrl: 'https://star-ranker-beryl.vercel.app',
    image: '/projects/star-ranker.png',
    accentColor: '#ffd700',
    year: '2025',
    featured: true,
  },
  {
    id: 'reply-ai',
    title: 'ReplyAI',
    tagline: 'AI email replies for Nigerian professionals. Three drafts in 3 seconds.',
    description: 'A SaaS Chrome Extension + web dashboard that generates professional email reply drafts using Gemini AI. Built for Nigerian professionals who send a lot of emails. Freemium with Paystack NGN credit packs.',
    tags: ['React 19', 'Chrome Extension MV3', 'Express', 'Firebase Auth', 'Gemini AI', 'Paystack', 'Vercel'],
    category: 'saas',
    status: 'live',
    liveUrl: 'https://replyai-client.vercel.app',
    image: '/projects/reply-ai.png',
    accentColor: '#6c63ff',
    year: '2025',
    featured: true,
  },
  {
    id: 'harvest-ai',
    title: 'HarvestAI',
    tagline: 'AI web scraper and lead generation platform. Describe it, harvest it.',
    description: 'Multi-mode data extraction SaaS — Lead Finder, Data Extractor, Sitemap Crawler, Email Finder, Price Monitor, and Enrichment. Playwright-powered scraping with Gemini AI extraction. Dual-currency payments (NGN + USD).',
    tags: ['React 19', 'Next.js', 'Playwright', 'Gemini 2.5', 'Groq', 'Paystack', 'Stripe', 'Render'],
    category: 'saas',
    status: 'live',
    liveUrl: 'https://harvestai-new.vercel.app',
    image: '/projects/harvest-ai.png',
    accentColor: '#f5a623',
    year: '2025',
    featured: true,
  },
  {
    id: 'safent',
    title: 'Safent',
    tagline: 'A security-focused SaaS product.',
    description: 'Details available on request. Built with the full TrueWeb Solutions stack.',
    tags: ['TypeScript', 'Next.js', 'Security', 'SaaS'],
    category: 'saas',
    status: 'live',
    image: '/projects/safent.png',
    accentColor: '#00e5ff',
    year: '2025',
    featured: false,
  },
  {
    id: 'regal-portfolio',
    title: 'Regal Portfolio',
    tagline: 'A luxury real estate portfolio site with dynamic 3D animations.',
    description: 'Contracted client project — premium real estate portfolio site with immersive scroll animations, Three.js backgrounds, and a clean editorial design language for a high-net-worth property client.',
    tags: ['Next.js', 'Three.js', 'Framer Motion', 'Tailwind CSS', 'Client Work'],
    category: 'portfolio',
    status: 'live',
    image: '/projects/regal-portfolio.png',
    accentColor: '#c9a84c',
    year: '2024',
    featured: false,
  },
  {
    id: 'naijalingo',
    title: 'NaijaLingo',
    tagline: 'Learn Yoruba, Hausa, Pidgin, and Igbo. The African Duolingo.',
    description: 'Full-stack African language learning platform with gamified lessons, AI tutor personas, ElevenLabs TTS, spaced repetition, PvP multiplayer, 8 game modes, certification, and a community forum. Built for the diaspora and curious learners worldwide.',
    tags: ['Next.js 15', 'Supabase', 'Gemini 2.5', 'ElevenLabs', 'Drizzle ORM', 'Framer Motion', 'Paystack'],
    category: 'app',
    status: 'building',
    image: '/projects/naijalingo.png',
    accentColor: '#00d97e',
    year: '2025–2026',
    featured: true,
  },
  {
    id: 'streamio',
    title: 'StreamIO',
    tagline: 'A modern streaming platform and media experience.',
    description: 'A streaming interface and media platform. Details available to potential employers under NDA.',
    tags: ['React', 'Video Streaming', 'HLS.js', 'TypeScript', 'Node.js'],
    category: 'platform',
    status: 'building',
    image: '/projects/streamio.png',
    accentColor: '#3b82f6',
    year: '2025',
    featured: false,
  },
  {
    id: 'naijamation',
    title: 'NaijaMation',
    tagline: 'Afro-centric streaming platform for animated content.',
    description: 'A dedicated streaming platform for African animation, showcasing "The Fisherman\'s Daughter" and other local stories. Built with a cinema-first UI, categories for Anime, Series, and Music, and a robust content hub for creators.',
    tags: ['Next.js', 'Vercel', 'Video-on-Demand', 'TypeScript', 'Tailwind CSS'],
    category: 'platform',
    status: 'live',
    image: '/projects/naijamation.png',
    accentColor: '#0070ff',
    year: '2024',
    featured: true,
  },
];
