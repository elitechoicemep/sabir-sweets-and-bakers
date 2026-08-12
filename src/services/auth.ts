import { API_BASE_URL, request } from "./api";

export interface AdminSession {
  token: string;
  email: string;
}

/**
 * Placeholder for real, server-side authentication. No client-side "admin"
 * check is implemented on purpose — fake security is worse than none.
 */
export async function signIn(email: string, password: string): Promise<AdminSession> {
  if (!API_BASE_URL) {
    throw new Error("Authentication requires a backend. Connect one before enabling /admin.");
  }
  return request<AdminSession>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function signOut(): Promise<void> {
  if (!API_BASE_URL) return;
  await request("/auth/logout", { method: "POST" });
}