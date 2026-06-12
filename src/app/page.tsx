import { getExperienceItems, getConfig, getPublicationItems, getEducationItems, getOrganizationItems } from "./admin-actions";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Education from "@/components/Education";
import Timeline from "@/components/Timeline";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Organizations from "@/components/Organizations";
import Publications from "@/components/Publications";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export const revalidate = 0; // Live database updates

export default async function Home() {
  const experiences = await getExperienceItems();
  const publications = await getPublicationItems();
  const educationItems = await getEducationItems();
  const organizations = await getOrganizationItems();
  const configRaw = await getConfig();
  const config = Object.fromEntries(configRaw.map(c => [c.key, c.value]));

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 text-white font-sans selection:bg-red-500 selection:text-white">
      <Navbar />

      <main className="flex-grow pt-6">
        <Hero config={config} />
        <About config={config} />
        <Education items={educationItems} />
        <Timeline items={experiences} />
        <Skills />
        <Projects />
        <Organizations items={organizations} />
        <Publications items={publications} />
        <ContactForm 
          contactEmail={config.contact_email || "gita.andini@email.com"}
          contactLinkedin={config.contact_linkedin || "https://linkedin.com"}
          contactInstagram={config.contact_instagram || "https://instagram.com"}
          contactEmailText={config.contact_email_text}
          contactLinkedinText={config.contact_linkedin_text}
          contactInstagramText={config.contact_instagram_text}
        />
      </main>

      <Footer 
        contactEmail={config.contact_email || "gita.andini@email.com"}
        contactLinkedin={config.contact_linkedin || "https://linkedin.com"}
        contactInstagram={config.contact_instagram || "https://instagram.com"}
      />
    </div>
  );
}
