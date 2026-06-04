"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertOctagon, Send, ShieldAlert, CheckCircle2, RefreshCw } from "lucide-react";
import { submitHazardReport } from "@/app/actions";

interface HazardReport {
  id: number;
  reporter: string;
  location: string;
  description: string;
  severity: string;
  status: string;
  createdAt: Date;
}

interface HazardSimulatorProps {
  initialReports: HazardReport[];
}

export default function HazardSimulator({ initialReports }: HazardSimulatorProps) {
  const [reports, setReports] = useState<HazardReport[]>(initialReports);
  const [reporter, setReporter] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState("Medium");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reporter || !location || !description) return;

    setIsSubmitting(true);
    setSuccessMsg("");

    const result = await submitHazardReport({
      reporter,
      location,
      description,
      severity,
    });

    setIsSubmitting(false);

    if (result.success && result.report) {
      setSuccessMsg("Laporan Bahaya Terkirim! Menyinkronkan database...");
      
      const newReport: HazardReport = {
        ...result.report,
        createdAt: new Date(result.report.createdAt),
      };
      setReports((prev) => [newReport, ...prev]);

      setReporter("");
      setLocation("");
      setDescription("");
      setSeverity("Medium");

      setTimeout(() => setSuccessMsg(""), 4000);
    } else {
      alert("Error: Gagal mengirimkan laporan.");
    }
  };

  const getSeverityStyle = (level: string) => {
    switch (level) {
      case "Low":
        return "bg-zinc-100 text-zinc-650 border-zinc-300";
      case "Medium":
        return "bg-yellow-50 text-yellow-700 border-yellow-300";
      case "High":
        return "bg-orange-50 text-orange-700 border-orange-300";
      case "Critical":
        return "bg-red-50 text-red-700 border-red-300 animate-pulse";
      default:
        return "bg-zinc-100 text-zinc-600 border-zinc-300";
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Reported":
        return "bg-blue-50 text-blue-700 border-blue-300";
      case "Under Review":
        return "bg-yellow-50 text-yellow-700 border-yellow-300";
      case "Resolved":
        return "bg-emerald-50 text-emerald-700 border-emerald-300";
      default:
        return "bg-zinc-100 text-zinc-600 border-zinc-300";
    }
  };

  return (
    <section id="simulator" className="py-20 bg-[#FDFBF7] text-[#0B1D17] relative overflow-hidden font-sans border-b border-[#E8E2D5]">
      {/* Danger tape top border decoration */}
      <div className="absolute top-0 left-0 right-0 h-2 warning-stripes-maroon-cream opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold tracking-tight text-[#0B1D17] sm:text-5xl uppercase font-display italic">
            Simulator <span className="text-[#6B0F0F] glow-maroon">Hazard Report</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-[#66756F] text-sm">
            Coba laporkan kondisi tidak aman (Unsafe Condition/Act) di area simulasi proyek di bawah ini. Laporan akan langsung terdaftar di database SQLite.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 font-sans">
          {/* Reporter form card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 glass p-6 rounded-3xl border border-[#E8E2D5] relative bg-white shadow-sm"
          >
            <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-[#6B0F0F]/10 border border-[#6B0F0F]/20 px-3 py-1 rounded-full text-[9px] font-mono text-[#6B0F0F] uppercase tracking-widest font-bold">
              <span className="h-1.5 w-1.5 rounded-full bg-[#6B0F0F] animate-ping" />
              Terminal K3
            </div>

            <h3 className="text-base font-bold text-[#0B1D17] mb-6 flex items-center gap-2 font-display italic uppercase">
              <ShieldAlert className="text-[#6B0F0F]" /> Form Laporan Bahaya
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-mono text-[#66756F] uppercase tracking-wider mb-1.5">
                  Nama Pelapor
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Gita Andini"
                  value={reporter}
                  onChange={(e) => setReporter(e.target.value)}
                  className="w-full bg-[#FAF6EE] border border-[#E8E2D5] focus:border-[#6B0F0F] text-[#0B1D17] rounded-2xl px-4 py-2.5 outline-none transition-all text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-[#66756F] uppercase tracking-wider mb-1.5">
                  Lokasi Bahaya
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Area Konstruksi Barat"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-[#FAF6EE] border border-[#E8E2D5] focus:border-[#6B0F0F] text-[#0B1D17] rounded-2xl px-4 py-2.5 outline-none transition-all text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-[#66756F] uppercase tracking-wider mb-1.5">
                  Pilih Tingkat Keparahan (Severity)
                </label>
                <select
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value)}
                  className="w-full bg-[#FAF6EE] border border-[#E8E2D5] focus:border-[#6B0F0F] text-[#0B1D17] rounded-2xl px-4 py-2.5 outline-none transition-all text-xs font-mono"
                >
                  <option value="Low">Low (Rendah)</option>
                  <option value="Medium">Medium (Sedang)</option>
                  <option value="High">High (Tinggi)</option>
                  <option value="Critical">Critical (Sangat Kritis)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-[#66756F] uppercase tracking-wider mb-1.5">
                  Deskripsi Temuan & Tindakan Koreksi
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Deskripsikan kondisi bahaya serta tindakan pencegahan sementara yang diambil..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-[#FAF6EE] border border-[#E8E2D5] focus:border-[#6B0F0F] text-[#0B1D17] rounded-2xl px-4 py-2.5 outline-none transition-all text-xs resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-[#6B0F0F] hover:bg-[#540c0c] text-white font-sans text-xs font-bold rounded-2xl uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-md hover:shadow-[#6B0F0F]/30"
              >
                {isSubmitting ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Send size={14} /> Kirim Laporan K3
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
                  className="mt-4 p-3 bg-emerald-50 border border-emerald-300 rounded-2xl text-xs font-mono text-emerald-700 flex items-center gap-2"
                >
                  <CheckCircle2 size={16} />
                  {successMsg}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Active alerts log feed */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 flex flex-col glass p-6 rounded-3xl border border-[#E8E2D5] h-[500px] bg-white shadow-sm"
          >
            <div className="flex items-center justify-between mb-4 border-b border-[#E8E2D5] pb-4">
              <h3 className="text-sm font-bold text-[#0B1D17] flex items-center gap-2 font-display italic uppercase">
                <AlertOctagon className="text-[#6B0F0F]" /> Log Laporan Aktif (SQLite)
              </h3>
              <div className="text-[10px] font-mono text-[#66756F]">
                Total: {reports.length} Laporan
              </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
              <AnimatePresence initial={false}>
                {reports.map((report) => (
                  <motion.div
                    key={report.id}
                    initial={{ opacity: 0, y: -20, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 100 }}
                    className="p-4 rounded-2xl bg-[#FAF6EE] border border-[#E8E2D5] hover:border-[#6B0F0F]/30 transition-all flex flex-col gap-2 relative overflow-hidden"
                  >
                    <div className={`absolute top-0 bottom-0 left-0 w-1 ${
                      report.severity === 'Critical' ? 'bg-red-500' :
                      report.severity === 'High' ? 'bg-orange-500' :
                      report.severity === 'Medium' ? 'bg-yellow-500' : 'bg-zinc-500'
                    }`} />

                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#0B1D17]">
                          {report.reporter}
                        </span>
                        <span className="text-[9px] text-[#66756F] font-mono">
                          {new Date(report.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${getSeverityStyle(report.severity)}`}>
                          {report.severity}
                        </span>
                        <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${getStatusStyle(report.status)}`}>
                          {report.status}
                        </span>
                      </div>
                    </div>

                    <div className="text-xs text-[#66756F] font-mono">
                      📍 Lokasi: <span className="text-[#0B1D17] font-sans">{report.location}</span>
                    </div>

                    <p className="text-xs text-zinc-700 bg-white/50 p-2.5 rounded-2xl border border-[#E8E2D5]">
                      {report.description}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
