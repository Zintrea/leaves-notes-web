/**
 * SongCard Component
 * Design: Ink & Paper — กระดาษโน้ตเพลงเก่า
 * แสดงข้อมูลเพลงแต่ละเพลงในรูปแบบการ์ด
 */

import type { SongEntry } from "@/lib/song-constants";
import { DIFFICULTY_LABELS, GENRE_LABELS, DIFFICULTY_COLORS, GENRE_COLORS } from "@/lib/song-constants";
import { FileText, MessageCircle, Lock, Unlock } from "lucide-react";

interface SongCardProps {
  song: SongEntry;
}

export default function SongCard({ song }: SongCardProps) {
  return (
    <div className="song-card group bg-[#FEFAF2] border border-[#D4C5A0] rounded-sm shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 overflow-hidden flex flex-col">
      {/* Top accent line */}
      <div className="h-0.5 w-full bg-gradient-to-r from-[#8B3A2A] via-[#C0392B] to-[#8B3A2A] opacity-60" />

      <div className="p-4 flex flex-col gap-3 flex-1">
        {/* Title */}
        <div>
          <h3 className="font-serif text-[#2C1810] text-lg font-semibold leading-snug line-clamp-2 group-hover:text-[#8B3A2A] transition-colors">
            {song.title}
          </h3>
          <p className="text-sm text-[#7A5C3A] mt-0.5 font-medium tracking-wide uppercase">
            {song.artist}
          </p>
        </div>

          {/* Tags row */}
        <div className="flex flex-wrap gap-1.5">
          {/* Difficulty badge */}
          <span className={`inline-flex items-center px-2.5 py-1 rounded-sm text-xs font-semibold border ${DIFFICULTY_COLORS[song.difficulty]}`}>
            {DIFFICULTY_LABELS[song.difficulty]}
          </span>
          {/* Genre badge */}
          <span className={`inline-flex items-center px-2.5 py-1 rounded-sm text-xs font-semibold border ${GENRE_COLORS[song.genre]}`}>
            {GENRE_LABELS[song.genre]}
          </span>
          {/* Free/Paid badge */}
          <span className={`inline-flex items-center gap-0.5 px-2.5 py-1 rounded-sm text-xs font-semibold border ${
            song.isFree
              ? "bg-green-50 text-green-700 border-green-200"
              : "bg-orange-50 text-orange-700 border-orange-200"
          }`}>
            {song.isFree ? (
              <><Unlock size={9} /> ฟรี</>
            ) : (
              <><Lock size={9} /> มีค่าใช้จ่าย</>
            )}
          </span>
        </div>

        {/* Description */}
        {song.description && (
          <p className="text-sm text-[#6B5040] leading-relaxed line-clamp-2">
            {song.description}
          </p>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Action buttons */}
        <div className="flex flex-col gap-1.5 pt-2 border-t border-[#E8DCC8]">
          {/* PDF Link */}
          {song.pdfUrl ? (
            <a
              href={song.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-[#8B3A2A] hover:text-[#C0392B] font-medium transition-colors py-2 group/link"
            >
              <FileText size={13} className="flex-shrink-0" />
              <span className="truncate group-hover/link:underline">ดาวน์โหลด PDF โน้ตเพลง</span>
            </a>
          ) : (
            <span className="flex items-center gap-1.5 text-sm text-[#B0A090] italic">
              <FileText size={13} className="flex-shrink-0" />
              <span>ยังไม่มี PDF</span>
            </span>
          )}

          {/* Inbox Link */}
          {song.inboxUrl && (
            <a
              href={song.inboxUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-[#5B7FA6] hover:text-[#2C5F8A] font-medium transition-colors py-2 group/link"
            >
              <MessageCircle size={13} className="flex-shrink-0" />
              <span className="group-hover/link:underline">ติดต่อ Inbox</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
