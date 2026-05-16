/**
 * =====================================================
 * API Service — ตัวกลางสำหรับดึงข้อมูล
 * ใน Phase 1: fetch จาก JSON files ใน public/data/
 * อนาคต: เปลี่ยนเป็น API endpoint ได้โดยไม่ต้องแก้ component
 * =====================================================
 */

const DATA_BASE_URL = "/data";

export async function fetchJSON<T>(path: string): Promise<T> {
  const response = await fetch(`${DATA_BASE_URL}/${path}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${path}: ${response.statusText}`);
  }
  return response.json();
}

// Cache สำหรับ dev — ถ้า fetch ซ้ำไม่ต้องเรียกใหม่
const cache = new Map<string, unknown>();

export async function fetchJSONCached<T>(path: string): Promise<T> {
  if (cache.has(path)) {
    return cache.get(path) as T;
  }
  const data = await fetchJSON<T>(path);
  cache.set(path, data);
  return data;
}

export function clearCache() {
  cache.clear();
}
