"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Calendar, Hash, ExternalLink, X, FileCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  issueDate: string;
  expiryDate: string;
  credentialId: string;
  category: string;
  imageName: string;
}

interface CertificateShowcaseProps {
  certificates: Certificate[];
}

export default function CertificateShowcase({ certificates }: CertificateShowcaseProps) {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeCert, setActiveCert] = useState<Certificate | null>(null);

  const categories = ["All", ...Array.from(new Set(certificates.map((c) => c.category)))];

  const filteredCerts =
    selectedCategory === "All"
      ? certificates
      : certificates.filter((c) => c.category === selectedCategory);

  return (
    <section id="certifications" className="py-20 bg-zinc-950 relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-900/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            {t("Lisensi & ", "Licensing & ")}<span className="text-red-500">{t("Sertifikasi K3", "OHS Certifications")}</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-zinc-400">
            {t(
              "Kredensial profesional Gita Andini yang diakui secara nasional maupun internasional di bidang keselamatan dan kesehatan kerja.",
              "Professional credentials of Gita Andini recognized nationally and internationally in the field of occupational health and safety."
            )}
          </p>
        </div>

        {/* Categories Tab */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-mono uppercase tracking-wider rounded-lg border transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-red-600 text-white border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.4)]"
                  : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700"
              }`}
            >
              {cat === "All" ? t("Semua", "All") : cat}
            </button>
          ))}
        </div>

        {/* Certificate Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredCerts.map((cert) => (
              <motion.div
                key={cert.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                whileHover={{ y: -8 }}
                onClick={() => setActiveCert(cert)}
                className="glass p-6 rounded-2xl border border-white/5 hover:border-red-500/30 transition-all cursor-pointer flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Visual indicator corner */}
                <div className="absolute top-0 right-0 w-8 h-8 warning-stripes-red-white transform translate-x-4 -translate-y-4 rotate-45 opacity-0 group-hover:opacity-60 transition-opacity" />

                <div>
                  <div className="mb-4 bg-red-950/40 border border-red-500/20 w-10 h-10 rounded-lg flex items-center justify-center text-red-500">
                    <Award size={20} />
                  </div>
                  <span className="text-[10px] font-mono text-red-400 font-bold uppercase tracking-wider block mb-1">
                    {cert.category}
                  </span>
                  <h3 className="text-sm font-bold text-white group-hover:text-red-500 transition-colors line-clamp-2">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-2 line-clamp-2">
                    {cert.issuer}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-zinc-500 font-mono">
                  <span>{cert.issueDate}</span>
                  <span className="flex items-center gap-1 text-red-500 font-semibold group-hover:underline">
                    {t("Lihat", "View")} <ExternalLink size={12} />
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modal Popup Detail */}
      <AnimatePresence>
        {activeCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveCert(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="glass max-w-lg w-full rounded-2xl border border-red-500/30 overflow-hidden relative z-10"
            >
              {/* Caution stripe header */}
              <div className="h-2 warning-stripes-red-white" />

              <button
                onClick={() => setActiveCert(null)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-white bg-zinc-900/60 p-1.5 rounded-full border border-white/5 cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-red-950/40 border border-red-500/20 w-12 h-12 rounded-xl flex items-center justify-center text-red-500 shrink-0">
                    <Award size={24} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-red-400 font-bold uppercase tracking-wider block">
                      {activeCert.category}
                    </span>
                    <h3 className="text-lg font-bold text-white leading-snug">
                      {activeCert.title}
                    </h3>
                  </div>
                </div>

                <div className="space-y-3 mt-6">
                  <div className="flex items-start gap-3 p-3 bg-zinc-900/50 rounded-lg border border-white/5 text-xs font-mono">
                    <FileCheck size={16} className="text-zinc-500 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-zinc-500 uppercase tracking-wider text-[10px]">{t("Penerbit Sertifikat", "Certificate Issuer")}</div>
                      <div className="text-white mt-0.5">{activeCert.issuer}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-zinc-900/50 rounded-lg border border-white/5 text-xs font-mono">
                    <Calendar size={16} className="text-zinc-500 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-zinc-500 uppercase tracking-wider text-[10px]">{t("Masa Berlaku", "Validity Period")}</div>
                      <div className="text-white mt-0.5">{activeCert.issueDate} - {activeCert.expiryDate}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-zinc-900/50 rounded-lg border border-white/5 text-xs font-mono">
                    <Hash size={16} className="text-zinc-500 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-zinc-500 uppercase tracking-wider text-[10px]">{t("Nomor Kredensial", "Credential Number")}</div>
                      <div className="text-white mt-0.5">{activeCert.credentialId}</div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    onClick={() => setActiveCert(null)}
                    className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold font-mono tracking-wider uppercase rounded-lg cursor-pointer"
                  >
                    {t("Tutup Detail", "Close Details")}
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
