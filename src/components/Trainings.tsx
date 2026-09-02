"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, X, Building2, Calendar, CheckSquare, ExternalLink, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import FloatingElements from "@/components/FloatingElements";

export default function Trainings({ items }: { items?: any[] }) {
  const { t } = useLanguage();
  const [activeTraining, setActiveTraining] = useState<any | null>(null);

  const getBilingual = (str: string) => {
    if (!str) return "";
    const parts = str.split(" | ");
    return parts.length > 1 ? t(parts[0], parts[1]) : str;
  };

  const dbTrainings = (items || []).map(item => ({
    title: getBilingual(item.title),
    organizer: getBilingual(item.organizer),
    year: getBilingual(item.year),
    credentialId: item.credentialId || "",
    description: getBilingual(item.description),
    highlights: (() => {
      try { return JSON.parse(item.highlights).map((h: string) => getBilingual(h)); }
      catch { return []; }
    })(),
    link: item.link || ""
  }));

  const trainings = dbTrainings;

  return (
    <section id="trainings" className="py-20 bg-[#FDFBF7] text-[#0B1D17] relative overflow-hidden font-sans border-b border-[#E8E2D5]">
      {/* Background glow */}
      <motion.div
        animate={{
          x: [0, 40, -40, 0],
          y: [0, -30, 30, 0],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-[#6B0F0F]/3 blur-[100px] pointer-events-none z-0"
      />
      <FloatingElements count={5} color="#6B0F0F" />

      <div className="absolute inset-0 bg-[radial-gradient(#6B0F0F02_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 font-sans">
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl uppercase font-display italic text-[#0B1D17]">
            {t("Pelatihan ", "OHS ")}<span className="text-[#6B0F0F] glow-maroon">{t("K3", "Trainings")}</span>
          </h2>
          <p className="mt-4 text-[#66756F] text-sm font-sans">
            {t(
              "Daftar program pelatihan, workshop, dan pembinaan keselamatan dan kesehatan kerja yang telah diikuti.",
              "List of occupational health and safety training programs, workshops, and courses attended by Gita Andini."
            )}
          </p>
        </div>

        {trainings.length === 0 ? (
          <div className="text-center py-12 px-4 rounded-3xl bg-white border border-[#E8E2D5] max-w-md mx-auto">
            <Award className="mx-auto text-[#66756F]/40 mb-3" size={36} />
            <p className="text-sm text-[#66756F] font-mono">
              {t("Belum ada data pelatihan K3.", "No OHS training data added yet.")}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
            {trainings.map((train, index) => (
              <motion.div
                key={train.title + index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                onClick={() => setActiveTraining(train)}
                className="glass p-6 rounded-3xl border border-[#E8E2D5] hover:border-[#6B0F0F]/40 transition-all flex flex-col justify-between relative overflow-hidden bg-white shadow-sm cursor-pointer group hover:shadow-md"
              >
                <div className="absolute top-0 left-0 right-0 h-1.5 warning-stripes-maroon-cream opacity-30 group-hover:opacity-100 transition-opacity" />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="bg-[#FAF6EE] border border-[#6B0F0F]/15 p-2.5 rounded-2xl text-[#6B0F0F] shrink-0">
                      <Award size={20} />
                    </div>
                    <span className="text-xs font-mono font-bold text-[#6B0F0F] bg-[#FAF6EE] border border-[#6B0F0F]/20 px-3 py-1 rounded-full">
                      {train.year}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-[#0B1D17] group-hover:text-[#6B0F0F] transition-colors leading-snug font-sans">
                      {train.title}
                    </h3>
                    <p className="text-xs text-[#66756F] font-mono flex items-center gap-1.5 pt-1">
                      <Building2 size={12} className="shrink-0 text-[#6B0F0F]" />
                      <span className="truncate">{train.organizer}</span>
                    </p>
                  </div>

                  <p className="text-xs text-[#66756F] line-clamp-3 leading-relaxed">
                    {train.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#E8E2D5]/60 flex items-center justify-between">
                  {train.credentialId ? (
                    <span className="text-[10px] font-mono text-[#66756F] truncate flex items-center gap-1">
                      <ShieldCheck size={12} className="text-emerald-600 shrink-0" />
                      ID: {train.credentialId}
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono text-emerald-600 font-bold flex items-center gap-1">
                      <ShieldCheck size={12} /> {t("Sertifikat Resmi", "Certified")}
                    </span>
                  )}

                  <span className="text-[10px] font-mono text-[#6B0F0F] font-bold group-hover:underline">
                    {t("Detail →", "Details →")}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Details Popup Modal */}
      <AnimatePresence>
        {activeTraining && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveTraining(null)}
              className="absolute inset-0 bg-[#0B1D17]/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="glass max-w-lg w-full rounded-3xl border border-[#6B0F0F]/30 overflow-hidden relative z-10 bg-white shadow-2xl"
            >
              <div className="h-2 warning-stripes-maroon-cream" />

              <button
                onClick={() => setActiveTraining(null)}
                className="absolute top-4 right-4 text-[#0B1D17] hover:text-[#6B0F0F] bg-[#FAF6EE] p-1.5 rounded-full border border-[#E8E2D5] cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="p-6 text-[#0B1D17]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-[#FAF6EE] border border-[#6B0F0F]/15 w-12 h-12 rounded-2xl flex items-center justify-center text-[#6B0F0F] shrink-0">
                    <Award size={24} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#6B0F0F] font-bold uppercase tracking-wider block">
                      {activeTraining.year} • {t("Pelatihan K3", "OHS Training")}
                    </span>
                    <h3 className="text-base font-bold text-[#0B1D17] leading-snug font-display italic">
                      {activeTraining.title}
                    </h3>
                  </div>
                </div>

                <div className="space-y-3 font-sans mt-6">
                  <div className="flex items-start gap-3 p-3 bg-[#FAF6EE] rounded-2xl border border-[#E8E2D5] text-xs">
                    <Building2 className="text-[#6B0F0F] shrink-0 mt-0.5" size={16} />
                    <div>
                      <div className="text-[#66756F] font-mono uppercase tracking-wider text-[9px]">{t("Penyelenggara / Lembaga", "Organizer / Institution")}</div>
                      <div className="text-[#0B1D17] font-bold mt-0.5">{activeTraining.organizer}</div>
                    </div>
                  </div>

                  {activeTraining.credentialId && (
                    <div className="flex items-start gap-3 p-3 bg-[#FAF6EE] rounded-2xl border border-[#E8E2D5] text-xs">
                      <ShieldCheck className="text-emerald-600 shrink-0 mt-0.5" size={16} />
                      <div>
                        <div className="text-[#66756F] font-mono uppercase tracking-wider text-[9px]">{t("No. Kredensial / Sertifikat", "Credential / Certificate No.")}</div>
                        <div className="text-[#0B1D17] font-bold font-mono mt-0.5">{activeTraining.credentialId}</div>
                      </div>
                    </div>
                  )}

                  <div className="p-3 bg-[#FAF6EE] rounded-2xl border border-[#E8E2D5] text-xs">
                    <div className="text-[#66756F] font-mono uppercase tracking-wider text-[9px] mb-1">{t("Deskripsi Pelatihan", "Training Description")}</div>
                    <p className="text-[#66756F] leading-relaxed">{activeTraining.description}</p>
                  </div>
                </div>

                {activeTraining.highlights && activeTraining.highlights.length > 0 && (
                  <div className="mt-4 flex flex-col gap-2">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-[#66756F] font-bold">{t("Materi & Keahlian Utama", "Core Topics & Skills Covered")}</span>
                    <div className="flex flex-col gap-2 mt-1">
                      {activeTraining.highlights.map((hl: string, idx: number) => (
                        <div
                          key={idx}
                          className="text-xs text-[#66756F] flex items-start gap-2 leading-relaxed"
                        >
                          <CheckSquare size={12} className="text-emerald-600 shrink-0 mt-0.5" />
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-8 flex justify-end gap-3">
                  {activeTraining.link && (
                    <a
                      href={activeTraining.link.startsWith('http') ? activeTraining.link : `https://${activeTraining.link}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 bg-white border border-[#6B0F0F] text-[#6B0F0F] hover:bg-[#FAF6EE] text-xs font-bold font-mono tracking-wider uppercase rounded-2xl cursor-pointer flex items-center gap-1.5"
                    >
                      <ExternalLink size={14} />
                      {t("Lihat Bukti Sertifikat", "View Certificate")}
                    </a>
                  )}
                  <button
                    onClick={() => setActiveTraining(null)}
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
