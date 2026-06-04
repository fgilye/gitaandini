"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Shield, Clock, Search, CheckCircle, Activity } from "lucide-react";

export default function SafetyDashboard() {
  const [days, setDays] = useState(1320);
  const [hours, setHours] = useState(542800);

  useEffect(() => {
    const interval = setInterval(() => {
      setDays((prev) => prev + 1);
    }, 86400000);

    const hoursInterval = setInterval(() => {
      setHours((prev) => prev + Math.floor(Math.random() * 3) + 1);
    }, 5000);

    return () => {
      clearInterval(interval);
      clearInterval(hoursInterval);
    };
  }, []);

  const stats = [
    {
      label: "Hari Tanpa Kecelakaan (LTI Free)",
      value: days.toLocaleString(),
      icon: Shield,
      color: "text-emerald-600",
      bgGlow: "rgba(16, 185, 129, 0.05)",
      borderColor: "border-emerald-500/10",
    },
    {
      label: "Jam Kerja Aman (Safe Man-Hours)",
      value: hours.toLocaleString(),
      icon: Clock,
      color: "text-[#6B0F0F]",
      bgGlow: "rgba(107, 15, 15, 0.05)",
      borderColor: "border-[#6B0F0F]/10",
    },
    {
      label: "Inspeksi K3 Selesai (Audits)",
      value: "148",
      icon: Search,
      color: "text-[#6B0F0F]",
      bgGlow: "rgba(107, 15, 15, 0.05)",
      borderColor: "border-[#6B0F0F]/10",
    },
    {
      label: "Penyelesaian Bahaya (Closeout)",
      value: "98.7%",
      icon: CheckCircle,
      color: "text-[#0B1D17]",
      bgGlow: "rgba(11, 29, 23, 0.05)",
      borderColor: "border-[#0B1D17]/10",
    },
  ];

  return (
    <section id="dashboard" className="py-20 relative overflow-hidden bg-[#FDFBF7] text-[#0B1D17] font-sans border-b border-[#E8E2D5]">
      {/* Background Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#6B0F0F02_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-[#6B0F0F]/10 border border-[#6B0F0F]/20 px-4 py-1.5 rounded-full mb-4"
          >
            <Activity className="h-4 w-4 text-[#6B0F0F] animate-pulse" />
            <span className="text-[10px] font-mono text-[#6B0F0F] font-bold uppercase tracking-widest">
              Live HSE Safety Feed
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-extrabold tracking-tight text-[#0B1D17] sm:text-5xl uppercase font-display italic"
          >
            Dashboard Kinerja <span className="text-[#6B0F0F] glow-maroon">HSE</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 max-w-2xl mx-auto text-[#66756F] text-sm"
          >
            Statistik dan log keselamatan kerja real-time yang diawasi langsung di bawah kepemimpinan Gita Andini.
          </motion.p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 font-sans">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                whileHover={{ y: -5 }}
                className={`glass p-6 rounded-3xl relative overflow-hidden group border ${stat.borderColor} bg-white shadow-sm`}
                style={{
                  boxShadow: `0 10px 30px -15px ${stat.bgGlow}`,
                }}
              >
                {/* Accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 warning-stripes-maroon-cream opacity-40 group-hover:opacity-100 transition-opacity" />

                <div className="flex items-center justify-between mb-4 font-sans">
                  <span className="text-[10px] font-mono font-medium text-[#66756F] tracking-wider uppercase">
                    {stat.label}
                  </span>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black tracking-tight text-[#0B1D17] font-mono">
                    {stat.value}
                  </span>
                </div>

                <div className="mt-4 flex items-center gap-1.5 text-[9px] text-[#66756F] font-mono">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                  <span>TERVERIFIKASI SISTEM K3</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Incident-free celebration banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 p-8 rounded-3xl glass border border-[#E8E2D5] flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative bg-white shadow-sm"
        >
          {/* Safety stripes background border decoration */}
          <div className="absolute top-0 bottom-0 left-0 w-2 warning-stripes-maroon-cream" />
          
          <div className="z-10 ml-2">
            <h3 className="text-xl font-bold text-[#0B1D17] flex items-center gap-2 font-display uppercase italic">
              <Shield className="text-[#6B0F0F]" />
              Kebijakan Mutu & Budaya K3
            </h3>
            <p className="mt-2 text-[#66756F] max-w-3xl text-xs leading-relaxed font-sans">
              &ldquo;Keselamatan kerja bukanlah prioritas yang bisa diganti, melainkan nilai utama yang terintegrasi di setiap lini operasional. Setiap pekerja berhak pulang ke rumah dengan selamat setiap harinya.&rdquo;
            </p>
          </div>
          <div className="z-10 shrink-0">
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-6 py-3.5 border border-[#6B0F0F] text-xs font-bold rounded-full text-[#6B0F0F] hover:bg-[#6B0F0F] hover:text-white transition-all font-mono uppercase tracking-wider shadow-sm"
            >
              KONSULTASI K3 SEKARANG
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
