"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Shield, Award, Heart, X, Calendar, CheckSquare } from "lucide-react";

export default function Organizations() {
  const [activeOrg, setActiveOrg] = useState<any | null>(null);

  const orgs = [
    {
      title: "Occupational Health, Safety, and Environment Forum (OHSEF) UPNVJ",
      role: "Staff Research & Development (RnD)",
      period: "Februari 2025 - Februari 2026",
      desc: "Mengembangkan materi edukasi K3 dan konten berbasis riset untuk meningkatkan kesadaran keselamatan kerja. Terlibat aktif dalam program perencanaan kampanye safety kampus.",
      details: "Sebagai bagian dari divisi Research and Development, bertanggung jawab untuk melakukan kajian literatur ilmiah K3, mengolah data hasil riset kesehatan lingkungan, serta menerjemahkan regulasi SMK3 menjadi materi edukasi infografis yang mudah dipahami oleh civitas akademika.",
      highlights: [
        "Mengembangkan 10+ materi infografis edukasi keselamatan kerja kampus",
        "Mengadakan survey kesadaran keselamatan kerja di lingkungan UPNVJ",
        "Kolaborasi aktif antar organisasi dalam seminar K3 nasional"
      ],
      icon: Shield,
      gallery: [
        {
          img: "/extracted/page_10_img_2.jpeg",
          title: "OHSEF RESEARCH & EDUCATION",
          desc: "Pengembangan riset K3 dan desain materi edukasi visual keselamatan kerja."
        }
      ]
    },
    {
      title: "KSM Batavia (Badan Aksi Tanggap Bencana FIKES UPNVJ)",
      role: "Volunteer Anggota",
      period: "Februari 2023 - Februari 2024",
      desc: "Mengikuti serangkaian pelatihan tanggap darurat, mitigasi bencana, serta pelatihan pertolongan pertama (first aid) dan CPR.",
      details: "Berperan aktif dalam program pelatihan fisik dan teoritis mitigasi bencana alam, penanganan cedera olahraga, resusitasi jantung paru (RJP/CPR), serta simulasi evakuasi darurat di lingkungan kampus.",
      highlights: [
        "Sertifikasi pelatihan pertolongan pertama (First Aid)",
        "Berpartisipasi dalam simulasi tanggap darurat tingkat fakultas",
        "Edukasi mitigasi kebakaran skala rumah tangga untuk warga binaan"
      ],
      icon: Heart,
      gallery: [
        {
          img: "/extracted/page_10_img_3.jpeg",
          title: "FIRST AID & CPR TRAINING",
          desc: "Latihan simulasi resusitasi jantung paru (CPR) dan penanganan korban darurat."
        },
        {
          img: "/extracted/page_10_img_4.jpeg",
          title: "DISASTER MITIGATION SKILLS",
          desc: "Mengikuti simulasi pemadaman api awal menggunakan APAR dan karung basah."
        }
      ]
    },
    {
      title: "Ayo Sehat Fest Kemenkes RI",
      role: "Volunteer Panitia",
      period: "November 2023",
      desc: "Bertanggung jawab atas kelancaran operasional festival kesehatan nasional Kemenkes di Gelora Bung Karno. Berkoordinasi dengan tim keamanan, logistik, dan medis.",
      details: "Mendukung penyelenggaraan acara festival kesehatan berskala nasional yang diinisiasi oleh Kementerian Kesehatan RI. Bertugas memastikan protokol keselamatan pengunjung terpenuhi dan mengelola arus alur fasilitas medis darurat.",
      highlights: [
        "Membantu koordinasi posko P3K dan kesiapan ambulans di area GBK",
        "Mengarahkan alur evakuasi darurat untuk area berkapasitas 5000+ pengunjung",
        "Menerima penghargaan apresiasi volunteer langsung dari panitia Kemenkes"
      ],
      icon: Users,
      gallery: [
        {
          img: "/extracted/page_19_img_2.jpeg",
          title: "KEMENKES AYO SEHAT FEST",
          desc: "Kolaborasi kepanitiaan bersama Kemenkes RI untuk kelancaran posko kesehatan GBK."
        }
      ]
    },
    {
      title: "UKM UFO Veteran Jakarta (Fotografi, Videografi, & Desain)",
      role: "Staff Kreatif",
      period: "September 2022 - Agustus 2023",
      desc: "Mempelajari software SketchUp dan Adobe Photoshop untuk kebutuhan layout dan desain grafis. Memamerkan 2 karya desain di pameran nasional UFOFEST 2023 di Perpustakaan Nasional RI.",
      details: "Mengasah keahlian multimedia untuk mendukung kampanye visual dan dokumentasi K3. Mengembangkan tata letak grafis dan konsep pameran untuk meningkatkan keterlibatan publik dalam seni visual.",
      highlights: [
        "Memamerkan 2 karya visual di Galeri Perpustakaan Nasional RI",
        "Menguasai Adobe Photoshop dan SketchUp untuk pemodelan layout 3D",
        "Berkontribusi sebagai tim dokumentasi resmi di berbagai kegiatan kemahasiswaan"
      ],
      icon: Award,
      gallery: []
    },
  ];

  return (
    <section id="organizations" className="py-20 bg-[#FDFBF7] text-[#0B1D17] relative overflow-hidden font-sans border-b border-[#E8E2D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 font-sans">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold tracking-tight text-[#0B1D17] sm:text-5xl uppercase font-display italic">
            Organisasi & <span className="text-[#6B0F0F] glow-maroon">Kevoluntiran</span>
          </h2>
          <p className="mt-4 text-[#66756F] text-sm font-sans">
            Pengalaman Gita Andini di luar kelas dalam memimpin kegiatan kampanye sosial dan kepedulian K3.
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
                    Lihat kontribusi &rarr;
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
                    ORGANIZATION & VOLUNTEER
                  </span>
                  <h3 className="text-3xl md:text-5xl font-display font-extrabold text-white mt-1 italic uppercase tracking-tight leading-none">
                    {activeOrg.title}
                  </h3>
                  <p className="text-sm font-sans text-[#FAF6EE]/80 mt-2 font-semibold uppercase tracking-wider">
                    Peran: {activeOrg.role} &bull; {activeOrg.period}
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
                      Dokumentasi Foto Kegiatan
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
