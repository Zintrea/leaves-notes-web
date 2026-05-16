/**
 * =====================================================
 * ไฟล์รวม Types, Labels, Colors, และฟังก์ชันกรองเพลง
 * ย้ายมาจากเดิมใน data/songs.ts แต่แยกเป็น constants
 * =====================================================
 */

// ระดับความยาก
export type DifficultyLevel = "beginner" | "intermediate" | "master";

// ประเภทเพลง
export type SongGenre = "thai-traditional" | "thai-modern" | "international";

// โครงสร้างข้อมูลเพลง
export interface SongEntry {
  id: string;
  title: string;
  artist: string;
  difficulty: DifficultyLevel;
  genre: SongGenre;
  tags: string[];
  isFree: boolean;
  pdfUrl?: string;
  inboxUrl?: string;
  description?: string;
  imageUrl?: string;
  createdAt: string;
}

// Label สำหรับแสดงผล
export const DIFFICULTY_LABELS: Record<DifficultyLevel, string> = {
  beginner: "มือใหม่ก็เล่นได้",
  intermediate: "มือซอ",
  master: "ระดับปรมาจารย์",
};

export const GENRE_LABELS: Record<SongGenre, string> = {
  "thai-traditional": "เพลงไทยเดิม",
  "thai-modern": "เพลงไทย",
  international: "เพลงสากล",
};

export const DIFFICULTY_COLORS: Record<DifficultyLevel, string> = {
  beginner: "bg-emerald-100 text-emerald-800 border-emerald-200",
  intermediate: "bg-amber-100 text-amber-800 border-amber-200",
  master: "bg-red-100 text-red-800 border-red-200",
};

export const GENRE_COLORS: Record<SongGenre, string> = {
  "thai-traditional": "bg-purple-100 text-purple-800 border-purple-200",
  "thai-modern": "bg-blue-100 text-blue-800 border-blue-200",
  international: "bg-gray-100 text-gray-700 border-gray-200",
};

// ฟังก์ชันช่วยค้นหาและกรอง
export function filterSongs(
  songs: SongEntry[],
  {
    search = "",
    difficulty,
    genre,
  }: {
    search?: string;
    difficulty?: DifficultyLevel | "all";
    genre?: SongGenre | "all";
  }
): SongEntry[] {
  return songs.filter((song) => {
    const matchSearch =
      search === "" ||
      song.title.toLowerCase().includes(search.toLowerCase()) ||
      song.artist.toLowerCase().includes(search.toLowerCase());

    const matchDifficulty =
      !difficulty || difficulty === "all" || song.difficulty === difficulty;

    const matchGenre =
      !genre || genre === "all" || song.genre === genre;

    return matchSearch && matchDifficulty && matchGenre;
  });
}
