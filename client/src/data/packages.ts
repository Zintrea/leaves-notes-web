/**
 * =====================================================
 * ไฟล์ข้อมูลแพ็กเกจสั่งทำโน้ต
 * =====================================================
 * วิธีแก้ไข:
 * - แก้ราคา: เปลี่ยน price field
 * - แก้คำอธิบาย: เปลี่ยน description field
 * - แก้ลิงค์ติดต่อ: เปลี่ยน contactUrl field
 * - เพิ่มแพ็กเกจใหม่: เพิ่ม object ใหม่ใน PACKAGES array
 * =====================================================
 */

export interface Package {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: string;
  contactUrl: string;
  features: string[];
  imageDescription: string; // คำอธิบายสำหรับรูปตัวอย่าง
}

// =====================================================
// ข้อมูลแพ็กเกจ — แก้ไขได้ที่นี่
// =====================================================
export const PACKAGES: Package[] = [
  {
    id: "package-1",
    title: "แบบที่ 1",
    subtitle: "โน้ตเมโลดี้",
    description: "เหมาะสำหรับผู้ต้องการเล่นเฉพาะ Melody ดูง่าย ไม่ซับซ้อน เหมาะสำหรับผู้เริ่มต้น",
    price: "200",
    contactUrl: "https://www.facebook.com/",
    features: ["โน้ตเมโลดี้", "เนื้อเพลง", "ไฟล์ PDF"],
    imageDescription: "โน้ตเพลงซอด้วงแบบเมโลดี้เดี่ยว",
  },
  {
    id: "package-2",
    title: "แบบที่ 2",
    subtitle: "Melody + Chord",
    description: "มีรายละเอียดทั้ง Melody และ Chord เพลงมีมิติ เพราะขึ้น เหมาะสำหรับนักดนตรีระดับกลาง",
    price: "300",
    contactUrl: "https://www.facebook.com/",
    features: ["โน้ตเมโลดี้", "คอร์ดประกอบ", "เนื้อเพลง", "ไฟล์ PDF"],
    imageDescription: "โน้ตเพลงซอด้วงพร้อมคอร์ดประกอบ",
  },
  {
    id: "package-3",
    title: "แบบที่ 3",
    subtitle: "Melody + Chord + คลิป",
    description: "กลัวเล่นไม่สำเร็จ? มีโน้ตพร้อมคลิปตัวอย่างการเล่นแบบเห็นนิ้ว สำหรับฝึกตามได้เลย",
    price: "500",
    contactUrl: "https://www.facebook.com/",
    features: ["โน้ตเมโลดี้", "คอร์ดประกอบ", "เนื้อเพลง", "ไฟล์ PDF", "คลิปสาธิต"],
    imageDescription: "โน้ตเพลงซอด้วงพร้อมคลิปสาธิต",
  },
];

// =====================================================
// ข้อมูลการติดต่อ — แก้ไขได้ที่นี่
// =====================================================
export const CONTACT_INFO = {
  facebook: "https://www.facebook.com/",     // ลิงค์ Facebook Page
  line: "",                                    // ลิงค์ LINE (ถ้ามี)
  instagram: "",                               // ลิงค์ Instagram (ถ้ามี)
  youtube: "",                                 // ลิงค์ YouTube (ถ้ามี)
  tiktok: "",                                  // ลิงค์ TikTok (ถ้ามี)
  email: "",                                   // อีเมล (ถ้ามี)
  deliveryTime: "ประมาณ 1 สัปดาห์",           // เวลาจัดส่ง
  deliveryMethod: "ไฟล์ PDF ส่งทาง Inbox",   // วิธีจัดส่ง
};
