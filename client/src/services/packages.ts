/**
 * =====================================================
 * Packages Service — ดึงข้อมูลแพ็กเกจและติดต่อจาก JSON
 * =====================================================
 */

import { fetchJSONCached } from "./api";
import type { Package, ContactInfo } from "@/lib/package-constants";

interface PackagesResponse {
  packages: Package[];
}

export async function fetchPackages(): Promise<Package[]> {
  const data = await fetchJSONCached<PackagesResponse>("packages.json");
  return data.packages;
}

export async function fetchContacts(): Promise<ContactInfo> {
  return fetchJSONCached<ContactInfo>("contacts.json");
}

export type { Package, ContactInfo };
