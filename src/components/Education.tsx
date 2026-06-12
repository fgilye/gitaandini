"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";
import { GraduationCap, Calendar, Award, X, BookOpen } from "lucide-react";
import FloatingElements from "@/components/FloatingElements";

export default function Education({ items = [] }: { items?: any[] }) {
  const [activeEdu, setActiveEdu] = useState<any | null>(null);
  const { t } = useLanguage();

  const getBilingual = (str: string) => {
    if (!str) return "";
    const parts = str.split(" | ");
    return parts.length > 1 ? t(parts[0].trim(), parts[1].trim()) : str;
  };

  const dbEducationList = items.map((item: any) => ({
    degree: getBilingual(item.degree),
    major: getBilingual(item.major),
    institution: getBilingual(item.school),
    period: getBilingual(item.period),
    gpa: getBilingual(item.gpa),
    details: getBilingual(item.description),
    highlights: (() => {
      try {
        const parsed = JSON.parse(item.highlights);
        if (Array.isArray(parsed)) {
          return parsed.map((h: string) => getBilingual(h));
        }
        return [];
      } catch (e) {
        return [];
      }
    })()
  }));

  const educationList = items.length > 0 ? dbEducationList : [
    {
      degree: t("S1 Kesehatan Masyarakat (S.KL.)", "Bachelor of Public Health (S.KL.)"),
      major: t("Peminatan Keselamatan dan Kesehatan Kerja (K3)", "Specializing in Occupational Health and Safety (OHS)"),
      institution: "Universitas Pembangunan Nasional Veteran Jakarta",
      period: t("Agustus 2022 - Januari 2026", "August 2022 - January 2026"),
      gpa: t("IPK 3.88 / 4.00 (Cum Laude)", "GPA 3.88 / 4.00 (Cum Laude)"),
      details: t(
        "Mempelajari Higiene Industri, Epidemiologi Kerja, Sistem Manajemen Keselamatan dan Kesehatan Kerja (SMK3), Ergonomi, dan Analisis Dampak Lingkungan (AMDAL). Aktif dalam organisasi kemahasiswaan bidang K3.",
        "Studying Industrial Hygiene, Occupational Epidemiology, OHS Management System (SMK3), Ergonomics, and Environmental Impact Assessment (AMDAL). Active in OHS student organizations."
      ),
      highlights: [
        t("Lulus dengan predikat Pujian (Cum Laude)", "Graduated with honors (Cum Laude)"),
        t("Spesialisasi riset: Keselamatan dan Kesehatan Kerja (K3)", "Research specialization: Occupational Health and Safety (OHS)"),
        t("Tesis systematic review mengenai perbandingan status gizi bayi", "Systematic review thesis on comparison of infant nutritional status"),
      ]
    },
    {
      degree: t("Sekolah Menengah Atas", "High School"),
      major: t("Jurusan Matematika dan Ilmu Pengetahuan Alam (MIPA)", "Mathematics and Natural Sciences (MIPA)"),
      institution: "SMAN 104 Jakarta",
      period: t("Juli 2019 - Agustus 2022", "July 2019 - August 2022"),
      gpa: null,
      details: t(
        "Aktif dalam kegiatan akademik MIPA dan ekstrakurikuler kepemimpinan serta organisasi sekolah.",
        "Active in MIPA academic activities, leadership extracurriculars, and school organizations."
      ),
      highlights: [
        t("Fokus peminatan Sains (Fisika, Kimia, Biologi, Matematika)", "Focused on Science (Physics, Chemistry, Biology, Mathematics)"),
        t("Aktif dalam kegiatan organisasi internal sekolah", "Active in school internal organizations"),
      ]
    },
  ];

  return (
    <section id="education" className="min-h-screen bg-[#FDFBF7] text-[#0B1D17] relative overflow-hidden flex flex-col lg:flex-row border-b border-[#E8E2D5]">
      {/* Slow floating background elements */}
      <motion.div
        animate={{
          x: [0, 60, -30, 0],
          y: [0, 40, -40, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-[#6B0F0F]/3 blur-[100px] pointer-events-none z-0"
      />
      <FloatingElements count={5} color="#6B0F0F" />
      
      {/* Left Column: Education Content */}
      <div className="lg:w-1/2 p-8 md:p-16 flex flex-col justify-center relative z-10">
        <div className="space-y-12">
          {/* Huge Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl md:text-8xl font-display font-extrabold uppercase tracking-tight text-[#6B0F0F] italic"
          >
            {t("Pendidikan", "Education")}
          </motion.h2>

          {/* Education Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left">
            {educationList.map((edu, index) => (
              <motion.div
                key={edu.degree + index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                onClick={() => setActiveEdu(edu)}
                className="relative pl-6 cursor-pointer bg-white p-6 rounded-3xl border border-[#E8E2D5] shadow-sm hover:border-[#6B0F0F]/30 transition-all group"
              >
                {/* Star / Asterisk K3 Icon */}
                <div className="absolute left-4 top-6 w-4.5 h-4.5 bg-[#FAF6EE] text-[#6B0F0F] flex items-center justify-center rounded-full text-[10px] font-bold border border-[#6B0F0F]/20">
                  &lowast;
                </div>
                <div className="pl-4">
                  <span className="text-[10px] font-bold text-[#66756F] block">{edu.period}</span>
                  <h3 className="text-sm font-bold text-[#0B1D17] group-hover:text-[#6B0F0F] uppercase tracking-wider mt-1 transition-colors leading-snug">
                    {edu.degree}
                  </h3>
                  <p className="text-[10px] text-[#66756F] font-sans mt-0.5 font-semibold">
                    {edu.institution}
                  </p>
                  
                  {edu.gpa && (
                    <span className="inline-block text-[9px] font-sans font-bold bg-[#FAF6EE] border border-[#6B0F0F]/25 px-2.5 py-0.5 rounded-full text-[#6B0F0F] mt-2">
                      {edu.gpa}
                    </span>
                  )}
                  
                  <span className="block text-[9px] font-mono text-[#6B0F0F] font-bold mt-3 group-hover:underline">
                    {t("Lihat detail →", "View details →")}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column: Campus Image */}
      <div className="lg:w-1/2 min-h-[40vh] lg:min-h-screen relative border-t lg:border-t-0 lg:border-l border-[#E8E2D5]">
        <Image
          src="/gita_campus_new.png"
          alt="UPN Veteran Jakarta Campus Peer Group"
          fill
          className="object-cover object-center"
          sizes="(max-w-1024px) 100vw, 50vw"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#FDFBF7]/40 to-transparent pointer-events-none" />
        
        {/* Campus Caption Badge */}
        <div className="absolute bottom-6 right-6 bg-white/80 backdrop-blur-md border border-[#E8E2D5] px-4 py-2 rounded-full shadow-sm text-xs font-mono text-[#6B0F0F] font-bold z-10">
          {t("Jakarta • Kampus FIKES 2026", "Jakarta • FIKES Campus 2026")}
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {activeEdu && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveEdu(null)}
              className="absolute inset-0 bg-[#0B1D17]/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="glass max-w-lg w-full rounded-3xl border border-[#6B0F0F]/30 overflow-hidden relative z-10 bg-white"
            >
              <div className="h-2 warning-stripes-maroon-cream" />

              <button
                onClick={() => setActiveEdu(null)}
                className="absolute top-4 right-4 text-[#0B1D17] hover:text-[#6B0F0F] bg-[#FAF6EE] p-1.5 rounded-full border border-[#E8E2D5] cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="p-6 text-[#0B1D17]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-[#FAF6EE] border border-[#6B0F0F]/15 w-12 h-12 rounded-2xl flex items-center justify-center text-[#6B0F0F] shrink-0">
                    <GraduationCap size={24} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#6B0F0F] font-bold uppercase tracking-wider block">
                      {t("Pendidikan Resmi", "Official Education")}
                    </span>
                    <h3 className="text-base font-bold text-[#0B1D17] leading-snug">
                      {activeEdu.degree}
                    </h3>
                  </div>
                </div>

                <div className="space-y-3 font-sans mt-6">
                  <div className="flex items-start gap-3 p-3 bg-[#FAF6EE] rounded-2xl border border-[#E8E2D5] text-xs">
                    <Calendar className="text-[#66756F] shrink-0 mt-0.5" size={16} />
                    <div>
                      <div className="text-[#66756F] font-mono uppercase tracking-wider text-[9px]">{t("Institusi & Periode", "Institution & Period")}</div>
                      <div className="text-[#0B1D17] font-bold mt-0.5">{activeEdu.institution} ({activeEdu.period})</div>
                    </div>
                  </div>

                  <div className="p-3 bg-[#FAF6EE] rounded-2xl border border-[#E8E2D5] text-xs">
                    <div className="text-[#66756F] font-mono uppercase tracking-wider text-[9px] mb-1">{t("Kurikulum & Studi", "Curriculum & Studies")}</div>
                    <p className="text-[#66756F] leading-relaxed">{activeEdu.details}</p>
                  </div>
                </div>

                <div className="mt-4 flex flex-col gap-2">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-[#66756F] font-bold">{t("Pencapaian Kunci", "Key Achievements")}</span>
                  <div className="flex flex-col gap-1.5">
                    {activeEdu.highlights.map((hl: string, idx: number) => (
                      <span
                        key={idx}
                        className="text-xs text-[#66756F] flex items-center gap-2"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-[#6B0F0F]" />
                        {hl}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    onClick={() => setActiveEdu(null)}
                    className="px-5 py-2.5 bg-[#6B0F0F] hover:bg-[#540c0c] text-white text-xs font-bold font-mono tracking-wider uppercase rounded-2xl cursor-pointer"
                  >
                    {t("Tutup", "Close")}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
