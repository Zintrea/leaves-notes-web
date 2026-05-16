/**
 * =====================================================
 * Songs Service — ดึงข้อมูลเพลงจาก JSON
 * =====================================================
 */

import { fetchJSONCached } from "./api";
import type { SongEntry, DifficultyLevel, SongGenre } from "@/lib/song-constants";
import { filterSongs } from "@/lib/song-constants";

interface SongsResponse {
  songs: SongEntry[];
}

export async function fetchSongs(): Promise<SongEntry[]> {
  const data = await fetchJSONCached<SongsResponse>("songs.json");
  return data.songs;
}

export { filterSongs };
export type { DifficultyLevel, SongGenre, SongEntry };
