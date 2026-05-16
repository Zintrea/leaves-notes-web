/**
 * Home Page — ซอด้วง Tabs
 * Orchestrator: จัดการ hooks + compose sections
 */

import { useState } from "react";
import { useSongs } from "@/hooks/useSongs";
import { usePackages } from "@/hooks/usePackages";
import { useContacts } from "@/hooks/useContacts";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import SongSection from "@/components/sections/SongSection";
import OrderSection from "@/components/sections/OrderSection";
import Footer from "@/components/Footer";

const PAPER_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663409426185/N2cp2yxXafPAPb2r82tKBP/paper-texture-bg-bhDE3hGQsHoRYQjsUPV2vW.webp";

export default function Home() {
  const { songs, isLoading, error } = useSongs();
  const { packages } = usePackages();
  const { contacts } = useContacts();
  const [activeSection, setActiveSection] = useState("songs");

  const freeCount = songs.filter((s) => s.isFree).length;

  return (
    <div
      id="top"
      className="min-h-screen"
      style={{
        backgroundImage: `url(${PAPER_BG})`,
        backgroundRepeat: "repeat",
        backgroundSize: "400px 400px",
      }}
    >
      <Navbar activeSection={activeSection} onNavigate={setActiveSection} />

      <HeroSection
        songsLength={songs.length}
        freeCount={freeCount}
        contacts={contacts}
        onNavigate={setActiveSection}
      />

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-[#D4C5A0]" />
          <div className="flex gap-1">
            <span className="w-1 h-1 rounded-full bg-[#8B3A2A]" />
            <span className="w-1 h-1 rounded-full bg-[#D4C5A0]" />
            <span className="w-1 h-1 rounded-full bg-[#D4C5A0]" />
          </div>
          <div className="flex-1 h-px bg-[#D4C5A0]" />
        </div>
      </div>

      <SongSection songs={songs} isLoading={isLoading} error={error} />
      <OrderSection packages={packages} contacts={contacts} />
      <Footer contacts={contacts} />
    </div>
  );
}
