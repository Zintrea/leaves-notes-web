# ซอด้วง Tabs — Setup & Deploy Guide

คู่มือการรัน Local และ Deploy ขึ้นคลาวด์

---

## 🚀 ส่วนที่ 1: รัน Local (บนเครื่องของคุณ)

### ขั้นตอนที่ 1: ติดตั้ง Prerequisites

ต้องติดตั้ง 3 อย่างนี้ก่อน:

#### 1.1 Node.js (รวม npm/pnpm)
- ดาวน์โหลดจาก: https://nodejs.org/
- เลือก **LTS version** (ปัจจุบัน v20 ขึ้นไป)
- ติดตั้งตามปกติ

**ตรวจสอบการติดตั้ง:**
```bash
node --version    # ควรแสดง v20.x.x ขึ้นไป
npm --version     # ควรแสดง 10.x.x ขึ้นไป
```

#### 1.2 Git
- ดาวน์โหลดจาก: https://git-scm.com/
- ติดตั้งตามปกติ

**ตรวจสอบการติดตั้ง:**
```bash
git --version     # ควรแสดง git version x.x.x
```

#### 1.3 Code Editor (แนะนำ)
- **VS Code** (แนะนำสุด): https://code.visualstudio.com/
- หรือ **WebStorm**, **Sublime Text**, etc.

---

### ขั้นตอนที่ 2: Clone Repository

เปิด Terminal/Command Prompt แล้วรัน:

```bash
# ไปที่ folder ที่ต้องการเก็บโปรเจกต์
cd Desktop

# Clone repo
git clone https://github.com/Zintrea/leaves-notes.git

# เข้าไปในโปรเจกต์
cd leaves-notes
```

**ผลลัพธ์ที่ควรได้:**
```
leaves-notes/
├── client/
├── server/
├── package.json
├── README.md
└── ...
```

---

### ขั้นตอนที่ 3: ติดตั้ง Dependencies

ยังอยู่ใน folder `leaves-notes` รัน:

```bash
# ติดตั้ง packages ทั้งหมด
npm install
# หรือ
pnpm install
```

**ใช้เวลาประมาณ 2-5 นาที** (ขึ้นอยู่กับความเร็ว internet)

**ผลลัพธ์ที่ควรได้:**
```
added XXX packages in X.XXs
```

---

### ขั้นตอนที่ 4: รัน Development Server

```bash
npm run dev
# หรือ
pnpm dev
```

**ผลลัพธ์ที่ควรได้:**
```
➜  Local:   http://localhost:3000/
➜  Network: http://169.254.0.21:3000/
```

---

### ขั้นตอนที่ 5: เปิดเว็บในเบราว์เซอร์

1. เปิด browser ใหม่
2. ไปที่ `http://localhost:3000`
3. ควรเห็นเว็บซอด้วง Tabs

**🎉 สำเร็จ!** เว็บกำลังรันบนเครื่องของคุณ

---

### ขั้นตอนที่ 6: แก้ไขโค้ด

ตอนนี้คุณสามารถแก้ไขโค้ดได้:

```bash
# เปิด VS Code
code .

# หรือเปิดไฟล์ด้วย editor ที่ต้องการ
```

**ไฟล์ที่ควรแก้ไข:**
- `client/src/data/songs.ts` — เพิ่มเพลง
- `client/src/data/packages.ts` — แก้ราคา, ลิงค์
- `client/src/pages/Home.tsx` — แก้ข้อความ
- `client/src/index.css` — แก้สี, ฟอนต์

**เว็บจะ reload อัตโนมัติ** เมื่อคุณบันทึกไฟล์

---

### ขั้นตอนที่ 7: หยุดเว็บ

ใน Terminal กด `Ctrl + C` เพื่อหยุด dev server

---

## 📦 ส่วนที่ 2: Build สำหรับ Production

เมื่อต้องการ deploy ขึ้นคลาวด์ ต้อง build เว็บก่อน:

```bash
npm run build
# หรือ
pnpm build
```

**ใช้เวลาประมาณ 1-2 นาที**

**ผลลัพธ์ที่ควรได้:**
```
dist/
├── index.html
├── assets/
│   ├── index-xxxxx.js
│   ├── index-xxxxx.css
│   └── ...
└── ...
```

**ไฟล์ที่สำคัญ:**
- `dist/` — folder นี้คือที่เก็บเว็บที่พร้อม deploy

---

## ☁️ ส่วนที่ 3: Deploy ขึ้นคลาวด์

### ตัวเลือก 1: Manus (แนะนำ - ใช้ Manus ที่มีอยู่)

**ขั้นตอน:**
1. ไปที่ Management UI ของ Manus
2. คลิก **Publish** button
3. เว็บจะ deploy โดยอัตโนมัติ

**ข้อดี:**
- ✅ ง่ายที่สุด (1 คลิก)
- ✅ ไม่ต้องตั้งค่าอะไร
- ✅ ได้ domain ฟรี (xxx.manus.space)

---

### ตัวเลือก 2: Vercel (ฟรี, นิยม)

**ขั้นตอน:**

#### 2.1 สมัครสมาชิก
1. ไปที่ https://vercel.com
2. คลิก **Sign Up**
3. เลือก **GitHub** เพื่อเชื่อมต่อ

#### 2.2 Import Project
1. คลิก **Add New** → **Project**
2. เลือก repository `leaves-notes`
3. คลิก **Import**

#### 2.3 ตั้งค่า
- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- คลิก **Deploy**

**ใช้เวลา:** 2-3 นาที

**ผลลัพธ์:**
```
Deployment completed successfully!
Your site is live at: https://leaves-notes-xxxxx.vercel.app
```

**ข้อดี:**
- ✅ ฟรี
- ✅ Deploy อัตโนมัติเมื่อ push ไป GitHub
- ✅ ได้ domain ฟรี

---

### ตัวเลือก 3: Netlify (ฟรี)

**ขั้นตอน:**

#### 3.1 สมัครสมาชิก
1. ไปที่ https://netlify.com
2. คลิก **Sign Up**
3. เลือก **GitHub**

#### 3.2 Deploy
1. คลิก **Add new site** → **Import an existing project**
2. เลือก **GitHub**
3. เลือก repository `leaves-notes`
4. ตั้งค่า:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. คลิก **Deploy site**

**ใช้เวลา:** 2-3 นาที

**ผลลัพธ์:**
```
Site is live at: https://leaves-notes-xxxxx.netlify.app
```

---

### ตัวเลือก 4: GitHub Pages (ฟรี)

**ขั้นตอน:**

#### 4.1 แก้ไข `vite.config.ts`
```ts
export default defineConfig({
  base: '/leaves-notes/',  // เพิ่มบรรทัดนี้
  plugins: [react()],
})
```

#### 4.2 สร้าง GitHub Action
สร้างไฟล์: `.github/workflows/deploy.yml`

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

#### 4.3 Push ไป GitHub
```bash
git add .
git commit -m "Add GitHub Pages deployment"
git push origin main
```

**ผลลัพธ์:**
```
Site is live at: https://zintrea.github.io/leaves-notes/
```

---

### ตัวเลือก 5: Railway (ฟรี/จ่ายเงิน)

**ขั้นตอน:**

#### 5.1 สมัครสมาชิก
1. ไปที่ https://railway.app
2. คลิก **Sign Up**
3. เลือก **GitHub**

#### 5.2 Deploy
1. คลิก **New Project**
2. เลือก **Deploy from GitHub repo**
3. เลือก `leaves-notes`
4. Railway จะ detect และ deploy อัตโนมัติ

**ผลลัพธ์:**
```
Your app is live at: https://leaves-notes-xxxxx.railway.app
```

---

## 📊 เปรียบเทียบ Platform

| Platform | ราคา | ความยาก | Deploy | Domain |
|---|---|---|---|---|
| **Manus** | ✅ ฟรี | ⭐ ง่ายที่สุด | 1 คลิก | ฟรี (.manus.space) |
| **Vercel** | ✅ ฟรี | ⭐⭐ ง่าย | Auto | ฟรี (.vercel.app) |
| **Netlify** | ✅ ฟรี | ⭐⭐ ง่าย | Auto | ฟรี (.netlify.app) |
| **GitHub Pages** | ✅ ฟรี | ⭐⭐⭐ ปานกลาง | Auto | ฟรี (.github.io) |
| **Railway** | ⚠️ ฟรี/จ่าย | ⭐⭐⭐ ปานกลาง | Auto | ต้องจ่าย |

**แนะนำ:** ใช้ **Manus** ที่มีอยู่แล้ว (ง่ายที่สุด)

---

## 🔄 Workflow: Edit → Deploy

### Local Development
```bash
# 1. Clone & Install
git clone https://github.com/Zintrea/leaves-notes.git
cd leaves-notes
npm install

# 2. รัน Local
npm run dev
# → เปิด http://localhost:3000

# 3. แก้ไขโค้ด
# (เว็บ reload อัตโนมัติ)

# 4. Push ไป GitHub
git add .
git commit -m "Update songs and styling"
git push origin main
```

### Deploy (ถ้าใช้ Vercel/Netlify)
```
GitHub → Vercel/Netlify → Auto Deploy
(ไม่ต้องทำอะไร เพราะ auto deploy)
```

### Deploy (ถ้าใช้ Manus)
```
GitHub → Manus Management UI → Click Publish
```

---

## 📁 ไฟล์ที่สำคัญสำหรับ Deploy

| ไฟล์/Folder | ใช้สำหรับ | หมายเหตุ |
|---|---|---|
| `dist/` | Deploy | สร้างจาก `npm run build` |
| `client/src/` | Development | ไม่ต้อง deploy |
| `server/` | Backend (ไม่ใช้) | ไม่ต้อง deploy |
| `package.json` | Dependencies | ต้องใช้ |
| `vite.config.ts` | Build config | ต้องใช้ |
| `.github/workflows/` | Auto deploy | ถ้าใช้ GitHub Actions |

---

## ⚠️ Common Issues

### ปัญหา 1: `npm: command not found`
**วิธีแก้:** ติดตั้ง Node.js จาก https://nodejs.org/

### ปัญหา 2: `Port 3000 already in use`
**วิธีแก้:** ปิด process ที่ใช้ port 3000
```bash
# macOS/Linux
lsof -i :3000
kill -9 <PID>

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### ปัญหา 3: Build ล้มเหลว
**วิธีแก้:** ลบ `node_modules` และ `package-lock.json` แล้วติดตั้งใหม่
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### ปัญหา 4: Deploy ไม่สำเร็จ
**วิธีแก้:** ตรวจสอบ
- Build command ถูกต้อง: `npm run build`
- Output directory ถูกต้อง: `dist`
- ไม่มี error ใน build log

---

## 🎯 Quick Start (ทำเร็ว)

```bash
# 1. Clone
git clone https://github.com/Zintrea/leaves-notes.git && cd leaves-notes

# 2. Install
npm install

# 3. Run
npm run dev

# 4. Build
npm run build

# 5. Deploy (ใช้ Vercel)
# → ไปที่ https://vercel.com
# → Import project
# → Done!
```

---

## 📚 Resources

- **Node.js:** https://nodejs.org/
- **Git:** https://git-scm.com/
- **Vite:** https://vitejs.dev/
- **Vercel:** https://vercel.com/
- **Netlify:** https://netlify.com/
- **GitHub Pages:** https://pages.github.com/
- **Railway:** https://railway.app/

---

**ถ้ามีปัญหา ให้ติดต่อทีม Manus ที่ https://help.manus.im**
