"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, X, BookOpen, Calendar, CheckSquare } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import FloatingElements from "@/components/FloatingElements";

export default function Publications({ items }: { items?: any[] }) {
  const { t } = useLanguage();
  const [activePub, setActivePub] = useState<any | null>(null);

  const getBilingual = (str: string) => {
    if (!str) return "";
    const parts = str.split(" | ");
    return parts.length > 1 ? t(parts[0], parts[1]) : str;
  };

  const dbPublications = (items || []).map(item => ({
    title: getBilingual(item.title),
    journal: getBilingual(item.journal),
    year: getBilingual(item.year),
    type: getBilingual(item.type),
    details: getBilingual(item.details),
    highlights: (() => {
      try { return JSON.parse(item.highlights).map((h: string) => getBilingual(h)); }
      catch { return []; }
    })(),
    link: item.link || ""
  }));

  const defaultPublications = [
    {
      title: t(
        "PERBANDINGAN STATUS GIZI BAYI YANG MENDAPATKAN ASI EKSKLUSIF DAN ASI PARSIAL: SYSTEMATIC REVIEW",
        "COMPARISON OF NUTRITIONAL STATUS OF INFANTS RECEIVING EXCLUSIVE BREASTFEEDING AND PARTIAL BREASTFEEDING: A SYSTEMATIC REVIEW"
      ),
      journal: t(
        "Jurnal Ilmu Kesehatan Masyarakat (J-Kesmas) Universitas Al Asyariah Mandar",
        "Journal of Public Health Sciences (J-Kesmas) Universitas Al Asyariah Mandar"
      ),
      year: "2024",
      type: t("Systematic Review", "Systematic Review"),
      details: t(
        "Penelitian ini membandingkan status gizi bayi usia 0-6 bulan yang menerima ASI Eksklusif dengan bayi yang mendapat ASI parsial/tambahan. Menggunakan metodologi penelusuran artikel terindeks SINTA & Google Scholar.",
        "This study compares the nutritional status of infants aged 0-6 months who receive Exclusive Breastfeeding with infants who receive partial/complementary breastfeeding. Using a search methodology of SINTA & Google Scholar indexed articles."
      ),
      highlights: [
        t("Metode: Systematic Review dari 15+ studi klinis terakreditasi", "Method: Systematic Review of 15+ accredited clinical studies"),
        t("Hasil: Bayi dengan ASI eksklusif menunjukkan persentase status gizi normal yang signifikan lebih tinggi", "Result: Infants with exclusive breastfeeding show a significantly higher percentage of normal nutritional status"),
        t("Kontribusi: Memberikan landasan bukti ilmiah untuk promosi program laktasi di puskesmas", "Contribution: Provides a scientific evidence base for the promotion of lactation programs in community health centers (Puskesmas)")
      ]
    },
    {
      title: t(
        "Penyuluhan Untuk Meningkatkan Pemahaman Mengenai Kesehatan Mental Terhadap Siswa Kelas 7B SMP Negeri 223 Jakarta",
        "Counseling to Improve Mental Health Understanding for Grade 7B Students of SMP Negeri 223 Jakarta"
      ),
      journal: "Journal of Human and Education (JAHE)",
      year: "2024",
      type: t("Community Education Article", "Community Education Article"),
      details: t(
        "Artikel pengabdian masyarakat ini mendokumentasikan intervensi edukasi interaktif mengenai deteksi dini stres akademis dan tindakan anti-bullying di kalangan siswa SMP.",
        "This community service article documents interactive educational interventions regarding early detection of academic stress and anti-bullying actions among junior high school students."
      ),
      highlights: [
        t("Intervensi: Sesi edukasi interaktif menggunakan kuis digital dan roleplay", "Intervention: Interactive education sessions using digital quizzes and roleplay"),
        t("Hasil: Peningkatan pemahaman kesehatan mental siswa sebesar 35% berdasarkan hasil pre & post-test", "Result: 35% improvement in students' mental health understanding based on pre & post-test results"),
        t("Implementasi: Pembentukan sudut konseling teman sebaya (peer counseling) di kelas", "Implementation: Establishment of a peer counseling corner in the classroom")
      ]
    },
    {
      title: t(
        "Upaya Membangun Generasi Unggul dengan Menanamkan Unsur Kepemimpinan pada Remaja: Literature Review",
        "Efforts to Build an Excellent Generation by Instilling Leadership Elements in Adolescents: Literature Review"
      ),
      journal: t("Jurnal Pendidikan Tambusai", "Tambusai Education Journal"),
      year: "2024",
      type: t("Literature Review", "Literature Review"),
      details: t(
        "Menganalisis berbagai model pelatihan kepemimpinan remaja berbasis kegiatan ekstrakurikuler sekolah dalam membentuk karakter disiplin, kepedulian sosial, dan tanggung jawab personal.",
        "Analyzing various school extracurricular-based youth leadership training models in forming characters of discipline, social concern, and personal responsibility."
      ),
      highlights: [
        t("Fokus: Teori pembentukan karakter remaja dan kepemimpinan transformasional", "Focus: Youth character building theory and transformational leadership"),
        t("Metodologi: Sintesis pustaka dari 10 tahun terakhir publikasi pendidikan nasional", "Methodology: Literature synthesis from the last 10 years of national education publications"),
        t("Kesimpulan: Pentingnya integrasi softskills kepemimpinan dalam kurikulum kokurikuler", "Conclusion: The importance of integrating leadership soft skills in the co-curricular curriculum")
      ]
    },
  ];

  const publications = dbPublications.length > 0 ? dbPublications : defaultPublications;

  return (
    <section id="publications" className="py-20 bg-[#FAF6EE] text-[#0B1D17] relative overflow-hidden font-sans border-b border-[#E8E2D5]">
      {/* Slow floating background orb */}
      <motion.div
        animate={{
          x: [0, -40, 40, 0],
          y: [0, 50, -50, 0],
        }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 right-1/3 w-80 h-80 rounded-full bg-[#6B0F0F]/3 blur-[100px] pointer-events-none z-0"
      />
      <FloatingElements count={5} color="#6B0F0F" />

      <div className="absolute inset-0 bg-[radial-gradient(#6B0F0F02_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 font-sans">
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl uppercase font-display italic text-[#0B1D17]">
            {t("Publikasi ", "Journal Publications ")}<span className="text-[#6B0F0F] glow-maroon">{t("& Karya Ilmiah", "& Scientific Papers")}</span>
          </h2>
          <p className="mt-4 text-[#66756F] text-sm font-sans">
            {t(
              "Artikel riset ilmiah dan publikasi kesehatan masyarakat yang ditulis oleh Gita Andini.",
              "Scientific research articles and public health publications authored by Gita Andini."
            )}
          </p>
        </div>

        <div className="space-y-6 max-w-4xl mx-auto font-sans">
          {publications.map((pub, index) => (
            <motion.div
              key={pub.title}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setActivePub(pub)}
              className="glass p-6 rounded-3xl border border-[#E8E2D5] hover:border-[#6B0F0F]/30 transition-all flex items-start gap-4 relative overflow-hidden bg-white shadow-sm cursor-pointer group"
            >
              <div className="absolute top-0 bottom-0 left-0 w-1 warning-stripes-maroon-cream opacity-20 group-hover:opacity-100 transition-opacity" />

              <div className="bg-[#FAF6EE] border border-[#6B0F0F]/15 w-10 h-10 rounded-2xl flex items-center justify-center text-[#6B0F0F] shrink-0 shadow-sm">
                <FileText size={18} />
              </div>

              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[9px] font-mono font-bold text-[#6B0F0F] bg-[#FAF6EE] border border-[#6B0F0F]/20 px-2.5 py-0.5 rounded-full">
                    {pub.type}
                  </span>
                  <span className="text-xs font-mono text-[#66756F]">{pub.year}</span>
                </div>
                <h3 className="text-sm font-bold text-[#0B1D17] group-hover:text-[#6B0F0F] transition-colors leading-snug font-sans">
                  {pub.title}
                </h3>
                <p className="text-xs text-[#66756F] italic font-mono pt-1">
                  📚 {pub.journal}
                </p>
                
                <span className="block text-[9.5px] font-mono text-[#6B0F0F] font-bold mt-2.5 group-hover:underline">
                  {t("Lihat abstrak riset →", "View research abstract →")}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Details Popup Modal */}
      <AnimatePresence>
        {activePub && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePub(null)}
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
                onClick={() => setActivePub(null)}
                className="absolute top-4 right-4 text-[#0B1D17] hover:text-[#6B0F0F] bg-[#FAF6EE] p-1.5 rounded-full border border-[#E8E2D5] cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="p-6 text-[#0B1D17]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-[#FAF6EE] border border-[#6B0F0F]/15 w-12 h-12 rounded-2xl flex items-center justify-center text-[#6B0F0F] shrink-0">
                    <BookOpen size={24} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#6B0F0F] font-bold uppercase tracking-wider block">
                      {activePub.type}
                    </span>
                    <h3 className="text-base font-bold text-[#0B1D17] leading-snug font-display italic">
                      {activePub.title}
                    </h3>
                  </div>
                </div>

                <div className="space-y-3 font-sans mt-6">
                  <div className="flex items-start gap-3 p-3 bg-[#FAF6EE] rounded-2xl border border-[#E8E2D5] text-xs">
                    <Calendar className="text-[#66756F] shrink-0 mt-0.5" size={16} />
                    <div>
                      <div className="text-[#66756F] font-mono uppercase tracking-wider text-[9px]">{t("Jurnal & Tahun", "Journal & Year")}</div>
                      <div className="text-[#0B1D17] font-bold mt-0.5">{activePub.journal} ({activePub.year})</div>
                    </div>
                  </div>

                  <div className="p-3 bg-[#FAF6EE] rounded-2xl border border-[#E8E2D5] text-xs">
                    <div className="text-[#66756F] font-mono uppercase tracking-wider text-[9px] mb-1">{t("Abstrak / Ringkasan Riset", "Abstract / Research Summary")}</div>
                    <p className="text-[#66756F] leading-relaxed">{activePub.details}</p>
                  </div>
                </div>

                <div className="mt-4 flex flex-col gap-2">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-[#66756F] font-bold">{t("Metodologi & Temuan Utama", "Methodology & Key Findings")}</span>
                  <div className="flex flex-col gap-2 mt-1">
                    {activePub.highlights.map((hl: string, idx: number) => (
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

                <div className="mt-8 flex justify-end gap-3">
                  {activePub.link && (
                    <a
                      href={activePub.link.startsWith('http') ? activePub.link : `https://${activePub.link}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 bg-white border border-[#6B0F0F] text-[#6B0F0F] hover:bg-[#FAF6EE] text-xs font-bold font-mono tracking-wider uppercase rounded-2xl cursor-pointer"
                    >
                      {t("Kunjungi Publikasi", "Visit Publication")}
                    </a>
                  )}
                  <button
                    onClick={() => setActivePub(null)}
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
