"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FileText, ArrowRight, ShieldCheck } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen relative overflow-hidden bg-[#FDFBF7] text-[#0B1D17] flex flex-col justify-between select-none"
    >
      {/* Top Half: Dark Maroon Background */}
      <div className="absolute top-0 left-0 right-0 h-[55vh] bg-[#6B0F0F] z-0 flex flex-col justify-end pb-8 border-b-4 border-[#F0E3C0]/25">
        {/* Background grids */}
        <div className="absolute inset-0 bg-[radial-gradient(#F0E3C004_1px,transparent_1px)] [background-size:20px_20px] opacity-30 pointer-events-none" />

        {/* Slanted stripes ////////// in top right */}
        <div className="absolute top-20 right-8 md:right-16 text-3xl font-black text-[#F0E3C0]/15 tracking-tighter pointer-events-none select-none font-mono">
          //////////
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 flex flex-col gap-2">
          {/* Slanted HSE ENTHUSIAST Tag */}
          <motion.div
            initial={{ opacity: 0, x: -50, rotate: -5 }}
            animate={{ opacity: 1, x: 0, rotate: -2 }}
            transition={{ type: "spring", stiffness: 80 }}
            className="self-start bg-[#FAF6EE] text-[#6B0F0F] font-sans font-extrabold uppercase tracking-widest text-xs md:text-sm px-4 py-2 border border-[#6B0F0F]/20 shadow-md mb-2 rounded-full"
          >
            HSE ENTHUSIAST
          </motion.div>

          {/* Large Heading: PORTEFOLIO using Playfair Display */}
          <div className="overflow-hidden w-full text-center">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ type: "spring", stiffness: 70, damping: 15 }}
              className="text-[11vw] font-display font-extrabold uppercase leading-none tracking-tight text-[#F0E3C0] relative -bottom-2 md:-bottom-6 select-none w-full text-center italic"
            >
              Portofolio
            </motion.h1>
          </div>
        </div>
      </div>

      {/* Bottom Half Placeholder to offset layout content */}
      <div className="h-[55vh] pointer-events-none" />

      {/* Bottom Half: Light Warm Alabaster/Cream Background */}
      <div className="flex-1 min-h-[45vh] bg-[#FDFBF7] z-10 relative flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col md:flex-row items-center justify-between gap-8 pt-20 md:pt-8 pb-12">
          {/* Left brand details & K3 gear logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-3"
          >
            {/* Green K3 Gear Icon with Cross */}
            <svg
              className="w-10 h-10 text-emerald-600 fill-current shrink-0 drop-shadow-[0_0_8px_rgba(5,150,105,0.2)] animate-spin-slow"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm1 14h-2v-3H8v-2h3V8h2v3h3v2h-3z" />
            </svg>
            <div className="font-sans">
              <h3 className="text-sm font-black text-[#0B1D17] uppercase tracking-wider">GITA ANDINI</h3>
              <p className="text-[10px] text-[#66756F] font-mono uppercase tracking-widest mt-0.5 font-bold">
                Keselamatan dan Kesehatan Kerja
              </p>
            </div>
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="/CV and Portfolio Gita Andini.pdf"
              download
              className="px-6 py-3.5 bg-[#6B0F0F] hover:bg-[#540c0c] text-white font-sans text-xs font-bold uppercase tracking-wider flex items-center gap-2 border border-[#6B0F0F]/20 transition-all rounded-full shadow-lg"
            >
              <FileText size={14} /> Download CV & Portofolio
            </a>
            <a
              href="#about"
              className="px-6 py-3.5 bg-[#FAF6EE] hover:bg-[#eae3d5] border border-[#6B0F0F]/20 text-[#6B0F0F] font-sans text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 rounded-full"
            >
              Mulai Eksplorasi <ArrowRight size={12} />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Central Overlapping Polaroid Frame (Draggable & Floating Infinitely) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
        <motion.div
          drag
          dragConstraints={{ left: -250, right: 250, top: -150, bottom: 150 }}
          whileDrag={{ scale: 1.08, zIndex: 50 }}
          className="pointer-events-auto cursor-grab active:cursor-grabbing max-w-[260px] md:max-w-[290px] w-full relative"
        >
          <motion.div
            animate={{
              y: [0, -8, 0],
              rotate: [-1, 1, -1],
            }}
            transition={{
              repeat: Infinity,
              duration: 5,
              ease: "easeInOut",
            }}
            className="p-4 pb-8 bg-[#FDFBF7] border border-zinc-200 shadow-[0_25px_60px_rgba(0,0,0,0.35)] relative group rounded-lg"
          >
            {/* Draggable tooltip hint */}
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#0B1D17] text-[#FDFBF7] border border-[#FDFBF7]/25 px-2 py-0.5 rounded text-[8px] font-mono uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
              Geser Foto 👆
            </div>

            {/* Paperclip illustration at top */}
            <div className="absolute -top-3.5 right-6 w-4.5 h-10 border border-zinc-400 rounded-full bg-zinc-200/60 z-30 shadow-sm transform -rotate-12 flex flex-col justify-between pointer-events-none">
              <div className="h-5 w-full border-b border-zinc-400" />
            </div>

            {/* Polaroid paper picture area */}
            <div className="relative aspect-square w-full bg-zinc-100 overflow-hidden border border-zinc-200/80 pointer-events-none">
              <Image
                src="/gita_safety.png"
                alt="Gita Andini Safety Inspector"
                fill
                priority
                className="object-cover"
                sizes="(max-w-700px) 100vw, 300px"
              />

              {/* Glowing K3 approved stamp sticker */}
              <div className="absolute bottom-2 right-2 bg-emerald-900/90 border border-emerald-500/40 text-emerald-300 font-mono text-[7px] font-extrabold tracking-widest px-1.5 py-0.5 rounded uppercase flex items-center gap-1 shadow">
                <ShieldCheck size={8} /> K3 APPROVED
              </div>
            </div>

            {/* Bottom text */}
            <div className="mt-4 text-center font-sans text-[9px] text-zinc-600 font-bold uppercase tracking-wider pointer-events-none">
              GITA ANDINI &bull; SITE SURVEY
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
