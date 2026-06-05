"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import FloatingElements from "@/components/FloatingElements";

export default function Skills() {
  const { t } = useLanguage();

  const categories = [
    {
      title: t("KEAHLIAN K3 TEKNIS", "TECHNICAL OHS SKILLS"),
      skills: [
        "ISO 45001 & SMK3",
        "HIRA/JSA",
        t("Inspeksi Keselamatan", "Safety Inspection"),
        t("Penilaian Risiko Dasar", "Basic Risk Assessment"),
        t("Pemantauan Kepatuhan APD", "PPE Compliance Monitoring"),
        t("Dokumentasi Keselamatan", "Safety Documentation"),
      ],
    },
    {
      title: t("PAPARAN INDUSTRI & LAPANGAN", "INDUSTRIAL & FIELD EXPOSURE"),
      skills: [
        t("Keselamatan Gardu Induk (PT PLN)", "Substation Safety (PT PLN)"),
        t("Kunjungan Industri ke Industri Petrokimia (Chandra Asri)", "Company Visit to Petrochemical Industry (Chandra Asri)"),
        t("Inspeksi Area Kerja & Safety Walkthrough", "Work Area Inspections & Safety Walkthroughs"),
      ],
    },
    {
      title: t("KOMUNIKASI & KEPEMIMPINAN", "COMMUNICATION & LEADERSHIP"),
      skills: [
        t("Penyuluhan Kesehatan Kerja (JAHE 2024)", "Occupational Health Education (JAHE 2024)"),
        t("Promosi Budaya K3 (Safety Campaign)", "OHS Culture Promotion (Safety Campaign)"),
        t("Komunikasi Kolaboratif & Kepemimpinan", "Collaborative Communication & Leadership"),
      ],
    },
  ];

  return (
    <section id="skills" className="relative overflow-hidden border-b border-[#E8E2D5] font-sans">
      {/* Top Banner (Maroon) */}
      <div className="bg-[#6B0F0F] text-[#F0E3C0] py-16 text-center border-b border-[#F0E3C0]/15 relative">
        <div className="absolute top-4 left-6 text-2xl font-black text-[#F0E3C0]/5 select-none tracking-widest font-mono">
          {t("🛟 UTAMAKAN KESELAMATAN", "🛟 SAFETY FIRST")}
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-6xl md:text-8xl font-display font-extrabold uppercase tracking-tight text-[#F0E3C0] italic"
        >
          {t("Keahlian Diri", "Personal Skills")}
        </motion.h2>
      </div>

      {/* Bottom Content Area (Light Theme Alabaster) */}
      <div className="bg-[#FDFBF7] text-[#0B1D17] py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Slow floating background elements */}
        <motion.div
          animate={{
            x: [0, 50, -50, 0],
            y: [0, 40, -40, 0],
          }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 left-1/3 w-72 h-72 rounded-full bg-[#6B0F0F]/3 blur-[100px] pointer-events-none z-0"
        />
        <FloatingElements count={5} color="#6B0F0F" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="border-2 border-[#E8E2D5] p-8 flex flex-col items-center text-center font-sans relative bg-white shadow-sm rounded-3xl"
            >
              {/* Box title */}
              <h3 className="text-sm font-black text-[#6B0F0F] uppercase tracking-wider mb-6 pb-2 border-b border-[#E8E2D5] w-full text-center font-mono">
                {cat.title}
              </h3>

              {/* Bullet list */}
              <ul className="space-y-4 text-xs font-sans text-[#66756F] text-left w-full">
                {cat.skills.map((skill, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#6B0F0F] shrink-0 mt-0.5">&bull;</span>
                    <span className="leading-relaxed">{skill}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
