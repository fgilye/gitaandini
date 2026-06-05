"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { User, Calendar, Info, X } from "lucide-react";
import FloatingElements from "@/components/FloatingElements";

export default function Projects() {
  const [activeProj, setActiveProj] = useState<any | null>(null);
  const { t } = useLanguage();

  const projects = [
    {
      id: 1,
      title: t("Pengembangan Digital Dashboard HSSE", "HSSE Digital Dashboard Development"),
      category: t("Digitalisasi", "Digitalization"),
      period: t("Oktober - Desember 2025", "October - December 2025"),
      role: t("Pengembang & Pencipta", "Developer & Creator"),
      description: t(
        "Mengembangkan sistem arsip digital K3 berbasis web untuk mengintegrasikan data HSSE yang sebelumnya tersebar di berbagai media menjadi satu platform terpusat. Sistem ini dirancang untuk meningkatkan efisiensi pengelolaan dokumen, mempermudah akses data, serta mendukung proses pelaporan dan audit K3.",
        "Developed a web-based OHS digital archive system to integrate HSSE data previously scattered across various media into a single centralized platform. This system is designed to improve document management efficiency, simplify data access, and support OHS reporting and audit processes."
      ),
      highlights: [t("Integrasi Data Terpusat", "Centralized Data Integration"), t("Efisiensi Audit Readiness", "Audit Readiness Efficiency"), t("Arsip Digital", "Digital Archive")],
      gallery: [
        {
          img: "/extracted/page_11_img_2.jpeg",
          title: t("METRIK DASHBOARD", "DASHBOARD METRICS"),
          desc: t("Sistem monitoring metrik insiden K3 secara digital.", "Digital monitoring system for OHS incident metrics.")
        },
        {
          img: "/extracted/page_11_img_3.jpeg",
          title: t("PELAPORAN DIGITAL", "DIGITAL REPORTING"),
          desc: t("Formulir pelaporan bahaya real-time terintegrasi.", "Integrated real-time hazard reporting form.")
        },
        {
          img: "/extracted/page_11_img_4.jpeg",
          title: t("ARSIP DOKUMEN", "DOCUMENT ARCHIVE"),
          desc: t("Pusat arsip digital perizinan kerja & file kepatuhan SHE.", "Digital archive center for work permits & SHE compliance files.")
        }
      ]
    },
    {
      id: 2,
      title: t("Edukasi Kebisingan Workshop Room 603", "Noise Education in Workshop Room 603"),
      category: t("Pengabdian Masyarakat", "Community Service"),
      period: t("18 Mei 2025", "18 May 2025"),
      role: t("Wakil Ketua Pelaksana", "Vice Chairman"),
      description: t(
        "Program pengabdian masyarakat yang berfokus pada edukasi risiko kebisingan pada pekerja las. Kegiatan ini bertujuan meningkatkan kesadaran dan pemahaman pekerja terhadap bahaya kebisingan serta penerapan prinsip K3 (seperti penggunaan Earplug/Earmuff) di lingkungan kerja las berisiko tinggi.",
        "A community service program focused on educating welding workers about noise risks. This activity aims to raise workers' awareness and understanding of noise hazards and the implementation of OHS principles (such as using earplugs/earmuffs) in high-risk welding environments."
      ),
      highlights: [t("Pelatihan Keselamatan", "Safety Training"), t("Pencegahan PAK", "Occupational Disease Prevention"), t("Higiene Industri", "Industrial Hygiene")],
      gallery: [
        {
          img: "/extracted/page_13_img_2.jpeg",
          title: t("EDUKASI RISIKO KEBISiNGAN", "NOISE RISK EDUCATION"),
          desc: t("Sosialisasi potensi penurunan pendengaran akibat kebisingan industri las.", "Socialization of potential hearing loss due to welding industry noise.")
        },
        {
          img: "/extracted/page_13_img_3.jpeg",
          title: t("PEMBAGIAN APD KESELAMATAN", "SAFETY PPE DISTRIBUTION"),
          desc: t("Pembagian alat pelindung telinga dan edukasi cara pemakaian yang benar.", "Distribution of hearing protection and education on correct usage.")
        }
      ]
    },
    {
      id: 3,
      title: t("Kunjungan Industri PT Chandra Asri Pacific Tbk", "Company Visit PT Chandra Asri Pacific Tbk"),
      category: t("Paparan Industri", "Industrial Exposure"),
      period: t("11 Juni 2025", "11 June 2025"),
      role: t("Observer K3", "HSE Observer"),
      description: t(
        "Mengamati secara langsung bagaimana sebuah perusahaan petrokimia berskala nasional menjalankan proses produksi sekaligus menegakkan budaya Keselamatan dan Kesehatan Kerja (K3) yang kokoh. Fokus pengamatan meliputi emergency response, Fire safety, dan proses safety management di area refinery.",
        "Directly observing how a national-scale petrochemical company runs its production process while enforcing a solid Occupational Health and Safety (OHS) culture. The observation focus included emergency response, fire safety, and process safety management in the refinery area."
      ),
      highlights: ["Petrochemical Safety", "Hazard Identification", "Emergency Response"],
      gallery: [
        {
          img: "/extracted/page_14_img_2.jpeg",
          title: t("MANAJEMEN KESELAMATAN PROSES", "PROCESS SAFETY MANAGEMENT"),
          desc: t("Observasi panel kontrol keselamatan dan regulasi tanggap darurat kilang.", "Observation of safety control panels and refinery emergency response regulations.")
        },
        {
          img: "/extracted/page_14_img_3.jpeg",
          title: t("KESELAMATAN KEBAKARAN & TUR KILANG", "FIRE SAFETY & REFINERY TOUR"),
          desc: t("Kunjungan lapangan dan inspeksi sistem proteksi kebakaran terpadu.", "Field visit and inspection of the integrated fire protection system.")
        }
      ]
    },
    {
      id: 4,
      title: t("Kunjungan Industri Faber-Castell International Indonesia", "Company Visit Faber-Castell International Indonesia"),
      category: t("Paparan Industri", "Industrial Exposure"),
      period: t("1 Oktober 2024", "1 October 2024"),
      role: t("Observer K3", "HSE Observer"),
      description: t(
        "Melakukan observasi proses produksi di industri manufaktur serta mengidentifikasi potensi bahaya di lingkungan kerja. Memperoleh pemahaman mengenai penerapan keselamatan kerja, khususnya terkait risiko permesinan, penanganan bahan kimia pewarna, dan ergonomi lini perakitan.",
        "Observing production processes in the manufacturing industry and identifying potential hazards in the work environment. Gaining an understanding of work safety implementation, specifically regarding machine risks, dye chemical handling, and assembly line ergonomics."
      ),
      highlights: ["Manufacturing Risk", "Machine Guarding", "Ergonomics Analysis"],
      gallery: [
        {
          img: "/extracted/page_15_img_2.jpeg",
          title: t("INSPEKSI PELINDUNG MESIN", "MACHINE GUARDING INSPECTION"),
          desc: t("Analisis pelindung mesin produksi untuk mencegah kecelakaan kerja.", "Analysis of production machine guarding to prevent work accidents.")
        },
        {
          img: "/extracted/page_15_img_3.jpeg",
          title: t("KESELAMATAN BAHAYA KIMIA", "CHEMICAL HAZARD SAFETY"),
          desc: t("Pengamatan penanganan bahan kimia pewarna dan APD yang sesuai.", "Observation of dye chemical handling and appropriate PPE.")
        }
      ]
    },
    {
      id: 5,
      title: t("Seminar Nasional K3 UPNVJ", "UPNVJ National OHS Seminar"),
      category: t("Acara Profesional", "Professional Events"),
      period: t("5 Juli 2025", "5 July 2025"),
      role: t("Panitia - Divisi Acara & Liaison Officer", "Committee - Event Division & Liaison Officer"),
      description: t(
        "Berkontribusi dalam penyelenggaraan seminar nasional K3 dengan partisipasi ±700 peserta dari seluruh Indonesia bertema 'Gen Z vs Everybody di Dunia K3', yang melibatkan akademisi, praktisi keselamatan kerja, dan perwakilan kementerian.",
        "Contributing to the organization of a national OHS seminar with ±700 participants from all over Indonesia themed 'Gen Z vs Everybody in the OHS World', involving academics, safety practitioners, and ministry representatives."
      ),
      highlights: [t("700+ Peserta", "700+ Participants"), "Liaison Officer", "Event Management"],
      gallery: [
        {
          img: "/extracted/page_16_img_2.jpeg",
          title: t("MANAJEMEN PANGGUNG SEMINAR", "SEMINAR STAGE MANAGEMENT"),
          desc: t("Koordinasi teknis acara dan kesiapan panggung utama seminar.", "Technical coordination of the event and main stage readiness for the seminar.")
        },
        {
          img: "/extracted/page_16_img_3.jpeg",
          title: t("KOORDINASI LIAISON OFFICER", "LIAISON OFFICER COORDINATION"),
          desc: t("Penyambutan dan pendampingan pembicara kementerian dan praktisi K3.", "Welcoming and assisting ministry speakers and OHS practitioners.")
        },
        {
          img: "/extracted/page_16_img_4.jpeg",
          title: t("KETERLIBATAN PESERTA", "PARTICIPANTS ENGAGEMENT"),
          desc: t("Mengelola registrasi dan kelancaran interaksi peserta nasional.", "Managing registration and the smooth interaction of national participants.")
        }
      ]
    },
    {
      id: 6,
      title: t("Sharing Session K3 OHSEF 2025: LOTO", "OHSEF 2025 OHS Sharing Session: LOTO"),
      category: t("Acara Profesional", "Professional Events"),
      period: t("17 Mei 2025", "17 May 2025"),
      role: t("Koordinator Divisi Acara", "Event Division Coordinator"),
      description: t(
        "Memimpin perencanaan dan pelaksanaan kegiatan Sharing Session OHSEF 2025 dengan tema 'Lockout Tagout (LOTO): Protecting Workers from Hazardous Energy', sebagai upaya meningkatkan pemahaman keselamatan isolasi energi berbahaya di kalangan akademisi.",
        "Leading the planning and execution of the OHSEF 2025 Sharing Session with the theme 'Lockout Tagout (LOTO): Protecting Workers from Hazardous Energy', as an effort to increase understanding of hazardous energy isolation safety among academics."
      ),
      highlights: ["Lockout/Tagout (LOTO)", "Safety Campaign", "Leadership"],
      gallery: [
        {
          img: "/extracted/page_17_img_2.jpeg",
          title: t("KREATIF KAMPANYE LOTO", "LOTO CAMPAIGN CREATIVE"),
          desc: t("Penyusunan materi edukasi visual lockout-tagout energi berbahaya.", "Preparation of visual educational materials for lockout-tagout of hazardous energy.")
        },
        {
          img: "/extracted/page_17_img_3.jpeg",
          title: t("ARAHAN SHARING SESSION", "SHARING SESSION DIRECTION"),
          desc: t("Pengarahan pembicara dan manajemen waktu presentasi materi LOTO.", "Speakers briefing and presentation time management for LOTO materials.")
        },
        {
          img: "/extracted/page_17_img_4.jpeg",
          title: t("DISKUSI AUDIENS", "AUDIENCE DISCUSSIONS"),
          desc: t("Fasilitasi sesi tanya jawab mengenai praktek isolasi energi di lapangan.", "Facilitating Q&A sessions on energy isolation practices in the field.")
        }
      ]
    },
  ];

  return (
    <section id="projects" className="py-20 bg-[#FDFBF7] text-[#0B1D17] relative overflow-hidden font-sans border-b border-[#E8E2D5]">
      <FloatingElements count={5} color="#6B0F0F" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold tracking-tight text-[#0B1D17] sm:text-5xl uppercase font-display italic">
            {t("Portofolio", "Portfolio")} <span className="text-[#6B0F0F] glow-maroon">{t("Proyek & K3", "Projects & OHS")}</span>
          </h2>
          <p className="mt-4 text-[#66756F] text-sm font-sans">
            {t(
              "Portofolio proyek K3, kepemimpinan acara keselamatan, dan kunjungan lapangan industri.",
              "Portfolio of OHS projects, safety event leadership, and industrial field visits."
            )}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
          {projects.map((proj, index) => (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -6 }}
              onClick={() => setActiveProj(proj)}
              className="glass p-6 rounded-3xl border border-[#E8E2D5] hover:border-[#6B0F0F]/30 transition-all cursor-pointer flex flex-col justify-between group relative overflow-hidden bg-white shadow-sm"
            >
              <div className="absolute top-0 right-0 w-8 h-8 warning-stripes-maroon-cream transform translate-x-4 -translate-y-4 rotate-45 opacity-0 group-hover:opacity-60 transition-opacity" />

              <div>
                <span className="text-[10px] font-mono text-[#6B0F0F] font-bold uppercase tracking-wider block mb-1">
                  {proj.category}
                </span>
                <h3 className="text-sm font-bold text-[#0B1D17] group-hover:text-[#6B0F0F] transition-colors line-clamp-2 leading-snug">
                  {proj.title}
                </h3>
                <p className="text-xs text-[#66756F] mt-2.5 font-mono">
                  {t("Peran: ", "Role: ")}<span className="text-[#0B1D17] font-sans font-semibold">{proj.role}</span>
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E8E2D5] flex items-center justify-between text-xs text-[#66756F] font-mono">
                <span>{proj.period}</span>
                <span className="flex items-center gap-1 text-[#6B0F0F] font-semibold group-hover:underline">
                  {t("Detail", "Details")} <Info size={12} />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Details Modal */}
      <AnimatePresence>
        {activeProj && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveProj(null)}
              className="fixed inset-0 bg-[#0B1D17]/90 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative z-10 max-w-5xl w-full rounded-3xl border border-[#FAF6EE]/10 overflow-hidden bg-[#6B0F0F] text-[#FAF6EE] shadow-2xl my-8 flex flex-col"
            >
              <div className="h-2 warning-stripes-maroon-cream opacity-50" />

              <button
                onClick={() => setActiveProj(null)}
                className="absolute top-6 right-6 text-[#FAF6EE]/80 hover:text-white bg-black/30 p-2 rounded-full border border-white/10 cursor-pointer transition-colors z-20"
              >
                <X size={20} />
              </button>

              <div className="p-8 md:p-12">
                <div className="border-b border-[#FAF6EE]/15 pb-6">
                  <span className="text-[10px] font-mono text-[#FAF6EE]/75 uppercase tracking-widest font-bold">
                    {activeProj.category}
                  </span>
                  <h3 className="text-3xl md:text-5xl font-display font-extrabold text-white mt-1 italic uppercase tracking-tight leading-none">
                    {activeProj.title}
                  </h3>
                  <p className="text-sm font-sans text-[#FAF6EE]/80 mt-2 font-semibold uppercase tracking-wider">
                    {t("Peran: ", "Role: ")}{activeProj.role} &bull; {activeProj.period}
                  </p>
                </div>

                <div className="mt-6">
                  <p className="text-xs md:text-sm text-[#FAF6EE]/90 leading-relaxed font-sans max-w-4xl">
                    {activeProj.description}
                  </p>
                </div>

                {/* Photo Gallery Grid */}
                {activeProj.gallery && activeProj.gallery.length > 0 && (
                  <div className="mt-10">
                    <h4 className="text-xs font-mono uppercase tracking-widest font-bold text-white mb-6 flex items-center gap-2">
                      <span className="h-1.5 w-1.5 bg-emerald-400 rounded-full animate-ping" />
                      {t("Dokumentasi Kegiatan & Observasi", "Activity Documentation & Observations")}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {activeProj.gallery.map((item: any, idx: number) => (
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
                    onClick={() => setActiveProj(null)}
                    className="px-6 py-3 bg-[#FAF6EE] hover:bg-white text-[#6B0F0F] text-xs font-bold font-mono tracking-wider uppercase rounded-2xl cursor-pointer transition-colors shadow-lg"
                  >
                    {t("Tutup Dokumentasi", "Close Documentation")}
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
