/**
 * Thin transport layer. Today every call resolves against the local data
 * module; when the REST backend lands only this file needs a base URL.
 *
 *   Frontend -> services/api.ts -> REST API -> Backend -> Database -> Admin
 */
const env = import.meta.env as Record<string, string | undefined>;

export const API_BASE_URL = env["VITE_API_BASE_URL"] ?? null;

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/** Resolve local data with the same async contract a network call would have. */
export async function local<T>(value: T): Promise<T> {
  return value;
}

export async function request<T>(path: string, init?: RequestInit): Promise<T> {
  if (!API_BASE_URL) {
    throw new ApiError(`No API configured for ${path}. Set VITE_API_BASE_URL.`);
  }
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
    ...init,
  });
  if (!res.ok) throw new ApiError(await res.text(), res.status);
  return (await res.json()) as T;
}