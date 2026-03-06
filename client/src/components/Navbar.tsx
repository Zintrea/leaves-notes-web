/**
 * Navbar Component
 * Design: Ink & Paper — navbar แบบ sticky พร้อม paper texture
 */

import { useState } from "react";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const navLinks = [
  { id: "songs", label: "โน้ตเพลง" },
  { id: "order", label: "สั่งทำโน้ต" },
  { id: "contact", label: "ติดต่อ" },
];

export default function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (id: string) => {
    onNavigate(id);
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#FEFAF2]/95 backdrop-blur-sm border-b border-[#D4C5A0] shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <button
            onClick={() => handleNav("top")}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 rounded-sm bg-[#2C1810] flex items-center justify-center">
              <span className="text-[#F7F2E7] text-xs font-bold font-serif">ซด</span>
            </div>
            <div className="leading-tight">
              <span className="font-serif font-bold text-[#2C1810] text-sm group-hover:text-[#8B3A2A] transition-colors">
                ซอด้วง Tabs
              </span>
              <p className="text-[9px] text-[#9A8070] tracking-wider uppercase">โน้ตเพลงซอด้วง</p>
            </div>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  activeSection === link.id
                    ? "text-[#8B3A2A]"
                    : "text-[#6B5040] hover:text-[#8B3A2A]"
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#8B3A2A] rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-[#6B5040] hover:text-[#8B3A2A]"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#D4C5A0] bg-[#FEFAF2]">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNav(link.id)}
              className={`w-full text-left px-6 py-3 text-sm font-medium border-b border-[#E8DCC8] transition-colors ${
                activeSection === link.id
                  ? "text-[#8B3A2A] bg-[#F5EDD6]"
                  : "text-[#6B5040] hover:bg-[#F5EDD6]"
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
