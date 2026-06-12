"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Shield, Award, Heart, X, Calendar, CheckSquare } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import FloatingElements from "@/components/FloatingElements";

export default function Organizations({ items }: { items?: any[] }) {
  const [activeOrg, setActiveOrg] = useState<any | null>(null);
  const { t } = useLanguage();

  const parseJson = (str: string, fallback: any) => {
    if (!str) return fallback;
    try { return JSON.parse(str); } catch { return fallback; }
  };

  const getBilingual = (str: string) => {
    if (!str) return "";
    const parts = str.split(" | ");
    return parts.length > 1 ? t(parts[0].trim(), parts[1].trim()) : str;
  };

  const dbOrgs = (items || []).map((item: any) => ({
    title: getBilingual(item.title),
    role: getBilingual(item.role),
    period: getBilingual(item.period),
    desc: getBilingual(item.description),
    details: getBilingual(item.details),
    highlights: parseJson(item.highlights, []).map((h: string) => getBilingual(h)),
    icon: Shield,
    gallery: parseJson(item.gallery, []).map((g: any) => ({
      img: g.img,
      title: getBilingual(g.title || ""),
      desc: getBilingual(g.desc || "")
    }))
  }));

  const defaultOrgs = [
    {
      title: "Occupational Health, Safety, and Environment Forum (OHSEF) UPNVJ",
      role: t("Staf Research & Development (RnD)", "Staff Research & Development (RnD)"),
      period: t("Februari 2025 - Februari 2026", "February 2025 - February 2026"),
      desc: t(
        "Mengembangkan materi edukasi K3 dan konten berbasis riset untuk meningkatkan kesadaran keselamatan kerja. Terlibat aktif dalam program perencanaan kampanye safety kampus.",
        "Developing OHS educational materials and research-based content to increase safety awareness. Actively involved in campus safety campaign planning programs."
      ),
      details: t(
        "Sebagai bagian dari divisi Research and Development, bertanggung jawab untuk melakukan kajian literatur ilmiah K3, mengolah data hasil riset kesehatan lingkungan, serta menerjemahkan regulasi SMK3 menjadi materi edukasi infografis yang mudah dipahami oleh civitas akademika.",
        "As part of the Research and Development division, responsible for conducting OHS scientific literature reviews, processing environmental health research data, and translating SMK3 regulations into infographic educational materials easily understood by the academic community."
      ),
      highlights: [
        t("Mengembangkan 10+ materi infografis edukasi keselamatan kerja kampus", "Developing 10+ campus safety education infographic materials"),
        t("Mengadakan survey kesadaran keselamatan kerja di lingkungan UPNVJ", "Conducting a safety awareness survey within the UPNVJ environment"),
        t("Kolaborasi aktif antar organisasi dalam seminar K3 nasional", "Actively collaborating across organizations in national OHS seminars")
      ],
      icon: Shield,
      gallery: [
        {
          img: "/extracted/page_10_img_2.jpeg",
          title: t("RISET & EDUKASI OHSEF", "OHSEF RESEARCH & EDUCATION"),
          desc: t("Pengembangan riset K3 dan desain materi edukasi visual keselamatan kerja.", "Development of OHS research and visual education design for occupational safety.")
        }
      ]
    },
    {
      title: t("KSM Batavia (Badan Aksi Tanggap Bencana FIKES UPNVJ)", "KSM Batavia (UPNVJ Faculty of Health Sciences Disaster Response Unit)"),
      role: t("Relawan Anggota", "Volunteer Member"),
      period: t("Februari 2023 - Februari 2024", "February 2023 - February 2024"),
      desc: t(
        "Mengikuti serangkaian pelatihan tanggap darurat, mitigasi bencana, serta pelatihan pertolongan pertama (first aid) dan CPR.",
        "Participating in emergency response training, disaster mitigation, as well as first aid and CPR training."
      ),
      details: t(
        "Berperan aktif dalam program pelatihan fisik dan teoritis mitigasi bencana alam, penanganan cedera olahraga, resusitasi jantung paru (RJP/CPR), serta simulasi evakuasi darurat di lingkungan kampus.",
        "Playing an active role in physical and theoretical training programs for natural disaster mitigation, sports injury management, cardiopulmonary resuscitation (CPR), and emergency evacuation simulations in campus environments."
      ),
      highlights: [
        t("Sertifikasi pelatihan pertolongan pertama (First Aid)", "First Aid training certification"),
        t("Berpartisipasi dalam simulasi tanggap darurat tingkat fakultas", "Participating in faculty-level emergency response simulations"),
        t("Edukasi mitigasi kebakaran skala rumah tangga untuk warga binaan", "Household-scale fire mitigation education for coached residents")
      ],
      icon: Heart,
      gallery: [
        {
          img: "/extracted/page_10_img_3.jpeg",
          title: t("PELATIHAN P3K & RJP", "FIRST AID & CPR TRAINING"),
          desc: t("Latihan simulasi resusitasi jantung paru (CPR) dan penanganan korban darurat.", "CPR simulation and emergency casualty management training.")
        },
        {
          img: "/extracted/page_10_img_4.jpeg",
          title: t("KEAHLIAN MITIGASI BENCANA", "DISASTER MITIGATION SKILLS"),
          desc: t("Mengikuti simulasi pemadaman api awal menggunakan APAR dan karung basah.", "Participating in initial fire suppression simulations using fire extinguishers (APAR) and wet sacks.")
        }
      ]
    },
    {
      title: t("Ayo Sehat Fest Kemenkes RI", "Ayo Sehat Fest Kemenkes RI"),
      role: t("Relawan Panitia", "Volunteer Committee"),
      period: t("November 2023", "November 2023"),
      desc: t(
        "Bertanggung jawab atas kelancaran operasional festival kesehatan nasional Kemenkes di Gelora Bung Karno. Berkoordinasi dengan tim keamanan, logistik, dan medis.",
        "Responsible for the operational smoothness of the Kemenkes national health festival at Gelora Bung Karno. Coordinating with security, logistics, and medical teams."
      ),
      details: t(
        "Mendukung penyelenggaraan acara festival kesehatan berskala nasional yang diinisiasi oleh Kementerian Kesehatan RI. Bertugas memastikan protokol keselamatan pengunjung terpenuhi dan mengelola arus alur fasilitas medis darurat.",
        "Supporting the implementation of a national-scale health festival initiated by the Ministry of Health RI. Tasked with ensuring visitor safety protocols are met and managing the flow of emergency medical facilities."
      ),
      highlights: [
        t("Membantu koordinasi posko P3K dan kesiapan ambulans di area GBK", "Assisting in the coordination of the first aid post and ambulance readiness at the GBK area"),
        t("Mengarahkan alur evakuasi darurat untuk area berkapasitas 5000+ pengunjung", "Directing the emergency evacuation route for an area with a capacity of 5,000+ visitors"),
        t("Menerima penghargaan apresiasi volunteer langsung dari panitia Kemenkes", "Receiving volunteer appreciation awards directly from the Kemenkes committee")
      ],
      icon: Users,
      gallery: [
        {
          img: "/extracted/page_19_img_2.jpeg",
          title: t("AYO SEHAT FEST KEMENKES", "KEMENKES AYO SEHAT FEST"),
          desc: t("Kolaborasi kepanitiaan bersama Kemenkes RI untuk kelancaran posko kesehatan GBK.", "Committee collaboration with Ministry of Health RI for first aid post operational smoothness at GBK.")
        }
      ]
    },
    {
      title: t("UKM UFO Veteran Jakarta (Fotografi, Videografi, & Desain)", "UKM UFO Veteran Jakarta (Photography, Videography, & Design)"),
      role: t("Staf Kreatif", "Creative Staff"),
      period: t("September 2022 - Agustus 2023", "September 2022 - August 2023"),
      desc: t(
        "Mempelajari software SketchUp dan Adobe Photoshop untuk kebutuhan layout dan desain grafis. Memamerkan 2 karya desain di pameran nasional UFOFEST 2023 di Perpustakaan Nasional RI.",
        "Studying SketchUp and Adobe Photoshop software for layout and graphic design needs. Exhibiting 2 design works at the UFOFEST 2023 national exhibition in National Library of Indonesia."
      ),
      details: t(
        "Mengasih keahlian multimedia untuk mendukung kampanye visual dan dokumentasi K3. Mengembangkan tata letak grafis dan konsep pameran untuk meningkatkan keterlibatan publik dalam seni visual.",
        "Honing multimedia skills to support visual campaigns and OHS documentation. Developing graphic layouts and exhibition concepts to increase public engagement in visual arts."
      ),
      highlights: [
        t("Memamerkan 2 karya visual di Galeri Perpustakaan Nasional RI", "Exhibiting 2 visual works at the National Library of Indonesia Gallery"),
        t("Menguasai Adobe Photoshop dan SketchUp untuk pemodelan layout 3D", "Mastering Adobe Photoshop and SketchUp for 3D layout modeling"),
        t("Berkontribusi sebagai tim dokumentasi resmi di berbagai kegiatan kemahasiswaan", "Contributing as official documentation team in various student activities")
      ],
      icon: Award,
      gallery: []
    },
  ];

  const orgs = dbOrgs.length > 0 ? dbOrgs : defaultOrgs;

  return (
    <section id="organizations" className="py-20 bg-[#FDFBF7] text-[#0B1D17] relative overflow-hidden font-sans border-b border-[#E8E2D5]">
      {/* Slow floating background elements */}
      <motion.div
        animate={{
          x: [0, 60, -60, 0],
          y: [0, -50, 50, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-[#6B0F0F]/3 blur-[100px] pointer-events-none z-0"
      />
      <FloatingElements count={6} color="#6B0F0F" />

      <div className="absolute inset-0 bg-[radial-gradient(#6B0F0F02_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 font-sans">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold tracking-tight text-[#0B1D17] sm:text-5xl uppercase font-display italic">
            {t("Organisasi & ", "Organizations & ")}<span className="text-[#6B0F0F] glow-maroon">{t("Kevoluntiran", "Volunteering")}</span>
          </h2>
          <p className="mt-4 text-[#66756F] text-sm font-sans">
            {t(
              "Pengalaman Gita Andini di luar kelas dalam memimpin kegiatan kampanye sosial dan kepedulian K3.",
              "Gita Andini's extracurricular experiences in leading social campaigns and safety awareness."
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sans">
          {orgs.map((org, index) => {
            const Icon = org.icon;
            return (
              <motion.div
                key={org.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                onClick={() => setActiveOrg(org)}
                className="glass p-6 rounded-3xl border border-[#E8E2D5] hover:border-[#6B0F0F]/30 transition-all flex gap-4 relative overflow-hidden bg-white shadow-sm cursor-pointer group"
              >
                <div className="absolute top-0 bottom-0 left-0 w-1 warning-stripes-maroon-cream opacity-20 group-hover:opacity-100 transition-opacity" />

                <div className="bg-[#FAF6EE] border border-[#6B0F0F]/15 w-12 h-12 rounded-2xl flex items-center justify-center text-[#6B0F0F] shrink-0 shadow-sm">
                  <Icon size={24} />
                </div>

                <div className="space-y-2 flex-1">
                  <span className="text-[9px] font-mono text-[#66756F] block uppercase tracking-wider">
                    {org.period}
                  </span>
                  <h3 className="text-sm font-bold text-[#0B1D17] group-hover:text-[#6B0F0F] transition-colors font-sans leading-snug">
                    {org.title}
                  </h3>
                  <p className="text-xs font-mono text-[#6B0F0F] font-semibold">{org.role}</p>
                  <p className="text-xs text-[#66756F] leading-relaxed font-sans line-clamp-2">{org.desc}</p>
                  
                  <span className="block text-[9.5px] font-mono text-[#6B0F0F] font-bold mt-2 group-hover:underline">
                    {t("Lihat kontribusi →", "View contribution →")}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Details Popup Modal */}
      <AnimatePresence>
        {activeOrg && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveOrg(null)}
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
                onClick={() => setActiveOrg(null)}
                className="absolute top-6 right-6 text-[#FAF6EE]/80 hover:text-white bg-black/30 p-2 rounded-full border border-white/10 cursor-pointer transition-colors z-20"
              >
                <X size={20} />
              </button>

              <div className="p-8 md:p-12">
                <div className="border-b border-[#FAF6EE]/15 pb-6">
                  <span className="text-[10px] font-mono text-[#FAF6EE]/75 uppercase tracking-widest font-bold">
                    {t("ORGANISASI & RELAWAN", "ORGANIZATION & VOLUNTEER")}
                  </span>
                  <h3 className="text-3xl md:text-5xl font-display font-extrabold text-white mt-1 italic uppercase tracking-tight leading-none">
                    {activeOrg.title}
                  </h3>
                  <p className="text-sm font-sans text-[#FAF6EE]/80 mt-2 font-semibold uppercase tracking-wider">
                    {t("Peran: ", "Role: ")}{activeOrg.role} &bull; {activeOrg.period}
                  </p>
                </div>

                <div className="mt-6">
                  <p className="text-xs md:text-sm text-[#FAF6EE]/90 leading-relaxed font-sans max-w-4xl">
                    {activeOrg.details}
                  </p>
                </div>

                {/* Photo Gallery Grid */}
                {activeOrg.gallery && activeOrg.gallery.length > 0 && (
                  <div className="mt-10">
                    <h4 className="text-xs font-mono uppercase tracking-widest font-bold text-white mb-6 flex items-center gap-2">
                      <span className="h-1.5 w-1.5 bg-emerald-400 rounded-full animate-ping" />
                      {t("Dokumentasi Foto Kegiatan", "Activity Photo Documentation")}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {activeOrg.gallery.map((item: any, idx: number) => (
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
                    onClick={() => setActiveOrg(null)}
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
