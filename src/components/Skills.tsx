"use client";

import { motion } from "framer-motion";

export default function Skills() {
  const categories = [
    {
      title: "TECHNICAL OHS SKILLS",
      skills: [
        "ISO 45001 & SMK3",
        "HIRA/JSA",
        "Safety Inspection",
        "Basic Risk Assessment",
        "PPE Compliance Monitoring",
        "Safety Documentation",
      ],
    },
    {
      title: "INDUSTRIAL & FIELD EXPOSURE",
      skills: [
        "Substation Safety (PT PLN)",
        "Company Visit to Petrochemical Industry (Chandra Asri)",
        "Company Visit to Manufacturing Process (Faber Castell)",
      ],
    },
    {
      title: "COMMUNICATION & LEADERSHIP",
      skills: [
        "Safety Campaign Development",
        "Health Education",
        "Event Coordination",
      ],
    },
  ];

  return (
    <section id="skills" className="relative overflow-hidden border-b border-[#E8E2D5] font-sans">
      {/* Top Banner (Maroon) */}
      <div className="bg-[#6B0F0F] text-[#F0E3C0] py-16 text-center border-b border-[#F0E3C0]/15 relative">
        <div className="absolute top-4 left-6 text-2xl font-black text-[#F0E3C0]/5 select-none tracking-widest font-mono">
          🛟 SAFETY FIRST
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-6xl md:text-8xl font-display font-extrabold uppercase tracking-tight text-[#F0E3C0] italic"
        >
          Personal Skill
        </motion.h2>
      </div>

      {/* Bottom Content Area (Light Theme Alabaster) */}
      <div className="bg-[#FDFBF7] text-[#0B1D17] py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="border-2 border-[#E8E2D5] p-8 flex flex-col items-center text-center font-sans relative bg-white shadow-sm rounded-3xl"
            >
              {/* Box title */}
              <h3 className="text-sm font-black text-[#6B0F0F] uppercase tracking-wider mb-6 pb-2 border-b border-[#E8E2D5] w-full text-center font-mono">
                {cat.title}
              </h3>

              {/* Bullet list */}
              <ul className="space-y-4 text-xs font-sans text-[#66756F] text-left w-full">
                {cat.skills.map((skill, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#6B0F0F] shrink-0 mt-0.5">&bull;</span>
                    <span className="leading-relaxed">{skill}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
