/**
 * SongSection Component
 * แสดงรายการเพลงพร้อมตัวกรอง — รองรับ loading, error, empty state
 */

import { useState, useMemo } from "react";
import SongCard from "@/components/SongCard";
import FilterBar from "@/components/FilterBar";
import { filterSongs } from "@/services/songs";
import type { SongEntry, DifficultyLevel, SongGenre } from "@/lib/song-constants";
import { ChevronDown, Music2 } from "lucide-react";

interface SongSectionProps {
  songs: SongEntry[];
  isLoading: boolean;
  error: string | null;
}

const SONGS_PER_PAGE = 8;

function LoadingSkeleton() {
  return (
    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-[#FEFAF2] border border-[#D4C5A0] rounded-sm p-4 animate-pulse">
          <div className="h-4 bg-[#E8DCC8] rounded w-3/4 mb-3" />
          <div className="h-3 bg-[#E8DCC8] rounded w-1/2 mb-4" />
          <div className="flex gap-1.5 mb-3">
            <div className="h-5 bg-[#E8DCC8] rounded w-16" />
            <div className="h-5 bg-[#E8DCC8] rounded w-20" />
          </div>
          <div className="h-3 bg-[#E8DCC8] rounded w-full mb-1" />
          <div className="h-3 bg-[#E8DCC8] rounded w-2/3" />
        </div>
      ))}
    </div>
  );
}

export default function SongSection({ songs, isLoading, error }: SongSectionProps) {
  const [search, setSearch] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | "all">("all");
  const [selectedGenre, setSelectedGenre] = useState<SongGenre | "all">("all");
  const [visibleCount, setVisibleCount] = useState(SONGS_PER_PAGE);

  const filteredSongs = useMemo(
    () => filterSongs(songs, { search, difficulty: selectedDifficulty, genre: selectedGenre }),
    [songs, search, selectedDifficulty, selectedGenre]
  );

  const visibleSongs = filteredSongs.slice(0, visibleCount);
  const hasMore = visibleCount < filteredSongs.length;

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

        {/* Error state */}
        {error && (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="w-16 h-16 rounded-sm bg-red-50 border border-red-200 flex items-center justify-center mb-4">
              <Music2 size={28} className="text-red-400" />
            </div>
            <p className="text-[#6B5040] font-medium mb-1">เกิดข้อผิดพลาดในการโหลดข้อมูล</p>
            <p className="text-xs text-[#9A8070]">กรุณาลองใหม่ภายหลัง</p>
          </div>
        )}

        {/* Songs content */}
        {!error && (
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
                totalCount={songs.length}
                filteredCount={filteredSongs.length}
              />
            </div>

            {/* Song grid or loading */}
            <div>
              {isLoading ? (
                <LoadingSkeleton />
              ) : visibleSongs.length > 0 ? (
                <>
                  <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {visibleSongs.map((song) => (
                      <SongCard key={song.id} song={song} />
                    ))}
                  </div>

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
        )}
      </div>
    </section>
  );
}
