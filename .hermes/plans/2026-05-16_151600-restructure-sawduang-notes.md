# แผนจัดโครงสร้าง Sawduang Notes (ซอด้วง โน้ต) — Static-first, Elderly-Friendly

**Date:** 2026-05-16
**Author:** Iris (for Bai)
**Status:** Draft — ยังไม่ execute

---

## 🎯 เป้าหมาย

1. **ของเดิม safe** — commit ต้นฉบับไว้ก่อน แล้วค่อย ๆ ปรับทีละ commit
2. **Static-first** — deploy บน Netlify/Vercel ได้เลย ไม่ต้อง run server
3. **คนแก่ก็ใช้ได้** — ตัวใหญ่, contrast ชัด, navigation ง่าย
4. **ธีม Ink & Paper เหมือนเดิม** — สี ฟอนต์ บรรยากาศคงเดิม
5. **Structure รองรับอนาคต** — ถ้าจะเพิ่ม backend/auth/order ทีหลัง ไม่ต้องมานั่ง refactor ใหม่หมด

---

## 🔍 Critique โครงสร้างเดิม (ก่อนปรับ)

| ปัญหา | ผลกระทบ |
|-------|---------|
| ข้อมูลเพลง hardcode ใน `songs.ts` | แก้ไขเพลง = ต้อง rebuild |
| `Home.tsx` 295 บรรทัด | maintenance ยาก ขยับอะไรนิดหน่อยพังหมด |
| 70+ shadcn components | bundle ใหญ่ไม่จำเป็น |
| Social links placeholder | คนเข้าไปกด Facebook แล้วเจอหน้า login |
| ไม่มี `.env` separation | เปลี่ยน URL/CDN ต้องแก้ source |
| `server/` อยู่แต่ทำอะไรไม่ได้ | static deploy ใช้ server ไม่ได้ |
| Font sizes ตาม default | คนแก่อ่านยาก (small text = 12px-14px) |
| filter/search UI แนวตั้ง | mobile-friendly แต่ desktop ดูโล่งไป |

---

## 📁 โครงสร้างใหม่หลังปรับ

```
leaves-notes-web/
├── client/
│   ├── public/
│   │   ├── data/                ← JSON files (แก้ไขได้ ไม่ต้อง rebuild)
│   │   │   ├── songs.json       ← ข้อมูลเพลงทั้งหมด
│   │   │   ├── packages.json    ← แพ็กเกจสั่งทำ
│   │   │   └── contacts.json    ← Social links + delivery info
│   │   ├── pdfs/                ← (optional) วาง PDF ตรงนี้แทน CDN ก็ได้
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/              ← shadcn (prune: keep only ~15 used)
│   │   │   ├── layout/          ← Navbar, Footer
│   │   │   ├── sections/        ← HeroSection, SongSection, OrderSection (แยกจาก Home)
│   │   │   └── shared/          ← ErrorBoundary, Loading, EmptyState
│   │   ├── pages/
│   │   │   ├── Home.tsx         ← orchestration (~10-15 บรรทัด)
│   │   │   └── NotFound.tsx
│   │   ├── hooks/               ← useSongs, usePackages, useContacts
│   │   ├── services/            ← fetch data จาก /data/*.json
│   │   ├── lib/utils.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   └── index.html
├── shared/                      ← Types ที่ใช้ร่วมกัน (optional สำหรับ Phase 1)
├── .env.example                 ← URL configs
├── netlify.toml                 ← Netlify deploy config (แนะนำ)
├── package.json                 ← scripts ปรับ: dev, build, preview
├── tsconfig.json
├── vite.config.ts
└── ไฟล์ guide ไทย.md            ← คงไว้
```

---

## 🗺️ Git Workflow & Commit Plan

```
main
 ├─ [commit 1] 📦 snapshot — ไฟล์เดิมทั้งหมดก่อนปรับ
 ├─ [commit 2] ♻️ refactor data — songs.ts → public/data/songs.json
 ├─ [commit 3] 🧩 refactor components — section decomposition
 ├─ [commit 4] 🎨 elderly-friendly UI — font size, contrast, touch targets
 ├─ [commit 5] 🗑️ prune — ลบ unused shadcn + server/ (ถ้าไม่ใช้)
 ├─ [commit 6] ⚙️ config — .env, netlify.toml, deploy ready
 └─ [commit 7] 📖 update docs — AGENTS.md, guide files
```

**Branch strategy:** สร้าง branch `refactor/phase-1` แล้ว commit ทีละ step. merge เข้า main เมื่อทุก commit เสร็จ

---

## 📋 ขั้นตอนละเอียด (ทีละ Commit)

---

### Commit 1: 📦 Snapshot — ต้นฉบับเดิม

**สิ่งที่ทำ:**
- `git init` (ถ้ายังไม่มี)
- `git add .` ทุกไฟล์เดิม
- `git commit -m "📦 feat: initial snapshot — Sawduang Notes v1 (Ink & Paper theme)"`
- ไฟล์ที่เปลี่ยน: — (ไม่มี, แค่ commit snapshot)

**Verify:** `git log` แสดง commit แรก

---

### Commit 2: ♻️ ย้ายข้อมูลเป็น JSON

**ที่มา:** `client/src/data/songs.ts`, `packages.ts` → คนแก้เพลงต้องเปิด TS/Cursor เขียนโค้ด

**แผน:**
- สร้าง `client/public/data/songs.json`:
  ```json
  {
    "songs": [
      {
        "id": "lao-duang-duen",
        "title": "ลาวดวงเดือน",
        "artist": "เพลงพื้นบ้านไทย",
        "difficulty": "beginner",
        "genre": "thai-traditional",
        "tags": ["ฟรี", "โน้ต"],
        "isFree": true,
        "pdfUrl": "/data/pdfs/lao-duang-duen.pdf",
        "description": "...",
        "createdAt": "2024-01-01"
      }
    ]
  }
  ```
- สร้าง `client/public/data/packages.json` + `contacts.json`
- สร้าง `client/src/services/songs.ts` — fetch `/data/songs.json`
- build script `vite build` จะก๊อป public/ ไป dist/ อัตโนมัติ
- คนแก้เพลง = แค่เปิด `songs.json` เปลี่ยน text
- **ลบ** `client/src/data/` (ไม่ต้องใช้แล้ว)

**ไฟล์ที่เปลี่ยน:**
- `client/public/data/songs.json` (new)
- `client/public/data/packages.json` (new)
- `client/public/data/contacts.json` (new)
- `client/src/services/api.ts` (new)
- `client/src/services/songs.ts` (new)
- `client/src/services/packages.ts` (new)
- `client/src/services/contacts.ts` (new)
- `client/src/hooks/useSongs.ts` (new)
- `client/src/hooks/usePackages.ts` (new)
- `client/src/hooks/useContacts.ts` (new)
- `client/src/data/songs.ts` (deleted)
- `client/src/data/packages.ts` (deleted)
- `client/src/pages/Home.tsx` (ปรับ import → use hooks)
- `client/src/const.ts` (adjust)

**Verify:** `pnpm dev` → หน้าเว็บเหมือนเดิมทุกประการ (content จาก JSON)

---

### Commit 3: 🧩 แยก Home.tsx → Sections

**ที่มา:** Home.tsx 295 บรรทัด มี hero, songs, order, filter, footer ปนกัน

**แผน:**
- สร้าง `client/src/components/sections/HeroSection.tsx`:
  - Hero content, cover image, stats, CTA buttons
  - Props: `onNavigate(sectionId)`
- สร้าง `client/src/components/sections/SongSection.tsx`:
  - Filter + search + song grid + pagination (see more)
  - Internal state: search, difficulty, genre, visibleCount
  - Props: `songs`, `onFilterChange`
- สร้าง `client/src/components/sections/OrderSection.tsx`:
  - Section header + package cards
  - Props: `packages`, `contactInfo`
- ปรับ `pages/Home.tsx`:
  ```tsx
  export default function Home() {
    const { songs } = useSongs();
    const { packages } = usePackages();
    const { contacts } = useContacts();
    const [activeSection, setActiveSection] = useState("songs");

    return (
      <div>
        <Navbar activeSection={activeSection} onNavigate={setActiveSection} />
        <HeroSection onNavigate={setActiveSection} />
        <SongSection songs={songs} />
        <OrderSection packages={packages} contacts={contacts} />
        <Footer contacts={contacts} />
      </div>
    );
  }
  ```
- ปรับ component imports: `Map.tsx`, `ManusDialog.tsx` — review ถ้าไม่ใช้ให้ลบ

**ไฟล์ที่เปลี่ยน:**
- `client/src/components/sections/HeroSection.tsx` (new)
- `client/src/components/sections/SongSection.tsx` (new)
- `client/src/components/sections/OrderSection.tsx` (new)
- `client/src/pages/Home.tsx` (refactored)
- `client/src/components/FilterBar.tsx` (อาจ cleanup)
- `client/src/components/PackageCard.tsx` (อาจ cleanup)

**Verify:** UI ทุกส่วนเหมือนเดิม, navigation ระหว่าง section ยัง smooth

---

### Commit 4: 🎨 Elderly-Friendly UI

**ที่มา:** คนแก่อ่านหนังสือน้อย ตัวเล็ก, contrast อาจไม่พอ, touch targets เล็ก

**แผน:**
| จุดปรับ | จาก → เป็น | เหตุผล |
|---------|-----------|--------|
| Body font size | 12-14px → **16px (base)** | readability สำหรับผู้สูงอายุ |
| Song card title | 14px → **18px** | ชื่อเพลงอ่านง่าย |
| Badge font | 10px → **12px** | ป้ายความยากเห็นชัด |
| Button padding | `px-5 py-2.5` → **เพิ่ม py-3** | touch target ≥ 44px |
| Filter/Search inputs | ขนาดเล็ก → **input padding +** | ง่ายต่อการพิมพ์ |
| Song card gap | `gap-4` → **gap-5** | content หายใจได้ |
| Contrast | primary red `#8B3A2A` → **test contrast ratio** | WCAG AA (≥4.5:1) |
| Active states | hover only → **focus-visible + active** | keyboard navigation |
| Stats numbers | 24px → **28px** | มองเห็นสถิติชัด |
| "ดูเพิ่มเติม" button | small → **more prominent** | ไม่หลุดสายตา |
| Scroll margin | — → **`scroll-mt-20`** | Navbar ไม่บัง content |

**หลักการออกแบบ (Elderly-Friendly without looking "เด็ก"):**
- **Typography-first:** ใช้ขนาด font hierarchy ชัดเจน (h1=36px, h2=28px, body=16px)
- **High contrast:** ข้อความบนพื้นหลัง ≥ 4.5:1 ratio
- **Generous spacing:** padding, margin เพิ่มขึ้น 25%
- **Clear affordance:** ปุ่มมี hover + active + focus state ที่เห็นเด่นชัด
- **Simple flow:** Hero → Songs → Order → Contact ไม่ต้องคิด
- **No jargon:** คำว่า "Melody" "Chord" อาจไม่เข้าใจ → ใช้ภาษาไทย "ทำนอง" "คอร์ด" หรือมี tooltip

**ไฟล์ที่เปลี่ยน:**
- `client/src/index.css` — ปรับ base font size, custom properties
- `client/src/pages/Home.tsx` หรือ sections — ปรับ className
- `client/src/components/Navbar.tsx` — touch targets
- `client/src/components/SongCard.tsx` — font sizes
- `client/src/components/FilterBar.tsx` — input sizes
- `client/src/components/Footer.tsx` — social link sizes

**Verify:**
- เปิด DevTools → ตรวจสอบ font size ไม่ต่ำกว่า 16px สำหรับ body
- Lighthouse Accessibility audit ≥ 90
- ทดสอบกับ Chrome zoom 125% — ยังใช้ได้

---

### Commit 5: 🗑️ Prune — ลบของไม่ใช้

**ที่มา:** 70+ shadcn components ใน `client/src/components/ui/` แต่ใช้จริง ~15 ตัว

**แผน:**
- grep imports ในทุก `.tsx` file:
  ```
  grep -r "from \"@/components/ui/" client/src/ | sort -u
  ```
- **Keep list (expected):**
  - button, card, badge, input, select, separator, sheet, tooltip, badge, sonner, skeleton, scroll-area, avatar, form, label, tabs
- **Remove list (expected):** accordion, alert-dialog, aspect-ratio, breadcrumb, calendar, carousel, chart, checkbox, collapsible, command, context-menu, drawer, dropdown-menu, hover-card, input-otp, menubar, navigation-menu, pagination, popover, progress, radio-group, resizable, slider, switch, table, textarea, toggle, toggle-group, button-group, field, input-group, item, kbd, spinner, alert, dialog, drawer, resizable, sidebar, ...
- **server/ directory:** ถ้า deploy static ใช้ server ไม่ได้ → move ไปโฟลเดอร์ `_archive/` หรือลบ (แต่เก็บ idea ไว้ใน docs เผื่ออนาคต)
- **Manus logs:** `.manus-logs/`, `client/public/__manus__/` — เพิ่มใน .gitignore หรือลบ
- **`venv/`** — ลบ virtual env (เป็น Python ไม่เกี่ยว)
- **`patches/wouter@3.7.1.patch`** — ถ้ายังใช้งานได้ keep ไว้

**ไฟล์ที่เปลี่ยน:**
- `client/src/components/ui/` — ลบ ~55 files
- `server/` — archive or remove
- `.gitignore` — เพิ่ม .manus-logs/
- `package.json` — review dependencies ที่ไม่จำเป็น

**Verify:** `pnpm check` pass, `pnpm build` สำเร็จ

---

### Commit 6: ⚙️ Config — พร้อม Deploy

**ที่มา:** ไม่มี `.env`, ไม่มี deploy config, URLs hardcode

**แผน:**
- สร้าง `.env.example`:
  ```env
  VITE_FACEBOOK_URL=https://www.facebook.com/your-page
  VITE_LINE_URL=
  VITE_CONTACT_EMAIL=
  ```
- สร้าง `netlify.toml`:
  ```toml
  [build]
    command = "pnpm build"
    publish = "dist/public"

  [[redirects]]
    from = "/*"
    to = "/index.html"
    status = 200
  ```
  หรือถ้าใช้ **Vercel** → สร้าง `vercel.json` (Vercel detect Vite auto)
- ลบ `server/` (หรือ move ไป archive)
- update `package.json` scripts:
  ```json
  "scripts": {
    "dev": "vite --host",
    "build": "vite build",
    "preview": "vite preview --host",
    "check": "tsc --noEmit",
    "format": "prettier --write ."
  }
  ```
  (remove `esbuild server/index.ts` จาก build script เพราะไม่มี server แล้ว)
- update `vite.config.ts`:
  - Remove `vite-plugin-manus-runtime`
  - Remove `vitePluginManusDebugCollector` plugin
  - Remove `allowedHosts` (Manus-specific)
  - Clean up build config (อาจปรับ `outDir` ให้ตรง)

**ไฟล์ที่เปลี่ยน:**
- `.env.example` (new)
- `netlify.toml` (new) หรือ `vercel.json`
- `package.json` — build script
- `vite.config.ts` — clean up Manus-specific plugins
- `.gitignore` — add .manus-logs

**Verify:**
- `pnpm build` → สร้าง `dist/public/` สำเร็จ
- `pnpm preview` → เปิดเว็บได้จาก build output
- `netlify.toml` ถูก syntax

---

### Commit 7: 📖 Update Docs

**ที่มา:** คู่มือไทย 3 เล่มอ้างถึง `server/`, `npm install` (แต่ใช้ pnpm), GitHub URLs เดิม

**แผน:**
- update `AGENTS.md`:
  - build script: `pnpm build` (ไม่ต้อง esbuild server)
  - remove `pnpm start` (ไม่มี server)
  - update file tree
- update `ซอด้วง โน้ต — Setup & Deploy Guide.md`:
  - เปลี่ยนวิธี build (ไม่มี server)
  - เปลี่ยน deploy step สำหรับ Netlify/Vercel โดยเฉพาะ
  - เปลี่ยน npm → pnpm
  - update folder structure
- update `ซอด้วง โน้ต — Developer Guide.md`:
  - เปลี่ยนวิธีเพิ่มเพลง (แก้ JSON ไม่ใช่ TS)
  - เปลี่ยนโครงสร้างไฟล์
  - เพิ่ม elderly-friendly guidelines

**ไฟล์ที่เปลี่ยน:**
- `AGENTS.md`
- `ซอด้วง โน้ต — Setup & Deploy Guide.md`
- `ซอด้วง โน้ต — Developer Guide.md`

**Verify:** อ่านแล้วไม่ contradicกับโค้ดใหม่

---

## 📦 Deploy Recommendation

| Platform | ข้อดี | ข้อเสีย |
|----------|------|--------|
| **Netlify** 🏆 | ฟรี, CDN ทั่วโลก, form handling (อนาคต), Deploy previews | — |
| **Vercel** | ฟรี, Edge Functions, integration ดี | Overkill สำหรับ static |
| **GitHub Pages** | ฟรี, ไม่ต้องสมัครใหม่ | ตั้งค่าเยอะ, ไม่มี form |

**แนะนำ: Netlify** — ง่ายสุด: `netlify.toml` → git push → auto deploy

---

## 🧪 Verification Checklist (ก่อน deploy)

- [ ] `pnpm check` — TypeScript ไม่มี error
- [ ] `pnpm build` — build สำเร็จ
- [ ] `pnpm preview` — เปิดเว็บได้, ทุก section visible
- [ ] Font size ≥ 16px สำหรับ body text
- [ ] Social links → ไปที่หน้าที่ถูกต้อง (ไม่ใช่ placeholder)
- [ ] `songs.json` → 11 เพลงครบ
- [ ] Mobile responsive (375px - 1440px)
- [ ] Lighthouse Accessibility ≥ 90
- [ ] Loading state → skeleton/spinner ขณะ fetch JSON
- [ ] Error state → ถ้า JSON หาย ให้แสดง fallback

---

## ⚠️ Risks & Tradeoffs

| Risk | Mitigation |
|------|-----------|
| JSON fetch อาจ fail (network delay) | add loading skeleton + error fallback |
| Font size 16px อาจเนื้อที่น้อยลง | จริง ๆ 16px ไม่ต่างจาก 14px มาก แต่ readability ดีกว่า |
| Elderly-friendly ≠ modern look | ใช้ **sleek accessibility** approach — ดูดีแต่อ่านง่าย |
| ลบ shadcn เกิน → build fail | TypeScript check + git diff review |
| JSON เป็น static → ไม่ dynamic | Phase 2 เปลี่ยนเป็น API endpoint ทีหลังได้ (ข้อมูล structure เหมือนกัน) |

---

## ❓ Open Questions (waiting for Bai)

1. **Deploy: Netlify หรือ Vercel?** — ไอริสแนะนำ Netlify เพราะ deploy ง่ายกว่า
2. **Font size approach:** เพิ่ม base เป็น 16px เลย หรือให้มีปุ่มปรับ font size?
3. **Social links:** มีลิงค์ Facebook Page จริงหรือยัง? หรือให้คง placeholder ไว้?
4. **Cover images (Cover.png, Cover1.png, Cover2.png):** เปลี่ยน/อัปเดต หรือคงของเดิม?
5. **PDF files:** จะวางใน `public/pdfs/` ใน repo นี้เลย หรืออ้าง CDN `leaves-notes-assets` ต่อ?
6. **GitHub repo:** `Zintrea/leaves-notes` ใช่ repo จริงมั้ย? จะ push ไปที่เดิมหรือสร้างใหม่?

---

*Plan v2 written by Iris — รอใบ approve แล้วเริ่ม execute ทีละ commit ค่ะ 🫶*
