"use client";

import Link from "next/link";
import { Github, Instagram, Youtube, Mail, ChevronRight, Terminal } from "lucide-react";
import { MUSIC_IDS } from "@/data/musicIds";

const footerLinks = {
  navigation: [
    { label: "Home", href: "/" },
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Skills", href: "/skills" },
    { label: "Music", href: "/music" },
    { label: "Store", href: "/store" },
    { label: "Socials", href: "/socials" },
    { label: "Contact", href: "/contact" },
  ],
  socials: [
    { label: "Instagram", href: `https://instagram.com/${MUSIC_IDS.instagramHandle}`, icon: Instagram },
    { label: "YouTube", href: `https://youtube.com/@${MUSIC_IDS.youtubeChannelId}`, icon: Youtube },
    { label: "GitHub", href: "https://github.com/bibi231", icon: Github },
  ]
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-wire bg-ink pt-16 pb-8 mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <span className="font-display font-bold text-3xl tracking-wide text-text-1">
                beetrus<span className="text-pulse">.</span>
              </span>
            </Link>
            <p className="mt-4 max-w-md text-text-2 leading-relaxed">
              Software engineer, technical founder, and Afrosounds artist based in Abuja, Nigeria. Building AI products and making music.
            </p>
            
            <div className="mt-8 flex items-center gap-2 font-mono text-xs text-text-3">
              <Terminal size={14} className="text-pulse" />
              <span>system_status:</span>
              <span className="text-lime">ONLINE</span>
            </div>
          </div>

          <div>
            <h4 className="mb-5 text-sm font-mono font-semibold uppercase tracking-widest text-text-1">
              Index
            </h4>
            <ul className="space-y-3">
              {footerLinks.navigation.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-text-2 transition-colors hover:text-text-1 font-mono text-sm"
                  >
                    <ChevronRight size={14} className="text-pulse opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-sm font-mono font-semibold uppercase tracking-widest text-text-1">
              Connect
            </h4>
            <ul className="space-y-3">
              {footerLinks.socials.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 text-text-2 transition-colors hover:text-text-1 font-mono text-sm"
                  >
                    <link.icon size={16} className="text-pulse opacity-50 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-3 text-text-2 transition-colors hover:text-text-1 font-mono text-sm"
                >
                  <Mail size={16} className="text-pulse opacity-50 group-hover:opacity-100 transition-opacity" />
                  Email
                </Link>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-16 border-t border-wire pt-8 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs text-text-3">
          <p>© {currentYear} Bitrus Sariki. All rights reserved.</p>
          <p>Made with Nigerian hustle.</p>
        </div>
      </div>
    </footer>
  );
}
