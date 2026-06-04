"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { GraduationCap, Calendar, Award, X, BookOpen } from "lucide-react";

export default function Education() {
  const [activeEdu, setActiveEdu] = useState<any | null>(null);

  const educationList = [
    {
      degree: "S1 Kesehatan Masyarakat (S.KL.)",
      major: "Peminatan Keselamatan dan Kesehatan Kerja (K3)",
      institution: "Universitas Pembangunan Nasional Veteran Jakarta",
      period: "Agustus 2022 - Januari 2026",
      gpa: "IPK 3.88 / 4.00 (Cum Laude)",
      details: "Mempelajari Higiene Industri, Epidemiologi Kerja, Sistem Manajemen Keselamatan dan Kesehatan Kerja (SMK3), Ergonomi, dan Analisis Dampak Lingkungan (AMDAL). Aktif dalam organisasi kemahasiswaan bidang K3.",
      highlights: [
        "Lulus dengan predikat Pujian (Cum Laude)",
        "Spesialisasi riset: Keselamatan dan Kesehatan Kerja (K3)",
        "Tesis systematic review mengenai perbandingan status gizi bayi",
      ]
    },
    {
      degree: "Sekolah Menengah Atas",
      major: "Jurusan Matematika dan Ilmu Pengetahuan Alam (MIPA)",
      institution: "SMAN 104 Jakarta",
      period: "Juli 2019 - Agustus 2022",
      gpa: null,
      details: "Aktif dalam kegiatan akademik MIPA dan ekstrakurikuler kepemimpinan serta organisasi sekolah.",
      highlights: [
        "Fokus peminatan Sains (Fisika, Kimia, Biologi, Matematika)",
        "Aktif dalam kegiatan organisasi internal sekolah",
      ]
    },
  ];

  return (
    <section id="education" className="min-h-screen bg-[#FDFBF7] text-[#0B1D17] relative overflow-hidden flex flex-col lg:flex-row border-b border-[#E8E2D5]">
      
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
            Education
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
                    Lihat detail &rarr;
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
          src="/gita_campus.png"
          alt="UPN Veteran Jakarta Campus Peer Group"
          fill
          className="object-cover object-center"
          sizes="(max-w-1024px) 100vw, 50vw"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#FDFBF7]/40 to-transparent pointer-events-none" />
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
                      Pendidikan Resmi
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
                      <div className="text-[#66756F] font-mono uppercase tracking-wider text-[9px]">Institusi & Periode</div>
                      <div className="text-[#0B1D17] font-bold mt-0.5">{activeEdu.institution} ({activeEdu.period})</div>
                    </div>
                  </div>

                  <div className="p-3 bg-[#FAF6EE] rounded-2xl border border-[#E8E2D5] text-xs">
                    <div className="text-[#66756F] font-mono uppercase tracking-wider text-[9px] mb-1">Kurikulum & Studi</div>
                    <p className="text-[#66756F] leading-relaxed">{activeEdu.details}</p>
                  </div>
                </div>

                <div className="mt-4 flex flex-col gap-2">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-[#66756F] font-bold">Pencapaian Kunci</span>
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
                    Tutup
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
