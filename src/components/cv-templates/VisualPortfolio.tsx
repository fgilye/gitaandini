import React from 'react';

function getEn(str: string) {
  if (!str) return "";
  const parts = str.split(" | ");
  return (parts[1] || parts[0]).trim();
}

export default function VisualPortfolio({ 
  config,
  projects,
  experiences,
  skills,
  educations
}: { 
  config: any,
  projects?: any[],
  experiences?: any[],
  skills?: any[],
  educations?: any[]
}) {
  const pageClass = "w-[297mm] h-[210mm] flex-shrink-0 relative overflow-hidden break-after-page shadow-2xl print:shadow-none print:m-0 font-sans";

  return (
    <>
      {/* PAGE 1: COVER */}
      <div className={pageClass} style={{ backgroundColor: '#0B1D17' }}>
        {/* Top Maroon */}
        <div className="absolute top-0 left-0 w-full h-[60%] bg-[#6B0F0F]"></div>
        
        {/* Subtle grid/texture overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')] pointer-events-none"></div>

        {/* HSE ENTHUSIAST Tag */}
        <div className="absolute top-10 left-10 transform -rotate-[4deg] bg-[#0B1D17] px-6 py-2 text-[#EAD29A] font-black text-2xl tracking-widest uppercase border-l-4 border-b-4 border-[#0B1D17] shadow-xl z-10">
          {config.hero_tag_en || "HSE ENTHUSIAST"}
        </div>
        
        {/* Decorative lines */}
        <div className="absolute top-10 right-16 flex gap-2 text-[#EAD29A] opacity-40 transform -rotate-45 z-10">
          {[1,2,3,4,5,6,7,8].map(i => <div key={i} className="w-1.5 h-10 bg-current"></div>)}
        </div>

        {/* Huge PORTFOLIO text */}
        <div className="absolute top-[22%] w-full flex justify-center z-0">
          <h1 className="text-[200px] font-black tracking-tighter text-[#EAD29A] leading-none transform scale-y-[1.3] shadow-black" style={{ textShadow: '4px 6px 0px rgba(0,0,0,0.1)' }}>
            PORTFOLIO
          </h1>
        </div>

        {/* Polaroid Image */}
        <div className="absolute left-1/2 top-[55%] transform -translate-x-1/2 -translate-y-1/2 rotate-[3deg] z-20">
          <div className="bg-[#FAF6EE] p-5 pb-16 shadow-2xl w-[320px] aspect-[4/4.5] relative transform border border-[#E8E2D5]">
            <div className="relative w-full h-full bg-gray-300 overflow-hidden border border-gray-400">
               <img src="/gita_about_new.png" alt="Profile" className="w-full h-full object-cover" />
            </div>
            {/* Paper clip simulation */}
            <div className="absolute -top-6 right-6 w-6 h-16 border-[3px] border-gray-400 rounded-full shadow-sm z-30 bg-transparent rotate-12"></div>
          </div>
        </div>

        {/* Bottom Left Info */}
        <div className="absolute bottom-10 left-10 flex items-center gap-4 z-10">
          <div className="w-14 h-14 bg-[#1a382b] rounded-full flex items-center justify-center text-[#2D5A27] relative">
             <div className="absolute inset-2 bg-[#2D5A27] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-2xl">+</span>
             </div>
             {/* Gear teeth simplified */}
             {[0,45,90,135].map(deg => (
               <div key={deg} className={`absolute w-full h-3 bg-[#1a382b] rotate-[${deg}deg]`}></div>
             ))}
          </div>
          <div>
            <div className="font-black text-3xl tracking-wider text-[#EAD29A]">{config.hero_tag_id ? "GITA ANDINI" : "GITA ANDINI"}</div>
            <div className="text-sm text-gray-300 font-medium tracking-widest">{config.hero_subtitle_id || "Keselamatan dan Kesehatan Kerja"}</div>
          </div>
        </div>
      </div>

      {/* PAGE 2: TABLE OF CONTENT */}
      <div className={pageClass} style={{ backgroundColor: '#F8F3E6' }}>
         {/* Top Header */}
         <div className="absolute top-0 left-0 w-full h-[25%] bg-[#6B0F0F] flex items-center shadow-md z-10 overflow-hidden">
            <div className="absolute left-0 top-0 h-full w-48 opacity-10 flex flex-col justify-center gap-4 pl-4 transform -skew-x-12">
               <div className="h-6 w-32 bg-[#EAD29A]"></div>
               <div className="h-6 w-24 bg-[#EAD29A]"></div>
            </div>
            <h1 className="w-full text-center text-[100px] font-black tracking-tighter text-[#EAD29A] leading-none transform scale-y-125 z-10 relative mt-4" style={{ textShadow: '4px 4px 0px rgba(0,0,0,0.2)' }}>
               TABLE OF CONTENT
            </h1>
         </div>

         {/* Grid Background */}
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] opacity-20 pointer-events-none"></div>

         <div className="w-full h-full pt-[30%] px-16 flex flex-col gap-8 justify-center relative z-10">
            {/* Buttons Row 1 */}
            <div className="flex justify-between bg-[#0B1D17] px-8 py-5 transform -rotate-1 shadow-lg text-[#EAD29A] font-black uppercase text-xl tracking-widest border border-black">
               <div className="flex items-center gap-3"><span className="text-[#EAD29A]">↘</span> ABOUT ME</div>
               <div className="flex items-center gap-3"><span className="text-[#EAD29A]">↘</span> EDUCATION</div>
               <div className="flex items-center gap-3"><span className="text-[#EAD29A]">↘</span> PERSONAL SKILL</div>
               <div className="flex items-center gap-3"><span className="text-[#EAD29A]">↘</span> WORK EXPERIENCE</div>
            </div>
            
            {/* Buttons Row 2 */}
            <div className="flex justify-between bg-[#0B1D17] px-8 py-5 transform rotate-1 shadow-lg text-[#EAD29A] font-black uppercase text-xl tracking-widest border border-black">
               <div className="flex items-center gap-3"><span className="text-[#EAD29A]">↘</span> ORGANIZATIONS</div>
               <div className="flex items-center gap-3"><span className="text-[#EAD29A]">↘</span> PROJECT PORTFOLIO</div>
               <div className="flex items-center gap-3"><span className="text-[#EAD29A]">↘</span> PUBLICATIONS</div>
            </div>
         </div>
      </div>

      {/* PAGE 3: ABOUT ME */}
      <div className={pageClass} style={{ backgroundColor: '#6B0F0F' }}>
         <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')] pointer-events-none"></div>
         
         <div className="flex w-full h-full">
            {/* Left side */}
            <div className="w-[55%] h-full p-16 flex flex-col justify-center z-10">
               <div className="flex gap-2 text-[#EAD29A] opacity-30 mb-8 transform skew-x-12">
                  <div className="w-4 h-4 bg-current"></div><div className="w-4 h-4 bg-current"></div><div className="w-4 h-4 bg-current"></div><div className="w-4 h-4 bg-current"></div>
               </div>
               
               <div className="relative mb-4">
                  <div className="absolute -top-16 left-32 bg-[#0B1D17] border-2 border-white rounded-lg px-4 py-2 text-white font-bold text-lg flex items-center gap-2">
                     Halo, Saya 
                     <div className="absolute -bottom-3 right-4 w-4 h-4 bg-white transform rotate-45"></div>
                     <svg className="absolute -right-8 -bottom-8 w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M4 2v20l5.5-5.5H19z" />
                     </svg>
                  </div>
                  <h1 className="text-[100px] leading-[0.8] font-black tracking-tighter text-[#EAD29A] uppercase mb-6" style={{ textShadow: '3px 3px 0px rgba(0,0,0,0.1)' }}>
                     GITA<br/>ANDINI
                  </h1>
               </div>

               <h2 className="text-3xl font-black text-[#F4F4F4] tracking-widest uppercase mb-4 mt-6">ABOUT ME</h2>
               <div className="w-16 h-1 bg-white mb-6"></div>
               <p className="text-[#F4F4F4] text-[15px] leading-relaxed mb-4 font-medium opacity-90 pr-10">
                  {config.about_desc1_id}
               </p>
               <p className="text-[#F4F4F4] text-[15px] leading-relaxed font-medium opacity-90 pr-10">
                  {config.about_desc2_id}
               </p>
            </div>

            {/* Right side - Cream Torn edge */}
            <div className="w-[45%] h-full bg-[#F8F3E6] relative border-l-4 border-dashed border-[#d3c8ab] shadow-2xl flex items-center justify-center overflow-visible">
               {/* Edge rip effect */}
               <div className="absolute top-0 bottom-0 -left-6 w-12 z-0" style={{ backgroundImage: 'radial-gradient(#F8F3E6 50%, transparent 50%)', backgroundSize: '20px 20px', backgroundPosition: '-10px 0' }}></div>
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] opacity-20 pointer-events-none"></div>

               <div className="bg-white p-5 pb-16 shadow-2xl w-[320px] aspect-[4/4.5] relative transform -rotate-2 border border-gray-200 z-20">
                  <div className="relative w-full h-full bg-gray-200 overflow-hidden">
                     <img src="/gita_about_new.png" alt="Gita Andini" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -top-4 -right-4 w-6 h-16 border-[3px] border-gray-600 rounded-full z-30 bg-transparent rotate-6"></div>
               </div>
            </div>
         </div>
      </div>

      {/* PAGE 4: EDUCATION */}
      <div className={pageClass} style={{ backgroundColor: '#6B0F0F' }}>
         <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')] pointer-events-none"></div>
         
         <div className="flex w-full h-full">
            <div className="w-[55%] h-full p-16 pt-20 flex flex-col z-10 relative">
               <h1 className="text-[85px] leading-none font-black tracking-tighter text-[#EAD29A] uppercase mb-16 transform scale-y-125" style={{ textShadow: '4px 4px 0px rgba(0,0,0,0.1)' }}>
                  EDUCATION
               </h1>

               <div className="flex gap-12 text-[#F4F4F4]">
                  {educations?.slice(0, 2).map((edu, idx) => (
                     <div key={idx} className="flex-1 space-y-3">
                        <div className="w-10 h-10 rounded-full bg-[#0B1D17] flex items-center justify-center text-white mb-6 shadow-md border border-[#0B1D17]/50">
                           <div className="w-3 h-3 bg-white rounded-full"></div>
                        </div>
                        <div className="font-bold text-lg tracking-widest uppercase">{getEn(edu.period)}</div>
                        <div className="font-black text-2xl uppercase leading-tight mb-2">{edu.school}</div>
                        <div className="text-gray-300 font-medium text-sm mt-4 leading-relaxed whitespace-pre-wrap">
                           {getEn(edu.description)}
                           {edu.gpa && <div>GPA: {edu.gpa}</div>}
                        </div>
                     </div>
                  ))}
               </div>
            </div>
            
            <div className="w-[45%] h-full relative overflow-hidden bg-black shadow-2xl">
               <img src="/gita_about_new.png" className="w-full h-full object-cover opacity-90" alt="Education" style={{ filter: 'contrast(1.1) grayscale(0.2)' }} />
            </div>
         </div>
      </div>

      {/* PAGE 5: PERSONAL SKILL */}
      <div className={pageClass}>
         {/* Top Half */}
         <div className="w-full h-[45%] bg-[#6B0F0F] relative flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')] pointer-events-none"></div>
            
            <div className="absolute left-10 flex gap-2 text-[#EAD29A] opacity-40">
               <div className="w-[1px] h-32 bg-current"></div>
               <div className="w-2 h-32 border border-current rounded-full"></div>
            </div>
            <div className="absolute right-10 flex gap-2 text-[#EAD29A] opacity-40">
               <div className="w-2 h-32 border border-current rounded-full"></div>
               <div className="w-[1px] h-32 bg-current"></div>
            </div>

            <h1 className="text-[110px] leading-none font-black tracking-tighter text-[#EAD29A] uppercase transform scale-y-125 z-10" style={{ textShadow: '4px 4px 0px rgba(0,0,0,0.2)' }}>
               PERSONAL SKILL
            </h1>
            
            {/* Bottom separator bar */}
            <div className="absolute bottom-0 w-full h-2 bg-[#EAD29A]"></div>
         </div>

         {/* Bottom Half */}
         <div className="w-full h-[55%] bg-[#0B1D17] p-12 flex justify-center items-center">
            <div className="w-full max-w-[1000px] flex gap-0 border border-white">
               {skills?.slice(0, 3).map((skill, idx) => {
                  const isMiddle = idx === 1;
                  return (
                     <div key={idx} className={`flex-1 p-8 py-10 ${isMiddle ? 'border-x border-white' : ''}`}>
                        <h2 className="text-xl font-black text-[#EAD29A] tracking-widest uppercase mb-6 text-center leading-tight">
                           {getEn(skill.category)}
                        </h2>
                        <ul className="text-gray-300 font-medium text-sm space-y-3 pl-4 list-disc marker:text-[#EAD29A]">
                           {getEn(skill.items).split(",").map((i, ix) => (
                              <li key={ix}>{i.trim()}</li>
                           ))}
                        </ul>
                     </div>
                  );
               })}
            </div>
         </div>
      </div>

      {/* PAGE 6+: PROJECTS */}
      {projects?.map((proj, idx) => {
        let imageUrl = "";
        let highlights: string[] = [];
        try {
          const gallery = JSON.parse(proj.gallery);
          if (gallery && gallery.length > 0) imageUrl = gallery[0].img;
        } catch(e) {}
        try {
          const hl = JSON.parse(proj.highlights);
          if (hl && Array.isArray(hl)) highlights = hl.map((h: string) => getEn(h));
        } catch(e) {}

        const isMaroon = idx % 2 === 0;
        const bgColor = isMaroon ? '#6B0F0F' : '#0B1D17';

        return (
          <div key={idx} className={pageClass} style={{ backgroundColor: bgColor }}>
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')] pointer-events-none"></div>
            
            <div className="w-full h-full flex flex-row-reverse">
               <div className="w-[50%] h-full p-16 pt-20 flex flex-col justify-center z-10 relative">
                  <div className="inline-block bg-[#EAD29A] text-black px-4 py-1.5 font-bold text-xs tracking-widest uppercase mb-6 self-start rounded-full shadow-lg">
                     {getEn(proj.category)}
                  </div>
                  <h1 className="text-[50px] leading-none font-black tracking-tighter text-white uppercase mb-6">
                     {getEn(proj.title)}
                  </h1>
                  
                  <div className="flex items-center gap-4 text-[#EAD29A] font-bold text-sm tracking-widest uppercase mb-6">
                     <span>{getEn(proj.role)}</span>
                     <span>•</span>
                     <span>{getEn(proj.period)}</span>
                  </div>

                  <p className="text-gray-200 text-[15px] leading-relaxed border-l-2 border-[#EAD29A] pl-4 mb-8 font-medium">
                     {getEn(proj.description)}
                  </p>

                  <ul className="text-gray-300 font-medium text-sm space-y-2 pl-4 list-disc marker:text-[#EAD29A]">
                     {highlights.map((hl, i) => <li key={i}>{hl}</li>)}
                  </ul>
               </div>

               <div className="w-[50%] h-full relative overflow-hidden bg-black shadow-2xl p-8 flex items-center justify-center">
                  {imageUrl ? (
                     <div className="w-full aspect-video relative rounded-lg border-4 border-[#EAD29A] shadow-2xl transform -rotate-2 overflow-hidden bg-gray-200">
                        <img src={imageUrl} alt="Project" className="w-full h-full object-cover" />
                     </div>
                  ) : (
                     <div className="w-full aspect-video relative rounded-lg border-4 border-[#EAD29A] shadow-2xl transform -rotate-2 overflow-hidden bg-black/40 flex items-center justify-center text-white/20 font-bold tracking-widest">
                        NO IMAGE
                     </div>
                  )}
               </div>
            </div>
          </div>
        );
      })}

    </>
  );
}
