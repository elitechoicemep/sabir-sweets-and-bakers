/**
 * Thin API layer. Today it resolves from local data; swapping in a backend
 * only requires changing the implementations here.
 */
const BASE_URL = import.meta.env['VITE_API_BASE_URL'] ?? "";

export async function apiGet<T>(path: string, fallback: () => T | Promise<T>): Promise<T> {
  if (!BASE_URL) return fallback();
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) throw new Error(`GET ${path} failed with ${res.status}`);
  return (await res.json()) as T;
}

export async function apiPost<T, B>(path: string, body: B, fallback: () => T | Promise<T>): Promise<T> {
  if (!BASE_URL) return fallback();
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`POST ${path} failed with ${res.status}`);
  return (await res.json()) as T;
}
