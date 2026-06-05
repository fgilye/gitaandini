import { getCertificates } from "./actions";
import { getExperienceItems } from "./admin-actions";
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

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 text-white font-sans selection:bg-red-500 selection:text-white">
      <Navbar />

      <main className="flex-grow pt-6">
        <Hero />
        <About />
        <Education />
        <Timeline items={experiences} />
        <Skills />
        <Projects />
        <Organizations />
        <Publications />
        <ContactForm />
      </main>

      <Footer />
    </div>
  );
}
