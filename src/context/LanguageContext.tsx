"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Globe } from "lucide-react";
import { usePathname } from "next/navigation";

type Language = "id" | "en";

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (idText: any, enText: any) => any;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("id");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("portfolio_lang") as Language;
    if (saved === "id" || saved === "en") {
      setLanguageState(saved);
    }
    setMounted(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("portfolio_lang", lang);
  };

  // Helper function to return translation based on active language
  const t = (idText: any, enText: any) => {
    return language === "id" ? idText : enText;
  };

  const pathname = usePathname();
  const isAdminPath = pathname?.startsWith("/admin");

  if (!mounted) {
    // Return placeholder markup during SSR hydration to avoid mismatch
    return (
      <LanguageContext.Provider value={{ language: "id", setLanguage: () => {}, t: (idText) => idText }}>
        {children}
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}

      {/* Floating Toggle Button in the bottom-right corner - Hidden on Admin */}
      {!isAdminPath && (
        <div className="fixed bottom-6 right-6 z-[99] pointer-events-auto">
          <button
            onClick={() => setLanguage(language === "id" ? "en" : "id")}
            className="flex items-center gap-3 bg-[#6B0F0F] text-[#FAF6EE] hover:bg-[#540c0c] border-2 border-[#FAF6EE]/30 hover:border-[#FAF6EE] px-4.5 py-2.5 rounded-full shadow-[0_8px_30px_rgba(107,15,15,0.4)] transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_40px_rgba(107,15,15,0.6)] font-mono text-xs font-bold cursor-pointer relative overflow-hidden group"
            title={language === "id" ? "Terjemahkan ke Inggris" : "Translate to Indonesian"}
          >
            <Globe size={14} className="animate-spin-slow text-[#FAF6EE] group-hover:scale-110 transition-transform duration-500" />
            <span className="flex items-center gap-1.5 relative z-10">
              <span className={language === "id" ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] font-black" : "text-white/40"}>ID</span>
              <span className="text-white/30 font-light">|</span>
              <span className={language === "en" ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] font-black" : "text-white/40"}>EN</span>
            </span>
          </button>
        </div>
      )}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
