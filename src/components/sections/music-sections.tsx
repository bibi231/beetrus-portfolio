"use client";

import { motion } from "framer-motion";
import { Play, Calendar, MapPin } from "lucide-react";
import { musicData } from "@/data/music";
import { MUSIC_IDS } from "@/data/musicIds";

export function MusicHeroSection() {
  return (
    <section className="relative min-h-[80vh] flex flex-col justify-end pb-24 overflow-hidden border-b border-wire bg-ink">
      {/* Background Image / Color overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[20s] ease-linear scale-110"
          style={{ 
            backgroundImage: `url('/artist/hero-bg.jpg')`,
            backgroundPosition: '50% 30%'
          }} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-void/80 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,112,255,0.15),transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block px-4 py-1 mb-6 rounded-full border border-ember/30 bg-ember/10 backdrop-blur-sm">
            <p className="font-mono text-xs uppercase tracking-widest text-ember flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-ember animate-pulse" /> Afro State of Mind
            </p>
          </div>
          
          <h1 className="font-display text-7xl md:text-9xl font-black tracking-tighter text-transparent drop-shadow-[0_0_30px_rgba(0,229,255,0.3)] uppercase mb-6" style={{ WebkitTextStroke: '2px #00e5ff' }}>
            BEETRUS
          </h1>
          
          <p className="max-w-xl text-lg text-text-1/80 leading-relaxed font-body">
            {musicData.bio}
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            <a href={musicData.socials.spotify} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-4 bg-ember text-ink font-mono text-sm uppercase tracking-widest font-bold rounded-md hover:bg-ember/90 transition-colors">
              Listen on Spotify
            </a>
            <a href={musicData.socials.appleMusic} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-4 bg-surface border border-wire text-text-1 font-mono text-sm uppercase tracking-widest font-bold rounded-md hover:border-text-1 transition-colors">
              Apple Music
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function ReleasesSection() {
  const ep = musicData.releases.find(r => r.type === "EP");
  const singles = musicData.releases.filter(r => r.type === "Single");

  return (
    <section className="py-24 bg-void border-b border-wire position-relative">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex items-center gap-4 mb-16">
          <div className="h-px bg-wire flex-1" />
          <h2 className="font-display text-3xl font-bold uppercase tracking-widest">Sonic Philosophies</h2>
          <div className="h-px bg-wire flex-1" />
        </div>

        {/* Featured EP */}
        {ep && (
          <div className="mb-20">
            <h3 className="font-mono text-sm uppercase tracking-widest text-ember mb-8">{ep.type} // {ep.year}</h3>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="aspect-square bg-surface border-2 border-wire rounded-2xl flex items-center justify-center text-9xl bg-gradient-to-br from-surface to-ink overflow-hidden border-ember/30 shadow-[0_0_50px_rgba(0,112,255,0.1)] hover:border-ember transition-colors">
                {ep.coverEmoji}
              </div>
              <div>
                <h4 className="font-display text-4xl md:text-5xl font-bold mb-4">{ep.title}</h4>
                <div className="flex gap-4 mb-8">
                  {ep.tracks?.map((track: string) => (
                    <span key={track} className="px-3 py-1 bg-surface border border-wire text-text-2 font-mono text-[10px] uppercase rounded-full">
                      {track}
                    </span>
                  ))}
                </div>
                
                {/* Apple Music Embed */}
                <iframe 
                  allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write" 
                  frameBorder="0" 
                  height="450" 
                  style={{ width: '100%', overflow: 'hidden', background: 'transparent', borderRadius: '12px' }} 
                  sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" 
                  src={`https://embed.music.apple.com/ng/album/afro-state-of-mind-ep/${MUSIC_IDS.appleMusicId}`}
                ></iframe>
              </div>
            </div>
          </div>
        )}

        {/* Singles Grid */}
        <h3 className="font-mono text-sm uppercase tracking-widest text-text-2 mb-8 mt-24">Singles</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {singles.map(single => (
            <div key={single.id} className="card-premium p-6 flex flex-col">
              <div className="w-full aspect-square bg-surface mb-6 rounded-lg flex items-center justify-center text-6xl">
                {single.coverEmoji}
              </div>
              <h4 className="font-display text-xl font-bold mb-1">{single.title}</h4>
              <p className="font-mono text-xs text-text-2">{single.year}</p>
              
              <div className="mt-8 flex gap-3">
                <a href={single.spotifyUrl} target="_blank" rel="noopener noreferrer" className="flex-1 text-center py-2 bg-[#1DB954]/10 text-[#1DB954] hover:bg-[#1DB954]/20 rounded font-mono text-[10px] uppercase tracking-wider transition-colors border border-[#1DB954]/30">Spotify</a>
                <a href={single.appleMusicUrl} target="_blank" rel="noopener noreferrer" className="flex-1 text-center py-2 bg-[#FA243C]/10 text-[#FA243C] hover:bg-[#FA243C]/20 rounded font-mono text-[10px] uppercase tracking-wider transition-colors border border-[#FA243C]/30">Apple</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function EventsSection() {
  return (
    <section className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="font-display text-4xl font-bold mb-4 uppercase tracking-wider">Always Outside.</h2>
        <p className="font-mono text-text-2 mb-16 max-w-2xl text-sm">Find me here next. Curating and promoting Abuja's premium nightlife experiences.</p>

        <div className="space-y-6">
          {musicData.events.map((event: any) => (
            <div key={event.id} className="card-premium p-6 md:p-10 flex flex-col md:flex-row items-center gap-8 justify-between hover:border-pulse/50 transition-colors">
              
              <div className="flex-1 flex flex-col md:flex-row gap-6 md:gap-12 w-full">
                <div className="w-full md:w-32 text-center md:text-left">
                  <div className="font-display font-bold text-3xl text-ember">{event.id === 'pressure' ? 'WED' : ''}</div>
                  <div className="font-mono text-[10px] text-text-2 uppercase tracking-widest">{event.day}</div>
                </div>
                
                <div>
                  <h3 className="font-display text-2xl font-bold md:text-3xl mb-2">{event.name}</h3>
                  <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-text-2">
                    <span className="flex items-center gap-1"><MapPin size={14} className="text-pulse" /> {event.venue}, {event.city}</span>
                    <span className="px-2 py-0.5 border border-wire rounded text-[10px]">{event.type}</span>
                  </div>
                  <p className="mt-4 text-sm text-text-1/80 max-w-lg">{event.description}</p>
                </div>
              </div>

              <a href="https://instagram.com/beetrus_gg" target="_blank" rel="noopener noreferrer" className="w-full md:w-auto px-8 py-3 bg-white text-black font-semibold font-mono text-[11px] uppercase tracking-widest text-center hover:bg-white/80 transition-colors rounded-sm">
                RSVP / Info
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
