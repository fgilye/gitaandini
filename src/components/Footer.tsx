"use client";

import { ShieldCheck, Mail, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0B1D17] text-[#F0E3C0] border-t border-[#F0E3C0]/10 py-12 relative overflow-hidden">
      {/* Footer warning line strip */}
      <div className="absolute top-0 left-0 right-0 h-1 warning-stripes-maroon-cream" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-[#6B0F0F]" />
          <span className="text-xs font-bold text-[#F0E3C0] font-mono uppercase tracking-wider">
            GITA ANDINI &copy; {new Date().getFullYear()} &bull; SAFETY CULTURE PROMOTER
          </span>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="mailto:gita.andini@email.com"
            className="text-[#A4B2AC] hover:text-white transition-colors"
            title="Email"
          >
            <Mail size={18} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#A4B2AC] hover:text-white transition-colors"
            title="LinkedIn"
          >
            <svg className="h-4.5 w-4.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
          <a
            href="#hero"
            className="text-[#A4B2AC] hover:text-white transition-colors"
            title="Portfolio"
          >
            <Globe size={18} />
          </a>
        </div>

        <div className="text-right text-[9px] font-mono text-[#A4B2AC]/60">
          TERVERIFIKASI &bull; ISO 45001 &bull; K3 UMUM KEMNAKER
        </div>
      </div>
    </footer>
  );
}
