# AGENTS.md — Sawduang Notes (ซอด้วง โน้ต)

คู่มือสำหรับ Developer/AI Agent ที่ทำงานบนโค้ดนี้

---

## 📋 Project Overview

- **Name:** Sawduang Notes (ซอด้วง โน้ต)
- **Type:** Static Web Application
- **Stack:** React 19 + TypeScript + Vite 7 (frontend), Tailwind CSS 4 + shadcn/ui
- **Data:** JSON files (`public/data/`)
- **Hosting:** Netlify (recommended), or any static host
- **Package Manager:** pnpm

---

## 🏗️ Project Structure

```
leaves-notes-web/
├── client/
│   ├── public/
│   │   ├── data/              ← ★ ข้อมูลเพลง/แพ็กเกจ (JSON) ★
│   │   │   ├── songs.json     ←   รายการเพลงทั้งหมด
│   │   │   ├── packages.json  ←   แพ็กเกจและราคา
│   │   │   └── contacts.json  ←   Social links
│   │   └── pdfs/              ← ★ ไฟล์ PDF โน้ตเพลง ★
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/        ← Navbar, Footer
│   │   │   ├── sections/      ← HeroSection, SongSection, OrderSection
│   │   │   ├── ui/            ← shadcn/ui (keep only used ~12)
│   │   │   └── *.tsx          ← SongCard, FilterBar, PackageCard
│   │   ├── pages/
│   │   │   ├── Home.tsx       ← ~35 บรรทัด (orchestrator)
│   │   │   └── NotFound.tsx
│   │   ├── hooks/             ← useSongs, usePackages, useContacts
│   │   ├── services/          ← fetch JSON layer (api.ts, songs.ts, packages.ts)
│   │   └── lib/               ← song-constants.ts, package-constants.ts
│   └── index.html
├── shared/const.ts            ← Shared constants (legacy)
├── netlify.toml               ← Deploy config
└── package.json
```

---

## 🚀 Development Commands

```bash
pnpm dev          # Start Vite dev server (localhost:3000)
pnpm build        # Build for production → dist/public/
pnpm preview      # Preview production build locally
pnpm check        # TypeScript check (tsc --noEmit)
pnpm format       # Format with Prettier
```

---

## 📦 Data Flow

```
public/data/songs.json  ──fetch──→  services/songs.ts  ──→  hooks/useSongs.ts  ──→  Components
public/data/packages.json ──fetch──→ services/packages.ts ──→ hooks/usePackages.ts ──→ Components
public/data/contacts.json ──fetch──→ services/packages.ts ──→ hooks/useContacts.ts ──→ Components
```

การแก้ไขข้อมูล → แก้ JSON ใน `public/data/` → reload อัตโนมัติ (dev) / push + deploy (production)

---

## 🔧 Common Tasks

### Add a new song
1. Add entry to `client/public/data/songs.json`
2. (optional) Place PDF in `client/public/pdfs/`
3. Set `pdfUrl` to `/data/pdfs/filename.pdf`

### Change pricing
- Edit `client/public/data/packages.json` → `price` field

### Change social links
- Edit `client/public/data/contacts.json`

### Deploy to Netlify
1. Push to GitHub
2. Import repo in Netlify
3. Done (auto-detects from `netlify.toml`)

---

## 📱 Design Notes

- **Theme:** Ink & Paper (สีกระดาษโน้ตเพลงเก่า)
- **Font:** Noto Serif Thai (headings) + Sarabun (body)
- **Mobile-first:** 1 col (mobile) → 2 (tablet) → 3 (desktop)
- **Accessibility:** body 16px, touch targets ≥ 44px, focus-visible states
