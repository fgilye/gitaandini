"use client";

import { useState } from "react";
import { ShieldCheck, Lock, AlertTriangle } from "lucide-react";
import { loginAction } from "@/app/admin-actions";
import { useLanguage } from "@/context/LanguageContext";
import Swal from "sweetalert2";

export default function LoginContent() {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);

  async function handleLogin(formData: FormData) {
    setLoading(true);
    try {
      const result = await loginAction(formData);
      if (result?.error) {
        Swal.fire({
          icon: "error",
          title: t("Akses Ditolak", "Access Denied"),
          text: result.error,
          confirmButtonColor: "#6B0F0F",
          background: "#FDFBF7",
          color: "#0B1D17",
          customClass: {
            title: "font-display italic",
            popup: "rounded-3xl border border-[#E8E2D5] shadow-2xl",
          }
        });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Safety ticker at top */}
      <div className="fixed top-0 left-0 right-0 h-6 bg-[#6B0F0F] text-[#FAF6EE] flex items-center overflow-hidden text-[10px] font-mono select-none z-50">
        <div className="animate-marquee whitespace-nowrap inline-flex gap-8 font-bold tracking-wider">
          <span className="flex items-center gap-1.5"><AlertTriangle size={11} /> {t("PANEL ADMIN – AKSES TERBATAS", "ADMIN PANEL – RESTRICTED ACCESS")}</span>
          <span className="flex items-center gap-1.5"><ShieldCheck size={11} /> {t("HANYA PERSONEL BERWENANG", "AUTHORIZED PERSONNEL ONLY")}</span>
          <span className="flex items-center gap-1.5"><AlertTriangle size={11} /> {t("PANEL ADMIN – AKSES TERBATAS", "ADMIN PANEL – RESTRICTED ACCESS")}</span>
          <span className="flex items-center gap-1.5"><ShieldCheck size={11} /> {t("HANYA PERSONEL BERWENANG", "AUTHORIZED PERSONNEL ONLY")}</span>
          <span className="flex items-center gap-1.5"><AlertTriangle size={11} /> {t("PANEL ADMIN – AKSES TERBATAS", "ADMIN PANEL – RESTRICTED ACCESS")}</span>
          <span className="flex items-center gap-1.5"><ShieldCheck size={11} /> {t("HANYA PERSONEL BERWENANG", "AUTHORIZED PERSONNEL ONLY")}</span>
          <span className="flex items-center gap-1.5"><AlertTriangle size={11} /> {t("PANEL ADMIN – AKSES TERBATAS", "ADMIN PANEL – RESTRICTED ACCESS")}</span>
          <span className="flex items-center gap-1.5"><ShieldCheck size={11} /> {t("HANYA PERSONEL BERWENANG", "AUTHORIZED PERSONNEL ONLY")}</span>
        </div>
      </div>

      {/* Login Card */}
      <div className="relative w-full max-w-md mt-6 z-10">
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-[#E8E2D5] overflow-hidden">
          {/* Card Header */}
          <div className="bg-[#6B0F0F] px-8 py-8 text-center relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `repeating-linear-gradient(-45deg, white 0px, white 2px, transparent 2px, transparent 20px)`,
              }}
            />
            <div className="relative">
              <div className="flex items-center justify-center mb-3">
                <div className="bg-white/15 rounded-2xl p-3 backdrop-blur-sm">
                  <ShieldCheck className="h-10 w-10 text-white" />
                </div>
              </div>
              <h1 className="text-white text-xl font-black tracking-wide">
                GITA <span className="opacity-80">ANDINI</span>
              </h1>
              <p className="text-white/70 text-[11px] font-mono tracking-widest uppercase mt-1">
                {t("Panel Admin CMS", "CMS Admin Panel")}
              </p>
            </div>
          </div>

          {/* Card Body */}
          <div className="px-8 py-8">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-px flex-1 bg-[#E8E2D5]" />
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#66756F] uppercase tracking-widest">
                <Lock size={11} />
                {t("Masuk sebagai Admin", "Login as Admin")}
              </div>
              <div className="h-px flex-1 bg-[#E8E2D5]" />
            </div>

            <form action={handleLogin} className="space-y-5">
              <div>
                <label
                  htmlFor="password"
                  className="block text-[11px] font-mono uppercase tracking-wider text-[#66756F] mb-2"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••••••"
                  autoComplete="current-password"
                  className="w-full px-4 py-3 rounded-xl border border-[#E8E2D5] bg-[#FDFBF7] text-[#0B1D17] text-sm focus:outline-none focus:ring-2 focus:ring-[#6B0F0F]/30 focus:border-[#6B0F0F] transition-all placeholder:text-[#c9c3bb]"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#6B0F0F] hover:bg-[#540c0c] text-white font-bold text-sm py-3.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-[#6B0F0F]/25 flex items-center justify-center gap-2 disabled:opacity-70"
              >
                <Lock size={15} />
                {loading ? t("Memproses...", "Processing...") : t("Masuk ke Dashboard", "Login to Dashboard")}
              </button>
            </form>

            <div className="mt-6 text-center">
              <a
                href="/"
                className="text-[11px] font-mono text-[#66756F] hover:text-[#6B0F0F] transition-colors uppercase tracking-wider"
              >
                ← {t("Kembali ke Portfolio", "Back to Portfolio")}
              </a>
            </div>
          </div>
        </div>

        {/* Badge below card */}
        <div className="mt-4 text-center">
          <span className="text-[10px] font-mono text-[#66756F]/60 tracking-wider uppercase">
            {t("Gita Andini Portfolio CMS · Admin Only", "Gita Andini Portfolio CMS · Admin Only")}
          </span>
        </div>
      </div>
    </>
  );
}
