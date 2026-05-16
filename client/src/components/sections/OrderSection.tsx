/**
 * OrderSection Component
 * แสดงแพ็กเกจสั่งทำโน้ต
 */

import PackageCard from "@/components/PackageCard";
import type { Package, ContactInfo } from "@/lib/package-constants";

interface OrderSectionProps {
  packages: Package[];
  contacts: ContactInfo | null;
}

export default function OrderSection({ packages, contacts }: OrderSectionProps) {
  return (
    <section id="order" className="py-12 bg-[#F5EDD6]/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-10">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#2C1810] mb-2">
            สั่งทำโน้ต
          </h2>
          <p className="text-sm text-[#6B5040] max-w-md mx-auto leading-relaxed">
            ติดต่อสั่งทำโน้ตได้ที่ Inbox ของ Facebook
            จัดส่งเป็นไฟล์ PDF ใช้เวลาประมาณ{" "}
            <span className="font-semibold">{contacts?.deliveryTime || "-"}</span>
          </p>
        </div>

        {/* Package cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {packages.map((pkg, i) => (
            <PackageCard
              key={pkg.id}
              pkg={pkg}
              isHighlighted={i === 2}
            />
          ))}
        </div>

        {/* Note */}
        <p className="text-center text-xs text-[#9A8070] mt-6">
          * ราคาอาจเปลี่ยนแปลงได้ตามความซับซ้อนของเพลง กรุณาสอบถามก่อนสั่ง
        </p>
      </div>
    </section>
  );
}
