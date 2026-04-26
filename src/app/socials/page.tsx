"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Instagram, Youtube, Github, Mail, Music2, Code2, ArrowRight } from "lucide-react";
import { MUSIC_IDS } from "@/data/musicIds";
import { musicData } from "@/data/music";

export default function SocialsPage() {
  const latestRelease = musicData.releases[0];

  return (
    <div className="min-h-screen bg-ink pt-12 pb-24">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-surface border border-wire mb-6 overflow-hidden">
            {/* Ideally replace with real avatar */}
            <span className="font-display text-4xl text-pulse font-bold">B</span>
          </div>
          <h1 className="font-display text-4xl font-bold tracking-tight mb-2">@beetrus_gg</h1>
          <p className="font-mono text-sm text-text-2">Engineer ◦ Artist ◦ Founder</p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[200px]">
          
          {/* Main Socials: Instagram */}
          <motion.a 
            href={`https://instagram.com/${MUSIC_IDS.instagramHandle}`}
            target="_blank" rel="noopener noreferrer"
            className="md:col-span-2 group card-premium p-8 flex flex-col justify-between overflow-hidden relative"
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Instagram size={120} />
            </div>
            <div>
              <div className="w-12 h-12 bg-[#E4405F]/10 rounded-xl flex items-center justify-center mb-4">
                <Instagram className="text-[#E4405F]" size={24} />
              </div>
              <h3 className="font-display text-2xl font-bold">Instagram</h3>
              <p className="font-mono text-xs text-text-2 mt-2">Latest lifestyle & updates</p>
            </div>
            <div className="flex items-center gap-2 font-mono text-sm text-pulse opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0">
              Follow <ArrowRight size={16} />
            </div>
          </motion.a>

          {/* YouTube */}
          <motion.a 
            href={`https://youtube.com/@${MUSIC_IDS.youtubeChannelId}`}
            target="_blank" rel="noopener noreferrer"
            className="group card-premium p-8 flex flex-col justify-between"
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div>
              <div className="w-12 h-12 bg-[#FF0000]/10 rounded-xl flex items-center justify-center mb-4">
                <Youtube className="text-[#FF0000]" size={24} />
              </div>
              <h3 className="font-display text-xl font-bold">YouTube</h3>
              <p className="font-mono text-xs text-text-2 mt-2">Music videos & vlogs</p>
            </div>
          </motion.a>

          {/* Latest Release */}
          <motion.a 
            href={latestRelease?.spotifyUrl || "#"}
            target="_blank" rel="noopener noreferrer"
            className="group card-premium p-8 flex flex-col justify-between border-ember/30 hover:border-ember"
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-ember/5 to-transparent pointer-events-none" />
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-ember/10 rounded-xl flex items-center justify-center text-2xl">
                  {latestRelease?.coverEmoji}
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-ember border border-ember/30 px-2 py-1 rounded-sm">Latest</span>
              </div>
              <h3 className="font-display text-lg font-bold">{latestRelease?.title}</h3>
              <p className="font-mono text-xs text-text-2 mt-1">Stream now</p>
            </div>
          </motion.a>

          {/* GitHub */}
          <motion.a 
            href="https://github.com/bibi231"
            target="_blank" rel="noopener noreferrer"
            className="group card-premium p-8 flex flex-col justify-between"
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div>
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4">
                <Github className="text-white" size={24} />
              </div>
              <h3 className="font-display text-lg font-bold">GitHub</h3>
              <p className="font-mono text-xs text-text-2 mt-1">Open source & projects</p>
            </div>
          </motion.a>

          {/* Business / Services */}
          <motion.div 
            className="group card-premium p-8 flex flex-col justify-between md:row-span-2 relative overflow-hidden"
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-pulse/5 to-transparent pointer-events-none" />
            <div>
              <div className="w-12 h-12 bg-pulse/10 rounded-xl flex items-center justify-center mb-4">
                <Code2 className="text-pulse" size={24} />
              </div>
              <h3 className="font-display text-2xl font-bold">Hire TrueWeb</h3>
              <p className="font-mono text-sm text-text-2 mt-2 font-medium">Have a SaaS idea? Need a full-stack developer?</p>
              <ul className="mt-6 space-y-2 font-mono text-xs text-text-3">
                <li>◦ MVP Development</li>
                <li>◦ UI/UX Design</li>
                <li>◦ Technical Consulting</li>
              </ul>
            </div>
            
            <Link href="/contact" className="mt-8 btn-glow justify-center text-center">
              Let's Talk
            </Link>
          </motion.div>

          {/* Email */}
          <motion.div 
            className="md:col-span-2 group card-premium p-8 flex flex-col justify-between border-wire hover:border-pulse"
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between h-full w-full">
              <div>
                <div className="w-12 h-12 bg-surface border border-wire rounded-xl flex items-center justify-center mb-4">
                  <Mail className="text-text-1" size={24} />
                </div>
                <h3 className="font-display text-2xl font-bold">General Contact</h3>
                <p className="font-mono text-xs text-text-2 mt-2">Bookings, press, or saying hi.</p>
              </div>
              
              <Link href="/contact" className="mt-6 md:mt-0 px-6 py-3 border border-wire hover:border-text-1 rounded-md font-mono text-xs uppercase tracking-widest transition-colors flex items-center gap-2">
                Send a Signal <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
