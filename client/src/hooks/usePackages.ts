/**
 * =====================================================
 * usePackages — Hook สำหรับจัดการข้อมูลแพ็กเกจ
 * =====================================================
 */

import { useState, useEffect } from "react";
import { fetchPackages } from "@/services/packages";
import type { Package } from "@/services/packages";

interface UsePackagesResult {
  packages: Package[];
  isLoading: boolean;
  error: string | null;
}

export function usePackages(): UsePackagesResult {
  const [packages, setPackages] = useState<Package[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchPackages();
        if (!cancelled) {
          setPackages(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load packages");
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

  return { packages, isLoading, error };
}
