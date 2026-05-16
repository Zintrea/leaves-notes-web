/**
 * =====================================================
 * useContacts — Hook สำหรับจัดการข้อมูลติดต่อ
 * =====================================================
 */

import { useState, useEffect } from "react";
import { fetchContacts } from "@/services/packages";
import type { ContactInfo } from "@/services/packages";

interface UseContactsResult {
  contacts: ContactInfo | null;
  isLoading: boolean;
  error: string | null;
}

export function useContacts(): UseContactsResult {
  const [contacts, setContacts] = useState<ContactInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchContacts();
        if (!cancelled) {
          setContacts(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load contacts");
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

  return { contacts, isLoading, error };
}
