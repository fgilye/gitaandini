"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ClipboardCheck, Eye, CheckSquare, Calendar, Briefcase, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import FloatingElements from "@/components/FloatingElements";

export default function Timeline({ items }: { items?: any[] }) {
  const [activeExp, setActiveExp] = useState<any | null>(null);
  const { t } = useLanguage();

  const parseJson = (str: string, fallback: any) => {
    if (!str) return fallback;
    try { return JSON.parse(str); } catch { return fallback; }
  };

  const getBilingual = (str: string) => {
    if (!str) return "";
    const parts = str.split(" | ");
    return parts.length > 1 ? t(parts[0], parts[1]) : str;
  };

  const experiences = (items || []).map(item => ({
    ...item,
    role: item.role,
    company: item.company,
    period: item.period,
    description: item.description,
    highlights: parseJson(item.highlights, []).map((h: string) => getBilingual(h)),
    gallery: parseJson(item.gallery, []).map((g: any) => ({
      img: g.img,
      title: getBilingual(g.title || ""),
      desc: getBilingual(g.desc || "")
    })),
    icon: Briefcase
  }));

  return (
    <section id="experience" className="py-20 bg-[#FAF6EE] text-[#0B1D17] relative overflow-hidden border-b border-[#E8E2D5]">
      {/* Slow floating background elements */}
      <motion.div
        animate={{
          x: [0, -50, 50, 0],
          y: [0, 60, -60, 0],
        }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-[#6B0F0F]/3 blur-[100px] pointer-events-none z-0"
      />
      <FloatingElements count={6} color="#6B0F0F" />

      <div className="absolute inset-0 bg-[radial-gradient(#6B0F0F02_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 font-sans">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold tracking-tight text-[#0B1D17] sm:text-5xl uppercase font-display italic">
            {t("Pengalaman ", "Work ")}<span className="text-[#6B0F0F] glow-maroon">{t("Kerja", "Experience")}</span>
          </h2>
          <p className="mt-4 text-[#66756F] text-sm font-sans">
            {t(
              "Kontribusi nyata Gita Andini dalam menjaga kepatuhan regulasi keselamatan dan pencegahan bahaya di sektor manufaktur semen dan kelistrikan nasional.",
              "Gita Andini's tangible contribution to maintaining safety regulation compliance and hazard prevention in the cement manufacturing and national electrical sectors."
            )}
          </p>
        </div>

        <div className="relative border-l border-[#6B0F0F]/15 ml-4 md:ml-32 font-sans">
          {experiences.map((exp, index) => {
            const Icon = exp.icon;
            return (
              <div key={exp.company + index} className="mb-12 relative pl-8 md:pl-12">
                {/* Period tag for desktop */}
                <div className="hidden md:block absolute -left-36 top-1 text-right w-28 text-xs font-mono font-bold text-[#66756F]">
                  <span className="bg-white border border-[#E8E2D5] px-3.5 py-1 rounded-full text-[#6B0F0F] shadow-sm">
                    {exp.period}
                  </span>
                </div>

                {/* Timeline Node Icon */}
                <div className="absolute -left-4 top-1 w-8 h-8 rounded-full bg-white border border-[#6B0F0F] flex items-center justify-center text-[#6B0F0F] shadow-md">
                  <Icon size={14} />
                </div>

                {/* Experience Detail Card */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                  onClick={() => setActiveExp(exp)}
                  className="glass p-6 rounded-3xl border border-[#E8E2D5] relative bg-white shadow-sm cursor-pointer group"
                >
                  <span className="inline-block md:hidden bg-white border border-[#E8E2D5] px-3 py-0.5 rounded-full text-[10px] font-mono text-[#6B0F0F] mb-2 font-bold uppercase">
                    {exp.period}
                  </span>
                  
                  <h3 className="text-lg font-bold text-[#0B1D17] group-hover:text-[#6B0F0F] transition-colors">{exp.role}</h3>
                  <h4 className="text-sm text-[#66756F] font-semibold mt-0.5">{exp.company}</h4>
                  
                  <p className="text-xs text-[#66756F] mt-3 leading-relaxed font-sans line-clamp-2">
                    {exp.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-[#E8E2D5] flex items-center justify-between text-[10px] font-mono text-[#6B0F0F] font-bold">
                    <span>Klik untuk melihat foto & detail dokumentasi lapangan</span>
                    <span className="group-hover:underline">Lihat detail &rarr;</span>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Details Popup Modal */}
      <AnimatePresence>
        {activeExp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveExp(null)}
              className="fixed inset-0 bg-[#0B1D17]/90 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative z-10 max-w-5xl w-full rounded-3xl border border-[#FAF6EE]/10 overflow-hidden bg-[#6B0F0F] text-[#FAF6EE] shadow-2xl my-8 flex flex-col"
            >
              {/* Header stripes */}
              <div className="h-2 warning-stripes-maroon-cream opacity-50" />

              <button
                onClick={() => setActiveExp(null)}
                className="absolute top-6 right-6 text-[#FAF6EE]/80 hover:text-white bg-black/30 p-2 rounded-full border border-white/10 cursor-pointer transition-colors z-20"
              >
                <X size={20} />
              </button>

              <div className="p-8 md:p-12">
                <div className="border-b border-[#FAF6EE]/15 pb-6">
                  <span className="text-[10px] font-mono text-[#FAF6EE]/75 uppercase tracking-widest font-bold">
                    WORK EXPERIENCE
                  </span>
                  <h3 className="text-3xl md:text-5xl font-display font-extrabold text-white mt-1 italic uppercase tracking-tight leading-none">
                    {activeExp.role}
                  </h3>
                  <p className="text-sm font-sans text-[#FAF6EE]/80 mt-2 font-semibold uppercase tracking-wider">
                    {activeExp.company} &bull; {activeExp.period}
                  </p>
                </div>

                {/* Subtitle / Description */}
                <div className="mt-6">
                  <p className="text-xs md:text-sm text-[#FAF6EE]/90 leading-relaxed font-sans max-w-4xl">
                    {activeExp.description}
                  </p>
                </div>

                {/* Photo Gallery Grid */}
                {activeExp.gallery && activeExp.gallery.length > 0 && (
                  <div className="mt-10">
                    <h4 className="text-xs font-mono uppercase tracking-widest font-bold text-white mb-6 flex items-center gap-2">
                      <span className="h-1.5 w-1.5 bg-emerald-400 rounded-full animate-ping" />
                      Dokumentasi Foto Lapangan K3
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {activeExp.gallery.map((item: any, idx: number) => (
                        <div key={idx} className="bg-black/20 border border-white/5 p-4 rounded-2xl flex flex-col justify-between">
                          <div className="relative aspect-[4/3] w-full bg-black/40 overflow-hidden rounded-xl border border-white/10 shadow-inner group">
                            <img
                              src={item.img}
                              alt={item.title}
                              className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>
                          <div className="mt-4 space-y-1.5">
                            <h5 className="text-[11px] font-mono font-bold text-[#FAF6EE] uppercase tracking-wider">
                              {item.title}
                            </h5>
                            <p className="text-[10.5px] text-[#FAF6EE]/75 leading-relaxed font-sans">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-10 pt-6 border-t border-[#FAF6EE]/15 flex justify-end">
                  <button
                    onClick={() => setActiveExp(null)}
                    className="px-6 py-3 bg-[#FAF6EE] hover:bg-white text-[#6B0F0F] text-xs font-bold font-mono tracking-wider uppercase rounded-2xl cursor-pointer transition-colors shadow-lg"
                  >
                    Tutup Dokumentasi
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
