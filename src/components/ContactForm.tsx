"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, Mail, Globe } from "lucide-react";
import { submitMessage } from "@/app/actions";
import { useLanguage } from "@/context/LanguageContext";
import FloatingElements from "@/components/FloatingElements";

export default function ContactForm() {
  const { t } = useLanguage();
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
      setSuccessMsg(
        t(
          "Pesan terkirim! Gita akan membalas via email secepatnya.",
          "Message sent! Gita will reply via email as soon as possible."
        )
      );
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setTimeout(() => setSuccessMsg(""), 5000);
    } else {
      alert(t("Error: Gagal mengirimkan pesan.", "Error: Failed to send message."));
    }
  };

  return (
    <section id="contact" className="py-20 bg-[#FDFBF7] text-[#0B1D17] relative overflow-hidden font-sans border-b border-[#E8E2D5]">
      {/* Slow floating orb */}
      <motion.div
        animate={{
          x: [0, -60, 40, 0],
          y: [0, 50, -40, 0],
        }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-10 w-72 h-72 rounded-full bg-[#6B0F0F]/3 blur-[90px] pointer-events-none"
      />
      <FloatingElements count={5} color="#6B0F0F" />

      {/* Visual background details */}
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[#6B0F0F]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 font-sans">
        <div className="text-center mb-16 font-sans">
          <h2 className="text-4xl font-extrabold tracking-tight text-[#0B1D17] sm:text-5xl uppercase font-display italic">
            {t("Hubungi ", "Contact ")}<span className="text-[#6B0F0F] glow-maroon">Gita Andini</span>
          </h2>
          <p className="mt-4 text-[#66756F] text-sm max-w-2xl mx-auto">
            {t(
              "Apakah Anda memerlukan audit K3, pembuatan dokumen HIRADC/JSA, pelatihan safety, atau konsultasi kepatuhan regulasi lingkungan? Kirimkan pesan di bawah ini.",
              "Do you need an OHS audit, HIRADC/JSA document preparation, safety training, or environmental regulatory compliance consultation? Send a message below."
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Direct Contacts */}
          <div className="lg:col-span-4 flex">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass p-8 rounded-3xl border border-[#E8E2D5] bg-white shadow-sm flex flex-col justify-between w-full relative overflow-hidden"
            >
              {/* Top accent stripes */}
              <div className="absolute top-0 left-0 right-0 h-1.5 warning-stripes-maroon-cream" />

              <div className="space-y-6 pt-2">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#6B0F0F] font-mono">
                    {t("Saluran Kontak", "Contact Channels")}
                  </h3>
                  <p className="text-[11px] text-[#66756F] font-sans mt-1">
                    {t("Terhubung langsung melalui akun profesional saya.", "Connect directly through my professional channels.")}
                  </p>
                </div>

                <div className="space-y-3">
                  {/* Email */}
                  <a
                    href="mailto:gita.andini@email.com"
                    className="flex items-center gap-3.5 p-3 bg-[#FAF6EE] hover:bg-[#6B0F0F]/5 rounded-2xl border border-[#E8E2D5]/50 group transition-all"
                  >
                    <div className="bg-white border border-[#6B0F0F]/15 w-9 h-9 rounded-xl flex items-center justify-center text-[#6B0F0F] shrink-0 group-hover:bg-[#6B0F0F] group-hover:text-white transition-colors">
                      <Mail size={16} />
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-[9px] font-mono text-[#66756F] uppercase tracking-wider">Email</div>
                      <div className="text-xs text-[#0B1D17] font-bold truncate">gita.andini@email.com</div>
                    </div>
                  </a>

                  {/* LinkedIn */}
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3.5 p-3 bg-[#FAF6EE] hover:bg-[#6B0F0F]/5 rounded-2xl border border-[#E8E2D5]/50 group transition-all"
                  >
                    <div className="bg-white border border-[#6B0F0F]/15 w-9 h-9 rounded-xl flex items-center justify-center text-[#6B0F0F] shrink-0 group-hover:bg-[#6B0F0F] group-hover:text-white transition-colors">
                      <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-[9px] font-mono text-[#66756F] uppercase tracking-wider">LinkedIn</div>
                      <div className="text-xs text-[#0B1D17] font-bold truncate">Gita Andini</div>
                    </div>
                  </a>

                  {/* Instagram */}
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3.5 p-3 bg-[#FAF6EE] hover:bg-[#6B0F0F]/5 rounded-2xl border border-[#E8E2D5]/50 group transition-all"
                  >
                    <div className="bg-white border border-[#6B0F0F]/15 w-9 h-9 rounded-xl flex items-center justify-center text-[#6B0F0F] shrink-0 group-hover:bg-[#6B0F0F] group-hover:text-white transition-colors">
                      <svg className="h-4 w-4 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-[9px] font-mono text-[#66756F] uppercase tracking-wider">Instagram</div>
                      <div className="text-xs text-[#0B1D17] font-bold truncate">@gitaandini</div>
                    </div>
                  </a>

                  {/* Portfolio */}
                  <a
                    href="#hero"
                    className="flex items-center gap-3.5 p-3 bg-[#FAF6EE] hover:bg-[#6B0F0F]/5 rounded-2xl border border-[#E8E2D5]/50 group transition-all"
                  >
                    <div className="bg-white border border-[#6B0F0F]/15 w-9 h-9 rounded-xl flex items-center justify-center text-[#6B0F0F] shrink-0 group-hover:bg-[#6B0F0F] group-hover:text-white transition-colors">
                      <Globe size={16} />
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-[9px] font-mono text-[#66756F] uppercase tracking-wider">Portfolio</div>
                      <div className="text-xs text-[#0B1D17] font-bold truncate">{t("Situs Utama", "Main Website")}</div>
                    </div>
                  </a>
                </div>
              </div>

              <div className="text-[9px] font-mono text-[#66756F]/60 mt-6 border-t border-[#E8E2D5] pt-4 uppercase">
                {t("Tanggapan dalam 24 jam", "Response within 24 hours")}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-8 flex">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass p-8 rounded-3xl border border-[#E8E2D5] relative overflow-hidden bg-white shadow-sm font-sans w-full"
            >
              <div className="absolute top-0 bottom-0 left-0 w-1.5 warning-stripes-maroon-cream" />

              <form onSubmit={handleSubmit} className="space-y-6 ml-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-mono text-[#66756F] uppercase tracking-wider mb-2">
                      {t("Nama Lengkap", "Full Name")}
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t("Contoh: Budi Santoso", "e.g., John Doe")}
                      className="w-full bg-[#FAF6EE] border border-[#E8E2D5] focus:border-[#6B0F0F] text-[#0B1D17] rounded-2xl px-4 py-3 outline-none transition-all text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-[#66756F] uppercase tracking-wider mb-2">
                      {t("Alamat Email", "Email Address")}
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
                    {t("Subjek / Perihal", "Subject / Topic")}
                  </label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder={t("Contoh: Konsultasi Pembuatan HIRADC Proyek", "e.g., Project HIRADC Preparation Consultation")}
                    className="w-full bg-[#FAF6EE] border border-[#E8E2D5] focus:border-[#6B0F0F] text-[#0B1D17] rounded-2xl px-4 py-3 outline-none transition-all text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-[#66756F] uppercase tracking-wider mb-2">
                    {t("Pesan / Kebutuhan K3", "Message / OHS Requirements")}
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t("Jelaskan kebutuhan konsultasi atau inspeksi K3 perusahaan Anda...", "Describe your company's OHS consultation or inspection needs...")}
                    className="w-full bg-[#FAF6EE] border border-[#E8E2D5] focus:border-[#6B0F0F] text-[#0B1D17] rounded-2xl px-4 py-3 outline-none transition-all text-xs resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#6B0F0F] hover:bg-[#540c0c] text-white font-sans text-xs font-bold rounded-2xl uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-[0_4px_20px_rgba(107,15,15,0.2)]"
                >
                  {isSubmitting ? (
                    t("MENGIRIMKAN...", "SENDING...")
                  ) : (
                    <>
                      <Send size={14} /> {t("KIRIM PESAN K3", "SEND OHS MESSAGE")}
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
        </div>
      </div>
    </section>
  );
}
