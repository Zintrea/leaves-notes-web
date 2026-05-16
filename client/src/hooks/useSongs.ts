/**
 * =====================================================
 * useSongs — Hook สำหรับจัดการข้อมูลเพลง
 *
 * Usage:
 *   const { songs, isLoading, error } = useSongs();
 *   const filtered = filterSongs(songs, { search, difficulty, genre });
 * =====================================================
 */

import { useState, useEffect } from "react";
import { fetchSongs } from "@/services/songs";
import type { SongEntry } from "@/services/songs";

interface UseSongsResult {
  songs: SongEntry[];
  isLoading: boolean;
  error: string | null;
}

export function useSongs(): UseSongsResult {
  const [songs, setSongs] = useState<SongEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchSongs();
        if (!cancelled) {
          setSongs(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load songs");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  return { songs, isLoading, error };
}
