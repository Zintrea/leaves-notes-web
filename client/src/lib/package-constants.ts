/**
 * =====================================================
 * Types สำหรับแพ็กเกจและข้อมูลติดต่อ
 * ย้ายมาจากเดิมใน data/packages.ts
 * =====================================================
 */

export interface Package {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  contactUrl?: string;
  features: string[];
  imageDescription?: string;
  isHighlighted?: boolean;
}

export interface ContactInfo {
  facebook: string;
  line: string;
  instagram: string;
  youtube: string;
  tiktok: string;
  email: string;
  deliveryTime: string;
  deliveryMethod: string;
}
