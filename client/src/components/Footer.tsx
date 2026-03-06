/**
 * Footer Component
 * Design: Ink & Paper — footer เรียบง่าย พร้อม social media links
 *
 * วิธีแก้ไข social media links:
 * แก้ที่ไฟล์ client/src/data/packages.ts ใน CONTACT_INFO object
 */

import { CONTACT_INFO } from "@/data/packages";
import { Facebook, Youtube, Instagram } from "lucide-react";

// TikTok icon (lucide ไม่มี ทำเอง)
function TikTokIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.27 8.27 0 004.84 1.55V6.79a4.85 4.85 0 01-1.07-.1z" />
    </svg>
  );
}

export default function Footer() {
  const socialLinks = [
    { url: CONTACT_INFO.facebook, icon: Facebook, label: "Facebook" },
    { url: CONTACT_INFO.youtube, icon: Youtube, label: "YouTube" },
    { url: CONTACT_INFO.tiktok, icon: TikTokIcon, label: "TikTok" },
    { url: CONTACT_INFO.instagram, icon: Instagram, label: "Instagram" },
  ].filter((s) => s.url);

  return (
    <footer id="contact" className="bg-[#2C1810] text-[#C8B89A] border-t border-[#4A2E1E]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-sm bg-[#F7F2E7] flex items-center justify-center">
                <span className="text-[#2C1810] text-xs font-bold font-serif">ซด</span>
              </div>
              <span className="font-serif font-bold text-[#F7F2E7] text-base">ซอด้วง Tabs</span>
            </div>
            <p className="text-xs text-[#9A8070] max-w-xs leading-relaxed">
              รวมโน้ตเพลงซอด้วง สำหรับทุกระดับ ตั้งแต่มือใหม่จนถึงระดับปรมาจารย์
            </p>
          </div>

          {/* Social links */}
          {socialLinks.length > 0 && (
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-sm bg-[#3D2415] border border-[#4A2E1E] flex items-center justify-center text-[#C8B89A] hover:bg-[#8B3A2A] hover:text-white hover:border-[#8B3A2A] transition-all duration-200"
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-6 border-t border-[#3D2415] flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-[#6B5040]">
            © {new Date().getFullYear()} ซอด้วง Tabs — โน้ตเพลงซอด้วง
          </p>
          <p className="text-xs text-[#6B5040]">
            ติดต่อสั่งทำโน้ตได้ที่{" "}
            {CONTACT_INFO.facebook && (
              <a
                href={CONTACT_INFO.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C8B89A] hover:text-white underline"
              >
                Facebook Inbox
              </a>
            )}
          </p>
        </div>
      </div>
    </footer>
  );
}
