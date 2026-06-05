"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Menu, X, AlertTriangle, LogIn } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  const menuItems = [
    { name: t("Beranda", "Home"), href: "#hero" },
    { name: t("Tentang", "About"), href: "#about" },
    { name: t("Pendidikan", "Education"), href: "#education" },
    { name: t("Pengalaman", "Experience"), href: "#experience" },
    { name: t("Keahlian", "Skills"), href: "#skills" },
    { name: t("Proyek", "Projects"), href: "#projects" },
    { name: t("Organisasi", "Organizations"), href: "#organizations" },
    { name: t("Publikasi", "Publications"), href: "#publications" },
    { name: t("Kontak", "Contact"), href: "#contact" },
  ];

  return (
    <>
      {/* Top running safety ticker - fixed at top */}
      <div className="fixed top-0 left-0 right-0 h-6 bg-[#6B0F0F] text-[#FAF6EE] flex items-center overflow-hidden text-[10px] font-mono select-none z-50 border-b border-[#FAF6EE]/15">
        <div className="animate-marquee whitespace-nowrap flex gap-8 font-bold tracking-wider">
          <span className="flex items-center gap-1.5"><AlertTriangle size={11} /> {t("UTAMAKAN KESELAMATAN DAN KESEHATAN KERJA (K3)", "PRIORITIZE OCCUPATIONAL HEALTH AND SAFETY (OHS)")}</span>
          <span className="flex items-center gap-1.5"><ShieldCheck size={11} /> {t("TARGET NOL KECELAKAAN", "ZERO ACCIDENT TARGET")}</span>
          <span className="flex items-center gap-1.5"><AlertTriangle size={11} /> {t("PIKIRKAN KESELAMATAN SEBELUM BEKERJA", "THINK SAFETY BEFORE WORK")}</span>
          <span className="flex items-center gap-1.5"><ShieldCheck size={11} /> {t("UTAMAKAN KESELAMATAN SELALU", "SAFETY FIRST ALWAYS")}</span>
          {/* Duplicated for seamless marquee */}
          <span className="flex items-center gap-1.5"><AlertTriangle size={11} /> {t("UTAMAKAN KESELAMATAN DAN KESEHATAN KERJA (K3)", "PRIORITIZE OCCUPATIONAL HEALTH AND SAFETY (OHS)")}</span>
          <span className="flex items-center gap-1.5"><ShieldCheck size={11} /> {t("TARGET NOL KECELAKAAN", "ZERO ACCIDENT TARGET")}</span>
          <span className="flex items-center gap-1.5"><AlertTriangle size={11} /> {t("PIKIRKAN KESELAMATAN SEBELUM BEKERJA", "THINK SAFETY BEFORE WORK")}</span>
          <span className="flex items-center gap-1.5"><ShieldCheck size={11} /> {t("UTAMAKAN KESELAMATAN SELALU", "SAFETY FIRST ALWAYS")}</span>
        </div>
      </div>

      {/* Main Navbar: Fixed at top-6 on mobile, floats at top-10 on desktop */}
      <nav className="fixed top-6 left-0 right-0 z-50 glass border-b border-[#E8E2D5] lg:top-10 lg:left-1/2 lg:-translate-x-1/2 lg:w-[calc(100%-4rem)] lg:max-w-6xl lg:rounded-full lg:border lg:shadow-lg transition-all duration-300">
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
                <span className="text-[9px] block text-[#66756F] font-mono tracking-widest uppercase">{t("SPESIALIS K3", "HSE PROFESSIONAL")}</span>
              </span>
            </div>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-6">
              <div className="flex gap-1">
                {menuItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-[11px] font-mono uppercase tracking-wider text-[#66756F] hover:text-[#6B0F0F] hover:bg-[#6B0F0F]/10 transition-all py-1.5 px-3 rounded-full"
                  >
                    {item.name}
                  </a>
                ))}
              </div>

              {/* Login Button */}
              <a
                href="/login"
                className="flex items-center gap-1.5 bg-[#6B0F0F] hover:bg-[#540c0c] text-white text-[11px] font-mono font-bold uppercase tracking-wider px-4 py-2 rounded-full transition-all duration-200 shadow-sm hover:shadow-md hover:scale-105"
              >
                <LogIn size={13} />
                <span>{t("Masuk", "Login")}</span>
              </a>
            </div>

            {/* Mobile menu trigger */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-[#0B1D17] hover:bg-[#6B0F0F]/10 p-2 rounded-md transition-colors"
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile nav panel (slides down from the top navbar) */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="lg:hidden absolute top-16 left-0 right-0 py-6 px-6 flex flex-col gap-2.5 bg-white border-b-4 border-[#6B0F0F] shadow-[0_20px_50px_rgba(107,15,15,0.15)] max-h-[85vh] overflow-y-auto z-50 rounded-b-3xl"
            >
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-[#0B1D17] hover:text-[#6B0F0F] hover:bg-[#6B0F0F]/10 font-mono text-xs font-bold uppercase tracking-wider py-3 px-4 transition-all duration-200 rounded-xl flex items-center justify-between border border-[#E8E2D5]/40 hover:border-transparent group"
                >
                  <span>{item.name}</span>
                  <span className="text-[10px] transform group-hover:translate-x-1 transition-transform">→</span>
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
