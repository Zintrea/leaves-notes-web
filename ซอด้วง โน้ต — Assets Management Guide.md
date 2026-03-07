# คู่มือการจัดการไฟล์ PDF และ Assets

คู่มือนี้อธิบายวิธีจัดการไฟล์ PDF, รูปภาพ และการใช้ CDN สำหรับเว็บซอด้วง โน้ต

---

## 📁 โครงสร้างโปรเจกต์

```
leaves-notes-web/                 ← โปรเจกต์หลัก (เว็บ)
leaves-notes-assets/              ← โปรเจกต์เก็บไฟล์ (PDF, รูป)
├── pdfs/                         ← เก็บไฟล์โน้ตเพลง
│   ├── lao-duang-duen.pdf
│   └── ...
└── images/                       ← เก็บรูปภาพ
    └── ...
```

---

## 🔗 CDN คืออะไร?

### ทำไมต้องใช้ CDN?

| วิธี | ข้อดี | ข้อเสีย |
|------|-------|----------|
| **CDN (jsDelivr)** | ดาวน์โหลดเร็ว, มี caching, ทั่วโลก | ต้อง push ขึ้น GitHub |
| GitHub Raw | ง่าย | ช้า, ไม่มี caching |
| Google Drive | คุ้นเคย | ลิงค์ยาว, อาจมีปัญหา |

### CDN URL Format

```
https://cdn.jsdelivr.net/gh/USERNAME/REPO/PATH/TO/FILE
```

**ตัวอย่าง:**
```
https://cdn.jsdelivr.net/gh/Zintrea/leaves-notes-assets/pdfs/lao-duang-duen.pdf
```

### เวอร์ชันต่างๆ

```bash
# ใช้ main branch (อัปเดตอัตโนมัติ)
https://cdn.jsdelivr.net/gh/Zintrea/leaves-notes-assets/pdfs/song.pdf

# ใช้ commit เฉพาะ (ไม่เปลี่ยนแปลง)
https://cdn.jsdelivr.net/gh/Zintrea/leaves-notes-assets@abc1234/pdfs/song.pdf

# ใช้ tag (แนะนำ)
https://cdn.jsdelivr.net/gh/Zintrea/leaves-notes-assets@v1.0/pdfs/song.pdf
```

---

## 📋 วิธีเพิ่ม PDF ใหม่

### ขั้นตอนที่ 1: วางไฟล์ PDF

1. เปิดโฟลเดอร์ `leaves-notes-assets/pdfs/`
2. วางไฟล์ PDF ที่ต้องการ
3. ตั้งชื่อไฟล์เป็น `kebab-case` เช่น `lao-duang-duen.pdf`

### ขั้นตอนที่ 2: แก้ไข songs.ts

เปิด `client/src/data/songs.ts` และเพิ่ม/แก้ไขเพลง:

```ts
{
  id: "lao-duang-duen",
  title: "ลาวดวงเดือน",
  // ...
  pdfUrl: `${CDN_BASE}/pdfs/lao-duang-duen.pdf`,
  // ...
},
```

### ขั้นตอนที่ 3: Push ขึ้น GitHub

```bash
# 1. เข้าโฟลเดอร์ assets
cd leaves-notes-assets

# 2. เพิ่มไฟล์
git add .

# 3. Commit
git commit -m "เพิ่มเพลง ลาวดวงเดือน"

# 4. Push
git push origin main
```

### ขั้นตอนที่ 4: รอ CDN อัปเดต

- jsDelivr จะอัปเดตภายใน 1-5 นาที
- ลิงค์ใหม่จะทำงานทันที

---

## ✏️ วิธีแก้ไข PDF

### กรณีที่ 1: แก้ไขเนื้อหาในไฟล์ PDF

1. แก้ไขไฟล์ PDF ในโฟลเดอร์ `leaves-notes-assets/pdfs/`
2. บันทึกด้วยชื่อเดิม
3. Push ขึ้น GitHub

```bash
git add .
git commit -m "แก้ไขเพลง ลาวดวงเดือน"
git push origin main
```

### กรณีที่ 2: เปลี่ยนชื่อไฟล์

**สำคัญ:** ต้องแก้ไข `songs.ts` ด้วย!

1. เปลี่ยนชื่อไฟล์ในโฟลเดอร์
2. แก้ไข `pdfUrl` ใน `songs.ts`:
   ```ts
   // ก่อน
   pdfUrl: `${CDN_BASE}/pdfs/lao-duang-duen.pdf`,
   
   // หลัง
   pdfUrl: `${CDN_BASE}/pdfs/lao-duang-duen-v2.pdf`,
   ```
3. Commit และ push ทั้งสองโปรเจกต์

### กรณีที่ 3: ลบ PDF

1. ลบไฟล์ออกจากโฟลเดอร์ `pdfs/`
2. แก้ไข `songs.ts` ให้ `pdfUrl` เป็นค่าว่าง:
   ```ts
   pdfUrl: "",
   ```
3. Commit และ push

---

## 🖼️ วิธีเพิ่มรูปภาพ

### โครงสร้างโฟลเดอร์

```
leaves-notes-assets/images/
├── song-covers/       ← รูปปกเพลง
│   └── lao-duang-duen.jpg
└── hero/            ← รูปหน้าหลัก
    └── hero-main.jpg
```

### ใช้ใน Code

```ts
const CDN_BASE = "https://cdn.jsdelivr.net/gh/Zintrea/leaves-notes-assets";

// รูปปกเพลง
imageUrl: `${CDN_BASE}/images/song-covers/lao-duang-duen.jpg`,

// รูป Hero
const HERO_IMAGE = `${CDN_BASE}/images/hero/hero-main.jpg`;
```

---

## 🔧 GitHub สำหรับ Assets

### Remote URL
```
https://github.com/Zintrea/leaves-notes-assets.git
```

### คำสั่งที่ใช้บ่อย

```bash
# Clone ครั้งแรก
git clone https://github.com/Zintrea/leaves-notes-assets.git

# ดูสถานะ
git status

# ดูไฟล์ที่เปลี่ยน
git diff

# Commit ทั้งหมด
git add .
git commit -m "คำอธิบาย"

# Push ขึ้น GitHub
git push origin main

# ดึงอัปเดตล่าสุด
git pull origin main
```

---

## ⚠️ สิ่งที่ต้องรู้

### 1. ตั้งชื่อไฟล์
- ใช้ **kebab-case**: `lao-duang-duen.pdf` ไม่ใช่ `Lao Duang Duen.pdf`
- ไม่มีช่องว่าง: ใช้ `-` หรือ `_` แทน
- ตัวพิมพ์เล็กทั้งหมดแนะนำ

### 2. ขนาดไฟล์
- แนะนำ: ไม่เกิน 10 MB ต่อไฟล์
- ถ้าใหญ่กว่านี้ ควรใช้บริการอื่น (เช่น Google Drive)

### 3. การตั้งชื่อ ID เพลง
- ID ต้องตรงกับชื่อไฟล์ PDF
- ใช้ `kebab-case` เหมือนกัน

```ts
// ถ้าไฟล์: lao-duang-duen.pdf
id: "lao-duang-duen",
pdfUrl: `${CDN_BASE}/pdfs/lao-duang-duen.pdf`,
```

### 4. CDN Cache
- เมื่ออัปเดตไฟล์ อาจต้องรอ 1-5 นาที
- ถ้าต้องการลบ cache ใช้: `https://purge.jsdelivr.net/gh/USERNAME/REPO@VERSION/PATH`

### 5. 2 โปรเจกต์ต้อง Sync
- เมื่อเพิ่ม PDF → แก้ไข `songs.ts` → Commit ทั้งสองที่

---

## 📝 Checklist: เพิ่มเพลงใหม่

- [ ] สร้าง/หาไฟล์ PDF
- [ ] วางใน `leaves-notes-assets/pdfs/`
- [ ] ตั้งชื่อถูกต้อง (kebab-case)
- [ ] เปิด `songs.ts`
- [ ] เพิ่ม object เพลงใหม่
- [ ] ใส่ `pdfUrl: ${CDN_BASE}/pdfs/filename.pdf`
- [ ] Commit โปรเจกต์ assets
- [ ] Push assets ขึ้น GitHub
- [ ] Commit โปรเจกต์ web
- [ ] Push web ขึ้น GitHub

---

## 🚨 แก้ปัญหาเบื้องต้น

### ปัญหา: PDF ไม่โหลด

1. ตรวจสอบชื่อไฟล์ถูกต้อง
2. ตรวจสอบว่า push สำเร็จ
3. รอ 5 นาทีแล้วลองใหม่
4. ลองเปิดลิงค์ใน incognito

### ปัญหา: 404 Not Found

- ตรวจสอบ path ถูกต้อง: `/pdfs/filename.pdf` ไม่ใช่ `/pdf/filename.pdf`
- ตรวจสอบว่าไฟล์มีอยู่จริงใน repo

### ปัญหา: เปลี่ยนแปลงไม่อัปเดต

- ลองเปิดลิงค์ใน tab ใหม่
- หรือใช้ query string: `file.pdf?v=1`

---

## 📞 ถ้ามีปัญหา

1. ตรวจสอบตาม **แก้ปัญหาเบื้องต้น** ข้างบน
2. ดูที่ GitHub repo: https://github.com/Zintrea/leaves-notes-assets
3. ตรวจสอบว่า push สำเร็จหรือไม่
4. ถามได้เสมอ!

---

**อัปเดตล่าสุด:** มีนาคม 2026
