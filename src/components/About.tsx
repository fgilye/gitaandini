"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { User, Award, ShieldAlert, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import FloatingElements from "@/components/FloatingElements";

export default function About({ config }: { config: any }) {
  const { t } = useLanguage();

  return (
    <section
      id="about"
      className="py-24 bg-[#FAF6EE] text-[#0B1D17] relative overflow-hidden border-b border-[#E8E2D5]"
    >
      {/* Slow floating orb */}
      <motion.div
        animate={{
          x: [0, 80, -30, 0],
          y: [0, 50, -50, 0],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/3 w-80 h-80 rounded-full bg-[#6B0F0F]/3 blur-[100px] pointer-events-none"
      />
      <FloatingElements count={5} color="#6B0F0F" />

      {/* Background grids */}
      <div className="absolute inset-0 bg-[radial-gradient(#6B0F0F03_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      {/* Decorative arrow lines on left */}
      <div className="absolute top-12 left-8 text-xl font-black text-[#6B0F0F]/10 tracking-widest pointer-events-none select-none font-mono">
        &gt;&gt;&gt;&gt;
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Playful Balloon "Halo, Saya" */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-1 bg-[#6B0F0F] text-white border border-[#6B0F0F]/20 px-4 py-1.5 rounded-full relative shadow-md"
            >
              <span className="text-xs font-mono font-bold">{t(config.about_balloon_id || "Halo, Saya", config.about_balloon_en || "Hello, I am")}</span>
              {/* Pointer cursor arrow */}
              <div className="absolute -bottom-2.5 right-4 w-3.5 h-3.5 bg-[#6B0F0F] transform rotate-45" />
            </motion.div>

            <motion.div className="space-y-2">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-5xl md:text-7xl font-display font-extrabold uppercase leading-none text-[#6B0F0F] tracking-normal italic"
              >
                Gita Andini
              </motion.h2>
              <div className="flex flex-col">
                <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-[#66756F] mb-1">
                  {t("TENTANG SAYA", "ABOUT ME")}
                </span>
                <div className="h-[2px] w-24 bg-[#6B0F0F]" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-4 font-sans text-sm md:text-base leading-relaxed text-[#66756F] max-w-2xl"
            >
              <p>
                {t(
                  config.about_desc1_id || "Saya adalah lulusan Kesehatan Masyarakat dengan fokus pada K3, memiliki pengalaman dalam inspeksi keselamatan, identifikasi bahaya, serta dokumentasi K3 di lingkungan industri kelistrikan dan manufaktur.",
                  config.about_desc1_en || "I am a Public Health graduate specializing in Occupational Health and Safety (OHS), with experience in safety inspections, hazard identification, and OHS documentation in the electrical power and manufacturing industries."
                )}
              </p>
              <p>
                {t(
                  config.about_desc2_id || "Memahami dasar implementasi SMK3, work permit, dan pengendalian risiko kerja, serta berkomitmen untuk mendukung terciptanya lingkungan kerja yang aman dan sesuai standar.",
                  config.about_desc2_en || "Understanding the basics of OHS management system (SMK3) implementation, work permits, and work risk control, and committed to supporting the creation of a safe and compliant working environment."
                )}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-2 text-xs font-mono text-[#0B1D17]">
                <Award size={14} className="text-[#6B0F0F] mt-0.5 shrink-0" />
                <span>{t(config.about_bullet1_id || "Kepatuhan ISO 45001 & SMK3", config.about_bullet1_en || "ISO 45001 & SMK3 Compliance")}</span>
              </div>
              <div className="flex items-start gap-2 text-xs font-mono text-[#0B1D17]">
                <Award size={14} className="text-[#6B0F0F] mt-0.5 shrink-0" />
                <span>{t(config.about_bullet2_id || "Pemantauan Kepatuhan APD", config.about_bullet2_en || "PPE Compliance Monitoring")}</span>
              </div>
            </div>
          </div>

          {/* Right Polaroid Photo Column (Floating looping animation) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, rotate: 3 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 2 }}
            viewport={{ once: true }}
            className="lg:col-span-5 relative flex items-center justify-center pt-8 lg:pt-0"
          >
            {/* Polaroid frame container with float animation */}
            <div className="animate-float-reverse p-4 pb-10 bg-[#FDFBF7] border border-zinc-200 shadow-xl relative max-w-[280px] md:max-w-[320px] w-full transform rotate-[3deg] rounded-lg">
              
              {/* Paperclip top right */}
              <div className="absolute -top-3.5 right-6 w-5 h-12 border-2 border-zinc-400 rounded-full bg-zinc-200/60 z-30 shadow-sm transform -rotate-12 flex flex-col justify-between">
                <div className="h-6 w-full border-b-2 border-zinc-400" />
              </div>

              {/* Photo Area */}
              <div className="relative aspect-[4/5] w-full bg-zinc-100 overflow-hidden border border-zinc-250">
                <Image
                  src="/gita_about_new.png"
                  alt="Gita Andini portrait"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-w-700px) 100vw, 320px"
                />
              </div>

              {/* Bottom text */}
              <div className="mt-4 text-center font-sans text-[10px] text-zinc-550 uppercase tracking-widest font-bold">
                {t(config.about_polaroid_id || "Jakarta • Kampus FIKES 2026", config.about_polaroid_en || "Jakarta • FIKES Campus 2026")}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
