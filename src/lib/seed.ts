import { prisma } from "./db";

export async function seedDatabase() {
  try {
    // 1. Seed Config (Hero, About, and page metadata texts)
    const configCount = await prisma.config.count();
    if (configCount === 0) {
      const configs = [
        // Hero tag
        { key: "hero_tag_id", value: "ANTUSIAS K3" },
        { key: "hero_tag_en", value: "HSE ENTHUSIAST" },
        // Hero subtitle
        { key: "hero_subtitle_id", value: "Keselamatan dan Kesehatan Kerja" },
        { key: "hero_subtitle_en", value: "Occupational Health & Safety" },
        // Hero polaroid text
        { key: "hero_polaroid_id", value: "GITA ANDINI • SURVEI LAPANGAN" },
        { key: "hero_polaroid_en", value: "GITA ANDINI • SITE SURVEY" },
        
        // About Section Balloon
        { key: "about_balloon_id", value: "Halo, Saya" },
        { key: "about_balloon_en", value: "Hello, I am" },
        // About Section Descriptions
        {
          key: "about_desc1_id",
          value: "Saya adalah lulusan Kesehatan Masyarakat dengan fokus pada K3, memiliki pengalaman dalam inspeksi keselamatan, identifikasi bahaya, serta dokumentasi K3 di lingkungan industri kelistrikan dan manufaktur."
        },
        {
          key: "about_desc1_en",
          value: "I am a Public Health graduate specializing in Occupational Health and Safety (OHS), with experience in safety inspections, hazard identification, and OHS documentation in the electrical power and manufacturing industries."
        },
        {
          key: "about_desc2_id",
          value: "Memahami dasar implementasi SMK3, work permit, dan pengendalian risiko kerja, serta berkomitmen untuk mendukung terciptanya lingkungan kerja yang aman dan sesuai standar."
        },
        {
          key: "about_desc2_en",
          value: "Understanding the basics of OHS management system (SMK3) implementation, work permits, and work risk control, and committed to supporting the creation of a safe and compliant working environment."
        },
        // About section stats / bullets
        { key: "about_bullet1_id", value: "Kepatuhan ISO 45001 & SMK3" },
        { key: "about_bullet1_en", value: "ISO 45001 & SMK3 Compliance" },
        { key: "about_bullet2_id", value: "Pemantauan Kepatuhan APD" },
        { key: "about_bullet2_en", value: "PPE Compliance Monitoring" },
        // About Polaroid caption
        { key: "about_polaroid_id", value: "Jakarta • Kampus FIKES 2026" },
        { key: "about_polaroid_en", value: "Jakarta • FIKES Campus 2026" },
        // CV Download URL
        { key: "cv_download_url", value: "/CV and Portfolio Gita Andini.pdf" },
      ];

      for (const conf of configs) {
        await prisma.config.create({ data: conf });
      }
      console.log("Seeded Config keys.");
    }

    // 2. Seed EducationItem
    const eduCount = await prisma.educationItem.count();
    if (eduCount === 0) {
      const edus = [
        {
          school: "Universitas Pembangunan Nasional Veteran Jakarta",
          degree: "S1 Kesehatan Masyarakat (S.KL.) | Bachelor of Public Health (S.KL.)",
          major: "Peminatan Keselamatan dan Kesehatan Kerja (K3) | Specializing in Occupational Health and Safety (OHS)",
          period: "Agustus 2022 - Januari 2026 | August 2022 - January 2026",
          gpa: "IPK 3.88 / 4.00 (Cum Laude) | GPA 3.88 / 4.00 (Cum Laude)",
          description: "Mempelajari Higiene Industri, Epidemiologi Kerja, Sistem Manajemen Keselamatan dan Kesehatan Kerja (SMK3), Ergonomi, dan Analisis Dampak Lingkungan (AMDAL). Aktif dalam organisasi kemahasiswaan bidang K3. | Studying Industrial Hygiene, Occupational Epidemiology, OHS Management System (SMK3), Ergonomics, and Environmental Impact Assessment (AMDAL). Active in OHS student organizations.",
          highlights: JSON.stringify([
            "Lulus dengan predikat Pujian (Cum Laude) | Graduated with honors (Cum Laude)",
            "Spesialisasi riset: Keselamatan dan Kesehatan Kerja (K3) | Research specialization: Occupational Health and Safety (OHS)",
            "Tesis systematic review mengenai perbandingan status gizi bayi | Systematic review thesis on comparison of infant nutritional status"
          ])
        },
        {
          school: "SMAN 104 Jakarta",
          degree: "Sekolah Menengah Atas | High School",
          major: "Jurusan Matematika dan Ilmu Pengetahuan Alam (MIPA) | Mathematics and Natural Sciences (MIPA)",
          period: "Juli 2019 - Agustus 2022 | July 2019 - August 2022",
          gpa: "",
          description: "Aktif dalam kegiatan akademik MIPA dan ekstrakurikuler kepemimpinan serta organisasi sekolah. | Active in MIPA academic activities, leadership extracurriculars, and school organizations.",
          highlights: JSON.stringify([
            "Fokus peminatan Sains (Fisika, Kimia, Biologi, Matematika) | Focused on Science (Physics, Chemistry, Biology, Mathematics)",
            "Aktif dalam kegiatan organisasi internal sekolah | Active in school internal organizations"
          ])
        }
      ];

      for (const edu of edus) {
        await prisma.educationItem.create({ data: edu });
      }
      console.log("Seeded Education items.");
    }

    // 3. Seed ExperienceItem
    const expCount = await prisma.experienceItem.count();
    if (expCount === 0) {
      const exps = [
        {
          role: "ISO & SHE Administration Intern | ISO & SHE Administration Intern",
          company: "PT Anugerah Mortar Abadi - Bogor, Jawa Barat",
          period: "Apr 2026 - Sekarang | Apr 2026 - Present",
          description: "Perusahaan manufaktur semen instan (ready-mix mortar) untuk konstruksi. Membantu penyusunan dan pengawasan kepatuhan sistem manajemen K3 perusahaan. | An instant cement (ready-mix mortar) manufacturing company for construction. Assisting in compiling and supervising the company's OHS management system compliance.",
          highlights: JSON.stringify([
            "Membantu penyusunan & review dokumen SMK3 sesuai standar ISO 45001 | Assisting in compiling & reviewing SMK3 documents in accordance with ISO 45001 standards",
            "Mendukung administrasi & pengendalian izin kerja (work permit) berisiko tinggi | Supporting the administration & control of high-risk work permits",
            "Melakukan identifikasi bahaya & penilaian risiko dasar (HIRA/JSA) di area produksi | Conducting hazard identification & basic risk assessment (HIRA/JSA) in the production area",
            "Membantu document control & pengelolaan arsip SHE untuk kesiapan audit | Assisting in document control & managing SHE archives for audit readiness"
          ]),
          gallery: JSON.stringify([
            {
              img: "/extracted/page_9_img_2.jpeg",
              title: "DOKUMENTASI ISO & SMK3 | ISO & SMK3 DOCUMENTATION",
              desc: "Membantu penyusunan dan pengembangan dokumen SMK3 sesuai dengan standar ISO 45001. | Assisting in compiling and developing SMK3 documents in accordance with ISO 45001 standards."
            },
            {
              img: "/extracted/page_9_img_3.jpeg",
              title: "IDENTIFIKASI BAHAYA & KESIAPAN AUDIT | HAZARD IDENTIFICATION & AUDIT READINESS",
              desc: "Melakukan identifikasi bahaya (HIRA/JSA) pada area produksi mortar dan mendukung kesiapan audit SHE. | Conducting hazard identification (HIRA/JSA) in the mortar production area and supporting SHE audit readiness."
            }
          ])
        },
        {
          role: "HSSE Intern | HSSE Intern",
          company: "PT PLN (Persero) Unit Layanan Transmisi dan Gardu Induk (ULTG) Cawang - Jakarta",
          period: "Okt 2025 - Des 2025 | Oct 2025 - Dec 2025",
          description: "Mengawasi keselamatan operasional gardu induk transmisi listrik dan memastikan kepatuhan regulasi K3. | Supervising the operational safety of power transmission substations and ensuring compliance with OHS regulations.",
          highlights: JSON.stringify([
            "Melakukan inspeksi keselamatan rutin di area gardu induk untuk mengidentifikasi unsafe conditions | Performing routine safety inspections in the substation area to identify unsafe conditions",
            "Melakukan inspeksi kelayakan fungsi Alat Pemadam Api Ringan (APAR) | Inspecting the operational readiness of portable fire extinguishers (APAR)",
            "Memantau kepatuhan penggunaan APD di area operasional gardu induk | Monitoring PPE compliance in the substation operational area",
            "Mendokumentasikan temuan inspeksi serta memantau tindak lanjut tindakan korektif | Documenting inspection findings and monitoring corrective action follow-ups"
          ]),
          gallery: JSON.stringify([
            {
              img: "/extracted/page_8_img_2.jpeg",
              title: "MONITORING APD | PPE MONITORING",
              desc: "Melakukan pemantauan penggunaan Alat Pelindung Diri (APD) pada pekerja di area operasional gardu induk. Memastikan kepatuhan penggunaan APD sesuai standar keselamatan kerja guna meminimalkan potensi risiko. | Monitoring Personal Protective Equipment (PPE) compliance for workers in the transmission substation area."
            },
            {
              img: "/extracted/page_8_img_4.jpeg",
              title: "INSPEKSI APAR | PORTABLE FIRE EXTINGUISHER INSPECTION",
              desc: "Melakukan inspeksi Alat Pemadam Api Ringan (APAR) untuk memastikan kondisi, kelayakan fungsi, serta penempatan sesuai dengan standar keselamatan. Mengidentifikasi potensi ketidaksesuaian sebagai upaya pencegahan dalam kondisi darurat. | Inspecting portable fire extinguishers (APAR) to ensure standard readiness and proper location."
            },
            {
              img: "/extracted/page_8_img_3.jpeg",
              title: "SAFETY BRIEFING & OBSERVASI | SAFETY BRIEFING & OBSERVATION",
              desc: "Mengikuti kegiatan safety briefing serta melakukan observasi pada aktivitas pengujian di area berisiko tinggi. | Participating in safety briefings and observing test actions in high-risk zones."
            }
          ])
        }
      ];

      for (const exp of exps) {
        await prisma.experienceItem.create({ data: exp });
      }
      console.log("Seeded Experience items.");
    }

    // 4. Seed SkillItem
    const skillCount = await prisma.skillItem.count();
    if (skillCount === 0) {
      const skills = [
        {
          category: "KEAHLIAN K3 TEKNIS | TECHNICAL OHS SKILLS",
          items: JSON.stringify([
            "ISO 45001 & SMK3",
            "HIRA/JSA",
            "Inspeksi Keselamatan | Safety Inspection",
            "Penilaian Risiko Dasar | Basic Risk Assessment",
            "Pemantauan Kepatuhan APD | PPE Compliance Monitoring",
            "Dokumentasi Keselamatan | Safety Documentation"
          ])
        },
        {
          category: "PAPARAN INDUSTRI & LAPANGAN | INDUSTRIAL & FIELD EXPOSURE",
          items: JSON.stringify([
            "Keselamatan Gardu Induk (PT PLN) | Substation Safety (PT PLN)",
            "Kunjungan Industri ke Industri Petrokimia (Chandra Asri) | Company Visit to Petrochemical Industry (Chandra Asri)",
            "Inspeksi Area Kerja & Safety Walkthrough | Work Area Inspections & Safety Walkthroughs"
          ])
        },
        {
          category: "KOMUNIKASI & KEPEMIMPINAN | COMMUNICATION & LEADERSHIP",
          items: JSON.stringify([
            "Penyuluhan Kesehatan Kerja (JAHE 2024) | Occupational Health Education (JAHE 2024)",
            "Promosi Budaya K3 (Safety Campaign) | OHS Culture Promotion (Safety Campaign)",
            "Komunikasi Kolaboratif & Kepemimpinan | Collaborative Communication & Leadership"
          ])
        }
      ];

      for (const sk of skills) {
        await prisma.skillItem.create({ data: sk });
      }
      console.log("Seeded Skill items.");
    }

    // 5. Seed ProjectItem
    const projCount = await prisma.projectItem.count();
    if (projCount === 0) {
      const projs = [
        {
          title: "Pengembangan Digital Dashboard HSSE | HSSE Digital Dashboard Development",
          category: "Digitalisasi | Digitalization",
          period: "Oktober - Desember 2025 | October - December 2025",
          role: "Pengembang & Pencipta | Developer & Creator",
          description: "Mengembangkan sistem arsip digital K3 berbasis web untuk mengintegrasikan data HSSE yang sebelumnya tersebar di berbagai media menjadi satu platform terpusat. Sistem ini dirancang untuk meningkatkan efisiensi pengelolaan dokumen, mempermudah akses data, serta mendukung proses pelaporan dan audit K3. | Developed a web-based OHS digital archive system to integrate HSSE data previously scattered across various media into a single centralized platform. This system is designed to improve document management efficiency, simplify data access, and support OHS reporting and audit processes.",
          highlights: JSON.stringify([
            "Integrasi Data Terpusat | Centralized Data Integration",
            "Efisiensi Audit Readiness | Audit Readiness Efficiency",
            "Arsip Digital | Digital Archive"
          ]),
          gallery: JSON.stringify([
            {
              img: "/extracted/page_11_img_2.jpeg",
              title: "METRIK DASHBOARD | DASHBOARD METRICS",
              desc: "Sistem monitoring metrik insiden K3 secara digital. | Digital monitoring system for OHS incident metrics."
            },
            {
              img: "/extracted/page_11_img_3.jpeg",
              title: "PELAPORAN DIGITAL | DIGITAL REPORTING",
              desc: "Formulir pelaporan bahaya real-time terintegrasi. | Integrated real-time hazard reporting form."
            },
            {
              img: "/extracted/page_11_img_4.jpeg",
              title: "ARSIP DOKUMEN | DOCUMENT ARCHIVE",
              desc: "Pusat arsip digital perizinan kerja & file kepatuhan SHE. | Digital archive center for work permits & SHE compliance files."
            }
          ])
        },
        {
          title: "Edukasi Kebisingan Workshop Room 603 | Noise Education in Workshop Room 603",
          category: "Pengabdian Masyarakat | Community Service",
          period: "18 Mei 2025 | 18 May 2025",
          role: "Wakil Ketua Pelaksana | Vice Chairman",
          description: "Program pengabdian masyarakat yang berfokus pada edukasi risiko kebisingan pada pekerja las. Kegiatan ini bertujuan meningkatkan kesadaran dan pemahaman pekerja terhadap bahaya kebisingan serta penerapan prinsip K3 (seperti penggunaan Earplug/Earmuff) di lingkungan kerja las berisiko tinggi. | A community service program focused on educating welding workers about noise risks. This activity aims to raise workers' awareness and understanding of noise hazards and the implementation of OHS principles (such as using earplugs/earmuffs) in high-risk welding environments.",
          highlights: JSON.stringify([
            "Pelatihan Keselamatan | Safety Training",
            "Pencegahan PAK | Occupational Disease Prevention",
            "Higiene Industri | Industrial Hygiene"
          ]),
          gallery: JSON.stringify([
            {
              img: "/extracted/page_13_img_2.jpeg",
              title: "EDUKASI RISIKO KEBISiNGAN | NOISE RISK EDUCATION",
              desc: "Sosialisasi potensi penurunan pendengaran akibat kebisingan industri las. | Socialization of potential hearing loss due to welding industry noise."
            },
            {
              img: "/extracted/page_13_img_3.jpeg",
              title: "PEMBAGIAN APD KESELAMATAN | SAFETY PPE DISTRIBUTION",
              desc: "Pembagian alat pelindung telinga dan edukasi cara pemakaian yang benar. | Distribution of hearing protection and education on correct usage."
            }
          ])
        },
        {
          title: "Kunjungan Industri PT Chandra Asri Pacific Tbk | Company Visit PT Chandra Asri Pacific Tbk",
          category: "Paparan Industri | Industrial Exposure",
          period: "11 Juni 2025 | 11 June 2025",
          role: "Observer K3 | HSE Observer",
          description: "Mengamati secara langsung bagaimana sebuah perusahaan petrokimia berskala nasional menjalankan proses produksi sekaligus menegakkan budaya Keselamatan dan Kesehatan Kerja (K3) yang kokoh. Fokus pengamatan meliputi emergency response, Fire safety, dan proses safety management di area refinery. | Directly observing how a national-scale petrochemical company runs its production process while enforcing a solid Occupational Health and Safety (OHS) culture. The observation focus included emergency response, fire safety, and process safety management in the refinery area.",
          highlights: JSON.stringify(["Petrochemical Safety", "Hazard Identification", "Emergency Response"]),
          gallery: JSON.stringify([
            {
              img: "/extracted/page_14_img_2.jpeg",
              title: "MANAJEMEN KESELAMATAN PROSES | PROCESS SAFETY MANAGEMENT",
              desc: "Observasi panel kontrol keselamatan dan regulasi tanggap darurat kilang. | Observation of safety control panels and refinery emergency response regulations."
            },
            {
              img: "/extracted/page_14_img_3.jpeg",
              title: "KESELAMATAN KEBAKARAN & TUR KILANG | FIRE SAFETY & REFINERY TOUR",
              desc: "Kunjungan lapangan dan inspeksi sistem proteksi kebakaran terpadu. | Field visit and inspection of the integrated fire protection system."
            }
          ])
        },
        {
          title: "Kunjungan Industri Faber-Castell International Indonesia | Company Visit Faber-Castell International Indonesia",
          category: "Paparan Industri | Industrial Exposure",
          period: "1 Oktober 2024 | 1 October 2024",
          role: "Observer K3 | HSE Observer",
          description: "Melakukan observasi proses produksi di industri manufaktur serta mengidentifikasi potensi bahaya di lingkungan kerja. Memperoleh pemahaman mengenai penerapan keselamatan kerja, khususnya terkait risiko permesinan, penanganan bahan kimia pewarna, dan ergonomi lini perakitan. | Observing production processes in the manufacturing industry and identifying potential hazards in the work environment. Gaining an understanding of work safety implementation, specifically regarding machine risks, dye chemical handling, and assembly line ergonomics.",
          highlights: JSON.stringify(["Manufacturing Risk", "Machine Guarding", "Ergonomics Analysis"]),
          gallery: JSON.stringify([
            {
              img: "/extracted/page_15_img_2.jpeg",
              title: "INSPEKSI PELINDUNG MESIN | MACHINE GUARDING INSPECTION",
              desc: "Analisis pelindung mesin produksi untuk mencegah kecelakaan kerja. | Analysis of production machine guarding to prevent work accidents."
            },
            {
              img: "/extracted/page_15_img_3.jpeg",
              title: "KESELAMATAN BAHAYA KIMIA | CHEMICAL HAZARD SAFETY",
              desc: "Pengamatan penanganan bahan kimia pewarna dan APD yang sesuai. | Observation of dye chemical handling and appropriate PPE."
            }
          ])
        },
        {
          title: "Seminar Nasional K3 UPNVJ | UPNVJ National OHS Seminar",
          category: "Acara Profesional | Professional Events",
          period: "5 Juli 2025 | 5 July 2025",
          role: "Panitia - Divisi Acara & Liaison Officer | Committee - Event Division & Liaison Officer",
          description: "Berkontribusi dalam penyelenggaraan seminar nasional K3 dengan partisipasi ±700 peserta dari seluruh Indonesia bertema 'Gen Z vs Everybody di Dunia K3', yang melibatkan akademisi, praktisi keselamatan kerja, dan perwakilan kementerian. | Contributing to the organization of a national OHS seminar with ±700 participants from all over Indonesia themed 'Gen Z vs Everybody in the OHS World', involving academics, safety practitioners, and ministry representatives.",
          highlights: JSON.stringify(["700+ Peserta | 700+ Participants", "Liaison Officer", "Event Management"]),
          gallery: JSON.stringify([
            {
              img: "/extracted/page_16_img_2.jpeg",
              title: "MANAJEMEN PANGGUNG SEMINAR | SEMINAR STAGE MANAGEMENT",
              desc: "Koordinasi teknis acara dan kesiapan panggung utama seminar. | Technical coordination of the event and main stage readiness for the seminar."
            },
            {
              img: "/extracted/page_16_img_3.jpeg",
              title: "KOORDINASI LIAISON OFFICER | LIAISON OFFICER COORDINATION",
              desc: "Penyambutan dan pendampingan pembicara kementerian dan praktisi K3. | Welcoming and assisting ministry speakers and OHS practitioners."
            },
            {
              img: "/extracted/page_16_img_4.jpeg",
              title: "KETERLIBATAN PESERTA | PARTICIPANTS ENGAGEMENT",
              desc: "Mengelola registrasi dan kelancaran interaksi peserta nasional. | Managing registration and the smooth interaction of national participants."
            }
          ])
        },
        {
          title: "Sharing Session K3 OHSEF 2025: LOTO | OHSEF 2025 OHS Sharing Session: LOTO",
          category: "Acara Profesional | Professional Events",
          period: "17 Mei 2025 | 17 May 2025",
          role: "Koordinator Divisi Acara | Event Division Coordinator",
          description: "Memimpin perencanaan dan pelaksanaan kegiatan Sharing Session OHSEF 2025 dengan tema 'Lockout Tagout (LOTO): Protecting Workers from Hazardous Energy', sebagai upaya meningkatkan pemahaman keselamatan isolasi energi berbahaya di kalangan akademisi. | Leading the planning and execution of the OHSEF 2025 Sharing Session with the theme 'Lockout Tagout (LOTO): Protecting Workers from Hazardous Energy', as an effort to increase understanding of hazardous energy isolation safety among academics.",
          highlights: JSON.stringify(["Lockout/Tagout (LOTO)", "Safety Campaign", "Leadership"]),
          gallery: JSON.stringify([
            {
              img: "/extracted/page_17_img_2.jpeg",
              title: "KREATIF KAMPANYE LOTO | LOTO CAMPAIGN CREATIVE",
              desc: "Penyusunan materi edukasi visual lockout-tagout energi berbahaya. | Preparation of visual educational materials for lockout-tagout of hazardous energy."
            },
            {
              img: "/extracted/page_17_img_3.jpeg",
              title: "ARAHAN SHARING SESSION | SHARING SESSION DIRECTION",
              desc: "Pengarahan pembicara dan manajemen waktu presentasi materi LOTO. | Speakers briefing and presentation time management for LOTO materials."
            },
            {
              img: "/extracted/page_17_img_4.jpeg",
              title: "DISKUSI AUDIENS | AUDIENCE DISCUSSIONS",
              desc: "Fasilitasi sesi tanya jawab mengenai praktek isolasi energi di lapangan. | Facilitating Q&A sessions on energy isolation practices in the field."
            }
          ])
        }
      ];

      for (const proj of projs) {
        await prisma.projectItem.create({ data: proj });
      }
      console.log("Seeded Project items.");
    }

    // 6. Seed OrganizationItem
    const orgCount = await prisma.organizationItem.count();
    if (orgCount === 0) {
      const orgs = [
        {
          title: "Occupational Health, Safety, and Environment Forum (OHSEF) UPNVJ",
          role: "Staf Research & Development (RnD) | Staff Research & Development (RnD)",
          period: "Februari 2025 - Februari 2026 | February 2025 - February 2026",
          desc: "Mengembangkan materi edukasi K3 dan konten berbasis riset untuk meningkatkan kesadaran keselamatan kerja. Terlibat aktif dalam program perencanaan kampanye safety kampus. | Developing OHS educational materials and research-based content to increase safety awareness. Actively involved in campus safety campaign planning programs.",
          details: "Sebagai bagian dari divisi Research and Development, bertanggung jawab untuk melakukan kajian literatur ilmiah K3, mengolah data hasil riset kesehatan lingkungan, serta menerjemahkan regulasi SMK3 menjadi materi edukasi infografis yang mudah dipahami oleh civitas akademika. | As part of the Research and Development division, responsible for conducting OHS scientific literature reviews, processing environmental health research data, and translating SMK3 regulations into infographic educational materials easily understood by the academic community.",
          highlights: JSON.stringify([
            "Mengembangkan 10+ materi infografis edukasi keselamatan kerja kampus | Developing 10+ campus safety education infographic materials",
            "Mengadakan survey kesadaran keselamatan kerja di lingkungan UPNVJ | Conducting a safety awareness survey within the UPNVJ environment",
            "Kolaborasi aktif antar organisasi dalam seminar K3 nasional | Actively collaborating across organizations in national OHS seminars"
          ]),
          gallery: JSON.stringify([
            {
              img: "/extracted/page_10_img_2.jpeg",
              title: "RISET & EDUKASI OHSEF | OHSEF RESEARCH & EDUCATION",
              desc: "Pengembangan riset K3 dan desain materi edukasi visual keselamatan kerja. | Development of OHS research and visual education design for occupational safety."
            }
          ])
        },
        {
          title: "KSM Batavia (Badan Aksi Tanggap Bencana FIKES UPNVJ) | KSM Batavia (UPNVJ Faculty of Health Sciences Disaster Response Unit)",
          role: "Relawan Anggota | Volunteer Member",
          period: "Februari 2023 - Februari 2024 | February 2023 - February 2024",
          desc: "Mengikuti serangkaian pelatihan tanggap darurat, mitigasi bencana, serta pelatihan pertolongan pertama (first aid) dan CPR. | Participating in emergency response training, disaster mitigation, as well as first aid and CPR training.",
          details: "Berperan aktif dalam program pelatihan fisik dan teoritis mitigasi bencana alam, penanganan cedera olahraga, resusitasi jantung paru (RJP/CPR), serta simulasi evakuasi darurat di lingkungan kampus. | Playing an active role in physical and theoretical training programs for natural disaster mitigation, sports injury management, cardiopulmonary resuscitation (CPR), and emergency evacuation simulations in campus environments.",
          highlights: JSON.stringify([
            "Sertifikasi pelatihan pertolongan pertama (First Aid) | First Aid training certification",
            "Berpartisipasi dalam simulasi tanggap darurat tingkat fakultas | Participating in faculty-level emergency response simulations",
            "Edukasi mitigasi kebakaran skala rumah tangga untuk warga binaan | Household-scale fire mitigation education for coached residents"
          ]),
          gallery: JSON.stringify([
            {
              img: "/extracted/page_10_img_3.jpeg",
              title: "PELATIHAN P3K & RJP | FIRST AID & CPR TRAINING",
              desc: "Latihan simulasi resusitasi jantung paru (CPR) dan penanganan korban darurat. | CPR simulation and emergency casualty management training."
            },
            {
              img: "/extracted/page_10_img_4.jpeg",
              title: "KEAHLIAN MITIGASI BENCANA | DISASTER MITIGATION SKILLS",
              desc: "Mengikuti simulasi pemadaman api awal menggunakan APAR dan karung basah. | Participating in initial fire suppression simulations using fire extinguishers (APAR) and wet sacks."
            }
          ])
        },
        {
          title: "Ayo Sehat Fest Kemenkes RI | Ayo Sehat Fest Kemenkes RI",
          role: "Relawan Panitia | Volunteer Committee",
          period: "November 2023 | November 2023",
          desc: "Bertanggung jawab atas kelancaran operasional festival kesehatan nasional Kemenkes di Gelora Bung Karno. Berkoordinasi dengan tim keamanan, logistik, dan medis. | Responsible for the operational smoothness of the Kemenkes national health festival at Gelora Bung Karno. Coordinating with security, logistics, and medical teams.",
          details: "Mendukung penyelenggaraan acara festival kesehatan berskala nasional yang diinisiasi oleh Kementerian Kesehatan RI. Bertugas memastikan protokol keselamatan pengunjung terpenuhi dan mengelola arus alur fasilitas medis darurat. | Supporting the implementation of a national-scale health festival initiated by the Ministry of Health RI. Tasked with ensuring visitor safety protocols are met and managing the flow of emergency medical facilities.",
          highlights: JSON.stringify([
            "Membantu koordinasi posko P3K dan kesiapan ambulans di area GBK | Assisting in the coordination of the first aid post and ambulance readiness at the GBK area",
            "Mengarahkan alur evakuasi darurat untuk area berkapasitas 5000+ pengunjung | Directing the emergency evacuation route for an area with a capacity of 5,000+ visitors",
            "Menerima penghargaan apresiasi volunteer langsung dari panitia Kemenkes | Receiving volunteer appreciation awards directly from the Kemenkes committee"
          ]),
          gallery: JSON.stringify([
            {
              img: "/extracted/page_19_img_2.jpeg",
              title: "AYO SEHAT FEST KEMENKES | KEMENKES AYO SEHAT FEST",
              desc: "Kolaborasi kepanitiaan bersama Kemenkes RI untuk kelancaran posko kesehatan GBK. | Committee collaboration with Ministry of Health RI for first aid post operational smoothness at GBK."
            }
          ])
        },
        {
          title: "UKM UFO Veteran Jakarta (Fotografi, Videografi, & Desain) | UKM UFO Veteran Jakarta (Photography, Videography, & Design)",
          role: "Staf Kreatif | Creative Staff",
          period: "September 2022 - Agustus 2023 | September 2022 - August 2023",
          desc: "Mempelajari software SketchUp dan Adobe Photoshop untuk kebutuhan layout dan desain grafis. Memamerkan 2 karya desain di pameran nasional UFOFEST 2023 di Perpustakaan Nasional RI. | Studying SketchUp and Adobe Photoshop software for layout and graphic design needs. Exhibiting 2 design works at the UFOFEST 2023 national exhibition in National Library of Indonesia.",
          details: "Mengasih keahlian multimedia untuk mendukung kampanye visual dan dokumentasi K3. Mengembangkan tata letak grafis dan konsep pameran untuk meningkatkan keterlibatan publik dalam seni visual. | Honing multimedia skills to support visual campaigns and OHS documentation. Developing graphic layouts and exhibition concepts to increase public engagement in visual arts.",
          highlights: JSON.stringify([
            "Memamerkan 2 karya visual di Galeri Perpustakaan Nasional RI | Exhibiting 2 visual works at the National Library of Indonesia Gallery",
            "Menguasai Adobe Photoshop dan SketchUp untuk pemodelan layout 3D | Mastering Adobe Photoshop and SketchUp for 3D layout modeling",
            "Berkontribusi sebagai tim dokumentasi resmi di berbagai kegiatan kemahasiswaan | Contributing as official documentation team in various student activities"
          ]),
          gallery: JSON.stringify([])
        }
      ];

      for (const org of orgs) {
        await prisma.organizationItem.create({ data: org });
      }
      console.log("Seeded Organization items.");
    }

    // 7. Seed PublicationItem
    const pubCount = await prisma.publicationItem.count();
    if (pubCount === 0) {
      const pubs = [
        {
          title: "PERBANDINGAN STATUS GIZI BAYI YANG MENDAPATKAN ASI EKSKLUSIF DAN ASI PARSIAL: SYSTEMATIC REVIEW | COMPARISON OF NUTRITIONAL STATUS OF INFANTS RECEIVING EXCLUSIVE BREASTFEEDING AND PARTIAL BREASTFEEDING: A SYSTEMATIC REVIEW",
          journal: "Jurnal Ilmu Kesehatan Masyarakat (J-Kesmas) Universitas Al Asyariah Mandar | Journal of Public Health Sciences (J-Kesmas) Universitas Al Asyariah Mandar",
          year: "2024",
          type: "Systematic Review | Systematic Review",
          details: "Penelitian ini membandingkan status gizi bayi usia 0-6 bulan yang menerima ASI Eksklusif dengan bayi yang mendapat ASI parsial/tambahan. Menggunakan metodologi penelusuran artikel terindeks SINTA & Google Scholar. | This study compares the nutritional status of infants aged 0-6 months who receive Exclusive Breastfeeding with infants who receive partial/complementary breastfeeding. Using a search methodology of SINTA & Google Scholar indexed articles.",
          highlights: JSON.stringify([
            "Metode: Systematic Review dari 15+ studi klinis terakreditasi | Method: Systematic Review of 15+ accredited clinical studies",
            "Hasil: Bayi dengan ASI eksklusif menunjukkan persentase status gizi normal yang signifikan lebih tinggi | Result: Infants with exclusive breastfeeding show a significantly higher percentage of normal nutritional status",
            "Kontribusi: Memberikan landasan bukti ilmiah untuk promosi program laktasi di puskesmas | Contribution: Provides a scientific evidence base for the promotion of lactation programs in community health centers (Puskesmas)"
          ])
        },
        {
          title: "Penyuluhan Untuk Meningkatkan Pemahaman Mengenai Kesehatan Mental Terhadap Siswa Kelas 7B SMP Negeri 223 Jakarta | Counseling to Improve Mental Health Understanding for Grade 7B Students of SMP Negeri 223 Jakarta",
          journal: "Journal of Human and Education (JAHE)",
          year: "2024",
          type: "Community Education Article | Community Education Article",
          details: "Artikel pengabdian masyarakat ini mendokumentasikan intervensi edukasi interaktif mengenai deteksi dini stres akademis dan tindakan anti-bullying di kalangan siswa SMP. | This community service article documents interactive educational interventions regarding early detection of academic stress and anti-bullying actions among junior high school students.",
          highlights: JSON.stringify([
            "Intervensi: Sesi edukasi interaktif menggunakan kuis digital dan roleplay | Intervention: Interactive education sessions using digital quizzes and roleplay",
            "Hasil: Peningkatan pemahaman kesehatan mental siswa sebesar 35% berdasarkan hasil pre & post-test | Result: 35% improvement in students' mental health understanding based on pre & post-test results",
            "Implementasi: Pembentukan sudut konseling teman sebaya (peer counseling) di kelas | Implementation: Establishment of a peer counseling corner in the classroom"
          ])
        },
        {
          title: "Upaya Membangun Generasi Unggul dengan Menanamkan Unsur Kepemimpinan pada Remaja: Literature Review | Efforts to Build an Excellent Generation by Instilling Leadership Elements in Adolescents: Literature Review",
          journal: "Jurnal Pendidikan Tambusai | Tambusai Education Journal",
          year: "2024",
          type: "Literature Review | Literature Review",
          details: "Menganalisis berbagai model pelatihan kepemimpinan remaja berbasis kegiatan ekstrakurikuler sekolah dalam membentuk karakter disiplin, kepedulian sosial, dan tanggung jawab personal. | Analyzing various school extracurricular-based youth leadership training models in forming characters of discipline, social concern, and personal responsibility.",
          highlights: JSON.stringify([
            "Fokus: Teori pembentukan karakter remaja dan kepemimpinan transformasional | Focus: Youth character building theory and transformational leadership",
            "Metodologi: Sintesis pustaka dari 10 tahun terakhir publikasi pendidikan nasional | Methodology: Literature synthesis from the last 10 years of national education publications",
            "Kesimpulan: Pentingnya integrasi softskills kepemimpinan dalam kurikulum kokurikuler | Conclusion: The importance of integrating leadership soft skills in the co-curricular curriculum"
          ])
        }
      ];

      for (const pub of pubs) {
        await prisma.publicationItem.create({ data: pub });
      }
      console.log("Seeded Publication items.");
    }
  } catch (err) {
    console.error("Database seeding failed:", err);
  }
}
