/**
 * HeroSection Component
 * แสดงส่วนแนะนำเว็บ — รูปซอด้วง, ข้อความต้อนรับ, ตัวเลขสถิติ
 */

import { ChevronDown, Music2, MessageCircle } from "lucide-react";
import type { ContactInfo } from "@/lib/package-constants";
import Cover from "@/assets/Cover2.png";

interface HeroSectionProps {
  songsLength: number;
  freeCount: number;
  contacts: ContactInfo | null;
  onNavigate: (section: string) => void;
}

const HERO_IMAGE = Cover;
const PAPER_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663409426185/N2cp2yxXafPAPb2r82tKBP/paper-texture-bg-bhDE3hGQsHoRYQjsUPV2vW.webp";

export default function HeroSection({ songsLength, freeCount, contacts, onNavigate }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Text side */}
          <div className="order-2 md:order-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px flex-1 bg-[#D4C5A0]" />
              <span className="text-[10px] font-semibold text-[#9A8070] uppercase tracking-[0.2em]">
                โน้ตเพลงสำหรับเครื่องดนตรีไทย
              </span>
              <div className="h-px flex-1 bg-[#D4C5A0]" />
            </div>

            <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#2C1810] leading-tight mb-4">
              โน้ตเพลงจากใบบุญเอง
            </h1>
            <p className="text-xl md:text-2xl font-medium text-[#8B3A2A] mb-4">
              เป็นเด็กวิศวะคอมที่เล่นซอด้วงได้นิดหน่อย
            </p>

            <p className="text-sm text-[#6B5040] leading-relaxed mb-6 max-w-md">
              จัดทำโน้ตเพลงซอด้วงสำหรับทุกระดับ ตั้งแต่มือใหม่จนถึงระดับคนที่เล่นเป็น
              ครอบคลุมทั้งเพลงไทยเดิม เพลงไทย และเพลงสากล
              โน้ตฟรีสามารถดาวน์โหลดได้ทันที และขอค่าจ่ายโดเมนเว็บบ้าง บางเพลงแกะยาก
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => {
                  onNavigate("songs");
                  document.getElementById("songs")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#2C1810] text-[#F7F2E7] text-sm font-semibold rounded-sm hover:bg-[#8B3A2A] transition-colors"
              >
                <Music2 size={15} />
                ดูโน้ตเพลง
              </button>
              <a
                href={contacts?.facebook || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-transparent border border-[#8B3A2A] text-[#8B3A2A] text-sm font-semibold rounded-sm hover:bg-[#8B3A2A] hover:text-white transition-colors"
              >
                <MessageCircle size={15} />
                สั่งทำโน้ต
              </a>
            </div>

            {/* Stats */}
            <div className="flex gap-6 mt-8 pt-6 border-t border-[#D4C5A0]">
              <div>
                <p className="text-2xl font-bold font-serif text-[#2C1810]">
                  {songsLength > 0 ? `${songsLength}+` : "-"}
                </p>
                <p className="text-xs text-[#9A8070]">โน้ตเพลง</p>
              </div>
              <div className="w-px bg-[#D4C5A0]" />
              <div>
                <p className="text-2xl font-bold font-serif text-[#2C1810]">
                  {songsLength > 0 ? freeCount : "-"}
                </p>
                <p className="text-xs text-[#9A8070]">โน้ตฟรี</p>
              </div>
              <div className="w-px bg-[#D4C5A0]" />
              <div>
                <p className="text-2xl font-bold font-serif text-[#2C1810]">3</p>
                <p className="text-xs text-[#9A8070]">ระดับความยาก</p>
              </div>
            </div>
          </div>

          {/* Image side */}
          <div className="order-1 md:order-2 relative">
            <div className="relative rounded-sm overflow-hidden border border-[#D4C5A0] shadow-lg">
              <img
                src={HERO_IMAGE}
                alt="ซอด้วงและโน้ตเพลง"
                className="w-full h-64 md:h-75 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810]/30 to-transparent" />
            </div>
            <div className="absolute -bottom-3 -left-3 w-16 h-16 border-2 border-[#D4C5A0] rounded-sm opacity-40" />
            <div className="absolute -top-3 -right-3 w-10 h-10 border-2 border-[#8B3A2A] rounded-sm opacity-30" />
          </div>
        </div>
      </div>

      <div className="flex justify-center pb-4">
        <ChevronDown size={20} className="text-[#B0A090] animate-bounce" />
      </div>
    </section>
  );
}
