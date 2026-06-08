import { 
  getConfig, 
  getProjectItems,
  getExperienceItems,
  getSkillItems,
  getEducationItems
} from "@/app/admin-actions";
import VisualPortfolio from "@/components/cv-templates/VisualPortfolio";
import PrintButton from "@/components/cv-templates/PrintButton";

// Ensure page is rendered dynamically to fetch latest DB data
export const revalidate = 0;

export default async function GeneratePortfolioPage() {
  const [projects, configRaw, experiences, skills, educations] = await Promise.all([
    getProjectItems(),
    getConfig(),
    getExperienceItems(),
    getSkillItems(),
    getEducationItems()
  ]);
  const config = Object.fromEntries(configRaw.map(c => [c.key, c.value]));

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          @page { size: A4 landscape; margin: 0; }
        }
      `}} />
      <div className="bg-gray-200 min-h-screen text-black pb-20 print:bg-white print:pb-0 selection:bg-[#6B0F0F] selection:text-white font-sans flex flex-col items-center pt-8 print:pt-0">
      <PrintButton />
      
      {/* Portfolio Pages Wrapper */}
      <div className="flex flex-col gap-8 print:gap-0 w-full items-center print:m-0 print:p-0">
        <VisualPortfolio
           config={config}
           projects={projects}
           experiences={experiences}
           skills={skills}
           educations={educations}
        />
      </div>
      </div>
    </>
  );
}
