import { 
  getExperienceItems, 
  getConfig, 
  getPublicationItems,
  getEducationItems,
  getSkillItems,
  getOrganizationItems,
  getProjectItems
} from "@/app/admin-actions";
import ATSResume from "@/components/cv-templates/ATSResume";
import PrintButton from "@/components/cv-templates/PrintButton";

// Ensure page is rendered dynamically to fetch latest DB data
export const revalidate = 0;

export default async function GenerateCVPage() {
  const experiences = await getExperienceItems();
  const publications = await getPublicationItems();
  const education = await getEducationItems();
  const skills = await getSkillItems();
  const organizations = await getOrganizationItems();
  const projects = await getProjectItems();
  const configRaw = await getConfig();
  const config = Object.fromEntries(configRaw.map(c => [c.key, c.value]));

  return (
    <div className="bg-gray-200 min-h-screen text-black pb-20 print:bg-white print:pb-0 selection:bg-[#6B0F0F] selection:text-white font-sans">
      <PrintButton />
      
      {/* ATS Resume Pages */}
      <div className="print:m-0 print:shadow-none print:w-full print:max-w-none mx-auto w-full max-w-[210mm] bg-white shadow-xl min-h-[297mm] p-[10mm] sm:p-[20mm] print:p-[10mm] mb-8 print:mb-0">
        <ATSResume 
          config={config} 
          experiences={experiences} 
          education={education}
          organizations={organizations}
          publications={publications}
          skills={skills}
        />
      </div>
    </div>
  );
}
