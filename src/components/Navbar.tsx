"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Menu, X, AlertTriangle } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Beranda", href: "#hero" },
    { name: "Tentang", href: "#about" },
    { name: "Pendidikan", href: "#education" },
    { name: "Pengalaman", href: "#experience" },
    { name: "Keahlian", href: "#skills" },
    { name: "Portofolio Proyek", href: "#projects" },
    { name: "Organisasi", href: "#organizations" },
    { name: "Publikasi", href: "#publications" },
    { name: "Hubungi", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-[#E8E2D5]">
      {/* Top running safety ticker */}
      <div className="h-6 bg-[#6B0F0F] text-[#FAF6EE] flex items-center overflow-hidden text-[10px] font-mono select-none border-b border-[#FAF6EE]/15">
        <div className="animate-marquee whitespace-nowrap flex gap-8 font-bold tracking-wider">
          <span className="flex items-center gap-1.5"><AlertTriangle size={11} /> UTAMAKAN KESELAMATAN DAN KESEHATAN KERJA (K3)</span>
          <span className="flex items-center gap-1.5"><ShieldCheck size={11} /> ZERO ACCIDENT TARGET</span>
          <span className="flex items-center gap-1.5"><AlertTriangle size={11} /> THINK SAFETY BEFORE WORK</span>
          <span className="flex items-center gap-1.5"><ShieldCheck size={11} /> SAFETY FIRST ALWAYS</span>
          {/* Duplicated for seamless marquee */}
          <span className="flex items-center gap-1.5"><AlertTriangle size={11} /> UTAMAKAN KESELAMATAN DAN KESEHATAN KERJA (K3)</span>
          <span className="flex items-center gap-1.5"><ShieldCheck size={11} /> ZERO ACCIDENT TARGET</span>
          <span className="flex items-center gap-1.5"><AlertTriangle size={11} /> THINK SAFETY BEFORE WORK</span>
          <span className="flex items-center gap-1.5"><ShieldCheck size={11} /> SAFETY FIRST ALWAYS</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <motion.div
              initial={{ rotate: -10 }}
              animate={{ rotate: [10, -10, 10] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              <ShieldCheck className="h-8 w-8 text-[#6B0F0F] drop-shadow-[0_0_8px_rgba(107,15,15,0.4)]" />
            </motion.div>
            <span className="text-lg font-black tracking-wider text-[#0B1D17]">
              GITA <span className="text-[#6B0F0F] font-extrabold">ANDINI</span>
              <span className="text-[9px] block text-[#66756F] font-mono tracking-widest uppercase">HSE PROFESSIONAL</span>
            </span>
          </div>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-6">
            <div className="flex gap-1">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-[11px] font-mono uppercase tracking-wider text-[#66756F] hover:text-[#6B0F0F] hover:bg-[#6B0F0F]/10 transition-all py-1.5 px-3 rounded-md"
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* Glowing Active beacon */}
            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-250 px-3 py-1 rounded-full">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="h-2 w-2 rounded-full bg-emerald-500 -ml-4" />
              <span className="text-[9px] font-mono text-emerald-700 font-bold uppercase tracking-widest">
                ACTIVE SITE
              </span>
            </div>
          </div>

          {/* Mobile menu trigger */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#0B1D17] hover:bg-[#6B0F0F]/10 p-2 rounded-md"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-22 left-0 right-0 glass border-b border-[#E8E2D5] py-4 px-6 flex flex-col gap-2 bg-[#0B1D17]"
          >
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-zinc-300 hover:text-white hover:bg-white/10 font-mono text-xs uppercase py-2 px-3 transition-colors border-b border-white/5 rounded-md"
              >
                {item.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
