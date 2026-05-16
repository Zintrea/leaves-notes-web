/**
 * PackageCard Component
 * Design: Ink & Paper — การ์ดแพ็กเกจสั่งทำโน้ต
 */

import type { Package } from "@/lib/package-constants";
import { Check, MessageCircle } from "lucide-react";

interface PackageCardProps {
  pkg: Package;
  isHighlighted?: boolean;
}

export default function PackageCard({ pkg, isHighlighted = false }: PackageCardProps) {
  return (
    <div
      className={`relative flex flex-col rounded-sm border shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 overflow-hidden ${
        isHighlighted
          ? "border-[#8B3A2A] bg-[#2C1810]"
          : "border-[#D4C5A0] bg-[#FEFAF2]"
      }`}
    >
      {isHighlighted && (
        <div className="absolute top-3 right-3">
          <span className="bg-[#C0392B] text-white text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider">
            แนะนำ
          </span>
        </div>
      )}

      {/* Top accent */}
      <div className={`h-1 w-full ${isHighlighted ? "bg-[#C0392B]" : "bg-[#D4C5A0]"}`} />

      <div className="p-5 flex flex-col gap-4 flex-1">
        {/* Header */}
        <div>
          <p className={`text-xs font-semibold uppercase tracking-widest mb-1 ${
            isHighlighted ? "text-[#C0392B]" : "text-[#9A8070]"
          }`}>
            {pkg.title}
          </p>
          <h3 className={`font-serif text-xl font-bold ${
            isHighlighted ? "text-[#F7F2E7]" : "text-[#2C1810]"
          }`}>
            {pkg.subtitle}
          </h3>
          <p className={`text-xs mt-1.5 leading-relaxed ${
            isHighlighted ? "text-[#C8B89A]" : "text-[#6B5040]"
          }`}>
            {pkg.description}
          </p>
        </div>

        {/* Price */}
        <div className={`flex items-baseline gap-1 ${
          isHighlighted ? "text-[#F7F2E7]" : "text-[#2C1810]"
        }`}>
          <span className="text-3xl font-bold font-serif">{pkg.price}</span>
          <span className={`text-sm ${isHighlighted ? "text-[#C8B89A]" : "text-[#9A8070]"}`}>
            บาท
          </span>
        </div>

        {/* Features */}
        <ul className="space-y-1.5 flex-1">
          {pkg.features.map((feature, i) => (
            <li key={i} className="flex items-center gap-2">
              <Check
                size={13}
                className={`flex-shrink-0 ${
                  isHighlighted ? "text-[#C0392B]" : "text-[#8B3A2A]"
                }`}
              />
              <span className={`text-xs ${
                isHighlighted ? "text-[#D4C5A0]" : "text-[#6B5040]"
              }`}>
                {feature}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <a
          href={pkg.contactUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-sm text-sm font-semibold transition-all duration-200 ${
            isHighlighted
              ? "bg-[#C0392B] text-white hover:bg-[#A93226]"
              : "bg-[#2C1810] text-[#F7F2E7] hover:bg-[#8B3A2A]"
          }`}
        >
          <MessageCircle size={14} />
          ติดต่อ Inbox
        </a>
      </div>
    </div>
  );
}
