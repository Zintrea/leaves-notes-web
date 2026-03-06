/**
 * Home Page — ซอด้วง Tabs
 * Design: Ink & Paper (กระดาษโน้ตเพลงเก่า)
 *
 * โครงสร้างหน้า:
 * 1. Navbar (sticky)
 * 2. Hero Section
 * 3. Songs Section (ค้นหา + กรอง + การ์ดเพลง)
 * 4. Order Section (สั่งทำโน้ต)
 * 5. Footer (ติดต่อ)
 */

import { useState, useMemo } from "react";
import { SONGS, filterSongs, DifficultyLevel, SongGenre } from "@/data/songs";
import { PACKAGES, CONTACT_INFO } from "@/data/packages";
import Navbar from "@/components/Navbar";
import SongCard from "@/components/SongCard";
import FilterBar from "@/components/FilterBar";
import PackageCard from "@/components/PackageCard";
import Footer from "@/components/Footer";
import { ChevronDown, Music2, MessageCircle } from "lucide-react";
import Cover from "@/assets/Cover2.png";

// CDN URLs ของรูปที่ generate ไว้
const HERO_IMAGE = Cover;
const PAPER_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663409426185/N2cp2yxXafPAPb2r82tKBP/paper-texture-bg-bhDE3hGQsHoRYQjsUPV2vW.webp";

const SONGS_PER_PAGE = 8;

export default function Home() {
  // State สำหรับ filter
  const [search, setSearch] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | "all">("all");
  const [selectedGenre, setSelectedGenre] = useState<SongGenre | "all">("all");
  const [visibleCount, setVisibleCount] = useState(SONGS_PER_PAGE);
  const [activeSection, setActiveSection] = useState("songs");

  // กรองเพลง
  const filteredSongs = useMemo(
    () =>
      filterSongs(SONGS, {
        search,
        difficulty: selectedDifficulty,
        genre: selectedGenre,
      }),
    [search, selectedDifficulty, selectedGenre]
  );

  // เพลงที่แสดงในหน้าปัจจุบัน
  const visibleSongs = filteredSongs.slice(0, visibleCount);
  const hasMore = visibleCount < filteredSongs.length;

  // Reset visible count เมื่อ filter เปลี่ยน
  const handleSearchChange = (v: string) => {
    setSearch(v);
    setVisibleCount(SONGS_PER_PAGE);
  };
  const handleDifficultyChange = (v: DifficultyLevel | "all") => {
    setSelectedDifficulty(v);
    setVisibleCount(SONGS_PER_PAGE);
  };
  const handleGenreChange = (v: SongGenre | "all") => {
    setSelectedGenre(v);
    setVisibleCount(SONGS_PER_PAGE);
  };

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
      {/* Navbar */}
      <Navbar activeSection={activeSection} onNavigate={setActiveSection} />

      {/* ============================
          Hero Section
      ============================ */}
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Text side */}
            <div className="order-2 md:order-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px flex-1 bg-[#D4C5A0]" />
                <span className="text-[10px] font-semibold text-[#9A8070] uppercase tracking-[0.2em]">
                  โน้ตเพลงสำหรับเครื่องดนตรีไทย
                </span>
                <div className="h-px flex-1 bg-[#D4C5A0]" />
              </div>

              <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#2C1810] leading-tight mb-4">
               โน้ตเพลงจากใบบุญเอง
              </h1>
              <p className="text-xl md:text-2xl font-medium text-[#8B3A2A] mb-4">
                เป็นเด็กวิศวะคอมที่เล่นซอด้วงได้นิดหน่อย
              </p>

              <p className="text-sm text-[#6B5040] leading-relaxed mb-6 max-w-md">
                จัดทำโน้ตเพลงซอด้วงสำหรับทุกระดับ ตั้งแต่มือใหม่จนถึงระดับคนที่เล่นเป็น
                ครอบคลุมทั้งเพลงไทยเดิม เพลงไทย และเพลงสากล
                โน้ตฟรีสามารถดาวน์โหลดได้ทันที และขอค่าจ่ายโดเมนเว็บบ้าง บางเพลงแกะยาก
              </p>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    setActiveSection("songs");
                    document.getElementById("songs")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#2C1810] text-[#F7F2E7] text-sm font-semibold rounded-sm hover:bg-[#8B3A2A] transition-colors"
                >
                  <Music2 size={15} />
                  ดูโน้ตเพลง
                </button>
                <a
                  href={CONTACT_INFO.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 bg-transparent border border-[#8B3A2A] text-[#8B3A2A] text-sm font-semibold rounded-sm hover:bg-[#8B3A2A] hover:text-white transition-colors"
                >
                  <MessageCircle size={15} />
                  สั่งทำโน้ต
                </a>
              </div>

              {/* Stats */}
              <div className="flex gap-6 mt-8 pt-6 border-t border-[#D4C5A0]">
                <div>
                  <p className="text-2xl font-bold font-serif text-[#2C1810]">{SONGS.length}+</p>
                  <p className="text-xs text-[#9A8070]">โน้ตเพลง</p>
                </div>
                <div className="w-px bg-[#D4C5A0]" />
                <div>
                  <p className="text-2xl font-bold font-serif text-[#2C1810]">
                    {SONGS.filter((s) => s.isFree).length}
                  </p>
                  <p className="text-xs text-[#9A8070]">โน้ตฟรี</p>
                </div>
                <div className="w-px bg-[#D4C5A0]" />
                <div>
                  <p className="text-2xl font-bold font-serif text-[#2C1810]">3</p>
                  <p className="text-xs text-[#9A8070]">ระดับความยาก</p>
                </div>
              </div>
            </div>

            {/* Image side */}
            <div className="order-1 md:order-2 relative">
              <div className="relative rounded-sm overflow-hidden border border-[#D4C5A0] shadow-lg">
                <img
                  src={HERO_IMAGE}
                  alt="ซอด้วงและโน้ตเพลง"
                  className="w-full h-64 md:h-75 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810]/30 to-transparent" />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-3 -left-3 w-16 h-16 border-2 border-[#D4C5A0] rounded-sm opacity-40" />
              <div className="absolute -top-3 -right-3 w-10 h-10 border-2 border-[#8B3A2A] rounded-sm opacity-30" />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center pb-4">
          <ChevronDown size={20} className="text-[#B0A090] animate-bounce" />
        </div>
      </section>

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

      {/* ============================
          Songs Section
      ============================ */}
      <section id="songs" className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="mb-8">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#2C1810] mb-1">
              รวมโน้ตเพลง
            </h2>
            <p className="text-sm text-[#9A8070]">
              โน้ตฟรีสามารถดาวน์โหลดได้ทันที ส่วนโน้ตที่มีค่าใช้จ่ายติดต่อได้ที่ Inbox
            </p>
          </div>

          <div className="grid lg:grid-cols-[280px_1fr] gap-6">
            {/* Sidebar filter */}
            <div className="lg:sticky lg:top-20 lg:self-start">
              <FilterBar
                search={search}
                onSearchChange={handleSearchChange}
                selectedDifficulty={selectedDifficulty}
                onDifficultyChange={handleDifficultyChange}
                selectedGenre={selectedGenre}
                onGenreChange={handleGenreChange}
                totalCount={SONGS.length}
                filteredCount={filteredSongs.length}
              />
            </div>

            {/* Song grid */}
            <div>
              {visibleSongs.length > 0 ? (
                <>
                  <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {visibleSongs.map((song) => (
                      <SongCard key={song.id} song={song} />
                    ))}
                  </div>

                  {/* See more button */}
                  {hasMore && (
                    <div className="flex justify-center mt-8">
                      <button
                        onClick={() => setVisibleCount((c) => c + SONGS_PER_PAGE)}
                        className="flex items-center gap-2 px-6 py-2.5 border border-[#D4C5A0] bg-[#FEFAF2] text-[#6B5040] text-sm font-medium rounded-sm hover:border-[#8B3A2A] hover:text-[#8B3A2A] transition-colors"
                      >
                        <ChevronDown size={15} />
                        ดูเพิ่มเติม ({filteredSongs.length - visibleCount} เพลง)
                      </button>
                    </div>
                  )}
                </>
              ) : (
                /* Empty state */
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 rounded-sm bg-[#F5EDD6] border border-[#D4C5A0] flex items-center justify-center mb-4">
                    <Music2 size={28} className="text-[#B0A090]" />
                  </div>
                  <p className="text-[#6B5040] font-medium mb-1">ไม่พบเพลงที่ค้นหา</p>
                  <p className="text-xs text-[#9A8070]">ลองเปลี่ยนคำค้นหาหรือตัวกรอง</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ============================
          Order Section (สั่งทำโน้ต)
      ============================ */}
      <section id="order" className="py-12 bg-[#F5EDD6]/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="text-center mb-10">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#2C1810] mb-2">
              สั่งทำโน้ต
            </h2>
            <p className="text-sm text-[#6B5040] max-w-md mx-auto leading-relaxed">
              ติดต่อสั่งทำโน้ตได้ที่ Inbox ของ Facebook
              จัดส่งเป็นไฟล์ PDF ใช้เวลาประมาณ{" "}
              <span className="font-semibold">{CONTACT_INFO.deliveryTime}</span>
            </p>
          </div>

          {/* Package cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PACKAGES.map((pkg, i) => (
              <PackageCard
                key={pkg.id}
                pkg={pkg}
                isHighlighted={i === 2} // แพ็กเกจที่ 3 เป็น highlight
              />
            ))}
          </div>

          {/* Note */}
          <p className="text-center text-xs text-[#9A8070] mt-6">
            * ราคาอาจเปลี่ยนแปลงได้ตามความซับซ้อนของเพลง กรุณาสอบถามก่อนสั่ง
          </p>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
