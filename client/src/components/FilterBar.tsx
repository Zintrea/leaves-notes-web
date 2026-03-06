/**
 * FilterBar Component
 * Design: Ink & Paper — ปุ่มกรองแบบ tab ที่มี underline animation
 * รองรับการกรองตามระดับความยากและประเภทเพลง
 */

import { DifficultyLevel, SongGenre, DIFFICULTY_LABELS, GENRE_LABELS } from "@/data/songs";
import { Search, X } from "lucide-react";

interface FilterBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  selectedDifficulty: DifficultyLevel | "all";
  onDifficultyChange: (value: DifficultyLevel | "all") => void;
  selectedGenre: SongGenre | "all";
  onGenreChange: (value: SongGenre | "all") => void;
  totalCount: number;
  filteredCount: number;
}

const difficultyOptions: Array<{ value: DifficultyLevel | "all"; label: string }> = [
  { value: "all", label: "ทุกระดับ" },
  { value: "beginner", label: DIFFICULTY_LABELS.beginner },
  { value: "intermediate", label: DIFFICULTY_LABELS.intermediate },
  { value: "master", label: DIFFICULTY_LABELS.master },
];

const genreOptions: Array<{ value: SongGenre | "all"; label: string }> = [
  { value: "all", label: "ทุกประเภท" },
  { value: "thai-traditional", label: GENRE_LABELS["thai-traditional"] },
  { value: "thai-modern", label: GENRE_LABELS["thai-modern"] },
  { value: "international", label: GENRE_LABELS.international },
];

export default function FilterBar({
  search,
  onSearchChange,
  selectedDifficulty,
  onDifficultyChange,
  selectedGenre,
  onGenreChange,
  totalCount,
  filteredCount,
}: FilterBarProps) {
  const hasActiveFilter =
    search !== "" || selectedDifficulty !== "all" || selectedGenre !== "all";

  const clearAll = () => {
    onSearchChange("");
    onDifficultyChange("all");
    onGenreChange("all");
  };

  return (
    <div className="bg-[#FEFAF2] border border-[#D4C5A0] rounded-sm p-4 shadow-sm space-y-4">
      {/* Search bar */}
      <div className="relative">
        <Search
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9A8070] pointer-events-none"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="ค้นหาเพลงหรือศิลปิน..."
          className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-[#D4C5A0] rounded-sm text-[#2C1810] placeholder-[#B0A090] focus:outline-none focus:ring-1 focus:ring-[#8B3A2A] focus:border-[#8B3A2A] transition-colors"
        />
        {search && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9A8070] hover:text-[#2C1810]"
          >
            <X size={13} />
          </button>
        )}
      </div>

      {/* Filter groups */}
      <div className="space-y-3">
        {/* Difficulty filter */}
        <div>
          <p className="text-[10px] font-semibold text-[#9A8070] uppercase tracking-widest mb-1.5">
            ระดับความยาก
          </p>
          <div className="flex flex-wrap gap-1.5">
            {difficultyOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => onDifficultyChange(opt.value)}
                className={`px-3 py-1 text-xs rounded-sm border font-medium transition-all duration-200 ${
                  selectedDifficulty === opt.value
                    ? "bg-[#8B3A2A] text-white border-[#8B3A2A] shadow-sm"
                    : "bg-white text-[#6B5040] border-[#D4C5A0] hover:border-[#8B3A2A] hover:text-[#8B3A2A]"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Genre filter */}
        <div>
          <p className="text-[10px] font-semibold text-[#9A8070] uppercase tracking-widest mb-1.5">
            ประเภทเพลง
          </p>
          <div className="flex flex-wrap gap-1.5">
            {genreOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => onGenreChange(opt.value)}
                className={`px-3 py-1 text-xs rounded-sm border font-medium transition-all duration-200 ${
                  selectedGenre === opt.value
                    ? "bg-[#2C5F8A] text-white border-[#2C5F8A] shadow-sm"
                    : "bg-white text-[#6B5040] border-[#D4C5A0] hover:border-[#2C5F8A] hover:text-[#2C5F8A]"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Result count + clear */}
      <div className="flex items-center justify-between pt-1 border-t border-[#E8DCC8]">
        <p className="text-xs text-[#9A8070]">
          แสดง{" "}
          <span className="font-semibold text-[#2C1810]">{filteredCount}</span>
          {" "}จาก{" "}
          <span className="font-semibold text-[#2C1810]">{totalCount}</span>
          {" "}เพลง
        </p>
        {hasActiveFilter && (
          <button
            onClick={clearAll}
            className="text-xs text-[#8B3A2A] hover:underline flex items-center gap-1"
          >
            <X size={11} />
            ล้างตัวกรอง
          </button>
        )}
      </div>
    </div>
  );
}
