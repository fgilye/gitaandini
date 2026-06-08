"use client";

import React, { useRef } from "react";
import { Printer, ArrowLeft, Camera } from "lucide-react";
import Link from "next/link";

export default function PrintButton() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      window.dispatchEvent(new CustomEvent('update-photo', { detail: url }));
    }
  };

  return (
    <div className="fixed top-6 right-6 flex flex-col gap-3 z-50 print:hidden">
      <Link 
        href="/"
        className="bg-zinc-800 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-zinc-700 transition-colors flex items-center justify-center gap-2 text-sm font-semibold"
      >
        <ArrowLeft size={16} />
        <span>Back to Website</span>
      </Link>
      <button 
        onClick={() => fileInputRef.current?.click()}
        className="bg-white text-zinc-800 border border-gray-200 px-4 py-2 rounded-lg shadow-lg hover:bg-zinc-50 transition-colors flex items-center justify-center gap-2 text-sm font-semibold cursor-pointer"
      >
        <Camera size={16} />
        <span>Ganti Foto CV</span>
      </button>
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handlePhotoChange} 
        accept="image/*" 
        className="hidden" 
      />
      <button 
        onClick={() => window.print()}
        className="bg-[#6B0F0F] text-white px-4 py-3 rounded-lg shadow-xl hover:bg-[#540c0c] transition-colors flex items-center justify-center gap-2 text-sm font-bold"
      >
        <Printer size={18} />
        <span>Save as PDF</span>
      </button>
    </div>
  );
}
