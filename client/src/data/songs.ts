/**
 * =====================================================
 * ไฟล์ข้อมูลโน้ตเพลงซอด้วง
 * =====================================================
 * วิธีเพิ่มเพลงใหม่:
 * 1. เพิ่ม object ใหม่ใน SONGS array ด้านล่าง
 * 2. กรอกข้อมูลให้ครบทุก field ตาม SongEntry interface
 * 3. บันทึกไฟล์ เว็บจะอัปเดตอัตโนมัติ
 *
 * วิธีเพิ่ม tag ใหม่:
 * - เพิ่มค่าใน DifficultyLevel หรือ SongGenre
 * - อัปเดต DIFFICULTY_LABELS หรือ GENRE_LABELS ด้วย
 * =====================================================
 */

// CDN Base URL for assets
const CDN_BASE = "https://cdn.jsdelivr.net/gh/Zintrea/leaves-notes-assets";

// ระดับความยาก
export type DifficultyLevel = "beginner" | "intermediate" | "master";

// ประเภทเพลง
export type SongGenre = "thai-traditional" | "thai-modern" | "international";

// โครงสร้างข้อมูลเพลง
export interface SongEntry {
  id: string;               // รหัสเพลง (ไม่ซ้ำกัน)
  title: string;            // ชื่อเพลง
  artist: string;           // ศิลปิน / ผู้แต่ง
  difficulty: DifficultyLevel;  // ระดับความยาก
  genre: SongGenre;         // ประเภทเพลง
  tags: string[];           // tag เพิ่มเติม (เช่น "ฟรี", "PDF", "คอร์ด")
  isFree: boolean;          // ฟรีหรือไม่
  pdfUrl?: string;          // ลิงค์ PDF โน้ตเพลง (ถ้ามี)
  inboxUrl?: string;        // ลิงค์ติดต่อ (เช่น Facebook Inbox)
  description?: string;     // คำอธิบายเพิ่มเติม
  imageUrl?: string;        // รูปปกเพลง (ถ้ามี)
  createdAt: string;        // วันที่เพิ่ม (YYYY-MM-DD)
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

// =====================================================
// ข้อมูลเพลง — เพิ่มเพลงใหม่ที่นี่
// =====================================================
export const SONGS: SongEntry[] = [
  // --- เพลงไทยเดิม ---
  {
    id: "lao-duang-duen",
    title: "ลาวดวงเดือน",
    artist: "เพลงพื้นบ้านไทย",
    difficulty: "beginner",
    genre: "thai-traditional",
    tags: ["ฟรี", "โน้ต"],
    isFree: true,
    pdfUrl: `${CDN_BASE}/pdfs/lao-duang-duen.pdf`,
    inboxUrl: "https://www.facebook.com/",
    description: "เพลงไทยเดิมที่คุ้นหูและเหมาะสำหรับผู้เริ่มต้น ทำนองไพเราะ จังหวะไม่เร็ว",
    createdAt: "2024-01-01",
  },
  {
    id: "khamen-sai-yok",
    title: "เขมรไทรโยค",
    artist: "เพลงพื้นบ้านไทย",
    difficulty: "intermediate",
    genre: "thai-traditional",
    tags: ["โน้ต", "คอร์ด"],
    isFree: false,
    pdfUrl: "",
    inboxUrl: "https://www.facebook.com/",
    description: "เพลงไทยเดิมที่มีเทคนิคการสี ต้องการความชำนาญระดับกลาง",
    createdAt: "2024-01-05",
  },
  {
    id: "phleng-ching",
    title: "เพลงฉิ่ง",
    artist: "เพลงพื้นบ้านไทย",
    difficulty: "master",
    genre: "thai-traditional",
    tags: ["โน้ต", "คอร์ด", "คลิป"],
    isFree: false,
    pdfUrl: "",
    inboxUrl: "https://www.facebook.com/",
    description: "เพลงไทยเดิมระดับสูง ต้องการเทคนิคการสีที่ซับซ้อนและประสบการณ์สูง",
    createdAt: "2024-01-10",
  },
  {
    id: "sao-chana",
    title: "เสาวคนธ์",
    artist: "เพลงพื้นบ้านไทย",
    difficulty: "beginner",
    genre: "thai-traditional",
    tags: ["ฟรี", "โน้ต"],
    isFree: true,
    pdfUrl: "",
    inboxUrl: "https://www.facebook.com/",
    description: "เพลงไทยเดิมทำนองอ่อนหวาน เหมาะสำหรับผู้เริ่มต้นฝึกซอด้วง",
    createdAt: "2024-01-15",
  },
  {
    id: "sam-chan",
    title: "สามชั้น",
    artist: "เพลงพื้นบ้านไทย",
    difficulty: "master",
    genre: "thai-traditional",
    tags: ["โน้ต", "คอร์ด"],
    isFree: false,
    pdfUrl: "",
    inboxUrl: "https://www.facebook.com/",
    description: "เพลงไทยเดิมที่มีความซับซ้อนสูง เหมาะสำหรับนักดนตรีระดับปรมาจารย์",
    createdAt: "2024-01-20",
  },

  // --- เพลงไทย ---
  {
    id: "mai-mee-ter-mai-dai",
    title: "ไม่มีเธอไม่ได้",
    artist: "ศิลปินไทย",
    difficulty: "beginner",
    genre: "thai-modern",
    tags: ["ฟรี", "โน้ต"],
    isFree: true,
    pdfUrl: "",
    inboxUrl: "https://www.facebook.com/",
    description: "เพลงไทยสมัยใหม่ทำนองไพเราะ เหมาะสำหรับผู้เริ่มต้นที่อยากเล่นเพลงไทย",
    createdAt: "2024-02-01",
  },
  {
    id: "ruang-rao-kong-rao",
    title: "เรื่องของเรา",
    artist: "ศิลปินไทย",
    difficulty: "intermediate",
    genre: "thai-modern",
    tags: ["โน้ต", "คอร์ด"],
    isFree: false,
    pdfUrl: "",
    inboxUrl: "https://www.facebook.com/",
    description: "เพลงไทยสมัยใหม่ระดับกลาง มีทำนองที่สวยงามและเทคนิคที่น่าสนใจ",
    createdAt: "2024-02-10",
  },
  {
    id: "fah-kwan-duen",
    title: "ฟ้าควันเดือน",
    artist: "ศิลปินไทย",
    difficulty: "intermediate",
    genre: "thai-modern",
    tags: ["โน้ต"],
    isFree: false,
    pdfUrl: "",
    inboxUrl: "https://www.facebook.com/",
    description: "เพลงไทยสมัยใหม่ที่มีทำนองสวยงาม เหมาะสำหรับนักดนตรีระดับกลาง",
    createdAt: "2024-02-15",
  },

  // --- เพลงสากล ---
  {
    id: "river-flows-in-you",
    title: "River Flows in You",
    artist: "Yiruma",
    difficulty: "intermediate",
    genre: "international",
    tags: ["โน้ต", "คอร์ด"],
    isFree: false,
    pdfUrl: "",
    inboxUrl: "https://www.facebook.com/",
    description: "เพลงสากลที่มีทำนองสวยงาม เรียบเรียงสำหรับซอด้วง",
    createdAt: "2024-03-01",
  },
  {
    id: "canon-in-d",
    title: "Canon in D",
    artist: "Johann Pachelbel",
    difficulty: "master",
    genre: "international",
    tags: ["โน้ต", "คอร์ด", "คลิป"],
    isFree: false,
    pdfUrl: "",
    inboxUrl: "https://www.facebook.com/",
    description: "เพลงคลาสสิกระดับโลก เรียบเรียงสำหรับซอด้วง ต้องการทักษะระดับสูง",
    createdAt: "2024-03-10",
  },
  {
    id: "a-thousand-years",
    title: "A Thousand Years",
    artist: "Christina Perri",
    difficulty: "beginner",
    genre: "international",
    tags: ["ฟรี", "โน้ต"],
    isFree: true,
    pdfUrl: "",
    inboxUrl: "https://www.facebook.com/",
    description: "เพลงสากลยอดนิยม เรียบเรียงสำหรับซอด้วงในระดับเริ่มต้น",
    createdAt: "2024-03-15",
  },
];

// =====================================================
// ฟังก์ชันช่วยค้นหาและกรอง
// =====================================================

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
