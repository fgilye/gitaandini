import { getCertificates, getHazardReports } from "./actions";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Education from "@/components/Education";
import Timeline from "@/components/Timeline";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Organizations from "@/components/Organizations";
import Publications from "@/components/Publications";
import HazardSimulator from "@/components/HazardSimulator";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export const revalidate = 0; // Live database updates

export default async function Home() {
  const rawReports = await getHazardReports();

  // Convert Date objects to plain values for client components
  const serializedReports = rawReports.map((report) => ({
    ...report,
    createdAt: new Date(report.createdAt),
  }));

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 text-white font-sans selection:bg-red-500 selection:text-white">
      <Navbar />

      <main className="flex-grow pt-10">
        <Hero />
        <About />
        <Education />
        <Timeline />
        <Skills />
        <Projects />
        <Organizations />
        <Publications />
        <HazardSimulator initialReports={serializedReports} />
        <ContactForm />
      </main>

      <Footer />
    </div>
  );
}
