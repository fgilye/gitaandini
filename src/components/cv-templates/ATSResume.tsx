"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

function getEn(str: string) {
  if (!str) return "";
  const parts = str.split(" | ");
  return (parts[1] || parts[0]).trim();
}

export default function ATSResume({ 
  config, 
  experiences, 
  education, 
  organizations, 
  publications,
  skills 
}: { 
  config: any, 
  experiences: any[], 
  education: any[], 
  organizations: any[], 
  publications: any[],
  skills: any[]
}) {
  const getHighlights = (jsonStr: string) => {
    try {
      return JSON.parse(jsonStr).map((s: string) => getEn(s));
    } catch {
      return [];
    }
  };

  const [photoUrl, setPhotoUrl] = useState("/gita_about_new.png");

  useEffect(() => {
    const handleUpdate = (e: any) => setPhotoUrl(e.detail);
    window.addEventListener('update-photo', handleUpdate);
    return () => window.removeEventListener('update-photo', handleUpdate);
  }, []);

  return (
    <div className="font-sans text-[#1a1a1a] leading-snug">
      {/* Header */}
      <div className="flex gap-5 mb-4">
        <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 overflow-hidden bg-gray-100 rounded-full border border-gray-200">
          <Image 
            src={photoUrl} 
            alt="Gita Andini" 
            width={96} 
            height={96} 
            className="w-full h-full object-cover object-top" 
          />
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl sm:text-4xl font-bold uppercase tracking-tight mb-1 text-black leading-none">
            Gita Andini
          </h1>
          <div className="text-[11px] text-gray-600 flex flex-wrap items-center gap-1.5 mb-1 font-medium leading-none">
            <a href="https://wa.me/6281646931534" target="_blank" rel="noopener noreferrer" className="hover:text-[#6B0F0F] hover:underline">
              {config.contact_phone || "+62 81646931534"}
            </a>
            <span>|</span>
            <a href="mailto:gitaandini669@gmail.com" className="hover:text-[#6B0F0F] hover:underline">
              {config.contact_email || "gitaandini669@gmail.com"}
            </a>
            <span>|</span>
            <a href="https://linkedin.com/in/gita-andini/" target="_blank" rel="noopener noreferrer" className="hover:text-[#6B0F0F] hover:underline">
              linkedin.com/in/gita-andini
            </a>
            <span>|</span>
            <a href="https://gitaandini.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-[#6B0F0F] hover:underline">
              gitaandini.vercel.app
            </a>
          </div>
          <div className="text-[11px] text-gray-600 mb-1 font-medium leading-none">
            {config.contact_location || "Jakarta, Indonesia"}
          </div>
          <p className="text-[11px] mt-1 leading-snug">
          {config.about_desc1_en || config.about_desc1_id} {config.about_desc2_en || config.about_desc2_id}
          </p>
        </div>
      </div>

      {/* Work Experience */}
      <div className="mb-4">
        <h2 className="text-base sm:text-lg font-bold mb-1 border-b-[1.5px] border-black pb-0.5 uppercase tracking-wider">
          Work Experience
        </h2>
        <div className="flex flex-col gap-2 mt-2">
          {experiences.map((exp) => (
            <div key={exp.id}>
              <div className="flex justify-between items-baseline mb-0.5">
                <h3 className="font-bold text-[11px] sm:text-xs">
                  {getEn(exp.company)}
                </h3>
                <span className="text-[11px]">{getEn(exp.period)}</span>
              </div>
              <div className="italic text-[11px] mb-0.5">{getEn(exp.role)}</div>
              <p className="text-[11px] mb-1">{getEn(exp.description)}</p>
              <ul className="list-disc list-outside ml-4 text-[11px] flex flex-col gap-0.5">
                {getHighlights(exp.highlights).map((item: string, idx: number) => (
                  <li key={idx} className="pl-1 leading-snug">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="mb-4">
        <h2 className="text-base sm:text-lg font-bold mb-1 border-b-[1.5px] border-black pb-0.5 uppercase tracking-wider">
          Education
        </h2>
        <div className="flex flex-col gap-2 mt-2">
          {education.map((edu) => (
            <div key={edu.id}>
              <div className="flex justify-between items-baseline mb-0.5">
                <h3 className="font-bold text-[11px] sm:text-xs">{getEn(edu.school)}</h3>
                <span className="text-[11px]">{getEn(edu.period)}</span>
              </div>
              <div className="italic text-[11px]">
                {getEn(edu.degree)} {getEn(edu.major) ? `- ${getEn(edu.major)}` : ""} {getEn(edu.gpa) ? `, ${getEn(edu.gpa)}` : ""}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Organizational Experience */}
      <div className="mb-4">
        <h2 className="text-base sm:text-lg font-bold mb-1 border-b-[1.5px] border-black pb-0.5 uppercase tracking-wider">
          Organizational Experience
        </h2>
        <div className="flex flex-col gap-2 mt-2">
          {organizations.map((org) => (
            <div key={org.id}>
              <div className="flex justify-between items-baseline mb-0.5">
                <h3 className="font-bold text-[11px] sm:text-xs">{getEn(org.title)}</h3>
                <span className="text-[11px]">{getEn(org.period)}</span>
              </div>
              <div className="italic text-[11px] mb-0.5">{getEn(org.role)}</div>
              {getEn(org.desc) && <p className="text-[11px] mb-1">{getEn(org.desc)}</p>}
              <ul className="list-disc list-outside ml-4 text-[11px] flex flex-col gap-0.5">
                {getHighlights(org.highlights).map((item: string, idx: number) => (
                  <li key={idx} className="pl-1 leading-snug">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Publications */}
      <div className="mb-4">
        <h2 className="text-base sm:text-lg font-bold mb-1 border-b-[1.5px] border-black pb-0.5 uppercase tracking-wider">
          Publications & Skills
        </h2>
        <div className="mt-2 text-[11px]">
          <ul className="list-disc list-outside ml-4 flex flex-col gap-1">
            {publications.map((pub) => (
              <li key={pub.id} className="pl-1 leading-snug">
                <strong>{getEn(pub.title)}</strong> - {getEn(pub.journal)} ({getEn(pub.year)})
              </li>
            ))}
            {skills.map((skillGroup) => (
              <li key={skillGroup.id} className="pl-1 leading-snug">
                <strong>{getEn(skillGroup.category)}</strong>: {getHighlights(skillGroup.items).join(", ")}.
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
