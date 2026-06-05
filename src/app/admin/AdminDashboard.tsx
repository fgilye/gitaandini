"use client";

import { useState, useTransition, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck, LogOut, Database, BookOpen, Briefcase, Star,
  FolderOpen, Users, FileText, MessageSquare, ChevronDown,
  ChevronUp, Plus, Trash2, Save, AlertTriangle, CheckCircle,
  Eye, RefreshCw, Settings, X,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface EducationItem {
  id: number;
  school: string;
  degree: string;
  major: string;
  period: string;
  gpa: string;
  description: string;
  highlights: string;
}

interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
  highlights: string;
  gallery: string;
}

interface SkillItem {
  id: number;
  category: string;
  items: string;
}

interface ProjectItem {
  id: number;
  title: string;
  category: string;
  period: string;
  role: string;
  description: string;
  highlights: string;
  gallery: string;
}

interface OrganizationItem {
  id: number;
  title: string;
  role: string;
  period: string;
  desc: string;
  details: string;
  highlights: string;
  gallery: string;
}

interface PublicationItem {
  id: number;
  title: string;
  journal: string;
  year: string;
  type: string;
  details: string;
  highlights: string;
}

interface MessageItem {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Date;
}

interface Props {
  config: Record<string, string>;
  educations: EducationItem[];
  experiences: ExperienceItem[];
  skills: SkillItem[];
  projects: ProjectItem[];
  organizations: OrganizationItem[];
  publications: PublicationItem[];
  messages: MessageItem[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  actions: Record<string, any>;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function Toast({ msg, type }: { msg: string; type: "success" | "error" }) {
  return (
    <div
      className={`fixed bottom-6 right-6 z-[999] flex items-center gap-2.5 px-5 py-3 rounded-2xl shadow-2xl text-sm font-semibold border transition-all ${
        type === "success"
          ? "bg-emerald-50 border-emerald-200 text-emerald-800"
          : "bg-red-50 border-red-200 text-red-800"
      }`}
    >
      {type === "success" ? <CheckCircle size={16} /> : <AlertTriangle size={16} />}
      {msg}
    </div>
  );
}

function SectionCard({
  title,
  icon: Icon,
  children,
  count,
  accent = "#6B0F0F",
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  count?: number;
  accent?: string;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div className="bg-white rounded-3xl border border-[#E8E2D5] overflow-hidden shadow-sm">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-7 py-5 text-left hover:bg-[#FDFBF7] transition-colors"
      >
        <div className="flex items-center gap-3">
          <div
            className="rounded-xl p-2.5"
            style={{ background: `${accent}18` }}
          >
            <Icon size={18} style={{ color: accent }} />
          </div>
          <div>
            <h2 className="text-[#0B1D17] font-bold text-base">{title}</h2>
            {count !== undefined && (
              <p className="text-[#66756F] text-xs font-mono">{count} item{count !== 1 ? "s" : ""}</p>
            )}
          </div>
        </div>
        {open ? <ChevronUp size={18} className="text-[#66756F]" /> : <ChevronDown size={18} className="text-[#66756F]" />}
      </button>
      {open && <div className="px-7 pb-7 border-t border-[#E8E2D5]">{children}</div>}
    </div>
  );
}

function Field({
  label,
  name,
  defaultValue = "",
  multiline = false,
  hint,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  multiline?: boolean;
  hint?: string;
}) {
  const base =
    "w-full px-3.5 py-2.5 rounded-xl border border-[#E8E2D5] bg-[#FDFBF7] text-[#0B1D17] text-sm focus:outline-none focus:ring-2 focus:ring-[#6B0F0F]/25 focus:border-[#6B0F0F] transition-all resize-none";
  return (
    <div className="space-y-1">
      <label className="block text-[11px] font-mono uppercase tracking-wider text-[#66756F]">
        {label}
      </label>
      {hint && <p className="text-[10px] text-[#66756F]/70">{hint}</p>}
      {multiline ? (
        <textarea name={name} defaultValue={defaultValue} rows={3} className={base} />
      ) : (
        <input type="text" name={name} defaultValue={defaultValue} className={base} />
      )}
    </div>
  );
}

function BilingualField({
  label,
  name,
  defaultValue = "",
  multiline = false,
  hint,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  multiline?: boolean;
  hint?: string;
}) {
  const parts = defaultValue ? defaultValue.split(" | ") : ["", ""];
  const [valId, setValId] = useState(parts[0] || "");
  const [valEn, setValEn] = useState(parts[1] || "");

  // Update when defaultValue changes (e.g. from props)
  useEffect(() => {
    const newParts = defaultValue ? defaultValue.split(" | ") : ["", ""];
    setValId(newParts[0] || "");
    setValEn(newParts[1] || "");
  }, [defaultValue]);

  const combined = (valId && valEn) ? `${valId} | ${valEn}` : (valId || valEn || "");
  const base =
    "w-full px-3.5 py-2.5 rounded-xl border border-[#E8E2D5] bg-[#FDFBF7] text-[#0B1D17] text-sm focus:outline-none focus:ring-2 focus:ring-[#6B0F0F]/25 focus:border-[#6B0F0F] transition-all resize-none";
  
  return (
    <div className="space-y-1">
      <input type="hidden" name={name} value={combined} />
      <div className="flex flex-row gap-3">
        <div className="flex-1 space-y-1">
          <label className="block text-[11px] font-mono uppercase tracking-wider text-[#66756F]">
            {label} (ID)
          </label>
          {multiline ? (
            <textarea value={valId} onChange={e => setValId(e.target.value)} rows={3} className={base} />
          ) : (
            <input type="text" value={valId} onChange={e => setValId(e.target.value)} className={base} />
          )}
        </div>
        <div className="flex-1 space-y-1">
          <label className="block text-[11px] font-mono uppercase tracking-wider text-[#66756F]">
            {label} (EN)
          </label>
          {multiline ? (
            <textarea value={valEn} onChange={e => setValEn(e.target.value)} rows={3} className={base} />
          ) : (
            <input type="text" value={valEn} onChange={e => setValEn(e.target.value)} className={base} />
          )}
        </div>
      </div>
      {hint && <p className="text-[10px] text-[#66756F]/70">{hint}</p>}
    </div>
  );
}

function SplitConfigBilingualField({
  label,
  nameId,
  nameEn,
  valId,
  valEn,
  multiline = false
}: {
  label: string;
  nameId: string;
  nameEn: string;
  valId: string;
  valEn: string;
  multiline?: boolean;
}) {
  const base = "w-full px-3.5 py-2.5 rounded-xl border border-[#E8E2D5] bg-[#FDFBF7] text-[#0B1D17] text-sm focus:outline-none focus:ring-2 focus:ring-[#6B0F0F]/25 focus:border-[#6B0F0F] transition-all resize-none";
  return (
    <div className="space-y-1">
      <div className="flex flex-row gap-3">
        <div className="flex-1 space-y-1">
          <label className="block text-[11px] font-mono uppercase tracking-wider text-[#66756F]">
            {label} (ID)
          </label>
          {multiline ? (
            <textarea name={nameId} defaultValue={valId} rows={3} className={base} />
          ) : (
            <input type="text" name={nameId} defaultValue={valId} className={base} />
          )}
        </div>
        <div className="flex-1 space-y-1">
          <label className="block text-[11px] font-mono uppercase tracking-wider text-[#66756F]">
            {label} (EN)
          </label>
          {multiline ? (
            <textarea name={nameEn} defaultValue={valEn} rows={3} className={base} />
          ) : (
            <input type="text" name={nameEn} defaultValue={valEn} className={base} />
          )}
        </div>
      </div>
    </div>
  );
}

const ID_MONTHS = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
const EN_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function PeriodPickerField({ name, defaultValue = "" }: { name: string; defaultValue?: string }) {
  let initStartM = "Jan", initStartY = new Date().getFullYear().toString(), initEndM = "Jan", initEndY = new Date().getFullYear().toString(), initPresent = false;
  
  if (defaultValue) {
    const idPart = defaultValue.split(" | ")[0] || "";
    const [startStr, endStr] = idPart.split(" - ");
    if (startStr) {
      const [sm, sy] = startStr.trim().split(" ");
      if (sm && ID_MONTHS.includes(sm)) initStartM = sm;
      if (sy) initStartY = sy;
    }
    if (endStr) {
      if (endStr.trim().toLowerCase() === "sekarang") {
        initPresent = true;
      } else {
        const [em, ey] = endStr.trim().split(" ");
        if (em && ID_MONTHS.includes(em)) initEndM = em;
        if (ey) initEndY = ey;
      }
    }
  }

  const [startM, setStartM] = useState(initStartM);
  const [startY, setStartY] = useState(initStartY);
  const [endM, setEndM] = useState(initEndM);
  const [endY, setEndY] = useState(initEndY);
  const [isPresent, setIsPresent] = useState(initPresent);

  const startM_EN = EN_MONTHS[ID_MONTHS.indexOf(startM)] || startM;
  const endM_EN = EN_MONTHS[ID_MONTHS.indexOf(endM)] || endM;

  const idStr = `${startM} ${startY} - ${isPresent ? "Sekarang" : `${endM} ${endY}`}`;
  const enStr = `${startM_EN} ${startY} - ${isPresent ? "Present" : `${endM_EN} ${endY}`}`;
  const combined = `${idStr} | ${enStr}`;

  const selectBase = "w-full px-3 py-2.5 rounded-xl border border-[#E8E2D5] bg-[#FDFBF7] text-[#0B1D17] text-sm focus:outline-none focus:ring-2 focus:ring-[#6B0F0F]/25 focus:border-[#6B0F0F] transition-all";

  return (
    <div className="space-y-1">
      <label className="block text-[11px] font-mono uppercase tracking-wider text-[#66756F]">
        Periode (Period)
      </label>
      <input type="hidden" name={name} value={combined} />
      <div className="flex flex-col md:flex-row gap-4 p-4 border border-[#E8E2D5] rounded-xl bg-white shadow-sm">
        <div className="flex-1 space-y-2">
          <p className="text-[10px] text-[#66756F] font-bold uppercase tracking-wider">Mulai (Start)</p>
          <div className="flex gap-2">
            <select value={startM} onChange={e => setStartM(e.target.value)} className={selectBase}>
              {ID_MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
            <input type="number" value={startY} onChange={e => setStartY(e.target.value)} className={selectBase} placeholder="Tahun" />
          </div>
        </div>
        <div className="flex-1 space-y-2">
          <p className="text-[10px] text-[#66756F] font-bold uppercase tracking-wider flex justify-between items-center">
            <span>Selesai (End)</span>
            <label className="flex items-center gap-1.5 cursor-pointer normal-case font-normal text-[#6B0F0F]">
              <input type="checkbox" checked={isPresent} onChange={e => setIsPresent(e.target.checked)} className="rounded text-[#6B0F0F] focus:ring-[#6B0F0F]" />
              Hingga Sekarang
            </label>
          </p>
          <div className="flex gap-2">
            <select value={endM} onChange={e => setEndM(e.target.value)} disabled={isPresent} className={selectBase + (isPresent ? " opacity-50 bg-gray-50" : "")}>
              {ID_MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
            <input type="number" value={endY} onChange={e => setEndY(e.target.value)} disabled={isPresent} className={selectBase + (isPresent ? " opacity-50 bg-gray-50" : "")} placeholder="Tahun" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ItemRow({
  children,
  onDelete,
  isPending,
}: {
  children: React.ReactNode;
  onDelete: () => void;
  isPending: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="border border-[#E8E2D5] rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-[#FDFBF7]">
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="flex-1 text-left text-sm font-semibold text-[#0B1D17] flex items-center gap-2"
        >
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          <span className="truncate">{children}</span>
        </button>
        <button
          type="button"
          onClick={onDelete}
          disabled={isPending}
          className="ml-2 p-1.5 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-40"
        >
          <Trash2 size={14} />
        </button>
      </div>
      {expanded && <div className="px-4 pb-4 border-t border-[#E8E2D5] bg-white">{children}</div>}
    </div>
  );
}

function HighlightsEditor({ 
  defaultValue, 
  name = "highlights",
  label = "Highlights (Fitur Unggulan)",
  buttonText = "Tambah Item Highlight"
}: { 
  defaultValue: string; 
  name?: string;
  label?: string;
  buttonText?: string;
}) {
  const [items, setItems] = useState<{ idStr: string; enStr: string }[]>(() => {
    try {
      const parsed = JSON.parse(defaultValue);
      if (Array.isArray(parsed)) {
        return parsed.map((item: string) => {
          const parts = item.split(" | ");
          return { idStr: parts[0] || "", enStr: parts[1] || "" };
        });
      }
    } catch (e) {
      // fallback
    }
    return [];
  });

  const addItem = () => setItems([...items, { idStr: "", enStr: "" }]);
  const removeItem = (idx: number) => setItems(items.filter((_, i) => i !== idx));
  const updateItem = (idx: number, field: "idStr" | "enStr", val: string) => {
    const newItems = [...items];
    newItems[idx][field] = val;
    setItems(newItems);
  };

  const jsonString = JSON.stringify(
    items
      .map((it) => {
        if (it.idStr && it.enStr) return `${it.idStr} | ${it.enStr}`;
        if (it.idStr) return it.idStr;
        if (it.enStr) return it.enStr;
        return "";
      })
      .filter(Boolean)
  );

  return (
    <div className="space-y-3 bg-[#FDFBF7] p-4 rounded-xl border border-[#E8E2D5]">
      <label className="block text-[11px] font-mono uppercase tracking-wider text-[#66756F]">
        {label}
      </label>
      <input type="hidden" name={name} value={jsonString} />
      
      {items.map((item, idx) => (
        <div key={idx} className="flex gap-2 items-start bg-white p-3 rounded-lg border border-[#E8E2D5] shadow-sm relative group">
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <label className="block text-[9px] font-mono text-[#66756F] uppercase mb-1">Teks (ID)</label>
              <input 
                type="text" 
                placeholder="Contoh: Lulus Cum Laude" 
                value={item.idStr}
                onChange={(e) => updateItem(idx, "idStr", e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[#E8E2D5] text-xs focus:border-[#6B0F0F] outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-[9px] font-mono text-[#66756F] uppercase mb-1">Text (EN)</label>
              <input 
                type="text" 
                placeholder="Ex: Graduated Cum Laude" 
                value={item.enStr}
                onChange={(e) => updateItem(idx, "enStr", e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[#E8E2D5] text-xs focus:border-[#6B0F0F] outline-none transition-colors"
              />
            </div>
          </div>
          <button 
            type="button" 
            onClick={() => removeItem(idx)}
            className="mt-4 p-2 text-[#66756F] hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors border border-transparent hover:border-red-100"
            title="Hapus baris ini"
          >
            <Trash2 size={14} />
          </button>
        </div>
      ))}
      <button 
        type="button" 
        onClick={addItem}
        className="flex items-center gap-1.5 px-3 py-2 border border-dashed border-[#E8E2D5] text-[#66756F] text-xs font-medium rounded-lg hover:border-[#6B0F0F] hover:text-[#6B0F0F] hover:bg-[#FDFBF7] transition-all"
      >
        <Plus size={12} /> {buttonText}
      </button>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function GalleryEditor({ defaultValue, name = "gallery", uploadAction }: { defaultValue: string; name?: string; uploadAction?: (fd: FormData) => Promise<string> }) {
  const [items, setItems] = useState<{ img: string; titleId: string; titleEn: string; descId: string; descEn: string }[]>(() => {
    try {
      const parsed = JSON.parse(defaultValue);
      if (Array.isArray(parsed)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return parsed.map((item: any) => {
          const tParts = (item?.title || "").split(" | ");
          const dParts = (item?.desc || "").split(" | ");
          return {
            img: item?.img || "",
            titleId: tParts[0] || "",
            titleEn: tParts[1] || "",
            descId: dParts[0] || "",
            descEn: dParts[1] || ""
          };
        });
      }
    } catch (e) {
      // fallback
    }
    return [];
  });
  
  const [uploadingIdx, setUploadingIdx] = useState<number | null>(null);

  const addItem = () => setItems([...items, { img: "", titleId: "", titleEn: "", descId: "", descEn: "" }]);
  const removeItem = (idx: number) => setItems(items.filter((_, i) => i !== idx));
  const updateItem = (idx: number, field: "img" | "titleId" | "titleEn" | "descId" | "descEn", val: string) => {
    const newItems = [...items];
    newItems[idx][field] = val;
    setItems(newItems);
  };
  
  const handleFileChange = async (idx: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !uploadAction) return;
    
    // Tampilkan preview lokal instan
    const objectUrl = URL.createObjectURL(file);
    updateItem(idx, "img", objectUrl);
    
    try {
      setUploadingIdx(idx);
      const formData = new FormData();
      formData.append("file", file);
      const url = await uploadAction(formData);
      updateItem(idx, "img", url);
    } catch (err) {
      alert("Gagal mengunggah gambar");
      console.error(err);
    } finally {
      setUploadingIdx(null);
    }
  };

  const jsonString = JSON.stringify(
    items.map(it => {
      let title = "";
      if (it.titleId && it.titleEn) title = `${it.titleId} | ${it.titleEn}`;
      else if (it.titleId) title = it.titleId;
      else if (it.titleEn) title = it.titleEn;

      let desc = "";
      if (it.descId && it.descEn) desc = `${it.descId} | ${it.descEn}`;
      else if (it.descId) desc = it.descId;
      else if (it.descEn) desc = it.descEn;

      return { img: it.img, title, desc };
    }).filter(it => it.img || it.title || it.desc)
  );

  return (
    <div className="space-y-3 bg-[#FDFBF7] p-4 rounded-xl border border-[#E8E2D5]">
      <label className="block text-[11px] font-mono uppercase tracking-wider text-[#66756F]">
        Gallery (Media & Gambar)
      </label>
      <input type="hidden" name={name} value={jsonString} />
      
      {items.map((item, idx) => (
        <div key={idx} className="flex flex-col gap-3 items-start bg-white p-3 rounded-lg border border-[#E8E2D5] shadow-sm relative group">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3">
            
            <div className="md:col-span-2">
              <label className="block text-[9px] font-mono text-[#66756F] uppercase mb-1">Image Upload</label>
              <div className="flex items-center gap-3">
                {item.img ? (
                  <div className="relative w-16 h-16 rounded bg-gray-100 overflow-hidden shrink-0 border border-[#E8E2D5]">
                    <img src={item.img} alt="preview" className="object-cover w-full h-full" />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded bg-gray-50 border border-dashed border-[#E8E2D5] flex items-center justify-center shrink-0">
                    <span className="text-[10px] text-[#66756F]">No Img</span>
                  </div>
                )}
                <div className="flex-1 flex flex-col gap-2">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => handleFileChange(idx, e)}
                    disabled={uploadingIdx === idx}
                    className="block w-full text-xs text-[#66756F] file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-[10px] file:font-semibold file:bg-[#6B0F0F]/10 file:text-[#6B0F0F] hover:file:bg-[#6B0F0F]/20 cursor-pointer disabled:opacity-50"
                  />
                  {uploadingIdx === idx && <span className="text-[10px] text-[#6B0F0F] animate-pulse">Mengunggah...</span>}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[9px] font-mono text-[#66756F] uppercase mb-1">Title (ID)</label>
              <input 
                type="text" 
                placeholder="Judul dalam Bahasa Indonesia" 
                value={item.titleId}
                onChange={(e) => updateItem(idx, "titleId", e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[#E8E2D5] text-xs focus:border-[#6B0F0F] outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-[9px] font-mono text-[#66756F] uppercase mb-1">Title (EN)</label>
              <input 
                type="text" 
                placeholder="Title in English" 
                value={item.titleEn}
                onChange={(e) => updateItem(idx, "titleEn", e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[#E8E2D5] text-xs focus:border-[#6B0F0F] outline-none transition-colors"
              />
            </div>
            
            <div>
              <label className="block text-[9px] font-mono text-[#66756F] uppercase mb-1">Description (ID)</label>
              <input 
                type="text" 
                placeholder="Deskripsi singkat" 
                value={item.descId}
                onChange={(e) => updateItem(idx, "descId", e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[#E8E2D5] text-xs focus:border-[#6B0F0F] outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-[9px] font-mono text-[#66756F] uppercase mb-1">Description (EN)</label>
              <input 
                type="text" 
                placeholder="Short description" 
                value={item.descEn}
                onChange={(e) => updateItem(idx, "descEn", e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[#E8E2D5] text-xs focus:border-[#6B0F0F] outline-none transition-colors"
              />
            </div>

          </div>
          <button 
            type="button" 
            onClick={() => removeItem(idx)}
            className="absolute -top-3 -right-3 bg-white p-1.5 text-red-400 hover:bg-red-50 hover:text-red-600 rounded-full shadow-sm border border-[#E8E2D5] transition-colors z-10"
            title="Hapus media ini"
          >
            <X size={14} />
          </button>
        </div>
      ))}
      <button 
        type="button" 
        onClick={addItem}
        className="flex items-center gap-1.5 px-3 py-2 border border-dashed border-[#E8E2D5] text-[#66756F] text-xs font-medium rounded-lg hover:border-[#6B0F0F] hover:text-[#6B0F0F] hover:bg-[#FDFBF7] transition-all"
      >
        <Plus size={12} /> Tambah Media Gallery
      </button>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AdminDashboard({
  config,
  educations,
  experiences,
  skills,
  projects,
  organizations,
  publications,
  messages,
  actions,
}: Props) {
  const [isPending, startTransition] = useTransition();
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [activeTab, setActiveTab] = useState<string>("overview");

  // ── Helpers ────────────────────────────────────────────────────────────────

  function showToast(msg: string, type: "success" | "error" = "success") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  }

  function act(fn: () => Promise<unknown>, successMsg = "Tersimpan!") {
    startTransition(async () => {
      try {
        await fn();
        showToast(successMsg);
      } catch (e) {
        showToast("Terjadi kesalahan. Coba lagi.", "error");
        console.error(e);
      }
    });
  }

  // ── Tab list ───────────────────────────────────────────────────────────────

  const tabs = [
    { id: "overview", label: "Ringkasan", icon: Eye },
    { id: "config", label: "Hero & About", icon: Settings },
    { id: "education", label: "Pendidikan", icon: BookOpen },
    { id: "experience", label: "Pengalaman", icon: Briefcase },
    { id: "skills", label: "Keahlian", icon: Star },
    { id: "projects", label: "Proyek", icon: FolderOpen },
    { id: "organizations", label: "Organisasi", icon: Users },
    { id: "publications", label: "Publikasi", icon: FileText },
    { id: "messages", label: "Pesan Masuk", icon: MessageSquare },
  ];

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[#F7F4EF] flex flex-col">
      {toast && <Toast msg={toast.msg} type={toast.type} />}

      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#E8E2D5] shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-[#6B0F0F] rounded-xl p-2">
              <ShieldCheck size={18} className="text-white" />
            </div>
            <div>
              <p className="font-black text-[#0B1D17] leading-none text-sm">GITA ANDINI</p>
              <p className="text-[10px] font-mono text-[#66756F] uppercase tracking-widest">CMS Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => act(() => actions.runSeed(), "Database di-seed ulang!")}
              disabled={isPending}
              className="flex items-center gap-1.5 px-3 py-2 text-[11px] font-mono rounded-xl border border-[#E8E2D5] text-[#66756F] hover:bg-[#FDFBF7] transition-colors disabled:opacity-50"
            >
              <RefreshCw size={12} className={isPending ? "animate-spin" : ""} />
              Seed Data
            </button>
            <a
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 px-3 py-2 text-[11px] font-mono rounded-xl border border-[#E8E2D5] text-[#66756F] hover:bg-[#FDFBF7] transition-colors"
            >
              <Eye size={12} />
              Lihat Situs
            </a>
            <form action={actions.logoutAction}>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-3 py-2 text-[11px] font-mono rounded-xl bg-[#6B0F0F] text-white hover:bg-[#540c0c] transition-colors"
              >
                <LogOut size={12} />
                Keluar
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto w-full px-6 py-8 flex gap-8 flex-1">
        {/* Sidebar tabs */}
        <aside className="w-64 flex-shrink-0">
          <div className="sticky top-24 bg-white/80 backdrop-blur-xl border border-[#E8E2D5] rounded-3xl p-4 shadow-sm">
            <nav className="space-y-6 relative">
              
              {/* Group: Dashboard */}
              <div>
                <h3 className="px-4 text-[10px] font-mono font-bold text-[#66756F] uppercase tracking-widest mb-2">Main</h3>
                <div className="space-y-1">
                  {tabs.filter(t => t.id === "overview").map((tab, i) => {
                    const isActive = activeTab === tab.id;
                    return (
                      <motion.button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        whileHover={{ x: isActive ? 0 : 4 }}
                        whileTap={{ scale: 0.96 }}
                        className={`relative w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm transition-colors text-left overflow-hidden group ${
                          isActive ? "text-white" : "text-[#66756F]"
                        }`}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="active-tab"
                            className="absolute inset-0 bg-[#6B0F0F] rounded-2xl shadow-md shadow-[#6B0F0F]/20 z-0"
                            initial={false}
                            transition={{ type: "spring", stiffness: 350, damping: 30 }}
                          />
                        )}
                        {!isActive && (
                          <div className="absolute inset-0 bg-[#FDFBF7] opacity-0 group-hover:opacity-100 rounded-2xl z-0 transition-opacity" />
                        )}
                        <span className="relative z-10 flex items-center gap-3 w-full">
                          <tab.icon size={16} className={`transition-colors ${isActive ? "text-white" : "text-[#66756F] group-hover:text-[#6B0F0F]"}`} />
                          <span className={`transition-all ${isActive ? "font-bold tracking-wide" : "font-medium group-hover:text-[#0B1D17]"}`}>
                            {tab.label}
                          </span>
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Group: Content */}
              <div>
                <h3 className="px-4 text-[10px] font-mono font-bold text-[#66756F] uppercase tracking-widest mb-2">Content Manager</h3>
                <div className="space-y-1 relative">
                  {/* Vertical decorative line for group */}
                  <div className="absolute left-6 top-2 bottom-2 w-px bg-[#E8E2D5] z-0 hidden md:block" />
                  
                  {tabs.filter(t => ["education", "experience", "skills", "projects", "organizations", "publications"].includes(t.id)).map((tab, i) => {
                    const isActive = activeTab === tab.id;
                    return (
                      <motion.button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + i * 0.05 }}
                        whileHover={{ x: isActive ? 0 : 4 }}
                        whileTap={{ scale: 0.96 }}
                        className={`relative w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm transition-colors text-left overflow-hidden group ${
                          isActive ? "text-white" : "text-[#66756F]"
                        }`}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="active-tab"
                            className="absolute inset-0 bg-[#6B0F0F] rounded-2xl shadow-md shadow-[#6B0F0F]/20 z-0"
                            initial={false}
                            transition={{ type: "spring", stiffness: 350, damping: 30 }}
                          />
                        )}
                        {!isActive && (
                          <div className="absolute inset-0 bg-[#FDFBF7] opacity-0 group-hover:opacity-100 rounded-2xl z-0 transition-opacity" />
                        )}
                        <span className="relative z-10 flex items-center gap-3 w-full">
                          <tab.icon size={16} className={`transition-colors ${isActive ? "text-white" : "text-[#66756F] group-hover:text-[#6B0F0F]"}`} />
                          <span className={`transition-all ${isActive ? "font-bold tracking-wide" : "font-medium group-hover:text-[#0B1D17]"}`}>
                            {tab.label}
                          </span>
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Group: Settings & Inbox */}
              <div>
                <h3 className="px-4 text-[10px] font-mono font-bold text-[#66756F] uppercase tracking-widest mb-2">System</h3>
                <div className="space-y-1">
                  {tabs.filter(t => ["config", "messages"].includes(t.id)).map((tab, i) => {
                    const isActive = activeTab === tab.id;
                    const isMessage = tab.id === "messages";
                    const unreadCount = isMessage ? messages.length : 0;
                    
                    return (
                      <motion.button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.05 }}
                        whileHover={{ x: isActive ? 0 : 4 }}
                        whileTap={{ scale: 0.96 }}
                        className={`relative w-full flex items-center justify-between px-4 py-2.5 rounded-2xl text-sm transition-colors text-left overflow-hidden group ${
                          isActive ? "text-white" : "text-[#66756F]"
                        }`}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="active-tab"
                            className="absolute inset-0 bg-[#6B0F0F] rounded-2xl shadow-md shadow-[#6B0F0F]/20 z-0"
                            initial={false}
                            transition={{ type: "spring", stiffness: 350, damping: 30 }}
                          />
                        )}
                        {!isActive && (
                          <div className="absolute inset-0 bg-[#FDFBF7] opacity-0 group-hover:opacity-100 rounded-2xl z-0 transition-opacity" />
                        )}
                        <span className="relative z-10 flex items-center gap-3">
                          <tab.icon size={16} className={`transition-colors ${isActive ? "text-white" : "text-[#66756F] group-hover:text-[#6B0F0F]"}`} />
                          <span className={`transition-all ${isActive ? "font-bold tracking-wide" : "font-medium group-hover:text-[#0B1D17]"}`}>
                            {tab.label}
                          </span>
                        </span>
                        
                        {/* Messages Badge */}
                        {isMessage && unreadCount > 0 && (
                          <span className={`relative z-10 text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors ${
                            isActive ? "bg-white text-[#6B0F0F]" : "bg-[#6B0F0F] text-white"
                          }`}>
                            {unreadCount}
                          </span>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

            </nav>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0 space-y-6">
          {/* ── Overview ────────────────────────────────────────────────── */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <h1 className="text-2xl font-black text-[#0B1D17]">Ringkasan CMS</h1>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Pendidikan", val: educations.length, icon: BookOpen },
                  { label: "Pengalaman", val: experiences.length, icon: Briefcase },
                  { label: "Proyek", val: projects.length, icon: FolderOpen },
                  { label: "Pesan", val: messages.length, icon: MessageSquare },
                  { label: "Keahlian", val: skills.length, icon: Star },
                  { label: "Organisasi", val: organizations.length, icon: Users },
                  { label: "Publikasi", val: publications.length, icon: FileText },
                  { label: "Config Keys", val: Object.keys(config).length, icon: Database },
                ].map(({ label, val, icon: Icon }) => (
                  <div key={label} className="bg-white rounded-2xl border border-[#E8E2D5] px-5 py-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon size={14} className="text-[#6B0F0F]" />
                      <span className="text-[11px] font-mono text-[#66756F] uppercase tracking-wider">{label}</span>
                    </div>
                    <p className="text-3xl font-black text-[#0B1D17]">{val}</p>
                  </div>
                ))}
              </div>
              <div className="bg-[#6B0F0F]/5 border border-[#6B0F0F]/15 rounded-2xl px-6 py-5">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle size={15} className="text-[#6B0F0F]" />
                  <span className="font-bold text-[#6B0F0F] text-sm">Pertama kali menggunakan?</span>
                </div>
                <p className="text-sm text-[#66756F]">
                  Klik <strong>"Seed Data"</strong> di pojok kanan atas untuk mengisi database dengan konten bawaan dari portfolio ini. 
                  Setelah itu, edit setiap bagian menggunakan tab di sidebar kiri.
                </p>
              </div>
            </div>
          )}

          {/* ── Config ──────────────────────────────────────────────────── */}
          {activeTab === "config" && (
            <SectionCard title="Hero & About" icon={Settings} count={Object.keys(config).length}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const fd = new FormData(e.currentTarget);
                  const pairs: { key: string; value: string }[] = [];
                  fd.forEach((v, k) => pairs.push({ key: k, value: v as string }));
                  act(() => actions.upsertConfigBatch(pairs));
                }}
                className="mt-5 space-y-4"
              >
                {(() => {
                  const handledKeys = new Set<string>();
                  const elements = [];
                  const labels: Record<string, string> = {
                    hero_tag: "Tag Utama (Hero)",
                    hero_subtitle: "Sub-judul Hero",
                    hero_polaroid: "Teks Foto Polaroid",
                    about_balloon: "Teks Balon Kata (About)",
                    about_desc1: "Paragraf 1 (About)",
                    about_desc2: "Paragraf 2 (About)",
                    about_bullet1: "Poin Keunggulan 1 (About)",
                    about_bullet2: "Poin Keunggulan 2 (About)",
                    about_polaroid: "Teks Foto Polaroid (About)",
                    contact_email: "Alamat Email Kontak",
                    contact_phone: "Nomor Telepon",
                    contact_linkedin: "URL Profil LinkedIn",
                    contact_instagram: "URL Profil Instagram"
                  };

                  for (const [key, value] of Object.entries(config)) {
                    if (handledKeys.has(key)) continue;

                    let baseKey = "";
                    let enKey = "";
                    if (key.endsWith("_id")) {
                      baseKey = key.replace("_id", "");
                      enKey = baseKey + "_en";
                    } else if (key.endsWith("_ID")) {
                      baseKey = key.replace("_ID", "");
                      enKey = baseKey + "_EN";
                    }

                    if (baseKey && config[enKey] !== undefined) {
                      handledKeys.add(key);
                      handledKeys.add(enKey);
                      const label = labels[baseKey.toLowerCase()] || baseKey.replace(/_/g, " ");
                      const isMultiline = value.length > 60 || config[enKey].length > 60;
                      elements.push(
                        <SplitConfigBilingualField 
                          key={baseKey} 
                          label={label} 
                          nameId={key} 
                          nameEn={enKey} 
                          valId={value} 
                          valEn={config[enKey]} 
                          multiline={isMultiline} 
                        />
                      );
                      continue;
                    }

                    // Jika tidak berpasangan
                    handledKeys.add(key);
                    const label = labels[key.toLowerCase()] || key.replace(/_/g, " ");
                    const isMultiline = value.length > 60;
                    elements.push(
                      <Field key={key} label={label} name={key} defaultValue={value} multiline={isMultiline} />
                    );
                  }
                  return elements;
                })()}
                <button
                  type="submit"
                  disabled={isPending}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#6B0F0F] text-white text-sm font-bold rounded-xl hover:bg-[#540c0c] transition-colors disabled:opacity-50"
                >
                  <Save size={14} />
                  Simpan Config
                </button>
              </form>
            </SectionCard>
          )}

          {/* ── Education ───────────────────────────────────────────────── */}
          {activeTab === "education" && (
            <SectionCard title="Pendidikan" icon={BookOpen} count={educations.length}>
              <div className="mt-5 space-y-3">
                {educations.map((edu) => (
                  <div key={edu.id} className="border border-[#E8E2D5] rounded-2xl overflow-hidden">
                    <details>
                      <summary className="flex items-center justify-between px-4 py-3 bg-[#FDFBF7] cursor-pointer list-none select-none">
                        <span className="font-semibold text-sm text-[#0B1D17] truncate">{edu.school}</span>
                        <div className="flex items-center gap-2 ml-2 flex-shrink-0">
                          <ChevronDown size={14} className="text-[#66756F]" />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              act(() => actions.deleteEducationItem(edu.id), "Terhapus.");
                            }}
                            className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </summary>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          const fd = new FormData(e.currentTarget);
                          act(() => actions.upsertEducationItem({
                            id: edu.id,
                            school: fd.get("school") as string,
                            degree: fd.get("degree") as string,
                            major: fd.get("major") as string,
                            period: fd.get("period") as string,
                            gpa: fd.get("gpa") as string,
                            description: fd.get("description") as string,
                            highlights: fd.get("highlights") as string,
                          }));
                        }}
                        className="px-4 pb-4 border-t border-[#E8E2D5] grid grid-cols-2 gap-3 pt-3"
                      >
                        <BilingualField label="Sekolah/Universitas" name="school" defaultValue={edu.school} />
                        <BilingualField label="Gelar" name="degree" defaultValue={edu.degree} />
                        <BilingualField label="Jurusan" name="major" defaultValue={edu.major} />
                        <PeriodPickerField name="period" defaultValue={edu.period} />
                        <BilingualField label="IPK" name="gpa" defaultValue={edu.gpa} />
                        <div className="col-span-2">
                          <BilingualField label="Deskripsi" name="description" defaultValue={edu.description} multiline />
                        </div>
                        <div className="col-span-2">
                          <HighlightsEditor defaultValue={edu.highlights} name="highlights" />
                        </div>
                        <div className="col-span-2">
                          <button type="submit" disabled={isPending} className="flex items-center gap-2 px-4 py-2 bg-[#6B0F0F] text-white text-xs font-bold rounded-xl hover:bg-[#540c0c] disabled:opacity-50">
                            <Save size={12} /> Simpan
                          </button>
                        </div>
                      </form>
                    </details>
                  </div>
                ))}
              </div>
              <button
                onClick={() => act(() => actions.upsertEducationItem({ school: "Universitas Baru", degree: "S1", major: "Jurusan", period: "2020 - 2024", gpa: "", description: "", highlights: "[]" }), "Ditambahkan!")}
                disabled={isPending}
                className="mt-4 flex items-center gap-2 px-4 py-2 border-2 border-dashed border-[#E8E2D5] text-[#66756F] text-sm rounded-xl hover:border-[#6B0F0F] hover:text-[#6B0F0F] transition-colors disabled:opacity-50"
              >
                <Plus size={14} /> Tambah Pendidikan
              </button>
            </SectionCard>
          )}

          {/* ── Experience ──────────────────────────────────────────────── */}
          {activeTab === "experience" && (
            <SectionCard title="Pengalaman" icon={Briefcase} count={experiences.length}>
              <div className="mt-5 space-y-3">
                {experiences.map((exp) => (
                  <div key={exp.id} className="border border-[#E8E2D5] rounded-2xl overflow-hidden">
                    <details>
                      <summary className="flex items-center justify-between px-4 py-3 bg-[#FDFBF7] cursor-pointer list-none select-none">
                        <span className="font-semibold text-sm text-[#0B1D17] truncate">{exp.role}</span>
                        <div className="flex items-center gap-2 ml-2 flex-shrink-0">
                          <ChevronDown size={14} className="text-[#66756F]" />
                          <button type="button" onClick={(e) => { e.preventDefault(); act(() => actions.deleteExperienceItem(exp.id), "Terhapus."); }} className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </summary>
                      <form onSubmit={(e) => {
                        e.preventDefault();
                        const fd = new FormData(e.currentTarget);
                        act(() => actions.upsertExperienceItem({ id: exp.id, role: fd.get("role") as string, company: fd.get("company") as string, period: fd.get("period") as string, description: fd.get("description") as string, highlights: fd.get("highlights") as string, gallery: fd.get("gallery") as string }));
                      }} className="px-4 pb-4 border-t border-[#E8E2D5] grid grid-cols-2 gap-3 pt-3">
                        <BilingualField label="Posisi/Role" name="role" defaultValue={exp.role} />
                        <BilingualField label="Perusahaan" name="company" defaultValue={exp.company} />
                        <PeriodPickerField name="period" defaultValue={exp.period} />
                        <div className="col-span-2"><BilingualField label="Deskripsi" name="description" defaultValue={exp.description} multiline /></div>
                        <div className="col-span-2"><HighlightsEditor defaultValue={exp.highlights} name="highlights" /></div>
                        <div className="col-span-2"><GalleryEditor defaultValue={exp.gallery} name="gallery" uploadAction={actions.uploadImageAction} /></div>
                        <div className="col-span-2"><button type="submit" disabled={isPending} className="flex items-center gap-2 px-4 py-2 bg-[#6B0F0F] text-white text-xs font-bold rounded-xl hover:bg-[#540c0c] disabled:opacity-50"><Save size={12} /> Simpan</button></div>
                      </form>
                    </details>
                  </div>
                ))}
              </div>
              <button onClick={() => act(() => actions.upsertExperienceItem({ role: "Posisi Baru", company: "Perusahaan", period: "2024 - Sekarang", description: "", highlights: "[]", gallery: "[]" }), "Ditambahkan!")} disabled={isPending} className="mt-4 flex items-center gap-2 px-4 py-2 border-2 border-dashed border-[#E8E2D5] text-[#66756F] text-sm rounded-xl hover:border-[#6B0F0F] hover:text-[#6B0F0F] transition-colors disabled:opacity-50">
                <Plus size={14} /> Tambah Pengalaman
              </button>
            </SectionCard>
          )}

          {/* ── Skills ──────────────────────────────────────────────────── */}
          {activeTab === "skills" && (
            <SectionCard title="Keahlian" icon={Star} count={skills.length}>
              <div className="mt-5 space-y-3">
                {skills.map((sk) => (
                  <div key={sk.id} className="border border-[#E8E2D5] rounded-2xl overflow-hidden">
                    <details>
                      <summary className="flex items-center justify-between px-4 py-3 bg-[#FDFBF7] cursor-pointer list-none select-none">
                        <span className="font-semibold text-sm text-[#0B1D17] truncate">{sk.category}</span>
                        <div className="flex items-center gap-2 ml-2 flex-shrink-0">
                          <ChevronDown size={14} className="text-[#66756F]" />
                          <button type="button" onClick={(e) => { e.preventDefault(); act(() => actions.deleteSkillItem(sk.id), "Terhapus."); }} className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors"><Trash2 size={14} /></button>
                        </div>
                      </summary>
                      <form onSubmit={(e) => {
                        e.preventDefault();
                        const fd = new FormData(e.currentTarget);
                        act(() => actions.upsertSkillItem({ id: sk.id, category: fd.get("category") as string, items: fd.get("items") as string }));
                      }} className="px-4 pb-4 border-t border-[#E8E2D5] space-y-3 pt-3">
                        <BilingualField label="Kategori" name="category" defaultValue={sk.category} />
                        <HighlightsEditor label="Item Keahlian" buttonText="Tambah Item Keahlian" name="items" defaultValue={sk.items} />
                        <button type="submit" disabled={isPending} className="flex items-center gap-2 px-4 py-2 bg-[#6B0F0F] text-white text-xs font-bold rounded-xl hover:bg-[#540c0c] disabled:opacity-50"><Save size={12} /> Simpan</button>
                      </form>
                    </details>
                  </div>
                ))}
              </div>
              <button onClick={() => act(() => actions.upsertSkillItem({ category: "Kategori Baru", items: '["Keahlian baru"]' }), "Ditambahkan!")} disabled={isPending} className="mt-4 flex items-center gap-2 px-4 py-2 border-2 border-dashed border-[#E8E2D5] text-[#66756F] text-sm rounded-xl hover:border-[#6B0F0F] hover:text-[#6B0F0F] transition-colors disabled:opacity-50">
                <Plus size={14} /> Tambah Kategori Keahlian
              </button>
            </SectionCard>
          )}

          {/* ── Projects ────────────────────────────────────────────────── */}
          {activeTab === "projects" && (
            <SectionCard title="Proyek" icon={FolderOpen} count={projects.length}>
              <div className="mt-5 space-y-3">
                {projects.map((proj) => (
                  <div key={proj.id} className="border border-[#E8E2D5] rounded-2xl overflow-hidden">
                    <details>
                      <summary className="flex items-center justify-between px-4 py-3 bg-[#FDFBF7] cursor-pointer list-none select-none">
                        <span className="font-semibold text-sm text-[#0B1D17] truncate">{proj.title}</span>
                        <div className="flex items-center gap-2 ml-2 flex-shrink-0">
                          <ChevronDown size={14} className="text-[#66756F]" />
                          <button type="button" onClick={(e) => { e.preventDefault(); act(() => actions.deleteProjectItem(proj.id), "Terhapus."); }} className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors"><Trash2 size={14} /></button>
                        </div>
                      </summary>
                      <form onSubmit={(e) => {
                        e.preventDefault();
                        const fd = new FormData(e.currentTarget);
                        act(() => actions.upsertProjectItem({ id: proj.id, title: fd.get("title") as string, category: fd.get("category") as string, period: fd.get("period") as string, role: fd.get("role") as string, description: fd.get("description") as string, highlights: fd.get("highlights") as string, gallery: fd.get("gallery") as string }));
                      }} className="px-4 pb-4 border-t border-[#E8E2D5] grid grid-cols-2 gap-3 pt-3">
                        <div className="col-span-2"><BilingualField label="Judul" name="title" defaultValue={proj.title} /></div>
                        <BilingualField label="Kategori" name="category" defaultValue={proj.category} />
                        <PeriodPickerField name="period" defaultValue={proj.period} />
                        <BilingualField label="Peran" name="role" defaultValue={proj.role} />
                        <div className="col-span-2"><BilingualField label="Deskripsi" name="description" defaultValue={proj.description} multiline /></div>
                        <div className="col-span-2"><HighlightsEditor defaultValue={proj.highlights} name="highlights" /></div>
                        <div className="col-span-2"><GalleryEditor defaultValue={proj.gallery} name="gallery" uploadAction={actions.uploadImageAction} /></div>
                        <div className="col-span-2"><button type="submit" disabled={isPending} className="flex items-center gap-2 px-4 py-2 bg-[#6B0F0F] text-white text-xs font-bold rounded-xl hover:bg-[#540c0c] disabled:opacity-50"><Save size={12} /> Simpan</button></div>
                      </form>
                    </details>
                  </div>
                ))}
              </div>
              <button onClick={() => act(() => actions.upsertProjectItem({ title: "Proyek Baru", category: "Kategori", period: "2025", role: "Peran", description: "", highlights: "[]", gallery: "[]" }), "Ditambahkan!")} disabled={isPending} className="mt-4 flex items-center gap-2 px-4 py-2 border-2 border-dashed border-[#E8E2D5] text-[#66756F] text-sm rounded-xl hover:border-[#6B0F0F] hover:text-[#6B0F0F] transition-colors disabled:opacity-50">
                <Plus size={14} /> Tambah Proyek
              </button>
            </SectionCard>
          )}

          {/* ── Organizations ───────────────────────────────────────────── */}
          {activeTab === "organizations" && (
            <SectionCard title="Organisasi" icon={Users} count={organizations.length}>
              <div className="mt-5 space-y-3">
                {organizations.map((org) => (
                  <div key={org.id} className="border border-[#E8E2D5] rounded-2xl overflow-hidden">
                    <details>
                      <summary className="flex items-center justify-between px-4 py-3 bg-[#FDFBF7] cursor-pointer list-none select-none">
                        <span className="font-semibold text-sm text-[#0B1D17] truncate">{org.title}</span>
                        <div className="flex items-center gap-2 ml-2 flex-shrink-0">
                          <ChevronDown size={14} className="text-[#66756F]" />
                          <button type="button" onClick={(e) => { e.preventDefault(); act(() => actions.deleteOrganizationItem(org.id), "Terhapus."); }} className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors"><Trash2 size={14} /></button>
                        </div>
                      </summary>
                      <form onSubmit={(e) => {
                        e.preventDefault();
                        const fd = new FormData(e.currentTarget);
                        act(() => actions.upsertOrganizationItem({ id: org.id, title: fd.get("title") as string, role: fd.get("role") as string, period: fd.get("period") as string, desc: fd.get("desc") as string, details: fd.get("details") as string, highlights: fd.get("highlights") as string, gallery: fd.get("gallery") as string }));
                      }} className="px-4 pb-4 border-t border-[#E8E2D5] grid grid-cols-2 gap-3 pt-3">
                        <div className="col-span-2"><BilingualField label="Nama Organisasi" name="title" defaultValue={org.title} /></div>
                        <BilingualField label="Peran" name="role" defaultValue={org.role} />
                        <PeriodPickerField name="period" defaultValue={org.period} />
                        <div className="col-span-2"><BilingualField label="Deskripsi Singkat" name="desc" defaultValue={org.desc} multiline /></div>
                        <div className="col-span-2"><BilingualField label="Detail" name="details" defaultValue={org.details} multiline /></div>
                        <div className="col-span-2"><HighlightsEditor defaultValue={org.highlights} name="highlights" /></div>
                        <div className="col-span-2"><GalleryEditor defaultValue={org.gallery} name="gallery" uploadAction={actions.uploadImageAction} /></div>
                        <div className="col-span-2"><button type="submit" disabled={isPending} className="flex items-center gap-2 px-4 py-2 bg-[#6B0F0F] text-white text-xs font-bold rounded-xl hover:bg-[#540c0c] disabled:opacity-50"><Save size={12} /> Simpan</button></div>
                      </form>
                    </details>
                  </div>
                ))}
              </div>
              <button onClick={() => act(() => actions.upsertOrganizationItem({ title: "Organisasi Baru", role: "Anggota", period: "2024 - 2025", desc: "", details: "", highlights: "[]", gallery: "[]" }), "Ditambahkan!")} disabled={isPending} className="mt-4 flex items-center gap-2 px-4 py-2 border-2 border-dashed border-[#E8E2D5] text-[#66756F] text-sm rounded-xl hover:border-[#6B0F0F] hover:text-[#6B0F0F] transition-colors disabled:opacity-50">
                <Plus size={14} /> Tambah Organisasi
              </button>
            </SectionCard>
          )}

          {/* ── Publications ────────────────────────────────────────────── */}
          {activeTab === "publications" && (
            <SectionCard title="Publikasi" icon={FileText} count={publications.length}>
              <div className="mt-5 space-y-3">
                {publications.map((pub) => (
                  <div key={pub.id} className="border border-[#E8E2D5] rounded-2xl overflow-hidden">
                    <details>
                      <summary className="flex items-center justify-between px-4 py-3 bg-[#FDFBF7] cursor-pointer list-none select-none">
                        <span className="font-semibold text-sm text-[#0B1D17] truncate">{pub.title}</span>
                        <div className="flex items-center gap-2 ml-2 flex-shrink-0">
                          <ChevronDown size={14} className="text-[#66756F]" />
                          <button type="button" onClick={(e) => { e.preventDefault(); act(() => actions.deletePublicationItem(pub.id), "Terhapus."); }} className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors"><Trash2 size={14} /></button>
                        </div>
                      </summary>
                      <form onSubmit={(e) => {
                        e.preventDefault();
                        const fd = new FormData(e.currentTarget);
                        act(() => actions.upsertPublicationItem({ id: pub.id, title: fd.get("title") as string, journal: fd.get("journal") as string, year: fd.get("year") as string, type: fd.get("type") as string, details: fd.get("details") as string, highlights: fd.get("highlights") as string }));
                      }} className="px-4 pb-4 border-t border-[#E8E2D5] grid grid-cols-2 gap-3 pt-3">
                        <div className="col-span-2"><BilingualField label="Judul" name="title" defaultValue={pub.title} /></div>
                        <BilingualField label="Jurnal" name="journal" defaultValue={pub.journal} />
                        <BilingualField label="Tahun" name="year" defaultValue={pub.year} />
                        <div className="col-span-2"><BilingualField label="Tipe" name="type" defaultValue={pub.type} /></div>
                        <div className="col-span-2"><BilingualField label="Detail" name="details" defaultValue={pub.details} multiline /></div>
                        <div className="col-span-2"><HighlightsEditor defaultValue={pub.highlights} name="highlights" /></div>
                        <div className="col-span-2"><button type="submit" disabled={isPending} className="flex items-center gap-2 px-4 py-2 bg-[#6B0F0F] text-white text-xs font-bold rounded-xl hover:bg-[#540c0c] disabled:opacity-50"><Save size={12} /> Simpan</button></div>
                      </form>
                    </details>
                  </div>
                ))}
              </div>
              <button onClick={() => act(() => actions.upsertPublicationItem({ title: "Judul Publikasi", journal: "Jurnal", year: "2025", type: "Artikel", details: "", highlights: "[]" }), "Ditambahkan!")} disabled={isPending} className="mt-4 flex items-center gap-2 px-4 py-2 border-2 border-dashed border-[#E8E2D5] text-[#66756F] text-sm rounded-xl hover:border-[#6B0F0F] hover:text-[#6B0F0F] transition-colors disabled:opacity-50">
                <Plus size={14} /> Tambah Publikasi
              </button>
            </SectionCard>
          )}

          {/* ── Messages ────────────────────────────────────────────────── */}
          {activeTab === "messages" && (
            <SectionCard title="Pesan Masuk" icon={MessageSquare} count={messages.length}>
              <div className="mt-5 space-y-3">
                {messages.length === 0 && (
                  <p className="text-sm text-[#66756F] italic text-center py-8">Belum ada pesan masuk.</p>
                )}
                {messages.map((msg) => (
                  <div key={msg.id} className="border border-[#E8E2D5] rounded-2xl overflow-hidden">
                    <details>
                      <summary className="flex items-center justify-between px-4 py-3 bg-[#FDFBF7] cursor-pointer list-none select-none">
                        <div>
                          <span className="font-semibold text-sm text-[#0B1D17]">{msg.name}</span>
                          <span className="text-[#66756F] text-xs ml-2">– {msg.subject}</span>
                        </div>
                        <div className="flex items-center gap-2 ml-2 flex-shrink-0">
                          <span className="text-[10px] font-mono text-[#66756F]">
                            {new Date(msg.createdAt).toLocaleDateString("id-ID")}
                          </span>
                          <ChevronDown size={14} className="text-[#66756F]" />
                          <button type="button" onClick={(e) => { e.preventDefault(); act(() => actions.deleteMessage(msg.id), "Pesan dihapus."); }} className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors"><Trash2 size={14} /></button>
                        </div>
                      </summary>
                      <div className="px-4 pb-4 border-t border-[#E8E2D5] pt-3 space-y-2">
                        <p className="text-xs font-mono text-[#66756F]">Dari: {msg.email}</p>
                        <p className="text-sm text-[#0B1D17] whitespace-pre-wrap">{msg.message}</p>
                      </div>
                    </details>
                  </div>
                ))}
              </div>
            </SectionCard>
          )}
        </main>
      </div>
    </div>
  );
}
