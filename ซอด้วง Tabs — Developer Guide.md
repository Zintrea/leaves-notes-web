# ซอด้วง Tabs — Developer Guide

คู่มือการแก้ไขเว็บซอด้วง Tabs สำหรับนักพัฒนา ครอบคลุมทุกส่วนของการปรับแต่ง

---

## 📁 โครงสร้างโปรเจกต์

```
saodung-tabs/
├── client/
│   ├── public/                    # ไฟล์ static (favicon, robots.txt)
│   ├── src/
│   │   ├── components/            # React components
│   │   │   ├── Navbar.tsx         # Navigation bar
│   │   │   ├── SongCard.tsx       # Card สำหรับแสดงเพลง
│   │   │   ├── FilterBar.tsx      # ปุ่มกรองเพลง
│   │   │   ├── PackageCard.tsx    # Card สำหรับแพ็กเกจสั่งทำโน้ต
│   │   ├── data/                  # ข้อมูลแอปพลิเคชัน
│   │   │   ├── songs.ts           # ข้อมูลเพลง + ฟังก์ชันกรอง
│   │   │   ├── packages.ts        # ข้อมูลแพ็กเกจ + ลิงค์ social
│   │   ├── pages/
│   │   │   ├── Home.tsx           # หน้าหลัก (ทั้งเว็บ)
│   │   ├── App.tsx                # Root component
│   │   ├── index.css              # Global styles + theme
│   │   ├── main.tsx               # Entry point
│   ├── index.html                 # HTML template
│   ├── package.json               # Dependencies
├── server/                        # Backend (ไม่ใช้ในเวอร์ static)
```

---

## 🎨 1. แก้ไขรูปภาพ

### 1.1 Hero Image (รูปซอด้วงบน Hero Section)

**ตำแหน่ง:** `client/src/pages/Home.tsx` บรรทัดที่ 15

```tsx
const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/...";
```

**วิธีแก้ไข:**

**ตัวเลือก A: ใช้รูปจาก URL ภายนอก**
```tsx
const HERO_IMAGE = "https://your-image-url.com/image.jpg";
```

**ตัวเลือก B: อัปโหลดรูปไปยัง GitHub**
1. สร้าง folder `public/images` ในโปรเจกต์
2. อัปโหลดรูป `hero-saodung.jpg` ไปที่ folder นั้น
3. ใช้ลิงค์:
```tsx
const HERO_IMAGE = "https://raw.githubusercontent.com/Zintrea/leaves-notes/main/public/images/hero-saodung.jpg";
```

**ตัวเลือก C: ใช้ Unsplash / Pexels (ฟรี)**
```tsx
const HERO_IMAGE = "https://images.unsplash.com/photo-xxxxx?w=800";
```

---

### 1.2 Background Texture (พื้นหลังกระดาษ)

**ตำแหน่ง:** `client/src/pages/Home.tsx` บรรทัดที่ 16

```tsx
const PAPER_BG = "https://d2xsxph8kpxj0f.cloudfront.net/...";
```

**วิธีแก้ไข:** เหมือนกับ Hero Image (ตัวเลือก A, B, หรือ C)

---

### 1.3 เปลี่ยนรูปภาพใน SongCard

**ตำแหน่ง:** `client/src/components/SongCard.tsx`

ปัจจุบันไม่มีรูปภาพใน SongCard แต่ถ้าต้องการเพิ่ม:

```tsx
// เพิ่มใน interface Song (client/src/data/songs.ts)
interface Song {
  // ... existing fields
  imageUrl?: string;  // เพิ่มบรรทัดนี้
}

// ใน SongCard.tsx เพิ่ม:
{song.imageUrl && (
  <img src={song.imageUrl} alt={song.title} className="w-full h-32 object-cover rounded-sm" />
)}
```

---

## ✏️ 2. แก้ไขข้อความ

### 2.1 ข้อความ Hero Section

**ตำแหน่ง:** `client/src/pages/Home.tsx` บรรทัดที่ 100-120

```tsx
<h1 className="font-serif text-4xl md:text-5xl font-bold text-[#2C1810] leading-tight mb-4">
  ซอด้วง
  <br />
  <span className="text-[#8B3A2A]">Tabs</span>
</h1>

<p className="text-sm text-[#6B5040] leading-relaxed mb-6 max-w-md">
  รวมโน้ตเพลงซอด้วงสำหรับทุกระดับ ตั้งแต่มือใหม่จนถึงระดับปรมาจารย์
  ครอบคลุมทั้งเพลงไทยเดิม เพลงไทย และเพลงสากล
  โน้ตฟรีสามารถดาวน์โหลดได้ทันที
</p>
```

**วิธีแก้ไข:** แก้ไขข้อความภายในแท็ก `<h1>` และ `<p>` โดยตรง

---

### 2.2 ข้อความ Section Headers

**ตำแหน่ง:** `client/src/pages/Home.tsx` บรรทัดที่ 260-270

```tsx
{/* Section header */}
<div className="mb-8">
  <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#2C1810] mb-1">
    รวมโน้ตเพลง
  </h2>
  <p className="text-sm text-[#9A8070]">
    โน้ตฟรีสามารถดาวน์โหลดได้ทันที ส่วนโน้ตที่มีค่าใช้จ่ายติดต่อได้ที่ Inbox
  </p>
</div>
```

---

### 2.3 ข้อความ Footer

**ตำแหน่ง:** `client/src/components/Footer.tsx` บรรทัดที่ 30-35

```tsx
<p className="text-xs text-[#9A8070] max-w-xs leading-relaxed">
  รวมโน้ตเพลงซอด้วง สำหรับทุกระดับ ตั้งแต่มือใหม่จนถึงระดับปรมาจารย์
</p>
```

---

### 2.4 ข้อความ Empty State (ไม่พบเพลง)

**ตำแหน่ง:** `client/src/pages/Home.tsx` บรรทัดที่ 330-340

```tsx
<p className="text-[#6B5040] font-medium mb-1">ไม่พบเพลงที่ค้นหา</p>
<p className="text-xs text-[#9A8070]">ลองเปลี่ยนคำค้นหาหรือตัวกรอง</p>
```

---

## 🎯 3. แก้ไขไอคอน

### 3.1 ไอคอนที่ใช้ (Lucide React)

เว็บใช้ไอคอนจาก **Lucide React** ที่มีให้เลือกหลายร้อยตัว

**ตำแหน่ง:** ค้นหา `lucide-react` ในไฟล์ต่างๆ

**ตัวอย่าง:**
```tsx
import { Menu, X, Music2, MessageCircle, ChevronDown } from "lucide-react";

// ใช้งาน:
<Music2 size={15} />
<MessageCircle size={14} />
<ChevronDown size={20} />
```

### 3.2 เปลี่ยนไอคอน

ไปที่ [lucide.dev](https://lucide.dev) ค้นหาไอคอนที่ต้องการ แล้วแก้ไขชื่อ

**ตัวอย่าง:** เปลี่ยนจาก `Music2` เป็น `Music` หรือ `Music3`

```tsx
// เดิม
import { Music2 } from "lucide-react";
<Music2 size={15} />

// ใหม่
import { Music } from "lucide-react";
<Music size={15} />
```

---

### 3.3 ไอคอน Social Media ใน Footer

**ตำแหน่ง:** `client/src/components/Footer.tsx` บรรทัดที่ 15-30

```tsx
import { Facebook, Youtube, Instagram } from "lucide-react";

// TikTok icon (custom SVG)
function TikTokIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      {/* SVG path */}
    </svg>
  );
}
```

**เปลี่ยนไอคอน Social:**
```tsx
const socialLinks = [
  { url: CONTACT_INFO.facebook, icon: Facebook, label: "Facebook" },
  // เปลี่ยน Facebook เป็น Instagram, Youtube, etc.
];
```

---

## 🎵 4. แก้ไขเพลง

### 4.1 ดูรูปแบบข้อมูลเพลง

**ตำแหน่ง:** `client/src/data/songs.ts`

```ts
interface Song {
  id: string;                    // ID ไม่ซ้ำ (ใช้ kebab-case)
  title: string;                 // ชื่อเพลง
  artist: string;                // ศิลปิน/ชื่อศิลปิน
  difficulty: DifficultyLevel;   // "beginner" | "intermediate" | "master"
  genre: SongGenre;              // "thai-traditional" | "thai-modern" | "international"
  tags: string[];                // ["ฟรี", "โน้ต", etc]
  isFree: boolean;               // true = ฟรี, false = มีค่าใช้จ่าย
  pdfUrl: string;                // ลิงค์ PDF
  inboxUrl: string;              // ลิงค์ Facebook Inbox
  description: string;           // คำอธิบายเพลง
  createdAt: string;             // วันที่เพิ่ม (YYYY-MM-DD)
}
```

### 4.2 เพิ่มเพลงใหม่

**ตำแหน่ง:** `client/src/data/songs.ts` บรรทัดที่ 30-60

```ts
export const SONGS: Song[] = [
  {
    id: "laaw-duang-duen",
    title: "ลาวดวงเดือน",
    artist: "เพลงพื้นบ้านไทย",
    difficulty: "beginner",
    genre: "thai-traditional",
    tags: ["ฟรี", "โน้ต"],
    isFree: true,
    pdfUrl: "https://raw.githubusercontent.com/Zintrea/leaves-notes/main/public/pdfs/laaw-duang-duen.pdf",
    inboxUrl: "https://www.facebook.com/YOUR_PAGE/inbox",
    description: "เพลงไทยเดิมที่คุ้นหูและเหมาะสำหรับผู้เริ่มต้น ทำนองไพเราะ จังหวะไม่เร็ว",
    createdAt: "2024-01-15",
  },
  // เพิ่มเพลงใหม่ที่นี่
];
```

### 4.3 แก้ไขเพลงที่มีอยู่

ค้นหา ID ของเพลง แล้วแก้ไขฟิลด์ที่ต้องการ

```ts
{
  id: "laaw-duang-duen",
  title: "ลาวดวงเดือน (แก้ไข)",  // แก้ชื่อ
  difficulty: "intermediate",     // เปลี่ยนระดับ
  isFree: false,                  // เปลี่ยนเป็นมีค่าใช้จ่าย
  // ... fields อื่นๆ
}
```

### 4.4 ลบเพลง

ลบ object ของเพลงออกจาก `SONGS` array

---

### 4.5 ระดับความยาก (Difficulty Levels)

```ts
type DifficultyLevel = "beginner" | "intermediate" | "master";

// ใน UI จะแสดงเป็น:
// "beginner" → "มือใหม่ก็เล่นได้"
// "intermediate" → "มือซอ"
// "master" → "ระดับปรมาจารย์"
```

### 4.6 ประเภทเพลง (Song Genres)

```ts
type SongGenre = "thai-traditional" | "thai-modern" | "international";

// ใน UI จะแสดงเป็น:
// "thai-traditional" → "เพลงไทยเดิม"
// "thai-modern" → "เพลงไทย"
// "international" → "เพลงสากล"
```

---

## 📦 5. แก้ไขแพ็กเกจสั่งทำโน้ต

### 5.1 ดูรูปแบบข้อมูลแพ็กเกจ

**ตำแหน่ง:** `client/src/data/packages.ts`

```ts
interface Package {
  id: string;           // ID ไม่ซ้ำ
  title: string;        // "แบบที่ 1", "แบบที่ 2", etc
  subtitle: string;     // "โน้ตเมโลดี้", "Melody + Chord", etc
  description: string;  // คำอธิบาย
  price: number;        // ราคา (บาท)
  features: string[];   // ลิสต์ฟีเจอร์
  contactUrl: string;   // ลิงค์ Facebook Inbox
}
```

### 5.2 แก้ไขแพ็กเกจ

**ตำแหน่ง:** `client/src/data/packages.ts` บรรทัดที่ 20-60

```ts
export const PACKAGES: Package[] = [
  {
    id: "melody-only",
    title: "แบบที่ 1",
    subtitle: "โน้ตเมโลดี้",
    description: "เหมาะสำหรับผู้ต้องการเล่นเฉพาะ Melody ดูง่าย ไม่ซับซ้อน",
    price: 200,
    features: [
      "โน้ตเมโลดี้",
      "เนื้อเพลง",
      "ไฟล์ PDF",
    ],
    contactUrl: "https://www.facebook.com/YOUR_PAGE/inbox",
  },
  // แพ็กเกจอื่นๆ
];
```

### 5.3 เพิ่มแพ็กเกจใหม่

```ts
{
  id: "melody-chord-video",
  title: "แบบที่ 4",
  subtitle: "Melody + Chord + Video",
  description: "มีโน้ตพร้อมวิดีโอสอนการเล่น",
  price: 600,
  features: [
    "โน้ตเมโลดี้",
    "คอร์ดประกอบ",
    "เนื้อเพลง",
    "ไฟล์ PDF",
    "วิดีโอสาธิต",
  ],
  contactUrl: "https://www.facebook.com/YOUR_PAGE/inbox",
}
```

### 5.4 ไฮไลท์แพ็กเกจ (แนะนำ)

**ตำแหน่ง:** `client/src/pages/Home.tsx` บรรทัดที่ 380

```tsx
<PackageCard
  key={pkg.id}
  pkg={pkg}
  isHighlighted={i === 2}  // เปลี่ยน 2 เป็นตำแหน่งแพ็กเกจที่ต้องการไฮไลท์
/>
```

---

### 5.5 ลิงค์ Social Media

**ตำแหน่ง:** `client/src/data/packages.ts` บรรทัดที่ 60-75

```ts
export const CONTACT_INFO = {
  facebook: "https://www.facebook.com/YOUR_PAGE",
  youtube: "https://www.youtube.com/YOUR_CHANNEL",
  instagram: "https://www.instagram.com/YOUR_PROFILE",
  tiktok: "https://www.tiktok.com/@YOUR_HANDLE",
  deliveryTime: "ประมาณ 1 สัปดาห์",
};
```

**แก้ไข:**
- เปลี่ยน `YOUR_PAGE`, `YOUR_CHANNEL` เป็นลิงค์จริง
- ถ้าไม่มี social media ใดให้ลบออก (Footer จะไม่แสดง)

---

## 🎨 6. แก้ไขรูปแบบเว็บ (Styling)

### 6.1 Color Palette (ธีม Ink & Paper)

**ตำแหน่ง:** `client/src/index.css` บรรทัดที่ 40-80

```css
:root {
  --background: oklch(0.975 0.012 85);   /* #F7F2E7 กระดาษโน้ต */
  --foreground: oklch(0.18 0.04 40);     /* #2C1810 หมึกดำ */
  --primary: oklch(0.35 0.1 35);         /* #8B3A2A หมึกแดง */
  --border: oklch(0.83 0.04 80);         /* #D4C5A0 ขอบ */
  /* ... สีอื่นๆ */
}
```

**วิธีแก้ไข:** เปลี่ยนค่า `oklch()` เป็นสีที่ต้องการ

**ตัวอย่าง:** เปลี่ยนสีหลัก (primary) จากแดงเป็นน้ำเงิน
```css
--primary: oklch(0.4 0.15 260);  /* สีน้ำเงิน */
```

### 6.2 Typography (ฟอนต์)

**ตำแหน่ง:** `client/index.html` บรรทัดที่ 10-12

```html
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+Thai:wght@400;600;700;900&family=Sarabun:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
```

**วิธีแก้ไข:** เปลี่ยนชื่อฟอนต์จาก Google Fonts

**ตัวอย่าง:** เปลี่ยนเป็น Prompt Thai
```html
<link href="https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
```

แล้วอัปเดตใน `index.css`:
```css
body {
  font-family: 'Prompt', sans-serif;
}
```

### 6.3 Border Radius (มุมโค้ง)

**ตำแหน่ง:** `client/src/index.css` บรรทัดที่ 18

```css
--radius: 0.25rem; /* rounded-sm */
```

**วิธีแก้ไข:**
```css
--radius: 0.5rem;   /* โค้งมากขึ้น */
--radius: 0;        /* ตรงเลย */
--radius: 1rem;     /* โค้งมากๆ */
```

### 6.4 Shadow (เงา)

**ตำแหน่ง:** ค้นหา `shadow-` ในไฟล์ต่างๆ

**ตัวอย่าง:** เปลี่ยนจาก `shadow-sm` เป็น `shadow-lg`
```tsx
<div className="shadow-lg">  {/* เงามากขึ้น */}
```

### 6.5 Spacing (ระยะห่าง)

**ตำแหน่ง:** ค้นหา `p-`, `m-`, `gap-` ในไฟล์ต่างๆ

**ตัวอย่าง:** เปลี่ยนจาก `p-4` เป็น `p-6`
```tsx
<div className="p-6">  {/* ระยะห่างมากขึ้น */}
```

---

## 📱 7. Responsive Design (ปรับตัวตามขนาดจอ)

### 7.1 Breakpoints ใน Tailwind

```css
sm: 640px    /* Tablet เล็ก */
md: 768px    /* Tablet */
lg: 1024px   /* Desktop */
xl: 1280px   /* Desktop ใหญ่ */
```

### 7.2 ตัวอย่างการใช้

```tsx
<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* 1 column บน mobile, 2 columns บน tablet, 3 columns บน desktop */}
</div>

<h1 className="text-2xl md:text-3xl lg:text-4xl">
  {/* ขนาดตัวอักษรต่างกันตามขนาดจอ */}
</h1>
```

---

## 🔧 8. แก้ไขฟังก์ชันการค้นหาและกรอง

### 8.1 ฟังก์ชันกรองเพลง

**ตำแหน่ง:** `client/src/data/songs.ts` บรรทัดที่ 80-120

```ts
export function filterSongs(
  songs: Song[],
  filters: {
    search?: string;
    difficulty?: DifficultyLevel | "all";
    genre?: SongGenre | "all";
  }
): Song[] {
  return songs.filter((song) => {
    // ค้นหา
    if (filters.search) {
      const query = filters.search.toLowerCase();
      if (
        !song.title.toLowerCase().includes(query) &&
        !song.artist.toLowerCase().includes(query)
      ) {
        return false;
      }
    }

    // กรองระดับ
    if (filters.difficulty !== "all" && song.difficulty !== filters.difficulty) {
      return false;
    }

    // กรองประเภท
    if (filters.genre !== "all" && song.genre !== filters.genre) {
      return false;
    }

    return true;
  });
}
```

**วิธีแก้ไข:** เพิ่มเงื่อนไขกรองใหม่

**ตัวอย่าง:** เพิ่มการกรองตามว่า "ฟรี" หรือ "มีค่าใช้จ่าย"
```ts
export function filterSongs(
  songs: Song[],
  filters: {
    search?: string;
    difficulty?: DifficultyLevel | "all";
    genre?: SongGenre | "all";
    isFree?: boolean;  // เพิ่มบรรทัดนี้
  }
): Song[] {
  return songs.filter((song) => {
    // ... existing filters

    // กรองฟรี/มีค่าใช้จ่าย
    if (filters.isFree !== undefined && song.isFree !== filters.isFree) {
      return false;
    }

    return true;
  });
}
```

---

## 🔗 9. ลิงค์ PDF

### 9.1 ที่เก็บ PDF

**วิธี 1: GitHub**
```
https://raw.githubusercontent.com/Zintrea/leaves-notes/main/public/pdfs/song-name.pdf
```

**วิธี 2: Google Drive**
```
https://drive.google.com/uc?export=download&id=FILE_ID
```

**วิธี 3: Dropbox**
```
https://dl.dropboxusercontent.com/s/FILE_ID/song-name.pdf?dl=1
```

### 9.2 แก้ไขลิงค์ PDF ในเพลง

**ตำแหน่ง:** `client/src/data/songs.ts`

```ts
{
  id: "song-id",
  title: "ชื่อเพลง",
  // ...
  pdfUrl: "https://raw.githubusercontent.com/Zintrea/leaves-notes/main/public/pdfs/song-name.pdf",
}
```

---

## 🎯 10. Navigation & Routing

### 10.1 เพิ่ม Section ใหม่

**ตำแหน่ง:** `client/src/pages/Home.tsx`

```tsx
{/* ส่วนใหม่ */}
<section id="new-section" className="py-12">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2>ชื่อส่วนใหม่</h2>
    {/* เนื้อหา */}
  </div>
</section>
```

### 10.2 เพิ่มปุ่มใน Navbar

**ตำแหน่ง:** `client/src/components/Navbar.tsx` บรรทัดที่ 10-15

```ts
const navLinks = [
  { id: "songs", label: "โน้ตเพลง" },
  { id: "order", label: "สั่งทำโน้ต" },
  { id: "contact", label: "ติดต่อ" },
  { id: "new-section", label: "ส่วนใหม่" },  // เพิ่มบรรทัดนี้
];
```

---

## 📊 11. Component Structure

### 11.1 SongCard Component

**ตำแหน่ง:** `client/src/components/SongCard.tsx`

```tsx
interface SongCardProps {
  song: Song;
}

export default function SongCard({ song }: SongCardProps) {
  return (
    <div className="border rounded-sm p-4 bg-[#FEFAF2]">
      {/* เนื้อหา */}
    </div>
  );
}
```

### 11.2 FilterBar Component

**ตำแหน่ง:** `client/src/components/FilterBar.tsx`

```tsx
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
```

---

## 🚀 12. การ Deploy

### 12.1 Build เว็บ

```bash
cd saodung-tabs
pnpm build
```

### 12.2 Preview

```bash
pnpm preview
```

---

## 📝 13. Tips & Best Practices

### 13.1 ชื่อ ID ควรใช้ kebab-case
```ts
// ✅ ถูก
id: "laaw-duang-duen"

// ❌ ผิด
id: "LaawDuangDuen"
id: "laaw_duang_duen"
```

### 13.2 ลิงค์ Facebook ต้องใช้ `/inbox`
```ts
// ✅ ถูก
inboxUrl: "https://www.facebook.com/YOUR_PAGE/inbox"

// ❌ ผิด
inboxUrl: "https://www.facebook.com/YOUR_PAGE"
```

### 13.3 ใช้ Tailwind Classes แทน Inline CSS
```tsx
// ✅ ถูก
<div className="bg-red-500 p-4 rounded-sm">

// ❌ ผิด
<div style={{ backgroundColor: "red", padding: "16px" }}>
```

### 13.4 ใช้ Semantic HTML
```tsx
// ✅ ถูก
<button onClick={handleClick}>ปุ่ม</button>
<a href="/page">ลิงค์</a>

// ❌ ผิด
<div onClick={handleClick}>ปุ่ม</div>
<div onClick={() => navigate("/page")}>ลิงค์</div>
```

---

## 🆘 14. Troubleshooting

### ปัญหา: เพลงใหม่ไม่แสดง
**วิธีแก้:** ตรวจสอบว่า ID ไม่ซ้ำ และ `isFree` ถูกตั้งค่า

### ปัญหา: ลิงค์ PDF ไม่ทำงาน
**วิธีแก้:** ตรวจสอบว่า URL ถูกต้องและ PDF มีอยู่จริง

### ปัญหา: ข้อความไม่แสดง
**วิธีแก้:** ตรวจสอบสี text และ background (อาจมีความคมชัดต่ำ)

### ปัญหา: ไอคอนไม่แสดง
**วิธีแก้:** ตรวจสอบว่าชื่อไอคอนถูกต้องจาก lucide.dev

---

## 📚 Resources

- **Lucide Icons:** https://lucide.dev
- **Tailwind CSS:** https://tailwindcss.com
- **Google Fonts:** https://fonts.google.com
- **React Documentation:** https://react.dev
- **TypeScript:** https://www.typescriptlang.org

---

**ถ้ามีคำถามหรือปัญหา ให้ติดต่อทีม Manus ที่ https://help.manus.im**
