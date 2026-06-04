"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2 } from "lucide-react";
import { submitMessage } from "@/app/actions";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);
    setSuccessMsg("");

    const result = await submitMessage({ name, email, subject, message });

    setIsSubmitting(false);

    if (result.success) {
      setSuccessMsg("Pesan terkirim! Gita akan membalas via email secepatnya.");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setTimeout(() => setSuccessMsg(""), 5000);
    } else {
      alert("Error: Gagal mengirimkan pesan.");
    }
  };

  return (
    <section id="contact" className="py-20 bg-[#FDFBF7] text-[#0B1D17] relative overflow-hidden font-sans border-b border-[#E8E2D5]">
      {/* Visual background details */}
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[#6B0F0F]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 font-sans">
        <div className="text-center mb-12 font-sans">
          <h2 className="text-4xl font-extrabold tracking-tight text-[#0B1D17] sm:text-5xl uppercase font-display italic">
            Hubungi <span className="text-[#6B0F0F] glow-maroon">Gita Andini</span>
          </h2>
          <p className="mt-4 text-[#66756F] text-sm">
            Apakah Anda memerlukan audit K3, pembuatan dokumen HIRADC/JSA, pelatihan safety, atau konsultasi kepatuhan regulasi lingkungan? Kirimkan pesan di bawah ini.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass p-8 rounded-3xl border border-[#E8E2D5] relative bg-white shadow-sm font-sans"
        >
          <div className="absolute top-0 bottom-0 left-0 w-1.5 warning-stripes-maroon-cream" />

          <form onSubmit={handleSubmit} className="space-y-6 ml-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-mono text-[#66756F] uppercase tracking-wider mb-2">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Budi Santoso"
                  className="w-full bg-[#FAF6EE] border border-[#E8E2D5] focus:border-[#6B0F0F] text-[#0B1D17] rounded-2xl px-4 py-3 outline-none transition-all text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-[#66756F] uppercase tracking-wider mb-2">
                  Alamat Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="budi@perusahaan.co.id"
                  className="w-full bg-[#FAF6EE] border border-[#E8E2D5] focus:border-[#6B0F0F] text-[#0B1D17] rounded-2xl px-4 py-3 outline-none transition-all text-xs font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono text-[#66756F] uppercase tracking-wider mb-2">
                Subjek / Perihal
              </label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Contoh: Konsultasi Pembuatan HIRADC Proyek"
                className="w-full bg-[#FAF6EE] border border-[#E8E2D5] focus:border-[#6B0F0F] text-[#0B1D17] rounded-2xl px-4 py-3 outline-none transition-all text-xs font-mono"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono text-[#66756F] uppercase tracking-wider mb-2">
                Pesan / Kebutuhan K3
              </label>
              <textarea
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Jelaskan kebutuhan konsultasi atau inspeksi K3 perusahaan Anda..."
                className="w-full bg-[#FAF6EE] border border-[#E8E2D5] focus:border-[#6B0F0F] text-[#0B1D17] rounded-2xl px-4 py-3 outline-none transition-all text-xs resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-[#6B0F0F] hover:bg-[#540c0c] text-white font-sans text-xs font-bold rounded-2xl uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-[0_4px_20px_rgba(107,15,15,0.2)]"
            >
              {isSubmitting ? (
                "MENGIRIMKAN..."
              ) : (
                <>
                  <Send size={14} /> KIRIM PESAN K3
                </>
              )}
            </button>
          </form>

          <AnimatePresence>
            {successMsg && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-6 p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-xs font-mono text-emerald-700 flex items-center gap-2"
              >
                <CheckCircle2 size={16} />
                {successMsg}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
