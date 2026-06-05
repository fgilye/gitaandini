import { isAuthenticated } from "@/lib/auth";
import { redirect } from "next/navigation";
import FloatingElements from "@/components/FloatingElements";
import LoginContent from "./LoginContent";

export const metadata = {
  title: "Admin Login – Gita Andini Portfolio",
  description: "Halaman masuk panel admin CMS.",
};

export default async function LoginPage() {
  // Redirect if already logged in
  if (await isAuthenticated()) redirect("/admin");

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Grids (Like Landing Page) */}
      <div className="absolute inset-0 bg-[radial-gradient(#6B0F0F03_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      {/* Floating Elements (Like Landing Page) */}
      <FloatingElements count={8} color="#6B0F0F" />

      {/* Floating decorative circles */}
      <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-[#6B0F0F]/5 blur-2xl pointer-events-none" style={{ animation: "pulse 3s ease-in-out infinite" }} />
      <div className="absolute bottom-20 right-10 w-56 h-56 rounded-full bg-[#6B0F0F]/5 blur-3xl pointer-events-none" style={{ animation: "pulse 4.5s ease-in-out 1.5s infinite" }} />

      <LoginContent />
    </div>
  );
}
